<template>
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

                    <el-table :data="listUserInfo" border style="width: 100%">
                      <el-table-column  prop="openid" label="OPENID" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column  prop="nickName"  label="昵称">
                      </el-table-column>
                      <el-table-column  prop="score"  label="积分">
                      </el-table-column>
                      <el-table-column  prop="city" show-overflow-tooltip label="城市">
                      </el-table-column>
                      <el-table-column  label="平台类型">
                        <template slot-scope="scope">
                          {{scope.row.platformType == 1 ? "微信":"支付宝"}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="createdTime" width="160" label="会员">
                        <template slot-scope="scope">
                          <span v-if="scope.row.userType==0" class="badge bg-info">非会员</span>
                          <span v-else class="badge bg-danger">会员</span>
                          <p v-if="scope.row.userType==1">
                            {{scope.row.memberStartTime}}至{{scope.row.memberEndTime}}
                          </p>
                        </template>
                      </el-table-column>
                      <el-table-column prop="createdTime" width="160" label="创建时间">
                      </el-table-column>
                      
                      <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                          <el-popover placement="top" v-if="scope.row.userType == 0" v-model="scope.row.userType1" width="200" trigger="click">
                              <div class="flex">
                                <div style="padding:10px;">
                                  {{scope.row.nickName}} 会员时间：
                                  <select class="form-control form-control-sm" v-model="scope.row.userMemberState">
                                    <option value="1">1年</option>
                                    <option value="2">6个月</option>
                                  </select>
                                </div>
                              </div>
                              <div class="cs-popover-button">
                                <el-button size="mini" type="text" @click="scope.row.userType1 = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="modifyUserType(scope.row, 1)">确定</el-button>
                              </div>
                              <el-link type="primary" slot="reference">设置会员</el-link>
                            </el-popover>

                            <el-popover 
                              placement="top" v-else v-model="scope.row.visible"
                              width="200"
                              trigger="click">
                              <div class="cs-popover-button">
                                <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                                  <el-button type="primary" size="mini" @click="modifyUserType(scope.row, 0)">确定</el-button>
                              </div>
                              
                              <el-link type="primary" slot="reference">取消会员</el-link>
                            </el-popover>
                        </template>
                      </el-table-column>
                    </el-table>

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
</template>

<script>

import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import 'element-ui/lib/theme-chalk/index.css';
import { Pagination, Select, Option, Popover,Button,Link,Table,TableColumn } from 'element-ui';
import { mapState, mapMutations } from "vuex";

export default {
  
  data () {
    return {
      time3:"2019-12-2",
      listUserInfo:[],
      pager:{
        pages: 0,
        currentPage: 0,
        total:0,
        size:15
      }
    }
  },
  components: {
   
    Pagination
  },
  created(){
     
    this.getAllUserInfo();
  },
  computed:{
    ...mapState("userModule", ["userId"]),
  },
  methods:{
    
    async getAllUserInfo(){
      if(!this.pager.currentPage || this.pager.currentPage == 0){
        this.pager.currentPage = 1;
      }
      let res = await fetchGet(api.getAllUserInfo, {current:this.pager.currentPage, 
          pageSize: this.pager.size});
      
      res.data.records.map(item=>{
        item.userMemberState = 1;
        return item;
      })

      this.listUserInfo = res.data.records;

      this.pager = {
          pages : res.data.pages,
          currentPage : res.data.current,
          total: res.data.total,
          size:res.data.size
        }
    },
    pageClick(page){
      console.log(page)
      this.pager.currentPage = page;
      this.$loading("加载中...");
      this.getAllUserInfo();
      this.$loading_close();
    },
    sizeClick(size){
      
      this.pager.size = size;
      this.pager.currentPage = 1;
      this.getAllUserInfo();
    },
    // userType 1：设置会员  2：取消会员
    async modifyUserType(item, userType){
      // String openid, int userType, int userMemberState

      let parms = {
        openid : item.openid,
        userType : userType,
        userMemberState: item.userMemberState
      }

      let res = await fetchGet(api.modifyUserType, parms);

      let resData = res.data;

      if(res.status){
        this.$toast("设置会员成功！");
      }
      
      this.getAllUserInfo();
    }
  },
  components: {
    Pagination,
    elSelect:Select,
    elOption:Option,
    elPopover:Popover,
    elButton:Button,
    elLink:Link,
    elTable:Table,
    elTableColumn:TableColumn
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
