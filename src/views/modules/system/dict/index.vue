<template>
    <easy-table-pro class="m20" :config="config">
        <template #query="{ query, getList }">
            <el-form-item prop="name" label="字典名称">
                <el-input v-model="query.form.name" placeholder="请输入名称" @keyup.enter="getList" />
            </el-form-item>
            <el-form-item prop="key" label="键名">
                <el-input v-model="query.form.key" placeholder="请输入字典键名" @keyup.enter="getList" />
            </el-form-item>
            <el-form-item prop="status" label="状态">
                <el-select v-model="query.form.status" placeholder="请选择字典状态">
                    <el-option label="正常" value="0" />
                    <el-option label="停用" value="1" />
                </el-select>
            </el-form-item>
        </template>
        <template #toolbar="{ query, table, openDialog, getList, deleteItems, printTable }">
            <easy-button type="primary" i="plus" :t="$t('common.add')" size="small" plain @click="openDialog" />
            <easy-button type="danger" i="delete" :t="$t('common.delete')" size="small" plain @click="deleteItems(table.selections)" />
            <easy-button type="info" i="edit" :t="$t('common.update')" size="small" plain @click="openDialog(table.selections[0])" />
            <table-toolbar v-model:show-search="query.show" v-model:columns="table.columns" @print="printTable" @refresh="getList" />
        </template>
        <template #table="{ openDialog, deleteItems }">
            <el-table-column type="selection" width="40" />
            <el-table-column prop="name" label="字典名称" />
            <el-table-column prop="key" label="字典键名" min-width="160">
                <template #default="{ row }">
                    <el-button type="primary" link>{{ row.key }}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="字典状态" width="100">
                <template #default="{ row: { status } }">
                    <el-tag :type="status === '1' ? 'danger' : 'success'">
                        {{ status === '1' ? '停用' : '正常' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createBy" label="创建者" width="100" />
            <el-table-column prop="createTime" label="创建时间" width="180">
                <template #default="{ row }">
                    {{ $parseTime(row.updateTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="updateBy" label="更新者" width="100" />
            <el-table-column prop="updateTime" label="更新时间" width="180">
                <template #default="{ row }">
                    {{ $parseTime(row.updateTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" />
            <el-table-column label="操作" width="200">
                <template #default="{ row }">
                    <easy-button type="primary" i="edit" :t="$t('common.update')" link @click="openDialog(row)" />
                    <easy-button type="primary" i="delete" :t="$t('common.delete')" link @click="deleteItems(row)" />
                </template>
            </el-table-column>
        </template>
        <template #dialog="{ dialog }">
            <el-form-item label="字典名称" prop="name">
                <el-input v-model="dialog.form.name" placeholder="请输入字典名称" clearable />
            </el-form-item>
            <el-form-item label="字典键名" prop="key">
                <el-input v-model="dialog.form.key" placeholder="请输入字典键名" clearable />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="dialog.form.status">
                    <el-radio value="0">正常</el-radio>
                    <el-radio value="1">停用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="dialog.form.remark" type="textarea" placeholder="请输入备注" />
            </el-form-item>
        </template>
    </easy-table-pro>
</template>

<i18n locale="en" src="./locales/en.json"></i18n>
<i18n locale="zh" src="./locales/zh.json"></i18n>

<script>
import EasyTablePro from '@/components/EasyTablePro'
import { list, get, add, update, del } from '@/api/modules/system/dict'

export default {
    name: 'Dict',
    components: { EasyTablePro },
    data() {
        return {
            config: {
                api: { list, get, add, update, del },
                query: {
                    form: {
                        name: '',
                        key: '',
                        status: ''
                    }
                },
                dialog: {
                    title: '字典表',
                    width: '500px',
                    form: {
                        id: '',
                        name: '',
                        key: '',
                        status: '',
                        remark: ''
                    },
                    rules: {
                        name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
                        key: [{ required: true, message: '请输入字典键', trigger: 'blur' }]
                    }
                }
            }
        }
    }
}
</script>