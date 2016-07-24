function set(obj, key, value) {
  const result = { ...obj };
  result[key] = value;

  return result;
}

export default class ObjectMerge {
  constructor(original, replace, prefix) {
    this.original = original;
    this.replace = replace;
    this.prefix = prefix;
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

  getKey(key) {
    if (this.prefix) {
      return `${this.prefix}.${key}`;
    }

    return key;
  }
}
