'use strict';

var sandwichList = []

/**
 * Add a new sandwich to the store. Needs an API key.
 *
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.addSandwich = function(body) {
  return new Promise(function(resolve, reject) {
      console.log("Add sandwich:", body);

      //Check if sandwich with same ID already exists
      sandwichList.forEach(sandwich => {
        if(sandwich.id == body.id){
          console.error("Sandwich id already used:", JSON.stringify(order));
          reject('{"error":"405, sandwich id already used."}');
          return;
        }
      });

      //Add sandwich to the list
      sandwichList.push(body);
      resolve(JSON.stringify(body));
  });
}


/**
 * Deletes a sandwich
 *
 * sandwichId Long Sandwich id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteSandwich = function(sandwichId,api_key) {
  return new Promise(function(resolve, reject) {
    console.log("Delete Sandwich by Id:", sandwichId);
    if (sandwichList.length > 0) {
      for (var i=0; i < sandwichList.length; i++) {
        if(sandwichList[i].id == sandwichId) {
          var removed = sandwichList[i];
          sandwichList.splice(i, 1);
          resolve(JSON.stringify(removed));
          return;
        }
      }
      reject('{"error":"404, sandwich not found"}');
    }else {
      reject('{"error":"404, sandwich not found"}');
    }
  });
}


/**
 * Find sandwich by ID
 * Returns a single sandwich
 *
 * sandwichId Long ID of sandwich to return
 * returns Sandwich
 **/
exports.getSandwichById = function(sandwichId) {
  return new Promise(function(resolve, reject) {
    console.log("Get Sandwich by Id:", sandwichId);
    if (sandwichList.length > 0) {
      for (var i=0; i < sandwichList.length; i++){
        if(sandwichList[i].id == sandwichId){
          resolve(JSON.stringify(sandwichList[i]));
          return;
        }
      }
      reject('{"error":"405, sandwich not found"}');
    } else {
      reject('{"error":"405, sandwich not found"}');
    }
  });
}


/**
 * Get a list of all sandwiches. Empty array if no sandwiches are found.
 *
 * returns ArrayOfSandwiches
 **/
exports.getSandwiches = function() {
  return new Promise(function(resolve, reject) {
    if (sandwichList.length > 0) {
      resolve(JSON.stringify(sandwichList));
    } else {
      resolve(JSON.stringify([]));
    }
  });
}


/**
 * Updates a sandwich in the store with JSON in body
 *
 * sandwichId Long ID of sandwich to return
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.updateSandwich = function(sandwichId,body) {
  return new Promise(function(resolve, reject) {
    console.log("Input sandwich Id that wants to be updated:", sandwichId);
    if (sandwichList.length > 0) {
      console.log("SANDWICH:",sandwichList);
      for (var i in sandwichList){
        if (sandwichList[i].id == sandwichId){
          var oldSandwich = sandwichList[i];
          sandwichList[i] = body;
          resolve(JSON.stringify(oldSandwich));
          return;
        }
      }
      reject('{"error":"404, sandwich not found"}');
    }else{
      reject('{"error":"404, sandwich not found"}');
    }
  });
}

