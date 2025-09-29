/**
 * 使用 esno 指令来执行当前文件
 * esno 是一个基于 esbuild 的 TypeScript 运行时工具
 * 直接执行 TypeScript 文件，无需事先编译，提供比传统的 ts-node 更快的执行速度
 */
import childProcess from 'node:child_process';
import path from 'node:path';
import { cwd, exit } from 'node:process';
// Node.js文件系统操作的增强库
import fs from 'fs-extra';
import { promisify } from 'node:util';

interface ComponentInfo {
    name: string;
    path: string;
}

async function generateAutoEntry() {
    const componentsDir = path.resolve(cwd(), 'src/components'); // \packages\core\src\components 目录
    const components: ComponentInfo[] = [];
    // 扫描组件目录
    if (await fs.exists(componentsDir)) {
        const dirs = await fs.readdir(componentsDir); // 读取组件目录下的所有子目录 [ 'CpnA', 'CpnB' ]
        for (const dir of dirs) {
            const compPath = path.join(componentsDir, dir, 'index.vue'); // \packages\core\src\components\CpnA\index.vue
            if (await fs.exists(compPath)) {
                const compName = dir.replace(/(^\w|-\w)/g, (m: string) =>
                    m.replace('-', '').toUpperCase());
                components.push({
                    name: compName,
                    path: `./components/${dir}/index.vue`
                });
            }
        }
    }
    // 生成入口文件内容
    const entryContent = [
        '// Auto-Element-Plus-X by auto-export-all-components script',
        ...components.map(c => `export { default as ${c.name} } from '${c.path}'`),
        ''
    ].join('\n');
    // 生成安装文件内容
    const installContent = [
        `import type { App, Plugin } from 'vue'`,
        ...components.map(c => `import ${c.name} from '${c.path}'`),
        '',
        `export * from './components'`,
        `export * from './hooks'`,
        '',
        'const VueComponents: Plugin = {',
        'install(app: App) {',
        ...components.map(c => `app.component('${c.name}', ${c.name})`),
        '}',
        '}',
        '',
        'export default VueComponents'
    ].join('\n');

    // 写入文件
    const outputDir = path.resolve(cwd(), 'src');

    try {
        // 确保输出目录存在，如果不存在，则会创建该目录
        await fs.ensureDir(outputDir);
        const componentsFilePath = path.join(outputDir, 'components.ts'); // \packages\core\src\components.ts
        await fs.writeFile(componentsFilePath, entryContent);
        const indexFilePath = path.join(outputDir, 'index.ts'); // \packages\core\src\index.ts
        await fs.writeFile(indexFilePath, installContent);

        console.log('✅ 入口文件创建成功!');
        /**
         * childProcess.exec 是 Node.js 的子进程执行命令的方法，原始形式接受回调函数处理结果
         * promisify 用于将遵循 Node.js 回调风格的函数转换为返回 Promise 的函数
         * 转换后得到的 execAsync 函数可以使用现代 JavaScript 的 async/await 语法，使异步代码更易读、维护
         * execAsync 被用来异步执行 ESLint 命令，对刚生成的两个文件（ components.ts 和 index.ts ）进行代码格式化，
         */
        const execAsync = promisify(childProcess.exec);
        try {
            // 如果这个指令执行卡住了，下载 eslint-plugin-format 包
            await execAsync(
                `npx eslint --fix "${componentsFilePath}" "${indexFilePath}"`
            );
            console.log('✅ 入口文件格式化成功!');
        } catch (error) {
            console.warn('⚠️ Eslint 格式化失败:', error);
        }
    } catch (error) {
        console.error('❌ 入口文件创建失败', error);
        exit(1);
    }
}

// 生成 build 打包入口文件
void generateAutoEntry();