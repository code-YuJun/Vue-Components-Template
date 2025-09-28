import { defineConfig, type UserConfig } from 'vite';
import path from 'node:path';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
    const __DEV__ = mode === 'development';
    const baseConfig: UserConfig = {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    };
    if (__DEV__) {
        // 开发模式配置
        baseConfig.root = path.resolve(__dirname, 'play');
        baseConfig.build = {
            outDir: path.resolve(__dirname, 'dist-play'),
            emptyOutDir: true
        };
    } else {
        // 生产模式配置
        baseConfig.esbuild = {
            drop: ['console', 'debugger']
        };
    }
    return baseConfig;
});
