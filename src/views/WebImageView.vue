<script setup lang="ts">
import { RouterLink } from 'vue-router'
import WebViewer from '@/components/WebViewer.vue'
</script>
<template>
  <h2>Web Image Viewer</h2>
  <p>Left mouse: Widow level | Right mouse: Zoom</p>
  <WebViewer />
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
