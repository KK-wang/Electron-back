<template>
  <div class="view-list">
    <el-card class="view-card">
      <div class="view-title">{{userInfo.userid}}的详情信息</div>
      <el-form :model="userInfo" label-width="120px" style="width: 600px" class="form-container">
        <el-form-item label="用户账号：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.userid }}</span>
        </el-form-item>
        <el-form-item label="用户姓名：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userFullName }}</span>
        </el-form-item>
        <el-form-item label="用户邮箱：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.email }}</span>
        </el-form-item>
        <el-form-item label="第三方账号：">
          <svg-icon :icon-class="userInfo.thirdParty"></svg-icon>&nbsp
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.thirdPartyAccount }}</span>
        </el-form-item>
        <el-form-item label="账号是否可用：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.status === 1 ? '是' : '否' }}</span>
        </el-form-item>
        <el-form-item label="用户住址一：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.addressOne }}</span>
        </el-form-item>
        <el-form-item label="用户住址二：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.addressTwo }}</span>
        </el-form-item>
        <el-form-item label="用户邮编：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.zip}}</span>
        </el-form-item>
        <el-form-item label="用户电话：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.phone}}</span>
        </el-form-item>
        <el-form-item label="用户所在城市：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.city }}</span>
        </el-form-item>
        <el-form-item label="用户所在省份：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.state}}</span>
        </el-form-item>
        <el-form-item label="用户所在国家：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ userInfo.country}}</span>
        </el-form-item>
      </el-form>
      <el-button class="return-button-in-view" type="primary" @click="handleReturn">
        <i class="el-icon-back"></i>&nbsp返回
      </el-button>
    </el-card>
  </div>
</template>

<script>
import {getUser} from "../../../api/user/view/view";

export default {
  name: "view",
  data() {
    return {
      userInfo: ''
    }
  },
  computed: {
    userFullName() {
      return this.userInfo.firstName + this.userInfo.lastName;
    }
  },
  created() {
    console.log(this.$route.query.id);
    getUser(this.$route.query.id).then(response => {
      this.userInfo = response
    });
    // this.userInfo = {
    //   userid: 'j2ee',
    //   firstName: '王',
    //   lastName: '兴浩',
    //   email: 'wxh@csu.edu.cn',
    //   thirdParty: "Sina",
    //   thirdPartyAccount: "DISCOVER.",
    //   status: 1,
    //   addressOne: '901 San Antonio Road',
    //   addressTwo: 'MS UCUP02-206',
    //   city: 'Palo Alto',
    //   state: 'CA',
    //   zip: '94303',
    //   country: 'USA',
    //   phone: '555-555-5555'
    // }
  },
  methods: {
    handleReturn() {
      this.$store.dispatch("actionUpdateActiveIndex", "4-1");
      this.$router.push({path:'/main/user/list'});
    }
  }
}
</script>

<style scoped>

  .view-list {
    width: 720px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 70px;
  }

  .view-card:hover {
    box-shadow: 1px 1px 20px #78abff;
  }

  .view-title {
    font-size: 25px;
    font-weight: bold;
    margin: 30px auto -25px;
    width: 30%;
    position: relative;
    text-align: center;
    height: 100%;
    line-height: 50px;
    transition: color 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }

  .view-title:hover {
    color: #409EFF;
  }

  .view-title::before, .view-title::after
  {
    content: '';
    transition: width 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    position: absolute;
    top: 0;
    height: 90%;
    border-bottom: 3px solid #409EFF;
    width: 0;
  }

  .view-title::before
  {
    right: 50%;
  }

  .view-title::after
  {
    left: 50%;
  }

  .view-title:hover::before, .view-title:hover::after
  {
    width: 50%;
  }

  .return-button-in-view {
    margin-top: -10px;
    margin-bottom: 25px;
    margin-left: 300px;
  }

</style>