//require express and other modules
const express = require('express');
const app = express();

//parse incoming urlencoded data and populate req.body object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
//initialize database
const db = require('./models');

//serves static files from public folder
app.use(express.static('public'));

//html endpoints

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//server
app.listen(3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
});

