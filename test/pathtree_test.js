var assert = require('assert'),
    PathTree = require('../lib/pathtree').PathTree

describe('Pathtree', function() {
  it('basic route', function() {
    var pathTree = new PathTree()
    pathTree.add("/", 0)

    var leaf = pathTree.find("/")
    assert.equal(leaf.value, 0)
  })
})
