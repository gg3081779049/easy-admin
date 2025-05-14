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

export function listDictData(params) {
    return request({
        url: `/system/dictData/list`,
        method: 'get',
        params
    })
}

export function getDictData(id) {
    return request({
        url: `/system/dictData/get/${id}`,
        method: 'get'
    })
}

export function addDictData(data) {
    return request({
        url: `/system/dictData/add`,
        method: 'post',
        data
    })
}

export function updateDictData(data) {
    return request({
        url: `/system/dictData/update`,
        method: 'put',
        data
    })
}

export function delDictData(ids) {
    return request({
        url: `/system/dictData/delete`,
        method: 'delete',
        data: ids
    })
}