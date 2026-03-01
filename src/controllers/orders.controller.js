const ordersService = require('../services/orders.service');

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await ordersService.getAllOrders();
    res.json({ success: true, data: orders, message: 'Orders retrieved successfully' });
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await ordersService.getOrderById(req.params.id);
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ success: true, data: order, message: 'Order retrieved successfully' });
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { customerName, phone, serviceType, weightKg } = req.body;
    const errors = [];

    if (!customerName) errors.push('customerName is required');
    if (!phone) errors.push('phone is required');
    if (!serviceType) errors.push('serviceType is required');
    if (weightKg === undefined || weightKg === null) {
      errors.push('weightKg is required');
    } else if (typeof weightKg !== 'number' || weightKg <= 0) {
      errors.push('weightKg must be a number greater than 0');
    }

    if (errors.length > 0) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.errors = errors;
      return next(error);
    }

    const order = await ordersService.createOrder({ customerName, phone, serviceType, weightKg });
    res.status(201).json({ success: true, data: order, message: 'Order created successfully' });
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { customerName, phone, serviceType, weightKg, status } = req.body;
    const errors = [];

    if (weightKg !== undefined && (typeof weightKg !== 'number' || weightKg <= 0)) {
      errors.push('weightKg must be a number greater than 0');
    }

    if (errors.length > 0) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.errors = errors;
      return next(error);
    }

    const order = await ordersService.updateOrder(req.params.id, {
      customerName,
      phone,
      serviceType,
      weightKg,
      status,
    });

    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      return next(error);
    }

    res.json({ success: true, data: order, message: 'Order updated successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await ordersService.deleteOrder(req.params.id);
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ success: true, data: order, message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

