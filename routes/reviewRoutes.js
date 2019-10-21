const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('./../controllers/authController');

// mergeParams allows me to keep parameters from parent (in this case tourRouter)
const router = express.Router({ mergeParams: true });

//router.param('id', tourController.checkID);

//user needs to be logged in for all routes from here!
router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );
console.log('Review Routes loaded successfully...');
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
