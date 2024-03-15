import { toolGroupId } from '@/config/cornerstoneConfig'
import {
  WindowLevelTool,
  ZoomTool,
  PanTool,
  ToolGroupManager,
  Enums as csToolsEnums
} from '@cornerstonejs/tools'

export function initializeToolGroup(toolGroupId: string) {
  const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)
  if (toolGroup) {
    toolGroup.addTool(ZoomTool.toolName)
    toolGroup.addTool(WindowLevelTool.toolName)
    toolGroup.addTool(PanTool.toolName)

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

export function getToolGroup(toolGroupId: string) {
  return ToolGroupManager.getToolGroup(toolGroupId)
}

export function toggleTool(currentTool: string, newTool: string) {
  const toolGroup = getToolGroup(toolGroupId)
  toolGroup?.setToolDisabled(currentTool)
  toolGroup?.setToolActive(newTool, {
    bindings: [
      {
        mouseButton: csToolsEnums.MouseBindings.Primary // Left Click
      }
    ]
  })
}
