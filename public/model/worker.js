const { text } = require('body-parser');
var mongoose = require('mongoose');
var workerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    proffession: {
        type: String,
        required: true
    },
    totalrequest: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Workers', workerSchema);