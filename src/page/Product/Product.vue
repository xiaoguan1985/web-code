<template>
  <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="form-horizontal">
          <div class="form-group row">
            
            <div class="col-sm-2">
              <input type="text" class="form-control form-control-sm" v-model="queryWapper.equipmentNumber" placeholder="产品名称">
            </div>
            <div class="col-sm-1">
              <select class="form-control form-control-sm" v-model="queryWapper.equipmentType">
                <option value="">请选择</option>
                <option value="A">上架</option>
                <option value="B">下架</option>
              </select>
            </div>
            <div class="col-sm-1">
              <select class="form-control form-control-sm" v-model="queryWapper.syncState">
                <option value="-1">请选择</option>
                <option value="0">积分换礼</option>
                <option value="1">兑换记录</option>
              </select>
            </div>

            <div class="col-sm-1">
              <a class="btn btn-block btn-primary btn-sm" @click="queryProduct" href="javascript:void(0);">查询</a>
            </div>
            <div class="col-sm-1">
              <a class="btn btn-block btn-primary btn-sm" @click="queryClear" href="javascript:void(0);">清空</a>
            </div>
            <div class="col-sm-1">
              <a class="btn btn-block btn-primary btn-sm" href="javascript:void(0);">添加</a>
            </div>
            
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->

      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        <div class="row">
          <div class="col-lg-12">
            <table class="table table-bordered table-hover">
              <thead>                  
                <tr>
                  <th style="width: 10px">#</th>
                  <th>商品名称</th>
                  <th>类型</th>
                  <th>图标</th>
                  <th>价格</th>
                  <th>积分</th>
                  <th>京东价</th>
                  <th>原价</th>
                  <th>库存</th>
                  <th>上架状态</th>
                  <th style="width:180px;">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in listProduct" :key="index">
                  <td>{{item.id}}.</td>
                  <td>{{item.productName}}</td>
                  <td>{{item.productTpye}}</td>
                  <td>{{item.productImageUrl}}</td>
                  <td>{{item.productPrice}}</td>
                  <td>{{item.productScore}}</td>
                  <td>{{item.jdPrice}}</td>
                  <td>{{item.productOriginalPrice}}</td>
                  <td>{{item.storage}}</td> 
                  <td>{{item.state}}</td> 
                 
                  <td class="option">
                    <a href="javascript:void(0);" v-on:click="modify(item.id)">修改</a> 
                    <a href="javascript:void(0);" v-on:click="stop(item.id)">上架</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card-footer clearfix">
          <Pagination layout="prev, pager, next, sizes, total"  background
          :current-page="pager.currentPage" 
          :page-size="pager.size"
          :page-sizes="[15, 30, 60, 100]"
          :total="pager.total"
          @size-change="sizeClick"
          @current-change="pageClick"
          ></Pagination>
        </div>
      </div>
      <!-- /.content -->
      
    </div>
    <!-- /.content-wrapper -->
</template>

<script>

import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import { province, city } from "@/api/data.js";
import { getCookie, setCookie, isNumber } from "@/util/util";
import { mapState, mapMutations } from "vuex";
import pager from "@/components/Pager.vue";
import 'element-ui/lib/theme-chalk/index.css';
import { Pagination } from 'element-ui';

export default {
  
  data () {
    return {
      province: province,
      city:[],
      listProduct:[],
      listAgent:    [],

      pager:{
        pages: 0,
        currentPage: 0,
        total:0,
        size:15
      },
      queryWapper:{
        equipmentNumber : '',
        equipmentType:    '',
        syncState:        -1   //0在线
      }
    }
  },
  created(){
    this.getAllProduct();
  },
  methods:{

    async getAllProduct(){
      if(!this.pager.currentPage || this.pager.currentPage == 0){
        this.pager.currentPage = 1;
      }
      try{
        // let res = await fetchPost(api.getAllEquipment, {
        //   current:this.pager.currentPage, 
        //   pageSize: this.pager.size,
        //   equipmentNumber:this.queryWapper.equipmentNumber,
        //   equipmentType:this.queryWapper.equipmentType,
        //   syncState:this.queryWapper.syncState
        // });
        // console.log(res);
        // this.listProduct = res.data.records;
        // this.pager = {
        //   pages : res.data.pages,
        //   currentPage : res.data.current,
        //   total: res.data.total,
        //   size:res.data.size
        // }
        this.listProduct = [{
          id:1,
          productName:"卡通盲盒",
          productTpye:"积分+现金兑换",
          productImageUrl:"",
          productPrice:"49.00",
          productScore:"175",
          jdPrice:"69.00",
          productOriginalPrice:"59.00",
          storage:332,
          state:"上架"
        }]
      }catch(e){
         this.$toast(e.msg);
      }
    },
    async getAllAgent(){
      try{
        let res = await fetchGet(api.getAllAuthAgent);
        this.listAgent = res.data.filter(item=>{
          return item.roleId == 2;
        })
      }catch(e){
         this.$toast(e.msg);
      }
    },
    queryProduct(){
      this.getAllEquipment(1);
    },
    queryClear(){
      
      this.queryWapper = {
        equipmentNumber:'',
        equipmentType:'',
        syncState:-1
      }
    },
    selectProvince(e){

      let pId = e.target.value;

      this.city = city.filter(item=>{
        return item.province == pId.toString();
      })
    },
    pageClick(page){
      console.log(page)
      this.pager.currentPage = page;
      this.$loading("加载中...");
      this.getAllEquipment();
      this.$loading_close();
    },
    sizeClick(size){
      
      this.pager.size = size;
      this.pager.currentPage = 1;

      this.getAllEquipment();
    }
  },
  components: {
    Pagination
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-header{padding: 7px 10px; }
.content{background-color: #fefefe; padding-top:.5rem;}
.table td, .table th{padding: .4rem;}
.card-body .row{padding: 5px 0;}
.option>a:not(:first-child){padding-left:5px;}
.card-footer{padding: .2rem 0 0 0;}
.el-pagination{padding-left: 0; padding-bottom: 0;}
>>>.el-pager li.active{color: #fff;background: #409efe;}
.el-pager li{font-size: 12px;min-width: 30px;}
</style>
