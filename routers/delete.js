const express = require('express');
const router = express.Router();


var models = require('../models');


router.get('/:id',(req,res)=>{ 
    var id = req.params['id'];
    console.log(id);
    models.post.findOne({"_id": id}).then(post=>{
        post.remove();
        res.redirect('/');
    });
});

module.exports = router;