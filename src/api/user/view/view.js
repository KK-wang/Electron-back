import request from '@/utils/request'
export function getUser(param) {
    return request({
        url: '/user/getUser',
        method: 'get',
        params: {
            userId: param
        }
    })
}