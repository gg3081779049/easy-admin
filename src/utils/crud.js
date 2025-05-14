import request from '@/utils/request'

export function crud(url, namespace) {
    let name = namespace || ''
    if (url) {
        return {
            [`list${name}`](params) {
                return request({
                    url: `${url}/list`,
                    method: 'get',
                    params
                })
            },
            [`get${name}`](id) {
                return request({
                    url: `${url}/get/${id}`,
                    method: 'get'
                })
            },
            [`add${name}`](data) {
                return request({
                    url: `${url}/add`,
                    method: 'post',
                    data
                })
            },
            [`update${name}`](data) {
                return request({
                    url: `${url}/update`,
                    method: 'put',
                    data
                })
            },
            [`del${name}`](ids) {
                return request({
                    url: `${url}/delete`,
                    method: 'delete',
                    data: ids
                })
            },
        }
    }
}