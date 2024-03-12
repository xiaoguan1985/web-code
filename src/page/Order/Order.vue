<template>
  <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="form-horizontal">
          <div class="form-group row">
            
            <div class="col-sm-3">
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
            
            <div class="col-sm-1">
              <input type="text" class="form-control form-control-sm" v-model="queryWapper.equipmentNumber" placeholder="设备号">
            </div>
            <div class="col-sm-1">
              <input type="text" class="form-control form-control-sm" v-model="queryWapper.nickName" placeholder="用户昵称">
            </div>
             <div class="col-sm-1">
              <input type="text" class="form-control form-control-sm" v-model="queryWapper.orderNumber" placeholder="订单号">
            </div>
            <div class="col-sm-2">
              <input type="text" class="form-control form-control-sm" v-model="queryWapper.merchantName" placeholder="商户名称">
            </div>
            <div class="col-sm-1">
              <select class="form-control form-control-sm" v-model="queryWapper.state">
                <option value="0">所有订单</option>
                <option value="1">错误订单</option>
                <option value="2">未归还</option>
                <option value="3">已归还</option>
                <option value="4">人工结束</option>
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
          <div class="col-lg-12">

             <el-table
              :data="listOrder"
              border
              style="width: 100%">
              <el-table-column 
              prop="equipmentNumber"  fixed="left"
              label="设备号" width="80">
              </el-table-column>
              <el-table-column prop="powerId"
                label="电池编号"
                width="130">
              </el-table-column>
              <el-table-column
                prop="state"
                label="状态"
                width="80">
              </el-table-column>
              <el-table-column
                prop="payStateText"
                label="支付"
                width="60">
              </el-table-column>
             <el-table-column
                prop="spend"
                label="花费">
              </el-table-column>
              <el-table-column
                prop="nickName" show-overflow-tooltip
                label="用户昵称">
              </el-table-column>
              <el-table-column
                prop="borrowTime" width="140"
                label="租借时间">
              </el-table-column>
              <el-table-column
                prop="returnTime"  width="140"
                label="归还时间">
              </el-table-column>
               <el-table-column
                prop="orderType" show-overflow-tooltip
                label="平台">
              </el-table-column>
              <el-table-column 
              prop="orderNumber" show-overflow-tooltip
              label="订单号"></el-table-column>
              <el-table-column
                prop="merchantName"  show-overflow-tooltip
                label="商铺名称">
              </el-table-column>
              <el-table-column
                prop="macState"
                label="通信状态" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="stopOrder(scope.row)" type="text" size="small">结束订单</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="card-footer clearfix flex">
          <Pagination layout="prev, pager, next, sizes, total" 
          :current-page="pager.currentPage" 
          :page-size="pager.size"
          :page-sizes="[15, 30, 60, 100]"
          :total="pager.total"
          @size-change="sizeClick"
          @current-change="pageClick"
          ></Pagination>

          <div>
              <el-tag type="success">总消费：{{sumOrder.allSpend}}</el-tag>
              <el-tag type="success">总订单：{{sumOrder.allOrder}}</el-tag>
          </div>
        </div>
      </div>
      <!-- /.content -->
      <div class="modal fade" id="identifier">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title">结束订单</h6>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="card-body">
                <div class="row">
                  <label class="col-sm-3 col-form-label" for="">扣费：</label>
                  <div class="col-sm-3">
                    <input type="text" class="form-control form-control-sm" placeholder="" v-model="stopItem.spend">
                  </div>
                  <label class="col-sm-1 col-form-label" for="">元</label>
                </div>

              </div>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
              <button type="button" @click="stopOrderHandler" class="btn btn-primary btn-sm">提交</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

    </div>
    <!-- /.content-wrapper -->
</template>

<script>

import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import 'element-ui/lib/theme-chalk/index.css';
import { Pagination,DatePicker,Table,TableColumn,Button,Tag } from 'element-ui';
import { mapState, mapMutations } from "vuex";


export default {
  
  data () {
    return {
     
      listOrder:[],
      sumOrder:{},
      pager:{
        pages: 0,
        currentPage: 0,
        total:0,
        size:15
      },
      queryWapper:{
        agentId : -1,
        selectTime : null,
        equipmentNumber:'',
        state:0,
        nickName:'',
        orderNumber:'',
        merchantName:''
      },
      stopItem:{
        orderNumber:'',
        spend:0
      },
      listAgent:[]
    }
  },
  components: {
    Pagination,
    elDatePicker:DatePicker,
    elTable:Table,
    elTableColumn:TableColumn,
    elButton:Button,
    elTag:Tag
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

      let res = await fetchPost(api.getOrders, {
          current:this.pager.currentPage, 
          pageSize: this.pager.size, 
          userId:this.userId, 
          agentId:this.queryWapper.agentId,
          startTime:startTime,
          endTime:endTime,
          equipmentNumber:this.queryWapper.equipmentNumber,
          state:this.queryWapper.state,
          nickName:this.queryWapper.nickName,
          orderNumber:this.queryWapper.orderNumber,
          merchantName:this.queryWapper.merchantName});

      let resData = res.data.page;

      this.listOrder = resData.records;
      this.sumOrder = res.data.sum;

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
            item.orderType = "微信支付分";
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
          pages : resData.pages,
          currentPage : resData.current,
          total: resData.total,
          size:resData.size
        }
    },

    //结束订单
    stopOrder:function(entity){
      let orderNumber = entity.orderNumber;
      let order = this.listOrder.find(item=>{
        return item.orderNumber == orderNumber
      });
      
      if(order.payState == 2){
        this.$toast("订单已经结束！");
        return false;
      }
      this.stopItem = {
        orderNumber:order.orderNumber,
        spend:0
      };
      $("#identifier").modal()
    },
    async stopOrderHandler(){
      console.log(this.stopItem);
      let that = this;

      if(!this.stopItem.orderNumber){
        this.$toast("订单号不能为空");
        return false;
      }
      
      try{
        
        let res = await fetchGet(api.stopOrder, this.stopItem);
        if(res.status){
          this.$toast("更新成功！");
          this.getAllOrders();
        }
        $("#identifier").modal("hide");
      }catch(e){
        this.$toast(e.msg);
      }
    },

    async getAllAuthAgentByRoleId(){
      let res = await fetchGet(api.getAllAuthAgentByRoleId, {roleId:2});
      console.log(res.data)
      if(res.status){
        
        this.listAgent = res.data;
      }
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
        agentId : -1,
        selectTime : null,
        equipmentNumber:'',
        state:0,
        nickName:'',
        orderNumber:'',
        merchantName:''
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex{display:flex;}
.content-header{padding: 7px 10px; }
.content{background-color: #fefefe; padding-top:.5rem;}
.mx-datepicker-range{width: 210px;}
>>>.mx-input{height: 30px;border-radius:.2rem;}
.mx-datepicker-range{width: 100%}
.nodata{text-align: center;}


.el-pagination{padding-left: 0; padding-bottom: 0;}
>>>.el-pager li.active{color: #fff;background: #409efe;}
.el-pager li{font-size: 14px;min-width: 30px;}

.el-table{font-size: 12px; color: #000;}
>>>.el-table td, .el-table th{padding: 0 !important;}
>>>.el-table thead{color: #000;}
>>>.el-table thead th{padding: 2px 0 !important;}
   .el-table .cell{padding-left: 2px;}

   
   .el-range-editor--small.el-input__inner{width: 100%;}
>>>.el-date-editor .el-range-separator{width: 10%;}
</style>
