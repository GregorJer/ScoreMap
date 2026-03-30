var Handball_rankingModel = require('../models/handball_rankingModel.js');

/**
 * handball_rankingController.js
 *
 * @description :: Server-side logic for managing handball_rankings.
 */
async function insertRandomData() {
    for (let i = 0; i < 5; i++) {
      const handball_ranking = new Handball_rankingModel({
        position: Math.floor(Math.random() * 100),
        club: `Club ${Math.floor(Math.random() * 100)}`,
        matchesPlayed: Math.floor(Math.random() * 100),
        matchesWon: Math.floor(Math.random() * 100),
        matchesDrawn: Math.floor(Math.random() * 100),
        matchesLost: Math.floor(Math.random() * 100),
        goalsFor: Math.floor(Math.random() * 100),
        goalsAgainst: Math.floor(Math.random() * 100),
        goalDifference: Math.floor(Math.random() * 100),
        points: Math.floor(Math.random() * 100)
      });
  
      await handball_ranking.save();
    }
  }
module.exports = {

    /**
     * handball_rankingController.list()
     */
    list: function (req, res) {
        //insertRandomData()
        Handball_rankingModel.find(function (err, handball_rankings) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_ranking.',
                    error: err
                });
            }

            return res.json(handball_rankings);
        });
    },

    /**
     * handball_rankingController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Handball_rankingModel.findOne({_id: id}, function (err, handball_ranking) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_ranking.',
                    error: err
                });
            }

            if (!handball_ranking) {
                return res.status(404).json({
                    message: 'No such handball_ranking'
                });
            }

            return res.json(handball_ranking);
        });
    },

    /**
     * handball_rankingController.create()
     */
    create: function (req, res) {
        var handball_ranking = new Handball_rankingModel({
			position : req.body.position,
			club : req.body.club,
			matchesPlayed : req.body.matchesPlayed,
			matchesWon : req.body.matchesWon,
			matchesDrawn : req.body.matchesDrawn,
			matchesLost : req.body.matchesLost,
			goalsFor : req.body.goalsFor,
			goalsAgainst : req.body.goalsAgainst,
			goalDifference : req.body.goalDifference,
			points : req.body.points
        });

        handball_ranking.save(function (err, handball_ranking) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_ranking',
                    error: err
                });
            }

            return res.status(201).json(handball_ranking);
        });
    },

    /**
     * handball_rankingController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Handball_rankingModel.findOne({_id: id}, function (err, handball_ranking) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_ranking',
                    error: err
                });
            }

            if (!handball_ranking) {
                return res.status(404).json({
                    message: 'No such handball_ranking'
                });
            }

            handball_ranking.position = req.body.position ? req.body.position : handball_ranking.position;
			handball_ranking.club = req.body.club ? req.body.club : handball_ranking.club;
			handball_ranking.matchesPlayed = req.body.matchesPlayed ? req.body.matchesPlayed : handball_ranking.matchesPlayed;
			handball_ranking.matchesWon = req.body.matchesWon ? req.body.matchesWon : handball_ranking.matchesWon;
			handball_ranking.matchesDrawn = req.body.matchesDrawn ? req.body.matchesDrawn : handball_ranking.matchesDrawn;
			handball_ranking.matchesLost = req.body.matchesLost ? req.body.matchesLost : handball_ranking.matchesLost;
			handball_ranking.goalsFor = req.body.goalsFor ? req.body.goalsFor : handball_ranking.goalsFor;
			handball_ranking.goalsAgainst = req.body.goalsAgainst ? req.body.goalsAgainst : handball_ranking.goalsAgainst;
			handball_ranking.goalDifference = req.body.goalDifference ? req.body.goalDifference : handball_ranking.goalDifference;
			handball_ranking.points = req.body.points ? req.body.points : handball_ranking.points;
			
            handball_ranking.save(function (err, handball_ranking) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating handball_ranking.',
                        error: err
                    });
                }

                return res.json(handball_ranking);
            });
        });
    },

    /**
     * handball_rankingController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Handball_rankingModel.findByIdAndRemove(id, function (err, handball_ranking) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the handball_ranking.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    createMany: function (req, res) {
        Handball_rankingModel.insertMany(req.body, function (err, handball_rankings) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_games',
                    error: err
                });
            }
            return res.status(201).json(handball_rankings);
        });
    }
};
