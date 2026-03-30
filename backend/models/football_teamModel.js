var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var football_teamSchema = new Schema({
	'name' : String,
	'footballPlayers' : Array
});

module.exports = mongoose.model('football_team', football_teamSchema);
