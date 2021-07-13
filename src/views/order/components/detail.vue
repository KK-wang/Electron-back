<template>
  <div class="detail-container">
    <div>
      <el-steps :active="formatStepStatus(order.isShip)" finish-status="success" align-center>
        <el-step title="提交订单" :description="formatTime(order.createTime)"></el-step>
        <el-step title="支付订单" :description="formatTime(order.paymentTime)"></el-step>
        <el-step title="平台发货" :description="formatTime(order.deliveryTime)"></el-step>
        <el-step title="用户收货" :description="formatTime(order.receiveTime)"></el-step>
      </el-steps>
    </div>
    <el-card style="margin-top: 15px">
      <div class="operate-container">
        <i :class="{'el-icon-warning': order.isShip===0, 'color-danger': order.isShip===0,
                    'el-icon-success': order.isShip===1, 'color-success': order.isShip===1}" style="margin-left: 20px"></i>
        <span :class="{'color-danger': order.isShip===0, 'color-success': order.isShip===1}">当前订单状态：{{order.isShip | formatStatus}}</span>
        <div class="operate-button-container" v-if="order.isShip===0">
          <el-button type="primary" @click="handleDeliveryDialog">立即发货</el-button>
        </div>
        <div class="operate-button-container" v-if="order.isShip===1">
          <el-button type="primary" @click="handleTrackDialog">订单跟踪</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">订单基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">订单编号</el-col>
          <el-col :span="6" class="table-cell-title">用户账号</el-col>
          <el-col :span="6" class="table-cell-title">配送方式</el-col>
          <el-col :span="6" class="table-cell-title">支付方式</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{order.orderId}}</el-col>
          <el-col :span="6" class="table-cell">{{order.buyers.userId}}</el-col>
          <el-col :span="6" class="table-cell">{{order.deliveryWay}}</el-col>
          <el-col :span="6" class="table-cell">
            <el-popover
              placement="right"
              title="详情信息："
              width="200"
              trigger="hover">
              <span slot="reference" style="border-bottom: 2px dashed #dd0c2b; cursor: default">{{order.buyers.payWay}}</span>
              <div>
                <span><svg-icon icon-class="bank"></svg-icon> 银行类型：Visa</span><br>
                <span><svg-icon icon-class="bankCard"></svg-icon> 银行卡号：</span><br>
                <span>999 9999 9999 9999</span>
              </div>
          </el-popover>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">收货人信息</span>
        <span v-if="order.isShip === 0"><el-button size="mini" type="primary" style="float: right;" @click="editReceiverInfoDialog">编辑收货人信息</el-button></span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">收货人</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="6" class="table-cell-title">收货地址</el-col>
          <el-col :span="6" class="table-cell-title">邮政编码</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{fullName}}</el-col>
          <el-col :span="6" class="table-cell">{{order.receiver.phone}}</el-col>
          <el-col :span="6" class="table-cell">
            {{order.receiver.country}}
            {{order.receiver.state}}
            {{order.receiver.city}}
            {{order.receiver.addressOne}}
          </el-col>
          <el-col :span="6" class="table-cell">{{order.receiver.zip}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">所购宠物信息</span>
        <span v-if="order.isShip === 0"><el-button size="mini" type="primary" style="float: right;" @click="editItemListInfoDialog">编辑所购宠物信息</el-button></span>
      </div>
      <el-table
          ref="orderItemTable"
          :data="order.orderItemList"
          style="width: 100%; margin-top: 20px" border>
        <el-table-column label="物种分类" width="120" align="center">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.category" class="color-main"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column label="宠物图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" style="height: 80px" alt="">
          </template>
        </el-table-column>
        <el-table-column label="宠物编号" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="宠物名称" align="center">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="宠物详情" width="200" align="center">
            <el-table-column label="库存编号" width="100" align="center">
              <template slot-scope="scope">
              {{scope.row.itemInfo.itemId}}
              </template>
            </el-table-column>
            <el-table-column label="宠物单价" width="100" align="center">
              <template slot-scope="scope">
              {{scope.row.itemInfo.price}}
              </template>
            </el-table-column>
        </el-table-column>
        <el-table-column label="数量" width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.num}}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="100" align="center">
          <template slot-scope="scope">
            ${{scope.row.itemInfo.price * scope.row.num}}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin: 20px">
        合计：<span class="color-danger">${{order.totalAmount}}</span>
      </div>
      <el-button class="return-button-in-order-detail" type="primary" @click="handleReturn">
        <i class="el-icon-back"></i>&nbsp返回
      </el-button>
    </el-card>

    <el-dialog
        :visible.sync="deliveryDialogVisible"
        title="填写发货信息"
        width="40%"
        destroy-on-close
        center
        class="deliveryDialog">
      <el-form :model="order" :rules="rules" label-width="120px" style="width: 563px; margin-top: -50px; margin-bottom: 5px" class="delivery-form-container" ref="deliveryDialogForm">
        <el-form-item label="订单编号：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ order.orderId }}</span>
        </el-form-item>
        <el-form-item label="用户账号：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ order.buyers.userId }}</span>
        </el-form-item>
        <el-form-item label="收货人姓名：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ fullName }}</span>
        </el-form-item>
        <el-form-item label="手机号码：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ order.receiver.phone }}</span>
        </el-form-item>
        <el-form-item label="邮政编码：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">{{ order.receiver.zip }}</span>
        </el-form-item>
        <el-form-item label="收货地址：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">
            {{order.receiver.country}}
            {{order.receiver.state}}
            {{order.receiver.city}}
            {{order.receiver.addressOne}}
          </span>
        </el-form-item>
        <el-form-item label="订单金额：">
          <span style="color: #8492a6; font-size: 15px; font-weight: bold;">${{ order.totalAmount }}</span>
        </el-form-item>
        <el-form-item label="配送方式：" prop="deliveryWay">
          <el-select v-model="order.deliveryWay" placeholder="请选择">
            <el-option
                v-for="item in deliveryWayOptions"
                :key="item"
                :value="item"
                :label="item">
              {{ item }}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="handleDeliveryDialogCancel">
          取消&nbsp<i class="el-icon-close"></i>
        </el-button>
        <el-button type="primary" @click="handleDeliveryDialogConfirm" :loading="deliveryDialogConfirmButtonLoading">
          确定&nbsp<i class="el-icon-check"></i>
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
       :visible.sync="editReceiverInfoDialogVisible"
       title="编辑收货人信息"
       width="40%"
       destroy-on-close
       center>
      <el-form :model="tempReceiverInfo" :rules="rules" label-width="120px" style="width: 563px; margin-top: -40px; margin-bottom: -5px" class="form-container" ref="editReceiverInfoDialogForm">
        <el-form-item label="收货人的姓：" prop="firstName">
          <el-input v-model="tempReceiverInfo.firstName" clearable style="width: 315px"></el-input>
        </el-form-item>
        <el-form-item label="收货人的名：" prop="lastName">
          <el-input v-model="tempReceiverInfo.lastName" clearable style="width: 315px"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="tempReceiverInfo.phone" clearable style="width: 315px"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码：" prop="zip">
          <el-input v-model="tempReceiverInfo.zip" clearable style="width: 315px"></el-input>
        </el-form-item>
        <el-form-item label="收货地区：" prop="area">
          <el-cascader
              placeholder="请选择收货地区"
              v-model="tempReceiverInfo.area"
              :options="cascaderOptions"
              :props="{expandTrigger: 'hover'}">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址：" prop="addressOne">
          <el-input v-model="tempReceiverInfo.addressOne" clearable style="width: 315px"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="handleReceiverInfoDialogCancel">
          取消&nbsp<i class="el-icon-close"></i>
        </el-button>
        <el-button type="primary" @click="handleReceiverInfoDialogConfirm" :loading="receiverInfoDialogConfirmButtonLoading">
          确定&nbsp<i class="el-icon-check"></i>
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
        :visible.sync="editItemListInfoDialogVisible"
        title="编辑所购宠物信息"
        width="50%"
        destroy-on-close
        center>
      <el-form :model="tempItemListObject" :rules="rules" ref="editItemListInfoForm">
        <el-form-item prop="tempItemList">
          <el-table
              :data="tempItemListObject.tempItemList"
              style="width: 85%; margin-top: -10px; margin-bottom: 5px" border>
            <el-table-column label="物种分类" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.category" placeholder="请选择" prop="category" clearable>
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
              </template>
            </el-table-column>
            <el-table-column label="宠物编号" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.productId" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="库存编号" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemId" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.num" clearable></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-minus" circle class="minus-button-in-edit-order-item-list" @click="handleMinus"></el-button>
      <el-button type="primary" icon="el-icon-plus" circle class="plus-button-in-edit-order-item-list" @click="handlePlus"></el-button>
      <span class="edit-item-list-dialog-footer">
        <el-button @click="handleItemListInfoDialogCancel">
          取消&nbsp<i class="el-icon-close"></i>
        </el-button>
        <el-button type="primary" @click="handleItemListInfoDialogConfirm" :loading="itemListInfoDialogConfirmButtonLoading">
          确定&nbsp<i class="el-icon-check"></i>
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
        :visible.sync="orderTrackDialogVisible"
        title="订单跟踪"
        width="40%"
        destroy-on-close
        center>
      <el-steps direction="vertical"
                :active="6"
                finish-status="success"
                space="50px">
        <el-step  v-for="item in trackList"
                  :key="item.name"
                  :title="item.name"
                  :description="item.time"></el-step>
      </el-steps>
      <span style="margin-left: 235px;">
        <el-button type="primary" @click="handleOrderTrackDialogClose">
          关闭&nbsp<i class="el-icon-close"></i>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {formatDate} from '@/utils/date';
