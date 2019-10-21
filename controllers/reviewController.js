const Review = require('./../models/reviewsModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) {
    filter = { tour: req.params.tourId };
  }

  const reviews = await Review.find(filter);
  //Send response!
  res.status(200).json({
    status: 'Success.',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  //check if user and tour is created directly or if it is using "nested" routes (and merged parameters, see reviewRoutes.js) user comes from logged in user (protect middleware)
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'Success.',
    data: {
      tour: newReview
    }
  });
});

exports.deleteReview = factory.deleteOne(Review);
