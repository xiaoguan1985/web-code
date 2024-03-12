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
                              <li class="breadcrumb-item"><a href="javascript: void(0);">购卡记录</a></li>
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
                          <th>用户昵称</th>
                          <th>OPENID</th>
                          <th>卡类型</th>
                          <th>生效时间</th>
                          <th>结束时间</th>
                          <th>平台类型</th>
                          <th>购买时间</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody v-if="listCard && listCard.length>0">
                        <tr v-for="(item, index) in listCard" :key="index">
                          <td>{{item.id}}</td>
                          <td>{{item.nickName}}</td>
                          <td>{{item.openid}}</td>
                          <td>{{(item.memberCardDays)}} 日卡</td>
                          <td>{{ item.startTime }} </td>
                          <td>{{item.endTime}}</td>
                          <th>
                            {{item.platformType == 0 ? "微信":"支付宝"}}
                          </th>
                          <td>{{item.createdTime}}</td>
                          <td class="option">
                            <a href="javascript:void(0);" v-on:click="info(item.id)">详情</a>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot v-else>
                        <tr>
                          <td colspan="8" class="nodata">无数据</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div class="card-footer clearfix">
                    <Pagination layout="prev, pager, next, sizes, total" 
                    :current-page="pager.currentPage" 
                    :page-size="pager.size"
                    :page-sizes="[15, 30, 60, 100]"
                    :total="pager.total"
                    @size-change="sizeClick"
                    @current-change="pageClick"
                    ></Pagination>
                  </div>
                </div>
                
              </div>
            </div>

            
        </div>
        
      </div>
      <!-- /.content -->

    </div>
    <!-- /.content-wrapper -->
</template>

<script>


import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import 'element-ui/lib/theme-chalk/index.css';
import { Pagination } from 'element-ui';

export default {
  
  data () {
    return {
      listCard:[],
      pager:{
        pages: 0,
        currentPage: 0,
        total:0,
        size:15
      },
      queryWapper:{
        platformType: -1
      }
    }
  },
  created(){
     
    this.getCard();
  },
  methods:{
    
    async getCard(){
      if(!this.pager.currentPage || this.pager.currentPage == 0){
        this.pager.currentPage = 1;
      }
      let res = await fetchGet(api.getMemberCardRecord,
      {
          current:this.pager.currentPage, 
          pageSize: this.pager.size,
          platformType:this.queryWapper.platformType
      });

      this.listCard = res.data.records;
      this.pager = {
        pages : res.data.pages,
        currentPage : res.data.current,
        total: res.data.total,
        size:res.data.size
      }
    },
    queryCard(){
      this.getCard(1);
    },
    queryClear(){
      this.queryWapper = {
        platformType:-1
      }
    },
    pageClick(page){
      console.log(page)
      this.pager.currentPage = page;
      this.$loading("加载中...");
      this.getCard();
      this.$loading_close();
    },
    sizeClick(size){
      
      this.pager.size = size;
      this.pager.currentPage = 1;

      this.getCard();
    }
  },
  components: {
    Pagination
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
