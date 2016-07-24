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
    const _this = this;
    const original = this.original;
    const replace = this.replace;



    return co(function* () {
      var result = { ...original };

      for (var key in replace) {
        if (replace.hasOwnProperty(key)) {
          const originalValue = original[key];
          const replaceValue = replace[key];
          const keyWithPrefix = _this.getKey(key);

          if (typeof originalValue === 'object' && typeof replaceValue === 'object') {
            const merge = new ObjectMerge(originalValue, replaceValue, keyWithPrefix);
            const subTree = yield merge.run(cb);

            result = set(result, key, subTree);
          } else if (!original.hasOwnProperty(key)) {
            result = set(result, key, replaceValue);
          } else {
            const mergeDetail = { key: keyWithPrefix, originalValue, replaceValue };
            const shouldReplace = yield cb(mergeDetail);

            if (shouldReplace) {
              result = set(result, key, replaceValue);
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
