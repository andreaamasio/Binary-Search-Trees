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
  depth(node, parent = this.root) {
    let nodeData = node.data
    if (nodeData === parent.data) {
      return 0 //found
    }

    if (nodeData < parent.data && parent.left) {
      return 1 + this.depth(node, parent.left)
    } else if (nodeData > parent.data && parent.right) {
      return 1 + this.depth(node, parent.right)
    }
  }
  height1(node) {
    if (this.checkIfLeaf(node)) {
      return 0
    }
    let leftHeight
    let rightHeight
    if (node.left) {
      leftHeight = this.height(node.left)
    } else leftHeight = 0

    if (node.right) {
      rightHeight = this.height(node.right)
    } else rightHeight = 0
    return Math.max(leftHeight, rightHeight) + 1
  }
  height(node) {
    // Base case: the height of a null node is 0
    if (node === null) {
      return 0
    }

    // Calculate heights of left and right subtrees
    let leftHeight = this.height(node.left)
    let rightHeight = this.height(node.right)

    // Add 1 for the current node and return the maximum of left/right heights
    return Math.max(leftHeight, rightHeight) + 1
  }
  isBalanced1(node = this.root) {
    if (node === null) return true
    let heightLeftSubtree = this.height(node.left)
    let heightRightSubtree = this.height(node.right)
    let difference = Math.abs(heightLeftSubtree - heightRightSubtree)
    if (difference > 1) {
      return false
    }
    return this.isBalanced(node.left) && this.isBalanced(node.right)
  }
  isBalanced(node = this.root) {
    // Base case: an empty node is balanced
    if (node === null) {
      return true
    }

    // Calculate the heights of the left and right subtrees
    let leftHeight = this.height(node.left)
    let rightHeight = this.height(node.right)

    // Check the balance condition at the current node
    let difference = Math.abs(leftHeight - rightHeight)
    if (difference > 1) {
      return false // Current node is not balanced
    }

    // Recursively check the balance of left and right subtrees
    return this.isBalanced(node.left) && this.isBalanced(node.right)
  }
  rebalance() {
    let newArray = []
    function addToArray(element) {
      newArray.push(element.data)
    }
    this.levelOrder(addToArray)
    let sortedOrderedArray = sortAndRemoveDuplicates(newArray)
    this.root = buildTree(sortedOrderedArray)
    console.log(sortedOrderedArray)
    console.log("rebalanced")
  }
  deleteItem(value, current = this.root, parent = null) {
    if (current === null) {
      return // Value not found
    }
    if (value < current.data) {
      return this.deleteItem(value, current.left, (parent = current))
    } else if (value > current.data) {
      return this.deleteItem(value, current.right, (parent = current))
    } else {
      //value found
      if (this.checkIfLeaf(current)) {
        // case node to delete is leaf
        if (parent.left === current) {
          parent.left = null
        } else if (parent.right === current) {
          parent.right = null
        }
      } else if (current.left && current.right) {
        // case node to delete has 2 children
        let successorParent = current
        let successor = current.right
        while (successor.left) {
          successorParent = successor
          successor = successor.left
        }

        current.data = successor.data

        if (successorParent.left === successor) {
          successorParent.left = successor.right
        } else {
          successorParent.right = successor.right
        }
      } else {
        // case node to delete has one child

        if (parent.left === current) {
          //connected to parent by left
          if (current.left) {
            parent.left = current.left
          } else if (current.right) {
            parent.left = current.right
          }
        } else if (parent.right === current) {
          //connected to parent  by right
          if (current.left) {
            parent.right = current.left
          } else if (current.right) {
            parent.right = current.right
          }
        }
      }
    }
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
const arr = [1, 2, 3, 4, 78, 45, 34, 97]

const myTree = new Tree(arr)
console.log(prettyPrint(myTree.root))
function log(element) {
  return console.log(element.data)
}
console.log(myTree.deleteItem(34))
console.log(prettyPrint(myTree.root))
