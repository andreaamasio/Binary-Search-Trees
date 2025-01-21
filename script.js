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
  find(value, current = this.root) {
    if (current === null) return undefined
    if (current.data === value) {
      console.log(`checking inside beginning if if ${current.data}`)
      return current
    }

    if (value < current.data) {
      return this.find(value, current.left)
    } else {
      return this.find(value, current.right)
    }
  }
  levelOrder(callback, current = this.root) {
    if (!callback) {
      throw new Error("A callback is required")
    }
    if (current === null) {
      return null // tree is empty
    }
    let queue = [current]

    while (queue.length > 0) {
      let next = queue.shift()
      callback(next)
      if (next.left) {
        queue.push(next.left)
      }
      if (next.right) {
        queue.push(next.right)
      }
    }
  }
  levelOrderRecursive(callback, queue = [this.root]) {
    if (!callback) {
      throw new Error("A callback is required")
    }
    if (queue.length === 0) {
      return null
    }
    let next = queue.shift()
    callback(next)
    if (next.left) {
      queue.push(next.left)
    }
    if (next.right) {
      queue.push(next.right)
    }
    return this.levelOrderRecursive(callback, queue)
  }
  inOrder(callback, current = this.root) {
    if (current === null) {
      return
    }

    this.inOrder(callback, current.left)
    callback(current)
    this.inOrder(callback, current.right)
  }
  preOrder(callback, current = this.root) {
    if (current === null) {
      return
    }
    callback(current)
    this.preOrder(callback, current.left)
    this.preOrder(callback, current.right)
  }
  postOrder(callback, current = this.root) {
    if (current === null) {
      return
    }
    this.postOrder(callback, current.left)
    this.postOrder(callback, current.right)
    callback(current)
  }

  //   deleteItem(value) {
  //     let current = this.root
  //     let parent = null

  //     while (current) {
  //       if (current.data === value) {
  //         // Case 1: Node is a leaf
  //         if (this.checkIfLeaf(current)) {
  //           if (parent === null) {
  //             this.root = null // Deleting the root node
  //           } else if (parent.left === current) {
  //             parent.left = null
  //           } else {
  //             parent.right = null
  //           }
  //         }
  //         // Case 2: Node has two children
  //         else if (current.left && current.right) {
  //           let successor = current.right
  //           let successorParent = current

  //           // Find the in-order successor
  //           while (successor.left) {
  //             successorParent = successor
  //             successor = successor.left
  //           }

  //           current.data = successor.data

  //           // Remove the successor
  //           if (successorParent.left === successor) {
  //             successorParent.left = successor.right
  //           } else {
  //             successorParent.right = successor.right
  //           }
  //         }
  //         // Case 3: Node has one child
  //         else {
  //           let child = current.left ? current.left : current.right
  //           if (parent === null) {
  //             this.root = child // Replacing the root node
  //           } else if (parent.left === current) {
  //             parent.left = child
  //           } else {
  //             parent.right = child
  //           }
  //         }
  //         return true // Deletion successful
  //       } else if (value < current.data) {
  //         parent = current
  //         current = current.left
  //       } else {
  //         parent = current
  //         current = current.right
  //       }
  //     }

  //     return false // Value not found
  //   }
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
    return
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
const arr = [1, 2, 3, 4, 5, 6, 7]

const myTree = new Tree(arr)
console.log(prettyPrint(myTree.root))
function log(element) {
  return console.log(element.data)
}
console.log(myTree.postOrder(log))
