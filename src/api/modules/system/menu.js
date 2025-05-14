import request from '@/utils/request'

// 查询菜单列表
export function list(params) {
    return request({
        url: '/system/menu/list',
        method: 'get',
        params
    })
}

// 查询菜单详情
export function get(id) {
    return request({
        url: `/system/menu/get/${id}`,
        method: 'get'
    })
}

// 新增菜单
export function add(form) {
    return request({
        url: '/system/menu/add',
        method: 'post',
        data: form
    })
}

// 删除菜单
export function del(ids) {
    return request({
        url: '/system/menu/delete',
        method: 'delete',
        data: ids
    })
}

// 修改菜单
export function update(form) {
    return request({
        url: '/system/menu/update',
        method: 'put',
        data: form
    })
}

// 排序菜单
export function move(id, targetId, order) {
    return request({
        url: '/system/menu/move',
        method: 'get',
        params: { id, targetId, order }
    })
}