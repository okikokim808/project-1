const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/project-1"
);

module.exports.User = require('./users');
module.exports.Event = require('./events');
module.exports.Comments = require('./comments');
