const { Pool } = require('pg');

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
      connectionTimeoutMillis: 2000,
      ssl: {
        rejectUnauthorized: false // Allows connections even if the certificate is self-signed
      }
    });

    // Test the connection
    const client = await pool.connect();
    console.log('Successfully connected to database');
    await client.query('SELECT NOW()');
    client.release();

    console.log(`Successfully connected to database ${process.env.DB_DATABASE}`);

    // Creating table if not exists
    await pool.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLENAME} (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    console.log(`${process.env.DB_TABLENAME} table created or already exists.`);
    return pool;

  } catch (error) {
    console.error('Failed to connect to PostgreSQL database:', error.message);
    if (error.code) {
      console.error('Error Code:', error.code);
    }
    if (error.detail) {
      console.error('Error Detail:', error.detail);
    }
    throw error; // Re-throw the error to be handled by the caller
  }
};

module.exports = ConnectDB;
