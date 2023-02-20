import mysql from 'mysql'
import { io } from '../index.js'

// Set up a MySQL connection 
let pool = mysql.createConnection({
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7599716',
  password: '95f6glXBk9',
  database: 'sql7599716',
  multipleStatements: true,
  port: 3306
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Connected to mysql database');
  }
})


export const getCustomers = (req, res) => {
  pool.query('SELECT * FROM customers', (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log('get results :', results)
  });
}

export const createCustomers = (req, res) => {
  const { name, pick_up_location, drop_off_location } = req.body;
  pool.query('INSERT INTO customers (name, pick_up_location, drop_off_location) VALUES (?, ?, ?)', [name, pick_up_location, drop_off_location], (err, results) => {
    if (err) throw err;
    res.send('Customer added successfully');
  });
}

export const deleteCustomers = (req, res) => {
  pool.query('DELETE FROM customers WHERE id=?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.send('Customer deleted successfully');
  });
}

export const createPlanners = (req, res) => {
  const { customer_id, date, name, pick_up_location, drop_off_location } = req.body;
  console.log('body req', req.body)
  let dates = new Date(date)
 pool.query('SELECT * FROM planner WHERE customer_id=?', [customer_id], (err, data) => {
  if(err) throw err;
  if(data.length){
    return res.status(409).json('customer id already exist');
  }else{
     pool.query('INSERT INTO planner (customer_id, date, name, pick_up_location, drop_off_location) VALUES (?, ?, ?, ?, ?)', [customer_id, dates, name, pick_up_location, drop_off_location], (err, results) => {
    if (err) throw err;
    res.send('Planner record added successfully');
    console.log('planners created: ', results)
    
  });
  }

  
 })
}

export const getPlanners =  (req, res) => {
  let id = req.params.id
   console.log('Customersid = ', id)
  pool.query('select * from planner where id=?;', [ id ], (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log('get planner results :', results)
  });
}

export const deletePlanners = (req, res) => {
  console.log({customer_idParams: req.params.customer_id})
pool.query('DELETE FROM planner WHERE customer_id=? AND date < CURDATE()', [req.params.customer_id], (err, results) => {
if (err) throw err;
// emit a "delete" event to all connected clients
io.emit('delete', req.params.customer_id)
res.send('Planner record deleted successfully');
console.log('deleted successfully');

});
}
