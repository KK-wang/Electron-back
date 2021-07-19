<template>
  <div>
    <el-steps :active="active" finish-status="success" align-center class="step">
      <el-step title="商品基本信息"></el-step>
      <el-step title="商品照片及库存信息"></el-step>
      <el-step title="确认商品信息"></el-step>
    </el-steps>
    <el-card class="form-container" :class="{fadeInToLeft: fadeAnimate.formOneInToLeft,
                                             fadeOutToLeft: fadeAnimate.formOneOutToLeft,
                                             fadeInToRight: fadeAnimate.formOneInToRight,
                                             fadeOutToRight: fadeAnimate.formOneOutToRight}" v-if="fadeAnimate.isFormOneExist">
      <div>
        <el-form :model="form" :rules="rules" label-width="120px" style="width: 600px" ref="form-one">
          <el-form-item label="商品类别：" prop="category">
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
          <el-form-item label="商品编号：" prop="productId">
            <el-input v-model="form.productId" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品名称：" prop="productName">
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
          <el-form-item label="商品介绍：">
            <el-input
                v-model="form.description"
                :autoSize="true"
                type="textarea"
                placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="next-button-in-form-one" type="primary" @click="handleNext('form-one')">
          下一步&nbsp<i class="el-icon-d-arrow-right"></i>
        </el-button>
      </div>
    </el-card>
    <el-card class="form-container" :class="{fadeInToLeft: fadeAnimate.formTwoInToLeft,
                                             fadeOutToLeft: fadeAnimate.formTwoOutToLeft,
                                             fadeInToRight: fadeAnimate.formTwoInToRight,
                                             fadeOutToRight: fadeAnimate.formTwoOutToRight}" v-if="fadeAnimate.isFormTwoExist">
      <div>
        <el-form :model="form" :rules="rules" label-width="120px" style="width: 600px" ref="form-two">
          <el-form-item label="商品图片：" class="uploader-label">
            <el-upload action=""
                       ref="upload"
                       :http-request="customizeUpload"
                       :show-file-list="true"
                       class="uploader"
                       :before-upload="handleBeforeUpload"
                       :before-remove="handleRemoveUpload">
