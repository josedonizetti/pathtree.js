function PathTree() {
  this.leafs = 0
  this.leaf = null
  this.edges = []
}

PathTree.prototype.add = function(key, value) {
  this.leafs++
  order = this.leafs
  elements = splitPath(key)
  this.addNode(order, elements, value)
}

PathTree.prototype.addNode = function (order, elements, value) {
  if(elements.length == 0) {
      this.leaf = new Leaf(order, value)
      return
  }

  car = elements.slice(0, 1)
  cdr = elements.slice(1, elements.length)

  node = this.edges[car]

  if (node == null) {
    node = new PathTree()
    this.edges[car] = node
  }

  node.addNode(order, cdr, value)
}


PathTree.prototype.find = function(key) {
  elements = splitPath(key)
  return this.findNode(elements)
}

PathTree.prototype.findNode = function(elements) {
  if (elements.length == 0) {
      return this.leaf
  }

  car = elements.slice(0, 1)
  cdr = elements.slice(1, elements.length)

  node = this.edges[car]
  if (node) {
      return node.findNode(cdr)
  }
}

function Leaf(order, value) {
  this.order = order
  this.value = value
}

function splitPath(key) {
  var elements = []

  if (key === "/") {
    return elements
  }

  elements = key.split("/")
  elements.shift()
  return elements
}

exports.PathTree = PathTree
