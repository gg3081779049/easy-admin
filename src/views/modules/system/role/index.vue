<template>
    <div class="m20 app-card">
        <easy-table-pro :config="config" @opened-dialog="onOpenedDialog">
            <template #query="{ query, getList }">
                <el-form-item prop="name" label="角色名称">
                    <el-input v-model="query.form.name" placeholder="请输入角色名称" @keyup.enter="getList" />
                </el-form-item>
                <el-form-item prop="status" label="状态">
                    <el-select v-model="query.form.status" placeholder="请选择角色状态">
                        <el-option label="正常" value="0" />
                        <el-option label="停用" value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="createTime" label="创建时间">
                    <el-date-picker v-model="query.form.createTime" type="daterange" 
                    start-placeholder="开始日期" end-placeholder="结束日期" />
                </el-form-item>
            </template>
            <template #table="{ openDialog, deleteItems }">
                <el-table-column type="selection" width="40" />
                <el-table-column prop="id" label="编号" width="60" />
                <el-table-column prop="name" label="角色名称" />
                <el-table-column prop="status" label="状态" width="100">
                    <template #default="{ row }">
                        <el-tag :type="row.status ? 'success' : 'danger'">
                            {{ row.status ? '正常' : '停用' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createBy" label="创建人" hidden />
                <el-table-column prop="createTime" label="创建时间" :formatter="row => $parseTime(row.createTime)" />
                <el-table-column prop="remark" label="备注" hidden />
                <el-table-column :label="$t('common.operation')" width="200" fixed="right">
                    <template #default="{ row }">
                        <easy-button type="primary" i="edit" t="common.update" link @click="openDialog(row)" />
                        <easy-button type="primary" i="delete" t="common.delete" link @click="deleteItems(row)" />
                    </template>
                </el-table-column>
            </template>
            <template #dialog="{ dialog }">
                <el-form-item prop="name" label="角色名称">
                    <el-input v-model="dialog.form.name" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item prop="status" label="状态">
                    <el-radio-group v-model="dialog.form.status">
                        <el-radio value="0">正常</el-radio>
                        <el-radio value="1">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="remark" label="备注">
                    <el-input type="textarea" v-model="dialog.form.remark" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item label="菜单权限">
                    <el-checkbox v-model="selectAll" @change="handleSelectAll">全选/全不选</el-checkbox>
                    <el-checkbox v-model="expandAll" @change="handleExpandAll">展开/折叠</el-checkbox>
                    <el-checkbox v-model="noCheckStrictly">父子联动</el-checkbox>
                    <el-tree ref="menu" :data="menuTree" class="menu-tree" node-key="id" :check-strictly="!noCheckStrictly"
                        :expand-on-click-node="false" :default-checked-keys="dialog.form.menuIds" show-checkbox
                        @check="(_, binding) => dialog.form.menuIds = binding.checkedKeys" />
                </el-form-item>
            </template>
        </easy-table-pro>
    </div>
</template>

<i18n locale="en" src="./locales/en.json"></i18n>
<i18n locale="zh" src="./locales/zh.json"></i18n>

<script>
import { list, get, add, update, del } from '@/api/modules/system/role'
import { list as listMenu } from '@/api/modules/system/menu'
import { arrayToTree } from '@/utils/tree'

export default {
    name: 'Role',
    data() {
        return {
            // 全选/全不选
            selectAll: false,
            // 展开/折叠
            expandAll: false,
            // 父子联动
            noCheckStrictly: true,
            menuTree: [],
            config: {
                api: { list, get, add, update, del },
                query: {
                    form: {
                        name: '',
                        status: '',
                        createTime: ''
                    }
                },
                dialog: {
                    title: '角色',
                    form: {
                        id: '',
                        name: '',
                        status: '',
                        remark: '',
                        menuIds: []
                    },
                    labelWidth: '6em',
                    rules: {}
                }
            }
        }
    },
    methods: {
        async onOpenedDialog() {
            const { data: { list } } = await listMenu()
            this.menuTree = arrayToTree(list, ({ id, title, icon, type, disabled, children }) => {
                return { id, label: title, icon, type, disabled, children }
            })
        },
        handleSelectAll(val) {
            this.$refs['menu'].setCheckedNodes(val ? this.menuTree : [])
        },
        handleExpandAll(val) {
            for (const node of this.menuTree) {
                this.$refs['menu'].store.nodesMap[node.id].expanded = val
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.menu-tree {
    width: 100%;
    padding: 4px 0;
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
}
</style>