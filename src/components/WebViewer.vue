<script setup lang="ts">
import { ref, onMounted, watchEffect, onUnmounted } from 'vue'
import * as cornerstone from '@cornerstonejs/core'
import type { IStackViewport } from '@cornerstonejs/core/dist/types/types'
import { registerWebImageLoader } from '@/utils/webImageLoader'
import { renderingEngineId, webImageViewportId, toolGroupId } from '@/config/cornerstoneConfig'
import { addViewportToToolGroup } from '@/utils/toolGroup'
import { webImageIds } from '@/utils/webImagePath'
import {
  enableElement,
  disableElement,
  initViewportRender,
  checkZoom,
  resetCamera
} from '@/utils/viewportHelpers'
import { hardcodedMetaDataProvider } from '@/utils/hardcodedMetaDataProvider'
import { useEventListener } from '@/hooks/event'

const { imageLoader, metaData } = cornerstone
const el = ref()
const viewport = ref<IStackViewport>()

watchEffect(() => {
  if (webImageIds.length > 0 && viewport.value) {
    initViewportRender(webImageIds, viewport.value)
  }
})

useEventListener(window, 'mouseup', () => {
  checkZoom(viewport.value)
})

console.log(webImageIds)

onMounted(() => {
  registerWebImageLoader(imageLoader)
  enableElement({ renderingEngineId, element: el.value, viewportId: webImageViewportId, viewport })
  metaData.addProvider((type, imageId) => {
    return hardcodedMetaDataProvider(type, imageId, webImageIds)
  }, 1000)
  addViewportToToolGroup(webImageViewportId, toolGroupId)
})
onUnmounted(() => {
  disableElement({ renderingEngineId, viewportId: webImageViewportId })
})
</script>
<template>
  <div ref="el" class="viewer" @contextmenu="$event.preventDefault()"></div>
  <p><button @click="resetCamera(viewport)">Reset Transform</button></p>
</template>
<style scoped>
p {
  text-align: center;
}
</style>
