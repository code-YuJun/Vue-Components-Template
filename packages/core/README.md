# 🚀 vue3-components-template

## 组件库源代码启动
```bash
pnpm i
# 启动项目
pnpm run dev:core
```

## 📦 安装
**使用该组件库之前，请确保已经安装了 Vue3 项目并引入了 ElementPlusX 组件库。**
```bash
# NPM
npm install vue3-components-template

# PNPM（推荐）
pnpm install vue3-components-template

# Yarn
yarn install vue3-components-template
```

## 📚 使用案例
1. **按需引入**
```html
<script>
import { CpnA, CpnB } from 'vue3-components-template';
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
  <div style="display: flex; flex-direction: column; height: 230px; justify-content: space-between;">
    <CpnA />
    <CpnB propsA="自定义B" :propsB="666" propsC="bbb" @start="handleStart" @finish="handleFinish" @end="handleEnd" />
  </div>
</template>
```
2. **全局引入**

```ts
// main.ts
import { createApp } from 'vue'
import Vue3ComponentsTemplate from 'vue3-components-template';
import App from './App.vue'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(Vue3ComponentsTemplate);
app.mount('#app');
```