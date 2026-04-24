require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { clientUrl } = require('./config/env');
const { errorHandler } = require('./middleware/error.middleware');
const routes = require('./routes');

const app = express();

app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use('/api/v1', routes);

app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use(errorHandler);

module.exports = app;
