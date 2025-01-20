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
  //console.log(`array;${array}`)
  if (array.length === 0) {
    return null
  }
  if (array.length === 1) {
    return new Node(array[0])
  }
  let midIndex = Math.floor(array.length / 2)
  //console.log(`midIndex;${midIndex}`)
  let root = array[midIndex]
  console.log(`root:${root}`)
  let left = array.slice(0, midIndex)
  let right = array.slice(midIndex + 1)
  console.log(`left:${left}`)
  console.log(`right:${right}`)

  let leftTree = buildTree(array.slice(0, midIndex))
  let rightTree = buildTree(array.slice(midIndex + 1))

  return new Node(root, leftTree, rightTree)
}
const arr = [9, 1, 2, 6, 7, 3, 4, 5]

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
const prettyPrintStr = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return ""
  }
  let result = ""
  if (node.right !== null) {
    result += prettyPrint(
      node.right,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false
    )
  }
  result += `${prefix}${isLeft ? "└── " : "┌── "}${node.data}\n`
  if (node.left !== null) {
    result += prettyPrint(
      node.left,
      `${prefix}${isLeft ? "    " : "│   "}`,
      true
    )
  }
  return result
}
const myTree = new Tree(arr)
console.log(prettyPrint(myTree.root))
