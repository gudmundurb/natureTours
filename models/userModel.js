const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [40, 'A user name must have less or equal then 40 characters'],
    minlength: [10, 'A user name must have lengt of 10 characters or more']
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: [50, 'A user email must have less or equal then 50 characters'],
    minlength: [7, 'A user email must have lengt of 7 characters or more'],
    validate: [validator.isEmail, 'Email is not valid']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'A user password must have lengt of 8 characters or more']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm the password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      }
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
