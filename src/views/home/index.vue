<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="out-border cool-border">
            <div class="layout-title">MyPetStore后台管理系统</div>
            <div class="address-content">
              {{ greeting }}, <span class="color-main">OutSider</span>！虽然我已经问过好了，但是为了让这边显得不那么空旷，我决定再水点儿。
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame cool-border">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">今日订单总数</div>
            <div class="total-value">4</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame cool-border">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">今日销售总额</div>
            <div class="total-value">$24.00</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame cool-border">
            <img :src="img_home_yesterday_amount" class="total-icon">
            <div class="total-title">累计销售总额</div>
            <div class="total-value">$493.00</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-card class="mine-layout personalInformation">
      <div class="imgDiv">
        <img style="width:200px; height:200px; border-radius:50%; " src="@/assets/images/avatar.jpg">
        <div class="mask thin"></div>
        <div class="text thin">
          <div class="look_more">
            <svg-icon icon-class="user-information" class="color-main"></svg-icon>
            详情信息
          </div>
          <div class="admin-information">
            昵称: OutSider <br>
            性别: 男 <br>
            年龄: 21 <br>
            爱好: 减肥 <br>
            现住址: 铁二舍 <br>
            感情状况: 单身
          </div>
        </div>
      </div>
    </el-card>

    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border cool-border">
            <div class="layout-title">宠物总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">17</el-col>
                <el-col :span="6" class="color-danger overview-item-value">3</el-col>
                <el-col :span="6" class="color-danger overview-item-value">2</el-col>
                <el-col :span="6" class="color-danger overview-item-value">17</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">库存紧张</el-col>
                <el-col :span="6" class="overview-item-title">全部宠物</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border cool-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">3</el-col>
                <el-col :span="6" class="color-danger overview-item-value">5</el-col>
                <el-col :span="6" class="color-danger overview-item-value">12</el-col>
                <el-col :span="6" class="color-danger overview-item-value">20</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">用户总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-layout cool-border">
      <div class="layout-title">订单统计</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">42</div>
              <div>
                <span class="color-success" style="font-size: 14px">+8%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">12</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-16%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">$236</div>
              <div>
                <span class="color-success" style="font-size: 14px">+27%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">$86</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-24%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
                style="float: right;z-index: 1"
                size="small"
                v-model="orderCountDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleDateChange">
            </el-date-picker>
            <div>
              <ve-line
                  :data="chartData"
                  :legend-visible="false"
                  :settings="chartSettings"></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-layout cool-border">
      <div class="layout-title">销量统计</div>
      <div class="chart-layout">
        <div id="pie-chart"></div>
        <div id="bar-chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {options} from './options'
