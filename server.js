const express = require('express');
const app = express();
const fetchJson = require('node-fetch-json');

//parse incoming urlencoded data and populate req.body object
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//password encryption extension
const bcrypt = require('bcrypt');  
//initialize database
const db = require('./models');
// const jwt = require('jsonwebtoken')

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

app.post('/signup', (req, res) => {
    // console.log(req.body);
    db.User.find({email: req.body.email})
    .exec()
    .then( user => {
      // if a user is found with that email
      if (user.length >= 1) {
        // send an error and let the user know that the email already exists
        return res.status(409).json({
          message: "email already exists"
        })
      
      // we don't have this user's email in our db, lets get them set up!
      } else {
        // lets hash our plaintext password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if(err){ 
            res.status(500).json({error: err})
          // we now have a successful hashed password
          } else {
            // we are creating a User object with their email address and OUR hashed password
            const user = new db.User({
              email: req.body.email,
              password: hash,
              username: req.body.username
            });
            // we save our user
            user
              .save()
              .then( result =>
                // we send our new data back to user or whatever you want to do.
                res.json({message: 'User created',
                          user: result
                        })
              )
              .catch( err => {
                console.log(err);
                res.status(500).json({err})
              })
          }
        })
      }
    })
});
app.post('/login', (req, res) => {
    console.log("LOGIN CALLED");
    // find the user in our user db
    db.User.find({email: req.body.email})
      .exec()
      // if we have found a user
      .then( users => {
        // if there is not email in our db
        if(users.length < 1) {
          return res.status(401).json({
            message: "Email/Password incorrect"
          })
        }
        // we have an email in our db that matches what they gave us
        // now we have to compare their hashed password to what we have in our db
        bcrypt.compare(req.body.password, users[0].password, (err, match) => {
          console.log(match)
          // If the compare function breaks, let them know
          if(err){return res.status(500).json({err})}
  
          // If match is true (their password matches our db password)
          if(match){
            // create a json web token
            const token = jwt.sign({
                // add some identifying information
                email: users[0].email,
                _id: users[0]._id
              }, 
              // add our super secret key (which should be hidden, not plaintext like this)
              "waffles",
              // these are options, not necessary
              {
                // its good practice to have an expiration amount for jwt tokens.
                expiresIn: "5h"
              },
            );
            // send success back to user, along with a token.
            return res.status(200).json(
              {
                message: 'Auth successful',
                token
              }
            )
          // the password provided does not match the password on file.
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