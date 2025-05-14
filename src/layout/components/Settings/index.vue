<template>
  <el-drawer class="drawer-container" size="320" :title="$t('common.configuration')" append-to-body>
    <el-scrollbar style="height:calc(100% - 52.8px)">
      <el-collapse>
        <el-collapse-item :title="$t('settings.title.system')">
          <LayoutSelect v-model="layout" :options="Object.keys(subTitle.layout.options)" />
          <br>
          <setting-item type="el-segmented" title="mode" v-model="mode" :options="Object.keys(subTitle.mode.options)">
            <template #default="{ item }">
              <svg-icon :icon="`${item}`" />
            </template>
          </setting-item>
          <setting-item type="el-select" title="language" v-model="language"
            :placeholder="subTitle.language.placeholder">
            <template #prefix>
              <svg-icon icon="global" />
            </template>
            <el-option v-for="val, key in subTitle.language.options" :key="key" :label="val" :value="key" />
          </setting-item>
          <setting-item type="el-select" title="pageAnimateType" v-model="pageAnimateType"
            :placeholder="subTitle.pageAnimateType.placeholder">
            <template #prefix>
              <svg-icon icon="ppt" />
            </template>
            <el-option v-for="val, key in subTitle.pageAnimateType.options" :key="key" :label="val" :value="key" />
          </setting-item>
          <setting-item type="el-switch" title="dynamicTitle" v-model="dynamicTitle" />
          <setting-item type="el-switch" title="watermark" v-model="watermark" />
          <setting-item type="el-switch" title="grey" v-model="grey" />
        </el-collapse-item>
        <el-collapse-item :title="$t('settings.title.theme')">
          <setting-item type="easy-color-picker" title="theme_primary" v-model="theme.primary" />
          <setting-item type="easy-color-picker" title="theme_success" v-model="theme.success" />
          <setting-item type="easy-color-picker" title="theme_info" v-model="theme.info" />
          <setting-item type="easy-color-picker" title="theme_warning" v-model="theme.warning" />
          <setting-item type="easy-color-picker" title="theme_danger" v-model="theme.danger" />
        </el-collapse-item>
        <el-collapse-item :title="$t('settings.title.navbar')">
          <setting-item type="el-input-number" title="headerHeight" v-model="headerHeight" :min="40" :max="80" :step="5" />
          <setting-item type="el-switch" title="fixedHeader" v-model="fixedHeader" tip />
          <setting-item type="el-switch" title="showBreadcrumb" v-model="showBreadcrumb" />
          <setting-item type="el-switch" title="showBreadcrumbIcon" v-model="showBreadcrumbIcon" />
        </el-collapse-item>
        <el-collapse-item :title="$t('settings.title.navToolbar')">
          <VueDraggable v-model="navToolbar" :animation="150" handle=".handle" ghostClass="ghost">
            <div :class="['nav-toolbar-item', { 'disabled': !item.show }]" v-for="item in navToolbar" :key="item.is">
              <div>
                <svg-icon class="handle" :icon="item.icon" />
                <span>{{ subTitle.navToolbar.options[item.is] }}</span>
              </div>
              <el-switch v-model="item.show" size="small" />
            </div>
          </VueDraggable>
        </el-collapse-item>
        <el-collapse-item :title="$t('settings.title.tabs')">
          <setting-item type="el-switch" title="showTabs" v-model="showTabs" />
          <setting-item type="el-switch" title="showTabsIcon" v-model="showTabsIcon" />
          <setting-item type="el-input-number" title="tabsHeight" v-model="tabsHeight" :min="30" :max="60" :step="2" />
          <setting-item type="el-select" title="tabsStyle" v-model="tabsStyle" :placeholder="subTitle.tabsStyle.placeholder">
            <template #prefix>
              <svg-icon icon="tag" />
            </template>
            <el-option v-for="val, key in subTitle.tabsStyle.options" :key="key" :label="val" :value="key" />
          </setting-item>
          <setting-item type="el-switch" title="draggable" v-model="draggable" />
        </el-collapse-item>
        <el-collapse-item :title="$t('settings.title.sidebar')">
          <setting-item type="el-input-number" title="sidebarWidth" v-model="sidebarWidth" :min="180" :max="360"
            :step="5" />
          <setting-item type="el-input-number" title="sidebarItemHeight" v-model="sidebarItemHeight" :min="40" :max="60"
            :step="2" />
          <setting-item type="el-select" title="sidebarStyle" v-model="sidebarStyle"
            :placeholder="subTitle.sidebarStyle.placeholder">
            <template #prefix>
              <svg-icon icon="tag" />
            </template>
            <el-option v-for="val, key in subTitle.sidebarStyle.options" :key="key" :label="val" :value="key" />
          </setting-item>
          <setting-item type="el-switch" title="darkSidebar" v-model="darkSidebar" tip />
          <setting-item type="el-switch" title="uniqueOpened" v-model="uniqueOpened" tip />
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
    <div class="footer">
      <easy-button type="primary" i="save" t="operation.save" plain v-on-click-rotate @click="save" />
      <easy-button i="refresh" t="operation.reset" plain v-on-click-rotate @click="reset" />
    </div>
  </el-drawer>
</template>

<script>
import settings from "@/settings.js"
import { useSettingsStore } from '@/store/modules/settings'
import { mapWritableState } from 'pinia'

import SettingItem from './SettingItem'
import LayoutSelect from './LayoutSelect'
import { VueDraggable } from 'vue-draggable-plus'

export default {
  name: "Settings",
  components: { SettingItem, LayoutSelect, VueDraggable },
  computed: {
    ...mapWritableState(useSettingsStore, Object.keys(settings)),
    options() {
      return this.$tm('settings.options')
    },
    subTitle() {
      return this.$tm('settings.subTitle')
    }
  },
  methods: {
    save() {
      this.$modal.loading.open(this.$t('message.saving'))
      useSettingsStore().saveSettings()
      setTimeout(this.$modal.loading.close, 800)
    },
    reset() {
      this.$modal.loading.open(this.$t('message.reseting'))
      useSettingsStore().resetSettings()
      setTimeout(this.$modal.loading.close, 800)
    }
  }
}
</script>

<style lang="scss">
.drawer-container {
  .el-drawer__header {
    margin-bottom: 5px;
  }

  .el-scrollbar {
    overflow: visible;

    .el-collapse {
      .el-collapse-item__header {
        font-size: 14px;
        letter-spacing: 1px;
      }

      .el-collapse-item__wrap {
        .el-collapse-item__content {
          padding-bottom: 16px;

          .nav-toolbar-item {
            margin-bottom: 5px;
            padding: 4px 8px;
            border-radius: 4px;
            background: var(--el-color-info-light-9);
            color: var(--el-text-color-regular);
            display: flex;
            justify-content: space-between;

            &:last-child {
              margin-bottom: 0;
            }

            div {
              display: flex;
              align-items: center;
              gap: 8px;

              svg {
                cursor: move;
              }

              span {
                cursor: pointer;
              }
            }
          }

          .disabled {
            color: var(--el-text-color-placeholder);
          }

          .ghost {
            opacity: 0;
          }
        }
      }
    }

    .el-scrollbar__bar {
      width: 4px;
      right: -20px;
    }
  }

  .footer {
    width: 100%;
    padding-top: 20px;
    border-top: 1px solid var(--el-border-color);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
