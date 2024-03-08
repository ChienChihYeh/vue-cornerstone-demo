import {
  WindowLevelTool,
  ZoomTool,
  ToolGroupManager,
  Enums as csToolsEnums
} from '@cornerstonejs/tools'

export function initializeToolGroup(toolGroupId: string) {
  const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)
  if (toolGroup) {
    toolGroup.addTool(ZoomTool.toolName)
    toolGroup.addTool(WindowLevelTool.toolName)

    toolGroup.setToolActive(WindowLevelTool.toolName, {
      bindings: [
        {
          mouseButton: csToolsEnums.MouseBindings.Primary // Left Click
        }
      ]
    })
    toolGroup.setToolActive(ZoomTool.toolName, {
      bindings: [
        {
          mouseButton: csToolsEnums.MouseBindings.Secondary // Right Click
        }
      ]
    })
  }
}

export function addViewportToToolGroup(viewportId: string, toolGroupId: string) {
  const toolGroup = ToolGroupManager.getToolGroup(toolGroupId)
  toolGroup?.addViewport(viewportId)
}
