import request from '@/utils/request'
export function login(username, password) {
    let param = new URLSearchParams()
    param.append('username', username);
    param.append('password', password)
    return request({
        url: '/login',
        method: 'post',
        data: param
    });
}
