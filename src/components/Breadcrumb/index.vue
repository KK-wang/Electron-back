<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link id="breadcrumb-link" v-else :to="item.redirect||item.path" @click.native="routerClick(item.meta.title)">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      matched = [{ path: '/main', meta: { title: 'Electron后台管理系统' }}].concat(matched)
      this.levelList = matched
    },
    routerClick(title) {
      if(title === 'Electron后台管理系统') {
        this.$store.dispatch("actionUpdateActiveIndex", "1");
      } else if(title === '商品') {
        this.$store.dispatch("actionUpdateActiveIndex", "2-1");
      } else if(title === '订单') {
        this.$store.dispatch("actionUpdateActiveIndex", "3-1");
      } else {
        this.$store.dispatch("actionUpdateActiveIndex", "4-1");
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }

  #breadcrumb-link {
    font-weight: 700;
    text-decoration: none;
    transition: color .2s cubic-bezier(.645,.045,.355,1);
    color: #ececec;
  }

  #breadcrumb-link:hover {
    color: #409EFF;
    cursor: pointer;
  }

</style>
