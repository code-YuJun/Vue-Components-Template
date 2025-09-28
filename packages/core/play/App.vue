<script setup lang="ts">
import { CpnA, CpnB } from '../src/index'
</script>

<template>
  <div class="examples-container">
    <h1>Vue 组件库预览</h1>
    
    <section class="component-section">
      <h2>CpnA 组件</h2>
      <CpnA />
    </section>
    
    <section class="component-section">
      <h2>CpnB 组件</h2>
      <CpnB />
    </section>
  </div>
</template>

<style scoped>
.examples-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.component-section {
  margin: 40px 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}
</style>