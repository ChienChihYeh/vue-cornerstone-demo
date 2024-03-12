<script setup lang="ts">
import { ref, onMounted, watchEffect, onUnmounted } from 'vue'
import type { IStackViewport } from '@cornerstonejs/core/dist/types/types'
import {
  enableElement,
  disableElement,
  initViewportRender,
  resetCamera,
  checkZoom,
  handleViewerWheel,
  getImageData
} from '@/utils/viewportHelpers'
import { dicomImageIds } from '@/utils/dicomImagePath'
import { renderingEngineId, dicomViewportId, toolGroupId } from '@/config/cornerstoneConfig'
import { addViewportToToolGroup } from '@/utils/toolGroup'
import { useEventListener } from '@/hooks/event'
import { useSlice } from '@/hooks/slice'

const el = ref()
const viewport = ref<IStackViewport>()
const lastIndex = dicomImageIds.length - 1

const { slice, setSlice } = useSlice(0)
useEventListener(window, 'mouseup', () => {
  checkZoom(viewport.value)
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
  <p><button @click="resetCamera(viewport)">Reset Transform</button></p>
  <p>Demo slice {{ slice + 1 }}: {{ dicomImageIds[slice] }}</p>
</template>
<style scoped>
div {
  margin: auto;
}
div,
p {
  text-align: center;
}
</style>
