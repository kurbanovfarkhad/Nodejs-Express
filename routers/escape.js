const express = require('express');
const router = express.Router();




router.get('/escape',(req,res)=>{
    if(req.session){
        req.session.destroy(()=>{
            console.log("exit of session");
            res.redirect('/');            
        });
    }else{
        console.log('session was not established')
    }
});


module.exports = router;