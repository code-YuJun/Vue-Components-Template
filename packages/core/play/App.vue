<script setup lang="ts">
import { CpnA, CpnB } from '../src/index'
function handleStart() {
  console.log('start');
}
function handleFinish() {
  console.log('finish');
}
function handleEnd() {
  console.log('end');
}
</script>

<template>
  <div class="examples-container">
    <h1>Vue 组件库演练场</h1>

    <section class="component-section">
      <CpnA />
    </section>

    <section class="component-section">
      <CpnB propsA="自定义B" :propsB="666" propsC="bbb" @start="handleStart" @finish="handleFinish" @end="handleEnd" />
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