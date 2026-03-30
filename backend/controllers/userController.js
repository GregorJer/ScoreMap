var UserModel = require('../models/userModel.js');
const generateToken = require('../utils/token.js');
const { validateToken } = require('../utils/auth.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        UserModel.findOne({ username: req.body.username }, function (err, existingUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when checking for existing user',
                    error: err
                });
            }

            if (existingUser) {
                return res.status(409).json({
                    message: 'Username already exists',
                    error: err
                });
            }
            if (req.body.password !== req.body.repeat_password) {
                return res.status(400).json({
                    message: 'Passwords do not match'
                });
            }

            //jwt token is null, but is assigned upon login
            var user = new UserModel({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
                phone_number: req.body.phone_number,
                created_at: new Date(),
                modified_at: new Date(),
                token: null
            });

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating user',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },



    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
            user.password = req.body.password ? req.body.password : user.password;
            user.email = req.body.email ? req.body.email : user.email;
            user.name = req.body.name ? req.body.name : user.name;
            user.surname = req.body.surname ? req.body.surname : user.surname;
            user.phone_number = req.body.phone_number ? req.body.phone_number : user.phone_number;
            user.modified_at = new Date();

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },


    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },


    login: function (req, res, next) {
        UserModel.authenticate(req.body.username, req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error during login.',
                    error: err.message || err
                });
            }

            if (!user) {
                return res.status(401).json({
                    message: 'Wrong username or password'
                });
            }

            const token = generateToken(user);
            console.log("Generating token for user:" + user.name);
            user.token = token;
            console.log("User " + user.name + " assigned token " + token);

            UserModel.updateOne(
                { _id: user._id },
                { $set: { token: token } },
                function (err, result) {
                    if (err) {
                        console.log("Error updating user's token in the database: " + err);
                    } else {
                        console.log("User " + user.name + " token updated in the database");
                    }
                }
            );

            req.session.userId = user._id;
            return res.json(user);
        });
    },

    profile: function (req, res, next) {
        UserModel.findById(req.session.userId)
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    if (user === null) {
                        var err = new Error('Not authorized, go back!');
                        err.status = 400;
                        return next(err);
                    } else {
                        //if verification of token fails, profile is not displayed
                        if (validateToken(user.token) === null) {
                            var err = new Error('Not authorized, go back!');
                            err.status = 400;
                            return next(err);
                        }
                        else {
                            return res.json(user);
                        }
                    }
                }
            });
    },

    logout: function (req, res, next) {
        if (req.session) {
            // Get the user ID from the session
            const userId = req.session.userId;

            // Update the user's token to null in the database
            UserModel.updateOne({ _id: userId }, { token: null }, function (err, user) {
                if (err) {
                    return next(err);
                } else {
                    // Set the user's token to null in the user object
                    console.log("Nulling token")
                    user.token = null;

                    // Destroy the session
                    req.session.destroy(function (err) {
                        if (err) {
                            return next(err);
                        } else {
                            return res.status(204).json();
                        }
                    });
                }
            });
        }
    }
};
