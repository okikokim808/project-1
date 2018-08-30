const express = require('express');
const app = express();

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

app.use(express.static('/public'));

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

