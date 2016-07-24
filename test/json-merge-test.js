var expect = require('chai').expect;
var JsonMerge = require('../dist/json-merge').default;

describe('JSON Merge', function() {
  it('should accept all new values', function() {
    var orig = '{"a": 1, "b": 2}';
    var replace = '{"a": "abc"}';

    var merge = new JsonMerge(orig, replace);
    var result = merge.run(function(merge) {
      return true;
    });

    expect(result).to.deep.equal({a: 'abc', b: 2});
  });

  it('should accept reject new values', function() {
    var orig = '{"a": 1, "b": 2}';
    var replace = '{"a": "abc"}';
    var merge = new JsonMerge(orig, replace);
    var result = merge.run(function(merge) {
      return false;
    });

    expect(result).to.deep.equal({a: 1, b: 2});
  });
});
