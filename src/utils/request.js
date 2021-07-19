import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
    // baseURL: "http://admin-api.macrozheng.com", // api的base_url
    // baseURL: "http://120.77.83.8:8081",
    // 解决跨域问题:
    baseURL: "/api",
    timeout: 3000 // 请求超时时间
});

service.interceptors.response.use(
    response => { // 请求成功的话来这儿
        console.log(response);
        if (response.status !== 200) {
            Message({
                message: "Error!",
                type: 'error',
                duration: 1000
            })
            return Promise.reject('error')
        } else {
            return Promise.resolve(response.data.object);
        }
    },
    error => { // 请求超时来这儿，或者说没有对应的API接口时来这儿
        console.log(error);
        Message({
            message: error.message,
            type: 'error',
            duration: 1000
        })
        return Promise.reject(error)
    }
)

export default service
