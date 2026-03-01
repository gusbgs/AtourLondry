'use strict';

const { Router } = require('express');
const ordersController = require('../controllers/orders.controller');

const router = Router();

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getById);
router.post('/', ordersController.create);
router.put('/:id', ordersController.update);
router.delete('/:id', ordersController.remove);

module.exports = router;
