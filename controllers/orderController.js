const Order = require('../models/Order');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');


const createOrder = async (req, res) => {
  console.log("createOrder")
  res.status(StatusCodes.OK).json({ message: 'create order' });
};
const getAllOrders = async (req, res) => {
  console.log("getAllOrders")
  res.status(StatusCodes.OK).json({ message: 'get all orders' });
};
const getSingleOrder = async (req, res) => {
  console.log("getSingleOrder")
  res.status(StatusCodes.OK).json({ message: 'get single order' });
};
const getCurrentUserOrders = async (req, res) => {
  console.log("getCurrentUserOrders")
  res.status(StatusCodes.OK).json({ message: 'get current user orders' });
};
const updateOrder = async (req, res) => {
  console.log("updateOrder")
  res.status(StatusCodes.OK).json({ message: 'update order' });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};