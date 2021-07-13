import request from '@/utils/request'
export function editReceiverInfo(orderId, editInfo) {
    return request({
        url: '/order/editReceiverInfo',
        method: 'post',
        data: {
            orderId,
            editInfo
        }
    })
}