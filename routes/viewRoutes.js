const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

//-------//
//Routes//
//-----//

router.get('/', viewsController.getOverview);
//router.get('/tour', viewsController.getTour);
router.get('/tour/:slug', viewsController.getTour);
module.exports = router;
