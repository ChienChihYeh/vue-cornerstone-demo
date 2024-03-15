<script setup lang="ts">
import { ref } from 'vue'
import CustomButton from './CustomButton.vue'
import { getViewerButtonHandler } from '@/utils/viewerButtonHandler'
import { WindowLevelTool, PanTool } from '@cornerstonejs/tools'

const { renderingEngineId, viewportId, toolGroupId } = defineProps({
  renderingEngineId: String,
  viewportId: String,
  toolGroupId: String
})

const currentToolName = ref(WindowLevelTool.toolName)

function getNewToolName(toolName: string) {
  return toolName === WindowLevelTool.toolName ? PanTool.toolName : WindowLevelTool.toolName
}

const {
  handleResetCamera,
  handleGetRenderingEngine,
  handdleGetViewport,
  handleGetToopGroup,
  handleGetEnabledElement,
  handdleToggleTool
} = getViewerButtonHandler(renderingEngineId, viewportId, toolGroupId)
</script>

<template>
  <div>
    <CustomButton
      @click="
        () => {
          handdleToggleTool(currentToolName, getNewToolName(currentToolName))
          currentToolName = getNewToolName(currentToolName)
        }
      "
      >Toggle:{{ currentToolName }}</CustomButton
    >
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
