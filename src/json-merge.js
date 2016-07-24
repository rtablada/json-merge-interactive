import ObjectMerge from './object-merge';

export default class JsonMerge {
  constructor(original, replace) {
    this.original = original;
    this.replace = replace;
  }

  run(cb) {
    const merge = new ObjectMerge(JSON.parse(this.original), JSON.parse(this.replace));

    return merge.run(cb);
  }
}
