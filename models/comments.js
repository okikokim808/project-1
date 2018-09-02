const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const CommentSchema = new Schema({
    name: String,
    content: String,
})

const Comments = mongoose.model("Comment", CommentSchema)

module.exports = Comments;