import {getOrder} from "../../../api/order/detail/detail";
import {delivery} from "../../../api/order/detail/delivery";
import {editReceiverInfo} from "../../../api/order/detail/editReceiverInfo";
import {editItemListInfo} from "../../../api/order/detail/editItemListInfo";

export default {
  name: "detail",
  data() {
    let deliveryValidate = (rule, value, callback) => {
      if(this.order.deliveryWay === '待定') {
        callback(new Error('请选择配送方式!'))
      } else {
        callback()
      }
    }
    let tempItemListValidate = (rule, value, callback) => {
      for(let tempItem of this.tempItemListObject.tempItemList) {
        if(tempItem.category === '' || tempItem.productId === '' || tempItem.itemId === '' || tempItem.num === '') {
          callback(new Error('请完善库存信息!'));
          return;
        }
      }
      callback()
    }
    return {
      order: { },
      tempReceiverInfo: {},
      tempItemListObject: {
        tempItemList: [],
      },
      deliveryDialogVisible: false,
      editReceiverInfoDialogVisible: false,
      orderTrackDialogVisible: false,
      editItemListInfoDialogVisible: false,
      categoryOptions: ['BIRDS', 'CATS', 'DOGS', 'FISH', 'REPTILES'],
      deliveryWayOptions: ['顺丰快递', '圆通快递', '中通快递', '韵达快递'],
      rules: {
        deliveryWay: [{required: true, validator: deliveryValidate, trigger: 'blur'}],
        firstName: [{required: true, message: '请输入收货人的姓', trigger: 'blur'}],
        lastName: [{required: true, message: '请输入收货人的名', trigger: 'blur'}],
        phone: [{required: true, message: '请输入收货人电话', trigger: 'blur'}],
        zip: [{required: true, message: '请输入收货人所在地区的邮编', trigger: 'blur'}],
        area: [{required: true, message: '请输入收货人的收货地区', trigger: 'change'}],
        addressOne: [{required: true, message: '请输入收货人的详细地址', trigger: 'blur'}],
        tempItemList: [{validator: tempItemListValidate, trigger: 'blur'}]
      },
      deliveryDialogConfirmButtonLoading: false,
      receiverInfoDialogConfirmButtonLoading: false,
      itemListInfoDialogConfirmButtonLoading: false,
      cascaderOptions: [
        {
          value: '中国',
          label: '中国',
          children: [
            {
              value: '湖南省',
              label: '湖南省',
              children: [
                  {
                    value: '长沙市',
                    label: '长沙市'
                  },
                  {
                    value: '湘潭市',
                    label: '湘潭市'
                  }
               ]
            },
            {
              value: '山西省',
              label: '山西省',
              children: [
                {
                  value: '太原市',
                  label: '太原市'
                },
                {
                  value: '晋中市',
                  label: '晋中市'
                }
              ]
            }
          ]
        },
        {
          value: '美国',
          label: '美国',
          children: [
            {
              value: '加利福尼亚州',
              label: '加利福尼亚州',
              children: [
                {
                  value: '洛杉矶',
                  label: '洛杉矶'
                },
                {
                  value: '旧金山',
                  label: '旧金山'
                }
              ]
            },
            {
              value: '纽约州',
              label: '纽约州',
              children: [
                {
                  value: '纽约',
                  label: '纽约'
                },
                {
                  value: '罗彻斯特',
                  label: '罗彻斯特'
                }
              ]
            }
          ]
        }
      ],
      trackList: [
        {name: '订单已提交，等待付款',time:'2021-04-04 8:00:00'},
        {name: '订单付款成功',time:'2021-04-04 8:00:00'},
        {name: '平台已发货',time:'2021-04-04 8:00:00'},
        {name: '在北京市进行下级地点扫描',time:'2021-04-04 8:00:00'},
        {name: '在分拨中心广东深圳公司进行卸车扫描',time:'2021-04-04 8:00:00'},
        {name: '在广东深圳公司进行发出扫描',time:'2021-04-04 8:00:00'},
        {name: '到达目的地网点广东深圳公司，快件将很快进行派送',time:'2021-04-04 8:00:00'},
        {name: '用户收货，对此次服务进行点评',time:''}
      ]
    };
  },
  computed: {
    fullName() {
      return this.order.receiver.firstName + this.order.receiver.lastName;
    }
  },
  created() {
    this.order = {
      buyers: {
        userId: ''
      },
      receiver: {
        firstName: ''
      }
    }
    this.getOrder();
  },
  methods: {
    getOrder() {
      getOrder(this.$route.query.id).then(response => {
        this.order = response;
        console.log(this.order.deliveryWay);
        this.order.totalAmount = 0;
        for(let item of this.order.orderItemList) {
          this.order.totalAmount += item.num * item.itemInfo.price;
        }
      });
    },
    formatTime(time) {
      if (time == null || time === '') {
        return '';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatStepStatus(value) {
      if (value === 0) {
        //待发货
        return 2;
      } else {
        //已发货
        return 3;
      }
    },
    handleReturn() {
      this.$store.dispatch("actionUpdateActiveIndex", "3-1");
      this.$router.push({path:'/main/order/list'});
    },
    handleDeliveryDialog() {
      this.deliveryDialogVisible = true;
    },
    handleDeliveryDialogCancel() {
      this.deliveryDialogVisible = false;
      this.order.deliveryWay = '待定';
    },
    handleDeliveryDialogConfirm() {
      this.$refs['deliveryDialogForm'].validate((valid) => {
        if(valid) {
          this.$confirm('确定要发货吗?', '提示', { // 给出了全局的一个 MessageBox，
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deliveryDialogConfirmButtonLoading = true;
            let deliveryTime = new Date();
            delivery(this.order.orderId, this.order.deliveryWay, formatDate(deliveryTime, 'yyyy-MM-dd hh:mm:ss')).then(() => {
              setTimeout(() => {
                this.deliveryDialogConfirmButtonLoading = false;
                this.$message({
                  message: '发货成功',
                  type: 'success',
                  duration:1000
                });
                this.order.isShip = 1;
                setTimeout(() => {
                  this.deliveryDialogVisible = false;
                  this.getOrder();
                }, 500)
              }, 1000);
            });
          });
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
    editReceiverInfoDialog() {
      // 对象的赋值只是传了一下地址！下面这个才是拷贝！
      this.tempReceiverInfo = Object.assign({}, this.order.receiver, {area: ''}); // 会把area也加tempReceiver！
      // 这个就是浅拷贝！
      this.editReceiverInfoDialogVisible = true;
      /**
       * 赋值和浅拷贝的区别：
       * 先看赋值，将一个对象赋值给一个新的对象的时候，赋的其实是该对象在栈中的地址，而不是堆中的数据。也就是一个对象的改变就会改变另外一个对象。
       * 再看浅拷贝，浅拷贝会创建一个对象，再去遍历原始对象，如果原对象的属性值是基础类型，那么就拷贝基础类型，如果是引用类型，则拷贝的是指针。
       */
    },
    handleReceiverInfoDialogCancel() {
      this.editReceiverInfoDialogVisible = false;
    },
    handleReceiverInfoDialogConfirm() {
      this.$refs['editReceiverInfoDialogForm'].validate((valid) => {
        if(valid) {
          this.$confirm('确定要修改收货人信息吗?', '提示', { // 给出了全局的一个 MessageBox，
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.receiverInfoDialogConfirmButtonLoading = true;
            editReceiverInfo(this.order.orderId, this.tempReceiverInfo).then(() => {
              setTimeout(() => {
                this.receiverInfoDialogConfirmButtonLoading = false;
                this.$message({
                  message: '收货人信息修改成功',
                  type: 'success',
                  duration:1000
                });
                setTimeout(() => {
                  this.editReceiverInfoDialogVisible = false;
                  this.getOrder();
                }, 500)
              }, 1000);
            });
          });
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
    editItemListInfoDialog() {
      this.tempItemListObject.tempItemList = [];
      for(let i = 0; i < this.order.orderItemList.length; i++) {
        let editItem = {
          category: '',
          productId: '',
          itemId: '',
          num: ''
        }
        editItem.category = this.order.orderItemList[i].category;
        editItem.productId = this.order.orderItemList[i].id;
        editItem.itemId = this.order.orderItemList[i].itemInfo.itemId;
        editItem.num = this.order.orderItemList[i].num;
        this.tempItemListObject.tempItemList.push(editItem);
      }
      // 也可以利用JSON实现暴力深拷贝！
      this.editItemListInfoDialogVisible = true;
    },
    handleMinus() {
      this.tempItemListObject.tempItemList.pop();
    },
    handlePlus() {
      let row = {
        category: '',
        productId: '',
        itemId: '',
        num: ''
      }
      this.tempItemListObject.tempItemList.push(row);
    },
    handleItemListInfoDialogCancel() {
      this.tempItemListObject.tempItemList = [];
      for(let i = 0; i < this.order.orderItemList.length; i++) {
        let editItem = {
          category: '',
          productId: '',
          itemId: '',
          num: ''
        }
        editItem.category = this.order.orderItemList[i].category;
        editItem.productId = this.order.orderItemList[i].id;
        editItem.itemId = this.order.orderItemList[i].itemInfo.itemId;
        editItem.num = this.order.orderItemList[i].num;
        this.tempItemListObject.tempItemList.push(editItem);
      }
      this.editItemListInfoDialogVisible = false;
    },
    handleItemListInfoDialogConfirm() {
      this.$refs['editItemListInfoForm'].validate((valid) => {
        if(valid) {
          this.$confirm('确定要修改所购宠物信息吗?', '提示', { // 给出了全局的一个 MessageBox，
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.itemListInfoDialogConfirmButtonLoading = true;
            editItemListInfo(this.order.orderId, this.tempItemListObject.tempItemList).then(() => {
              setTimeout(() => {
                this.itemListInfoDialogConfirmButtonLoading = false;
                this.$message({
                  message: '所购宠物信息修改成功',
                  type: 'success',
                  duration:1000
                });
                setTimeout(() => {
                  this.editItemListInfoDialogVisible = false;
                  this.getOrder();
                }, 500)
              }, 1000);
            });
          });
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration:1000
          });
          this.itemListInfoDialogConfirmButtonLoading = false;
          return false;
        }
      });
    },
    handleTrackDialog() {
      this.orderTrackDialogVisible = true;
    },
    handleOrderTrackDialogClose() {
      this.orderTrackDialogVisible = false;
    }
  },
  filters: {
    formatStatus(value) {
      if (value === 0) {
        return '待发货';
      } else {
        return '已发货';
      }
    }
  }
}
</script>

<style scoped>
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #F2F6FC;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #DCDFE6;
  border-top: 1px solid #DCDFE6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  background: #F2F6FC;
  text-align: center;
  font-size: 14px;
  color: #303133;
}

.delivery-form-container {
  position: relative;
  left: 0;
  right: 0;
  width: 720px;
  padding: 35px 35px 15px 35px;
  margin: 20px auto;
}

.delivery-form-container>.el-form-item{
  margin-bottom: 0!important;
}

.dialog-footer {
  margin-left: 185px;
}

.edit-item-list-dialog-footer {
  margin-left: 260px;
}

.el-cascader{
  width: 315px!important;
}

.return-button-in-order-detail {
  margin-left: 530px;
  margin-top: 50px;
}

.minus-button-in-edit-order-item-list {
  position: absolute;
  top: 82px;
  right: 75px;
}

.plus-button-in-edit-order-item-list {
  position: absolute;
  top: 82px;
  right: 20px;
}

</style>