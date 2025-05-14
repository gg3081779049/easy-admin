<template>
    <easy-dialog ref="dict-data-dialog" v-model="open" width="800" :title="title" :show-footer="false" destroy-on-close>
        <easy-table-pro :config="config">
            <template #toolbar="{ table, openDialog, getList, deleteItems, printTable }">
                <easy-button type="primary" i="plus" t="common.add" size="small" plain @click="openDialog" />
                <easy-button type="danger" i="delete" t="common.delete" size="small" plain @click="deleteItems(table.selections)" />
                <table-toolbar v-model:columns="table.columns" @refresh="getList" />
            </template>
            <template #table="{ openDialog, deleteItems }">
                <el-table-column type="selection" width="40" />
                <el-table-column prop="id" label="编号" width="60" />
                <el-table-column prop="label" label="字典标签" />
                <el-table-column prop="value" label="字典值" />
                <el-table-column prop="order" label="排序" />
                <el-table-column prop="status" label="字典状态" width="100">
                    <template #default="{ row: { status } }">
                        <el-tag :type="status === '1'? 'danger' :'success'">
                            {{ status === '1'? '停用' : '正常' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createBy" label="创建者" width="100" hidden />
                <el-table-column prop="createTime" label="创建时间" 
                    :formatter="row => $parseTime(row.createTime)" width="180" hidden />
                <el-table-column prop="updateBy" label="更新者" width="100" hidden />
                <el-table-column prop="updateTime" label="更新时间" 
                    :formatter="row => $parseTime(row.createTime)" width="180" hidden />
                <el-table-column prop="remark" label="备注" hidden />
                <el-table-column :label="$t('common.operation')" width="200" fixed="right">
                    <template #default="{ row }">
                        <easy-button type="primary" i="edit" t="common.update" link @click="openDialog(row)" />
                        <easy-button type="primary" i="delete" t="common.delete" link @click="deleteItems(row)" />
                    </template>
                </el-table-column>
            </template>
            <template #dialog="{ dialog }">
                <el-form-item prop="label" label="数据标签">
                    <el-input v-model="dialog.form.label" placeholder="请输入数据标签" />
                </el-form-item>
                <el-form-item prop="value" label="数据键值">
                    <el-input v-model="dialog.form.value" placeholder="请输入数据键值" />
                </el-form-item>
                <el-form-item prop="order" label="排序">
                    <el-input-number v-model="dialog.form.order" placeholder="请输入排序" />
                </el-form-item>
                <el-form-item prop="status" label="状态">
                    <el-radio-group v-model="dialog.form.status">
                        <el-radio value="0">正常</el-radio>
                        <el-radio value="1">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="remark" label="备注">
                    <el-input type="textarea" v-model="dialog.form.remark" />
                </el-form-item>
            </template>
        </easy-table-pro>
    </easy-dialog>
</template>

<script>
import { listDictData, getDictData, addDictData, updateDictData, delDictData } from '@/api/modules/system/dict'

export default {
    name: 'DictDataDialog',
    data() {
        return {
            title: '字典数据',
            open: false,
            config: {
                api: {
                    list: listDictData,
                    get: getDictData,
                    add: addDictData,
                    update: updateDictData,
                    del: delDictData
                },
                query: {
                    show: false,
                    form: {
                        dictId: ''
                    }
                },
                dialog: {
                    form: {
                        dictId: '',
                        label: '',
                        value: '',
                        order: 0,
                        status: '0',
                        remark: '',
                    },
                    labelWidth: '6em',
                    rules: {}
                }
            }
        }
    },
    methods: {
        openDialog(row) {
            this.title = `字典数据 <${row.name}>`
            this.open = true
            this.config.query.form.dictId = row.id
            this.config.dialog.form.dictId = row.id
        }
    }
}
</script>