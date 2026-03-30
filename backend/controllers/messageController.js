const { json } = require('express');
var MessageModel = require('../models/messageModel.js');

module.exports = {

    list: function (req, res) {
        MessageModel.find()
            .populate('createdBy')
            .exec(function (err, messages) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting messages.',
                        error: err
                    });
                }
                return res.json(messages);
            });
    },


    show: function (req, res) {
        var id = req.params.id;

        MessageModel.findOne({ _id: id }, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message.',
                    error: err
                });
            }

            if (!message) {
                return res.status(404).json({
                    message: 'No such message'
                });
            }

            return res.json(message);
        });
    },

    create: function (message) {
        return new Promise((resolve, reject) => {
            var newMessage = new MessageModel(message);
            newMessage.save(function (err, savedMessage) {
                if (err) {
                    reject(err);
                } else {
                    resolve(savedMessage);
                }
            });
        });
    },

    update: function (req, res) {
        var id = req.params.id;

        MessageModel.findOne({ _id: id }, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message',
                    error: err
                });
            }

            if (!message) {
                return res.status(404).json({
                    message: 'No such message'
                });
            }

            message.contents = req.body.contents ? req.body.contents : message.contents;
            message.created = req.body.created ? req.body.created : message.created;
            message.game = req.body.game ? req.body.game : message.game;  // update game if it's in the request
            message.gameType = req.body.gameType ? req.body.gameType : message.gameType;  // update game type if it's in the request

            message.save(function (err, message) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating message.',
                        error: err
                    });
                }

                return res.json(message);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;

        MessageModel.findByIdAndRemove(id, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the message.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    // Fetch all messages by match id for volleyball game
    listByMatchId: function (req, res) {
        var matchId = req.params.matchId;
        var gameType = req.params.gameType;
    
        MessageModel.find({ game: matchId, gameType: gameType })
            .populate('createdBy')
            .exec(function (err, messages) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting messages.',
                        error: err
                    });
                }
                return res.json(messages);
            });
    },
    
    test: function (req, res) {
        return res.json("test");
     
    }

};
