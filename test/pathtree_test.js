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


  it('named parameters', function() {
    var pathTree = new PathTree()

    pathTree.add("/:controller", 0)
    pathTree.add("/:controller/:action", 1)
    pathTree.add("/:controller/:action/:id", 2)


    var leaf = pathTree.find("/controller")
    assert.equal(leaf.value, 0)
    assert.equal(leaf.exp, "controller")

    leaf = pathTree.find("/p")
    assert.equal(leaf.value, 0)
    assert.equal(leaf.exp, "p")

    leaf = pathTree.find("/controller/action")
    assert.equal(leaf.value, 1)
    assert.deepEqual(leaf.exp, ["controller", "action"])

    leaf = pathTree.find("/c/a")
    assert.equal(leaf.value, 1)
    assert.deepEqual(leaf.exp, ["c", "a"])

    leaf = pathTree.find("/controller/action/id")
    assert.equal(leaf.value, 2)
    assert.deepEqual(leaf.exp, ["controller", "action", "id"])

    leaf = pathTree.find("/t/t/1")
    assert.equal(leaf.value, 2)
    assert.deepEqual(leaf.exp, ["t", "t", "1"])
  })

})
