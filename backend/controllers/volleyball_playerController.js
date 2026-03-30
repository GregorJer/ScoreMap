var Volleyball_playerModel = require('../models/volleyball_playerModel.js');
const Volleyball_playerController = require('./volleyball_playerController');

/**
 * volleyball_playerController.js
 *
 * @description :: Server-side logic for managing volleyball_players.
 */
function insertSampleData() {
    const samplePlayers = [
        {
          number: 8,
          name: 'Rok Bračko',
          position: 'Receiver',
          date_of_birth: '2004-04-21',
          height: 192,
          spike_reach: 338,
          block_reach: 307,
          team: 'team1'
        },
        {
          number: 12,
          name: 'Janez Novak',
          position: 'Setter',
          date_of_birth: '2003-05-15',
          height: 185,
          spike_reach: 320,
          block_reach: 295,
          team: 'team1'
        },
        {
          number: 5,
          name: 'Marko Kovač',
          position: 'Opposite',
          date_of_birth: '2002-08-10',
          height: 198,
          spike_reach: 345,
          block_reach: 310,
          team: 'team1'
        },
        {
          number: 7,
          name: 'Petra Horvat',
          position: 'Middle Blocker',
          date_of_birth: '2001-11-30',
          height: 190,
          spike_reach: 330,
          block_reach: 305,
          team: 'team1'
        },
        {
          number: 3,
          name: 'Tina Kralj',
          position: 'Libero',
          date_of_birth: '2004-01-22',
          height: 170,
          spike_reach: 280,
          block_reach: 255,
          team: 'team2'
        },
        {
          number: 9,
          name: 'Luka Zupan',
          position: 'Outside Hitter',
          date_of_birth: '2003-07-18',
          height: 194,
          spike_reach: 335,
          block_reach: 310,
          team: 'team3'
        },
      ];
      

      const fakeResponse = {
        status: function () {
          // Do nothing with the response
          return {
            json: function () {}
          };
        }
      };
      samplePlayers.forEach((player) => {
        module.exports.create({ body: player }, fakeResponse);
      });
    // Call the create function with the sample data
    
}
module.exports = {

    /**
     * volleyball_playerController.list()
     */
    list: function (req, res) {
        Volleyball_playerModel.find(function (err, volleyball_players) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting volleyball_player.',
                    error: err
                });
            }
            //insertSampleData();
            return res.json(volleyball_players);
        });
    },
    getAllPlayers: function (req, res) {
        Volleyball_playerModel.find(function (err, volleyball_players) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting volleyball_player.',
                    error: err
                });
            }
            //insertSampleData();
            return res.json(volleyball_players);
        });
    },

    /**
     * volleyball_playerController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Volleyball_playerModel.findOne({_id: id}, function (err, volleyball_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting volleyball_player.',
                    error: err
                });
            }

            if (!volleyball_player) {
                return res.status(404).json({
                    message: 'No such volleyball_player'
                });
            }

            return res.json(volleyball_player);
        });
    },

    /**
     * volleyball_playerController.create()
     */
    create: function (req, res) {
        var volleyball_player = new Volleyball_playerModel({
			number : req.body.number,
			name : req.body.name,
			position : req.body.position,
			date_of_birth : req.body.date_of_birth,
			height : req.body.height,
			spike_reach : req.body.spike_reach,
			block_reach : req.body.block_reach,
            team : req.body.team
        });

        volleyball_player.save(function (err, volleyball_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating volleyball_player',
                    error: err
                });
            }

            return res.status(201).json(volleyball_player);
        });
    },

    /**
     * volleyball_playerController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Volleyball_playerModel.findOne({_id: id}, function (err, volleyball_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting volleyball_player',
                    error: err
                });
            }

            if (!volleyball_player) {
                return res.status(404).json({
                    message: 'No such volleyball_player'
                });
            }

            volleyball_player.number = req.body.number ? req.body.number : volleyball_player.number;
			volleyball_player.name = req.body.name ? req.body.name : volleyball_player.name;
			volleyball_player.position = req.body.position ? req.body.position : volleyball_player.position;
			volleyball_player.date_of_birth = req.body.date_of_birth ? req.body.date_of_birth : volleyball_player.date_of_birth;
			volleyball_player.height = req.body.height ? req.body.height : volleyball_player.height;
			volleyball_player.spike_reach = req.body.spike_reach ? req.body.spike_reach : volleyball_player.spike_reach;
			volleyball_player.block_reach = req.body.block_reach ? req.body.block_reach : volleyball_player.block_reach;
            volleyball_player.team = req.body.team ? req.body.team : volleyball_player.team;
			
            volleyball_player.save(function (err, volleyball_player) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating volleyball_player.',
                        error: err
                    });
                }

                return res.json(volleyball_player);
            });
        });
    },

    /**
     * volleyball_playerController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Volleyball_playerModel.findByIdAndRemove(id, function (err, volleyball_player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the volleyball_player.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    insertPlayer: function(req, res){
        return res.render('volleyball/insert_volleyball_player')
    },
    createMany: function (req, res) {
        Volleyball_playerModel.insertMany(req.body, function (err, volleyball_players) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_games',
                    error: err
                });
            }
            return res.status(201).json(volleyball_players);
        });
    }
};
