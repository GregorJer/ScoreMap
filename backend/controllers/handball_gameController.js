var Handball_gameModel = require('../models/handball_gameModel.js');

/**
 * handball_gameController.js
 *
 * @description :: Server-side logic for managing handball_games.
 */
module.exports = {

    /**
     * handball_gameController.list()
     */
    list: function (req, res) {
        Handball_gameModel.find(function (err, handball_games) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_game.',
                    error: err
                });
            }

            return res.json(handball_games);
        });
    },

    /**
     * handball_gameController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Handball_gameModel.findOne({_id: id}, function (err, handball_game) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_game.',
                    error: err
                });
            }

            if (!handball_game) {
                return res.status(404).json({
                    message: 'No such handball_game'
                });
            }

            return res.json(handball_game);
        });
    },

    /**
     * handball_gameController.create()
     */
    create: function (req, res) {
        // Split the date into components
        var dateParts = req.body.date.split('.');
        var day = dateParts[0];
        var month = dateParts[1];
        var year = dateParts[2];
    
        // Reformat the date string and combine it with the time string
        var dateTimeString = month + '/' + day + '/' + year + ' ' + req.body.time;
    
        // Parse the combined string into a Date object
        var dateTime = new Date(dateTimeString);
    
        var handball_game = new Handball_gameModel({
            dateTime : dateTime,
            homeTeam : req.body.homeTeam,
            awayTeam : req.body.awayTeam,
            homeLogo : req.body.homeLogo,
            awayLogo : req.body.awayLogo,
            homeGoals : req.body.homeGoals,
            awayGoals : req.body.awayGoals,
            streamLink : req.body.streamLink,
            location : req.body.location,
            lng : req.body.lng,
            lat : req.body.lat,
            generated: req.body.generated
        });
    
        handball_game.save(function (err, handball_game) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_game',
                    error: err
                });
            }
    
            return res.status(201).json(handball_game);
        });
    },
    

    /**
     * handball_gameController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Handball_gameModel.findOne({_id: id}, function (err, handball_game) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_game',
                    error: err
                });
            }

            if (!handball_game) {
                return res.status(404).json({
                    message: 'No such handball_game'
                });
            }

            handball_game.date = req.body.date ? req.body.date : handball_game.date;
			handball_game.time = req.body.time ? req.body.time : handball_game.time;
			handball_game.homeTeam = req.body.homeTeam ? req.body.homeTeam : handball_game.homeTeam;
			handball_game.awayTeam = req.body.awayTeam ? req.body.awayTeam : handball_game.awayTeam;
			handball_game.homeLogo = req.body.homeLogo ? req.body.homeLogo : handball_game.homeLogo;
			handball_game.awayLogo = req.body.awayLogo ? req.body.awayLogo : handball_game.awayLogo;
			handball_game.homeGoals = req.body.homeGoals ? req.body.homeGoals : handball_game.homeGoals;
			handball_game.awayGoals = req.body.awayGoals ? req.body.awayGoals : handball_game.awayGoals;
			handball_game.streamLink = req.body.streamLink ? req.body.streamLink : handball_game.streamLink;
			handball_game.location = req.body.location ? req.body.location : handball_game.location;
            handball_game.lng = req.body.lng ? req.body.lng : handball_game.lng;
            handball_game.lat = req.body.lat ? req.body.lat : handball_game.lat;
            handball_game.generated = req.body.generated ? req.body.generated : handball_game.generated;
			
            handball_game.save(function (err, handball_game) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating handball_game.',
                        error: err
                    });
                }

                return res.json(handball_game);
            });
        });
    },

    /**
     * handball_gameController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Handball_gameModel.findByIdAndRemove(id, function (err, handball_game) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the handball_game.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    createMany: function (req, res) {
        const handball_games = req.body.map(game => {
            // Split the date into components
            var dateParts = game.date.split('.');
            var day = dateParts[0];
            var month = dateParts[1];
            var year = dateParts[2];
    
            // Reformat the date string and combine it with the time string
            var dateTimeString = month + '/' + day + '/' + year + ' ' + game.time;
    
            // Parse the combined string into a Date object
            var dateTime = new Date(dateTimeString);
            dateTime.setUTCHours(game.time.split(':')[0]);
    
            return {
                ...game,
                dateTime: dateTime,
            };
        });
    
        Handball_gameModel.insertMany(handball_games, function (err, docs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball games',
                    error: err
                });
            } else {
                return res.status(201).json(docs);
            }
        });
    }
    
};
