var assert = require('assert'),
    Router = require('../lib/pathtree').Router

describe('Pathtree', function() {
  it('basic route', function() {
    var router = new Router()

    router.add("/", 0)
    router.add("/path", 1)
    router.add("/path/to", 2)

    var route = router.find("/")
    assert.equal(route.value, 0)

    route = router.find("/path")
    assert.equal(route.value, 1)

    route = router.find("/path/to")
    assert.equal(route.value, 2)
  })


  it('named parameters', function() {
    var router = new Router()

    router.add("/:controller", 0)
    router.add("/:controller/:action", 1)
    router.add("/:controller/:action/:id", 2)

    var route = router.find("/controller")
    assert.equal(route.value, 0)
    assert.equal(route.exp, "controller")

    route = router.find("/p")
    assert.equal(route.value, 0)
    assert.equal(route.exp, "p")

    route = router.find("/controller/action")
    assert.equal(route.value, 1)
    assert.deepEqual(route.exp, ["controller", "action"])

    leaf = router.find("/c/a")
    assert.equal(route.value, 1)
    assert.deepEqual(route.exp, ["c", "a"])

    route = router.find("/controller/action/id")
    assert.equal(route.value, 2)
    assert.deepEqual(route.exp, ["controller", "action", "id"])

    route = router.find("/t/t/1")
    assert.equal(route.value, 2)
    assert.deepEqual(route.exp, ["t", "t", "1"])
  })

})
