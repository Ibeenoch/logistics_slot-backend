import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

import {  getCustomers, createCustomers, deleteCustomers, createPlanners, getPlanners, deletePlanners }  from '../controller/logistics.js'

const router = express.Router()


// define an endpoint to fetch the list of customers
  router.get('/customers', getCustomers);
  
  // define an endpoint to craete the customers list queue
  router.post('/customers', createCustomers);
  
  // define an endpoint to delete the customers
  router.delete('/customers/:id', deleteCustomers);

  // define an endpoint to create the Planner
  router.post('/planner', createPlanners);

  // define an endpoint to get a planned logistics slot
  router.get('/planner/:id', getPlanners);

  //define an endpoint to delete a planned logistics slot
  router.delete('/planner/:customer_id/', deletePlanners);

export default router