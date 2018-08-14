const express = require('express');
var hbs = require('hbs');

const router = express.Router();

var models = require('../models');


router.get('/:page',(req,res)=>{
    if(!req.session.UserName) res.redirect('/');

    var perpage = 10;
    var page;
    if(req.params['page']==':page'){        
        page = 1;
    }else{
        page = +req.params['page'];
    }
    models.post.find({author: req.session.UserId})
    .sort({ $natural: -1 })
    .skip(perpage*page-perpage).limit(perpage)
    .then(posts=>{
        models.post.count().then(count=>{
            if(posts){   
                console.log(count);                    
                res.render('post.hbs',{
                    user:{name: req.session.UserName,id: req.session.UserId},                    
                    posts: posts,
                    current: page,
                    pages: Math.ceil(count/perpage),
                    date: '21,17,02'
                });
            }else{
                console.log('empty');
                res.render('post.hbs',{
                    name: req.session.UserName,
                    posts: [{title:'Empty',body: 'empty'}]
                });
            }
        });
    });
});


module.exports = router;