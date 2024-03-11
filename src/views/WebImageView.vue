<script setup lang="ts">
import { RouterLink } from 'vue-router'
import WebViewer from '@/components/WebViewer.vue'
</script>
<template>
  <h2>Web Image Viewer</h2>
  <WebViewer />
  <div>
    <RouterLink to="/">Back</RouterLink>
  </div>
</template>
<style scoped>
div {
  text-align: center;
}
</style>
