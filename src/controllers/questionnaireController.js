  let Questionnaire = require('../db/Questionnaire')

let questionnaireController = {
  newQuestionnaire:function(req,res, cb){
 
 
    Questionnaire.findOne({ title: req.body.title }, function(err1, questionnaire){
      if (!questionnaire) {
          var newQ = new Questionnaire
            ({
              title: req.body.title,
              description: req.body.description
 
            });
 
        newQ.save(function(err,questionnaire){
          if(err)
            cb(err,"ERROR CAN NOT SAVE ","ERROR"); 
        else
        cb(err,questionnaire,"SUCCESS");
      });
 
      }else{
 
      
        cb(err1,"questionnaire Name ALREADY EXIST","ERROR");
 
      }
 
 
 
    });
 
  }

  }
 
module.exports = questionnaireController;