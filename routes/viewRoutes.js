const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const router = express.Router();

//-------//
//Routes//
//-----//

router.get('/', viewsController.getOverview);
//router.get('/tour', viewsController.getTour);
router.get('/tour/:slug', authController.protect, viewsController.getTour);
router.get('/login', viewsController.login);
router.get('/signup', viewsController.signup);

module.exports = router;
