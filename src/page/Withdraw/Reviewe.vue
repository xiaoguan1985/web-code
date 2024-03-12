<template>
  <!-- 代理商提现 -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="form-horizontal">
          <div class="form-group row">

            <div class="col-sm-2">
              <input type="text" class="form-control form-control-sm" v-model="queryWapper.nickName" placeholder="昵称">
            </div>

            <div class="col-sm-2">
              <input type="text" class="form-control form-control-sm" v-model="queryWapper.phone" placeholder="手机号">
            </div>

            <div class="col-sm-1">
              <a class="btn btn-block btn-primary btn-sm" @click="queryAuthagent" href="javascript:void(0);">查询</a>
            </div>
            
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->

      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        <div class="row">
          <div class="col-lg-12">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="申请中" name="first">
                <table-data 
                :list-auth-agent-cash="listAuthAgentCash" 
                :showOption="activeName"
                @on-agree="handlerAgree"
                @on-refuse="handlerRefuse"

                ></table-data>
              </el-tab-pane>
              <el-tab-pane label="已拒绝" name="second">
                <table-data :list-auth-agent-cash="listAuthAgentCash" :showOption="activeName"></table-data>
              </el-tab-pane>
              <el-tab-pane label="审核通过" name="third">
                <table-data :list-auth-agent-cash="listAuthAgentCash" :showOption="activeName"></table-data>
              </el-tab-pane>
            </el-tabs>
          </div>
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
      <!-- /.content -->



      <el-dialog title="同意" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="agree-memo"> 审批意见</div>
        <span>
          <input type="text" class="form-control form-control-sm" v-model="authAgentCash.memo" placeholder="同意">
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="handlerAgreeOK" size="mini">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="拒绝" :visible.sync="dialogVisibleRefuse"  width="30%" :before-close="handleClose">
        <div class="agree-memo"> 审批意见</div>
        <span>
          <input type="text" class="form-control form-control-sm" v-model="authAgentCash.memo" placeholder="同意">
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleRefuse = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="handlerRefuseOK" size="mini">确 定</el-button>
        </span>
      </el-dialog>

     
    </div>
    <!-- /.content-wrapper -->
</template>

<script>
import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import { province, city } from "@/api/data.js";
import { getCookie, setCookie } from "@/util/util";
import { mapState, mapMutations } from "vuex";
import 'element-ui/lib/theme-chalk/index.css';
import { Pagination,Tabs,TabPane,Table,TableColumn,Button,Dialog  } from 'element-ui';
import TableData from './components/TableData'

export default {
  
  data () {
    return {
      activeName:'first',
      listAuthAgentCash : [],
      authAgentCash : {
        id       :'',
        memo     : '到账时间T+1'
      },
      dialogVisible:false,
      dialogVisibleRefuse:false,
      listState:[
        {key:0,value:"可用"},
        {key:1,value:"不可用"}
      ],
      roleType:[
        {key:0,value:"管理员"},
        {key:1,value:"商户"},
        {key:2,value:"渠道"},
      ],
    
      pager:{
         pages: 0,
        currentPage: 0,
        total:0,
        size:15
      },
      queryWapper:{
        nickName : '',
        phone    : '',
      }
    }
  },
  created(){
    this.getAgentCashRequest();
  },
  computed:{
    ...mapState("userModule", ["userId"]),
  },
  methods:{

    async getAgentCashRequest(){

      if(!this.pager.currentPage || this.pager.currentPage == 0){
        this.pager.currentPage = 1;
      }

      let obj = {
        nickName : this.authAgentCash.nickName,
        phone    : this.authAgentCash.phone,
        current:   this.pager.currentPage, 
        pageSize: this.pager.size, 
      }
      try{

        let url = "";

        switch(this.activeName){
          case "first":
            url = api.getAgentCashRequestProgress;
            break;

          case "second":
            url = api.getAgentCashRequestRefuse;
            break; 

          case "third":
            url = api.getAgentCashRequestAgree;
            break;

          default:
            url = api.getAgentCashRequestProgress;
            break; 
        }

        let res = await fetchPost(url, obj);
        
        let resData = res.data;

        this.listAuthAgentCash = resData.records;

        this.listAuthAgentCash.map(item=>{
          item.userType1 = false;
          return item;
        })

        this.pager = {
          pages : resData.pages,
          currentPage : resData.current,
          total: resData.total,
          size:resData.size
        }
        
      }catch(e){
       
      }
    },

    handleClick(e){
      this.getAgentCashRequest();
    },
    
    pageClick(page){
      console.log(page)
      this.pager.currentPage = page;
      this.$loading("加载中...");
      this.getAgentCashRequest();
      this.$loading_close();
    },
    sizeClick(size){
      
      this.pager.size = size;
      this.pager.currentPage = 1;
      this.getAgentCashRequest();
    },
    queryAuthagent(){
      
    },
    
    // 同意
    handlerAgree(e){
      this.authAgentCash.id = e.id;
      this.dialogVisible = true;
    },
    async handlerAgreeOK(){
      // 保存
      console.log(this.authAgentCash);

      if(this.authAgentCash.id<=0){
        return;
      }

      try{

        let res = await fetchPost(api.agreeAgentCashRequest, this.authAgentCash);

        if(res.status){
          this.$toast("审批成功！");
          this.getAgentCashRequest();
          this.dialogVisible = false;
        }

      }catch(e){
        console.log(e);
      }
    },

    // 拒绝
    handlerRefuse(e){
      this.authAgentCash.id = e.id;
      this.authAgentCash.memo = "拒绝审批";
      this.dialogVisibleRefuse = true;
    },
    async handlerRefuseOK(){
      // 保存
      console.log(this.authAgentCash);

      if(this.authAgentCash.id<=0){
        return;
      }

      try{

        let res = await fetchPost(api.refuseAgentCashRequest, this.authAgentCash);

        if(res.status){
          this.$toast("审批拒绝！");
          this.getAgentCashRequest();
          this.dialogVisibleRefuse = false;
        }

      }catch(e){
        console.log(e);
      }
    },

    handleClose(){
      this.dialogVisible = false;
      this.dialogVisibleRefuse = false;
    }
  },
  components: {
    Pagination,
    elTabs:Tabs,
    elTabPane:TabPane,
    elTable:Table,
    elTableColumn:TableColumn,
    elButton:Button,
    TableData:TableData,
    elDialog:Dialog
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-header{padding: 7px 10px; }
.content{background-color: #fefefe; padding-top:.5rem;}
.table td, .table th{padding: .4rem;}
.card-body .row{padding: 5px 0;}
.form-checkbox{line-height: 1.5rem;}
.red{color: coral;}
.option>a:not(:first-child){padding-left:5px;}
.card-footer{padding: .2rem 0 0 0;}
.el-pagination{padding-left: 0; padding-bottom: 0;}
>>>.el-pager li.active{color: #fff;background: #409efe;}
.el-pager li{font-size: 12px;min-width: 30px;}
>>>.el-tabs__item{font-size: 12px; padding: 0 20px; height: 35px; line-height: 35px;}

.el-table{font-size: 12px; color: #000;}
>>>.el-table td, .el-table th{padding: 3px !important;}
>>>.el-table thead{color: #000;}
>>>.el-table thead th{padding: 2px 0 !important;}
   .el-table .cell{padding-left: 2px;}
.agree-memo{font-size: 12px; padding-bottom: 10px;}
</style>
