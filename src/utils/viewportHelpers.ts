import type { Ref } from 'vue'
import type { IStackViewport } from '@cornerstonejs/core/dist/types/types'
import * as cornerstone from '@cornerstonejs/core'

const { ViewportType } = cornerstone.Enums

//https://www.cornerstonejs.org/docs/tutorials/basic-stack
// https://www.cornerstonejs.org/docs/concepts/cornerstone-core/viewports/
// https://www.cornerstonejs.org/live-examples/stackposition
export function enableElement({
  renderingEngineId,
  element,
  viewportId,
  viewport
}: {
  renderingEngineId: string
  element: HTMLDivElement
  viewportId: string
  viewport: Ref<cornerstone.Types.IStackViewport | undefined>
}) {
  const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId)
  renderingEngine?.enableElement({
    viewportId,
    element: element,
    type: ViewportType.STACK,
    defaultOptions: {
      displayArea: { imageArea: [1, 1] }
    }
  })
  viewport.value = renderingEngine?.getViewport(viewportId) as IStackViewport
}

export function disableElement({
  renderingEngineId,
  viewportId
}: {
  renderingEngineId: string
  viewportId: string
}) {
  const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId)
  renderingEngine?.disableElement(viewportId)
}

export async function initViewportRender(imageIds: string[], viewport: IStackViewport) {
  if (imageIds.length > 0 && viewport) {
    await viewport.setStack(imageIds, 0)
    viewport.render()
  }
}

export function getImageData(viewport: IStackViewport) {
  return viewport.getImageDataMetadata(viewport.getCornerstoneImage())
}

export function resetCamera(viewport: IStackViewport | undefined) {
  viewport?.resetCamera()
  viewport?.render()
}

export function checkZoom(viewport: IStackViewport | undefined, minScale?: number) {
  if (!viewport) return
  const min = minScale || 1
  if (viewport?.getZoom() < min) {
    resetCamera(viewport)
  }
}

export function handleViewerWheel(
  event: WheelEvent,
  viewport: IStackViewport | undefined,
  maxIndex: number,
  setSlice: (index: number) => void
) {
  event.preventDefault()
  if (!viewport) return
  const index = viewport.getCurrentImageIdIndex()
  if (event.deltaY > 0 && index < maxIndex) {
    viewport.setImageIdIndex(index + 1)
    setSlice(index + 1)
  } else if (event.deltaY < 0 && index > 0) {
    viewport.setImageIdIndex(index - 1)
    setSlice(index - 1)
  }
}

export function getRenderingEngine(renderingEngineId: string) {
  return cornerstone.getRenderingEngine(renderingEngineId)
}

export function getViewport(renderingEngineId: string, viewportId: string) {
  return getRenderingEngine(renderingEngineId)?.getViewport(viewportId)
}

export function getEnabledElement(renderingEngineId: string, viewportId: string) {
  return cornerstone.getEnabledElement(getViewport(renderingEngineId, viewportId)?.element)
}
