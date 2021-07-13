import request from '@/utils/request'
export function editUser(data) {
    return request({
        url:'/user/edit',
        method:'post',
        data: data
    })
}