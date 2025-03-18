<template>
    <el-container>
        <el-header v-show="!tabFullscreen">
            <Navbar>
                <SystemLogo class="logo-container" />
                <Menu :data="treeRoutes.find(item => item.path === $route.path.split('/')[1])?.children"
                    :collapse="false" mode="horizontal">
                    <template #default="{ meta }">
                        <svg-icon class="menu-icon" :icon="meta.icon" />
                        <span>{{ meta.title }}</span>
                    </template>
                </Menu>
            </Navbar>
        </el-header>
        <el-container>
            <el-aside :style="{ height: `calc(100vh - ${headerHeight}px)` }" v-show="!tabFullscreen">
                <Sidebar :style="{ width: `${collapse ? 54 : 90}px` }">
                    <el-menu class="sidebar-menu" :default-active="$route.path.split('/')[1]">
                        <el-menu-item v-for="item in treeRoutes" :key="item.path" :index="item.path"
                            @click="handleClick(item)">
                            <svg-icon :icon="item.meta.icon" />
                            <span v-if="!collapse">{{ item.meta.title }}</span>
                        </el-menu-item>
                    </el-menu>
                    <template #footer>
                        <div class="sidebar-footer-container">
                            <Hamburger />
                        </div>
                    </template>
                </Sidebar>
            </el-aside>
            <el-main>
                <Tabs v-if="showTabs && fixedHeader" />
                <el-scrollbar :style="{ height: `calc(100vh - ${headerHeight + !tabFullscreen * tabsHeight}px)` }">
                    <Tabs v-if="showTabs && !fixedHeader" />
                    <AppMain />
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { useAppStore } from '@/store/modules/app'
import { useRouteStore } from '@/store/modules/route'
import { useSettingsStore } from '@/store/modules/settings'
import { mapState } from 'pinia'
import { isExternal } from '@/utils/validate'
import { findFirstLeafNode } from '@/utils/tree'

import Sidebar from "@/layout/components/Sidebar"
import SystemLogo from '@/components/SystemLogo'
import Menu from "@/layout/components/Menu"
import Navbar from '@/layout/components/Navbar'
import Tabs from "@/layout/components/Tabs"
import AppMain from "@/layout/components/AppMain"
import Hamburger from "@/components/Hamburger"

export default {
    name: 'HorizontalMix',
    components: { Sidebar, SystemLogo, Menu, Navbar, Tabs, AppMain, Hamburger },
    computed: {
        ...mapState(useAppStore, ["collapse", "tabFullscreen"]),
        ...mapState(useRouteStore, ["treeRoutes"]),
        ...mapState(useSettingsStore, ["headerHeight", "fixedHeader", "showTabs", "tabsHeight"])
    },
    methods: {
        // 查找第一个叶子节点
        findFirstLeafNode,
        handleClick(route) {
            route = route.hasOwnProperty('children') ? this.findFirstLeafNode(this.treeRoutes.find(item => item.path === route.path).children) : route
            if (isExternal(route.path)) {
                window.open(route.path)
            } else {
                this.$router.push({
                    path: `/${route.path}`,
                    query: route.query
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.el-container {
    width: 100vw;
    height: 100vh;
    background: var(--base-bg);

    .el-header {
        height: auto;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
        z-index: 9;

        .logo-container {
            height: 100%;
            margin-left: 30px;
            margin-right: 30px;
            flex-shrink: 0;
        }

        .el-menu {
            width: 100%;
            height: 100%;
            border-bottom: none;

            .is-active {
                &.el-sub-menu>.el-sub-menu__title {
                    color: var(--sidebar-text-color-active);

                    svg {
                        color: var(--sidebar-text-color-active);
                    }
                }

                &.el-menu-item {
                    svg {
                        color: var(--sidebar-text-color-active);
                    }
                }
            }

            .el-menu-item,
            .el-sub-menu {
                &:hover svg {
                    color: var(--sidebar-text-color-active);
                }
            }
        }

        .menu-icon {
            color: var(--sidebar-text-color);
        }
    }

    .el-container {
        .el-aside {
            width: auto;
            box-shadow: 1px 0 6px rgba(0, 0, 0, 0.1);
            -webkit-box-shadow: 1px 0 6px rgba(0, 0, 0, 0.1);
            z-index: 8;

            .sidebar-menu {
                .el-menu-item {
                    margin-bottom: 6px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 4px;

                    span {
                        line-height: normal;
                    }
                }
            }

            .sidebar-footer-container {
                width: 100%;
                height: 50px;
                border-top: 1px solid #333;
                display: flex;
                justify-content: center;
                align-items: center;

                svg {
                    color: var(--sidebar-text-color);
                }
            }
        }
    }
}
</style>