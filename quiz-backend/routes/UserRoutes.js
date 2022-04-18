var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');
var auth = require('../utils/auth.js');

/*
 * GET
 */
router.post('/', auth.requireAuth, UserController.list);

/*
 * GET
 */
router.get('/signup', UserController.signup);

/*
 * GET
 */
router.post('/logout', auth.requireAuth, UserController.logout);


// login route
// GET
//
router.get('/profile', auth.requireAuth, UserController.profile); 

/*
 * GET
 */
router.get('/:id', auth.requireAuth, UserController.show);

/*
 * POST
 */
router.post('/', UserController.create);

// login route
router.post('/login', UserController.login); 


/*
 * PUT
 */
router.put('/:id', auth.requireAuth, UserController.update);

/*
 * DELETE
 */
router.delete('/:id', auth.requireAuth, UserController.remove);

module.exports = router;
