var Football_teamModel = require('../models/football_teamModel.js');

/**
 * football_teamController.js
 *
 * @description :: Server-side logic for managing football_teams.
 */
module.exports = {

    /**
     * football_teamController.list()
     */
    list: function (req, res) {
        Football_teamModel.find(function (err, football_teams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_team.',
                    error: err
                });
            }

            return res.json(football_teams);
        });
    },

    /**
     * football_teamController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Football_teamModel.findOne({_id: id}, function (err, football_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_team.',
                    error: err
                });
            }

            if (!football_team) {
                return res.status(404).json({
                    message: 'No such football_team'
                });
            }

            return res.json(football_team);
        });
    },

    /**
     * football_teamController.create()
     */
    create: function (req, res) {
        var football_team = new Football_teamModel({
			name : req.body.name,
			footballPlayers : req.body.footballPlayers
        });

        football_team.save(function (err, football_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating football_team',
                    error: err
                });
            }

            return res.status(201).json(football_team);
        });
    },

    /**
     * football_teamController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Football_teamModel.findOne({_id: id}, function (err, football_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_team',
                    error: err
                });
            }

            if (!football_team) {
                return res.status(404).json({
                    message: 'No such football_team'
                });
            }

            football_team.name = req.body.name ? req.body.name : football_team.name;
			football_team.footballPlayers = req.body.footballPlayers ? req.body.footballPlayers : football_team.footballPlayers;
			
            football_team.save(function (err, football_team) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating football_team.',
                        error: err
                    });
                }

                return res.json(football_team);
            });
        });
    },

    /**
     * football_teamController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Football_teamModel.findByIdAndRemove(id, function (err, football_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the football_team.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    createMany: function(req, res) {
        Football_teamModel.insertMany(req.body, function(err, football_teams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_teams',
                    error: err
                });
            }
    
            return res.status(201).json(football_teams);
        });
    },
};
