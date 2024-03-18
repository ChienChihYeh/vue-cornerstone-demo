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
    <h1>Vue-Cornerstone3D Integration Demo</h1>
    <p>
      The demo is kept simple for clarification. Please refer to the GitHub repository for
      additional information.
    </p>
    <p>Note: This demo is currently optimized for desktop.</p>
    <div>
      <RouterLink to="/dicom-image">DICOM Image</RouterLink> |
      <RouterLink to="/web-image">Web Image</RouterLink> |
      <a href="https://github.com/ChienChihYeh/vue-cornerstone-demo" target="_blank">GitHub Repo</a>
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
h1,
p {
  text-align: center;
}
</style>
