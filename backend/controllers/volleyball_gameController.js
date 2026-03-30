var Volleyball_gameModel = require('../models/volleyball_gameModel.js');

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

/**
 * volleyball_gameController.js
 *
 * @description :: Server-side logic for managing volleyball_games.
 */
function exampleData() {
  const games = [
    {
      firstOpponent: "Team A",
      score: "3:2",
      secondOpponent: "Team B",
      location: "Maribor Sports Park",
      dateTime: new Date(),
      lat: 46.5547,
      lng: 15.6459
    },
    {
      firstOpponent: "Team C",
      score: "1:3",
      secondOpponent: "Team D",
      location: "Maribor University",
      dateTime: new Date(),
      lat: 46.5608,
      lng: 15.6340
    },
    {
      firstOpponent: "Team E",
      score: "2:3",
      secondOpponent: "Team F",
      location: "Maribor City Park",
      dateTime: new Date(),
      lat: 46.5569,
      lng: 15.6505
    },
    {
      firstOpponent: "Team G",
      score: "0:3",
      secondOpponent: "Team H",
      location: "Maribor Main Square",
      dateTime: new Date(),
      lat: 46.5596,
      lng: 15.6377
    },
    {
      firstOpponent: "Team I",
      score: "3:0",
      secondOpponent: "Team J",
      location: "Maribor Theatre Park",
      dateTime: new Date(),
      lat: 46.5574,
      lng: 15.6444
    }
  ];

  games.forEach(gameData => {
    var volleyball_game = new Volleyball_gameModel(gameData);

    volleyball_game.save(function (err, volleyball_game) {
      if (err) {
        console.log('Error when creating volleyball_game', err);
      }
      console.log('Created volleyball_game', volleyball_game);
    });
  });
}
module.exports = {

  /**
   * volleyball_gameController.list()
   */

  list: function (req, res) {
    //exampleData();
    Volleyball_gameModel.find(function (err, volleyball_games) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting volleyball_game.',
          error: err
        });
      }

      return res.json(volleyball_games);
    });
  },

  /**
   * volleyball_gameController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    Volleyball_gameModel.findOne({ _id: id }, function (err, volleyball_game) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting volleyball_game.',
          error: err
        });
      }

      if (!volleyball_game) {
        return res.status(404).json({
          message: 'No such volleyball_game'
        });
      }

      return res.json(volleyball_game);
    });
  },

  /**
   * volleyball_gameController.create()
   */
  create: function (req, res) {
    var result = req.body.dateTime.replace(/\s/g, "");
    // Split the dateTimeString into date and time parts
    var [dateString, timeString] = result.split("-");
    console.log("Date:" + dateString + ", Time:" + timeString)
    var [day, month, year] = dateString.split(".");
    console.log("Day:" + day + ", month:" + month, "year:" + year)
    var [hour, minute] = timeString.split(":");
    console.log("Hour: " + hour + ", Minute:" + minute)

    // Make sure the month and day are two digits
    month = month.padStart(2, '0');
    day = day.padStart(2, '0');

    // Create a new Date object using the parsed values
    var dateTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
    console.log(dateTime);

    var volleyball_game = new Volleyball_gameModel({
      firstOpponent: req.body.firstOpponent,
      score: req.body.score,
      secondOpponent: req.body.secondOpponent,
      location: req.body.location,
      dateTime: dateTime,
      lat: req.body.lat,
      lng: req.body.lng,
      generated: req.body.generated
    });

    volleyball_game.save(function (err, volleyball_game) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating volleyball_game',
          error: err
        });
      }

      return res.status(201).json(volleyball_game);
    });
  },

  /**
   * volleyball_gameController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    Volleyball_gameModel.findOne({ _id: id }, function (err, volleyball_game) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting volleyball_game',
          error: err
        });
      }

      if (!volleyball_game) {
        return res.status(404).json({
          message: 'No such volleyball_game'
        });
      }

      volleyball_game.firstOpponent = req.body.firstOpponent ? req.body.firstOpponent : volleyball_game.firstOpponent;
      volleyball_game.score = req.body.score ? req.body.score : volleyball_game.score;
      volleyball_game.secondOpponent = req.body.secondOpponent ? req.body.secondOpponent : volleyball_game.secondOpponent;
      volleyball_game.location = req.body.location ? req.body.location : volleyball_game.location;
      volleyball_game.dateTime = req.body.dateTime ? req.body.dateTime : volleyball_game.dateTime;
      volleyball_game.lat = req.body.lat ? req.body.lat : volleyball_game.lat;
      volleyball_game.lng = req.body.lng ? req.body.lng : volleyball_game.lng;
      volleyball_game.generated = req.body.generated ? req.body.generated : volleyball_game.generated;


      volleyball_game.save(function (err, volleyball_game) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating volleyball_game.',
            error: err
          });
        }

        return res.json(volleyball_game);
      });
    });
  },
  /**
   * volleyball_gameController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    Volleyball_gameModel.findByIdAndRemove(id, function (err, volleyball_game) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the volleyball_game.',
          error: err
        });
      }

      return res.status(204).json();
    });
  },
  createMany: function (req, res) {
    const volleyball_games = req.body.map(game => {
      if (game.generated === true) {
        var dateTime = parseGeneratedDate(game.dateTime)
      }
      else {
        var result = game.dateTime.replace(/\s/g, "");
        // Split the dateTimeString into date and time parts
        var [dateString, timeString] = result.split("-");
        console.log("Date:" + dateString + ", Time:" + timeString)
        var [day, month, year] = dateString.split(".");
        console.log("Day:" + day + ", month:" + month, "year:" + year)
        var [hour, minute] = timeString.split(":");
        console.log("Hour: " + hour + ", Minute:" + minute)

        // Make sure the month and day are two digits
        month = month.padStart(2, '0');
        day = day.padStart(2, '0');

        // Create a new Date object using the parsed values
        var dateTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
        dateTime.setUTCHours(hour);
      }
      

      console.log(dateTime);
      return {
        ...game,
        dateTime: dateTime,
      };
    });

    Volleyball_gameModel.insertMany(volleyball_games, function (err, docs) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating volleyball games',
          error: err
        });
      } else {
        return res.status(201).json(docs);
      }
    });
  }
};
