var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var volleyball_gameSchema = new Schema({
	'firstOpponent' : String,
	'score' : String,
	'secondOpponent' : String,
	'location' : String,
	'dateTime' : Date,
	'lat': Number,
	'lng': Number,
	'generated': Boolean
});

module.exports = mongoose.model('volleyball_game', volleyball_gameSchema);
