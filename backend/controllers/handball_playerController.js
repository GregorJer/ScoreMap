var Handball_playerModel = require('../models/handball_playerModel.js');

/**
 * handball_playerController.js
 *
 * @description :: Server-side logic for managing handball_players.
 */
async function insertRandomData() {
    for (let i = 0; i < 20; i++) {
      const handball_player = new Handball_playerModel({
        number: Math.floor(Math.random() * 100),
        image: `image_${i}`,
        name: `Name ${i}`,
        surname: `Surname ${i}`,
        team: `Team ${Math.floor(Math.random() * 100)}`,
        matches: Math.floor(Math.random() * 100),
        goals: Math.floor(Math.random() * 100),
        shots: Math.floor(Math.random() * 100),
        goalsPerMatch: (Math.random() * 10).toFixed(2) // Random goals per match with 2 decimal places
      });
  
      await handball_player.save();
    }
  }
  
module.exports = {

    /**
     * handball_playerController.list()
     */
    list: function (req, res) {
        //insertRandomData();
        Handball_playerModel.find(function (err, handball_players) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_player.',
                    error: err
                });
            }

            return res.json(handball_players);
        });
    },

    /**
     * handball_playerController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Handball_playerModel.findOne({_id: id}, function (err, handball_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_player.',
                    error: err
                });
            }

            if (!handball_player) {
                return res.status(404).json({
                    message: 'No such handball_player'
                });
            }

            return res.json(handball_player);
        });
    },

    /**
     * handball_playerController.create()
     */
    create: function (req, res) {
        var handball_player = new Handball_playerModel({
			number : req.body.number,
			image : req.body.image,
			name : req.body.name,
			surname : req.body.surname,
			team : req.body.team,
			matches : req.body.matches,
			goals : req.body.goals,
			shots : req.body.shots,
			goalsPerMatch : req.body.goalsPerMatch
        });

        handball_player.save(function (err, handball_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_player',
                    error: err
                });
            }

            return res.status(201).json(handball_player);
        });
    },

    /**
     * handball_playerController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Handball_playerModel.findOne({_id: id}, function (err, handball_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_player',
                    error: err
                });
            }

            if (!handball_player) {
                return res.status(404).json({
                    message: 'No such handball_player'
                });
            }

            handball_player.number = req.body.number ? req.body.number : handball_player.number;
			handball_player.image = req.body.image ? req.body.image : handball_player.image;
			handball_player.name = req.body.name ? req.body.name : handball_player.name;
			handball_player.surname = req.body.surname ? req.body.surname : handball_player.surname;
			handball_player.team = req.body.team ? req.body.team : handball_player.team;
			handball_player.matches = req.body.matches ? req.body.matches : handball_player.matches;
			handball_player.goals = req.body.goals ? req.body.goals : handball_player.goals;
			handball_player.shots = req.body.shots ? req.body.shots : handball_player.shots;
			handball_player.goalsPerMatch = req.body.goalsPerMatch ? req.body.goalsPerMatch : handball_player.goalsPerMatch;
			
            handball_player.save(function (err, handball_player) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating handball_player.',
                        error: err
                    });
                }

                return res.json(handball_player);
            });
        });
    },

    /**
     * handball_playerController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Handball_playerModel.findByIdAndRemove(id, function (err, handball_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the handball_player.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    createMany: function (req, res) {
        Handball_playerModel.insertMany(req.body, function (err, handball_players) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_games',
                    error: err
                });
            }
            return res.status(201).json(handball_players);
        });
    }
};
