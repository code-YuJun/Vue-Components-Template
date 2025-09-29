// 用于配置自动导入 Vue 和 Element Plus 
import type { PluginOption } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'node:path';

const plugins: PluginOption[] = [
  AutoImport({
    imports: ['vue'], // 自动导入 Vue 的 API
    ignore: ['h'],    // 忽略特定的导入，这里忽略了 Vue 的 h 函数
    dts: path.resolve(__dirname, '../../src/auto-import.d.ts') // 使用绝对路径
  }) as PluginOption,
]

export default plugins;
