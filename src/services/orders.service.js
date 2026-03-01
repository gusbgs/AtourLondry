const prisma = require('../config/prisma');

const getAllOrders = async () => {
  return prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
};

const getOrderById = async (id) => {
  return prisma.order.findUnique({ where: { id } });
};

const createOrder = async ({ customerName, phone, serviceType, weightKg }) => {
  return prisma.order.create({
    data: { customerName, phone, serviceType, weightKg },
  });
};

const updateOrder = async (id, data) => {
  const filtered = {};
  for (const key of Object.keys(data)) {
    if (data[key] !== undefined) {
      filtered[key] = data[key];
    }
  }

  return prisma.order.update({ where: { id }, data: filtered }).catch((err) => {
    if (err.code === 'P2025') return null;
    throw err;
  });
};

const deleteOrder = async (id) => {
  return prisma.order.delete({ where: { id } }).catch((err) => {
    if (err.code === 'P2025') return null;
    throw err;
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

