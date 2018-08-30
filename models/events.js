const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
    eventName: String,
    location: String,
    date: { 
        type: Date,
    },
    sourceURL: String
})

module.exports = mongoose.model('Event', eventsSchema);