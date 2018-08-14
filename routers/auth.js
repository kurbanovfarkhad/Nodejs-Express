const express = require('express');
const router = express.Router();


var models = require('../models');



router.post('/login',(req,res)=>{

    if(!req.body) return res.sendStatus(400);    
    console.log(req.body)
    models.user.findOne({name:req.body.name}).then(info => {
        if(req.body.name===info.name){
            if(req.body.password === info.password){
                req.session.UserId = info._id;
                req.session.UserName = info.name;
                console.log(req.session);
                res.json({take:"login"});
            }else{
                res.json({take: "wrong"});
            }
        }else{
            res.json({take: "wrong"});
        }
    });


});

module.exports = router;