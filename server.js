const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const moment = require('moment-timezone');
const dotenv = require('dotenv');
const { cleanData } = require('./utils');

dotenv.config({
    path: '.env'
})

const app = express();


const getSubscribedId = async()=>{

  try {
    const res = await axios.get(`https://script.google.com/macros/s/${process.env.ID}/exec?path=${process.env.sID}&action=read`)
   
    const data = cleanData(res.data.data)
   
    return data
  } catch (error) {
    console.log(error.message)
  }
}

const resetPin = async (id) => {
 
  const url = `${process.env.MEAL_PLAN_URL}${id}`
 
  try {
    const response = await axios.get(url);
    console.log(`Request sent at ${moment().tz("GMT").format('YYYY-MM-DD HH:mm:ss')}`);
    console.log(`Response status: ${response.status}`);
  } catch (error) {
    
    console.error(`Error sending request: ${error.message}`);
  }
};


const resetAll = async ()=>{
  const m_planIds = await getSubscribedId()
  for(let i = 0; i < m_planIds.length; i++){
    await resetPin(m_planIds[i])
  }

}


cron.schedule('30 0 * * *', () => {
  resetAll()
}, {
  scheduled: true,
  timezone: "GMT" 
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
