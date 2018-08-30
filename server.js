const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//initialize database
// const db = require('./models');

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

