import {DEFAULT_CONFIG, connectEdges, drawNode, getRequiredHeightandWidth, treeConstructor} from './treeUtils.js'

const canvas = document.querySelector('canvas')

const applyBtn = document.querySelector('.apply-button')
const resetBtn = document.querySelector('.reset-button')
const textarea = document.querySelector('.input');

textarea.addEventListener('input', function () {
  this.value = validateInput(this.value);
});

applyBtn.addEventListener('click', ()=>{
  if(textarea.value === '' || textarea.value.trim() === ',') {
    alert('Please enter the values it accepts number and null values')
    return
  }
  init(textarea.value)
})

resetBtn.addEventListener('click', ()=>{
  textarea.value = ''
  clearCanvas()
})

function init (value){
  clearCanvas()
  const root = treeConstructor(value)
  drawBinaryTree(root,canvas)
}

function validateInput(input) {
  // Use a regular expression to allow only the string "null", numbers, and commas
  const sanitizedInput = input.replace(/[^0-9,null,]|,{2,}/g, '');

  // Replace consecutive commas with a single comma
  return sanitizedInput.replace(/,+/g, ',');
}

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

function clearCanvas(){
  const context = canvas.getContext('2d')
  context.clearRect(0,0,canvas.width,canvas.height)
}
window.addEventListener('resize', ()=>init(textarea.value))