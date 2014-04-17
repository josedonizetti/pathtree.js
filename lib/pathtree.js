function Router(){
  this.node = new Node()
}

Router.prototype.add = function(key, value) {
  this.node.add(key, value)
}

Router.prototype.find = function(key) {
  return this.node.find(key)
}

function Node() {
  this.leafs = 0
  this.leaf = null
  this.wildcard = null
  this.edges = {}
}

Node.prototype.add = function(key, value) {
  this.leafs++
  order = this.leafs
  elements = splitPath(key)
  wildcards = []
  this.addNode(order, elements, wildcards, value)
}

Node.prototype.addNode = function (order, elements, wildcards, value) {
  if(elements.length == 0) {
      this.leaf = new Leaf(order, value, wildcards)
      return
  }

  car = elements.slice(0, 1)[0]
  cdr = elements.slice(1, elements.length)

  if (car[0] === ":") {
    if (this.wildcard == null) {
      this.wildcard = new Node()
    }

    wildcards.push(car.slice(1,car.length))
    return this.wildcard.addNode(order, cdr, wildcards, value)
  }

  node = this.edges[car]

  if (node == null) {
    node = new Node()
    this.edges[car] = node
  }

  node.addNode(order, cdr, wildcards, value)
}


Node.prototype.find = function(key) {
  elements = splitPath(key)
  return this.findNode(elements, [])
}

Node.prototype.findNode = function(elements, exp) {
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

exports.Router = Router
