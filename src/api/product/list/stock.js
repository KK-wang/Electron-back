import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/getStock',
        method:'get',
        params: {
            productId: params
        }
    })
}

export function update(data) {
    return request({
        url:'/updateStock',
        method:'post',
        data:data
    })
}