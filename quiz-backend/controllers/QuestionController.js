var QuestionModel = require("../models/QuestionModel.js");

/**
 * QuestionController.js
 *
 * @description :: Server-side logic for managing Questions.
 */
module.exports = {
  /**
   * QuestionController.list()
   */
  list: function (req, res) {
    QuestionModel.find(function (err, Questions) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Question.",
          error: err,
        });
      }

      return res.json(Questions);
    });
  },

  /**
   * QuestionController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    QuestionModel.findOne({ _id: id }, function (err, Question) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Question.",
          error: err,
        });
      }

      if (!Question) {
        return res.status(404).json({
          message: "No such Question",
        });
      }

      return res.json(Question);
    });
  },

  getRandom: async function (req, res) {
    function mixAnswers(document) {
      document.incorrect_answers.push(document.correct_answer);
      answers = document.incorrect_answers;
      const newArr = answers.slice();
      for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
      }
      delete document.correct_answer;
      delete document.incorrect_answers;
      document.answers = newArr;
      return document;
    }
    var doc = await QuestionModel.aggregate([{ $sample: { size: 1 } }]);

    for (var i = 0; i < doc.length; i++) {
      doc[i] = mixAnswers(doc[i]);
    }

    if (req.session.timeStart === undefined) {
      req.session.timeStart = new Date();
    }

    return res.json(doc);
  },

  answer: async function (req, res) {
    var currentTime = new Date();
    var timeDifference = currentTime - new Date(req.session.timeStart);
    delete req.session.timeStart;
    var qID = req.body._id;
    var qAnswer = req.body.answer;

    QuestionModel.findOne({ _id: qID }, function (err, Question) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Question.",
          error: err,
        });
      }

      if (!Question) {
        return res.status(404).json({
          message: "No such Question",
        });
      }

      if (Question.correct_answer.toUpperCase() === qAnswer.toUpperCase()) {
        if (req.session.score === undefined) req.session.score = 0;

        req.session.score =
          req.session.score + (100 * 1 * Math.exp(-0.2 * timeDifference/100));
      }
      return res.status(200).json(qID);
    });
  },

  getResult: async function (req, res) {
    var result = Math.floor(req.session.score) || 0;
    delete req.session.score;
    return res.status(200).json(result);
  },

  /**
   * QuestionController.create()
   */
  create: function (req, res) {
    var Question = new QuestionModel({
      category: req.body.category,
      type: req.body.type,
      difficulty: req.body.difficulty,
      question: req.body.question,
      correct_answer: req.body.correct_answer,
      incorrect_answers: req.body.incorrect_answers,
    });

    Question.save(function (err, Question) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating Question",
          error: err,
        });
      }

      return res.status(201).json(Question);
    });
  },

  /**
   * QuestionController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    QuestionModel.findOne({ _id: id }, function (err, Question) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Question",
          error: err,
        });
      }

      if (!Question) {
        return res.status(404).json({
          message: "No such Question",
        });
      }

      Question.category = req.body.category
        ? req.body.category
        : Question.category;
      Question.type = req.body.type ? req.body.type : Question.type;
      Question.difficulty = req.body.difficulty
        ? req.body.difficulty
        : Question.difficulty;
      Question.question = req.body.question
        ? req.body.question
        : Question.question;
      Question.correct_answer = req.body.correct_answer
        ? req.body.correct_answer
        : Question.correct_answer;
      Question.incorrect_answers = req.body.incorrect_answers
        ? req.body.incorrect_answers
        : Question.incorrect_answers;

      Question.save(function (err, Question) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Question.",
            error: err,
          });
        }

        return res.json(Question);
      });
    });
  },

  /**
   * QuestionController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    QuestionModel.findByIdAndRemove(id, function (err, Question) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Question.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
