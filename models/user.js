const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema({
    name: String,
    password: String
});

module.exports = mongoose.model('user', Schema);