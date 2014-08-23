/*
 *
 * vow.js
 * Created by Tyler Olson
 *
 */


// http://promisesaplus.com/
// pending, fulfilled, or rejected.

var Vow = function() {
  this.promise = new Promise();
};

Vow.prototype.resolve = function(value) {
  var promise = this.promise,
    callbacks = promise.onFulfilledCallbacks;

    console.log(callbacks);

  promise.state = 'fulfilled';

  for (var i = 0; i < callbacks.length; i++) {
    var callback = callbacks[i];
    callback(value);
  }
};

Vow.prototype.reject = function(reason) {
  var promise = this.promise,
    callbacks = promise.onRejectedCallbacks;

  promise.state = 'rejected';

  for (var i = 0; i < callbacks.length; i++) {
    var callback = callbacks[i];
    callback(reason);
  }
};

var Promise = function() {
  this.state = 'pending';
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var state = this.state;

  console.log(state);

  if (state === 'fulfilled') {
    console.log('already fulfilled');
  }

  if (onFulfilled) {
    this.onFulfilledCallbacks.push(onFulfilled);
  }

  if (onRejected) {
    this.onRejectedCallbacks.push(onRejected);
  }

  // return this;
};

var vow;


vow = new Vow();


function somethingAsync() {
  setTimeout(function() {
    vow.resolve({cool: 'yes'});
    // vow.reject('bad data');
  }, 500);

  return vow.promise;
}

somethingAsync().then(function(result) {
  console.log('Result: ', result);
}, function(err) {
  console.log('Err: ', err);
});

setTimeout(function() {
  somethingAsync().then(function(result) {
    console.log('Result: ', result);
  }, function(err) {
    console.log('Err: ', err);
  });
}, 1000);
