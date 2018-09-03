const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const CommentSchema = new Schema({
    name: String,
    comment: String,
})

const Comments = mongoose.model("Comment", CommentSchema)

module.exports.Comments = Comments;

module.exports.CommentSchema = CommentSchema;