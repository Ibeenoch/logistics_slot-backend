import mysql from 'mysql'

// Set up  to Connect to the MySQL database

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
       database: 'logistic_queue'
    })






 

export default connection;