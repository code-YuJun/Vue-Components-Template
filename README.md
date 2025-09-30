# Vue 组件库

## package/core
### package.json
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

## package.json 
- "type": "module" 默认行为(Node.js 会把 .js 文件当作 CommonJS 模块处理)，开启 "type": "module" 后，可以使用 import / export 语法。
- "private": true  禁止把这个包发布到 npm 仓库。
- "packageManager": "pnpm@10.12.4" pnpm 自身会检查当前版本是否符合要求，如果不符合会报错并提示升级。配合 corepack（Node.js 自带的包管理器管理工具）可以自动切换到指定版本。
- "engines"：主要用于声明 Node.js 版本或包管理器版本要求,但它不会自动切换版本
  

## turbo.json
turbo.json 为 Monorepo 项目提供「任务编排规则」，解决以下痛点：
1. 依赖顺序问题：通过 dependsOn: ["^任务名"]，确保上游依赖的任务先执行（如子包先构建，主项目再构建），避免「主项目依赖未构建的子包代码」导致报错。
2. 执行效率问题：通过 inputs/outputs 定义缓存规则，避免输入未变时重复执行任务（如代码未改时，build 直接复用缓存，节省构建时间）。
3. 开发体验问题：通过 persistent: true 维持开发服务进程，通过 tui 界面直观展示任务状态，提升开发效率。

- $schema: 指定 Turbo 配置文件的 JSON Schema 地址，用于 IDE 自动补全、语法校验（确保配置格式正确）。
- ui: 指定 Turbo 执行任务时的终端交互界面（UI）类型，tui 代表「文本用户界面」，会在终端显示任务执行进度、状态等可视化信息。
- tasks: 是配置的核心，用于定义项目中需要 Turbo 管理的任务（如 build、lint 等），每个任务的配置决定了它如何执行、依赖哪些其他任务、是否缓存结果等。
- build： 构建任务
  - dependsOn: ["^build"]	
  定义任务依赖：^build 中的 ^ 代表「所有依赖的子包 / 上游包的 build 任务」。若当前项目依赖 packages/utils 包，执行当前项目的 build 前，会先自动执行 packages/utils 的 build 任务，确保依赖的代码已先构建完成。

  - inputs: ["$TURBO_DEFAULT$", ".env*"]	
  定义任务的「输入源」（即哪些文件变化会触发任务重新执行）：- $TURBO_DEFAULT$：Turbo 内置变量，代表「项目默认的代码源文件」（如 src/、pages/、package.json 等，根据项目类型自动识别）；.env*：额外指定「所有环境变量文件」（如 .env、.env.production），若环境变量变化，也会触发 build 重新执行。

  - outputs: [".next/**", "!.next/cache/**"]	
  定义任务的「输出产物」（即需要缓存的文件 / 目录）：.next/**：Next.js 项目的构建产物目录（如编译后的 JS、CSS、静态资源），Turbo 会缓存该目录，下次执行 build 时若输入未变，直接复用缓存产物；!.next/cache/**：排除 .next/cache（Next.js 的临时缓存目录，无需持久化缓存，避免占用空间）。

  - cache: false	
  强制关闭该任务的缓存（优先级高于 outputs）。通常用于「需要每次强制重新构建」的场景（如构建产物与环境变量强关联，且环境变量频繁变化，不希望复用旧缓存）。

- 任务 lint（代码检查任务）
  dependsOn: ["^lint"] 执行当前项目的 lint 前，先执行「所有依赖子包 / 上游包的 lint 任务」。目的是确保整个 Monorepo 仓库的代码风格统一，避免子包代码不规范导致主项目依赖出错。

- 任务 check-types（类型检查任务）
  dependsOn: ["^check-types"] 执行当前项目的类型检查前，先执行「所有依赖子包 / 上游包的类型检查」。目的是确保依赖的子包类型定义正确，避免主项目因子包类型错误导致类型检查失败

- 任务 dev
cache: false：关闭缓存。开发服务是「实时监听文件变化并热更新」的长任务，无需缓存（缓存无意义）。
persistent: true：标记该任务为「持久化任务」。Turbo 默认会在任务执行完成后退出，而 persistent: true 会让 Turbo 保持任务运行（如持续监听文件变化、维持开发服务器进程），直到手动终止（如 Ctrl+C），符合开发场景的需求。