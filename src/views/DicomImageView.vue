<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DicomViewer from '@/components/DicomViewer.vue'
</script>
<template>
  <h2>Dicom Image Viewer</h2>
  <p>Left mouse: Widow level | Right mouse: Zoom | Scroll: Change slice</p>
  <DicomViewer />
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