<!--              使用http-request覆盖掉默认的传输方法之后，on-success和on-error不起作用了，但是before-upload和before-remove还是会发挥作用的-->
              <img v-if="form.pic" :src="form.pic" alt="" class="uploader-img">
              <i v-else class="el-icon-plus uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品库存：" prop="stockList">
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
        <el-button type="primary" icon="el-icon-minus" circle class="minus-button" :class="{'plus-or-minus-button-move': isButtonMove}" @click="handleMinus"></el-button>
        <el-button type="primary" icon="el-icon-plus" circle class="plus-button" :class="{'plus-or-minus-button-move': isButtonMove}" @click="handlePlus"></el-button>
        <el-button class="previous-button-in-form-two" type="primary" @click="handlePrevious('form-two')">
          <i class="el-icon-d-arrow-left"></i>&nbsp上一步
        </el-button>
        <el-button class="next-button-in-form-two" type="primary" @click="handleNext('form-two')">
          下一步&nbsp<i class="el-icon-d-arrow-right"></i>
        </el-button>
      </div>
    </el-card>
    <el-card class="form-container" :class="{fadeInToLeft: fadeAnimate.formThreeInToLeft,
                                             fadeOutToLeft: fadeAnimate.formThreeOutToLeft,
                                             fadeInToRight: fadeAnimate.formThreeInToRight,
                                             fadeOutToRight: fadeAnimate.formThreeOutToRight}" v-if="fadeAnimate.isFormThreeExist">
      <div>
        <el-form :model="form" :rules="rules" label-width="120px" style="width: 600px" ref="form-three">
          <el-form-item label="商品类别：">
            <span style="float: left">
                 <svg-icon :icon-class="form.category" class="color-main"></svg-icon>
            </span>
            <span style="float: left; color: #8492a6; font-size: 15px; font-weight: bold; margin-left: 10px">{{ form.category }}</span>
          </el-form-item>
          <el-form-item label="商品编号：">
            <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ form.productId }}</span>
          </el-form-item>
          <el-form-item label="商品名称：">
            <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ form.productName }}</span>
          </el-form-item>
          <el-form-item label="是否上架：">
            <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ form.publishStatus === 1 ?  "是" : "否"}}</span>
          </el-form-item>
          <el-form-item label="商品介绍：">
            <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ form.description }}</span>
          </el-form-item>
          <el-form-item label="商品图片：" class="uploader-label">
            <img v-if="form.pic" :src="form.pic" alt="" class="uploader-img">
            <i v-else class="el-icon-info uploader-icon" style="border: 1px dashed #d9d9d9; border-radius: 6px; font-size: 16px">没有上传商品图片</i>
          </el-form-item>
          <el-form-item label="商品库存：">
            <el-table border style="width: 390px" :data="form.stockList">
              <el-table-column
                  label="库存编号"
                  align="center">
                <template slot-scope="scope">
                  <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ scope.row.itemId }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="颜色"
                  width="70px"
                  align="center">
                <template slot-scope="scope">
                  <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ scope.row.color }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="性别"
                  width="70px"
                  align="center">
                <template slot-scope="scope">
                  <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ scope.row.sex }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="销售价格"
                  width="80px"
                  align="center">
                <template slot-scope="scope">
                  <span style="color: #8492a6; font-size: 15px; font-weight: bold;">${{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="库存数目"
                  width="80px"
                  align="center">
                <template slot-scope="scope">
                  <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ scope.row.inventory }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
        <el-button class="previous-button-in-form-three" type="primary" @click="handlePrevious('form-three')">
          <i class="el-icon-d-arrow-left"></i>&nbsp上一步
        </el-button>
        <el-button class="confirm-button" type="success" @click="handleConfirm" :loading="isLoading">
          &nbsp确认提交&nbsp<i class="el-icon-check"></i>
        </el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
import { createProduct } from '@/api/product/add/add'
import { upload } from "../../../api/product/add/upload";
import { Message } from "element-ui";

export default {
  name: "add",
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
      active: 0,
      categoryOptions: ['PHONE', 'COMPUTER', 'WATCH', 'EARPHONE', 'PAD'],
      form: {
        category: "",
        productId: "",
        productName: "",
        publishStatus: 1,
        description: "",
        pic: null,
        stockList: [
          {
            itemId: "",
            color: "",
            sex: "",
            price: "",
            inventory: ""
          }
        ]
      },
      isPicUploaded: false,
      onlyOnePicUploadedMessage: false,
      isLoading: false,
      isButtonMove: false,
      rules: {
        category: [{required: true, message: '请选择商品种类', trigger: 'change'}],
        productId: [{required: true, message: '请选择商品编号', trigger: 'blur'}],
        productName: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符之间', trigger: 'blur'}
        ],
        stockList: [{required: true, validator: stockListValidate, trigger: 'blur'}],
      },
      fadeAnimate: {
        formOneInToLeft: true,
        formOneOutToLeft: false,
        formTwoInToLeft: false,
        formTwoOutToLeft: false,
        formThreeInToLeft: false,
        formThreeOutToLeft: false,
        formOneInToRight: false,
        formOneOutToRight: false,
        formTwoInToRight: false,
        formTwoOutToRight: false,
        formThreeInToRight: false,
        formThreeOutToRight: false,
        isFormOneExist: true,
        isFormTwoExist: false,
        isFormThreeExist: false
      }
    }
  },
  methods: {
    handleNext(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(formName === 'form-one') {
            this.fadeAnimate.formOneInToLeft = false;
            this.fadeAnimate.formOneOutToLeft = true;
            this.fadeAnimate.formOneInToRight = false;
            this.fadeAnimate.formOneOutToRight =false;
            setTimeout(() => {
              this.fadeAnimate.isFormOneExist = false;
              this.fadeAnimate.isFormTwoExist = true;
              this.fadeAnimate.formTwoInToLeft = true;
              this.fadeAnimate.formTwoOutToLeft = false;
              this.fadeAnimate.formTwoInToRight = false;
              this.fadeAnimate.formTwoOutToRight =false;
              setTimeout(() => {
                this.active = 1;
              }, 900);
            }, 800);
          } else if(formName === 'form-two') {
            this.fadeAnimate.formTwoInToLeft = false;
            this.fadeAnimate.formTwoOutToLeft = true;
            this.fadeAnimate.formTwoInToRight = false;
            this.fadeAnimate.formTwoOutToRight =false;
            setTimeout(() => {
              this.fadeAnimate.isFormTwoExist = false;
              this.fadeAnimate.isFormThreeExist = true;
              this.fadeAnimate.formThreeInToLeft = true;
              this.fadeAnimate.formThreeOutToLeft = false;
              this.fadeAnimate.formThreeInToRight = false;
              this.fadeAnimate.formThreeOutToRight =false;
              setTimeout(() => {
                this.active = 2;
              }, 900);
            }, 800);
          }
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration:1000
          });
          return false;
        }
      });
    },
    handlePrevious(formName) {
      if(formName === 'form-two') {
        this.fadeAnimate.formTwoInToLeft = false;
        this.fadeAnimate.formTwoOutToLeft = false;
        this.fadeAnimate.formTwoInToRight = false;
        this.fadeAnimate.formTwoOutToRight = true;
        setTimeout(() => {
          this.fadeAnimate.isFormTwoExist = false;
          this.fadeAnimate.isFormOneExist = true;
          this.fadeAnimate.formOneInToLeft = false;
          this.fadeAnimate.formOneOutToLeft = false;
          this.fadeAnimate.formOneInToRight = true;
          this.fadeAnimate.formOneOutToRight = false;
          setTimeout(() => {
            this.active = 0;
          }, 900);
        }, 800);
      } else if(formName === 'form-three') {
        this.fadeAnimate.formThreeInToLeft = false;
        this.fadeAnimate.formThreeOutToLeft = false;
        this.fadeAnimate.formThreeInToRight = false;
        this.fadeAnimate.formThreeOutToRight = true;
        setTimeout(() => {
          this.fadeAnimate.isFormThreeExist = false;
          this.fadeAnimate.isFormTwoExist = true;
          this.fadeAnimate.formTwoInToLeft = false;
          this.fadeAnimate.formTwoOutToLeft = false;
          this.fadeAnimate.formTwoInToRight = true;
          this.fadeAnimate.formTwoOutToRight = false;
          setTimeout(() => {
            this.active = 1;
          }, 900);
        }, 800);
      }
    },
    handleUploadSuccess() {
      this.isPicUploaded = true;
      Message({
        message: '上传成功!',
        type: 'success',
        duration: 1000
      })
    },
    handleUploadError() {
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

      const isLegalPic = file.type === 'image/jpeg';

      if (!isLegalPic) {
        Message({
          message: '上传的商品图片只能是 JPG 格式!',
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
        this.form.pic = '';
        this.$refs["upload"].clearFiles();
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
    handleConfirm() {
      this.isLoading = true;
      createProduct(this.form).then(() => {
        Message({
          message: '商品添加成功!',
          type: 'success',
          duration: 1000
        });
        this.isLoading = false;
        setTimeout(() => {
          this.$store.dispatch("actionUpdateActiveIndex", "2-1");
          this.$router.push('/main/product/list')
        }, 1000);
      });
    },
    customizeUpload(config) {
      let formData = new FormData()
      formData.append('file', config.file) //图像文件列表
      formData.append('fileName', config.file.name)
      config.onSuccess = this.handleUploadSuccess;
      config.onError = this.handleUploadError;
      let tempPromise = upload(config.onProgress, formData).then((response) => {
        this.form.pic = response.object;
      });
      tempPromise.abort = () => {};
      return tempPromise;
    }
  }
}
</script>

<style>

  .step {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 600px;
  }

  .fadeInToLeft {
    margin-top: 40px;
    opacity: 0;
    animation: fadeInToLeft 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards 0.1s;
  }

  .fadeInToLeft:hover{
    box-shadow: 1px 1px 20px #78abff;
  }

  @keyframes fadeInToLeft {
    0%
    {
      opacity: 0;
      transform: translateX(100%);
    }
    100%
    {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .fadeOutToLeft {
    margin-top: 40px;
    opacity: 1;
    animation: fadeOutToLeft 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards 0.1s;
  }

  @keyframes fadeOutToLeft {
    0%
    {
      opacity: 1;
      transform: translateX(0);
    }
    100%
    {
      opacity: 0;
      transform: translateX(-100%);
    }
  }

  .fadeInToRight {
    margin-top: 40px;
    opacity: 0;
    animation: fadeInToRight 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards 0.1s;
  }

  .fadeInToRight:hover{
    box-shadow: 1px 1px 20px #78abff;
  }

  @keyframes fadeInToRight {
    0%
    {
      opacity: 0;
      transform: translateX(-100%);
    }
    100%
    {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .fadeOutToRight {
    margin-top: 40px;
    opacity: 1;
    animation: fadeOutToRight 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards 0.1s;
  }

  @keyframes fadeOutToRight {
    0%
    {
      opacity: 1;
      transform: translateX(0);
    }
    100%
    {
      opacity: 0;
      transform: translateX(100%);
    }
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

  .next-button-in-form-one {
    margin-left: 260px;
    margin-top: 5px;
  }

  .previous-button-in-form-two {
    margin-top: 15px;
    margin-left: 120px!important;
  }

  .next-button-in-form-two {
    margin-top: 15px;
    margin-left: 170px!important;
  }

  .previous-button-in-form-three {
    margin-top: 5px;
    margin-left: 120px!important;
  }

  .confirm-button {
    margin-top: 5px;
    margin-left: 172px!important;
  }

  .minus-button {
    position: absolute;
    right: 95px;
    top: 270px;
  }

  .plus-button {
    position: absolute;
    right: 35px;
    top: 270px;
  }

  .plus-or-minus-button-move {
    top: 323px;
  }

</style>
