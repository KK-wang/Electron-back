import request from '@/utils/request'
export function getProduct(params) {
    return request({
        url: '/product/getProduct',
        method: 'get',
        params: {
            productId: params
        }
    })
}

export function updateProduct(data) {
    return request({
        url:'/product/update',
        method:'post',
        data:data
    })
}