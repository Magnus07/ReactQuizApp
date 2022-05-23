var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');
var auth = require('../utils/auth.js');



/*
 * POST
 */
router.post('/', UserController.create);


/*
 * GET
 */
router.get('/', auth.requireAuth, UserController.list);


/*
 * GET
 */
router.get('/login/success', UserController.loginSuccess);

/*
 * GET
 */
router.get('/signup', UserController.signup);

/*
 * GET
 */
router.get('/logout', auth.requireAuth, UserController.logout);


// login route
// GET
//
router.get('/profile', auth.requireAuth, UserController.profile); 


/*
 * GET
 */
router.get('/rating', UserController.rating);

/*
 * GET
 */
router.get('/:id', auth.requireAuth, UserController.show);


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
