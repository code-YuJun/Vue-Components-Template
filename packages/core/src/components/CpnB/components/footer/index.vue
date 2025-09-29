<script setup lang="ts">
import { ElButton } from 'element-plus';
</script>
<template>
    <div class="cpn-b-footer">
        <div>使用组件库组件</div>
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
    </div>
</template>
<style scoped lang="scss">
.cpn-b-footer{
    margin-top: 20px;
    border: 1px solid blanchedalmond;
    padding: 10px;
    border-radius: 4px;
}
</style>