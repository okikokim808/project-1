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

app.use(express.static('public'));


// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//html endpoints
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/views/profile.html');
   });
app.post('/verify', verifyToken, (req, res) => {
    let verified= jwt.verify(req.token, 'kombucha')
    console.log("verified: ", verified)
    res.json(verified)
})
app.post('/profile', verifyToken, (req, res) => {
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
app.get('/interests', (req, res) => {
    res.sendFile(__dirname + '/views/interests.html');
});

app.put('/interests', (req, res) => {
  console.log(req.body);

  db.User.findOneAndUpdate({username: req.body.username},
    {interests: req.body.interests})
  .exec()
  .then( user => {
    console.log(user);
    // user.interests = user.interests + req.body.interests
  })

  res.status(200).json({
    message: "Sent OK"
  })
});

app.post('/signup', (req, res) => {
    console.log(req.body);
    db.User.find({email: req.body.email})
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
            const user = new db.User({
              email: req.body.email,
              password: hash,
              username: req.body.username,
              interests: req.body.interests
            });
            db.User.create(userToCreate, (err, users) => {
                if(err){console.log(err);}
                jwt.sign(
                    {username},
                    'kombucha',
                    {
                        expiresIn: '1h'
                    },
                    (err, signedJwt) => {
                        if(err){console.log(err)}
                        res.status(200).json({
                            message: 'User Created',
                            username,
                            signedJwt
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
app.post('/login', (req, res) => {
    console.log("LOGIN CALLED");
    db.User.find({email: req.body.email})
      .exec()
      .then( users => {
        if(users.length < 1) {
          return res.status(401).json({
            message: "Email/Password incorrect"
          })
        }
        bcrypt.compare(req.body.password, users[0].password, (err, match) => {
          console.log(match)
          if(err){return res.status(500).json({err})}
          if(match){
            const token = jwt.sign({
                email: users[0].email,
                _id: users[0]._id
              }, 
              //CHANGE
              "kombucha",
              {
                expiresIn: "5h"
              },
            );
            return res.status(200).json(
              {
                message: 'Auth successful',
                token
              }
            )
          } else {
            res.status(401).json({message: "Email/Password incorrect"})
          }
        })
      })
      .catch( err => {
        console.log(err);
        res.status(500).json({err})
      })
});
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

app.get('/api', (req, res) => {
    fetchJson("https://api.meetup.com/2/concierge?&sign=true&photo-host=public&key=3b72576a30795b1d47673a2f3f2837")
        .then(json => json.toJSON())
        .then(json => res.json(json))
        .catch(err => console.log("ERROR: ", err));
    });