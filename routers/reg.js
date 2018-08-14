const express = require('express');
const router = express.Router();


var models = require('../models');


router.post('/registration',(req,res)=>{

    if(!req.body) return res.sendStatus(400);
    
    models.user.findOne({name:req.body.name}).then(user=>{
        if(user==null){
            models.user.create({
                name: req.body.name,
                password: req.body.password
            }).then(info=>{
                req.session.UserId = info._id;
                req.session.UserName = info.name;
                console.log('User was created...');
                console.log(info);
                res.json({take:"registred"});
            }).catch(err=>console.log(err));
        }else{
            console.log('User name is engaged');
            res.json({take:"engaged"})
        }
    }).catch(err=>console.log(err));


});


module.exports = router;