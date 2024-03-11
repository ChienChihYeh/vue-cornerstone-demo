<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <main>
    <h1>Vue-Cornerstone3D Intergration Demo</h1>
    <div>
      <RouterLink to="/dicom-image">Dicom</RouterLink> |
      <RouterLink to="/web-image">Web</RouterLink>
    </div>
  </main>
</template>
<style scoped>
h1 {
  margin-bottom: 16px;
}
div {
  text-align: center;
}
</style>
