<template>
  <!-- Content Wrapper. Contains page content -->
    <div class="content-page">
      <!-- Content Header (Page header) -->
      <div class="content">
        <div class="container-fluid">

            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <h5 class="page-title">语音统计</h5>
                        <div>
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">语音合成</a></li>
                                <li class="breadcrumb-item"><a href="javascript: void(0);">试听接口</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row">
              <div class="col-12">
                  <div class="card">
                      <div class="card-body">
                          <h4 class="header-title">
                            分类统计
                          </h4>
                          <p class="text-muted font-13 mb-4">
                              统计接口调用详情、单人调用次数
                          </p>

                          <div class="alert  alert-success" v-for="(item,index) in listPerson" :key="index" role="alert">
                            <strong>{{item.openId}}</strong> 于 <strong>{{item.createdTime}}</strong> 使用  <strong>{{item.personName}}</strong>  完成了配音！

                            <span class="badge badge-outline-info">采样率：{{item.personSampleRate}}</span>
                            <span class="badge badge-outline-info">分类：{{item.categoryName}}</span>
                            <span class="badge badge-outline-danger">{{item.voiceHot == 2 ? '精品':'普通'}}</span>
                            <span class="badge badge-outline-danger"><a href="#">下载</a></span>
                          </div>
                      </div> <!-- end card body-->

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
                  </div> <!-- end card -->
              </div><!-- end col-->
            </div>
            
        </div>
      </div>
      <!-- /.content-header -->


    </div>
    <!-- /.content-wrapper -->
</template>

<script>

import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import { timeAgo } from "@/util/util";
import { mapState, mapMutations } from "vuex";
import { Pagination,DatePicker,Table,TableColumn,Button,Tag } from 'element-ui';

export default {
  
  data () {
    return {
     
      listPerson:[],
      pager:{
        pages: 0,
        currentPage: 0,
        total:0,
        size:15
      },
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
   this.getALLAiVoiceStatistics();
  },
  methods:{
    
    async getALLAiVoiceStatistics(){

      if(!this.pager.currentPage || this.pager.currentPage == 0){
        this.pager.currentPage = 1;
      }

      let res = await fetchGet(api.getALLAiVoiceStatistics, {
        current:this.pager.currentPage, 
        pageSize: this.pager.size, 
      });

      let resData = res.data;

      this.listPerson = resData.records;

      this.listPerson.map(c=>{
        if(c.createdTime){
          let date = new Date(c.createdTime)
          c.createdTime = timeAgo(date.getTime())
        }

        return {...c};
      })

      this.pager = {
        pages : resData.pages,
        currentPage : resData.current,
        total: resData.total,
        size:resData.size
      }
    },
    pageClick(page){
      
      this.pager.currentPage = page;
      this.$loading("加载中...");
      this.getALLAiVoiceStatistics();
      this.$loading_close();
    },
    sizeClick(size){
      this.pager.size = size;
      this.pager.currentPage = 1;
      this.getALLAiVoiceStatistics();
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-lg{
  line-height: 4.5rem;
  color: #55adc1;
  font-weight: bold;
}

>>>.el-table td{
  padding: 5px 0 !important;
}

>>>.el-pagination{padding-left: 0; padding-bottom: 0; text-align: right;}
>>>.el-pager li.active{color: #fff;background: #409efe;}
>>>.el-pager li{font-size: 14px; border-radius: 50%; min-width: 28px;}
.el-table{font-size: 12px; color: #6c757d;}
>>>.el-table thead{color: #000;}
>>>.el-table thead th{padding: 2px 0 !important;}
el-table .cell{padding-left: 2px; line-height: 30px;}

.color-red{
  color: #348cd4;
  font-size: 30px;
}
</style>
