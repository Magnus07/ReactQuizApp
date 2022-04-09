var QuestionModel = require('../models/QuestionModel.js');

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
                    message: 'Error when getting Question.',
                    error: err
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

        QuestionModel.findOne({_id: id}, function (err, Question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Question.',
                    error: err
                });
            }

            if (!Question) {
                return res.status(404).json({
                    message: 'No such Question'
                });
            }

            return res.json(Question);
        });
    },

    /**
     * QuestionController.create()
     */
    create: function (req, res) {
        var Question = new QuestionModel({
			category : req.body.category,
			type : req.body.type,
			difficulty : req.body.difficulty,
			question : req.body.question,
			correct_answer : req.body.correct_answer,
			incorrect_answers : req.body.incorrect_answers
        });

        Question.save(function (err, Question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Question',
                    error: err
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

        QuestionModel.findOne({_id: id}, function (err, Question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Question',
                    error: err
                });
            }

            if (!Question) {
                return res.status(404).json({
                    message: 'No such Question'
                });
            }

            Question.category = req.body.category ? req.body.category : Question.category;
			Question.type = req.body.type ? req.body.type : Question.type;
			Question.difficulty = req.body.difficulty ? req.body.difficulty : Question.difficulty;
			Question.question = req.body.question ? req.body.question : Question.question;
			Question.correct_answer = req.body.correct_answer ? req.body.correct_answer : Question.correct_answer;
			Question.incorrect_answers = req.body.incorrect_answers ? req.body.incorrect_answers : Question.incorrect_answers;
			
            Question.save(function (err, Question) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Question.',
                        error: err
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
                    message: 'Error when deleting the Question.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
