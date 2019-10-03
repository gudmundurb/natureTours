const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

//router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

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
