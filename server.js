//require express and other modules
const express = require('express');
const app = express();

//parse incoming urlencoded data and populate req.body object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//initialize database
// const db = require('./models');

//serves static files from public folder
app.use(express.static('public'));

//html endpoints
app.get("/greetings/:name", (req, res) => {
    res.send("hello" + req.params.name);
})
//server
app.listen(3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
  });