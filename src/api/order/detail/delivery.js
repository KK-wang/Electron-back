import request from '@/utils/request'
export function delivery(orderId, deliveryWay, deliveryTime) {
    return request({
        url: '/order/delivery',
        method: 'post',
        data: {
            orderId,
            deliveryWay,
            deliveryTime
        }
    })
}