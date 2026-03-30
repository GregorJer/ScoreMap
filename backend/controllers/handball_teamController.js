var Handball_teamModel = require('../models/handball_teamModel.js');

/**
 * handball_teamController.js
 *
 * @description :: Server-side logic for managing handball_teams.
 */
function createInitialTeams() {
    // Create two teams each with 5 example player names
    var teams=[];
    for (let i = 1; i < 20; i++) {

        const randomDate = new Date(
            new Date().getTime() - Math.floor(Math.random() * (365 * 24 * 60 * 60 * 1000)) // Random date within the past year
          );
        teams.push(new Handball_teamModel({
          name: "Team " + i,
          address: "Address" + i,
          city: "city "+i,
          updatedAt: randomDate,
          email: "email "+i,
          logoImage: "logo "+i,
          contact: "contact "+i,
          players: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"]
        }));
      }
      
    teams.forEach(element => {
        element.save();
    });
}
module.exports = {

    /**
     * handball_teamController.list()
     */
    list: function (req, res) {
        //createInitialTeams();
        Handball_teamModel.find(function (err, handball_teams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_team.',
                    error: err
                });
            }

            return res.json(handball_teams);
        });
    },

    /**
     * handball_teamController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Handball_teamModel.findOne({_id: id}, function (err, handball_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_team.',
                    error: err
                });
            }

            if (!handball_team) {
                return res.status(404).json({
                    message: 'No such handball_team'
                });
            }

            return res.json(handball_team);
        });
    },

    /**
     * handball_teamController.create()
     */
    create: function (req, res) {
        var handball_team = new Handball_teamModel({
			name : req.body.name,
			address : req.body.address,
			city : req.body.city,
			updatedAt : req.body.updatedAt,
			email : req.body.email,
			logoImage : req.body.logoImage,
			contact : req.body.contact,
			players : req.body.players
        });

        handball_team.save(function (err, handball_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_team',
                    error: err
                });
            }

            return res.status(201).json(handball_team);
        });
    },

    /**
     * handball_teamController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Handball_teamModel.findOne({_id: id}, function (err, handball_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handball_team',
                    error: err
                });
            }

            if (!handball_team) {
                return res.status(404).json({
                    message: 'No such handball_team'
                });
            }

            handball_team.name = req.body.name ? req.body.name : handball_team.name;
			handball_team.address = req.body.address ? req.body.address : handball_team.address;
			handball_team.city = req.body.city ? req.body.city : handball_team.city;
			handball_team.updatedAt = req.body.updatedAt ? req.body.updatedAt : handball_team.updatedAt;
			handball_team.email = req.body.email ? req.body.email : handball_team.email;
			handball_team.logoImage = req.body.logoImage ? req.body.logoImage : handball_team.logoImage;
			handball_team.contact = req.body.contact ? req.body.contact : handball_team.contact;
			handball_team.players = req.body.players ? req.body.players : handball_team.players;
			
            handball_team.save(function (err, handball_team) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating handball_team.',
                        error: err
                    });
                }

                return res.json(handball_team);
            });
        });
    },

    /**
     * handball_teamController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Handball_teamModel.findByIdAndRemove(id, function (err, handball_team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the handball_team.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    createMany: function(req, res) {
        Handball_teamModel.insertMany(req.body, function(err, handball_teams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handball_teams',
                    error: err
                });
            }
    
            return res.status(201).json(handball_teams);
        });
    },
};
