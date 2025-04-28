<template>
    <el-dialog class="easy-dialog" :show-close="false" :fullscreen="fullscreen" append-to-body>
        <template #header="{ close, titleClass }">
            <span :class="titleClass">{{ $attrs.title }}</span>
            <div class="flex g12">
                <svg-icon :icon="fullscreen ? 'fullscreen-exit' : 'square'" v-if="showFullscreen" @click="fullscreen = !fullscreen" />
                <svg-icon icon="wrong" @click="close" />
            </div>
        </template>
        <div v-loading="loading" element-loading-background="var(--el-dialog-bg-color)">
            <el-scrollbar v-bind="scrollbarProps" :style="{ minHeight }">
                <div class="p14">
                    <slot />
                </div>
            </el-scrollbar>
            <div class="dialog-footer" v-if="showFooter">
                <easy-button :t="$t('common.cancel')" auto-insert-space @click="close" />
                <easy-button type="primary" :t="$t('common.confirm')" auto-insert-space @click="confirm" />
            </div>
        </div>
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
                return {
                    height: `calc(100vh - ${this.showFooter ? 102 : 42}px)`
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
            padding: 14px;
            padding-bottom: 4px;
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

        .dialog-footer {
            display: flex;
            justify-content: end;
            padding: 14px;
        }
    }
</style>