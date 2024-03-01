import { BinaryTreeNode } from './BinaryTreeNode.js'
import {getRequiredHeightandWidth} from './treeUtils.js'

const canvas = document.querySelector('canvas')

function drawBinaryTree (root, canvasElement) {
  const maxHeight = window.innerHeight
  const maxWidth = window.innerWidth
  
  // Initialize the canvas  dimensions
  canvasElement.width = maxWidth
  canvasElement.height = maxHeight
  
  // calculated th required height and width of tree to be drawn
  const {
    requiredCanvasHeight,
    requiredCanvasWidth
  } = getRequiredHeightandWidth(root)
  
  const windowWidthCenter = maxWidth / 2
  const requiredCanvasWidthCenter = requiredCanvasWidth / 2
  
  const xStart = windowWidthCenter - requiredCanvasWidthCenter
  const xEnd = windowWidthCenter + requiredCanvasWidthCenter
  
  const horizontalConfig = {
    xStart,
    xEnd,
  }  
  recursivelyDrawNodes(root, canvasElement, 0, horizontalConfig)
}
  
  //Algo: 
  // 1) Find root node coord.
  // 2) Draw root circle
  // 3) Recursively draw left and right nodes
  // 4) connect edges of root with left and right 
function recursivelyDrawNodes (root, canvasElement, currentLevel, horizontalConfig) {
  
}

const root = new BinaryTreeNode(10)

const node1 = new BinaryTreeNode(20)
root.setLeft(node1)

const node2 = new BinaryTreeNode(30)
root.setRight(node2)

drawBinaryTree(root, canvas)
console.log(root)