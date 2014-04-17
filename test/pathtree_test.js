var assert = require('assert'),
    PathTree = require('../lib/pathtree').PathTree

describe('Pathtree', function() {
  it('basic route', function() {
    var pathTree = new PathTree()

    pathTree.add("/", 0)
    pathTree.add("/path", 1)
    pathTree.add("/path/to", 2)


    var leaf = pathTree.find("/")
    assert.equal(leaf.value, 0)

    leaf = pathTree.find("/path")
    assert.equal(leaf.value, 1)

    leaf = pathTree.find("/path/to")
    assert.equal(leaf.value, 2)
  })
})
