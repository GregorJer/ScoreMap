var Football_statisticModel = require('../models/football_statisticModel.js');

/**
 * football_statisticController.js
 *
 * @description :: Server-side logic for managing football_statistics.
 */
module.exports = {

    /**
     * football_statisticController.list()
     */
    list: function (req, res) {
        Football_statisticModel.find(function (err, football_statistics) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_statistic.',
                    error: err
                });
            }

            return res.json(football_statistics);
        });
    },

    /**
     * football_statisticController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Football_statisticModel.findOne({_id: id}, function (err, football_statistic) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_statistic.',
                    error: err
                });
            }

            if (!football_statistic) {
                return res.status(404).json({
                    message: 'No such football_statistic'
                });
            }

            return res.json(football_statistic);
        });
    },

    /**
     * football_statisticController.create()
     */
    create: function (req, res) {
        var football_statistic = new Football_statisticModel({
			position : req.body.position,
			club : req.body.club,
			playedMatches : req.body.playedMatches,
			wins : req.body.wins,
			draw : req.body.draw,
			losses : req.body.losses,
			goalDifference : req.body.goalDifference,
			points : req.body.points
        });

        football_statistic.save(function (err, football_statistic) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating football_statistic',
                    error: err
                });
            }

            return res.status(201).json(football_statistic);
        });
    },

    /**
     * football_statisticController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Football_statisticModel.findOne({_id: id}, function (err, football_statistic) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_statistic',
                    error: err
                });
            }

            if (!football_statistic) {
                return res.status(404).json({
                    message: 'No such football_statistic'
                });
            }

            football_statistic.position = req.body.position ? req.body.position : football_statistic.position;
			football_statistic.club = req.body.club ? req.body.club : football_statistic.club;
			football_statistic.playedMatches = req.body.playedMatches ? req.body.playedMatches : football_statistic.playedMatches;
			football_statistic.wins = req.body.wins ? req.body.wins : football_statistic.wins;
			football_statistic.draw = req.body.draw ? req.body.draw : football_statistic.draw;
			football_statistic.losses = req.body.losses ? req.body.losses : football_statistic.losses;
			football_statistic.goalDifference = req.body.goalDifference ? req.body.goalDifference : football_statistic.goalDifference;
			football_statistic.points = req.body.points ? req.body.points : football_statistic.points;
			
            football_statistic.save(function (err, football_statistic) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating football_statistic.',
                        error: err
                    });
                }

                return res.json(football_statistic);
            });
        });
    },

    /**
     * football_statisticController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Football_statisticModel.findByIdAndRemove(id, function (err, football_statistic) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the football_statistic.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    createMany: function(req, res) {
        Football_statisticModel.insertMany(req.body, function(err, football_statistics) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_teams',
                    error: err
                });
            }
    
            return res.status(201).json(football_statistics);
        });
    },
};
