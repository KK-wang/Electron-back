import request from '@/utils/request'
export function getMailCode(phone) {
    return request({
        url: '/messLogin',
        method: 'post',
        data: {
            phone
        }
    })
}
