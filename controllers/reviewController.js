const Review = require('./../models/reviewsModel');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  //check if user and tour is created directly or if it is using "nested" routes (and merged parameters, see reviewRoutes.js) user comes from logged in user (protect middleware)
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
