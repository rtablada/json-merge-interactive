var expect = require('chai').expect;
var ObjectMerge = require('../dist/object-merge').default;

describe('Object Merge', function() {
  it('should create an ObjectMerger instance', function() {
    var orig = {a: '1'};
    var replace = {a: '1'};
    var result = new ObjectMerge(orig, replace);

    expect(result).to.be.an.instanceof(ObjectMerge);
    expect(result.original).to.equal(orig);
    expect(result.replace).to.equal(replace);
    expect(result.run).to.be.a('function');
  });

  it('should accept all new values', function() {
    var orig = {a: 1, b: 2};
    var replace = {a: 'abc'};
    var merge = new ObjectMerge(orig, replace);
    var result = merge.run(function(merge) {
      return true;
    });

    expect(result).to.deep.equal({a: 'abc', b: 2});
  });

  it('should accept reject new values', function() {
    var orig = {a: 1, b: 2};
    var replace = {a: 'abc'};
    var merge = new ObjectMerge(orig, replace);
    var result = merge.run(function(merge) {
      return false;
    });

    expect(result).to.deep.equal({a: 1, b: 2});
  });

  it('should bring in new values from replace', function() {
    var orig = {a: 1, b: 2};
    var replace = {a: 'abc', c: 'xyz'};
    var merge = new ObjectMerge(orig, replace);
    var result = merge.run(function(merge) {
      return false;
    });

    expect(result).to.deep.equal({a: 1, b: 2, c: 'xyz'});
  });

  it('should get nested keys', function() {
    var orig = {a: 1, b: 2};
    var replace = {a: 'abc', c: 'xyz'};
    var merge = new ObjectMerge(orig, replace, 'a');
    var result = merge.getKey('foo');

    expect(result).to.equal('a.foo');
  });

  it('should account for no prefix for keys', function() {
    var orig = {a: 1, b: 2};
    var replace = {a: 'abc', c: 'xyz'};
    var merge = new ObjectMerge(orig, replace);
    var result = merge.getKey('foo');

    expect(result).to.equal('foo');
  });

  it('should continue merging nested objects', function() {
    var orig = { a: { x: 1, y: 'a' }, b: 2, d: '10' };
    var replace = { a: { x: 'z', y: '2' }, b: 2, c: 'c' };
    var merge = new ObjectMerge(orig, replace);
    var result = merge.run(function(merge) {
      return true;
    });

    expect(result).to.deep.equal({ a: { x: 'z', y: '2' }, b: 2, c: 'c', d: '10' });
  });

  it('should continue merging nested objects with false', function() {
    var orig = { a: { x: 1, y: 'a' }, b: 2, d: '10' };
    var replace = { a: { x: 'z', y: '2' }, b: 2, c: 'c' };
    var merge = new ObjectMerge(orig, replace);
    var result = merge.run(function(merge) {
      return false;
    });

    expect(result).to.deep.equal({ a: { x: 1, y: 'a' }, b: 2, c: 'c', d: '10' });
  });

  it('should continue merging nested objects with mixed results', function() {
    var orig = { a: { x: 1, y: 'a' }, b: 15, d: '10' };
    var replace = { a: { x: 'z', y: '2' }, b: 2, c: 'c' };
    var merge = new ObjectMerge(orig, replace);
    var result = merge.run(function(merge) {
      return merge.key.indexOf('.') > -1;
    });

    expect(result).to.deep.equal({ a: { x: 'z', y: '2' }, b: 15, c: 'c', d: '10' });
  });
});
