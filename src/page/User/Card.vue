<template>
  <!-- Content Wrapper. Contains page content -->
    <div class="content-page">

      <!-- Main content -->

      <div class="content">

        <div class="container-fluid">
          <div class="row">
              <div class="col-12">
                  <div class="page-title-box">
                      <h5 class="page-title">用户查询</h5>
                      <div>
                          <ol class="breadcrumb m-0">
                              <li class="breadcrumb-item"><a href="javascript: void(0);">用户查询</a></li>
                              <li class="breadcrumb-item"><a href="javascript: void(0);">会员管理</a></li>
                          </ol>
                      </div>
                  </div>
              </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th style="width: 10px">#</th>
                        <th>日卡类型</th>
                        <th>划线价</th>
                        <th>销售价</th>
                        <th>折扣</th>
                        <th>描述</th>
                        <th style="width:100px;">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in listCard" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.days}}日卡</td>
                        <td>{{item.originalPrice}}</td>
                        <td>{{(item.salePrice)}}   </td>
                        <td>{{(item.salePrice / item.originalPrice).toFixed(2)}} </td>
                        <td>{{item.memo}}</td>
                        <td class="option">
                          <a href="javascript:void(0);" v-on:click="modify(item.id)">修改</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
      <!-- /.content -->

      <div class="modal fade" id="identifier">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title">修改会员卡</h6>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="card-body">
                <div class="row">
                  <label class="col-sm-3 col-form-label" for="">类型：</label>
                  <div class="col-sm-3">
                    <input type="text" class="form-control form-control-sm" placeholder="输入：1、2、3等" v-model="modifyCard.days">
                  </div>
                  <label class="col-sm-3 col-form-label" for="">日卡</label>
                </div>

                <div class="row">
                  <label class="col-sm-3 col-form-label" for="">划线价：</label>
                  <div class="col-sm-3">
                    <input type="text" class="form-control form-control-sm" v-model="modifyCard.originalPrice" placeholder="">
                  </div>
                  <label class="col-sm-3 col-form-label" for="">￥</label>
                </div>

                <div class="row">
                  <label class="col-sm-3 col-form-label" for="">销售价：</label>
                  <div class="col-sm-3">
                    <input type="text" class="form-control form-control-sm" v-model="modifyCard.salePrice" placeholder="">
                  </div>
                  <label class="col-sm-3 col-form-label" for="">￥</label>
                </div>
                <div class="row">
                  <label class="col-sm-3 col-form-label" for="">描述：</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control form-control-sm" v-model="modifyCard.memo" placeholder="">
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
              <button type="button" @click="modifyHandler" class="btn btn-primary btn-sm">提交</button>
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

export default {
  
  data () {
    return {
      listCard:[],
      modifyCard:{
        id:0,
        days:0,
        originalPrice:0,
        salePrice:0,
        memo:''
      }
    }
  },
  created(){
     
    this.getCard();
  },
  methods:{
    
    async getCard(){
      let res = await fetchGet(api.getMemberCard);
      this.listCard = res.data;
    },
    //修改计费
    modify:function(id){
      this.modifyCard = this.listCard.find(item=>{
        return item.id == id
      })
      $("#identifier").modal()
    },

    async modifyHandler(){
      
      let that = this;

      if(!this.modifyCard.days || this.modifyCard.days == 0){
        this.$toast("天数不能为空");
        return false;
      }
      if(!this.modifyCard.originalPrice || this.modifyCard.originalPrice == 0){
        this.$toast("原价不能为空");
        return false;
      }
      if(!this.modifyCard.salePrice || this.modifyCard.salePrice == 0){
        this.$toast("销售价不能为空");
        return false;
      }
      try{
       
        if(!this.modifyCard.id || this.modifyCard.id == 0){
          this.$toast("获取当前id失败");
          return false;
        }
        let res = await fetchPost(api.modifyCard, this.modifyCard);
        if(res.status){
          this.$toast("更新成功！");
          this.listCard = this.listCard.map(item=>{
            if(item.id == that.modifyCard.id){
              item.days = that.modifyCard.days;
              item.originalPrice = that.modifyCard.originalPrice;
              item.salePrice = that.modifyCard.salePrice;
              item.memo = that.modifyCard.memo;
            }
            return {...item}
          })
        }
        $("#identifier").modal("hide");
      }catch(e){
        this.$toast(e.msg);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-header{padding: 7px 10px; }
.mx-datepicker-range{width: 210px;}
>>>.mx-input{height: 30px;border-radius:.2rem;}
.mx-datepicker-range{width: 100%}
</style>
