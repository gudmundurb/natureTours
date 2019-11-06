/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    console.log(res.data.status);
    if (res.data.status === 'success') {
      console.log('logged in successfully');
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log('error, you  did not provide correct information');
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout'
    });

    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    console.log('Error, something went wrong during logout! Try again.');
    showAlert('error', err.response.data.message);
  }
};
