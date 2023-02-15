import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './route/logistic.js'
import cookieParser from 'cookie-parser'
import mysql from 'mysql'


dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(cors())


// Set up the database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'transportation_queue'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// Create a new customer
app.post('/api/customers', async(req, res) => {
    const { name, pickupLocation, dropoffLocation } = req.body;
    const customer = { name, pickupLocation, dropoffLocation };
  
   await connection.query('INSERT INTO customers SET ?', customer, (error, results) => {
      if (error) throw error;
      console.log(results)
      res.send(results);
    });
  });
  //| pickup_location  | varchar(255) | NO   |     | NULL    dropoff_location 
  // Retrieve all customers
  app.get('/api/customers', async(req, res) => {
   await connection.query('SELECT * FROM customers', (error, results) => {
      if (error) throw error;
      console.log(results)
      res.send(results);
    });
  });
  
  // Create a new planner entry
  app.post('/api/planner', async(req, res) => {
    const { date, slot1, slot2, slot3, slot4 } = req.body;
    const planner = { date, slot1, slot2, slot3, slot4 };
  
   await connection.query('INSERT INTO planner SET ?', planner, (error, results) => {
      if (error) throw error;
      console.log(results)
      res.send(results);
    });
  });
  
  // Retrieve all planner entries
  app.get('/api/planner', async(req, res) => {
   await connection.query('SELECT * FROM planner', (error, results) => {
      if (error) throw error;
      console.log(results)
      res.send(results);
    });
  });
  

// Start the server
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
