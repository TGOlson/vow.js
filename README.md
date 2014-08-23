# vow.js

Super fast, super small JavaScript promise library.

## Getting Started

Copy the `vow.js` script into your project.

## Usage

First, create a new `promise` (aka a new `vow`):

```js
var promise = new Vow();
```

Unlike other promise libraries, the `promise` object handles both callback registration and promise resolution. This is done for simplicity and code size management.

Because of this `promise` object handles all general promise interaction. Each `promise` has two functions: `then` and `resolve`. To get then eventual return from a `promise`, use the `then` function.


```js
promise.then(function(result) {
  console.log(result);
});
```

To resolve a promise with a value, use the `resolve` function:

```js
promise.resolve('data');
```

A more full example might look something like this:

```js
function somethingAsynch() {
  var promise = new Vow();

  setTimeout(function() {
    promise.resolve('lots of data');
  }, 500);

  return promise;
}

var promise = somethingAsynch();

promise.then(function(result) {

  // after the 500ms timeout we receive the result
  // => 'lots of data'

});
```

## TODO

* Add `onReject` function to vows.
* Write section about chaining promises
* Add info about differences from A+ spec
* Create NPM module
