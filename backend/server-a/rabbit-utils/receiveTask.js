#!/usr/bin/env node
// Process tasks from the work queue

'use strict';

var amqp = require('amqplib');
var orderService = require('../service/OrderService');

module.exports.getTask = function(rabbitHost, queueName){
  amqp.connect('amqp://' + rabbitHost).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertQueue(queueName, {durable: true});
      ok = ok.then(function() { ch.prefetch(1); });
      ok = ok.then(function() {
        ch.consume(queueName, doWork, {noAck: false});
        console.log(" [*] Waiting for messages. To exit press CTRL+C");
      });
      return ok;

      function doWork(msg) {
        var body = msg.content.toString();
        var receivedData = Buffer.from(JSON.parse(body).data);
        console.log("Received string:", receivedData.toString());
        var receivedJson = JSON.parse(receivedData.toString());
        console.log(" [x] Received '%s'", JSON.stringify(receivedJson));

        orderService.processOrder(receivedJson.id);
      }
    });
  }).catch(console.warn);
}
