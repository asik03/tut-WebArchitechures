var receiveTask = require('./rabbit-utils/receiveTask');

var main = function () { 
    receiveTask.getTask(process.env.RABBIT_HOST, "queue_A");
}

if (require.main === module) { 
    main(); 
}