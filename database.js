const mongoose = require('mongoose');
module.exports = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.Promise = global.Promise;
        mongoose.set('debug',true);

        mongoose.connection.on('error',error=>reject(error))
        .on('close',()=>console.log('Database connection is broken'))
        .once('open',()=>resolve(mongoose.connections[0]));
        var url = 'mongodb://localhost:27017/test_blog';
        mongoose.connect(url);
    });    
};