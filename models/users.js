const mongoose = require('mongoose'), Schema = mongoose.Schema
// const comments = require('./comments')
// CommentSchema = comments.CommentSchema

const UserSchema = new Schema({
  name:String,
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
  password: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true
  },
  interests:[{type:String}],
  meetupIDs: [{type:Number}],
  comment:[{
    type: Schema.Types.ObjectId,
    ref:'Comment'
  }]//embed in array
})
const User = mongoose.model('User', UserSchema)
module.exports = User