var GamesessionsModel = require("../models/GameSessionsModel.js");

/**
 * GameSessionsController.js
 *
 * @description :: Server-side logic for managing GameSessionss.
 */
module.exports = {
  /**
   * GameSessionsController.list()
   */
  list: function (req, res) {
    GamesessionsModel.find(function (err, GameSessionss) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting GameSessions.",
          error: err,
        });
      }

      return res.json(GameSessionss);
    });
  },

  /**
   * GameSessionsController.leaderboard()
   */
  leaderboard: async function (req, res) {
    // var leaderboad = await GamesessionsModel.aggregate([
    //     {
    //         $group: { _id: "$player", totalScore: { $sum: "$score" } }
    //      }
    // ])
    var leaderboad = await GamesessionsModel.find().sort([["score", -1]]).limit(10);

      return res.json(leaderboad);
  },

  /**
   * GameSessionsController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    GamesessionsModel.findOne({ _id: id }, function (err, GameSessions) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting GameSessions.",
          error: err,
        });
      }

      if (!GameSessions) {
        return res.status(404).json({
          message: "No such GameSessions",
        });
      }

      return res.json(GameSessions);
    });
  },

  /**
   * GameSessionsController.create()
   */
  create: function (req, res) {
    var GameSessions = new GamesessionsModel({
      player: req.body.player,
      score: req.body.score,
      date: req.body.date,
    });

    GameSessions.save(function (err, GameSessions) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating GameSessions",
          error: err,
        });
      }

      return res.status(201).json(GameSessions);
    });
  },

  /**
   * GameSessionsController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    GamesessionsModel.findOne({ _id: id }, function (err, GameSessions) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting GameSessions",
          error: err,
        });
      }

      if (!GameSessions) {
        return res.status(404).json({
          message: "No such GameSessions",
        });
      }

      GameSessions.player = req.body.player
        ? req.body.player
        : GameSessions.player;
      GameSessions.score = req.body.score ? req.body.score : GameSessions.score;
      GameSessions.date = req.body.date ? req.body.date : GameSessions.date;

      GameSessions.save(function (err, GameSessions) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating GameSessions.",
            error: err,
          });
        }

        return res.json(GameSessions);
      });
    });
  },

  /**
   * GameSessionsController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    GamesessionsModel.findByIdAndRemove(id, function (err, GameSessions) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the GameSessions.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
