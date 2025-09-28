// src/composables/useDarkMode.js
import { ref, onMounted, watch } from 'vue'

export function useDarkMode() {
  // 检查用户是否有保存的主题设置
  const isDark = ref(false)
  // 检测系统主题
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  // 初始化主题
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true
  }
  // 更新文档的 class
  function updateDarkMode() {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }
  // 切换主题
  function toggleDarkMode() {
    isDark.value = !isDark.value
  }
  // 组件挂载时设置主题
  onMounted(() => {
    updateDarkMode()
  })
  // 监听主题变化并更新
  watch(isDark, updateDarkMode)
  return {
    isDark,
    toggleDarkMode
  }
}