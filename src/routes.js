var express = require('express');
var router = express.Router();
var Questionnaire=require('./db/Questionnaire');
var questionaireController = require('./controllers/questionnaireController');
var User=require('./db/User');
var userController = require('./controllers/userController');

var app = require('./index.js');

var path = require('path');
var mime = require('mime');

var multer = require('multer');
var storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, './app/uploads');
  },
  filename : function(req, file, cb){
    cb(null, Date.now() + "." + mime.extension(file.mimetype))
  }
});


var upload = multer({storage : storage}); //check the path




router.get('/',function (req,res){
       res.sendFile(path.join(__dirname,'../','app','index.html'))
});



router.post('/Questionnaire', function(req,res){

	questionaireController.newQuestionnaire(req,res,function(error,questionnaire,type){
     if(type === "ERROR")
          res.json({
            type : type,
            message : questionnaire
          });
     else
          res.json({
            type : type,
            message : "Success",
            content : questionnaire
          });
        
});

});

router.post('/register', function(req,res){

	userController.newUser(req,res,function(error,user,type){
     if(type === "ERROR")
          res.json({
            type : type,
            message : user
          });
     else
          res.json({
            type : type,
            message : "Success",
            content : user
          });
        
});

});

router.post('/login', function(req,res){
  userController.checkUserLogin(req,res,function(error,message,type){
    if(type == "ERROR")
      res.json({
        type : type,
        message : message
      });
    else {
      var token = app.jwt.sign({username: message.username, id: message._id, type:type}, app.app.get('super-secret'), {});

      
         res.json({
          token : token,
          type : "SUCCESS",
          message : "You are successfully logged in !",
          content : message
        });
    }

  });

});

router.use(function(req,res,next){ //this middleware adds the decoded token the req before continuing to any other routes
                                   //so if you need to access an attribute saved in the token,
                                   //use req.decoded.attrName
  var token = req.body.token || req.headers['x-access-token'] || req.body.query;

  if(token){
    app.jwt.verify(token, app.app.get('super-secret'),function(err,decoded){

      if(!err){
        req.decoded = decoded
        console.log(req.decoded)
        console.log("worked !!")
        next()

      } else {

        return res.json({
          success:false,
          message:"Token not verfied;"
        });

      }

    });

  } else {
        return res.status("401").json({
          success:false,
          message:"No token;"
        });
  }

});

router.post('/me',function(req,res){
  res.json({
    token:req.headers['x-access-token'],
    decoded:req.decoded
  });
});




module.exports =router;
