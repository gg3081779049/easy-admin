<template>
  <el-config-provider :locale="$tm('')">
    <metainfo>
      <template #title>
        {{ title }}
      </template>
    </metainfo>
    <router-view />
  </el-config-provider>
</template>

<script>
import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/settings'
import { mapState } from 'pinia'
import { useMeta } from 'vue-meta'

export default {
  name: 'App',
  computed: {
    ...mapState(useSettingsStore, ['dynamicTitle']),
    title() {
      let title = useAppStore().title
      let content = this.$tm('system').title || process.env.VUE_APP_TITLE
      if (this.dynamicTitle && title) {
        return `${title} - ${content}`
      } else {
        return content
      }
    }
  },
  mounted() {
    useMeta({ title: this.$tm('system').title || process.env.VUE_APP_TITLE })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
