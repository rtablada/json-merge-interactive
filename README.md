## JSON Merge Interactive

This package allows you to merge JSON files and strings interactively.

## Installing

To install this package run:

```bash
npm install --save json-merge-interactive
```

## Use (Comparing Objects)

This package works by creating an ObjectMerge object with the two objects we want to merge.
Then, we can use the `run` method with a callback to define our rules of how to work through collisions.
For instance this will only replace keys that start with the letter `f`:

```js
var ObjectMerge = require('json-merge-interactive').ObjectMerge;

var original = { firstName: 'Homer', lastName: 'Simpson', age: 23 };
var replace = { firstName: 'Marge', lastName: 'Bouvier', hair: 'blue' };

var merge = new ObjectMerge(original, replace);
merge.run(function (m) {
  return Promise.resolve(m.key[0] === 'f');
}).then((result) => {
  console.log(result);
});
```
