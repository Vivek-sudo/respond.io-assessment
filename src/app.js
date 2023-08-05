const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const { database } = require('./config');

const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan('combined'));

// Database connection
database.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// Mount the routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;