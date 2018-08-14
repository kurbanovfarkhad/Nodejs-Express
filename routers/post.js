const express = require('express');
const router = express.Router();

var models = require('../models');

router.post('/add_post',(req,res)=>{

    if(!req.body) return res.sendStatus(400); 
    if(req.body.title =="" || req.body.body == ""){
        if(req.body.body ==""){
            res.json("nobody");
        }else{
            res.json("notitle");
        }
    }else{ 
        //res.json({take:'post'});
        models.post.create({
            author: req.session.UserId,
            title: req.body.title,
            body: req.body.body,
            data: new Date()
        }).then(data=>{
            console.log(data);            
            res.json({take:'post'});
        });
    }
});

module.exports = router;