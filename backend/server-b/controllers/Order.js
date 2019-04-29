'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');

module.exports.addOrder = function addOrder (req, res, next) {
  var order = req.swagger.params['order'].value;
  console.log("Add Order...");
  Order.addOrder(order)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

module.exports.getOrderById = function getOrderById (req, res, next) {
  var orderId = req.swagger.params['orderId'].value;
  console.log("Get Order...");
  Order.getOrderById(orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 404);
    });
};

module.exports.getOrders = function getOrders (req, res, next) {
  console.log("Get Orders...");
  Order.getOrders()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
