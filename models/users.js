const mongoose = require('mongoose'), Schema = mongoose.Schema
const comments = require('./comments')
CommentSchema = comments.CommentSchema

const UserSchema = new Schema({
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
<<<<<<< HEAD
  interests:[String],
  meetupIDs:[Number]
=======
  interests:[{type:String}],
  meetupIDs: [{type:Number}],
  comments:[CommentSchema] //embed in array
>>>>>>> 59778e7726ca5b23590aa9ec156fe90c349765bb
})

module.exports = mongoose.model('User', UserSchema);