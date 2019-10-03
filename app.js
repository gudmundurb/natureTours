const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//console.log(process.env.NODE_ENV);
//----------------------//
//Middle Ware           //
//----------------------//

if (process.env.NODE_ENV === 'development') {
  //logging middleware
  app.use(morgan('dev'));
}

//this is the middleware we need to retrieve json from body
app.use(express.json());

//timestamping middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(express.static(`${__dirname}/public/`));

//----------------------//
//Mounting Routes       //
//----------------------//
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
