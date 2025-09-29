import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoImportPlugin from './autoImport';

const plugins: PluginOption[] = [
    vue({
        script: {
            propsDestructure: true,
        },
    }) as PluginOption,
    ...autoImportPlugin,
]

export default plugins;