import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoImportPlugin from './autoImport';

const plugins: PluginOption[] = [
    vue(),
    ...autoImportPlugin,
]

export default plugins;