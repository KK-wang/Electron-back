<template>
  <div class="user-edit-list">
    <el-card class="user-edit-card">
      <div class="user-edit-title">{{userInfo.userid}}的信息编辑</div>
      <el-form :model="userInfo" :rules="rules" label-width="120px" style="width: 600px" class="form-container" ref="userEditForm">
        <el-form-item label="用户账号：">
          <span class="edit-userid">
            <span class="edit-userid-text">{{ userInfo.userid }}</span>
            <span class="edit-userid-info">用户账号无法修改</span>
          </span>
        </el-form-item>
        <el-form-item label="用户的姓：" prop="firstName">
          <el-input v-model="userInfo.firstName" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户的名：" prop="lastName">
          <el-input v-model="userInfo.lastName" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱：" prop="email">
          <el-input v-model="userInfo.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="第三方账号：">
          <svg-icon :icon-class="userInfo.thirdParty"></svg-icon>&nbsp
          <span class="edit-thirdPartyAccount">
            <span class="edit-thirdPartyAccount-text">{{ userInfo.thirdPartyAccount }}</span>
            <span class="edit-thirdPartyAccount-info">用户关联的第三方账号无法修改</span>
          </span>
        </el-form-item>
        <el-form-item label="账号是否启用：">
          <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="userInfo.status"
              active-text="是"
              inactive-text="否">
          </el-switch>
        </el-form-item>
        <el-form-item label="用户住址一：" prop="addressOne">
          <el-input v-model="userInfo.addressOne" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户住址二：">
          <el-input v-model="userInfo.addressTwo" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户邮编：" prop="zip">
          <el-input v-model="userInfo.zip" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户电话：" prop="phone">
          <el-input v-model="userInfo.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户所在城市：" prop="city">
          <el-input v-model="userInfo.city" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户所在省份：" prop="state">
          <el-input v-model="userInfo.state" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户所在国家：" prop="country">
          <el-input v-model="userInfo.country" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-button class="reset-button-in-user-edit" type="primary" @click="handleReset">
        重置&nbsp<i class="el-icon-refresh-left"></i>
      </el-button>
      <el-button class="confirm-button-in-user-edit" type="success" @click="handleConfirm" :loading="isLoading">
        确认&nbsp<i class="el-icon-check"></i>
      </el-button>
      <el-button type="primary" icon="el-icon-back" circle class="return-button-in-user-edit" @click="handleReturn"></el-button>
    </el-card>
  </div>
</template>

<script>
import { getUser } from "../../../api/user/view/view";
import { editUser } from "../../../api/user/edit/edit";
import {Message} from "element-ui";

export default {
  name: "edit",
  data() {
    return {
      userInfo: '',
      isLoading: false,
      rules: {
        firstName: [{required: true, message: '请填写用户的姓', trigger: 'blur'}],
        lastName: [{required: true, message: '请填写用户的名', trigger: 'blur'}],
        email: [{required: true, message: '请填写用户邮箱', trigger: 'blur'}],
        addressOne :[{required: true, message: '用户的住址一必填', trigger: 'blur'}],
        zip: [{required: true, message: '请填写用户的邮编', trigger: 'blur'}],
        phone: [{required: true, message: '请填写用户的电话', trigger: 'blur'}],
        city: [{required: true, message: '请填写用户所在城市', trigger: 'blur'}],
        state: [{required: true, message: '请填写用户所在省份', trigger: 'blur'}],
        country: [{required: true, message: '请填写用户所在国家', trigger: 'blur'}]
      }
    }
  },
  created() {
    getUser(this.$route.query.id).then(response => {
      this.userInfo = response
    });
    // console.log(this.$route.query.id);
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
    handleReset() {
      this.userInfo = {
        userid: 'j2ee',
        firstName: '',
        lastName: '',
        status: 1,
        addressOne: '',
        addressTwo: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: ''
      }
      Message({
        message: '用户信息已重置!',
        type: 'success',
        duration: 1000
      });
    },
    handleConfirm() {
      this.$refs["userEditForm"].validate(valid => {
        if(valid) {
          this.isLoading = true;
          editUser(this.userInfo).then(() => {
            Message({
              message: '用户信息修改成功!',
              type: 'success',
              duration: 1000
            });
            this.isLoading = false;
            setTimeout(() => {
              this.$router.push('/main/user/list')
            }, 1000);
          });
          // setTimeout(() => {
          //   Message({
          //     message: '用户信息修改成功!',
          //     type: 'success',
          //     duration: 1000
          //   });
          //   this.isLoading = false;
          //   setTimeout(() => {
          //     this.$router.push('/main/user/list')
          //   }, 1000);
          // }, 1000);
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration:1000
          });
          this.isLoading = false;
          return false;
        }
      });
    },
    handleReturn() {
      this.$store.dispatch("actionUpdateActiveIndex", "4-1");
      this.$router.push('/main/user/list');
    }
  }
}
</script>

<style scoped>

  .user-edit-list {
    width: 720px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 70px;
  }

  .user-edit-card {
    position: relative;
  }

  .user-edit-card:hover {
    box-shadow: 1px 1px 20px #78abff;
  }

  .user-edit-title {
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

  .user-edit-title:hover {
    color: #409EFF;
  }

  .user-edit-title::before, .user-edit-title::after
  {
    content: '';
    transition: width 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    position: absolute;
    top: 0;
    height: 90%;
    border-bottom: 3px solid #409EFF;
    width: 0;
  }

  .user-edit-title::before
  {
    right: 50%;
  }

  .user-edit-title::after
  {
    left: 50%;
  }

  .user-edit-title:hover::before, .user-edit-title:hover::after
  {
    width: 50%;
  }

  .edit-userid {
    cursor: default;
  }

  .edit-userid-text {
    color: #292421;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 2px dashed #dd0c2b;
  }

  .edit-userid-info {
    border: 2px solid #dd0c2b;
    border-radius: 10px;
    opacity: 0;
    padding: 2px 2px 2px 2px;
    margin-left: 50px;
    color: #dd0c2b;
    transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    /* transition 应该放在非hover中 */
  }

  .edit-userid:hover .edit-userid-info {
    /* 这样做的前提是后者为前者的子元素 */
    opacity: 1;
    margin-left: 20px;
  }

  .edit-thirdPartyAccount {
    cursor: default;
  }

  .edit-thirdPartyAccount-text {
    color: #292421;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 2px dashed #dd0c2b;
  }

  .edit-thirdPartyAccount-info {
    border: 2px solid #dd0c2b;
    border-radius: 10px;
    opacity: 0;
    padding: 2px 2px 2px 2px;
    margin-left: 50px;
    color: #dd0c2b;
    transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    /* transition 应该放在非hover中 */
  }

  .edit-thirdPartyAccount:hover .edit-thirdPartyAccount-info {
    /* 这样做的前提是后者为前者的子元素 */
    opacity: 1;
    margin-left: 20px;
  }

  .reset-button-in-user-edit {
    margin-top: 5px;
    margin-left: 140px;
    margin-bottom: 25px;
  }

  .confirm-button-in-user-edit {
    margin-top: 5px;
    margin-left: 215px;
    margin-bottom: 25px;
  }

  .return-button-in-user-edit {
    position: absolute;
    left: 10px;
    top: 20px
  }

</style>