const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var hbs = require("hbs");


var models = require('./models');
var routers = require('./routers');
var database = require('./database');
var parserJSON = bodyParser.json();

var app = express();


app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname + '/public')));
app.use('/javascripts',express.static(path.join(__dirname + '/node_modules' + '/jquery' + '/dist')));
app.use('/stylesheets',express.static(path.join(__dirname + '/node_modules' + '/bootstrap' + '/dist'+'/css')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
    session({
      secret: "asdasdasdasdasdconfig.SESSION_SECRET",
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    })
);


database().then(info=>{
    console.log('Connection with database was established...');
    }).catch(()=>{console.log('ERROR');
    process.exit(1);
});


app.use("/reg", routers.reg);
app.use("/auth", routers.auth);
app.use("/session", routers.escape);
app.use('/add',routers.post);
app.use('/archive',routers.archive);
app.use('/del',routers.del);

hbs.registerHelper("helperPost", function(arr){
    //console.log("this is ID"+arr[0]._id);
    var result="";
    var array = arr;
    for(var i=0; i<array.length; i++){
        result +=
        `<div class="card mb-4">
            <img class="card-img-top" src="/image/photo-2.jpg" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${array[i].title}</h5>
                    <p class="card-text">${array[i].body}</p>
                    <p class="card-text"><small class="text-muted">${array[i].date}</small></p>
                    <a href="/del/${array[i]._id}" class="btn btn-outline-primary btn-sm">delete</a>
            </div>
        </div>`;

    }



    return new hbs.SafeString(result);
});
hbs.registerHelper("escape", function(name){
    var result='';
    if(name){
        result+=    
         '<button type="button" id="escape" class="btn btn-outline-warning my-2 my-sm-0">escape</button>';         
    }    
    
    return new hbs.SafeString(result);
});
hbs.registerHelper("navigation", function(current, pages){    
    var result="";
    if(current==1){
        result=`<nav aria-label="Page navigation example">
                    <ul class="pagination">                
                        <li class="page-item"><a class="page-link" href="/archive/${+(Number(current)+1)}">Next</a></li>
                    </ul>
                </nav>`;
    }else if(current<pages){
        result=`<nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item active"><a class="page-link" href="/archive/${+(Number(current)-1)}">Previous</a></li>                        
                        <li class="page-item"><a class="page-link" href="/archive/${+(Number(current)+1)}">Next</a></li>
                    </ul>
                </nav>`;
    }else if(current==pages){
        result=`<nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item active"><a class="page-link" href="/archive/${+(Number(current)-1)}">Previous</a></li>
                    </ul>
                </nav>`;
    }
        
    
    return new hbs.SafeString(result);
});
hbs.registerHelper("getTime", function(){
    var myDate = new Date();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    return hour + ":" + minute + ":" + second;
});

app.get('/add_post',(req,res)=>{
    res.render('add_post.hbs',{
        user: {
        id: req.session.UserId,
        name: req.session.UserName
        }
    });
});
app.get("/", function(req, res){ 
    if(req.session.UserName){
        res.redirect('/archive/:page',
        );
    }else{
        res.render("index.hbs",{
            user: {
                id: req.session.UserId,
                name: req.session.UserName
            }
        });
    }    
});

module.exports = app;