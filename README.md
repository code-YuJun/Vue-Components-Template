# Vue 组件库模板

## package.json 
  "type": "module" 默认行为(Node.js 会把 .js 文件当作 CommonJS 模块处理)，开启 "type": "module" 后，可以使用 import / export 语法。
  "private": true  禁止把这个包发布到 npm 仓库。
  "packageManager": "pnpm@10.12.4" pnpm 自身会检查当前版本是否符合要求，如果不符合会报错并提示升级。配合 corepack（Node.js 自带的包管理器管理工具）可以自动切换到指定版本。
  "engines"：主要用于声明 Node.js 版本或包管理器版本要求,但它不会自动切换版本
  











