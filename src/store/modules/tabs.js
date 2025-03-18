import { defineStore } from 'pinia'
import router from '@/router'
import { removeIf } from '@/utils'

export const useTabsStore = defineStore('tabs', {
    state: () => ({
        tabs: [],
        defaultTab: "home"
    }),
    getters: {
        cachesTabs() {
            return this.tabs.filter(tab => !tab.meta.noCache).map(tab => tab.name)
        }
    },
    actions: {
        init() {
            this.addTab(router.getRoutes().find(route => route.name === this.defaultTab))
        },
        addTab({ path, fullPath, name, meta, query }) {
            // 判断是否已存在，若存在不添加
            if (!this.tabs.some(t => t.path === path)) {
                this.tabs.push({ path, fullPath, name, meta, query })
            }
        },
        // 删除符合条件的标签
        delTabs(condition) {
            // 从标签页数组的末尾开始遍历，以便在删除元素时避免索引错乱
            removeIf(this.tabs, (tab, i) => condition(tab, i) && tab.name !== this.defaultTab)
        }
    },
    persist: {
        storage: sessionStorage,
        paths: ["tabs"]
    }
})