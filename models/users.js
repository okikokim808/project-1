const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { 
    ype: String, 
    required: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
  password: { type: String, required: true },
  username: {
    formType: String,
    required: true,
    unique: true
  },
  interests:[{formType:String}],
  meetupIDs: [{formType:Number}]
})

module.exports = mongoose.model('User', userSchema);