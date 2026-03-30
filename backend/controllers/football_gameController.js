var Football_gameModel = require('../models/football_gameModel.js');

/**
 * football_gameController.js
 *
 * @description :: Server-side logic for managing football_games.
 */
function parseSlovenianDate(input) {
    const slovenianMonths = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
    
    // split input and extract date part
    let datePart = input.split(",")[1].trim();
    
    // split date part into day, month, year
    let dateComponents = datePart.split(".");
    let day = dateComponents[0].trim();
    let month = slovenianMonths.indexOf(dateComponents[1].split(" ")[0].toLowerCase().trim());
    let year = dateComponents[1].split(" ")[1].trim();
    
    // create JavaScript Date object
    // Note that we don't need to translate the month from Slovenian to English anymore. 
    // Instead, we use the zero-based index directly in the Date constructor.
    let date = new Date(year, month, day);
    date.setUTCDate(day);

    return date;
}

function parseGeneratedDate(input) {
    // Split the input string by space to separate time and date
    let parts = input.split(" ");
  
    // Split the time part into hours and minutes
    let timeParts = parts[0].split(":");
    let hours = timeParts[0];
    let minutes = timeParts[1];
  
    // Split the date part into day, month, year
    let dateParts = parts[1].split(".");
    let day = dateParts[0];
    let month = dateParts[1] - 1; // Subtract 1 from the month to account for JavaScript's 0-based month index
    let year = dateParts[2];
  
    // Create a new Date object with the parsed values
    let date = new Date(year, month, day, hours, minutes);
    date.setUTCHours(hours);
  
    return date;
  }

module.exports = {

    /**
     * football_gameController.list()
     */
    list: function (req, res) {
        Football_gameModel.find(function (err, football_games) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_game.',
                    error: err
                });
            }

            return res.json(football_games);
        });
    },

    /**
     * football_gameController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Football_gameModel.findOne({ _id: id }, function (err, football_game) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_game.',
                    error: err
                });
            }

            if (!football_game) {
                return res.status(404).json({
                    message: 'No such football_game'
                });
            }

            return res.json(football_game);
        });
    },

    /**
     * football_gameController.create()
     */
    create: function (req, res) {
        var football_game = new Football_gameModel({
            firstOpponent: req.body.firstOpponent,
            score: req.body.score,
            secondOpponent: req.body.secondOpponent,
            location: req.body.location,
            lng: req.body.lng,
            lat: req.body.lat,
            generated: req.body.generated,
            date: req.body.date
        });

        football_game.save(function (err, football_game) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating football_game',
                    error: err
                });
            }

            return res.status(201).json(football_game);
        });
    },

    /**
     * football_gameController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Football_gameModel.findOne({ _id: id }, function (err, football_game) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting football_game',
                    error: err
                });
            }

            if (!football_game) {
                return res.status(404).json({
                    message: 'No such football_game'
                });
            }

            football_game.firstOpponent = req.body.firstOpponent ? req.body.firstOpponent : football_game.firstOpponent;
            football_game.score = req.body.score ? req.body.score : football_game.score;
            football_game.secondOpponent = req.body.secondOpponent ? req.body.secondOpponent : football_game.secondOpponent;
            football_game.location = req.body.location ? req.body.location : football_game.location;
            football_game.lng = req.body.lng ? req.body.lng : football_game.lng;
            football_game.lat = req.body.lat ? req.body.lat : football_game.lat;
            football_game.generated = req.body.generated ? req.body.generated : football_game.generated;
            football_game.date = req.body.date ? req.body.date : football_game.date;

            football_game.save(function (err, football_game) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating football_game.',
                        error: err
                    });
                }

                return res.json(football_game);
            });
        });
    },

    /**
     * football_gameController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Football_gameModel.findByIdAndRemove(id, function (err, football_game) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the football_game.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    createMany: function (req, res) {
        const football_games = req.body.map(game => {
            if (game.generated === true){
                var date = parseGeneratedDate(game.date)
            }
            else {
                var date = parseSlovenianDate(game.date);
            }
            return {
                ...game,
                date: date,
            };
        });

        Football_gameModel.insertMany(football_games, function (err, docs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating football games',
                    error: err
                });
            } else {
                return res.status(201).json(docs);
            }
        });
    }

};
