var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var volleyball_playerSchema = new Schema({
	'number' : Number,
	'name' : String,
	'position' : String,
	'date_of_birth' : Date,
	'height' : Number,
	'spike_reach' : Number,
	'block_reach' : Number,
	'team' : String
});

module.exports = mongoose.model('volleyball_player', volleyball_playerSchema);