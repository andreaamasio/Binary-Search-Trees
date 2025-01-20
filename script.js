class Node {
  constructor(data, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}
class Tree {
  constructor(arr) {
    let array = sortAndRemoveDuplicates(arr)
    this.root = buildTree(array)
  }
  insert(value) {
    let current = this.root
    while (current) {
      if (value > current.data) {
        if (current.right === null) {
          current.right = new Node(value)
          return
        }
        current = current.right
      } else if (value < current.data) {
        if (current.left === null) {
          current.left = new Node(value)
          return
        }
        current = current.left
      } else return //value is already in the tree
    }
  }
  checkIfLeaf(node) {
    if (node.left === null && node.right === null) {
      return true
    } else return false
  }
}
function sortAndRemoveDuplicates(array) {
  let set = new Set(array)

  let noDuplicates = [...set]
  let sortedArray = noDuplicates.sort(function (a, b) {
    return a - b
  })
  return sortedArray
}
function buildTree(array) {
  if (array.length === 0) {
    return null
  }
  if (array.length === 1) {
    return new Node(array[0])
  }
  let midIndex = Math.floor(array.length / 2)

  let root = array[midIndex]

  let left = array.slice(0, midIndex)
  let right = array.slice(midIndex + 1)

  let leftTree = buildTree(left)
  let rightTree = buildTree(right)

  return new Node(root, leftTree, rightTree)
}
const arr = [9, 7, 88, 52, 87, 1, 2, 5]

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
  }
}

const myTree = new Tree(arr)
console.log(prettyPrint(myTree.root))
myTree.insert(4)
console.log(prettyPrint(myTree.root))
