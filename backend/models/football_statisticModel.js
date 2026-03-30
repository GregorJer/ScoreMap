var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var football_statisticSchema = new Schema({
	'position' : Number,
	'club' : String,
	'playedMatches' : Number,
	'wins' : Number,
	'draw' : Number,
	'losses' : Number,
	'goalDifference' : Number,
	'points' : Number
});

module.exports = mongoose.model('football_statistic', football_statisticSchema);
