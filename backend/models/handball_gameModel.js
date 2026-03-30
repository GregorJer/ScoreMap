var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var handball_gameSchema = new Schema({
	'dateTime' : Date,
	'homeTeam' : String,
	'awayTeam' : String,
	'homeLogo' : String,
	'awayLogo' : String,
	'homeGoals' : Number,
	'awayGoals' : Number,
	'streamLink' : String,
	'location' : String,
	'lng' : Number,
	'lat' : Number,
	'generated': Boolean
});

module.exports = mongoose.model('handball_game', handball_gameSchema);
