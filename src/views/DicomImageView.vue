<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DicomViewer from '@/components/DicomViewer.vue'
import ControlLayout from '@/components/ControlLayout.vue'
</script>
<template>
  <h2>Dicom Image Viewer</h2>
  <ControlLayout />
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
