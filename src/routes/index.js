const express = require('express');
const router = express.Router();
const ordersRoutes = require('./orders.routes');

router.get('/', (req, res) => {
  res.json({ success: true, data: null, message: 'AtourLondry API' });
});

router.use('/orders', ordersRoutes);

module.exports = router;
