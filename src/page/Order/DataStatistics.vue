<template>
  <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="form-horizontal">
          <div class="form-group row">
            
            <div class="col-sm-4">
              <!-- <input type="text" class="form-control form-control-sm" id="reservation" placeholder="起始时间-结束时间"> -->
              <el-date-picker
                size="small"
                v-model="queryWapper.selectTime"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            
            <div class="col-sm-2">
              <select class="form-control form-control-sm" v-model="queryWapper.agentId">
                <option value="-1">请选择</option>
                <option value="item.id" v-for="(item, index) in listAgent" :key="index" >{{item.nickName}}</option>
                
              </select>
            </div>

            <div class="col-sm-1">
              <a class="btn btn-block btn-primary btn-sm" @click="queryMerchant" href="javascript:void(0);">查询</a>
            </div>
            <div class="col-sm-1">
              <a class="btn btn-block btn-primary btn-sm" @click="queryClear" href="javascript:void(0);">清空</a>
            </div>
            
          </div>
        </div><!-- /.container-fluid -->

      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        <div class="row">
          <div class="col-lg-6">
            <div class="card card-primary card-outline">
                <div class="card-header">
                  <span class="m-0">设备对比</span>
                </div>
                <div class="card-body nopadding center">
                  <echart
                    :options="polar"
                    autoresize
                  />
                  <a href="javascript:void(0);" @click="currentWeek" class="card-link">本周</a>
                  <a href="javascript:void(0);" @click="currentMonth" class="card-link">本月</a>
                </div>
              </div><!-- /.card -->
          </div>

          <div class="col-lg-6">
            <div class="card card-primary card-outline">
                <div class="card-header">
                  <span class="m-0">使用量排行榜：Top10</span>
                </div>
                <div class="card-body nopadding center">
                  <echart
                    :options="polar1"
                    autoresize
                  />
                  <a href="javascript:void(0);" @click="currentWeek" class="card-link">本周</a>
                  <a href="javascript:void(0);" @click="currentMonth" class="card-link">本月</a>
                </div>
              </div><!-- /.card -->
          </div>
        </div>

        <div class="card-footer clearfix">
          
        </div>
      </div>
      

    </div>
    <!-- /.content-wrapper -->
</template>

<script>

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import 'element-ui/lib/theme-chalk/index.css';
import { Pagination,DatePicker,Table,TableColumn,Button } from 'element-ui';
import { mapState, mapMutations } from "vuex";


