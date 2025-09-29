<script setup lang="ts">
import type { WelcomeProps } from './types.d.ts'
import { useTextDisplay } from './hook'
const { displayText, textLength, updateText, clearText, resetText } = useTextDisplay()

// Vue 3.5 以上版本支持解构 props
const { text = 'title' } = defineProps<WelcomeProps>()

// 可以在组件中定义使用hook方法的事件处理函数
function handleUpdateText() {
    updateText('更新后的 CpnA 组件文本内容')
}

function handleClearText() {
    clearText()
}

function handleResetText() {
    resetText()
}
</script>
<template>
    <div class="cpn-a">
        这个是 CpnA 组件
        <div>组件属性值：{{ text }}</div>
        <div>{{ displayText }}</div>
        <div v-if="textLength > 0">文本长度: {{ textLength }}</div>
        <button @click="handleUpdateText">更新文本</button>
        <button @click="handleClearText">清空文本</button>
        <button @click="handleResetText">重置文本</button>
    </div>
</template>

<style scoped lang="scss" src="./style.scss"></style>