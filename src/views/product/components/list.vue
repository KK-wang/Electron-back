<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
            style="float: right"
            @click="handleSearchList()"
            type="primary"
            size="small">
          查询结果
        </el-button>
        <el-button
            style="float: right;margin-right: 15px"
            @click="handleResetSearch()"
            size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="宠物名称：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="Name" clearable></el-input>
          </el-form-item>
          <el-form-item label="宠物编号：">
            <el-input style="width: 203px" v-model="listQuery.productId" placeholder="ProductId" clearable></el-input>
          </el-form-item>
          <el-form-item label="物种分类：">
            <el-select v-model="listQuery.category" placeholder="Category" clearable>
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
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
          class="btn-add"
          @click="handleAddProduct()"
          size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="宠物编号" width="100" align="center">
          <template slot-scope="scope"><p>{{scope.row.productId}}</p></template>
          <!--          此处的template是必不可少的，{{ }}里面的scope.row就相当于:data里面的list-->
          <!--          scope.row只能获取当前行-->
        </el-table-column>
        <el-table-column label="宠物图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic" alt=""></template>
        </el-table-column>
        <el-table-column label="宠物名称及描述" align="center">
          <template slot-scope="scope">
            <p>名称：{{scope.row.name}}</p>
            <p>描述：类别为&nbsp<svg-icon :icon-class="scope.row.category" class="color-main"></svg-icon>，{{scope.row.description}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="120" align="center">
          <template slot-scope="scope">
            <p>${{scope.row.price}}</p>
          </template>
        </el-table-column>
        <el-table-column label="是否上架" width="140" align="center">
          <template slot-scope="scope">
            <p>
              <el-switch
                  @change="handlePublishStatusChange(scope.$index, scope.row)"
                  :active-value="1"
                  :inactive-value="0"
                  v-model="scope.row.publishStatus"
                  active-text="是"
                  inactive-text="否">
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="库存详情" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleShowSkuEditDialog(scope.$index, scope.row)" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="销量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sale}} 只</template>
        </el-table-column>

        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                  size="mini"
                  @click="handleUpdateProduct(scope.$index, scope.row)">编辑
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
          size="small"
          v-model="operateType" placeholder="批量操作">
        <el-option
            v-for="item in operates"
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
          layout="total,sizes,prev,pager,next,jumper"
          :page-size="listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :current-page.sync="listQuery.pageNum"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog
        title="编辑货品信息"
        :visible.sync="editSkuInfo.dialogVisible"
        width="40%">
      <span>宠物编号：</span>
      <span>{{editSkuInfo.productId}}</span>
      <el-table style="width: 100%;margin-top: 20px"
                :data="editSkuInfo.stockList"
                border>
        <el-table-column
            label="库存编号"
            align="center">
          <template slot-scope="scope">
            {{ scope.row.itemId }}
          </template>
        </el-table-column>
        <el-table-column
            label="颜色"
            width="80"
            align="center">
          <template slot-scope="scope">
            {{ scope.row.color }}
          </template>
        </el-table-column>
        <el-table-column
            label="性别"
            width="80"
            align="center">
          <template slot-scope="scope">
            {{ scope.row.sex }}
          </template>
        </el-table-column>
        <el-table-column
            label="销售价格"
            width="120"
            align="center">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.price">
<!--              注意数据类型！！！-->
              <i slot="prefix" class="el-input__icon el-icon-coin"></i>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="库存数目"
            width="120"
            align="center">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.inventory">
              <i slot="prefix" class="el-input__icon el-icon-box"></i>
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  updatePublishStatus
} from '@/api/product/list/list'
import {fetchList as fetchStockList,update as updateStockList} from '@/api/product/list/stock'

