function set(obj, key, value) {
  const result = { ...obj };
  result[key] = value;

  return result;
}

export default class ObjectMerge {
  constructor(original, replace) {
    this.original = original;
    this.replace = replace;
  }

  run(cb) {
    var result = { ...this.original };

    for (var key in this.replace) {
      if (this.replace.hasOwnProperty(key)) {
        const mergeDetail = {
          key,
          original: this.original[key],
          replace: this.original[key]
        };

        if (!this.original.hasOwnProperty(key) || cb(mergeDetail)) {
          result = set(result, key, this.replace[key]);
        }
      }
    }

    return result;
  }
}
