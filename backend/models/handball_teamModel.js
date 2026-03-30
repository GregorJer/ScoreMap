var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var handball_teamSchema = new Schema({
	'name' : String,
	'address' : String,
	'city' : String,
	'updatedAt' : String,
	'email' : String,
	'logoImage' : String,
	'contact' : String,
	'players' : [String]
});

module.exports = mongoose.model('handball_team', handball_teamSchema);
