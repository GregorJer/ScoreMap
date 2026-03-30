var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var messageSchema = new Schema({
	'contents' : String,
	'created' : Date,
	'createdBy' : {
		type: Schema.Types.ObjectId,
		ref: 'user'
   },
   'game': { type: mongoose.Schema.Types.ObjectId, refPath: 'gameType' },
   'gameType': { type: String, enum: ['football_game', 'volleyball_game', 'handball_game'] },
});


module.exports = mongoose.model('message', messageSchema);
