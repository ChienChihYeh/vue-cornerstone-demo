<script setup lang="ts">
import { RouterView } from 'vue-router'
import { initializeCornerstone } from './utils/initializeCornerstone'

initializeCornerstone()
</script>
<template>
  <RouterView />
</template>
<style scoped></style>
