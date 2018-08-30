const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    interest: String,
    content: String,
})

module.exports = mongoose.model('Comment', commentsSchema);