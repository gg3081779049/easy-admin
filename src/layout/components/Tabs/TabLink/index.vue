<template>
    <component is="router-link" :class="['tab', { 'is-active': route.path === $route.path }]"
        :to="{ path: route.path, query: route.query, fullPath: route.fullPath }" @click.middle="close">
        <svg-icon :icon="route.meta.icon" v-if="showIcon && route.meta.icon" />
        <span>{{ route.meta.title }}</span>
        <svg-icon class="close-icon" icon="wrong" v-if="showClose" @click.prevent.stop="close" />
    </component>
</template>

<script>
export default {
    name: 'TabLink',
    props: {
        route: {
            type: Object,
            required: true
        },
        showIcon: {
            type: Boolean,
            default: false
        },
        showClose: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        close() {
            if (this.showClose) {
                this.$emit('close')
            }
        }
    }
}
</script>

<style lang="css" scoped>
    .tab {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        cursor: pointer;

        span {
            font-size: 14px;
            margin: 0 6px;
        }

        svg {
            width: 12px;
            height: 12px;
            vertical-align: middle;

            &.close-icon {
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
        }
    }
</style>