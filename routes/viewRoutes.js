const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

//-------//
//Routes//
//-----//

router.use(authController.isLoggedIn);

router.get('/', viewsController.getOverview);
//router.get('/tour', viewsController.getTour);
router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.login);
router.get('/signup', viewsController.signup);

module.exports = router;
