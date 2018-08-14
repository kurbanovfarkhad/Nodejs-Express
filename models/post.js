const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema({
    author: String,
    title: String,
    body: String,
    date: String
});

module.exports = mongoose.model('post', Schema);