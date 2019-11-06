const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

//-------//
//Routes//
//-----//

router.get('/', authController.isLoggedIn, viewsController.getOverview);
//router.get('/tour', viewsController.getTour);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.login);
router.get('/signup', authController.isLoggedIn, viewsController.signup);
router.get('/me', authController.protect, viewsController.getAccount);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);
module.exports = router;
