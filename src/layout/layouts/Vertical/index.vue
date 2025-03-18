<template>
    <el-container>
        <el-aside v-show="!tabFullscreen">
            <Sidebar :style="{ width: `${collapse ? 54 : sidebarWidth}px` }">
                <template #header>
                    <SystemLogo class="logo-container" :collapse="collapse" />
                </template>
                <Menu :data="treeRoutes">
                    <template #default="{ meta }">
                        <div>
                            <svg-icon class="menu-icon" :icon="meta.icon" />
                        </div>
                        <span>{{ meta.title }}</span>
                    </template>
                </Menu>
                <template #footer>
                    <div class="sidebar-footer-container">
                        <Hamburger />
                    </div>
                </template>
            </Sidebar>
        </el-aside>
        <el-main>
            <div v-if="fixedHeader">
                <Navbar v-show="!tabFullscreen">
                    <Hamburger style="margin: 0 15px" />
                    <Breadcrumb v-if="showBreadcrumb" />
                </Navbar>
                <Tabs v-if="showTabs" />
            </div>
            <el-scrollbar class="main-scrollbar">
                <div v-if="!fixedHeader">
                    <Navbar v-show="!tabFullscreen">
                        <Hamburger style="margin: 0 15px" />
                        <Breadcrumb v-if="showBreadcrumb" />
                    </Navbar>
                    <Tabs v-if="showTabs" />
                </div>
                <AppMain />
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script>
import { useAppStore } from '@/store/modules/app'
import { useRouteStore } from '@/store/modules/route'
import { useSettingsStore } from '@/store/modules/settings'
import { mapState } from 'pinia'

import Sidebar from "@/layout/components/Sidebar"
import SystemLogo from '@/components/SystemLogo'
import Menu from "@/layout/components/Menu"
import Navbar from "@/layout/components/Navbar"
import Tabs from "@/layout/components/Tabs"
import AppMain from "@/layout/components/AppMain"
import Hamburger from "@/components/Hamburger"
import Breadcrumb from "@/components/Breadcrumb"

export default {
    name: 'Vertical',
    components: { Sidebar, SystemLogo, Menu, Navbar, Tabs, AppMain, Hamburger, Breadcrumb },
    computed: {
        ...mapState(useAppStore, ["collapse", "tabFullscreen"]),
        ...mapState(useRouteStore, ["treeRoutes"]),
        ...mapState(useSettingsStore, ["fixedHeader", "showTabs", "showBreadcrumb", "sidebarWidth"]),
    }
}
</script>

<style lang="scss" scoped>
.el-container {
    width: 100vw;
    height: 100vh;
    background: var(--base-bg);

    .el-aside {
        width: auto;
        box-shadow: 1px 0 6px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: 1px 0 6px rgba(0, 0, 0, 0.1);
        z-index: 9;

        .logo-container {
            width: 100%;
            height: 50px;
        }

        .sidebar-footer-container {
            height: 50px;
            padding: 0 16px;
            border-top: 1px solid rgba(128, 128, 128, 0.5);
            display: flex;
            align-items: center;

            svg {
                color: var(--sidebar-text-color);
            }
        }

        .menu-icon {
            color: var(--sidebar-text-color);
        }
    }

    .el-main {
        display: flex;
        flex-direction: column;
    }
}
</style>