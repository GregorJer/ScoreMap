var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var volleyball_statisticSchema = new Schema({
	'club' : String,
	'rankingPoints' : Number,
	'playedMatches' : Number,
	'wins' : Number,
	'losses' : Number,
	'setsWon' : Number,
	'setsLost' : Number,
	'pointsWon' : Number,
	'pointsLost' : Number,
	'setRatio' : Number,
	'pointRatio' : Number
});

module.exports = mongoose.model('volleyball_statistic', volleyball_statisticSchema);
