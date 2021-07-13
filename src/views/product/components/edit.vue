<template>
  <div>
    <el-card class="form-container edit-card">
      <div>
        <div class="edit-title">{{ titleText }}的信息编辑</div>
        <el-form :model="form" :rules="rules" label-width="120px" style="width: 600px" ref="editForm">
          <el-form-item label="物种分类：" prop="category">
            <el-select v-model="form.category" placeholder="请选择" prop="category" clearable>
              <el-option
                  v-for="item in categoryOptions"
                  :key="item"
                  :value="item"
                  :label="item">
                <span style="float: left">
                 <svg-icon :icon-class="item" class="color-main"></svg-icon>
                </span>
                <span style="float: left; color: #8492a6; font-size: 15px; font-weight: bold; margin-left: 10px">{{ item }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宠物编号：" prop="productId">
            <el-input v-model="form.productId" clearable></el-input>
          </el-form-item>
          <el-form-item label="宠物名称：" prop="productName">
            <el-input v-model="form.productName" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否上架：">
            <el-switch
                v-model="form.publishStatus"
                active-text="是"
                inactive-text="否"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="宠物介绍：">
            <el-input
                v-model="form.description"
                :autoSize="true"
                type="textarea"
                placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="宠物图片：" class="uploader-label">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                       :show-file-list="true" class="uploader"
                       :on-success="handleUploadSuccess"
                       :on-error="handleUploadError"
                       :before-upload="handleBeforeUpload"
                       :before-remove="handleRemoveUpload">
              <img v-if="imageURL" :src="imageURL" alt="" class="uploader-img">
              <i v-else class="el-icon-warning uploader-icon" style="font-size: 16px">
                该图片会覆盖原图片
              </i>
            </el-upload>
          </el-form-item>
          <el-form-item label="宠物库存：" prop="stockList">
            <el-table border style="width: 390px" :data="form.stockList">
              <el-table-column
                  label="库存编号"
                  align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.itemId"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                  label="颜色"
                  width="70px"
                  align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.color"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                  label="性别"
                  width="70px"
                  align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sex"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                  label="销售价格"
                  width="80px"
                  align="center">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.price"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                  label="库存数目"
                  width="80px"
                  align="center">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.inventory"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-minus" circle class="minus-button-in-edit" :class="{'plus-or-minus-button-move': isButtonMove}" @click="handleMinus"></el-button>
        <el-button type="primary" icon="el-icon-plus" circle class="plus-button-in-edit" :class="{'plus-or-minus-button-move': isButtonMove}" @click="handlePlus"></el-button>
        <el-button class="reset-button-in-edit" type="primary" @click="handleReset">
          重置&nbsp<i class="el-icon-refresh-left"></i>
        </el-button>
        <el-button class="confirm-button-in-edit" type="success" @click="handleConfirm" :loading="isLoading">
          确认&nbsp<i class="el-icon-check"></i>
        </el-button>
        <el-button type="primary" icon="el-icon-back" circle class="return-button-in-product-edit" @click="handleReturn"></el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getProduct,updateProduct } from "../../../api/product/edit/edit";
import {Message} from "element-ui";

