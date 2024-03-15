import type { IStackViewport } from '@cornerstonejs/core/dist/types/types'
import {
  getRenderingEngine,
  getViewport,
  getEnabledElement,
  resetCamera
} from '@/utils/viewportHelpers'
import { getToolGroup, toggleTool } from '@/utils/toolGroup'

type Id = string | undefined

export function getViewerButtonHandler(renderingEngineId: Id, viewportId: Id, toolGroupId?: Id) {
  function handleResetCamera() {
    if (!renderingEngineId || !viewportId) return
    resetCamera(getViewport(renderingEngineId, viewportId) as IStackViewport)
    console.log('reset camera')
  }

  function handleGetRenderingEngine() {
    if (!renderingEngineId) return
    //do whatever you like with the rendering engine
    console.log(getRenderingEngine(renderingEngineId))
  }

  function handdleGetViewport() {
    if (!renderingEngineId || !viewportId) return
    //do whatever you like with the viewport
    console.log(getViewport(renderingEngineId, viewportId))
  }

  function handleGetToopGroup() {
    if (!toolGroupId) return
    //do whatever you like with the tool group
    console.log(getToolGroup(toolGroupId))
  }

  function handleGetEnabledElement() {
    if (!renderingEngineId || !viewportId) return
    //do whatever you like with the enabled element
    console.log(getEnabledElement(renderingEngineId, viewportId))
  }

  function handdleToggleTool(currentTool: string, newTool: string) {
    toggleTool(currentTool, newTool)
    console.log('Toggle to ' + newTool + ' tool')
  }

  return {
    handleResetCamera,
    handleGetRenderingEngine,
    handdleGetViewport,
    handleGetToopGroup,
    handleGetEnabledElement,
    handdleToggleTool
  }
}
