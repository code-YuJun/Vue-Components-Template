# Vue 组件库
## 技术选型
- Vue3
- TypeScript
- SCSS
- ESLint
- Prettier
## package.json
- sideEffects
1. 告诉打包工具哪些文件有全局副作用，不能被 tree-shaking 删除。
2. 如果一个模块 没有副作用，并且它的导出没有被使用，打包工具就可以安全地把它从最终产物中删掉（tree-shaking）。
3. 如果一个模块 有副作用，即使它的导出没有被使用，也不能删掉，否则会破坏功能。
"sideEffects": false 这个包中所有文件都没有副作用。
"sideEffects": true 包中存在有副作用的文件，但不确定具体是哪些。打包工具会保留所有文件，无法对该包进行完全的 tree-shaking。
"sideEffects": [
    "**/*.css",
    "**/*.scss",
    "**/*.vue"
] 只有匹配这些路径的文件有副作用，其他文件都可以安全地 tree-shaking。

- exports
作用：声明 npm 包对外暴露的入口路径和文件，让 Node.js 和打包工具（webpack、Vite 等）知道在不同条件下应该加载哪个文件。
1. 主入口 .
".": { ... } 表示当用户 import '你的包名' 或 require('你的包名') 时的入口。
"types": "./types/index.d.ts" TypeScript 类型声明文件路径（供 TS 解析类型）。
"import": "./dist/es/index.js" 当用户用 ES Module 方式导入时（import 语法），使用 ES 模块版本。
"require": "./dist/umd/index.js" 当用户用 CommonJS 方式导入时（require()），使用 UMD 版本。
2. 子路径导出
"./es/*": "./dist/es/*"
import Button from '你的包名/es/button'  会映射到： ./dist/es/button

"./styles/*": "./dist/styles/*"
import '你的包名/styles/button.css' 会映射到：./dist/styles/button.css

"./types/*": "./types/components/*/types.d.ts"
import type { ButtonProps } from '你的包名/types/button'  会映射到：  ./types/components/button/types.d.ts

- main、module、browser、unpkg、types
告诉 Node.js、浏览器和各种打包工具：包的入口文件在哪里。





























