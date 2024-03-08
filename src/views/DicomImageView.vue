<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { dicomImageIds } from '@/utils/dicomImagePath'

console.log(dicomImageIds)
</script>
<template>
  <h2>Dicom Image Viewer</h2>
  <div></div>
  <div>
    <RouterLink to="/">Back</RouterLink>
  </div>
</template>
<style scoped>
div {
  text-align: center;
}
</style>
