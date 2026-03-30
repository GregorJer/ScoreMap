var Volleyball_teamModel = require('../models/volleyball_teamModel.js');
const Volleyball_playerModel = require('../models/volleyball_playerModel.js');

/**
 * volleyball_teamController.js
 *
 * @description :: Server-side logic for managing volleyball_teams.
 */
function createInitialTeams() {
    // Create two teams each with 5 example player names
    var teams=[];
    for (let i = 3; i < 12; i++) {
        teams.push(new Volleyball_teamModel({
          name: "Team " + i,
          team_members: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"]
        }));
      }
      
    teams.forEach(element => {
        element.save();
        
    });
}

module.exports = {

    /**
     * volleyball_teamController.list()
     */
    list: function (req, res) {
        //createInitialTeams();
        Volleyball_teamModel.find()
            .populate('team_members')
            .exec(function (err, volleyball_teams) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting volleyball_team.',
                        error: err
                    });
                }
                return res.json(volleyball_teams);
            });
    },


    /**
     * volleyball_teamController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Volleyball_teamModel.findOne({ _id: id }, function (err, volleyball_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting volleyball_team.',
                    error: err
                });
            }

            if (!volleyball_team) {
                return res.status(404).json({
                    message: 'No such volleyball_team'
                });
            }

            return res.json(volleyball_team);
        });
    },

    /**
     * volleyball_teamController.create()
     */
    /**
 * volleyball_teamController.create()
 */
    create: function (req, res) {
        var volleyball_team = new Volleyball_teamModel({
            name: req.body.name,
        });

        // Assume req.body.team_members is an array of player names
        const playerNames = req.body.team_members;

        // Find players by their names and get their ObjectId
        Volleyball_playerModel.find({
            name: { $in: playerNames }
        }, function (err, players) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating volleyball_team',
                    error: err
                });
            }

            // Save player ObjectId to team_members
            players.forEach(player => {
                volleyball_team.team_members.push(player._id);
            });

            // Save the volleyball team
            volleyball_team.save(function (err, volleyball_team) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating volleyball_team',
                        error: err
                    });
                }

                return res.status(201).json(volleyball_team);
            });
        });
    },


    /**
     * volleyball_teamController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Volleyball_teamModel.findOne({ _id: id }, function (err, volleyball_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting volleyball_team',
                    error: err
                });
            }

            if (!volleyball_team) {
                return res.status(404).json({
                    message: 'No such volleyball_team'
                });
            }

            volleyball_team.name = req.body.name ? req.body.name : volleyball_team.name;
            volleyball_team.team_members = req.body.team_members ? req.body.team_members : volleyball_team.team_members;

            volleyball_team.save(function (err, volleyball_team) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating volleyball_team.',
                        error: err
                    });
                }

                return res.json(volleyball_team);
            });
        });
    },

    /**
     * volleyball_teamController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Volleyball_teamModel.findByIdAndRemove(id, function (err, volleyball_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the volleyball_team.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    createMany: function (req, res) {
        Volleyball_teamModel.insertMany(req.body, function (err, volleyball_games) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_games',
                    error: err
                });
            }
            return res.status(201).json(volleyball_games);
        });
    }

};
