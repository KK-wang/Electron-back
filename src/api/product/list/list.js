import request from '@/utils/request'
export function fetchList(data) {
    return request({
        url:'/product/list',
        method:'post',
        data:data
    })
}

export function updatePublishStatus(params) {
    return request({
        url:'/product/update/deleteStatus',
        method:'get',
        params:params
    })
}