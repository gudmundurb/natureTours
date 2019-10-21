const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

//router.param('id', tourController.checkID);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/tour-stats/:year').get(tourController.getMonthlyPlan);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTours);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );
module.exports = router;
//POST /tour/(id)/reviews (user from authcontroller)
//GET /tour/(id)/reviews (get all reviews with that id)
//GET /tour(id)/reviews/(id) -> get the reviews on that tour with that id

//deprecated code :
//----------------------//
//ROUTERS               //
//----------------------//
// //->/tours -> sends back all tours
// app.get('/api/v1/tours', getAllTours);

// //->/tours -> sends back a tour
// app.get('/api/v1/tours/:id', getTour);

// //->/tours -> add tours
// app.post('/api/v1/tours', createTour);

// //->/tours/:id -> updating
// app.patch('/api/v1/tours/:id', updateTour);

// //->/tours/:id -> deleting
// app.delete('/api/v1/tours/:id', deleteTour);
