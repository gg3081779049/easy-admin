import request from '@/utils/request'

export function getChangeLog() {
    return request({
        url: '/about/getChangeLog',
        methods: 'get'
    })
}