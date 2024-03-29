<script setup lang="ts">
import { ref, onMounted, watchEffect, onUnmounted } from 'vue'
import * as cornerstone from '@cornerstonejs/core'
import * as cornerstoneTools from '@cornerstonejs/tools'
import type { IStackViewport } from '@cornerstonejs/core/dist/types/types'
import { registerWebImageLoader } from '@/utils/webImageLoader'
import { renderingEngineId, webImageViewportId, toolGroupId } from '@/configs/cornerstoneConfig'
import { addViewportToToolGroup } from '@/utils/toolGroup'
import { webImageIds } from '@/utils/webImagePath'
import {
  enableElement,
  disableElement,
  initViewportRender,
  checkZoom
} from '@/utils/viewportHelpers'
import { hardcodedMetaDataProvider } from '@/utils/hardcodedMetaDataProvider'
import { useEventListener } from '@/hooks/event'

const { imageLoader, metaData, Enums } = cornerstone
const { Enums: ToolEnums } = cornerstoneTools
const count = ref(0)
const el = ref()
const viewport = ref<IStackViewport>()

watchEffect(() => {
  if (webImageIds.length > 0 && viewport.value) {
    initViewportRender(webImageIds, viewport.value)
  }
})

useEventListener(el, ToolEnums.Events.MOUSE_UP, () => {
  checkZoom(viewport.value)
})

useEventListener(el, Enums.Events.IMAGE_RENDERED, () => {
  count.value++
})

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
  <p>Cornerstone rendered {{ count }} time(s)</p>
</template>
<style scoped>
div {
  margin: auto;
}
p {
  text-align: center;
}
button {
  margin: 4px 0;
}
</style>
@/configs/cornerstoneConfig
