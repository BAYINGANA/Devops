//importing the pg/promise for using async await in connection function and in queries
const { Pool } = require('pg');


//the async await function which connects to the database using the credentials in the .env files
const ConnectDB = async () => {
  try {
    console.log('Attempting to connect to PostgreSQL database with config:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT
    });

    const pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT || 5432,
      max: parseInt(process.env.DB_CONNECTIONLIMIT) || 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000
    });

    // Test the connection
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();



    console.log(`Successfully connected to database ${process.env.DB_DATABASE}`);



    // async await query which creates the 'users' table if it doesn't exist and creates table for id, name, email
    await pool.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLENAME} (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    console.log(`${process.env.DB_TABLENAME} table created or already exists.`);
    return pool;
  } catch (error) {
    console.error('Failed to connect to PostgreSQL database:', error);
    throw error; // Re-throw the error to be handled by the caller
  }

};

//exporting the function
module.exports = ConnectDB;
