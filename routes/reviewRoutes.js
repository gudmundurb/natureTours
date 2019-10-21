const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('./../controllers/authController');

// mergeParams allows me to keep parameters from parent (in this case tourRouter)
const router = express.Router({ mergeParams: true });

//router.param('id', tourController.checkID);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.deleteReview
  );

module.exports = router;
// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

//POST /tour/(id)/reviews (user from authcontroller)
//GET /tour/(id)/reviews (get all reviews with that id)
//GET /tour(id)/reviews/(id) -> get the reviews on that tour with that id
