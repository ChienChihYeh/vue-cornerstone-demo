<template>
  <button><slot></slot></button>
</template>
<style scoped lang="scss">
button {
  border: none;
  padding: 8px;
  border-radius: 4px;
  background-color: #777;
  color: #f0f0f0;
  transition: 0.3s;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #666;
  }
}
</style>
