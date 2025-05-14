import { defineStore } from 'pinia'
import { useAppStore } from '@/store/modules/app'
import { ref, toRefs, watch, watchEffect } from 'vue'
import { colord } from 'colord'
import { mixColor, fade, invert } from '@/utils/color'
import { cloneDeep, mapValues } from 'lodash'
import { local } from '@/plugins/modules/cache'
import defaultSettings from '@/settings'
import i18n from '@/locales'

export const useSettingsStore = defineStore('settings', () => {
    const storageSettings = local.getItem('system-settings')
    const settings = ref(cloneDeep(mapValues(defaultSettings, (val, key) => storageSettings?.[key] ?? val)))

    // 监听 language
    watch(() => settings.value.language, (language) => {
        i18n.global.locale = language
    }, { immediate: true })

    // 监听 mode
    let appStore = useAppStore()
    switchMode(settings.value.mode, false)
    watch(() => settings.value.mode, (mode) => {
        switchMode(mode, !appStore.showSettings)
    })

    // 监听 grey
    watch(() => settings.value.grey, (grey) => {
        document.documentElement.classList[grey ? 'add' : 'remove']('html-grey')
    }, { immediate: true })

    // 设置 css 变量
    watchEffect(() => {
        let headerHeight = !appStore.tabFullscreen * settings.value.headerHeight
        let tabsHeight = settings.value.showTabs * settings.value.tabsHeight
        let mainHeight = `calc(100vh - ${headerHeight + tabsHeight}px)`
        appendStyle('system-vars', createStyleStr(settings.value.theme, mainHeight))
    })

    return {
        ...toRefs(settings.value),
        saveSettings() {
            local.setItem("system-settings", this.$state)
        },
        resetSettings() {
            local.remove("system-settings")
            this.$patch(state => {
                for (const key in defaultSettings) {
                    state[key] = cloneDeep(defaultSettings[key])
                }
            })
        }
    }
}, {
    persist: {
        storage: sessionStorage
    }
})

function appendStyle(styleId, content) {
    const style = document.querySelector(`#${styleId}`) || document.createElement('style')
    style.id = styleId
    style.textContent = content
    document.head.appendChild(style)
}

function createStyleStr(theme, mainHeight) {
    let colorTypes = ['primary', 'success', 'info', 'warning', 'danger']
    let baseColor = { 'light': '#ffffff', 'dark': '#0a0a0a' }
    let primaryHsl = colord(theme.primary).toHsl()

    let lightStyles = colorTypes.flatMap(colorType => createCssVars(theme[colorType], baseColor['light'], colorType))
    let darkStyles = colorTypes.flatMap(colorType => createCssVars(theme[colorType], baseColor['dark'], colorType))

    return `
        html {
            --main-height: ${mainHeight};
            --el-color-primary-h: ${primaryHsl.h};
            --el-color-primary-s: ${primaryHsl.s};
            --el-color-primary-l: ${primaryHsl.l};
        }
        html.light {
            --light: 1;
            ${lightStyles.join(';')}
        }
        html.dark {
            --light: 0;
            ${darkStyles.join(';')}
        }
    `
}

function createCssVars(color, baseColor, colorType) {
    return Object.entries({
        '': 1,
        '-dark-2': 1.2,
        '-light-3': 0.7,
        '-light-5': 0.5,
        '-light-7': 0.3,
        '-light-8': 0.2,
        '-light-9': 0.1,
    }).map(([key, val]) => {
        if (val > 1) {
            return `--el-color-${colorType}${key}: ${mixColor(fade(invert(baseColor), val - 1), color).toHslString()}`
        } else {
            return `--el-color-${colorType}${key}: ${mixColor(fade(color, val), baseColor).toHslString()}`
        }
    })
}

function switchMode(mode, animate = true) {
    if (animate) {
        document.startViewTransition(() => {
            document.documentElement.className = mode
        }).ready.then(() => {
            // 添加切换动画
            let modeSwitch = document.getElementById('mode-switch')
            if (modeSwitch) {
                let x = modeSwitch.getBoundingClientRect()['x']
                let y = modeSwitch.getBoundingClientRect()['y']
                let r = Math.hypot(Math.max(window.innerWidth - x, x), Math.max(window.innerHeight - y, y))
                let clipPath = [`circle(0% at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`]
                document.documentElement.animate({
                    clipPath: mode === 'light' ? clipPath : clipPath.reverse()
                }, {
                    duration: 500,
                    pseudoElement: mode === 'light'
                        ? '::view-transition-new(root)'
                        : '::view-transition-old(root)'
                })
            }
        })
    } else {
        document.documentElement.className = mode
    }
}