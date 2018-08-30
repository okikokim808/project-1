const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project-1',
  { useNewUrlParser: true })

module.exports.User = require('./users');
module.exports.Comment = require('./comments');
module.exports.Event = require('./events');