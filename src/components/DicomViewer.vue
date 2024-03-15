<script setup lang="ts">
import { ref, onMounted, watchEffect, onUnmounted } from 'vue'
import * as cornerstoneTools from '@cornerstonejs/tools'
import * as cornerstone from '@cornerstonejs/core'
import type { IStackViewport } from '@cornerstonejs/core/dist/types/types'
import {
  enableElement,
  disableElement,
  initViewportRender,
  checkZoom,
  handleViewerWheel,
  getImageData
} from '@/utils/viewportHelpers'
import { dicomImageIds } from '@/utils/dicomImagePath'
import { renderingEngineId, dicomViewportId, toolGroupId } from '@/config/cornerstoneConfig'
import { addViewportToToolGroup } from '@/utils/toolGroup'
import { useEventListener } from '@/hooks/event'
import { useSlice } from '@/hooks/slice'
import ViewerButtonGroup from './ViewerButtonGroup.vue'

const { Enums } = cornerstone
const { Enums: ToolEnums } = cornerstoneTools

const count = ref(0)
const el = ref()
const viewport = ref<IStackViewport>()
const lastIndex = dicomImageIds.length - 1

const { slice, setSlice } = useSlice(0)

useEventListener(el, ToolEnums.Events.MOUSE_UP, () => {
  checkZoom(viewport.value)
})

useEventListener(el, Enums.Events.IMAGE_RENDERED, () => {
  count.value++
})

watchEffect(() => {
  if (dicomImageIds.length > 0 && viewport.value) {
    initViewportRender(dicomImageIds, viewport.value).then(() => {
      if (viewport.value) console.log(getImageData(viewport.value))
      // Parse DICOM image metadata
    })
  }
})

onMounted(() => {
  enableElement({
    renderingEngineId,
    element: el.value,
    viewportId: dicomViewportId,
    viewport
  })
  addViewportToToolGroup(dicomViewportId, toolGroupId)
})
onUnmounted(() => {
  disableElement({ renderingEngineId, viewportId: dicomViewportId })
})
</script>
<template>
  <div
    ref="el"
    class="viewer"
    @contextmenu="$event.preventDefault()"
    @wheel="(e) => handleViewerWheel(e, viewport, lastIndex, setSlice)"
  ></div>
  <p>Slice {{ slice + 1 }}: {{ dicomImageIds[slice] }}</p>
  <p>Cornerstone rendered {{ count }} time(s)</p>
  <ViewerButtonGroup
    :renderingEngineId="renderingEngineId"
    :viewportId="dicomViewportId"
    :toolGroupId="toolGroupId"
  />
  <p>(See console logs for metadata and button actions)</p>
</template>
<style scoped>
div {
  margin: auto;
}
div,
p {
  text-align: center;
}
button {
  margin-top: 4px;
}
</style>
