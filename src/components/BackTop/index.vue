<template>
    <el-backtop :target="target" :visibility-height="160" :title="$t('common.backtop')">
        <template #default>
            <svg-icon icon="to-top" />
        </template>
    </el-backtop>
</template>

<script>
export default {
    name: 'BackTop',
    computed: {
        target() {
            let target = '.main-scrollbar .el-scrollbar__wrap'
            return document.querySelector(target) ? target : ''
        }
    }
}
</script>

<style lang="scss" scoped></style>