  let User = require('../db/User')

let userController = {

  newUser:function(req,res, cb){
 

 
    User.findOne({ username: req.body.username }, function(err1, user){
      if (!user) {
          var newUser = new User
            ({
              username: req.body.username,
              password: req.body.password,
              email: req.body.email,
              name:req.body.name

 
            });
 
        newUser.save(function(err,user){
          if(err)
            cb(err,"ERROR CAN NOT SAVE ","ERROR"); 
        else
        cb(err,user,"SUCCESS");
      });
 
      }else{
 
      
        cb(err1,"UserName ALREADY EXIST","ERROR");
 
      }
 
 
 
    });
 
  },



checkUserLogin:function(req,res,cb) {
   
        User.findOne({username :req.body.username },(err,user)=>{
 
          if(err){
            cb(err,"ERROR","ERROR");
          }else{
            if(user){
            user.checkPassword (req.body.password,(err2,isMatch)=>{
              if(err2){
                cb(err,"ERROR","ERROR");
              }else{
 
                  if(isMatch && isMatch==true){
                     console.log("right");
                       cb(err,user,"User");
                    // cb(err2,student,"SUCCESS");
                    }else{
                       cb(err2,"WRONG PASSWORD","ERROR");
                    }
 
 
            }
            });
 
          }else{
            cb(err,"USERNAME NOT FOUND","ERROR")
          }
        }
        });
      
 
  }


  }
 
module.exports = userController;