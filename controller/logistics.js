import db  from '../mysql/db.js';

//connect to myaql database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ', err);
    } else {
      console.log('Connected to database');
    }
  });
  

// GET all customers
export const getAllCustomersDelivery = async(req, res) => {
    const sql = 'SELECT * FROM customers';
   await connection.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  };

  // GET planner
export const getPlanner = async(req, res) => {
    const sql = `SELECT * FROM planner WHERE date >= CURDATE() AND date <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)`;
   await connection.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  };



// POST (update) a planner
export const setPlanner = async (req, res) => {
    const { date, slot1, slot2, slot3, slot4 } = req.body;
    const sql = `INSERT INTO planner (date, slot1, slot2, slot3, slot4) VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE slot1 = VALUES(slot1), slot2 = VALUES(slot2), slot3 = VALUES(slot3), slot4 = VALUES(slot4)`;
   await connection.query(sql, [date, slot1, slot2, slot3, slot4], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
 
