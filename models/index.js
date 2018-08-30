const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api", {useMongoClient: true});


module.exports.User = require('./users');
module.exports.Comment = require('./comments');
module.exports.Event = require('./events');