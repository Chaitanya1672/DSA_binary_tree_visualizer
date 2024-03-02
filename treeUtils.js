import {BinaryTreeNode} from "./BinaryTreeNode.js"

export const DEFAULT_CONFIG = {
  radius: 20,
  nodeWidthSpacing: 25, 
  nodeHeightSpacing: 100,
  fontSize: 14
}

export function getRequiredHeightandWidth (root) {
  const heightOfTree = root.getHeight()
  const maxLeafNodes = Math.pow(2, heightOfTree)
  
  const requiredCanvasHeight = DEFAULT_CONFIG.nodeHeightSpacing * heightOfTree
  const requiredCanvasWidth = DEFAULT_CONFIG.nodeWidthSpacing * maxLeafNodes

  return {
    requiredCanvasHeight,
    requiredCanvasWidth
  }
}

export function drawNode( value, canvasElement, x, y){
  const context = canvasElement.getContext('2d')
  
  //draw circle
  context.beginPath()
  context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false)
  context.fillStyle = 'lightsalmon'
  context.fill()
  
  //draw border
  context.beginPath()
  context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false)
  context.strokeStyle = 'brown'
  context.stroke()
  
  // fill text
  context.beginPath()
  context.font = `${DEFAULT_CONFIG.fontSize}px serif`;
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText(value, x, y + DEFAULT_CONFIG.fontSize / 2);
}

export function connectEdges(canvasElement, xCoordinates, yCoordinates) {
  console.log({canvasElement, xCoordinates, yCoordinates})
  const { xStart, xEnd} = xCoordinates
  const { yStart, yEnd } = yCoordinates
  
  const xHalf = (xStart + xEnd) / 2;
  const yHalf = (yStart + yEnd ) / 2
  
  const cpoint1 = { x: xHalf, y: yHalf}
  const cpoint2 = { x: xEnd, y: yHalf}
  // Draw curve
  const context = canvasElement.getContext('2d')
  context.beginPath()
  context.strokeStyle = 'brown'
  context.moveTo(xStart, yStart)
  context.bezierCurveTo(cpoint1.x, cpoint1.y, cpoint2.x, cpoint2.y, xEnd, yEnd)
  
  // context.lineTo(xEnd, yEnd)
  context.stroke()
}

export function treeConstructor(input){
  input = parseInput(input)
  
  const queue = []
  let idx = 0
  const root = new BinaryTreeNode(input[idx])
  idx++
  queue.push(root)
  
  while(queue.length && idx < input.length){
    const node = queue.shift()
    if(idx < input.length) {
      if(input[idx] !== null){
        const leftNode = new BinaryTreeNode(input[idx])
        node.setLeft(leftNode)
        queue.push(leftNode)
      }
      idx++
    }
    if(idx < input.length) {
      if(input[idx] !== null){
        const rightNode = new BinaryTreeNode(input[idx])
        node.setRight(rightNode)
        queue.push(rightNode)
      }
      idx++
    }
  }
  return root
}

export function parseInput(input) {
  // let parsedInput = ''
  // for(let i = 0; i < input.length; i++){
  //   const ch = input.charAt(i)
  //   if(ch !== " ") parsedInput += ch
  // }
  return input.split(',')
    .map(ele => {
      if(ele === 'null') return null
      else if(ele !== '') return ele //parseInt(ele)
    })
    .filter(ele=>ele !== undefined)
}