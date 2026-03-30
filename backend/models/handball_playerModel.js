var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var handball_playerSchema = new Schema({
	'number' : Number,
	'image' : String,
	'name' : String,
	'surname' : String,
	'team' : String,
	'matches' : Number,
	'goals' : String,
	'shots' : String,
	'goalsPerMatch' : String
});

module.exports = mongoose.model('handball_player', handball_playerSchema);
