var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var QuestionSchema = new Schema({
	'category' : String,
	'type' : String,
	'difficulty' : String,
	'question' : String,
	'correct_answer' : String,
	'incorrect_answers' : Array
});

module.exports = mongoose.model('Question', QuestionSchema);
