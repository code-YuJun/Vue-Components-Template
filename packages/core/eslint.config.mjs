import antfu from '@antfu/eslint-config';

export default antfu({
    formatters: true,
    vue: {
        'vue/block-order': ['error', { // 块顺序
            order: ['script', 'template', 'style'],
        }],
    },
    stylistic: {
        'indent': 2, // 缩进
        'semi': true, // 语句分号
        'quotes': 'single', // 单引号
    },
    rules: {
        'new-cap': ['off', { newIsCap: true, capIsNew: false }],
        'no-console': 'off', // 忽略console
        'antfu/consistent-chaining': 'off', // 关闭链式调用强制换行
        'vue/comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        'comma-dangle': 'off',
        'style/brace-style': 'off',
        'style/comma-dangle': 'off',
        'style/arrow-parens': 'off',
        'style/quote-props': 'off',
        'style/operator-linebreak': 'off',
        'vue/quote-props': 'off',
        'vue/operator-linebreak': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
    },
    ignores: [
        '**/dist/**',
        '**/storybook-static/**',
        '**/node_modules/**',
        '**/build/**',
        '**/lib/**',
        '**/es/**',
        '**/types/**',
        '**/public/**',
        '**/vite.config.ts',
        '**/eslint.config.js',
    ],
});
