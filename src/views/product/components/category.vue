<template>
  <div class="app-container category-list">
    <el-card class="category-card">
      <div class="category-title">商品类别</div>
      <div class="table-container">
        <el-table ref="productCateTable"
                  style="width: 100%"
                  :data="categoryList"
                  v-loading="categoryListLoading" border>
          <el-table-column label="编号" width="60px" align="center">
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column label="类别名称" align="center">
            <template slot-scope="scope">{{scope.row.categoryName}}</template>
          </el-table-column>
          <el-table-column label="类别图标" align="center">
            <template slot-scope="scope"><svg-icon :icon-class="scope.row.categoryName" class="color-main"></svg-icon></template>
          </el-table-column>
          <el-table-column label="商品数量" align="center">
            <template slot-scope="scope">{{scope.row.productCount}}</template>
          </el-table-column>
          <el-table-column label="编辑类别信息" align="center" width="210px">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="handleCategoryEditDialog(scope.$index, scope.row)" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import {Message} from "element-ui";
// 在 vue cli 中引入图片就这样引用！

export default {
  name: "category",
  data() {
    return {
      categoryList: null,
      total: null,
      categoryListLoading: true,
      categoryListQuery: {
        pageNum: 1,
        pageSize: 5
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.categoryListLoading = true;
      setTimeout(() => {
        this.categoryListLoading = false;
      }, 500);
      this.categoryList = [
        {
          categoryName: "PHONE",
          productCount: "100",
          navStatus: 1
        },
        {
          categoryName: "COMPUTER",
          productCount: "100",
          navStatus: 1
        },
        {
          categoryName: "WATCH",
          productCount: "100",
          navStatus: 1
        },
        {
          categoryName: "EARPHONE",
          productCount: "100",
          navStatus: 1
        },
        {
          categoryName: "PAD",
          productCount: "100",
          navStatus: 1
        }
      ];
    },
    handleCategoryEditDialog(index, row) {
      Message({
        message: '尚不支持编辑类别信息!',
        type: 'warning',
        duration: 1000
      })
    }
  },
}
</script>

<style scoped>

  .category-list {
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 70px;
  }

  .category-card:hover {
    box-shadow: 1px 1px 20px #78abff;
  }

  .category-title {
    font-size: 25px;
    font-weight: bold;
    margin: 10px auto 30px;
    width: 18%;
    position: relative;
    text-align: center;
    height: 100%;
    line-height: 50px;
    transition: color 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }

  .category-title:hover {
    color: #409EFF;
  }

  .category-title::before, .category-title::after
  {
    content: '';
    transition: width 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    position: absolute;
    top: 0;
    height: 90%;
    border-bottom: 3px solid #409EFF;
    width: 0;
  }

  .category-title::before
  {
    right: 50%;
  }

  .category-title::after
  {
    left: 50%;
  }

  .category-title:hover::before, .category-title:hover::after
  {
    width: 50%;
  }

</style>
