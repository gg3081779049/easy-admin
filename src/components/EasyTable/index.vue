<template>
    <el-table class="easy-table" :tooltip-options="{ showAfter: 600 }" border @selection-change="handleSelect">
        <template v-for="(column, index) in columns" :key="index">
            <el-table-column v-bind="{ ...defaultTableColumn, ...column }" v-if="!column.hidden">
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
import { omit } from 'lodash'

import EasyRenderer from '@/components/EasyRenderer'

export default {
    name: 'EasyTable',
    components: { EasyRenderer },
    props: {
        columns: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            columnsJson: JSON.stringify(this.columns),
            selections: [],
            defaultTableColumn: {
                'align': 'center',
                'show-overflow-tooltip': ''
            }
        }
    },
    created() {
        let slots = this.$slots.default?.() || []
        if (slots[0]?.type?.description === 'v-fgt') slots = slots[0].children
        // 获取插槽里的列
        let slotsMap = slots.map(({ props, children }) => ({ ...props, ...omit(children, ['_']) }))
        // 添加插槽里的列
        this.columns.unshift(...slotsMap)
    },
    unmounted() {
        this.columns.splice(0, this.columns.length, ...JSON.parse(this.columnsJson))
    },
    methods: {
        handleSelect(selections) {
            this.selections = selections
        },
        print(options) {
            let { isHead = true, isSelected = true } = options || {}
            let data = isSelected && this.selections.length ? this.selections : this.$attrs.data
            let columns = this.columns.filter(column => !column.hidden && column.noPrint !== true)
            printTable(data, columns, { isHead })
        }
    }
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