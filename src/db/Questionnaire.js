var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionnaireSchema = new Schema({
	title: {
		type: String,
		required:true,
		unique:true
	},
	description: {
		type: String,
		required:true
	}

});



var questionnaire = module.exports = mongoose.model('Questionnaire', questionnaireSchema);