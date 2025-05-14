<template>
    <el-table class="easy-table" :data="data" :tooltip-options="{ showAfter: 600 }" border
        :row-key="rowKey" :expand-row-keys="expandRowKeys"
        @expand-change="handleExpandChange"
        @selection-change="handleSelect">
        <template v-for="(column, index) in columns" :key="index">
            <el-table-column v-bind="{ ...defaultTableColumn, ...column }" v-if="!column.hidden && column.hidden !== ''">
                <template #default="slotProps">
                    <easy-renderer v-if="column['default']" :items="column['default']" :item-props="slotProps" />
                </template>
                <template #header="slotProps">
                    <easy-renderer v-if="column['header']" :items="column['header']" :item-props="slotProps" />
                </template>
                <template #filter-icon="slotProps">
                    <easy-renderer v-if="column['filter-icon']" :items="column['filter-icon']" :item-props="slotProps" />
                </template>
            </el-table-column>
        </template>
        <template #append>
            <slot name="append" />
        </template>
        <template #empty>
            <slot name="empty" />
        </template>
    </el-table>
</template>

<script>
import { printTable } from "@/utils/print"
import { add } from '@/utils'
import { remove, omit } from 'lodash'
import { useDraggable } from "vue-draggable-plus"

import EasyRenderer from '@/components/EasyRenderer'

export default {
    name: 'EasyTable',
    components: { EasyRenderer },
    props: {
        columns: {
            type: Array,
            default: []
        },
        data: {
            type: Array,
            default: []
        },
        rowKey: {
            type: String,
            default: 'id'
        },
        expandRowKeys: {
            type: Array,
            default: []
        },
        dragOptions: {
            type: Object,
            default: {
                disabled: true,
            }
        }
    },
    data() {
        return {
            columnsJson: JSON.stringify(this.columns),
            selections: [],
            draggableInstance: null,
            defaultTableColumn: {
                'align': 'center',
                'show-overflow-tooltip': ''
            }
        }
    },
    created() {
        // 获取插槽里的列
        let slots = this.$slots.default?.() || []
        if (slots[0]?.type?.description === 'v-fgt') slots = slots[0].children
        let slotsMap = slots.map(({ props, children }) => ({ ...props, ...omit(children, ['_']) }))
        // 添加插槽里的列
        this.columns.unshift(...slotsMap)
    },
    mounted() {
        let el = this.$el.querySelector(".el-table__body-wrapper table > tbody")
        if (el) {
            this.draggableInstance = useDraggable(el, this.data, this.dragOptions)
            this.draggableInstance.start()
        }
    },
    unmounted() {
        this.columns.splice(0, this.columns.length, ...JSON.parse(this.columnsJson))
    },
    methods: {
        handleExpandChange(row, expandedRows) {
            if (this.rowKey) {
                if (expandedRows) {
                    add(this.expandRowKeys, `${row[this.rowKey]}`)
                } else {
                    remove(this.expandRowKeys, id => id === `${row[this.rowKey]}`)
                }
            }
        },
        handleSelect(selections) {
            this.selections = selections
        },
        print(options) {
            let { isHead = true, isSelected = true } = options || {}
            let data = isSelected && this.selections.length ? this.selections : this.$attrs.data
            let columns = this.columns.filter(column => !column.hidden && column.noPrint !== true)
            printTable(data, columns, { isHead })
        }
    },
    watch: {
        dragOptions: {
            deep: true,
            handler(options) {
                if (this.draggableInstance) {
                    Object.entries(options).forEach(([key, value]) => {
                        this.draggableInstance.option(key, value)
                    })
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.easy-table {
    width: auto;

    :deep(.el-table__header-wrapper),
    :deep(.el-table__fixed-header-wrapper) {
        th {
            word-break: break-word;
            background-color: var(--el-fill-color-lighter);
            height: 40px;
            font-size: 13px;
        }
    }
}
</style>