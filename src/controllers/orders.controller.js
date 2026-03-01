'use strict';

const ordersService = require('../services/orders.service');

const getAll = (req, res, next) => {
  try {
    const data = ordersService.findAll();
    res.json({ success: true, data, message: 'Orders retrieved successfully' });
  } catch (err) {
    next(err);
  }
};

const getById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid order ID format' });
    }
    const data = ordersService.findById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data, message: 'Order retrieved successfully' });
  } catch (err) {
    next(err);
  }
};

const create = (req, res, next) => {
  try {
    const data = ordersService.create(req.body);
    res.status(201).json({ success: true, data, message: 'Order created successfully' });
  } catch (err) {
    next(err);
  }
};

const update = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid order ID format' });
    }
    const data = ordersService.update(id, req.body);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data, message: 'Order updated successfully' });
  } catch (err) {
    next(err);
  }
};

const remove = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid order ID format' });
    }
    const data = ordersService.remove(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data, message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
