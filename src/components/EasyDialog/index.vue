<template>
    <el-dialog class="easy-dialog" :show-close="false" :fullscreen="fullscreen" align-center append-to-body>
        <template #header="{ close, titleClass }">
            <span :class="titleClass">{{ $attrs.title }}</span>
            <div class="flex g12">
                <svg-icon :icon="fullscreen ? 'fullscreen-exit' : 'square'" v-if="showFullscreen" @click="fullscreen = !fullscreen" />
                <svg-icon icon="wrong" @click="close" />
            </div>
        </template>
        <el-scrollbar v-bind="scrollbarProps" :style="{ minHeight }">
            <div class="p18" v-loading="loading" element-loading-background="var(--el-dialog-bg-color)">
                <slot />
            </div>
        </el-scrollbar>
        <template #footer v-if="showFooter && !loading">
            <easy-button t="common.cancel" auto-insert-space @click="close" />
            <easy-button type="primary" t="common.confirm" auto-insert-space @click="confirm" />
        </template>
    </el-dialog>
</template>

<script>
export default {
    name: 'EasyDialog',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        minHeight: {
            type: String,
            default: '0px'
        },
        maxHeight: {
            type: [String, Number],
            default: '600px'
        },
        showFullscreen: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            fullscreen: false
        }
    },
    computed: {
        scrollbarProps() {
            if (this.fullscreen) {
                let headerHeight = 48.8
                let footerHeight = 60
                return {
                    height: `calc(100vh - ${headerHeight + this.showFooter * footerHeight}px)`
                }
            } else {
                return {
                    maxHeight: typeof this.maxHeight === 'string' ? this.maxHeight : `${this.maxHeight}px`
                }
            }
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
    .easy-dialog {
        padding: 0;

        .el-dialog__header {
            padding: 12px;
            background: rgba(128, 128, 128, 0.06);
            border-bottom: 1px solid var(--el-border-color-lighter);
            display: flex;
            justify-content: space-between;

            .flex {
                align-items: center;

                svg {
                    color: var(--el-text-color-primary);
                    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                    cursor: pointer;

                    &:hover {
                        color: var(--el-color-primary);
                    }
                }
            }
        }

        .el-dialog__footer {
            padding: 14px;
        }
    }
</style>