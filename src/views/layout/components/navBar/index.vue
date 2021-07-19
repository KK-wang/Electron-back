<template>
  <el-menu
      :default-active="$store.state.navBarActiveModule.activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
    <el-menu-item index="1">
      <svg-icon icon-class="home"></svg-icon>
      首页
    </el-menu-item>
    <el-submenu index="2">
      <template #title>
        <svg-icon icon-class="product"></svg-icon>&nbsp;&nbsp;商品
      </template>
      <el-menu-item index="2-1">
        <svg-icon icon-class="product-list"></svg-icon>&nbsp;&nbsp;商品列表
      </el-menu-item>
      <el-menu-item index="2-2">
        <svg-icon icon-class="product-add"></svg-icon>&nbsp;&nbsp;添加商品
      </el-menu-item>
      <el-menu-item index="2-3">
        <svg-icon icon-class="product-cate"></svg-icon>&nbsp;&nbsp;商品分类
      </el-menu-item>
      <el-menu-item index="2-4" disabled>
        <svg-icon icon-class="form"></svg-icon>&nbsp;&nbsp;编辑商品
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template #title>
        <svg-icon icon-class="order"></svg-icon>&nbsp;&nbsp;订单
      </template>
      <el-menu-item index="3-1">
        <svg-icon icon-class="product-list"></svg-icon>&nbsp;&nbsp;订单列表
      </el-menu-item>
      <el-menu-item index="3-2" disabled>
        <svg-icon icon-class="order-return-reason"></svg-icon>&nbsp;&nbsp;订单详情
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template #title>
        <svg-icon icon-class="ums-admin"></svg-icon>&nbsp;&nbsp;用户
      </template>
      <el-menu-item index="4-1">
        <svg-icon icon-class="ums-role"></svg-icon>&nbsp;&nbsp;用户列表
      </el-menu-item>
      <el-menu-item index="4-2" disabled>
        <svg-icon icon-class="ums-view"></svg-icon>&nbsp;&nbsp;查看用户
      </el-menu-item>
      <el-menu-item index="4-3" disabled>
        <svg-icon icon-class="ums-resource"></svg-icon>&nbsp;&nbsp;编辑用户
      </el-menu-item>
    </el-submenu>

    <breadcrumb class="breadcrumb"></breadcrumb>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="@/assets/images/avatar.jpg" alt="avatar">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/main/editAdmin">
          <el-dropdown-item>
            <svg-icon icon-class="adminSetting"></svg-icon>&nbsp;系统设置
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="exit" style="display:block;">
            <svg-icon icon-class="exit"></svg-icon>&nbsp;退出登录
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { setCookie } from '@/utils/cookie'
import Breadcrumb from '@/components/Breadcrumb'
import { Message } from 'element-ui'

export default {
  name: "index",
  components: {
    Breadcrumb
  },
  data() {
    return { }
  },
  methods: {
    handleSelect(index) {
      this.$store.dispatch("actionUpdateActiveIndex", index);
      if(index === '1') {
        if (this.$route.path !== '/main/home') this.$router.push('/main/home')
        else {
          Message({
                    message: '您已经位于' + this.$route.meta.title + '!',
                    type: 'warning',
                    duration: 1000
                })
        }
        return
      }
      if(index === '2-1') {
        if (this.$route.path !== '/main/product/list') this.$router.push('/main/product/list')
        else {
          Message({
            message: '您已经位于' + this.$route.meta.title + '!',
            type: 'warning',
            duration: 1000
          })
        }
        return
      }
      if(index === '2-2') {
        if (this.$route.path !== '/main/product/add') this.$router.push('/main/product/add')
        else {
          Message({
            message: '您已经位于' + this.$route.meta.title + '!',
            type: 'warning',
            duration: 1000
          })
        }
        return
      }
      if(index === '2-3') {
        if (this.$route.path !== '/main/product/category') this.$router.push('/main/product/category')
        else {
          Message({
            message: '您已经位于' + this.$route.meta.title + '!',
            type: 'warning',
            duration: 1000
          })
        }
        return
      }
      if(index === '3-1') {
        if (this.$route.path !== '/main/order/list') this.$router.push('/main/order/list')
        else {
          Message({
            message: '您已经位于' + this.$route.meta.title + '!',
            type: 'warning',
            duration: 1000
          })
        }
        return
      }
      if(index === '4-1') {
        if (this.$route.path !== '/main/user/list') this.$router.push('/main/user/list')
        else {
          Message({
            message: '您已经位于' + this.$route.meta.title + '!',
            type: 'warning',
            duration: 1000
          })
        }
      }
    },
    exit() {
      setCookie('isLogin',0,1)
      Message({
        message: '您已成功退出登录!',
        type: 'success',
        duration: 1000
      })
      this.$router.push('/')
    }
  }
}
</script>

<style>

  .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
    min-width: 110px!important;
  }

  .avatar-container {
    cursor: pointer;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
  }

  .user-avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .breadcrumb {
    margin-top: 4px;
  }


</style>
