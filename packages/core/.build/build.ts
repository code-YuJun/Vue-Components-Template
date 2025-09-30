import type { BuildEnvironmentOptions } from 'vite';
import { extname, join, relative, resolve } from 'node:path';
import fg from 'fast-glob';

// packages/core
const root = resolve(__dirname, '../');

// ["src/components/CpnA/hook.ts","src/components/CpnA/index.vue","src/components/CpnB/index.vue"] 
const entries = fg.globSync('src/components/*/*.(tsx|ts|vue)', {
    ignore: ['src/components/**/*.d.ts', 'src/components/**/*.types.ts']
});

// ["src/hooks/hookA.ts","src/hooks/hookB.ts","src/hooks/index.ts"]
const hooksEntries = fg.globSync('src/hooks/*.(ts|tsx)', {
    ignore: ['src/hooks/**/*.d.ts', 'src/hooks/**/*.types.ts']
});

/**
 * {
 *  "CpnA\\hook":"C:\\Users\\25941\\Desktop\\Vue-Components-Template\\packages\\core\\src\\components\\CpnA\\hook.ts",
 *  "CpnA\\index":"C:\\Users\\25941\\Desktop\\Vue-Components-Template\\packages\\core\\src\\components\\CpnA\\index.vue",
 *  "CpnB\\index":"C:\\Users\\25941\\Desktop\\Vue-Components-Template\\packages\\core\\src\\components\\CpnB\\index.vue"
 * }
 */
const entriesObj = Object.fromEntries(
    entries.map(f => {
        return [
            relative('src/components', f.slice(0, f.length - extname(f).length)),
            join(root, f)
        ];
    })
);

/**
 * {
 *  "hooks/hookA":"C:\\Users\\25941\\Desktop\\Vue-Components-Template\\packages\\core\\src\\hooks\\hookA.ts",
 *  "hooks/hookB":"C:\\Users\\25941\\Desktop\\Vue-Components-Template\\packages\\core\\src\\hooks\\hookB.ts",
 *  "hooks/index":"C:\\Users\\25941\\Desktop\\Vue-Components-Template\\packages\\core\\src\\hooks\\index.ts"
 * }
 */
const hooksEntriesObj = Object.fromEntries(
    hooksEntries.map(f => {
        return [
            `hooks/${relative('src/hooks', f.slice(0, f.length - extname(f).length))}`,
            join(root, f)
        ];
    })
);

const buildConfig: BuildEnvironmentOptions = {
    lib: {
        name: 'VueComponents',
        entry: {
            index: resolve(__dirname, '../src/index.ts'),
            components: resolve(__dirname, '../src/components.ts'),
            ...entriesObj,
            ...hooksEntriesObj
        },
        fileName: (format, entryName) => {
            return `${format}/${entryName}.js`;
        },
        formats: ['es']
    },
    rollupOptions: {
        external: [
            'vue'
        ],
        // 输出文件
        output: {
            assetFileNames: ((info: any) => {
                const srcName = info.originalFileNames[0];
                if (srcName) {
                    if (srcName.includes('src/components/')) {
                        const fileName = srcName
                            .replace('src/components/', '')
                            .replace('index.vue', 'index.css');
                        return `es/${fileName}`;
                    }
                }
                return info.name;
            }) as unknown as string
        }
    },
    // 减少文件大小
    minify: 'terser',
    // CSS 处理
    cssCodeSplit: true,
    // 确保只生成一个CSS文件
    emptyOutDir: false
}

export default buildConfig;