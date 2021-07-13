import request from '@/utils/request'
export function deleteOrder(param) {
    return request({
        url: '/order/deleteOrder',
        method: 'get',
        params: param
        // 一个比较重要的知识点，当时用axios的GET方法传递数组形式的参数时，
        // 应该使用URLSearchParams的方式将参数封装一下，
        // 不能直接给params赋值为对象，然后里面放个数组。
    })
}