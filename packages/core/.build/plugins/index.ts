import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
// 将 CSS 样式直接注入到 JavaScript 文件
// cssCodeSplit: true 配置与 vite-plugin-lib-inject-css 插件配合使用
// - 构建时进行 CSS 代码分割，保持了代码的模块化和可维护性
// - 运行时将 CSS 注入到 JavaScript 中，简化了用户的使用体验
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import autoImportPlugin from './autoImport';

const plugins: PluginOption[] = [
    vue({
        script: {
            propsDestructure: true,
        },
    }) as PluginOption,
    ...autoImportPlugin,
    libInjectCss() as PluginOption,
]

export default plugins;