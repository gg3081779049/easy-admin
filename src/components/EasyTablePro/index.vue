<template>
    <div>
        <!-- 查询条件 -->
        <query-form v-model="query.form" v-bind="query.props" :show="query.show" @search="getList">
            <slot name="query" v-bind="scope" />
        </query-form>
        <div class="flex-column g14 p14">
            <div class="flex">
                <slot name="toolbar" v-bind="scope">
                    <!-- 默认的按钮 -->
                    <easy-button type="primary" i="plus" t="common.add" size="small" plain @click="openDialog" />
                    <easy-button type="danger" i="delete" t="common.delete" size="small" plain @click="deleteItems(table.selections)" />
                    <table-toolbar v-model:show-search="query.show" v-model:columns="table.columns" @refresh="getList" />
                </slot>
            </div>
            <!-- 表格 -->
            <easy-table ref="table-ref" :data="table.data" v-model:columns="table.columns" v-bind="table.props" 
                v-loading="table.loading" @selection-change="handleSelect">
                <slot name="table" v-bind="scope" />
            </easy-table>
            <!-- 分页 -->
            <pagination v-model:currentPage="pagination.currentPage" v-model:pageSize="pagination.pageSize"
                :total="pagination.total" @change="getList" />
        </div>
        <!-- 弹窗 -->
        <easy-dialog :title="dialogTitle" :width="dialog.width" v-model="dialog.open" :loading="dialog.loading"
            @closed="$refs['dialog-form']?.resetFields()" @confirm="confirm">
            <easy-form ref="dialog-form" v-model="dialog.form" v-bind="dialog.props">
                <slot name="dialog" v-bind="scope" />
            </easy-form>
        </easy-dialog>
    </div>
</template>

<script>
import { omit } from 'lodash'

export default {
    name: 'EasyTablePro',
    props: {
        config: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            api: {},
            query: {
                show: true,
                form: {},
                props: {}
            },
            table: {
                loading: false,
                columns: [],
                data: [],
                selections: [],
                props: {}
            },
            pagination: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
            dialog: {
                open: false,
                isEdit: false,
                loading: false,
                title: '',
                width: '600px',
                form: {},
                props: {},
            }
        }
    },
    computed: {
        dialogTitle() {
            return `${this.$t(this.dialog.isEdit ? 'common.update' : 'common.add')}${this.dialog.title}`
        },
        scope() {
            return {
                query: this.query,
                table: this.table,
                dialog: this.dialog,
                openDialog: this.openDialog,
                getList: this.getList,
                deleteItems: this.deleteItems,
                printTable: this.printTable
            }
        }
    },
    created() {
        this.api = this.config.api || {}
        // 查询
        this.query.show = this.config.query?.show ?? true
        this.query.items = this.config.query?.items || []
        this.query.form = this.config.query?.form || {}
        this.query.props = omit(this.config.query || {}, ['show', 'form'])
        // 表格
        this.table.columns.push(...(this.config.dialog?.columns || []))
        this.table.props = omit(this.config.table || {}, ['loading', 'columns', 'data', 'selections'])
        this.table.props.rowKey = this.table.props.rowKey || 'id'
        // 分页
        this.pagination.currentPage = this.config.pagination?.currentPage || 1
        this.pagination.pageSize = this.config.pagination?.pageSize || 10
        this.pagination.total = this.config.pagination?.total || 0
        // 弹窗
        this.dialog.title = this.config.dialog?.title || ''
        this.dialog.width = this.config.dialog?.width || '600px'
        this.dialog.form = this.config.dialog?.form || {}
        this.dialog.props = omit(this.config.dialog || {}, ['title', 'width', 'form'])
        // 初始化表格
        this.getList()
    },
    methods: {
        async getList() {
            this.table.loading = true
            let { currentPage, pageSize } = this.pagination
            let { data } = await this.api.list({ query: this.query.form, currentPage, pageSize })
            this.table.data = data.list
            this.pagination.total = data.total
            this.table.loading = false
        },
        async deleteItems(items, msg) {
            let rowKey = this.table.props.rowKey
            let valid = items?.[rowKey] !== undefined || Array.isArray(items)
            let rows = [].concat(valid ? items : this.table.selections)
            if (rows.length) {
                let ids = rows.map(item => item[rowKey])
                let message = typeof msg === 'function' ? msg(rows) : msg
                try {
                    await this.$modal.confirm.warning(message || `是否确认删除数据吗?`)
                    await this.api.del(ids)
                    await this.getList()
                    this.$modal.message.success(this.$t('message.deleteSuccess'))
                } catch {}
            } else {
                this.$modal.message.warning('请选择要删除的数据')
            }
        },
        async openDialog(row) {
            let rowKey = this.table.props.rowKey
            this.dialog.isEdit = Boolean(row?.[rowKey])
            this.dialog.open = true
            this.dialog.loading = true
            this.$refs['dialog-form']?.resetFields()
            await this.$attrs['onOpenedDialog']?.(row)
            // 编辑时获取数据
            if (this.dialog.isEdit) {
                let { data } = await this.api.get(row[rowKey])
                this.dialog.form = data
            }
            this.dialog.loading = false
        },
        handleSelect(selections) {
            this.table.selections = selections
        },
        confirm() {
            this.$refs['dialog-form'].validate(async valid => {
                if (valid) {
                    let action = this.dialog.isEdit ? 'update' : 'add'
                    await this.api[action]?.(this.dialog.form)
                    this.$modal.message.success(this.$t(`message.${action}Success`))
                    this.getList()
                }
            })
        },
        importTable(file) {

        },
        exportTable() {

        },
        printTable() {
            this.$refs['table-ref'].print()
        },
    }
}
</script>