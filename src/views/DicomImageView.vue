<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DicomViewer from '@/components/DicomViewer.vue'
import ViewerButtonGroup from '@/components/ViewerButtonGroup.vue'
import { renderingEngineId, dicomViewportId, toolGroupId } from '@/config/cornerstoneConfig'
</script>
<template>
  <h2>Dicom Image Viewer</h2>
  <p>Left mouse: Widow level | Right mouse: Zoom | Scroll: Change slice</p>
  <DicomViewer />
  <ViewerButtonGroup
    :renderingEngineId="renderingEngineId"
    :viewportId="dicomViewportId"
    :toolGroupId="toolGroupId"
  />
  <p>(See console logs for metadata and button actions)</p>
  <div>
    <RouterLink to="/">Back</RouterLink>
  </div>
</template>
<style scoped>
h2,
div,
p {
  text-align: center;
}
</style>
