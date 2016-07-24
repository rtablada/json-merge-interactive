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
});
