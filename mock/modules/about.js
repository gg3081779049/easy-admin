// 读取根目录的CHANGELOG.md文件的内容
const fs = require('fs')
const path = require('path')
const md = fs.readFileSync(path.resolve(process.cwd(), 'CHANGELOG.md'), 'utf-8')

module.exports = [{
    url: '/mock/about/getUpdateLog',
    method: 'get',
    response() {
        let entrys = md?.split('```')[1]?.split('\r\n')?.slice(1, -1)
        return {
            code: 200,
            msg: '操作成功',
            data: entrys?.map((item, index) => {
                return {
                    id: index + 1,
                    version: item?.substring?.(0, 6)?.trim(),
                    content: item?.substring?.(6)?.trim(),
                    time: '2021-01-01'
                }
            })
        }
    }
}, {
    url: '/mock/about/getChangeLog',
    method: 'get',
    response() {
        return {
            code: 200,
            msg: '操作成功',
            data: [
                {
                    "id": 1,
                    "version": "v1.0.0",
                    "title": "基础功能开发完成",
                    "time": "2021-01-01",
                    "content": []
                },
                {
                    "id": 2,
                    "version": "v1.0.1",
                    "title": "侧边栏优化",
                    "time": "2021-01-01",
                    "content": [
                        "修复了侧边栏折叠动画异常",
                        "新增了标签栏刷新按钮",
                        "修复了水平混合布局模式下侧边栏溢出问题"
                    ]
                },
                {
                    "id": 3,
                    "version": "v1.0.2",
                    "title": "布局优化",
                    "time": "2021-01-01",
                    "content": [
                        "修改了异常页的位置",
                        "添加了一些基础页面",
                        "修改了styles的位置",
                        "修复了水平布局模式下顶栏溢出问题",
                        "修改了工具栏组件位置",
                        "给LangSelect组件添加了选中时的钩子"
                    ]
                },
                {
                    "id": 4,
                    "version": "v1.0.3",
                    "title": "路由增强",
                    "time": "2021-01-01",
                    "content": [
                        "给路由添加了图标和标题",
                        "新增了打印按钮"
                    ]
                },
                {
                    "id": 5,
                    "version": "v1.0.4",
                    "title": "界面优化",
                    "time": "2021-01-01",
                    "content": [
                        "取消了打印按钮",
                        "新增了置顶按钮",
                        "优化了i18n的数据",
                        "修改了登录背景图"
                    ]
                },
                {
                    "id": 6,
                    "version": "v1.0.5",
                    "title": "加载优化",
                    "time": "2021-01-01",
                    "content": [
                        "修改优化了首加载的动画",
                        "修改了404插画"
                    ]
                },
                {
                    "id": 7,
                    "version": "v1.0.6",
                    "title": "多语言与主题增强",
                    "time": "2021-01-01",
                    "content": [
                        "登录页面新增了语言切换",
                        "登录页背景图会随着主题变化",
                        "新增灰色模式",
                        "新增了 系统工具-代码生成",
                        "新增了深色侧边栏",
                        "优化了SettingItem组件"
                    ]
                },
                {
                    "id": 8,
                    "version": "v1.0.7",
                    "title": "组件重构",
                    "time": "2021-01-01",
                    "content": [
                        "调整了views目录下的页面模块位置",
                        "AppTable组件名字修改为EasyTable",
                        "AppDialog组件名字修改为EasyDialog",
                        "ColorPick组件名字修改为EasyColorPick",
                        "新增了QueryForm组件"
                    ]
                },
                {
                    "id": 9,
                    "version": "v1.0.8",
                    "title": "功能增强",
                    "time": "2021-01-01",
                    "content": [
                        "新增了EasyButton组件",
                        "安装了@intlify/vue-i18n-loader插件",
                        "新增了路由模式选择",
                        "验证码组件三合一"
                    ]
                },
                {
                    "id": 10,
                    "version": "v1.0.9",
                    "title": "组件优化",
                    "time": "2021-01-01",
                    "content": [
                        "优化了RightToolbar组件",
                        "优化了EasyTable组件"
                    ]
                },
                {
                    "id": 11,
                    "version": "v1.1.0",
                    "title": "工具函数增强",
                    "time": "2021-01-01",
                    "content": [
                        "utils新增了removeIf函数",
                        "修复了EasyTable组件的bug",
                        "优化了IconSelect组件"
                    ]
                },
                {
                    "id": 12,
                    "version": "v1.1.1",
                    "title": "图标与路由优化",
                    "time": "2021-01-01",
                    "content": [
                        "更换了所有系统图标",
                        "升级了SvgIcon组件",
                        "修改了 search.svg",
                        "根目录添加了 CHANGELOG.md 文件",
                        "修改了 route.meta.title 的值",
                        "删除了 router 中的 user 路由",
                        "菜单管理添加了拖拽按钮"
                    ]
                },
                {
                    "id": 13,
                    "version": "v1.1.2",
                    "title": "表格功能升级",
                    "time": "2021-01-01",
                    "content": [
                        "添加了table插件",
                        "升级了EasyTable组件"
                    ]
                },
                {
                    "id": 14,
                    "version": "v1.1.3",
                    "title": "工具与Mock增强",
                    "time": "2021-01-01",
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
                },
                {
                    "id": 15,
                    "version": "v1.1.4",
                    "title": "表单设计新增",
                    "time": "2021-01-01",
                    "content": [
                        "系统工具添加了表单设计模块",
                        "添加了SlotRenderer组件",
                        "优化了EasyTable组件（在模板中渲染列）",
                        "添加了EasyForm组件"
                    ]
                },
                {
                    "id": 16,
                    "version": "v1.1.5",
                    "title": "开发体验优化",
                    "time": "2021-01-01",
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
                },
                {
                    "id": 17,
                    "version": "v1.1.6",
                    "title": "功能精简与优化",
                    "time": "2021-01-01",
                    "content": [
                        "删除了水印组件",
                        "移动了路由守卫的位置",
                        "添加了面包屑动画",
                        "优化了EasyTable组件",
                        "添加了字典管理"
                    ]
                }
            ]
        }
    }
}]