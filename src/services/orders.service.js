const crypto = require('crypto');

let orders = [];

const getAllOrders = () => {
  return orders;
};

const getOrderById = (id) => {
  return orders.find((order) => order.id === id) || null;
};

const createOrder = ({ customerName, phone, serviceType, weightKg }) => {
  const order = {
    id: crypto.randomUUID(),
    customerName,
    phone,
    serviceType,
    weightKg,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
};

const updateOrder = (id, data) => {
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return null;

  const filtered = {};
  for (const key of Object.keys(data)) {
    if (data[key] !== undefined) {
      filtered[key] = data[key];
    }
  }

  orders[index] = {
    ...orders[index],
    ...filtered,
    id: orders[index].id,
    createdAt: orders[index].createdAt,
  };
  return orders[index];
};

const deleteOrder = (id) => {
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return null;

  const deleted = orders.splice(index, 1);
  return deleted[0];
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
