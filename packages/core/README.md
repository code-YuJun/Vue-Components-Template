# 🚀 vue3-components-template

## 组件库源代码相关
```bash
# 安装所有目录依赖
pnpm i
# 打包组件库
pnpm run build
# 发布组件库
pnpm run publish:core
# 发布组件库（beta 版本）
pnpm run publish:core:beta
# 本地启动
pnpm run dev:core
# 自动化发布 Vue 组件库，使用 Changesets 工具自动处理版本号管理、生成变更日志，将包发布到 npm  registry（或配置的其他包管理平台）
pnpm run ci:publish
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