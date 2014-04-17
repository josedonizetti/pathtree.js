function PathTree() {
  this.leafs = 0
  this.leaf = null
}

PathTree.prototype.add = function(key, value) {
  this.leafs++
  order = this.leafs
  elements = key.split("/")
  elements.shift()
  this.leaf = new Leaf(order, value)
}


PathTree.prototype.find = function(key) {
  elements = key.split("/")
  elements.shift()
  return this.leaf
}

function Leaf(order, value) {
  this.order = order
  this.value = value
}

exports.PathTree = PathTree
