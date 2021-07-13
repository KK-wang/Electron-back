<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
            style="float:right"
            type="primary"
            @click="handleSearchList()"
            size="small">
          查询搜索
        </el-button>
        <el-button
            style="float:right;margin-right: 15px"
            @click="handleResetSearch()"
            size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="userListQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="userListQuery.keyword" class="input-width" placeholder="请输入用户帐号" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="userList"
                style="width: 100%;"
                v-loading="userListLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="帐号" align="center">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.firstName}}{{scope.row.lastName}}</template>
        </el-table-column>
        <el-table-column label="邮箱" width="180" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        <el-table-column label="国籍" align="center">
          <template slot-scope="scope">{{scope.row.country}}</template>
        </el-table-column>
        <el-table-column label="第三方账号" width="160" align="center">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.thirdParty"></svg-icon>
            {{scope.row.thirdPartyAccount}}
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
                @change="handleStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status"
                active-text="是"
                inactive-text="否">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="密码重置" width="140" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handlePasswordEditDialog(scope.$index, scope.row)" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320" align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       plain
                       size="mini"
                       @click="handleViewInfo(scope.$index, scope.row)">查看信息
            </el-button>

            <el-button type="primary"
                       plain
                       size="mini"
                       @click="handleEditInfo(scope.$index, scope.row)">编辑信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container pagination-container-in-user-list">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="userListQuery.pageNum"
          :page-size="userListQuery.pageSize"
          :page-sizes="[5,10,15]"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog
        :visible.sync="passwordResetDialogVisible"
        :title="userIdInDialog + '的密码重置'"
        width="40%"
        destroy-on-close
        center>
      <el-form label-position="right" label-width="120px" :model="resetPasswordForm" :rules="rules" ref="resetPasswordForm">
        <el-form-item label="新密码：" prop="newPassword">
          <el-input :type="newPasswordType" style="width: 370px" v-model="resetPasswordForm.newPassword">
            <span slot="suffix" @click="showNewPassword">
              <svg-icon :icon-class="newPasswordEye" class="color-main" style="cursor: pointer"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item label="重复密码：" prop="repeatPassword">
          <el-input :type="repeatPasswordType" style="width: 370px" v-model="resetPasswordForm.repeatPassword">
            <span slot="suffix" @click="showRepeatPassword">
              <svg-icon :icon-class="repeatPasswordEye" class="color-main" style="cursor: pointer"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item class="check-box-in-reset-password" :class="{'no-check-error': isCheckError}" prop="isChecked">
          <el-checkbox v-model="isChecked" true-label="true" false-label="false" label="我知晓并愿意承担修改密码之后所带来的的一切责任" border @change="handleCheckBoxChange"></el-checkbox>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlePasswordEditDialogCancel">
            取消&nbsp<i class="el-icon-close"></i>
          </el-button>
          <el-button type="primary" @click="handlePasswordEditDialogConfirm" :loading="passwordEditDialogConfirmButtonLoading">
            确定&nbsp<i class="el-icon-check"></i>
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from "../../../api/user/list/list";
import  { resetPwd } from "../../../api/user/list/resetPwd";
import { updateUserStatus } from "../../../api/user/list/accountStatus";
import { Message } from "element-ui";

