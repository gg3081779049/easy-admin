<template>
    <div class="app-card">
        <!-- 查询条件 -->
        <query-form v-model="query.form" :items="query.items" :show="query.show" @search="getList">
            <slot name="query" v-bind="scope" />
        </query-form>
        <div class="flex-column g14 p14">
            <div class="flex">
                <slot name="toolbar" v-bind="scope" />
            </div>
            <!-- 表格 -->
            <easy-table ref="table-ref" :data="table.data" v-model:columns="table.columns" v-loading="table.loading"
                @selection-change="handleSelect">
                <slot name="table" v-bind="scope" />
            </easy-table>
            <!-- 分页 -->
            <pagination v-model:currentPage="pagination.currentPage" v-model:pageSize="pagination.pageSize"
                :total="pagination.total" @change="getList" />
        </div>
        <!-- 弹窗 -->
        <easy-dialog :title="dialogTitle" :width="dialog.width" v-model="dialog.open" :loading="dialog.loading"
            @closed="closeDialog" @confirm="confirm">
            <el-form ref="dialog-form" :model="dialog.form" :rules="dialog.rules">
                <slot name="dialog" v-bind="scope" />
            </el-form>
        </easy-dialog>
    </div>
</template>

<script>
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
                items: [],
                form: {}
            },
            table: {
                loading: false,
                columns: [],
                data: [],
                selections: []
            },
            pagination: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
            dialog: {
                open: false,
                loading: false,
                isEdit: false,
                title: '',
                width: '600px',
                items: [],
                form: {},
                rules: {},
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
        this.query.items = this.config.query?.items || []
        this.query.form = this.config.query?.form || {}
        this.table.columns.push(...(this.config.dialog?.columns || []))
        this.dialog.title = this.config.dialog?.title || ''
        this.dialog.width = this.config.dialog?.width || '600px'
        this.dialog.items = this.config.dialog?.items || []
        this.dialog.form = this.config.dialog?.form || {}
        this.dialog.rules = this.config.dialog?.rules || {}
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
            let rows = items?.id !== undefined || Array.isArray(items) ? items : this.table.selections
            try {
                let ids = [].concat(rows).map(item => item.id)
                await this.$modal.confirm.warning(msg || `是否确认删除数据吗?`)
                await this.api.del(ids)
            } catch { }
        },
        async openDialog(row) {
            if (row === undefined) return
            this.dialog.isEdit = Boolean(row?.id)
            this.dialog.open = true
            this.$refs['dialog-form']?.resetFields()
            if (row?.id) {
                this.dialog.loading = true
                let { data } = await this.api.get(row.id)
                this.dialog.form = data
                this.dialog.loading = false
            }
        },
        closeDialog() {
            this.$refs['dialog-form']?.resetFields()
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