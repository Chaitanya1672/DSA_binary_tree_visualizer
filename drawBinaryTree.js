import { BinaryTreeNode } from './BinaryTreeNode.js'
import {DEFAULT_CONFIG, connectEdges, drawNode, getRequiredHeightandWidth} from './treeUtils.js'

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
  recursivelyDrawNodes(root, canvasElement, 0.5, horizontalConfig)
}
  
  //Algo: 
  // 1) Find root node coord.
  // 2) Draw root circle
  // 3) Recursively draw left and right nodes
  // 4) connect edges of root with left and right 
function recursivelyDrawNodes (root, canvasElement, currentLevel, horizontalConfig) {
  const { xStart, xEnd } = horizontalConfig
  // Node coord.
  const xPos = (xStart + xEnd) / 2
  const yPos = currentLevel * DEFAULT_CONFIG.nodeHeightSpacing
  
  drawNode(root.value, canvasElement, xPos, yPos)

  if(root.left !== null){
    const horizontalConfig = { xStart , xEnd: xPos }
    const yLeftEnd = ((currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius 
    const xLeftEnd = (xStart + xPos) / 2
    recursivelyDrawNodes(root.left, canvasElement, currentLevel + 1, horizontalConfig)
    connectEdges(canvasElement, {xStart: xPos, xEnd: xLeftEnd}, { yStart: yPos + DEFAULT_CONFIG.radius, yEnd: yLeftEnd  })
    
  }
  
  if(root.right !== null){
    const horizontalConfig = { xStart: xPos, xEnd }
    recursivelyDrawNodes(root.right, canvasElement, currentLevel + 1, horizontalConfig)
    const xRightEnd = (xPos + xEnd) / 2
    const yLeftEnd = ((currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius 
    connectEdges(canvasElement, {xStart: xPos, xEnd: xRightEnd}, { yStart: yPos + DEFAULT_CONFIG.radius, yEnd: yLeftEnd  })
  }
}

const root = new BinaryTreeNode(10)

const node2 = new BinaryTreeNode(20)
root.setLeft(node2)

const node3 = new BinaryTreeNode(30)
root.setRight(node3)

const node4  = new BinaryTreeNode(40)
node2.setLeft(node4) 

const node5  = new BinaryTreeNode(null)
node2.setRight(node5) 

const node6 = new BinaryTreeNode(30)
node3.setLeft(node6)

const node7 = new BinaryTreeNode(30)
node3.setRight(node7)

const node8 = new BinaryTreeNode(90)
node4.setLeft(node8)

const node9 = new BinaryTreeNode(80)
node4.setRight(node9)


drawBinaryTree(root, canvas)
console.log(root)