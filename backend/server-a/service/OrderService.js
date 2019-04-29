'use strict';

var orderList = []
var sendTask = require('../rabbit-utils/sendTask');
var receiveTask = require('../rabbit-utils/receiveTask');
var sandwichService = require('./SandwichService')

/**
 * Add an order for an sandwich
 *
 * order Order place an order for a sandwich
 * returns Order
 **/
exports.addOrder = function(order) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(order).length > 0) {
        //Assign order id
        order.id = 1;
        orderList.forEach(element => {
          if(element.id >= order.id){
            order.id = element.id + 1;
          }
        });

        //Check order is not already in the list
        orderList.forEach(element => {
            if(element.id == order.id){
                console.error("Order id already used:", JSON.stringify(order));
                reject('{"error":"Order not created, id already used."}');
                return;
            }
        });

        //Check sandwich ID is valid
        sandwichService.getSandwichById(order.sandwichId)
        .then(function (response) {
            
            order.status = "received";
            
            //Send order to the queue
            order.status = "inQueue";
            sendTask.addTask(process.env.RABBIT_HOST, "queue_A", order)
            .then(function (msg) {
                //Order succesfully sent to queue A
                console.log("Added order:", JSON.stringify(order));
                //Add order to the list
                orderList.push(order);
                //Return order as response
                resolve(JSON.stringify(order));
            }).catch(function(err) {
                //Error adding order to queue A
                console.error("Could not add order to queue")
                order.status = "failed";
                console.error("Order failed:", JSON.stringify(order));
                //Add failed order to the list
                orderList.push(order);
                //Return failed order as response
                resolve(JSON.stringify(order));
            });  
        })
        .catch(function (response) {
            console.error("invalid sandwichId:", JSON.stringify(order));
            reject('{"error":"Order not created, invalid sandwichID."}');
        });
		
    } else {
        console.error("Invalid order:", JSON.stringify(order));
        reject('{"error":"Order not created, invalid order."}');
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
    if (orderList.length > 0) {
        for (var i in orderList){
            if(orderList[i].id == orderId){
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
      resolve(JSON.stringify([]));
    }
  });
}

/**
 * Process an order that has been received from queue B
 *
 **/
exports.processOrder = function(orderId) {
	if (orderList.length > 0) {
		for (var i in orderList){
			if(orderList[i].id == orderId){
                orderList[i].status = "ready";
                console.log("Order has been processed:", orderList[i]);
				//return;
			}
		}
		//console.log("No order to process was found with id ", orderId);
	} else {
		console.log("No order to process was found with id ", orderId);
	}
}