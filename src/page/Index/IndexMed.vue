<template>

<div class="content-page">
    <div class="content">

        <!-- Start Content-->
        <div class="container-fluid">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <h5 class="page-title">{{projectName}}</h5>
                        <div>
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">驾驶舱</a></li>
                                <li class="breadcrumb-item"><a href="javascript: void(0);">BI</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>     
            <!-- end page title --> 

            <div class="row">
                <div class="col-md-6 col-xl-3">
                    <div class="widget-rounded-circle card bg-purple shadow-none">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-5">
                                    <div class="avatar-lg rounded-circle bg-soft-light">
                                        <i class="iconfont icon-tradingdata font-28 avatar-title text-white"></i>
                                    </div>
                                </div>
                                <div class="col-7">
                                    <div class="text-end">
                                        <h2 class="text-white mt-2"><span data-plugin="counterup">9833</span></h2>
                                        <p class="text-white mb-0 text-truncate">总支付金额</p>
                                    </div>
                                </div>
                            </div> <!-- end row-->
                        </div>
                    </div> <!-- end widget-rounded-circle-->
                </div> <!-- end col-->

                <div class="col-md-6 col-xl-3">
                    <div class="widget-rounded-circle card bg-info shadow-none">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-5">
                                    <div class="avatar-lg rounded-circle bg-soft-light">
                                        <i class="iconfont icon-kehupandian font-28 avatar-title text-white"></i>
                                    </div>
                                </div>
                                <div class="col-7">
                                    <div class="text-end">
                                        <h2 class="text-white mt-2"><span data-plugin="counterup">160</span></h2>
                                        <p class="text-white mb-0 text-truncate">今日访问用户</p>
                                    </div>
                                </div>
                            </div> <!-- end row-->
                        </div>
                    </div> <!-- end widget-rounded-circle-->
                </div> <!-- end col-->

                <div class="col-md-6 col-xl-3">
                    <div class="widget-rounded-circle card bg-pink shadow-none">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-5">
                                    <div class="avatar-lg rounded-circle bg-soft-light">
                                        <i class="iconfont icon-kehupandian font-28 avatar-title text-white"></i>
                                    </div>
                                </div>
                                <div class="col-7">
                                    <div class="text-end">
                                        <h2 class="text-white mt-2"><span data-plugin="counterup">11</span></h2>
                                        <p class="text-white mb-0 text-truncate">挂号/住院/抓药订单</p>
                                    </div>
                                </div>
                            </div> <!-- end row-->
                        </div>
                    </div> <!-- end widget-rounded-circle-->
                </div> <!-- end col-->

                <div class="col-md-6 col-xl-3">
                    <div class="widget-rounded-circle card bg-success shadow-none">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-5">
                                    <div class="avatar-lg rounded-circle bg-soft-light">
                                        <i class="iconfont icon-kehupandian font-28 avatar-title text-white"></i>
                                    </div>
                                </div>
                                <div class="col-7">
                                    <div class="text-end">
                                        <h2 class="text-white mt-2"><span data-plugin="counterup">5</span></h2>
                                        <p class="text-white mb-0 text-truncate">陪诊订单</p>
                                    </div>
                                </div>
                            </div> <!-- end row-->
                        </div>
                    </div> <!-- end widget-rounded-circle-->
                </div> <!-- end col-->
            </div>
            <!-- end row-->

            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="dropdown float-end">
                                <a href="layouts-detached.html#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="mdi mdi-dots-vertical"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Sales Report</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Export Report</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Profit</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Action</a>
                                </div>
                            </div>

                            <h4 class="header-title mb-0">充值分析</h4>

                            <div dir="ltr">
                                <div id="apex-area-charts" class="mt-0"></div>
                            </div>
                        </div>
                    </div> <!-- end card -->
                </div> <!-- end col-->
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="dropdown float-end">
                                <a href="layouts-detached.html#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="mdi mdi-dots-vertical"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Sales Report</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Export Report</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Profit</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Action</a>
                                </div>
                            </div>

                            <h4 class="header-title mb-3">产品销售对比</h4>
                            <div class="position-relative">

                                <div class="row align-items-center" v-for="item in productSalesInfo" :key="item.id">
                                    <div class="col-xl-4">
                                        <h5>{{item.categoryName}} <span class="text-muted fw-normal"></span> <b class="px-2">-</b> <span class="text-success">{{item.ratio + '%'}}</span></h5>
                                    </div>
                                    <div class="col-xl-8">
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar bg-info" role="progressbar" 
                                            :style="{width:item.ratio + '%'}" 
                                            :aria-valuenow="item.ratio" 
                                            aria-valuemin="0" 
                                            aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-lg-12 col-md-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-5">
                                            <div class="apex-charts" id="sparkline-chart-1"></div>
                                        </div>
                                        <div class="col-6 offset-1">
                                            <div class="text-end">
                                                <p class="font-14 mb-1">Total Products Sales</p>
                                                <h2 class="fw-bold mb-1">64.5K</h2>
                                                <h5 class="mb-0 text-success"><i class="mdi mdi-trending-up font-18 me-1"></i>20.7%</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6 col-lg-12 col-md-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-5">
                                            <div class="apex-charts" id="sparkline-chart-2"></div>
                                        </div>
                                        <div class="col-6 offset-1">
                                            <div class="text-end">
                                                <p class="font-14 mb-1">Active Users</p>
                                                <h2 class="fw-bold mb-0">50.24K</h2>
                                                <h5 class="mb-0 text-success"><i class="mdi mdi-trending-up font-18 me-1"></i>20.7%</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end row -->

            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="w-100">
                                    <h5 class="text-muted mt-0">北医三院</h5>
                                    <h2 class="mb-0">￥24,600</h2>
                                </div>
                                <i style="font-size: 3rem;" class="iconfont icon-usercenter text-light display-3 float-end"></i>
                            </div>
                            <p class="text-muted mt-3 mb-3">占比：41%</p>
                            <div>
                                <a href="layouts-detached.html#" class="text-primary float-end"><i class="mdi mdi-arrow-right font-20"></i></a>
                                <span class="bg-soft-primary fw-medium text-primary rounded px-2 font-12 py-1">明细</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="w-100">
                                    <h5 class="text-muted mt-0">北京儿童医院</h5>
                                    <h2 class="mb-0">￥40,340</h2>
                                </div>
                                <i class="mdi mdi-office-building text-light display-3 float-end"></i>
                            </div>
                            <p class="text-muted mt-3 mb-3">占比：41%</p>
                            <div>
                                <a href="layouts-detached.html#" class="text-primary float-end"><i class="mdi mdi-arrow-right font-20"></i></a>
                                <span class="bg-soft-warning fw-medium text-warning rounded px-2 font-12 py-1">明细</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="w-100">
                                    <h5 class="text-muted mt-0">儿研所</h5>
                                    <h2 class="mb-0">￥1,180</h2>
                                </div>
                                <i class="mdi mdi-database-marker text-light display-3 float-end"></i>
                            </div>
                            <p class="text-muted mt-3 mb-3">占比：11%</p>
                            <div>
                                <a href="layouts-detached.html#" class="text-primary float-end"><i class="mdi mdi-arrow-right font-20"></i></a>
                                <span class="bg-soft-pink fw-medium text-pink rounded px-2 font-12 py-1">明细</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end row -->

            <div class="row">
                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="dropdown float-end">
                                <a href="layouts-detached.html#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="mdi mdi-dots-vertical"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Sales Report</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Export Report</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Profit</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Action</a>
                                </div>
                            </div>

                            <h4 class="header-title mb-3">Recent Product</h4>

                            <div class="table-responsive">
                                <table class="table table-hover table-centered mb-0">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ASOS Ridley High Waist</td>
                                            <td>$79.49</td>
                                            <td>82</td>
                                            <td><span class="badge text-success border border-success">Active</span></td>
                                            <td>$6,518.18</td>
                                        </tr>
                                        <tr>
                                            <td>Marco Lightweight Shirt</td>
                                            <td>$128.50</td>
                                            <td>37</td>
                                            <td><span class="badge text-warning border border-warning">Pending</span></td>
                                            <td>$4,754.50</td>
                                        </tr>
                                        <tr>
                                            <td>Half Sleeve Shirt</td>
                                            <td>$39.99</td>
                                            <td>64</td>
                                            <td><span class="badge text-primary border border-primary">Done</span></td>
                                            <td>$2,559.36</td>
                                        </tr>
                                        <tr>
                                            <td>Lightweight Jacket</td>
                                            <td>$20.00</td>
                                            <td>184</td>
                                            <td><span class="badge text-info border border-info">Progress</span></td>
                                            <td>$3,680.00</td>
                                        </tr>
                                        <tr>
                                            <td>Marco Shoes</td>
                                            <td>$28.49</td>
                                            <td>69</td>
                                            <td><span class="badge text-warning border border-warning">Pending</span></td>
                                            <td>$1,965.81</td>
                                        </tr>
                                        <tr>
                                            <td>ASOS Ridley High Waist</td>
                                            <td>$79.49</td>
                                            <td>82</td>
                                            <td><span class="badge text-primary border border-primary">Done</span></td>
                                            <td>$6,518.18</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> <!-- end table responsive-->
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="dropdown float-end">
                                <a href="layouts-detached.html#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="mdi mdi-dots-vertical"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Sales Report</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Export Report</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Profit</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Action</a>
                                </div>
                            </div>

                            <h4 class="header-title mb-3">Latest Update</h4>
                            <div class="align-items-center border-bottom border-light pb-2 mb-1">
                                <h3 class="float-end my-2 py-1">45K</h3>
                                <div class="d-flex align-items-center">
                                    <div class="avatar-md rounded-circle bg-soft-info">
                                        <i class="mdi mdi-sale font-26 avatar-title text-info"></i>
                                    </div>
                                    
                                    <div class="ms-2">
                                        <h5 class="mb-1 mt-0 fw-bold">Total Sales</h5>
                                        <p class="text-muted mb-0">New Sale 20.5k</p>
                                    </div>
                                </div>
                            </div>
                            <div class="align-items-center border-bottom border-light py-2 my-1">
                                <h3 class="float-end my-2 py-1">13K</h3>
                                <div class="d-flex align-items-center">
                                    <div class="avatar-md rounded-circle bg-soft-warning">
                                        <i class="mdi mdi-autorenew font-26 avatar-title text-warning"></i>
                                    </div>
                                    
                                    <div class="ms-2">
                                        <h5 class="mb-1 mt-0 fw-bold">Product Cost</h5>
                                        <p class="text-muted mb-0">Total Cost 12.3k</p>
                                    </div>
                                </div>
                            </div>
                            <div class="align-items-center border-bottom border-light py-2 my-1">
                                <h3 class="float-end my-2 py-1">16M</h3>
                                <div class="d-flex align-items-center">
                                    <div class="avatar-md rounded-circle bg-soft-pink">
                                        <i class="mdi mdi-emoticon-happy-outline font-26 avatar-title text-pink"></i>
                                    </div>
                                    
                                    <div class="ms-2">
                                        <h5 class="mb-1 mt-0 fw-bold">Satisfaction Users</h5>
                                        <p class="text-muted mb-0">Total Users 26M</p>
                                    </div>
                                </div>
                            </div>
                            <div class="align-items-center pt-2 mt-1">
                                <h3 class="float-end my-2 py-1">75K</h3>
                                <div class="d-flex align-items-center">
                                    <div class="avatar-md rounded-circle bg-soft-dark">
                                        <i class="mdi mdi-cash-multiple font-26 avatar-title text-dark"></i>
                                    </div>
                                    
                                    <div class="ms-2">
                                        <h5 class="mb-1 mt-0 fw-bold">Product Income</h5>
                                        <p class="text-muted mb-0">Income 65.4k</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="dropdown float-end">
                                <a href="layouts-detached.html#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="mdi mdi-dots-vertical"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Sales Report</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Export Report</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Profit</a>
                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item">Action</a>
                                </div>
                            </div>

                            <h4 class="header-title mb-3">Total Users</h4>
                            <div class="text-center mb-4">
                                <div class="apex-charts" id="radialBar"></div>
                            </div>
                            <div class="row align-items-center justify-content-center">
                                <div class="col-5">
                                    <h5><i class="mdi mdi-circle-double text-info me-1"></i> Last Month</h5>
                                </div>
                                <div class="col-6">
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-info" role="progressbar" style="width: 55%;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center justify-content-center mt-1">
                                <div class="col-5">
                                    <h5><i class="mdi mdi-circle-double text-pink me-1"></i> Last week</h5>
                                </div>
                                <div class="col-6">
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-pink" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end row -->
            
        </div> <!-- container -->
    </div> <!-- content -->
    <VFooter></VFooter>
