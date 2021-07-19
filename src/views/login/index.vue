<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left"
               v-show="passwordLogin">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">Electron-Plus</h2>
        <el-form-item prop="username" v-show="passwordLogin" class="input-fadein">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" v-show="passwordLogin" class="input-fadein">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon :icon-class="passwordEye" class="color-main" style="cursor: pointer"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center" v-show="passwordLogin">
          <el-button style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
          <el-button style="width: 45%" @click.native.prevent="handleMail" class="input-fadein">
            <svg-icon icon-class="mail" class="color-main"></svg-icon>
            验证码登录
          </el-button>
        </el-form-item>
      </el-form>

        <el-form autoComplete="on"
                 :model="loginMailForm"
                 :rules="loginMailRules"
                 ref="loginMailForm"
                 label-position="left"
                 v-show="mailLogin">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">MyPetStore-Plus</h2>
        <el-form-item prop="phoneNumber" v-show="mailLogin" class="input-fadein">
          <el-input name="phoneNumber"
                    type="text"
                    v-model="loginMailForm.phoneNumber"
                    autoComplete="on"
                    placeholder="请输入手机号码">
            <span slot="prefix">
              <svg-icon icon-class="phone" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item v-show="mailLogin" class="input-fadein">
          <el-input name="mailCode"
                    type="text"
                    v-model="loginMailForm.mailCode"
                    autoComplete="on"
                    placeholder="请输入验证码">
            <span slot="prefix">
              <svg-icon icon-class="code" class="color-main"></svg-icon>
            </span>
            <span slot="suffix">
              <el-button v-if="!isGetCode" size="mini" @click="handleGetCode">获取验证码</el-button>
              <el-button v-else size="mini" @click="handleGetCode" disabled>{{remainTime}}秒后重新发送</el-button>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center" v-show="mailLogin">
          <el-button style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleMailLogin">
            登录
          </el-button>
          <el-button style="width: 45%" @click.native.prevent="handlePassword" class="input-fadein">
            <svg-icon icon-class="accountPassword" class="color-main"></svg-icon>
            账号密码登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout" alt="">
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate';
import login_center_bg from '@/assets/images/login_center_bg.png'
import { login } from '@/api/login/login'
import { getMailCode } from "../../api/login/mailCode";
import { setCookie } from '@/utils/cookie';
import { Message } from "element-ui";

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名(用户名字数 >= 5)'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    };
    const validatePhoneNumber = (rule, value, callback) => {
      if(this.loginMailForm.phoneNumber === undefined) {
        callback(new Error('请输入正确的电话号码!'));
        return;
      }
      let phoneNumberArray = this.loginMailForm.phoneNumber.split("");
      if(phoneNumberArray.length !== 11) {
        callback(new Error('请输入正确的电话号码!'));
        return;
      }
      let reg = /^[\d]+$/;
      phoneNumberArray.forEach((char) => {
        if(!reg.test(char)) {
          callback(new Error('请输入正确的电话号码!'));
        }
      });
      callback();
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginMailForm: {
        phoneNumber: '',
        mailCode: ''
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}],
      },
      loginMailRules: {
        phoneNumber: [{required: true, trigger: 'blur', validator: validatePhoneNumber}],
      },
      loading: false,
      pwdType: 'password',
      login_center_bg,
      passwordEye: 'eyeClose',
      passwordLogin: true,
      mailLogin:  false,
      isGetCode: false,
      remainTime: 5,
      code: ''
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
        this.passwordEye = 'eyeOpen'
      } else {
        this.pwdType = 'password'
        this.passwordEye = 'eyeClose'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          login(this.loginForm.username, this.loginForm.password).then((data) => { // 处理登录
            if(data !== null) {
              setTimeout(() => {
                setCookie("isLogin",1,1);
                this.loading = false;
                this.$store.dispatch("actionUpdateActiveIndex", "1");
                this.$router.push('/main/home')
                Message({
                  message: '登录成功!',
                  type: 'success',
                  duration: 1000
                });
              }, 500)
            } else {
              this.loading = false;
              Message({
                message: '用户名或密码错误!',
                type: 'error',
                duration: 1000
              });
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    handleGetCode() {
      this.isGetCode = true;
      let intervalId = setInterval(() => {
        this.remainTime--;
        if(this.remainTime === 0) {
          this.remainTime = 5;
          this.isGetCode = false;
          clearInterval(intervalId);
        }
      }, 1000);
      getMailCode(this.loginMailForm.phoneNumber).then((response) => {
        console.log(response);
        this.code = response + '';
      });
    },
    handleMailLogin() {
      this.$refs.loginMailForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          console.log(this.loginMailForm.phoneNumber);
          console.log(this.loginMailForm.mailCode);
          console.log(this.code);
          if(!(this.loginMailForm.phoneNumber === '13272424310' && this.loginMailForm.mailCode === this.code)) {
              setTimeout(() => {
                this.loading = false;
                Message({
                  message: '短信验证码错误!',
                  type: 'error',
                  duration: 1000
                });
              }, 500);
              return;
          }
          login('j2ee2', 'j2ee2').then((data) => {
            if(data === 'success') {
              setTimeout(() => {
                setCookie("isLogin",1,1);
                this.loading = false;
                this.$store.dispatch("actionUpdateActiveIndex", "1");
                this.$router.push('/main/home')
                Message({
                  message: '登录成功!',
                  type: 'success',
                  duration: 1000
                });
              }, 500)
            } else {
              this.loading = false;
              Message({
                message: '用户名或密码错误!',
                type: 'error',
                duration: 1000
              });
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      });
    },
    handleMail(){
      this.passwordLogin = false;
      this.mailLogin = true;
    },
    handlePassword() {
      this.mailLogin = false;
      this.passwordLogin = true;
    }
  }
}
</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409EFF;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409EFF;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}

.input-fadein {
  opacity: 0;
  animation: input-fadein 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards 0.1s;
}

@keyframes input-fadein {
  0%
  {
    transform: translateY(-50%);
    opacity: 0;
  }
  100%
  {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>
