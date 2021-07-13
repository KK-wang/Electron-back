import request from '@/utils/request'
export function editItemListInfo(orderId, editInfo) {
    return request({
        url: '/order/editItemListInfo',
        method: 'post',
        data: {
            orderId,
            editInfo
        }
    })
}