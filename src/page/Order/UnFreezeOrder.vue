<template>
  <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        支付宝预授权订单管理
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        <form class="form-horizontal">
          <div class="card-body">
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-1 col-form-label">订单编号</label>
              <div class="col-sm-3">
                <input type="text" class="form-control form-control-sm"  v-model="orderPay.orderNo" placeholder="请输入系统订单编号FZ***">
              </div>
              <div class="col-sm-3">
                <input type="text" class="form-control form-control-sm"  v-model="orderPay.authNo" placeholder="请输入支付宝单号2020***">
              </div>
              <div class="col-sm-1">
                <button type="button" @click="search" class="btn btn-info btn-sm">查询</button>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-1 col-form-label">订单信息</label>
              <div  class="col-sm-4">
                <el-card class="box-card">
                  <div class="text item">订单编号：{{model.orderNo}}</div>
                  <div class="text item">支付宝编号：{{model.authNo}}</div>
                  <div class="text item">支付宝用户ID：{{model.payerUserId}}</div>
                  <div class="text item">支付宝登录ID：{{model.payerLogonId}}</div>
                  <div class="text item">订单状态：{{model.orderState}}</div>
                  <div class="text item">冻结金额￥：{{model.amount}}</div>
                  <div class="text item">支付宝冻结状态：{{model.status}}</div>
                  <div class="text item">创建时间：{{model.createdTime}}</div>
                </el-card>
              </div>
            </div>

            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-1 col-form-label">扣款金额</label>
              <div class="col-sm-5">
                <input type="text" class="form-control form-control-sm" v-model="orderPay.amount" placeholder="扣款0元">
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-10 warning">
                注：预授权转支付 时候需要输入扣款金额。支付宝不允许扣款金额为0,扣款金额不能大于冻结金额。
              </div>
            </div>
            <div class="form-group row">
               <div class="col-sm-10 warning">
                 所有操作不可逆
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-10">
                <button type="button" @click="tradePay" class="btn btn-info btn-sm">预授权转支付</button>
                <button type="button" @click="unFreeze" class="btn btn-info btn-sm">解冻</button>
                <button type="button" class="btn btn-info btn-sm">资金授权操作查询</button>
                <button type="button" class="btn btn-info btn-sm">资金授权撤销</button>
                <button type="button" class="btn btn-info btn-sm">交易查询</button>
                <button type="button" class="btn btn-info btn-sm">授权订单信息同步</button>
                <button type="button" class="btn btn-info btn-sm">查询对账单下载地址</button>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-10">
                <textarea rows="3" style="width:100%;"  v-model="msg"  placeholder="支付宝返回信息">
                </textarea>
              </div> 
            </div>
          </div>
         
        </form>
      </div>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
</template>

<script>

import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import { getCookie, setCookie, isNumber } from "@/util/util";
import { mapState, mapMutations } from "vuex";
import 'element-ui/lib/theme-chalk/index.css';
import { Pagination, Card } from 'element-ui';

export default {
  
  data () {
    return {
      orderPay:{
        orderNo: '',
        authNo:  '',
        amount:0
      },
      model:{
         id:0,
         openid:'',
         orderNo:'',
         authNo:'',
         payerUserId:'',
         payerLogonId:'',
         orderState:'',
         orderType:'',
         amount:'',
         reAmount:'', 
         status:'',
         createdTime:'',
         updatedTime:''
      }
    }
  },
  components: {
    elCard:Card
  },
  created(){
  },
  methods:{

    async search(){
      console.log(this.orderPay);

      if(!this.orderPay.orderNo && !this.orderPay.authNo){
        this.$toast("请输入单号!");
        return false;
      }
      this.$loading("加载中...");
      let res = await fetchGet(api.freezeSearch, {
          orderNo:this.orderPay.orderNo,
          authNo:this.orderPay.authNo,
      });
      this.model = res.data;
      this.$loading_close();
    },
    async tradePay(){
      
      if(!this.orderPay.orderNo && !this.orderPay.authNo){
        this.$toast("请输入单号!");
        return false;
      }

      let res = await fetchGet(api.tradePay, {
          orderNo:this.orderPay.orderNo,
          amount:this.orderPay.amount,
      });

      this.model = res.data;
      this.msg = JSON.stringify(res.data) ;
    },
    async unFreeze(){
      
      if(!this.orderPay.orderNo && !this.orderPay.authNo){
        this.$toast("请输入单号!");
        return false;
      }

      let res = await fetchGet(api.unFreeze, {
          orderNo:this.orderPay.orderNo
      });

      this.model = res.data;
      this.msg = JSON.stringify(res.data) ;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-header{padding: 7px 10px; }
.content{background-color: #fefefe; padding-top:.5rem;}
.warning{color:#F56C6C};
.btn-opt{background-color:#409EFF;}
</style>
