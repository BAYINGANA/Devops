//importing express, environmental variables, bodyparser, router, database connection function and declaring them in a varibale to be using it in our index.js file
const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./db/ConnectDB');
const app = express();
const router = require('./routes/DBOperRoutes');
const bodyParser = require('body-parser');
const cors = require("cors")
dotenv.config();
//using the port in environmental variable or 5000
const port = process.env.PORT || 5000;

// middleware to parse incoming request in bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))

// initialize the database connection pool
let pool;

(async () => {
    try {
        pool = await ConnectDB();
        console.log('Successfully connected to PostgreSQL database');
    } catch (error) {
        console.error('Failed to connect to PostgreSQL database:', error);
        process.exit(1); // Exit the process if database connection fails
    }


    // pass the pool to the routes
    app.use((req, res, next) => {
        req.pool = pool;
        next();
    });

    // use the router
    app.use("/", router);

    // start the server
    app.listen(port, () => {
        console.log(`Server running on port http://localhost:${port}`);
    });

})();
