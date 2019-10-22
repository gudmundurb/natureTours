const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

//router.param('id', tourController.checkID);

router.use('/:tourId/reviews', reviewRouter);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTours);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );
console.log('Tour Routes loaded successfully...');

module.exports = router;

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
