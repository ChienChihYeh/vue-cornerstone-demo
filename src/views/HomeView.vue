<script setup lang="ts">
import { RouterLink } from 'vue-router'
import VueIcon from '@/components/icons/VueIcon.vue'
import CornerstoneIcon from '@/components/icons/CornerstoneIcon.vue'
</script>
<template>
  <main>
    <div class="logo-container">
      <VueIcon class="vue-logo" />
      <CornerstoneIcon class="cornerstone-logo" />
    </div>
    <h1>Vue-Cornerstone3D Intergration Demo</h1>
    <p>{{ 'Note: This demo is currently optimized for desktop' }}</p>
    <div>
      <RouterLink to="/dicom-image">Dicom</RouterLink> |
      <RouterLink to="/web-image">Web</RouterLink>
    </div>
  </main>
</template>
<style scoped lang="scss">
.logo-container {
  margin-bottom: 16px;
  svg {
    margin: 0 24px;
  }
}

.vue-logo {
  height: 145px;
}

.cornerstone-logo {
  height: 150px;
}

div,
p {
  text-align: center;
}
</style>
