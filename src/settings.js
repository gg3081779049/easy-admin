export default {

    // 浅色模式
    mode: 'light',

    // 系统布局
    layout: 'vertical',

    // 系统语言
    language: 'zh',

    // 页面切换动画类型
    pageAnimateType: 'fade',

    // 是否开启动态标题
    dynamicTitle: false,

    // 是否开启水印
    watermark: false,

    // 是否开启灰色模式
    grey: false,

    // 头部高度
    headerHeight: 50,

    // 是否固定头部
    fixedHeader: true,

    // 是否显示面包屑
    showBreadcrumb: true,

    // 是否显示面包屑图标
    showBreadcrumbIcon: true,

    // 标签栏高度
    tabsHeight: 40,

    // 标签栏风格
    tabsStyle: 'card',

    // 是否显示标签栏
    showTabs: true,

    // 是否显示标签栏图标
    showTabsIcon: true,

    // 是否开启标签拖拽
    draggable: true,

    // 侧边栏宽度
    sidebarWidth: 216,

    // 侧边栏菜单项高度
    sidebarItemHeight: 50,

    // 侧边栏菜单项风格
    sidebarStyle: 'card',

    // 深色侧边栏
    darkSidebar: true,

    // 是否只保持一个子菜单展开
    uniqueOpened: true,

    // 主题颜色
    theme: {
        primary: '#409eff',
        success: '#67c23a',
        info: '#909399',
        warning: '#e6a23c',
        danger: '#f56c6c',
    },

    // 工具栏
    navToolbar: [
        { is: 'NavbarSearch', icon: 'search', show: true },
        { is: 'Screenfull', icon: 'fullscreen', show: true },
        { is: 'DataScreen', icon: 'screen', show: true },
        { is: 'LangSelect', icon: 'translate', show: true },
        { is: 'ModeSwitch', icon: 'light', show: true },
    ]
}