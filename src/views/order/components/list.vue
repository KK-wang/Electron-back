<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
            style="float:right"
            type="primary"
            @click="handleSearchList"
            size="small">
          查询搜索
        </el-button>
        <el-button
            style="float:right;margin-right: 15px"
            @click="handleResetSearch"
            size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model.number="listQuery.orderId" class="input-width" placeholder="订单编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input v-model="listQuery.receiverKeyword" class="input-width" placeholder="收货人姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker
                class="input-width"
                v-model="listQuery.createTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间"
                clearable>
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable"
                :data="orderList"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="200" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="用户账号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="订单是否发货" width="200" align="center">
          <template slot-scope="scope">{{scope.row.isShip === 1 ? '是' : '否'}}</template>
        </el-table-column>
        <el-table-column label="订单金额" width="200" align="center">
          <template slot-scope="scope">${{scope.row.totalAmount}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleViewOrder(scope.$index, scope.row)"
            >订单详情</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDeleteOrder(scope.$index, scope.row)"
            >删除订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
          size="small"
          v-model="operateType" placeholder="批量操作">
        <el-option
            v-for="item in operateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button
          style="margin-left: 20px"
          class="search-button"
          @click="handleBatchOperate()"
          type="primary"
          size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getOrderList} from "../../../api/order/list/list";
import {deleteOrder} from "../../../api/order/list/delete";

export default {
  name: "list",
  data() {
    return {
      listQuery: {
        orderId: null,
        receiverKeyword: '',
        createTime: '',
        pageNum: 1,
        pageSize: 5
      },
      orderList: null,
      total: null,
      listLoading: false,
      multipleSelection: [],
      operateOptions: [{label: "删除订单", value: "deleteOrder"}],
      operateType: null
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getOrderList(this.listQuery).then((response) => {
        console.log(response);
        this.orderList = response.list;
        this.total = response.total;
      });
      // this.orderList = [
      //   {
      //     orderId: 10001,
      //     createTime: '2021-04-04',
      //     userId: 'j2ee',
      //     isShip: 1,
      //     totalAmount: '444'
      //   },
      //   {
      //     orderId: 10002,
      //     createTime: '2021-04-04',
      //     userId: 'j2ee',
      //     isShip: 1,
      //     totalAmount: '444'
      //   },
      //   {
      //     orderId: 10003,
      //     createTime: '2021-04-04',
      //     userId: 'j2ee',
      //     isShip: 1,
      //     totalAmount: '444'
      //   },
      //   {
      //     orderId: 10004,
      //     createTime: '2021-04-04',
      //     userId: 'j2ee',
      //     isShip: 1,
      //     totalAmount: '444'
      //   },
      //   {
      //     orderId: 10005,
      //     createTime: '2021-04-04',
      //     userId: 'j2ee',
      //     isShip: 1,
      //     totalAmount: '444'
      //   }
      // ]
      // this.total = 5;
    },
    handleSearchList() {
      console.log(this.listQuery);
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleResetSearch() {
      this.listQuery = {
        orderId: null,
        receiverKeyword: '',
        createTime: '',
        pageNum: 1,
        pageSize: 5
      };
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
    },
    handleBatchOperate() {
      if(this.operateType==null){
        this.$message({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        });
        return;
      } // 防止用户还没有选择操作类型就按下确定按钮
      if(this.multipleSelection==null||this.multipleSelection.length<1){
        this.$message({
          message: '请选择要操作的宠物',
          type: 'warning',
          duration: 1000
        });
        return;
      } // 防止用户还没有选择要操作的商品就按下确定按钮
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 全局的一个MessageBox
        let ids=[]; // 表格中被选中的行的集合，它是一个列表，具体用来保存被选中行的productId
        for(let i=0;i<this.multipleSelection.length;i++){
          ids.push(this.multipleSelection[i].orderId);
          // 当所有的行都被check时，multipleSelection就相当于list
        }
        switch (this.operateType) { // operateType是动态绑定的，el-select选好label后，会将对应的value赋给它
          case this.operateOptions[0].value: // 匹配选择结果并执行对应操作
            this.deleteOrder(ids);
            break;
          default:
            break;
        }
        this.getList(); // 重新获取商品列表
        this.operateType = null;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleViewOrder(index, row) {
      this.$store.dispatch("actionUpdateActiveIndex", "3-2");
      this.$router.push({path:'/main/order/detail', query: {id: row.orderId}});
    },
    handleDeleteOrder(index, row) {
      this.$confirm('是否要删除订单', '提示', { // 给出了全局的一个 MessageBox，
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        ids.push(row.orderId);
        this.deleteOrder(ids);
      });
    },
    deleteOrder(ids) {
      let params = new URLSearchParams(); // URL的参数列表
      params.append('orderIds', ids);
      deleteOrder(params).then(response => {
        this.$message({ // 展示一个全局的Message
          message: '删除成功',
          type: 'success',
          duration: 1000
        });
        this.getList();
      });
    }
  }
}
</script>

<style scoped>

</style>