export default {
  name: "edit",
  data() {
    let stockListValidate = (rule, value, callback) => {
      for(let stock of this.form.stockList) {
        if(stock.itemId === '' || stock.color === '' || stock.sex === '' || stock.price === '' || stock.inventory === '') {
          callback(new Error('请完善库存信息!'));
          return;
        }
      }
      callback()
    }
    return {
      categoryOptions: ['BIRDS', 'CATS', 'DOGS', 'FISH', 'REPTILES'],
      form: { },
      titleText: "",
      imageURL: "",
      isPicUploaded: false,
      onlyOnePicUploadedMessage: false,
      isLoading: false,
      isButtonMove: false,
      rules: {
        category: [{required: true, message: '请选择宠物种类', trigger: 'change'}],
        productId: [{required: true, message: '请选择宠物编号', trigger: 'blur'}],
        productName: [
          {required: true, message: '请输入宠物名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 14 个字符之间', trigger: 'blur'},
        ],
        stockList: [{required: true, validator: stockListValidate, trigger: 'blur'}],
      },
    }
  },
  created() {
    getProduct(this.$route.query.id).then(response => {
      this.form=response;
      this.titleText = this.form.productName;
    });
  },
  methods: {
    handleUploadSuccess(res, file) {
      this.imageURL = URL.createObjectURL(file.raw);
      console.log(this.imageURL);
      this.isPicUploaded = true;
      Message({
        message: '上传成功!',
        type: 'success',
        duration: 1000
      });
    },
    handleUploadError(err, file) {
      Message({
        message: '上传失败!',
        type: 'error',
        duration: 1000
      });
      this.isButtonMove = false;
    },
    handleBeforeUpload(file) {
      if(this.isPicUploaded) {
        Message({
          message: '只能上传一个文件!',
          type: 'error',
          duration: 1000
        });
        this.onlyOnePicUploadedMessage = true;
        return false;
      }

      const isLegalPic = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isLegalPic) {
        Message({
          message: '上传的宠物图片只能是 JPG 或者 PNG 格式!',
          type: 'error',
          duration: 1000
        });
      }

      if(isLegalPic) this.isButtonMove = true;
      return isLegalPic;
    },
    handleRemoveUpload() {
      if(this.isPicUploaded && !this.onlyOnePicUploadedMessage) {
        Message({
          message: '文件已经被成功移除!',
          type: 'success',
          duration: 1000
        });
        this.isButtonMove = false;
        this.isPicUploaded = false;
        this.imageURL = '';
      }
      if(this.onlyOnePicUploadedMessage) {
        this.onlyOnePicUploadedMessage = false;
      }
    },
    handlePlus() {
      let row = {
        itemId: "",
        color: "",
        sex: "",
        price: "",
        inventory: ""
      }
      this.form.stockList.push(row);
    },
    handleMinus() {
      this.form.stockList.pop();
    },
    handleReset() {
      this.form = {
        category: "",
        productId: "",
        productName: "",
        publishStatus: 1,
        description: "",
        stockList: [
          {
            itemId: "",
            color: "",
            sex: "",
            price: "",
            inventory: ""
          }
        ]
      }
      Message({
        message: '宠物信息已重置!',
        type: 'success',
        duration: 1000
      });
    },
    handleConfirm() {
      this.$refs["editForm"].validate(valid => {
        if(valid) {
          this.isLoading = true;
          updateProduct(this.form).then(() => {
            Message({
              message: '宠物信息修改成功!',
              type: 'success',
              duration: 1000
            });
            this.isLoading = false;
            setTimeout(() => {
              this.$router.push('/main/product/list')
            }, 1000);
          });
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
      this.$store.dispatch("actionUpdateActiveIndex", "2-1");
      this.$router.push('/main/product/list');
    }
  }
}
</script>

<style>

  .edit-title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
    width: auto;
    position: relative;
    text-align: center;
    height: 100%;
    line-height: 50px;
    transition: color 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }

  .edit-title:hover {
    color: #409EFF;
  }

  .edit-title::before, .edit-title::after
  {
    content: '';
    transition: width 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    position: absolute;
    top: 0;
    height: 90%;
    border-bottom: 3px solid #409EFF;
    width: 0;
  }

  .edit-title::before
  {
    right: 50%;
  }

  .edit-title::after
  {
    left: 50%;
  }

  .edit-title:hover::before, .edit-title:hover::after
  {
    width: 25%;
  }

  .edit-card {
    position: relative;
  }

  .edit-card:hover {
    box-shadow: 1px 1px 20px #78abff;
  }

  .uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: 178px;
    overflow: hidden;
  }

  .uploader:hover {
    border-color: #409EFF;
  }

  .uploader-img {
    width: 178px;
    height: 178px;
    display: block;
  }

  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .uploader-label .el-form-item__label {
    margin-top: 70px;
  }

  .reset-button-in-edit {
    margin-top: 5px;
    margin-left: 120px!important;
  }

  .confirm-button-in-edit {
    margin-top: 5px;
    margin-left: 215px!important;
  }

  .minus-button-in-edit {
    position: absolute;
    right: 95px;
    top: 685px;
  }

  .plus-button-in-edit {
    position: absolute;
    right: 35px;
    top: 685px;
  }

  .plus-or-minus-button-move {
    top: 738px;
  }

  .return-button-in-product-edit {
    position: absolute;
    left: 10px;
    top: 20px
  }

</style>