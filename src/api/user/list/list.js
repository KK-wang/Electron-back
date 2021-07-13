import request from '@/utils/request'
export function fetchList(data) {
    return request({
        url: '/user/userList',
        method: 'post',
        data: data
    })
}