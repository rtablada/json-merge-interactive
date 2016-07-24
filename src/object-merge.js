import co from 'co';

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
    return co(function* () {
      var result = { ...this.original };

      for (var key in this.replace) {
        if (this.replace.hasOwnProperty(key)) {
          const original = this.original[key];
          const replace = this.replace[key];
          const keyWithPrefix = this.getKey(key);

          if (typeof original === 'object' && typeof replace === 'object') {
            const merge = new ObjectMerge(original, replace, keyWithPrefix);
            result = set(result, key, merge.run(cb));
          } else if (!this.original.hasOwnProperty(key)) {
            result = set(result, key, this.replace[key]);
          } else {
            const mergeDetail = { key: keyWithPrefix, original, replace };
            const shouldReplace = yield cb(mergeDetail);

            if (shouldReplace) {
              result = set(result, key, this.replace[key]);
            }
          }
        }
      }

      return result;
    });
  }

  getKey(key) {
    if (this.prefix) {
      return `${this.prefix}.${key}`;
    }

    return key;
  }
}
