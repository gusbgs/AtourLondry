'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./routes/index');
const notFound = require('./middlewares/notfound.middleware');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Built-in middleware
app.use(express.json());

// Third-party middleware
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api', router);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
