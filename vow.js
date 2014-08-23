var Vow = function() {
  this.callbacks = [];
};

Vow.prototype.resolve = function(_value) {
  var callbacks = this.callbacks;

  if(callbacks) {
    var value = promisify(_value);

    for (var i = 0; i < callbacks.length; i++) {
      var callback = callbacks[i];
      value.then(callback);
    }

    this.value = value;
    this.callbacks = null;

  } else {
    // throw new Error("A promise can only be resolved once.");
  }
};

function promisify(value) {
  if (value instanceof Vow) {
    return value;
  } else {
    console.log('not a promise');
    // return new Promise(value);
    return {
        then: function (callback) {
            return promisify(callback(value));
        }
    };
  }
}

Vow.prototype.then = function(_callback) {
  var vow = new Vow();

  var callback = function(value) {
    vow.resolve(_callback(value));
  };

  if(this.callbacks) {
    this.callbacks.push(callback);
  } else {
    this.value.then(callback);
  }

  return vow;
};



function somethingAsynch() {
  var promise = new Vow();

  setTimeout(function() {
    promise.resolve({cool: true});
  }, 500);

  return promise;
}

var promise = somethingAsynch();

// promise.then(function(result) {
//   console.log(result);
//   result.another = true;
//   // return result;
//   return somethingAsynch();
// }).then(function(another) {
//   console.log('another ', another);
//   another.another = true;
//   return another;
// }).then(function(result) {
//   console.log('result', result);
// });

// setTimeout(function() {
//   promise.then(function(result) {
//     console.log(result);
//   });
// }, 510);

promise.then(function(result) {
  console.log('result1: ', result);
  return somethingAsynch();
  // return 'abc';
}).then(function(result) {
  console.log('result2: ', result);
}, function(err) {
  console.log('err: ', err);
});
