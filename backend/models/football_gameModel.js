var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var football_gameSchema = new Schema({
	'firstOpponent' : String,
	'score' : String,
	'secondOpponent' : String,
	'location' : String,
	'date' : Date,
	'lng' : Number,
	'lat' : Number,
	'generated': Boolean
});

module.exports = mongoose.model('football_game', football_gameSchema);
