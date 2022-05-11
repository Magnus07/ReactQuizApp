var express = require('express');
var router = express.Router();
var GameSessionsController = require('../controllers/GameSessionsController.js');

/*
 * GET
 */
router.get('/', GameSessionsController.list);

/*
 * GET
 */
router.get('/:id', GameSessionsController.show);

/*
 * POST
 */
router.post('/', GameSessionsController.create);

/*
 * PUT
 */
router.put('/:id', GameSessionsController.update);

/*
 * DELETE
 */
router.delete('/:id', GameSessionsController.remove);

module.exports = router;
