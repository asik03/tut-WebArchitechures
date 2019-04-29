'use strict';

var orderList = []
var sendTask = require('../rabbit-utils/sendTask');
var receiveTask = require('../rabbit-utils/receiveTask');

/**
 * Add an order for an sandwich
 *
 * order Order place an order for a sandwich
 * returns Order
 **/

exports.proccesOrder = function(order) {
  return new Promise(function(resolve, reject) {
    for (i in orderList) {

    }
  })
}

exports.addOrder = function(order) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(order).length > 0 && order.id > 0) {
        order.status = "received";
        orderList.push(order);

        order.status = "inQueue";
        sendTask.addTask(process.env.RABBIT_HOST, "queue_A", order)
        //TODO HANDLE ERRORS
        .catch(function onError(error) {
          order.status = "failed";
          console.log('Could not add order to queue, ', error);
          reject("Order not created");
          return;
        });

        receiveTask.getTask(process.env.RABBIT_HOST, "queue_B");

        resolve(JSON.stringify(order));
    } else {
        reject("Order not created");
    }
  });
}

/**
 * Find an order by its ID
 * IDs must be positive integers
 *
 * orderId Long ID of sandwich that needs to be fetched
 * returns Order
 **/
exports.getOrderById = function(orderId) {
  return new Promise(function(resolve, reject) {
    console.log("Get order with id:", orderId);
    if (orderList.length > 0) {
        console.log("LIST:",orderList);
        for (var i in orderList){
            console.log("Checking order:", orderList[i]);
            if(orderList[i].id == orderId){
                console.log("Found id:", orderList[i].id);
                resolve(JSON.stringify(orderList[i]));
                return;
            }
        }
        reject("{\"error\":\"No order with given id was found\"}");
    } else {
        reject("{\"error\":\"No order with given id was found\"}");
    }
  });
}


/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * returns ArrayOfOrders
 **/
exports.getOrders = function() {
  return new Promise(function(resolve, reject) {
    if (orderList.length > 0) {
      resolve(JSON.stringify(orderList));
    } else {
      resolve();
    }
  });
}

