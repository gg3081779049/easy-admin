import request from '@/utils/request'

// 查询菜单列表
export function getList(params) {
    return request({
        url: '/auth/menu/list',
        method: 'get',
        params
    })
}

// 查询菜单详情
export function getItem(id) {
    return request({
        url: `/auth/menu/get/${id}`,
        method: 'get'
    })
}

// 新增菜单
export function addItem(form) {
    return request({
        url: '/auth/menu/add',
        method: 'post',
        data: form
    })
}

// 删除菜单
export function deleteItem(ids) {
    return request({
        url: '/auth/menu/delete',
        method: 'delete',
        data: ids
    })
}

// 修改菜单
export function updateItem(form) {
    return request({
        url: '/auth/menu/update',
        method: 'put',
        data: form
    })
}

// 排序菜单
export function sortItem(id, targetId, order) {
    return request({
        url: '/auth/menu/sort',
        method: 'post',
        data: { id, targetId, order }
    })
}