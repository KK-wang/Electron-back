import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '../views/layout'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/main',
    name: 'main',
    component: Layout,
    redirect: '/main/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {title: '首页', icon: 'home'}
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/product'),
        meta: {title: '宠物', icon: 'product'},
        redirect: 'list',
        children: [
          {
            path: 'list',
            name: 'list',
            component: () => import('@/views/product/components/list.vue'),
            meta: {title: '宠物列表', icon: 'list'}
          },
          {
            path: 'add',
            name: 'add',
            component: () => import('@/views/product/components/add.vue'),
            meta: {title: '添加宠物', icon: 'add'}
          },
          {
            path: 'category',
            name: 'category',
            component: () => import('@/views/product/components/category.vue'),
            meta: {title: '宠物分类', icon: 'category'}
          },
          {
            path: 'edit',
            name: 'edit',
            component: () => import('@/views/product/components/edit.vue'),
            meta: {title: '编辑宠物信息', icon: 'edit'}
          }
        ]
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/order'),
        meta: {title: '订单', icon: 'user'},
        redirect: 'list',
        children: [
          {
            path: 'list',
            name: 'list',
            component: () => import('@/views/order/components/list.vue'),
            meta: {title: '订单列表', icon: 'list'}
          },
          {
            path: 'detail',
            name: 'detail',
            component: () => import('@/views/order/components/detail.vue'),
            meta: {title: '订单详情', icon: 'detail'}
          }
        ]
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user'),
        meta: {title: '用户', icon: 'user'},
        redirect: 'list',
        children: [
          {
            path: 'list',
            name: 'list',
            component: () => import('@/views/user/components/list.vue'),
            meta: {title: '用户列表', icon: 'list'}
          },
          {
            path: 'view',
            name: 'view',
            component: () => import('@/views/user/components/view.vue'),
            meta: {title: '查看用户', icon: 'view'}
          },
          {
            path: 'edit',
            name: 'edit',
            component: () => import('@/views/user/components/edit.vue'),
            meta: {title: '编辑用户', icon: 'edit'}
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
