import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useWindowSize() {
    // 定义响应式变量
    const width = ref(window.innerWidth)
    const height = ref(window.innerHeight)
    // 定义更新窗口尺寸的函数
    function updateSize() {
        width.value = window.innerWidth
        height.value = window.innerHeight
    }
    // 组件挂载时添加事件监听
    onMounted(() => {
        window.addEventListener('resize', updateSize)
    })
    // 组件卸载前移除事件监听
    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateSize)
    })
    // 返回响应式数据
    return { width, height }
}