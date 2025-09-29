<script setup lang="ts">
// 引入类型
import type { CpnBEmits, CpnBProps } from './types.d.ts';
import Footer from './components/footer/index.vue'

const props = withDefaults(defineProps<CpnBProps>(), {
    propsA: '默认值A',
    propsB: 123,
    propsC: 'aaa',
})
const emits = defineEmits<CpnBEmits>();
// watch(() => props.propsA, (newVal, oldVal) => {
//     console.log('propsA 变化了', newVal, oldVal);
// })
function handleClickStart() {
    emits('start');
}
function handleClickFinish() {
    emits('finish');
}
function handleClickEnd() {
    emits('end');
}
onMounted(() => {
    console.log('B组件加载')
})
</script>
<template>
    <div class="cpn-b">
        <h1 class="cpn-b-content">组件B</h1>
        <div>属性值:{{ propsA }}</div>
        <div>属性值:{{ propsB }}</div>
        <div>属性值:{{ propsC }}</div>
        <div @click="handleClickStart">start</div>
        <div @click="handleClickFinish">finish</div>
        <div @click="handleClickEnd">end</div>
        <Footer />
    </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>