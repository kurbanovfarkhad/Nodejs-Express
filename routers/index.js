const reg = require('./reg');
const auth = require('./auth');
const escape = require('./escape');
const post = require('./post');
const archive = require('./archive');
const del = require('./delete');


module.exports = {
    reg,
    auth,
    escape, 
    post,
    archive,
    del
};