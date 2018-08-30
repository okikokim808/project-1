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
const jwt = require('jsonwebtoken')

app.use(express.static('public'));


// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//OAUTH
const logIN = "https://authorization-server.com/auth?response_type=code&client_id=CLIENT_ID&redirect_uri=https://www.meetup.com/"









//html endpoints
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/interests.html');
});

//server
app.listen(3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
});

app.get('/api', (req, res) => {
    fetchJson("https://api.meetup.com/2/concierge?&sign=true&photo-host=public&key=3b72576a30795b1d47673a2f3f2837")
        .then(json => json.toJSON())
        .then(json => res.json(json))
        .catch(err => console.log("ERROR: ", err));
    });