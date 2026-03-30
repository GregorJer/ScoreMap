var Volleyball_statisticModel = require('../models/volleyball_statisticModel.js');

/**
 * volleyball_statisticController.js
 *
 * @description :: Server-side logic for managing volleyball_statistics.
 */
function createTestExamples() {
    const testExamples = [
        {
          club: "Club A",
          rankingPoints: 100,
          playedMatches: 10,
          wins: 7,
          losses: 3,
          setsWon: 20,
          setsLost: 15,
          pointsWon: 500,
          pointsLost: 450,
          setRatio: 1.33,
          pointRatio: 1.11
        },
        {
          club: "Club B",
          rankingPoints: 80,
          playedMatches: 9,
          wins: 5,
          losses: 4,
          setsWon: 18,
          setsLost: 17,
          pointsWon: 480,
          pointsLost: 470,
          setRatio: 1.06,
          pointRatio: 1.02
        },
        {
          club: "Club C",
          rankingPoints: 90,
          playedMatches: 15,
          wins: 10,
          losses: 5,
          setsWon: 30,
          setsLost: 25,
          pointsWon: 600,
          pointsLost: 550,
          setRatio: 1.2,
          pointRatio: 1.09
        },
        {
          club: "Club D",
          rankingPoints: 110,
          playedMatches: 20,
          wins: 15,
          losses: 5,
          setsWon: 45,
          setsLost: 20,
          pointsWon: 750,
          pointsLost: 600,
          setRatio: 2.25,
          pointRatio: 1.25
        },
        {
          club: "Club E",
          rankingPoints: 120,
          playedMatches: 25,
          wins: 18,
          losses: 7,
          setsWon: 54,
          setsLost: 28,
          pointsWon: 900,
          pointsLost: 700,
          setRatio: 1.93,
          pointRatio: 1.29
        },
        {
            club: "Club F",
            rankingPoints: 120,
            playedMatches: 25,
            wins: 18,
            losses: 7,
            setsWon: 54,
            setsLost: 28,
            pointsWon: 900,
            pointsLost: 700,
            setRatio: 1.93,
            pointRatio: 1.29
          },
          {
            club: "Club G",
            rankingPoints: 120,
            playedMatches: 25,
            wins: 18,
            losses: 7,
            setsWon: 54,
            setsLost: 28,
            pointsWon: 900,
            pointsLost: 700,
            setRatio: 1.93,
            pointRatio: 1.29
          },
      // Add more test examples as needed
    ];
  
    testExamples.forEach(example => {
      const volleyball_statistic = new Volleyball_statisticModel(example);
      volleyball_statistic.save()
        .then(savedExample => console.log("Test example saved:", savedExample))
        .catch(error => console.error("Error saving test example:", error));
    });
  }
module.exports = {

    /**
     * volleyball_statisticController.list()
     */
    list: function (req, res) {
        //createTestExamples();
        Volleyball_statisticModel.find(function (err, volleyball_statistics) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting volleyball_statistic.',
                    error: err
                });
            }

            return res.json(volleyball_statistics);
        });
    },

    /**
     * volleyball_statisticController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Volleyball_statisticModel.findOne({_id: id}, function (err, volleyball_statistic) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting volleyball_statistic.',
                    error: err
                });
            }

            if (!volleyball_statistic) {
                return res.status(404).json({
                    message: 'No such volleyball_statistic'
                });
            }

            return res.json(volleyball_statistic);
        });
    },

    /**
     * volleyball_statisticController.create()
     */
    create: function (req, res) {
        var volleyball_statistic = new Volleyball_statisticModel({
			club : req.body.club,
			rankingPoints : req.body.rankingPoints,
			playedMatches : req.body.playedMatches,
			wins : req.body.wins,
			losses : req.body.losses,
			setsWon : req.body.setsWon,
			setsLost : req.body.setsLost,
			pointsWon : req.body.pointsWon,
			pointsLost : req.body.pointsLost,
			setRatio : req.body.setRatio,
			pointRatio : req.body.pointRatio
        });

        volleyball_statistic.save(function (err, volleyball_statistic) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating volleyball_statistic',
                    error: err
                });
            }

            return res.status(201).json(volleyball_statistic);
        });
    },

    /**
     * volleyball_statisticController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Volleyball_statisticModel.findOne({_id: id}, function (err, volleyball_statistic) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting volleyball_statistic',
                    error: err
                });
            }

            if (!volleyball_statistic) {
                return res.status(404).json({
                    message: 'No such volleyball_statistic'
                });
            }

            volleyball_statistic.club = req.body.club ? req.body.club : volleyball_statistic.club;
			volleyball_statistic.rankingPoints = req.body.rankingPoints ? req.body.rankingPoints : volleyball_statistic.rankingPoints;
			volleyball_statistic.playedMatches = req.body.playedMatches ? req.body.playedMatches : volleyball_statistic.playedMatches;
			volleyball_statistic.wins = req.body.wins ? req.body.wins : volleyball_statistic.wins;
			volleyball_statistic.losses = req.body.losses ? req.body.losses : volleyball_statistic.losses;
			volleyball_statistic.setsWon = req.body.setsWon ? req.body.setsWon : volleyball_statistic.setsWon;
			volleyball_statistic.setsLost = req.body.setsLost ? req.body.setsLost : volleyball_statistic.setsLost;
			volleyball_statistic.pointsWon = req.body.pointsWon ? req.body.pointsWon : volleyball_statistic.pointsWon;
			volleyball_statistic.pointsLost = req.body.pointsLost ? req.body.pointsLost : volleyball_statistic.pointsLost;
			volleyball_statistic.setRatio = req.body.setRatio ? req.body.setRatio : volleyball_statistic.setRatio;
			volleyball_statistic.pointRatio = req.body.pointRatio ? req.body.pointRatio : volleyball_statistic.pointRatio;
			
            volleyball_statistic.save(function (err, volleyball_statistic) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating volleyball_statistic.',
                        error: err
                    });
                }

                return res.json(volleyball_statistic);
            });
        });
    },

    /**
     * volleyball_statisticController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Volleyball_statisticModel.findByIdAndRemove(id, function (err, volleyball_statistic) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the volleyball_statistic.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    createMany: function (req, res) {
        Volleyball_statisticModel.insertMany(req.body, function (err, volleyball_statistics) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_games',
                    error: err
                });
            }
            return res.status(201).json(volleyball_statistics);
        });
    }
};
