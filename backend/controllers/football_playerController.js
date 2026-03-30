var Football_playerModel = require('../models/football_playerModel.js');

/**
 * football_playerController.js
 *
 * @description :: Server-side logic for managing football_players.
 */
module.exports = {

    /**
     * football_playerController.list()
     */
    list: function (req, res) {
        Football_playerModel.find(function (err, football_players) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_player.',
                    error: err
                });
            }

            return res.json(football_players);
        });
    },

    /**
     * football_playerController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Football_playerModel.findOne({_id: id}, function (err, football_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_player.',
                    error: err
                });
            }

            if (!football_player) {
                return res.status(404).json({
                    message: 'No such football_player'
                });
            }

            return res.json(football_player);
        });
    },

    /**
     * football_playerController.create()
     */
    create: function (req, res) {
        var football_player = new Football_playerModel({
			number : req.body.number,
			position : req.body.position,
			nameSurname : req.body.nameSurname,
			yearOfBirth : req.body.yearOfBirth,
			played : req.body.played,
			scored : req.body.scored
        });

        football_player.save(function (err, football_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating football_player',
                    error: err
                });
            }

            return res.status(201).json(football_player);
        });
    },

    /**
     * football_playerController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Football_playerModel.findOne({_id: id}, function (err, football_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_player',
                    error: err
                });
            }

            if (!football_player) {
                return res.status(404).json({
                    message: 'No such football_player'
                });
            }

            football_player.number = req.body.number ? req.body.number : football_player.number;
			football_player.position = req.body.position ? req.body.position : football_player.position;
			football_player.nameSurname = req.body.nameSurname ? req.body.nameSurname : football_player.nameSurname;
			football_player.yearOfBirth = req.body.yearOfBirth ? req.body.yearOfBirth : football_player.yearOfBirth;
			football_player.played = req.body.played ? req.body.played : football_player.played;
			football_player.scored = req.body.scored ? req.body.scored : football_player.scored;
			
            football_player.save(function (err, football_player) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating football_player.',
                        error: err
                    });
                }

                return res.json(football_player);
            });
        });
    },

    /**
     * football_playerController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Football_playerModel.findByIdAndRemove(id, function (err, football_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the football_player.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    createMany: function(req, res) {
        Football_playerModel.insertMany(req.body, function(err, football_players) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_teams',
                    error: err
                });
            }
    
            return res.status(201).json(football_players);
        });
    }
};
