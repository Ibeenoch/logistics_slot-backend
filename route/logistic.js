import express from 'express'
import {  getAllCustomersDelivery, getPlanner, setPlanner, }  from '../controller/logistics.js'

const router = express.Router()


// define an endpoint to fetch the list of customers
  router.get('/api/customers', getAllCustomersDelivery);
  
  // define an endpoint to fetch the planner data for the next 7 days
  router.get('/api/planner', getPlanner);
  
  // define an endpoint to update the planner data
  router.post('/api/planner', setPlanner);

export default router