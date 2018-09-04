const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment: String,
    meetup: String,
})

const Comments = mongoose.model("Comment", CommentSchema)

module.exports.Comments = Comments;

module.exports.CommentSchema = CommentSchema;