var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var football_playerSchema = new Schema({
	'number' : Number,
	'position' : String,
	'nameSurname' : String,
	'yearOfBirth' : Number,
	'played' : Number,
	'scored' : Number
});

module.exports = mongoose.model('football_player', football_playerSchema);