const defaultListQuery = {
  // 其中含有筛选参数，都是双向绑定的
  keyword: null,
  pageNum: 1,
  pageSize: 5,
  productId: null,
  category: null
};
export default {
  name: "list",
  data() {
    return {
      editSkuInfo:{
        dialogVisible:false,
        productId:'',
        stockList:[], // 库存界面的数据全部是放在这儿的
      },
      // 宠物库存编辑框
      operates: [
        {
          label: "宠物上架",
          value: "publishOn"
        },
        {
          label: "宠物下架",
          value: "publishOff"
        }
      ],
      // 批量操作选项
      operateType: null,
      // 批量操作类型
      listQuery: Object.assign({}, defaultListQuery),
      // 上面这段代码的意思就是，将defaultListQuery这个对象赋值给listQuery
      list: [],
      // 表格数据
      total: 5, // 假数据！
      // 用来设定页面下方的页码总数
      listLoading: true,
      // 当加载比较慢的时候，会有一个圆圈在旋转
      multipleSelection: [],
      // 批量操作
      categoryOptions: ['BIRDS', 'CATS', 'DOGS', 'FISH', 'REPTILES']
      // 物种分类，这个就直接写死
    }
  },
  created() {
    this.getList(); // 用来请求表格中的信息，同时加载下方的总页码
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        // listQuery中含有筛选参数
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.total;
      });
    },
    handleShowSkuEditDialog(index,row){
      // index是这一行的下标，row是这一行的数据，这里的数据指的是外表格的数据
      // 用来获取库存数据
      this.editSkuInfo.dialogVisible=true;
      this.editSkuInfo.productId=row.productId; // 通过productId来获取库存数据
      fetchStockList(row.productId).then(response=>{
        this.editSkuInfo.stockList=response;
      });
    },
    handleEditSkuConfirm(){
      if(this.editSkuInfo.stockList==null||this.editSkuInfo.stockList.length<=0){
        this.$message({
          message: '暂无库存信息',
          type: 'warning',
          duration: 1000
        });
        return;
      } // 为了防止用户在没有库存信息的情况下，点击确认按钮
      this.$confirm('是否要进行修改', '提示', { // 给出了全局的一个 MessageBox，
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{ // 点击确定按钮之后，会回调的函数。
        let updateStockListData = {
          productId: this.editSkuInfo.productId,
          stockList: this.editSkuInfo.stockList
        }
        console.log(updateStockListData);
        updateStockList(updateStockListData).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
          this.editSkuInfo.dialogVisible=false;
        });
      });
    },
    handleSearchList() { // 筛选函数
      this.listQuery.pageNum = 1; // 将显示页码调整至第一页
      this.getList(); // 表单的数据传输在getList()中进行
    },
    handleAddProduct() {
      this.$store.dispatch("actionUpdateActiveIndex", "2-2");
      this.$router.replace({path:'/main/product/add'});
      // 跳转至新增商品页面
    },
    handleBatchOperate() {
      // 进行批量处理操作
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
          ids.push(this.multipleSelection[i].productId);
          // 当所有的行都被check时，multipleSelection就相当于list
        }
        switch (this.operateType) { // operateType是动态绑定的，el-select选好label后，会将对应的value赋给它
          case this.operates[0].value: // 匹配选择结果并执行对应操作
            this.updatePublishStatus(1,ids);
            break;
          case this.operates[1].value:
            this.updatePublishStatus(0,ids);
            break;
          default:
            break;
        }
        this.getList(); // 重新获取商品列表
        this.operateType = null;
      });
    },
    handleSizeChange(val) { // 用来修改下方的页码的单页数目的
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) { // 用来修改当前的页码
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleSelectionChange(val) {
      // 当checkbox被选中时会触发该事件，其中val是会自动传进来的参数，
      // 它包含了所有当前被选中的行(所保存的数据)，即row，它是:data="list"的list中的一行
      this.multipleSelection = val;
    },
    handlePublishStatusChange(index, row) { // 用来监听是否上架按钮，控制publishStatus属性
      let ids = [];
      ids.push(row.productId);
      this.updatePublishStatus(row.publishStatus, ids);
    },
    handleResetSearch() { // 用来监听重置按钮
      this.listQuery = Object.assign({}, defaultListQuery); // 给listQuery重新赋值
    },
    handleUpdateProduct(index,row){ // 用来监听编辑按钮
      this.$store.dispatch("actionUpdateActiveIndex", "2-4");
      this.$router.push({path:'/main/product/edit', query: {id: row.productId}});
    },
    updatePublishStatus(publishStatus, ids) { // 真正用来修改上架状态的函数
      let params = new URLSearchParams(); // URL的参数列表
      params.append('ids', ids);
      params.append('publishStatus', publishStatus);
      // URL的参数列表类似于 ids=26&publishStatus=0
      // publishStatus为1时就为上架，为0时就为下架
      updatePublishStatus(params).then(response => {
        this.$message({ // 展示一个全局的Message
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    }
  }
}
</script>
<style></style>
