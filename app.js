const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
console.log(process.env.NODE_ENV);

//-------------//
//Middle Ware //
//-----------//
if (process.env.NODE_ENV === 'development') {
  //logging middleware
  app.use(morgan('dev'));
}

//this is the middleware we need to retrieve json from body
app.use(express.json());
app.use(express.static(`${__dirname}/public/`));

//timestamping middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

//-------//
//Routes//
//-----//
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`
  // });

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
