const moment = require('moment'); // You can use moment.js for easier date formatting

/**
 * Formats a date to dd-mm-yyyy
 * @param {Date|string} date - The date to format
 * @returns {string} - The formatted date string
 */
const formatDate = (date) => {
  return moment(date).format('DD-MM-YYYY');
};

/**
 * Formats a time to hh:mm:ss
 * @param {Date|string} time - The time to format
 * @returns {string} - The formatted time string
 */
const formatTime = (time) => {
  return moment(time).format('HH:mm:ss');
};

module.exports = {
  formatDate,
  formatTime,
};
