var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var handball_rankingSchema = new Schema({
	'position' : Number,
	'club' : String,
	'matchesPlayed' : Number,
	'matchesWon' : Number,
	'matchesDrawn' : Number,
	'matchesLost' : Number,
	'goalsFor' : Number,
	'goalsAgainst' : Number,
	'goalDifference' : Number,
	'points' : Number
});

module.exports = mongoose.model('handball_ranking', handball_rankingSchema);
