'use strict';

let orders = [];
let nextId = 1;

const REQUIRED_FIELDS = ['customerName', 'phone', 'serviceType', 'weightKg'];

/**
 * Validate order fields.
 * Returns an array of error strings (empty if valid).
 */
const validate = (data) => {
  const errors = [];

  REQUIRED_FIELDS.forEach((field) => {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      errors.push(`${field} is required`);
    }
  });

  if (data.weightKg !== undefined && data.weightKg !== null && data.weightKg !== '') {
    const w = Number(data.weightKg);
    if (isNaN(w) || w <= 0) {
      errors.push('weightKg must be a number greater than 0');
    }
  }

  return errors;
};

const findAll = () => orders;

const findById = (id) => orders.find((o) => o.id === id);

const create = (data) => {
  const errors = validate(data);
  if (errors.length > 0) {
    const err = new Error('Validation failed');
    err.statusCode = 422;
    err.errors = errors;
    throw err;
  }

  const order = {
    id: nextId++,
    customerName: data.customerName,
    phone: data.phone,
    serviceType: data.serviceType,
    weightKg: Number(data.weightKg),
    status: data.status || 'pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  return order;
};

const update = (id, data) => {
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  // Validate only the fields that are provided for update
  const merged = { ...orders[index], ...data };
  const errors = validate(merged);
  if (errors.length > 0) {
    const err = new Error('Validation failed');
    err.statusCode = 422;
    err.errors = errors;
    throw err;
  }

  orders[index] = {
    ...orders[index],
    customerName: merged.customerName,
    phone: merged.phone,
    serviceType: merged.serviceType,
    weightKg: Number(merged.weightKg),
    status: merged.status,
    updatedAt: new Date().toISOString(),
  };

  return orders[index];
};

const remove = (id) => {
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;
  const removed = orders[index];
  orders.splice(index, 1);
  return removed;
};

module.exports = { findAll, findById, create, update, remove };
