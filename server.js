const express = require('express');
const app = express();
const fetchJson = require('node-fetch-json');

//parse incoming urlencoded data and populate req.body object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//password encryption extension
const bcrypt = require('bcrypt');  
//initialize database
const db = require('./models');
const jwt = require('jsonwebtoken')

//APP.USE
app.use(express.static('public'));
// allow cross origin requests
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
    res.header ("set Access-Control-Allow-Origin "*"");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//html endpoints
//APP.GET
app.get('/', (req, res) => {res.sendFile(__dirname + '/views/index.html');});
app.get('/', (req, res) => {res.sendFile(__dirname + '/views/profile.html');});

app.get('/userInterests', function getInterests(req,res){
  var username = req.query.username
  console.log('username'+username)
  db.User.findOne({username},(err,user)=>{
    if(err){
      console.log("error "+ err )
      res.sendStatus(400)
    } else {
      console.log('user ' + user)
      res.json(user)
    }

  })
})

app.get('/interests', (req, res) => {res.sendFile(__dirname + '/views/interests.html');});
app.get('/profile', (req, res) => {res.sendFile(__dirname + '/views/profile.html');});
app.get('/api', (req, res) => {
  fetchJson("https://api.meetup.com/2/concierge?&sign=true&photo-host=public&key=3b72576a30795b1d47673a2f3f2837")
      .then(json => json.toJSON())
      .then(json => res.json(json))
      .catch(err => console.log("ERROR: ", err));
});

app.post('/login', (req, res) => {
    console.log("LOGIN CALLED");
    // find the user in our user db
    console.log("body", req.body)
    db.User.find({email: req.body.email})
      .select('+password')
      .exec()
      // if we have found a user
      .then( users => {
        // if there is not email in our db
        console.log("USERS: ", users);
        if(users.length < 1) {
          return res.status(401).json({
            message: "Email/Password incorrect"
          })
        }
        // we have an email in our db that matches what they gave us
        // now we have to compare their hashed password to what we have in our db
        console.log("body", req.body);
        console.log("hash", users[0].password);
        bcrypt.compare(req.body.password, users[0].password, (err, match) => {
          console.log(match)
          if(err){console.log(err);return res.status(500).json({err})}
          if(match){
            console.log("MATCH: ", match)
            // create a json web token
            const token = jwt.sign(
              {
                email: users[0].email,
                _id: users[0]._id,
                interests: users[0].interests
              }, 
              "kombucha",
              {
                expiresIn: "5h"
              },
            );
            console.log("NEW TOKEN: ", token)
            return res.status(200).json(
              {
                message: 'Auth successful',
                token
              }
            )
          } else {
            console.log("NOT A MATCH")
            res.status(401).json({message: "Email/Password incorrect"})
          }
        })
  
  
      })
      .catch( err => {
        console.log("OUTSIDE ERROR_")
        console.log(err);
        res.status(500).json({err})
      })
})

//APP.POST
app.post('/verify', verifyToken, (req, res) => {
    let verified = jwt.verify(req.token, 'kombucha')
    console.log("verified: ", verified)
    res.json(verified)
})

app.post('/profile/:user_id/comments', function (req, res) {
  {
    let newComment = req.body.comments;
    let name = req.body.name;

    db.User.findOneAndUpdate({username:name}, newComment, (err, updatedComment)=>{
      if (err){
        return console.log(err)
      }
      else{
        respond.JSON(updatedComment)
      }
    }) 

    db.User.create(newComment, function(err,comment){
      if (err){
        console.log("index error:"+ err);
        res.sendStatus(400)
      }
      res.json({comment})
    })
  }
})

app.put('/interests', (req, res) => {
  console.log("request", req.body.interests);
//DB CALLS
  console.log(req.body);
  db.User.findOneAndUpdate({_id: req.body._id},{interests: req.body.interests})
  .exec()
  .then( user => {
    // console.log("user " + req.body.user);
    user.interests = req.body.interests
  })
  res.status(200).json({
    message: "Sent OK"
  })
});

app.post('/interests', verifyToken, (req, res) => {
    console.log(req.token)
    jwt.verify(req.token, 'kombucha', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created',
          authData
        });
      }
    });
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html');
});
app.post('/signup', (req, res) => {
    console.log('SignUp', req.body);
    db.User.find({email: req.body.email})
    .select('+password')
    .exec()
    .then( user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "email already exists"
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          console.log(hash);
          if(err){ 
            res.status(500).json({error: err})
          } else {
            const userToCreate = new db.User({
              email: req.body.email,
              password: hash,
              username: req.body.username,
              interests: req.body.interests
            });
            db.User.create(userToCreate, (err, users) => {
                if(err){console.log(err);}
                const token = jwt.sign(
                    {users},
                    'kombucha',
                    {
                        expiresIn: '1h'
                    },
                    (err, token) => {
                        if(err){res.json(err)}
                    res.status(200).json({
                        message: 'User Created',
                        users,
                        token
                    })
                    }
                )
            })
            // console.log(JSON.stringify(user));
            // user
            //   .save()
            //   .then( result =>
            //     res.json({message: 'User created',
            //               user: result
            //             })
            //   )
            //   .catch( err => {
            //     console.log(err);
            //     res.status(500).json({err})
            //   })
          }
        })
      }
    })
});



//APP.PUT
app.put('/profile',(req,res)=>{
  db.User.findOneAndUpdate({username:req.body.username},{meetupId:req.body.meetupId})//callback

    db.User.findOneAndUpdate({username: req.body.username},
      {meetupIDs: req.body.meetupId})
    .exec()
    .then( user => {
      console.log("user " + user);
      // user.interests = user.interests + req.body.interests
    }),
    res.status(200).json({
      message: "Sent OK"
    })
  ,console.log("andrea",req.body)
  
})
app.put('/profile/remove',(req,res)=>{
  console.log("ANDREA12",req.body.username)
  let username = req.body.username;
  let meetupId = req.body.meetupId;
  db.User.findOneAndRemove({username:username},{meetupIDs:meetupId})
})

// app.put('/profile/comment',(req,res)=>{
//   console.log("request", req.body.comments);
//   //DB CALLS
//     db.User.findOneAndUpdate({username: req.body.username},{comments: req.body.comment})
  
//     db.User.findOneAndUpdate({username: req.body.username},
//       {comments: req.body.comment})
//     .exec()
//     .then( user => {
//       console.log("user " + user);
//       // user.interests = user.interests + req.body.interests
//     })
//     res.status(200).json({
//       message: "Sent OK"
//     })
// })

app.put('/interests', (req, res) => {
  console.log("request", req.body.interests);
//DB CALLS
  db.User.findOneAndUpdate({username: req.body.username},
    {interests: req.body.interests})

  db.User.findOneAndUpdate({username: req.body.username},
    {interests: req.body.interests})
  .exec()
  .then( user => {
    console.log("user " + user);
    // user.interests = user.interests + req.body.interests
  })
  res.status(200).json({
    message: "Sent OK"
  })
});
//FUNCTIONS
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader)
    //bearer check
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
}
//server
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
});

