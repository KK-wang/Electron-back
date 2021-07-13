import request from '@/utils/request'
export function getOrder(param) {
    return request({
        url: '/order/getOrder',
        method: 'get',
        params: {
            orderId: param
        }
    })
}