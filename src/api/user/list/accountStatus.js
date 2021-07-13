import request from '@/utils/request'
export function updateUserStatus(userId, status) {
    return request({
        url: '/user/updateStatus',
        method: 'post',
        data: {
            userId,
            status
        }
    })
}