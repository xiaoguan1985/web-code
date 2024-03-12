<template>
  <!-- Content Wrapper. Contains page content -->
    <div class="content-page">
      <!-- Content Header (Page header) -->
      <div class="content">
        <div class="container-fluid">

            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <h5 class="page-title">音频合成</h5>
                        <div>
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">场景管理</a></li>
                                <li class="breadcrumb-item"><a href="javascript: void(0);">人物管理</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
              <div class="col-12">
                  <div class="card">
                      <div class="card-body">
                          <h4 class="header-title">语音合成</h4>
                          <p class="text-muted font-13 mb-4">
                              高拟真度、灵活配置的语音合成产品，打通人机交互的闭环，让应用逼真发声。多种音色可供选择，并提供调节语速、语调、音量等功能。
                          </p>
                          <el-table :data="listPerson" border style="width: 100%">
                            <el-table-column  prop="id"  fixed="left" label="#" width="40">
                            </el-table-column>
                            <el-table-column  prop="personName"  fixed="left" label="姓名" width="80">
                            </el-table-column>
                            <el-table-column prop="personNameMemo" label="描述" show-overflow-tooltip width="80">
                            </el-table-column>
                            <el-table-column  prop="personVoice"  fixed="left" label="模式" width="80">
                            </el-table-column>
                            <el-table-column  show-overflow-tooltip label="采样率">
                              <template slot-scope="scope">
                                {{scope.row.personSampleRate}}
                                <!-- <span v-for="child in scope.row.personSampleRate"> {{child.v}}</span> -->
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="categoryName" width="80"
                              label="分类">
                            </el-table-column>
                            <el-table-column  label="精品" width="80">
                              <template slot-scope="scope">
                                <span class="badge badge-outline-info" v-if="scope.row.voiceHot == 1">普通</span>
                                <span class="badge badge-outline-danger" v-if="scope.row.voiceHot == 2">精品</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              label="头像"
                              width="60">
                              <template slot-scope="scope">
                                    <img :src=" 'http://static.biewangwo.com' + scope.row.personImg"  height="30" width="30px">
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="audition" show-overflow-tooltip
                              label="试听内容">
                            </el-table-column>
                            <el-table-column prop="platformText" label="平台" width="80">
                            </el-table-column>
                            
                            <el-table-column width="80"
                              label="操作">
                              <template slot-scope="scope">
                                
                                <div class="color-red iconfont icon-play"></div>
                                
                              </template>
                            </el-table-column>
                          </el-table>
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
import { mapState, mapMutations } from "vuex";
import { Pagination,DatePicker,Table,TableColumn,Button,Tag } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

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
   this.getALLAiVoicePerson();
  },
  methods:{
    
    async getALLAiVoicePerson(){

      if(!this.pager.currentPage || this.pager.currentPage == 0){
        this.pager.currentPage = 1;
      }

      let res = await fetchGet(api.getALLAiVoicePerson, {
        current:this.pager.currentPage, 
        pageSize: this.pager.size, 
      });

      let resData = res.data;

      this.listPerson = resData.records;
      this.listPerson.map(item=>{
        switch(item.platform){
          case 1:
            item.platformText = "阿里云"
            break;
        }
        let obj = JSON.parse(item.personSampleRate);
        // item.personSampleRate
        let str = "";
        for(let j=0;j<obj.length;j++){
          str += obj[j].v;
          if(j !== obj.length - 1){
            str += "、"
          }
        }
        item.personSampleRate = str;
        return {...item}
      })
      console.log('is :' , this.listPerson)

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
      this.getALLAiVoicePerson();
      this.$loading_close();
    },
    sizeClick(size){
      this.pager.size = size;
      this.pager.currentPage = 1;
      this.getALLAiVoicePerson();
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
