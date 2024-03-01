export const DEFAULT_CONFIG = {
  radius: 20,
  nodeWidthSpacing: 25, 
  nodeHeightSpacing: 100,
  fontSize: 10
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