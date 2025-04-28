import request from '@/utils/request'

export function getDict(keys, locales) {
    return request({
        url: '/system/dict/getDict',
        method: 'get',
        params: { keys, locales },
        headers: {
            repeatSubmit: false
        }
    })
}

export function list(params) {
    return request({
        url: '/system/dict/list',
        method: 'get',
        params
    })
}

export function get(id) {
    return request({
        url: `system/dict/get/${id}`,
        method: 'get'
    })
}

export function add(data) {
    return request({
        url: `system/dict/add`,
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: `system/dict/update`,
        method: 'put',
        data
    })
}

export function del(ids) {
    return request({
        url: `system/dict/delete`,
        method: 'delete',
        data: ids
    })
}