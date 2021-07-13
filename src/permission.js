import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getCookie } from '@/utils/cookie'

router.beforeEach((to, from, next) => {
    NProgress.start()
    if(to.path === '/login') {
        next()
    } else {
        if(Number(getCookie('isLogin')) !== 1) {
            next({path: '/'})
        } else {
            next()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
