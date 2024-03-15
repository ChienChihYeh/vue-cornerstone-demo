import * as cornerstone from '@cornerstonejs/core'
import * as cornerstoneTools from '@cornerstonejs/tools'
import dicomParser from 'dicom-parser'
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader'
import { renderingEngineId, toolGroupId } from '@/config/cornerstoneConfig'
import { initializeToolGroup } from './toolGroup'

export async function initializeCornerstone() {
  await cornerstone.init()
  cornerstoneTools.init()
  cornerstoneDICOMImageLoader.external.cornerstone = cornerstone
  cornerstoneDICOMImageLoader.external.dicomParser = dicomParser
  new cornerstone.RenderingEngine(renderingEngineId)

  const { WindowLevelTool, ZoomTool, PanTool } = cornerstoneTools
  cornerstoneTools.addTool(WindowLevelTool)
  cornerstoneTools.addTool(ZoomTool)
  cornerstoneTools.addTool(PanTool)
  initializeToolGroup(toolGroupId)
}
