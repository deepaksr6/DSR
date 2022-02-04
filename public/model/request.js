const { text } = require('body-parser');
var mongoose = require('mongoose');
var reqSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    assignDate: { type: Date },
    assignWorker: { type: String },
    created: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Requests', reqSchema);