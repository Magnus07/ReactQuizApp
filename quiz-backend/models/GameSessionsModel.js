var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var GameSessionsSchema = new Schema({
	'player' : String,
	'score' : Number,
	'date' : Date
});

module.exports = mongoose.model('GameSessions', GameSessionsSchema);
