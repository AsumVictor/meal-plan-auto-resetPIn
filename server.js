const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const moment = require('moment-timezone');
const dotenv = require('dotenv');

dotenv.config({
    path: '.env'
})

const app = express();
const PORT = 6000;

const url = `${process.env.MEAL_PLAN_URL}${process.env.MEAL_PLAN_NUMBER}`

const sendRequest = async () => {
  try {
    const response = await axios.get(url);
    console.log(`Request sent at ${moment().tz("GMT").format('YYYY-MM-DD HH:mm:ss')}`);
    console.log(`Response status: ${response.status}`);
  } catch (error) {
    console.error(`Error sending request: ${error.message}`);
  }
};

cron.schedule('30 0 * * *', () => {
  sendRequest();
}, {
  scheduled: true,
  timezone: "GMT" 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