export default {
  name: "list",
  data() {
    let repeatPasswordValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetPasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback()
      }
    }
    let checkBoxValidate = (rule, value, callback) => {
      if(this.isChecked === 'true') {
        callback();
      } else {
        this.isCheckError = true;
        callback(new Error('如果您想要修改密码，那么请您勾选上面这一项!'))
      }
    }
    return {
      userListQuery: {
        pageNum: 1,
        pageSize: 5,
        keyword: null
      },
      userList: null,
      total: null,
      userListLoading: false,
      passwordResetDialogVisible: false,
      userIdInDialog: '',
      resetPasswordForm: {
        newPassword: '',
        repeatPassword: ''
      },
      newPasswordType: 'password',
      repeatPasswordType: 'password',
      newPasswordEye: 'eyeClose',
      repeatPasswordEye: 'eyeClose',
      isChecked: 'false',
      isCheckError: false,
      passwordEditDialogConfirmButtonLoading: false,
      rules: {
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        repeatPassword: [
          { required: true, validator: repeatPasswordValidate, trigger: 'blur' }
        ],
        isChecked: [
          { validator: checkBoxValidate, trigger: 'change'}
        ]
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    handleResetSearch() {
      this.userListQuery = {
        pageNum: 1,
        pageSize: 5,
        keyword: null
      };
    },
    handleSearchList() {
      this.userListQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.userListQuery.pageNum = 1;
      this.userListQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.userListQuery.pageNum = val;
      this.getList();
    },
    getList() {
      this.userListLoading = true;
      fetchList(this.userListQuery).then(response => {
        this.userListLoading = false;
        this.userList = response.userList;
        this.total = response.total;
      });
      // setTimeout(() => {
      //   this.userListLoading = false;
      //   this.userList = [
      //     {
      //       userId: "j2ee",
      //       firstName: "王",
      //       lastName: "兴浩",
      //       email: "wxh@csu.edu.cn",
      //       country: "中国",
      //       thirdParty: "Sina",
      //       thirdPartyAccount: "DISCOVER.",
      //       status: 1
      //     },
      //     {
      //       userId: "j2ee",
      //       firstName: "王",
      //       lastName: "兴浩",
      //       email: "wxh@csu.edu.cn",
      //       country: "中国",
      //       thirdParty: "Sina",
      //       thirdPartyAccount: "DISCOVER.",
      //       status: 1
      //     },
      //     {
      //       userId: "j2ee",
      //       firstName: "王",
      //       lastName: "兴浩",
      //       email: "wxh@csu.edu.cn",
      //       country: "中国",
      //       thirdParty: "Sina",
      //       thirdPartyAccount: "DISCOVER.",
      //       status: 1
      //     },
      //     {
      //       userId: "j2ee",
      //       firstName: "王",
      //       lastName: "兴浩",
      //       email: "wxh@csu.edu.cn",
      //       country: "中国",
      //       thirdParty: "Sina",
      //       thirdPartyAccount: "DISCOVER.",
      //       status: 1
      //     },
      //     {
      //       userId: "j2ee",
      //       firstName: "王",
      //       lastName: "兴浩",
      //       email: "wxh@csu.edu.cn",
      //       country: "中国",
      //       thirdParty: "Sina",
      //       thirdPartyAccount: "DISCOVER.",
      //       status: 1
      //     }
      //   ];
      //   this.total = 5;
      // }, 1000);
    },
    handleStatusChange(index, row) {
      updateUserStatus(row.userId, row.status).then(() => {
        this.$message({ // 展示一个全局的Message
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },
    handlePasswordEditDialog(index, row) {
      this.userIdInDialog = row.userId;
      this.passwordResetDialogVisible = true;
    },
    handleViewInfo(index, row) {
      this.$store.dispatch("actionUpdateActiveIndex", "4-2");
      this.$router.push({path:'/main/user/view', query: {id: row.userId}});
    },
    handleEditInfo(index, row) {
      this.$store.dispatch("actionUpdateActiveIndex", "4-3");
      this.$router.push({path:'/main/user/edit', query: {id: row.userId}});
    },
    handlePasswordEditDialogCancel() {
      this.passwordResetDialogVisible = false;
      this.userIdInDialog = '';
      this.isCheckError = false;
      this.resetPasswordForm = {
        newPassword: '',
        repeatPassword: ''
      }
    },
    handlePasswordEditDialogConfirm() {
      this.$refs["resetPasswordForm"].validate((valid) => {
        if(valid) {
          this.passwordEditDialogConfirmButtonLoading = true;
          resetPwd(this.userIdInDialog, this.resetPasswordForm.repeatPassword).then(() => {
            Message({
              message: '修改成功!',
              type: 'success',
              duration: 1000
            });
            this.passwordResetDialogVisible = false;
            this.userIdInDialog = '';
            this.isChecked = "false";
            setTimeout(() => {
              this.isCheckError = false;
            }, 500);
            this.resetPasswordForm = {
              newPassword: '',
              repeatPassword: ''
            }
            this.passwordEditDialogConfirmButtonLoading = false;
          });
          // setTimeout(() => {
          //   Message({
          //     message: '修改成功!',
          //     type: 'success',
          //     duration: 1000
          //   });
          //   this.passwordResetDialogVisible = false;
          //   this.userIdInDialog = '';
          //   this.isChecked = "false";
          //   setTimeout(() => {
          //     this.isCheckError = false;
          //   }, 500);
          //   this.resetPasswordForm = {
          //     newPassword: '',
          //     repeatPassword: ''
          //   }
          //   this.passwordEditDialogConfirmButtonLoading = false;
          // }, 1000)
        } else {
          Message({
            message: '验证失败!',
            type: 'error',
            duration: 1000
          });
        }
      });
    },
    showNewPassword() {
      if (this.newPasswordType === 'password') {
        this.newPasswordType = ''
        this.newPasswordEye = 'eyeOpen'
      } else {
        this.newPasswordType = 'password'
        this.newPasswordEye = 'eyeClose'
      }
    },
    showRepeatPassword() {
      if (this.repeatPasswordType === 'password') {
        this.repeatPasswordType = ''
        this.repeatPasswordEye = 'eyeOpen'
      } else {
        this.repeatPasswordType = 'password'
        this.repeatPasswordEye = 'eyeClose'
      }
    },
    handleCheckBoxChange(value) {
      if(value === 'true') {
        this.isCheckError = false;
      }
    }
  }
}
</script>

<style scoped>

  .pagination-container-in-user-list{
    margin-bottom: 40px;
  }

  .check-box-in-reset-password{
    margin-top: 35px;
    margin-left: -20px;
    margin-bottom: -5px;
  }

  .no-check-error>.el-form-item__content>.is-bordered {
    /* 一个很吊的技术，通过利用父元素的存在与否来深入的控制子元素中的属性！ */
    border-color: #F56C6C!important;
  }

</style>
