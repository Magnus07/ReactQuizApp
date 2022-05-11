var express = require('express');
var router = express.Router();
var QuestionController = require('../controllers/QuestionController.js');
var auth = require('../utils/auth.js');

/*
 * GET
 */
router.get('/', QuestionController.list);


/*
 * GET
 */
router.get('/random', auth.requireAuth, QuestionController.getRandom);


/*
 * GET
 */
router.get('/result', auth.requireAuth, QuestionController.getResult);


/*
 * POST
 */
router.post('/answer', auth.requireAuth, QuestionController.answer);


/*
 * GET
 */
router.get('/:id', QuestionController.show);


/*
 * POST
 */
router.post('/', QuestionController.create);

/*
 * PUT
 */
router.put('/:id', QuestionController.update);

/*
 * DELETE
 */
router.delete('/:id', QuestionController.remove);

module.exports = router;
