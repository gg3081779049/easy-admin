<template>
    <el-drawer class="easy-drawer" append-to-body>
        <el-scrollbar>
            <div class="p16" v-loading="loading" element-loading-background="var(--el-dialog-bg-color)">
                <slot />
            </div>
        </el-scrollbar>
        <template #footer v-if="showFooter && !loading">
            <easy-button t="common.cancel" auto-insert-space @click="close" />
            <easy-button type="primary" t="common.confirm" auto-insert-space @click="confirm" />
        </template>
    </el-drawer>
</template>

<script>
export default {
    name: 'EasyDrawer',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        showFooter: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        close() {
            this.$emit('update:modelValue', false)
        },
        confirm() {
            this.$emit('confirm')
            this.close()
        }
    }
}
</script>

<style lang="scss">
.easy-drawer {
    .el-drawer__header {
        margin-bottom: 0;
        padding: 16px;
        border-bottom: 1px solid var(--el-border-color);
    }

    .el-drawer__body {
        padding: 0;
    }

    .el-drawer__footer {
        padding: 16px;
        border-top: 1px solid var(--el-border-color);
    }
}
</style>