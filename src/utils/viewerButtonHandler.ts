import type { IStackViewport } from '@cornerstonejs/core/dist/types/types'
import {
  getRenderingEngine,
  getViewport,
  getEnabledElement,
  resetCamera
} from '@/utils/viewportHelpers'
import { getToolGroup, toggleTool } from '@/utils/toolGroup'

type Id = string | undefined

function isAllIdsValid(...args: Id[]) {
  return args.every((arg) => typeof arg === 'string')
}

export function getViewerButtonHandler(renderingEngineId: Id, viewportId: Id, toolGroupId: Id) {
  function handleResetCamera() {
    const args = [renderingEngineId, viewportId]
    if (!isAllIdsValid(...args)) return
    resetCamera(getViewport(...(args as [string, string])) as IStackViewport)
    console.log('reset camera')
  }

  function handleGetRenderingEngine() {
    const args = [renderingEngineId]
    if (!isAllIdsValid(...args)) return
    //do whatever you like with the rendering engine
    console.log(getRenderingEngine(...(args as [string])))
  }

  function handdleGetViewport() {
    const args = [renderingEngineId, viewportId]
    if (!isAllIdsValid(...args)) return
    //do whatever you like with the viewport
    console.log(getViewport(...(args as [string, string])))
  }

  function handleGetToopGroup() {
    const args = [toolGroupId]
    if (!isAllIdsValid(...args)) return
    //do whatever you like with the tool group
    console.log(getToolGroup(...(args as [string])))
  }

  function handleGetEnabledElement() {
    const args = [renderingEngineId, viewportId]
    if (!isAllIdsValid(...args)) return
    //do whatever you like with the enabled element
    console.log(getEnabledElement(...(args as [string, string])))
  }

  function handdleToggleTool(currentTool: string, newTool: string) {
    toggleTool(currentTool, newTool)
    console.log('Activate ' + newTool + ' tool')
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
