<template>
  <div class="app-card m20">
    <!-- 查询条件 -->
    <query-form :model="query.form" :show="query.show" @search="getTree" @reset="resetQuery">
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="query.form.title" placeholder="请输入菜单名称" clearable @keyup.enter="getTree" />
      </el-form-item>
      <el-form-item label="路由名称" prop="path">
        <el-input v-model="query.form.path" placeholder="请输入路由名称" clearable @keyup.enter="getTree" />
      </el-form-item>
    </query-form>

    <div class="flex-column g14 p14">
      <div class="flex">
        <easy-button type="primary" i="plus" :t="$t('common.add')" size="small" plain @click="handleAdd" />
        <easy-button type="danger" i="delete" :t="$t('common.delete')" size="small" plain
          @click="handleDelete($refs['table-ref'].selections)" />
        <easy-button type="info" i="sort" :t="$t(isExpandAll ? 'toolTip.collapse' : 'toolTip.expand')" size="small"
          plain @click="expandChange" />
        <table-toolbar v-model:show-search="query.show" v-model:columns="columns" @refresh="getTree" />
      </div>
      <!-- 菜单表格 -->
      <VueDraggable :modelValue="tree" :animation="150" handle=".handle-drag" target=".el-table .el-table__body tbody"
        v-if="refreshTable" @end="onEnd">
        <easy-table ref="table-ref" v-loading="loading" :data="tree" row-key="id" :default-expand-all="isExpandAll"
          v-model:columns="columns">
          <el-table-column type="selection" width="40" />
          <el-table-column prop="title" label="菜单名称" width="160" align="left" />
          <el-table-column prop="icon" label="图标" width="100">
            <template #default="scope">
              <svg-icon :icon="scope.row.icon" />
            </template>
          </el-table-column>
          <el-table-column prop="path" label="路由名称" align="left" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row: { disabled, hidden } }">
              <el-tag :type="disabled ? 'danger' : hidden ? 'info' : 'success'" disable-transitions>
                {{ disabled ? '停用' : hidden ? '隐藏' : '正常' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200">
            <template #default="{ row: { createTime } }">
              <span>{{ $parseTime(new Date(createTime)) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template #default="scope">
              <easy-button type="primary" i="drag" class="handle-drag" :title="$t('common.drag')" v-if="!hasParams"
                link />
              <easy-button type="primary" i="plus" :t="$t('common.add')" link @click="handleAdd(scope.row)" />
              <easy-button type="primary" i="edit" :t="$t('common.update')" link @click="handleUpdate(scope.row)" />
              <easy-button type="primary" i="delete" :t="$t('common.delete')" link @click="handleDelete([scope.row])" />
            </template>
          </el-table-column>
        </easy-table>
      </VueDraggable>
    </div>
    <!-- 添加或修改菜单对话框 -->
    <easy-dialog v-model="dialog.open" :title="dialog.title" width="680px" @closed="cancel" @confirm="submitForm">
      <el-form ref="form" :model="dialog.form" :rules="dialog.rules" label-width="100px">
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="dialog.form.title" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单路由" prop="path">
          <el-input v-model="dialog.form.path" placeholder="请输入菜单路由" />
        </el-form-item>
        <el-form-item label="上级目录" prop="parentId">
          <el-tree-select v-model="dialog.form.parentId" :data="dialog.dirTree" placeholder="选择上级目录"
            :props="{ value: 'id', label: 'title', class: () => 'el-tree-select-node' }"
            :filter-node-method="(val, node) => node.hasChild && node.title.includes(val)" check-strictly filterable
            highlight-current>
            <template #default="{ data }">
              {{ data.title }}
              <span v-if="data.hasChild">({{ data.children?.length }})</span>
            </template>
          </el-tree-select>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <IconSelect v-model="dialog.form.icon" />
        </el-form-item>
        <div style="display:flex;flex-wrap:wrap">
          <el-form-item label="菜单类型" prop="hasChild" style="width: 50%">
            <el-radio-group v-model="dialog.form.hasChild" style="margin-left: 10px">
              <el-radio :value="true">目录</el-radio>
              <el-radio :value="false">菜单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="noCache" style="width: 50%">
            <template #label>
              <el-tooltip content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致" placement="top" :show-after="300">
                是否缓存
              </el-tooltip>
            </template>
            <el-radio-group v-model="dialog.form.noCache" style="margin-left: 10px">
              <el-radio :value="true">缓存</el-radio>
              <el-radio :value="false">不缓存</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="hidden" style="width: 50%">
            <template #label>
              <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top" :show-after="300">
                是否隐藏
              </el-tooltip>
            </template>
            <el-radio-group v-model="dialog.form.hidden" style="margin-left: 10px">
              <el-radio :value="true">隐藏</el-radio>
              <el-radio :value="false">不隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="disabled" style="width: 50%">
            <template #label>
              <el-tooltip content="选择停用则路由将不会出现在侧边栏，也不能被访问" placement="top" :show-after="300">
                菜单状态
              </el-tooltip>
            </template>
            <el-radio-group v-model="dialog.form.disabled" style="margin-left: 10px">
              <el-radio :value="false">正常</el-radio>
              <el-radio :value="true">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
    </easy-dialog>
  </div>
</template>

<i18n locale="en" src="./locales/en.json"></i18n>
<i18n locale="zh" src="./locales/zh.json"></i18n>

<script>
import { getList, getItem, addItem, deleteItem, updateItem, sortItem } from '@/api/modules/auth/menu'
import { arrayToTree } from '@/utils/tree'
import { VueDraggable } from 'vue-draggable-plus'

import IconSelect from '@/components/IconSelect'

export default {
  name: 'Menu',
  components: { VueDraggable, IconSelect },
  data() {
    return {
      // 搜索栏
      query: {
        show: true,
        form: {
          title: undefined,
          path: undefined
        }
      },

      // 遮罩层
      loading: true,
      // 列设置
      columns: [],
      // 是否展开，默认全部折叠
      isExpandAll: false,
      // 重新渲染表格状态
      refreshTable: true,
      // 菜单树
      tree: [],
      // 选中的数据
      selection: [],

      dialog: {
        // 是否显示弹出层
        open: false,
        // 弹出层标题
        title: "",
        // 目录树
        dirTree: [],
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          title: [
            { required: true, message: "菜单名称不能为空", trigger: "blur" }
          ],
          path: [
            { required: true, message: "路由地址不能为空", trigger: "blur" }
          ]
        }
      },
    }
  },
  computed: {
    hasParams() {
      return Object.values(this.query.form).some(Boolean)
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    /** 查询菜单树 */
    async getTree() {
      this.loading = true
      const res = await getList(this.query.form)
      this.loading = false
      // 搜索条件有值时，则 this.tree = res.data
      if (this.hasParams) {
        this.tree = res.data
      } else {
        this.tree = arrayToTree(res.data)
      }
    },
    // 表单重置
    reset() {
      this.$refs['form']?.resetFields()
      this.dialog.form = {
        id: undefined,
        parentId: 0,
        hasChild: false,
        path: '',
        query: null,
        icon: '',
        title: '',
        noCache: false,
        hidden: false,
        disabled: false
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.query.form.title = undefined
      this.query.form.path = undefined
    },
    /** 拖拽按钮操作 */
    onEnd({ oldIndex, newIndex }) {
      if (oldIndex === newIndex) return
      let oldNodeIndex, oldParentNode, oldNode
      let newNodeIndex, newParentNode
      this.traverse(this.tree, (node, index, parentNode) => {
        if (index === oldIndex) {
          oldNode = node
          oldParentNode = parentNode
          oldNodeIndex = this.getChildren(oldParentNode).findIndex(item => item.id === node.id)
        } else if (index === newIndex) {
          newParentNode = parentNode
          newNodeIndex = this.getChildren(newParentNode).findIndex(item => item.id === node.id)
        }
      })

      let oldNodeChildren = [oldNode.id]
      if (oldNode.children) this.traverse(oldNode, (node) => oldNodeChildren.push(node.id))
      if (oldNodeChildren.includes(newParentNode.id)) {
        this.$modal.message.error('父级不能拖拽到自己的子级中')
      } else {
        oldNode = this.getChildren(oldParentNode).splice(oldNodeIndex, 1)[0]
        let index = newNodeIndex + Number(oldIndex < newIndex && oldParentNode.id !== newParentNode.id)
        this.getChildren(newParentNode).splice(index, 0, oldNode)
        let target = oldParentNode.id === newParentNode.id ? '同层级' : newParentNode.title ? `【${newParentNode.title}】子目录中` : '根目录中'
        this.$modal.confirm.warning(`确定将【${oldNode.title}】移动到${target}的第 ${index + 1} 个位置吗？`).then(() => {
          return sortItem(oldNode.id, newParentNode.id, index + 1)
        }).catch(() => {
          this.getTree()
        })
      }
    },
    traverse(tree, func) {
      let index = 0
      let traverse = (tree, func) => {
        for (let node of this.getChildren(tree) || []) {
          func(node, index++, tree)
          if (node.children) {
            traverse(node, func)
          }
        }
      }
      traverse(tree, func)
    },
    getChildren(parent) {
      return Array.isArray(parent) ? parent : parent.children
    },
    // 展开/折叠操作
    expandChange() {
      this.refreshTable = false
      this.isExpandAll = !this.isExpandAll
      this.$nextTick(() => {
        this.refreshTable = true
      })
    },
    // 新增按钮操作
    async handleAdd(row) {
      if ('children' in row) {
        const res = await getList()
        this.dialog.dirTree = [{ id: 0, title: '根目录', hasChild: true, children: arrayToTree(res.data) }]
        this.dialog.form.parentId = row ? row.id : 0
        this.dialog.title = "添加菜单"
        this.dialog.open = true
      } else {
        this.$modal.message.error('菜单不允许创建子菜单')
      }
    },
    /** 修改按钮操作 */
    async handleUpdate(row) {
      const res = await getList()
      this.dialog.dirTree = [{ id: 0, title: '根目录', hasChild: true, children: arrayToTree(res.data) }]
      const { data } = await getItem(row.id)
      this.dialog.form = data
      this.dialog.title = "修改菜单"
      this.dialog.open = true
    },
    /** 删除按钮操作 */
    handleDelete(rows) {
      if (rows.length === 0) return
      this.$modal.confirm.warning(`是否确认删除"${rows.map(({ title }) => title)}"?`).then(() => {
        return deleteItem(rows.map(({ id }) => id))
      }).then(() => {
        this.getTree()
        this.$modal.message.success(this.$t('message.deleteSuccess'))
      }).catch(() => { })
    },
    // 取消按钮
    cancel() {
      this.reset()
      this.dialog.open = false
    },
    // 提交按钮
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.dialog.form.id === undefined) {
            // 新增
            addItem(this.dialog.form).then(() => {
              this.$modal.message.success(this.$t('message.addSuccess'))
              this.dialog.open = false
              this.getTree()
            })
          } else {
            // 修改
            updateItem(this.dialog.form).then(() => {
              this.$modal.message.success(this.$t("message.updateSuccess"))
              this.dialog.open = false
              this.getTree()
            })
          }
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.el-tree-select-node {
  .el-select-dropdown__item {
    span {
      opacity: 0.6;
    }
  }
}
</style>