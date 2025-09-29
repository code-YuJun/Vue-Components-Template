import { ref, computed } from 'vue'
/**
 * CpnA组件的文本显示hook
 * 用于管理组件中的文本内容和相关功能
 */
export function useTextDisplay() {
    // 定义响应式的文本内容
    const displayText = ref('CpnA 组件文本内容')
    // 计算文本长度
    const textLength = computed(() => displayText.value.length)
    // 更新显示文本的方法
    function updateText(newText: string) {
        displayText.value = newText
    }
    // 清空文本的方法
    function clearText() {
        displayText.value = ''
    }
    // 重置文本到初始状态
    function resetText() {
        displayText.value = 'CpnA 组件文本内容'
    }
    // 返回响应式数据和方法
    return {
        displayText,
        textLength,
        updateText,
        clearText,
        resetText
    }
}