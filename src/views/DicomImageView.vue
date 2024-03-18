<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DicomViewer from '@/components/DicomViewer.vue'
import ViewerButtonGroup from '@/components/ViewerButtonGroup.vue'
import { renderingEngineId, dicomViewportId, toolGroupId } from '@/configs/cornerstoneConfig'
</script>
<template>
  <h2>DICOM Image Viewer</h2>
  <p>Left mouse: Widow level/Pan | Right mouse: Zoom | Scroll: Change slice</p>
  <DicomViewer />
  <ViewerButtonGroup
    :renderingEngineId="renderingEngineId"
    :viewportId="dicomViewportId"
    :toolGroupId="toolGroupId"
  />
  <p>(See console logs for DICOM tags, metadata and button actions)</p>
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
@/configs/cornerstoneConfig
