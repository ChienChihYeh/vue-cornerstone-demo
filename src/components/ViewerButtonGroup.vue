<script setup lang="ts">
import CustomButton from './CustomButton.vue'
import { getViewerButtonHandler } from '@/utils/viewerButtonHandler'

const { renderingEngineId, viewportId, toolGroupId } = defineProps({
  renderingEngineId: String,
  viewportId: String,
  toolGroupId: String
})

const {
  handleResetCamera,
  handleGetRenderingEngine,
  handdleGetViewport,
  handleGetToopGroup,
  handleGetEnabledElement
} = getViewerButtonHandler(renderingEngineId, viewportId, toolGroupId)
</script>

<template>
  <div>
    <CustomButton @click="handleResetCamera">Reset Camera</CustomButton>
    <CustomButton @click="handleGetRenderingEngine">Get Rendering Engine</CustomButton>
    <CustomButton @click="handdleGetViewport">Get Viewport</CustomButton>
    <CustomButton @click="handleGetToopGroup">Get ToolGroup</CustomButton>
    <CustomButton @click="handleGetEnabledElement">Get Enabled Element</CustomButton>
  </div>
</template>
<style scoped>
button {
  margin: 0 4px;
}
</style>
