var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var volleyball_teamSchema = new Schema({
    'name': String,
    'team_members': [String]
    //'team_members': [{ type: Schema.Types.ObjectId, ref: 'volleyball_player' }]
});

module.exports = mongoose.model('volleyball_team', volleyball_teamSchema);
