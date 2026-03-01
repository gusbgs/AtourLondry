'use strict';

const { Router } = require('express');
const ordersRouter = require('./orders.routes');

const router = Router();

// Health check
router.get('/', (req, res) => {
  res.json({ message: 'AtourLondry API' });
});

router.use('/orders', ordersRouter);

module.exports = router;
