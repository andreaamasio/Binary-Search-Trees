class Node {
  constructor(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}
class Tree {
  constructor(array) {
    this.root = null
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
  let arr = sortAndRemoveDuplicates(array)
  return sortAndRemoveDuplicates(array)
}
const arr = [3, 96, 45, 3, 254, 32, 84, 69, 69]

const myTree = new Tree(arr)
console.log(buildTree(arr))
