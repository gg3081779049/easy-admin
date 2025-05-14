<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="{ icon, title } in metaList" :key="title">
        <svg-icon :icon="icon" v-if="showBreadcrumbIcon && icon" />
        <span>{{ title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { useRouteStore } from '@/store/modules/route'
import { useSettingsStore } from '@/store/modules/settings'
import { mapState } from 'pinia'

export default {
  name: "Breadcrumb",
  computed: {
    ...mapState(useSettingsStore, ["showBreadcrumbIcon"]),
    ...mapState(useRouteStore, ["listRoutes"]),
    metaList() {
      let route = this.listRoutes.find(route => `/${route.path}` === this.$route.path)
      return route?.meta?.title.map((title, i) => ({ title, icon: route.meta.icon[i] }))
    },
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  display: inline-block;
  font-size: 14px;

  svg {
    margin-right: 4px;
    color: var(--el-text-color-regular);
  }
}
</style>
