import request from '@/utils/request'
export function resetPwd(userId, password) {
    return request({
        url: '/user/resetPwd',
        method: 'post',
        data: {
            userId,
            password
        }
    })
}