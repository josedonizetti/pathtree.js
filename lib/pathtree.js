function PathTree() {
  this.leafs = 0
  this.leaf = null
  this.wildcard = null
  this.edges = []
}

PathTree.prototype.add = function(key, value) {
  this.leafs++
  order = this.leafs
  elements = splitPath(key)
  wildcards = []
  this.addNode(order, elements, wildcards, value)
}

PathTree.prototype.addNode = function (order, elements, wildcards, value) {
  if(elements.length == 0) {
      this.leaf = new Leaf(order, value, wildcards)
      return
  }

  car = elements.slice(0, 1)[0]
  cdr = elements.slice(1, elements.length)

  if (car[0] === ":") {
    if (this.wildcard == null) {
      this.wildcard = new PathTree()
    }

    wildcards.push(car.slice(1,car.length))
    return this.wildcard.addNode(order, cdr, wildcards, value)
  }

  node = this.edges[car]

  if (node == null) {
    node = new PathTree()
    this.edges[car] = node
  }

  node.addNode(order, cdr, wildcards, value)
}


PathTree.prototype.find = function(key) {
  elements = splitPath(key)
  return this.findNode(elements, [])
}

PathTree.prototype.findNode = function(elements, exp) {
  if (elements.length == 0) {
      return this.leaf
  }

  car = elements.slice(0, 1)[0]
  cdr = elements.slice(1, elements.length)

  node = this.edges[car]
  if (node) {
      return node.findNode(cdr, exp)
  }

  if (this.wildcard) {
    exp.push(car)
    var wildcardLeaf = this.wildcard.findNode(cdr, exp)
    if (wildcardLeaf && (node == null || node.order > wildcardLeaf.order)) {
      wildcardLeaf.exp = exp
      return wildcardLeaf
    }
  }
}

function Leaf(order, value, wildcards) {
  this.order = order
  this.value = value
  this.wildcards = wildcards
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