import {str2Date} from '@/utils/date';
import img_home_order from '@/assets/images/home_order.png';
import img_home_today_amount from '@/assets/images/home_today_amount.png';
import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
const DATA_FROM_BACKEND = {
  columns: ['date', 'orderCount','orderAmount'],
  rows: [
    {date: '2021-03-26', orderCount: 4, orderAmount: 1093},
    {date: '2021-03-27', orderCount: 8, orderAmount: 2230},
    {date: '2021-03-28', orderCount: 3, orderAmount: 3623},
    {date: '2021-03-29', orderCount: 5, orderAmount: 6423},
    {date: '2021-03-30', orderCount: 8, orderAmount: 8492},
    {date: '2021-03-31', orderCount: 6, orderAmount: 6293},
    {date: '2021-04-01', orderCount: 7, orderAmount: 2293},
    {date: '2021-04-02', orderCount: 3, orderAmount: 6293},
    {date: '2021-04-03', orderCount: 2, orderAmount: 5293},
    {date: '2021-04-04', orderCount: 9, orderAmount: 3293},
    {date: '2021-04-05', orderCount: 1, orderAmount: 2293},
    {date: '2021-04-06', orderCount: 5, orderAmount: 8293},
    {date: '2021-04-07', orderCount: 2, orderAmount: 10293},
    {date: '2021-04-08', orderCount: 9, orderAmount: 1293},
    {date: '2021-04-09', orderCount: 4, orderAmount: 4293}
  ]
};
export default {
  name: 'index',
  data() {
    return {
      orderCountDate: '',
      chartSettings: {
        xAxisType: 'time',
        area:true,
        axisSite: { right: ['orderAmount']},
        labelMap: {'orderCount': '订单数量', 'orderAmount': '订单金额'}
      },
      chartData: {
        columns: [],
        rows: []
      },
      greeting: '',
      pieOption: null,
      barOption: null,
      img_home_order,
      img_home_today_amount,
      img_home_yesterday_amount
    }
  },
  created(){
    this.initOrderCountDate();
    this.getData();
    this.getGreeting();
  },
  methods:{
    getGreeting() {
      let current = new Date().getHours();
      if (current >= 7 && current <= 8) this.greeting = '早上好';
      if (current >= 9 && current <= 11) this.greeting = '上午好';
      if (current === 12) this.greeting = '中午好';
      if (current >= 13 && current <= 18) this.greeting = '下午好';
      if ((current >= 19 && current <= 23) || (current >= 0 && current <= 6)) this.greeting = '晚上好';
    },
    handleDateChange(){
      this.getData();
    },
    initOrderCountDate(){
      let start = new Date();
      start.setFullYear(2021);
      start.setMonth(2);
      start.setDate(26);
      const end = new Date();
      end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 6);
      this.orderCountDate=[start,end];
    },
    getData(){
      setTimeout(() => {
        this.chartData = {
          columns: ['date', 'orderCount','orderAmount'],
          rows: []
        };
        for(let i=0;i<DATA_FROM_BACKEND.rows.length;i++){
          let item=DATA_FROM_BACKEND.rows[i];
          let currDate=str2Date(item.date);
          let tempDate = new Date();
          tempDate.setTime(this.orderCountDate[0] - 1000 * 60 * 60 * 24);
          let start=tempDate;
          let end=this.orderCountDate[1];
          if(currDate.getTime()>=start.getTime()&&currDate.getTime()<=end.getTime()){
            this.chartData.rows.push(item);
          }
        }
      }, 1000)
    }
  },
  mounted() {
    let pieDom = document.getElementById('pie-chart')
    let pieChart = echarts.init(pieDom)

    let barDom = document.getElementById('bar-chart')
    let barChart = echarts.init(barDom)

    this.pieOption = {
      title: {
        text: '总销量',
        left: 'center',
        textStyle: {
          fontSize: 14,
          color: '#909399'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
      },
      series: [
        {
          name: '销量占比',
          type: 'pie',
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: [
            {value: 30, name: '平板电脑'},
            {value: 28, name: '手机'},
            {value: 26, name: '耳机'},
            {value: 24, name: '笔记本电脑'},
            {value: 22, name: '键盘'},
            {value: 20, name: '鼠标'},
            {value: 18, name: '显示屏'}
          ]
        },
      ]
    };

    this.barOption = {
      title: {
        text: options[0].text,
        left: 'center',
        textStyle: {
          fontSize: 14,
          color: '#909399'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      color: '#c23531',
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: options[0].yData
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: options[0].xData
        }
      ]
    };

    pieChart.setOption(this.pieOption);

    barChart.setOption(this.barOption)

    pieChart.on('click', (params) => {
      console.log(params)
      let index = params.dataIndex
      this.barOption.title.text = options[index].text
      this.barOption.yAxis.data = options[index].yData
      this.barOption.series[0].data = options[index].xData
      this.barOption.color = params.color
      barChart.setOption(this.barOption)
    })

  }
}
</script>

<style scoped>

#pie-chart {
  width: 40%;
  height: 400px;
}

#bar-chart {
  width: 60%;
}

.chart-layout {
  display: flex;
  justify-content: space-around;
}

.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}

.address-layout {
}

.total-layout {
  margin-top: 20px;
}

.total-frame {
  border: 1px solid #DCDFE6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409EFF;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}


.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #F2F6FC;
  font-weight: bold;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #DCDFE6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}
.mine-layout {
  position: absolute;
  right: 160px;
  top: 117px;
  width: 250px;
  height: 235px;
}
.address-content{
  padding: 20px;
  font-size: 18px
}

.personalInformation:hover {
  transform: scale(1.07);
  box-shadow: 1px 1px 20px #78abff;
}

.personalInformation:hover .thin {
  height: 115%;
}

.personalInformation:hover .admin-information {
  opacity: 1;
}

.personalInformation {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.imgDiv {
  text-align: center;
  position: relative;
}

.mask.thin {
  width: 120%;
  height: 23%;
  bottom: -10px;
  left: -20px;
}

.mask {
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: brightness(35%);
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.text.thin {
  left: 0;
  bottom: 0;
  width: 120%;
  height: 23%;
}

.text {
  position: absolute;
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.look_more {
  margin-left: 40px;
  margin-top: 21px;
  float: left;
  color: #efe7db;
  font-size: 20px;
  font-weight: lighter;
  letter-spacing: 1px;
}

.admin-information {
  float: left;
  clear: left;
  color: #efe7db;
  width: 80%;
  height: 80%;
  line-height: 26px;
  font-weight: lighter;
  margin-top: 17px;
  word-break: break-word;
  word-spacing: 2px;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.cool-border {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.cool-border:hover {
  transform: scale(1.03);
  box-shadow: 1px 1px 20px #78abff;
}

</style>
