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

This will log out:

```js
{ firstName: 'Marge', lastName: 'Simpson', age: 23, hair: 'blue' }
```


## Example Using Inquirer

Since the conflict resolution function returns a promise, it is easy to wait for user feedback.
In this example, we'll use the `inquirer` package to ask the user which option they want to choose:

```js
var inquirer = require('inquirer');
var ObjectMerge = require('json-merge-interactive').ObjectMerge;

var original = { firstName: 'Homer', lastName: 'Simpson', age: 23 };
var replace = { firstName: 'Marge', lastName: 'Bouvier', hair: 'blue' };

var merge = new ObjectMerge(original, replace);
merge.run(function (m) {
  const message = `Are you sure you want to replace "${m.originalValue}" with "${m.replaceValue}"?`;
  const prompt = { type: 'confirm', name: 'answer', message };
  return inquirer.prompt(prompt)
    .then((results) => results.answer);
}).then((result) => {
  console.log(result);
});

```

This will come up with a prompt asking:

```bash
? Are you sure you want to replace "Homer" with "Marge"? (Y/n)
? Are you sure you want to replace "Simpson" with "Bouvier"? (Y/n)
```

Then based on the answers, the interactive merge will pull in the appropriate properties from the replace object.

## License

This package is open-sourced software licensed under the [MIT License](LICENSE.txt).
