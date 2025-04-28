<template>
    <div class="m20">
        <div class="about app-card">
            <h4 class="title">项目介绍</h4>
            <p class="content">
                <el-link type="primary" href="/home" style="text-indent:0">Easy-Admin</el-link>
                是一款专注于用户体验和视觉设计的高颜值后台管理系统模版，
                使用了 Vue3, Vue-Cli, Pinia 和 Element-Plus 等前端技术。
                它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。
                是一个快速学习前沿技术的最佳实践。
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
            <el-descriptions :column="3" border>
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
import { getChangeLog } from '@/api/modules/about'

export default {
    name: 'About',
    data() {
        return {
            info: {
                name: 'Easy-Admin',
                version: '1.0.0',
                author: 'gg3081779049@qq.com',
                license: 'MIT',
                buildTime: '2021-09-01',
                description: 'Easy-Admin is a free and open source admin template based on Vue.js and Element UI.',
                github: 'https://github.com/gg3081779049/easy-admin.git',
                preview: 'https://github.com/Jason-Jerry/easy-admin'
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
                "version": "^2.7.2"
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
                "name": "vue-meta",
                "version": "^3.0.0-alpha.8"
            }, {
                "name": "vue-router",
                "version": "^4.3.2"
            }],
            changeLog: [],
        }
    },
    created() {
        this.getChangeLog()
    },
    methods: {
        getChangeLog() {
            getChangeLog().then(res => {
                this.changeLog = res.data.reverse()
            })
        }
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