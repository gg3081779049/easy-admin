<template>
    <div class="m20">
        <div class="about app-card">
            <h4 class="title">项目介绍</h4>
            <p class="content">
                <el-link type="primary" href="/home" style="text-indent:0">Easy-Admin</el-link>
                {{ info.introduction }}
            </p>
        </div>
        <div class="app-card">
            <h4 class="title">项目信息</h4>
            <el-descriptions :column="2" border>
                <el-descriptions-item>
                    <template #label>版本号</template>
                    <el-tag type="primary">{{ info.version }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>最后构建时间</template>
                    <template #default>{{ info.buildTime }}</template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>开源协议</template>
                    <template #default>{{ info.license }}</template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>作者</template>
                    <template #default>{{ info.author }}</template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>Github地址</template>
                    <template #default>{{ info.github }}</template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>预览地址</template>
                    <template #default>{{ info.preview }}</template>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="app-card">
            <h4 class="title">
                <el-badge type="primary" :value="dependencies.length" :offset="[15, 11]">
                    生产依赖
                </el-badge>
            </h4>
            <el-descriptions :column="3" label-width="270" border>
                <el-descriptions-item v-for="item in dependencies">
                    <template #label>{{ item.name }}</template>
                    {{ item.version }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="change-log app-card">
            <h4 class="title">更新日志</h4>
            <easy-table :data="changeLog">
                <el-table-column type="index" label="序号" width="60" />
                <el-table-column prop="version" label="版本号" width="120" />
                <el-table-column prop="title" label="内容" align="left">
                    <template #default="{ row }">
                        <div>{{ row.title }}</div>
                        <div class="change-log-content">
                            <div v-for="(item, index) in row.content" :key="index">{{ `${index + 1}. ${item}` }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="时间" width="200" />
            </easy-table>
        </div>
    </div>
</template>

<i18n locale="en" src="./locales/en.json"></i18n>
<i18n locale="zh" src="./locales/zh.json"></i18n>

<script>
export default {
    name: 'About',
    data() {
        return {
            info: {
                name: 'Easy-Admin',
                version: 'v1.1.6',
                author: 'gg3081779049@qq.com',
                license: 'MIT',
                buildTime: '2025-04-28',
                description: 'Easy-Admin is a free and open source admin template based on Vue.js and Element UI.',
                github: 'https://github.com/gg3081779049/easy-admin.git',
                preview: 'https://easy-admin.cn',
                introduction: `
                    是一款基于 Vue3 开发的开源后台管理系统框架，
                    采用 Vue CLI、Vue Router、Vue I18n、Element Plus、Pinia、Axios 等主流技术栈。
                    它具备丰富的基础功能模块，支持多语言切换与灵活的权限管理，代码结构清晰，扩展性强。无论是快速搭建项目，
                    还是作为学习 Vue3 开发的实践范例， Easy-Admin 都能提供高效、便捷的解决方案，帮助开发者轻松应对各类后台管理需求 。
                `
            },
            dependencies: [{
                "name": "@form-create/designer",
                "version": "^3.2.11"
            }, {
                "name": "@form-create/element-ui",
                "version": "^3.2.20"
            }, {
                "name": "axios",
                "version": "^1.6.8"
            }, {
                "name": "colord",
                "version": "2.9.3"
            }, {
                "name": "core-js",
                "version": "^3.8.3"
            }, {
                "name": "element-plus",
                "version": "^2.9.2"
            }, {
                "name": "file-saver",
                "version": "^2.0.5"
            }, {
                "name": "fuse.js",
                "version": "7.0.0"
            }, {
                "name": "highlight.js",
                "version": "^11.11.1"
            }, {
                "name": "js-cookie",
                "version": "^3.0.5"
            }, {
                "name": "jsencrypt",
                "version": "^3.3.2"
            }, {
                "name": "mockjs",
                "version": "^1.1.0"
            }, {
                "name": "multer",
                "version": "^1.4.5-lts.1"
            }, {
                "name": "nprogress",
                "version": "^0.2.0"
            }, {
                "name": "pinia",
                "version": "^2.1.7"
            }, {
                "name": "pinia-plugin-persistedstate",
                "version": "^4.1.3"
            }, {
                "name": "screenfull",
                "version": "5.0.2"
            }, {
                "name": "vue",
                "version": "^3.2.13"
            }, {
                "name": "vue-cropper",
                "version": "^1.1.4"
            }, {
                "name": "vue-draggable-plus",
                "version": "^0.4.1"
            }, {
                "name": "vue-i18n",
                "version": "^10.0.0-beta.1"
            }, {
                "name": "vue-json-viewer",
                "version": "^3.0.4"
            }, {
                "name": "vue-meta",
                "version": "^3.0.0-alpha.8"
            }, {
                "name": "vue-router",
                "version": "^4.3.2"
            }],
            changeLog: [{
                "id": 1,
                "version": "v1.0.0",
                "title": "基础功能开发完成",
                "time": "2025-03-12",
                "content": []
            }, {
                "id": 2,
                "version": "v1.0.1",
                "title": "侧边栏优化",
                "time": "2025-03-17",
                "content": [
                    "修复了侧边栏折叠动画异常",
                    "新增了标签栏刷新按钮",
                    "修复了水平混合布局模式下侧边栏溢出问题"
                ]
            }, {
                "id": 3,
                "version": "v1.0.2",
                "title": "布局优化",
                "time": "2025-03-21",
                "content": [
                    "修改了异常页的位置",
                    "添加了一些基础页面",
                    "修改了styles的位置",
                    "修复了水平布局模式下顶栏溢出问题",
                    "修改了工具栏组件位置",
                    "给LangSelect组件添加了选中时的钩子"
                ]
            }, {
                "id": 4,
                "version": "v1.0.3",
                "title": "路由增强",
                "time": "2025-03-25",
                "content": [
                    "给路由添加了图标和标题",
                    "新增了打印按钮"
                ]
            }, {
                "id": 5,
                "version": "v1.0.4",
                "title": "界面优化",
                "time": "2025-03-27",
                "content": [
                    "取消了打印按钮",
                    "新增了置顶按钮",
                    "优化了i18n的数据",
                    "修改了登录背景图"
                ]
            }, {
                "id": 6,
                "version": "v1.0.5",
                "title": "加载优化",
                "time": "2025-03-28",
                "content": [
                    "修改优化了首加载的动画",
                    "修改了404插画"
                ]
            }, {
                "id": 7,
                "version": "v1.0.6",
                "title": "多语言与主题增强",
                "time": "2025-04-01",
                "content": [
                    "登录页面新增了语言切换",
                    "登录页背景图会随着主题变化",
                    "新增灰色模式",
                    "新增了 系统工具-代码生成",
                    "新增了深色侧边栏",
                    "优化了SettingItem组件"
                ]
            }, {
                "id": 8,
                "version": "v1.0.7",
                "title": "组件重构",
                "time": "2025-04-05",
                "content": [
                    "调整了views目录下的页面模块位置",
                    "AppTable组件名字修改为EasyTable",
                    "AppDialog组件名字修改为EasyDialog",
                    "ColorPick组件名字修改为EasyColorPick",
                    "新增了QueryForm组件"
                ]
            }, {
                "id": 9,
                "version": "v1.0.8",
                "title": "功能增强",
                "time": "2025-04-10",
                "content": [
                    "新增了EasyButton组件",
                    "安装了@intlify/vue-i18n-loader插件",
                    "新增了路由模式选择",
                    "验证码组件三合一"
                ]
            }, {
                "id": 10,
                "version": "v1.0.9",
                "title": "组件优化",
                "time": "2025-04-12",
                "content": [
                    "优化了RightToolbar组件",
                    "优化了EasyTable组件"
                ]
            }, {
                "id": 11,
                "version": "v1.1.0",
                "title": "工具函数增强",
                "time": "2025-04-13",
                "content": [
                    "utils新增了removeIf函数",
                    "修复了EasyTable组件的bug",
                    "优化了IconSelect组件"
                ]
            }, {
                "id": 12,
                "version": "v1.1.1",
                "title": "图标与路由优化",
                "time": "2025-04-15",
                "content": [
                    "更换了所有系统图标",
                    "升级了SvgIcon组件",
                    "修改了 search.svg",
                    "根目录添加了 CHANGELOG.md 文件",
                    "修改了 route.meta.title 的值",
                    "删除了 router 中的 user 路由",
                    "菜单管理添加了拖拽按钮"
                ]
            }, {
                "id": 13,
                "version": "v1.1.2",
                "title": "表格功能升级",
                "time": "2025-04-21",
                "content": [
                    "添加了table插件",
                    "升级了EasyTable组件"
                ]
            }, {
                "id": 14,
                "version": "v1.1.3",
                "title": "工具与Mock增强",
                "time": "2025-04-22",
                "content": [
                    "RightToolbar 组件改名为 TableToolbar",
                    "自动读取更新日志文件内容",
                    "删除了table插件",
                    "utils 添加 print.js",
                    "mock 接口支持异步函数了",
                    "mock 新增 timeout 配置",
                    "更换了状态码的插画",
                    "删除了代码生成模块",
                    "全局添加了 --mian-height 变量"
                ]
            }, {
                "id": 15,
                "version": "v1.1.4",
                "title": "表单设计新增",
                "time": "2025-04-24",
                "content": [
                    "系统工具添加了表单设计模块",
                    "添加了SlotRenderer组件",
                    "优化了EasyTable组件（在模板中渲染列）",
                    "添加了EasyForm组件"
                ]
            }, {
                "id": 16,
                "version": "v1.1.5",
                "title": "开发体验优化",
                "time": "2025-04-25",
                "content": [
                    "修改了TableToolbar组件（改为了选项式）",
                    "添加了dict插件",
                    "消除了::v-deep编译警告",
                    "消除 __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ 警告信息",
                    "添加了首加载的控制台输出",
                    "SlotRenderer 组件改名为 EasyRenderer",
                    "mock接口type选项名改为method",
                    "修复了arrayToTree方法的bug"
                ]
            }, {
                "id": 17,
                "version": "v1.1.6",
                "title": "功能精简与优化",
                "time": "2025-04-28",
                "content": [
                    "删除了水印组件",
                    "移动了路由守卫的位置",
                    "添加了面包屑动画",
                    "优化了EasyTable组件",
                    "添加了字典管理"
                ]
            }, {
                "id": 18,
                "version": "v1.1.7",
                "title": "新增了EasyTablePro组件",
                "time": "2025-04-30",
                "content": [
                    "新增了EasyTablePro组件",
                    "@/utils/auth.js添加了存储策略",
                    "修复了EasyRenderer组件中的异常"
                ]
            }, {
                "id": 19,
                "version": "v1.1.8",
                "title": "升级与优化",
                "time": "2025-05-01",
                "content": [
                    "升级了element-plus版本到2.9.2",
                    "优化了EasyTablePro组件",
                    "优化了EasyButton组件",
                    "优化了列设置文本溢出问题",
                    "修改了v-hasPerim指令的名称为v-auth",
                    "优化了Tabs组件动态控制拖拽功能",
                    "EasyTable组件添加了拖拽功能"
                ]
            }, {
                "id": 20,
                "version": "v1.1.9",
                "title": "功能增强",
                "time": "2025-05-08",
                "content": [
                    "EasyTable组件expandRowKeys属性支持双向绑定",
                    "修复EasyTablePro组件deleteItems方法的bug",
                    "EasyTablePro组件添加了opened-dialog事件",
                    "EasyDialog组件界面优化",
                    "新增了EasyDrawer组件"
                ]
            }]
        }
    },
    created() {
        this.changeLog = this.changeLog.reverse()
    }
}
</script>

<style lang="scss" scoped>
.m20 {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .app-card {
        padding: 16px;

        .title {
            padding-bottom: 16px;
            color: var(--el-text-color-regular);
            cursor: pointer;
        }

        .content {
            text-indent: 2em;
            font-size: 14px;
            line-height: 25px;
            color: var(--el-text-color-regular);
        }
    }

    .about,
    .change-log {
        .title {
            padding-bottom: 12px;

            span {
                margin-left: 4px;
            }
        }

        .change-log-content {
            text-indent: 1em;
            font-size: 13px;
            line-height: 25px;
            color: var(--el-text-color-regular);
            opacity: 0.7;
        }
    }

    .el-descriptions {
        --el-descriptions-item-bordered-label-background: var(--el-fill-color-lighter);
    }
}
</style>