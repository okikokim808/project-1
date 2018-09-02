const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const CommentSchema = new Schema({
  name: String,
  content: String,
})

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
  interests:[{type:String}],
  meetupIDs: [{type:String}],
  comments:[CommentSchema] //embed in array
})

module.exports = mongoose.model('User', UserSchema);