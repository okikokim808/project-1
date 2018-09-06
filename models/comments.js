const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const CommentSchema = new Schema({
    name: String,
    comment: String,
})

const Comments = mongoose.model("Comments", CommentSchema)

module.exports = Comments;