export default {
  
  data () {
    return {
     
      listOrder:[],
      pager:{
        pages: 0,
        currentPage: 0,
        total:0,
        size:15
      },
      queryWapper:{
        agentId : -1,
        selectTime : null
      },
      stopItem:{
        orderNumber:'',
        spend:0
      },
      listAgent:[],

      polar: {
        xAxis: {
          type: 'category',
          data: ['陪护床', '轮椅']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            color: ['#337ab7'],
            data: [120, 200],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(24, 144, 255, 0.8)'
            }
        }]
      },
      polar1: {
        xAxis: {
          type: 'category',
          data: ['300001', '300002', '300003', '300004', '300005', '300006']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
          color: ['#337ab7'],
            data: [50, 32, 30, 25, 22, 13],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(24, 144, 255, 0.8)'
            }
        }]
      }
    }
  },
  components: {
    Pagination,
    elDatePicker:DatePicker,
    elTable:Table,
    elTableColumn:TableColumn,
    elButton:Button,
    echart: ECharts,
  },
  computed:{
    ...mapState("userModule", ["userId"]),
  },
  created(){
   this.getAllOrders();
   this.getAllAuthAgentByRoleId();
  },
  methods:{
    
    async getAllOrders(){
      if(!this.pager.currentPage || this.pager.currentPage == 0){
        this.pager.currentPage = 1;
      }

      let startTime = "";
      let endTime = "";
      if(this.queryWapper.selectTime instanceof Array){
        startTime = this.queryWapper.selectTime[0];
        endTime = this.queryWapper.selectTime[1];
      }

      console.log(this.queryWapper.selectTime)

      let res = await fetchPost(api.getOrders, {
          current:this.pager.currentPage, 
          pageSize: this.pager.size, 
          userId:this.userId, 
          agentId:this.queryWapper.agentId,
          startTime:startTime,
          endTime:endTime});

      this.listOrder = res.data.records;

      this.listOrder.map(item=>{
        
        switch(item.state){
          case "2":
            item.state = "未归还";
            break;
          case "3":
            item.state = "已归还";
            break;
          case "1":
            item.state = "新建订单";
            break;
          case "4":
            item.state = "人工扣费";
            break;
        }
        switch(item.orderType){
          case 0:
            item.orderType = "微信";
            break;
          case 1:
            item.orderType = "支付宝";
            break;
          case 2:
            item.orderType = "支付宝预授权";
            break;
          case 3:
            item.orderType = "微信预授权";
            break;
        }
        switch(item.macState){
          case "0":
            item.macState = "接收到借，设备应答";
            break;
          case "1":
            item.macState = "借出成功";
            break;
          case "3":
            item.macState = "网络超时";
            break;
          case "6":
            item.macState = "没有合法电池";
            break;
          case "7":
            item.macState = "红外错误";
            break;
          case "8":
            item.macState = "电机错误";
            break;
          case "9":
            item.macState = "解锁失败";
            break;
          case "30":
            item.macState = "同步失败";
            break;

          
          case "31":
            item.macState = "因上一订单没完成";
            break;
          case "32":
            item.macState = "能读失败";
            break;
          case "33":
            item.macState = "左电机卡在原点";
            break;
          case "34":
            item.macState = "右电机卡在原点";
            break;
          case "35":
            item.macState = "左右电机卡在原点";
            break;
          case "36":
            item.macState = "左电机回原点超时";
            break;
          case "37":
            item.macState = "右电机回原点超时";
            break;
          case "38":
            item.macState = "左右电池回原点超时";
            break;
        }
        switch(item.payState){
          case "2":
            item.payStateText = "已支付";
            break;
          default:
            item.payStateText = "未支付";
            break;
        }
        
        return {...item}
      })

      this.pager = {
          pages : res.data.pages,
          currentPage : res.data.current,
          total: res.data.total,
          size:res.data.size
        }
    },

    async getAllAuthAgentByRoleId(){
      let res = await fetchGet(api.getAllAuthAgentByRoleId, {roleId:2});
      console.log(res.data)
      if(res.status){
        
        this.listAgent = res.data;
      }
    },
    currentWeek(){
      let xAxis = [];
      let dataArray  = [];
      let dataArray1 = [];
      for(var i=1;i<7;i++){
        xAxis.push('周' + i);
        dataArray1.push(Math.floor(Math.random() * 100) + 100);
        dataArray.push(Math.floor(Math.random() * 100));
      }
      
      this.polar.xAxis.data = xAxis;
      this.polar.series = [{
                    name: '金额',
                    type: 'line',
                    data: dataArray1
                },{
                    name: '订单',
                    type: 'line',
                    data: dataArray
                }]
    },
    currentMonth(){
      let xAxis = [];
      let dataArray  = [];
      let dataArray1 = [];
      let m = this.showMonthFirstDay();
      for(var i=1;i<30;i++){
        xAxis.push(m + '月' + i+"日");
        dataArray1.push(Math.floor(Math.random() * 100) + 100);
        dataArray.push(Math.floor(Math.random() * 100));
      }
      
      this.polar.xAxis.data = xAxis;
      this.polar.series = [{
                    name: '金额',
                    type: 'line',
                    data: dataArray1
                },{
                    name: '订单',
                    type: 'line',
                    data: dataArray
                }]
    },
    pageClick(page){
      
      this.pager.currentPage = page;
      this.$loading("加载中...");
      this.getAllOrders();
      this.$loading_close();
    },
    sizeClick(size){
      
      this.pager.size = size;
      this.pager.currentPage = 1;
      this.getAllOrders();
    },
    queryMerchant(){
      this.pager.currentPage = 1;
      this.getAllOrders();
    },
    queryClear(){
      this.queryWapper = {
        merchantName:''
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-header{padding: 7px 10px; }
.content{background-color: #fefefe; padding-top:.5rem;}
.mx-datepicker-range{width: 210px;}
>>>.mx-input{height: 30px;border-radius:.2rem;}
.mx-datepicker-range{width: 100%}
.nodata{text-align: center;}

.card-footer{padding: .2rem 0 0 0;}
.el-pagination{padding-left: 0; padding-bottom: 0;}
>>>.el-pager li.active{color: #fff;background: #409efe;}
.el-pager li{font-size: 12px;min-width: 30px;}

.el-table{font-size: 12px; color: #000;}
>>>.el-table td, .el-table th{padding: 0 !important;}
>>>.el-table thead{color: #000;}
>>>.el-table thead th{padding: 2px 0 !important;}
   .el-table .cell{padding-left: 2px;}

.nopadding{padding:10px;}
.center{text-align: center;}
.echarts{width:100%;min-width:400px;height: 300px;}
</style>