</div>
</template>

<script>


import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import { mapState  } from "vuex";

import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import { MedInfo } from "@/api/data.js";
import 'element-ui/lib/theme-chalk/index.css';
import { Pagination } from 'element-ui';
import VFooter from "@/components/Footer.vue";

export default {
  
  data () {

    return {
      projectName:MedInfo.projectName,

      productSalesInfo:[
        {categoryId:1, categoryName:'抓药', ratio:'50',color:'#ddd'},
        {categoryId:2, categoryName:'挂号', ratio:'20',color:'#ddd'},
        {categoryId:3, categoryName:'住院', ratio:'25',color:'#ddd'},
        {categoryId:4, categoryName:'陪诊', ratio:'5',color:'#ddd'},
      ],

      todayData : {
        orders : 0,
        todayOrder : 0,
        orderMoney : 0,
        todayMoney : 0
      },
      equipmentData:{
        all:0,
        online:0,
        offline:0
      },

      listOrder:[],
      pager:{
        pages: 0,
        currentPage: 0,
        total:0,
        size:5
      },

      polar: {
         title: {
          text: '折线图堆叠'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: ['金额', '订单']
          },
          grid: {
              left: '0',
              right: '10',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: []
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                  name: '金额',
                  type: 'line',
                  data: []
              },
              {
                  name: '订单',
                  type: 'line',
                  data: []
              }
          ]
      },

      weekData:[],
      monthData:[]
    }
  },
  methods:{
    async getAllOrders(){
      if(!this.pager.currentPage || this.pager.currentPage == 0){
        this.pager.currentPage = 1;
      }
      let res = await fetchGet(api.getTodayOrders, {current:this.pager.currentPage, 
          pageSize: this.pager.size, openid:this.userId});

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
        return {...item}
      })

      this.pager = {
        pages : res.data.pages,
        currentPage : res.data.current,
        total: res.data.total,
        size:res.data.size
      }
    },

    async accountingOrder(){
      let res = await fetchGet(api.accountingOrder, {openid:this.userId});
      let count = res.data;
      this.todayData = {
        orders : count.allCount || 0,
        todayOrder : count.todayCount|| 0,
        orderMoney : count.allSpend|| 0,
        todayMoney : count.todaySpend|| 0
      }
    },
    //设备数量统计
    async accountingEquipment(){

      let res = await fetchGet(api.accountingEquipment, {agentId:this.userId});
      let count = res.data;
      
      console.log(count)
      this.equipmentData = {
        all : count.all || 0,
        online : count.online|| 0,
        offline : count.offline|| 0
      }
      
    },
    
    pageClick(page){
      console.log(page)
      this.pager.currentPage = page;
      this.$loading("加载中...");
      this.getAllOrders();
      this.$loading_close();
    },
    
    async currentWeek(){
      let xAxis = [];
      let dataArray  = [];
      let dataArray1 = [];

      if(this.weekData.length == 0){
        let res = await fetchGet(api.getWeekOrders, {openid:this.userId});
        this.weekData = res.data;
      }
      
      for(var i=0;i<this.weekData.length;i++){
        xAxis.push(this.weekData[i].time);
        dataArray1.push(this.weekData[i].spend );
        dataArray.push(this.weekData[i].count );
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
    async currentMonth(){
      let xAxis = [];
      let dataArray  = [];
      let dataArray1 = [];
      
      if(this.monthData.length == 0){
        let res = await fetchGet(api.getMonthOrders, {openid:this.userId});
        this.monthData = res.data;
      }

      for(var i=0;i<this.monthData.length;i++){
        xAxis.push(this.monthData[i].time);
        dataArray1.push(this.monthData[i].spend );
        dataArray.push(this.monthData[i].count );
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
    showMonthFirstDay(){     
        var Nowdate=new Date();     
        var MonthFirstDay=new Date(Nowdate.getYear(),Nowdate.getMonth(),1);     
        //M=Number(MonthFirstDay.getMonth())+1     
        //return MonthFirstDay.getYear()+"-"+M+"-"+MonthFirstDay.getDate();     
        return Number(MonthFirstDay.getMonth())+1  ;     
    }
  },
  components: {
    echart: ECharts,
    Pagination,
    VFooter
  },
  created(){
    
  },
  computed:{
     ...mapState("userModule", ["userId"])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.css-k5zpz8 {
    color: #22e39e;
}
</style>
