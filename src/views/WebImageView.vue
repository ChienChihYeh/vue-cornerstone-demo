<script setup lang="ts">
import { RouterLink } from 'vue-router'
import WebViewer from '@/components/WebViewer.vue'
import { renderingEngineId, webImageViewportId, toolGroupId } from '@/config/cornerstoneConfig'
import ViewerButtonGroup from '@/components/ViewerButtonGroup.vue'
</script>
<template>
  <h2>Web Image Viewer</h2>
  <p>Left mouse: Widow level | Right mouse: Zoom</p>
  <WebViewer />
  <ViewerButtonGroup
    :renderingEngineId="renderingEngineId"
    :viewportId="webImageViewportId"
    :toolGroupId="toolGroupId"
  />
  <p>(See console logs for button actions)</p>
  <div>
    <RouterLink to="/">Back</RouterLink>
  </div>
</template>
<style scoped>
div,
h2,
p {
  text-align: center;
}
</style>
