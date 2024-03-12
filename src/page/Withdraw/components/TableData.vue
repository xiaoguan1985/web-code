<template>
  <el-table
    :data="listAuthAgentCash"
    border
    style="width: 100%">
    <el-table-column 
    prop="id"  fixed="left"
    label="ID" width="60">
    </el-table-column>
    <el-table-column prop="agentNickName" show-overflow-tooltip
      label="商户昵称">
    </el-table-column>

    <el-table-column
      prop="agentPhone"  width="140"
      label="电话">
    </el-table-column>

    <el-table-column
      prop="cashOutRequestTime"  show-overflow-tooltip
      label="提现时间">
    </el-table-column>

    <el-table-column
      width="140" 
      label="总消费">
       <template slot-scope="scope">
          {{scope.row.spend+'￥'}}
        </template>
    </el-table-column>

    <el-table-column
      width="80"
      label="比例">
        <template slot-scope="scope">
          {{scope.row.ratio+'%'}}
        </template>
    </el-table-column>

    <el-table-column
      width="100" 
      label="手续费">
      <template slot-scope="scope">
          {{scope.row.serviceCharge+'￥'}}
        </template>
    </el-table-column>

    <el-table-column
      width="100" 
      label="提现金额">
      <template slot-scope="scope">
          {{scope.row.cash+'￥'}}
        </template>
    </el-table-column>

    <el-table-column
      width="100"  show-overflow-tooltip
      label="备注">
      <template slot-scope="scope">
          {{scope.row.memo}}
        </template>
    </el-table-column>

    <el-table-column v-if="showOption == 'first'"
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">

        <el-button  type="text" @click="handlerAgree(scope.row)" size="small">同意</el-button>
        <el-button  type="text" @click="handlerRefuse(scope.row)" size="small">拒绝</el-button>

      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import { mapState, mapMutations } from "vuex";
import 'element-ui/lib/theme-chalk/index.css';
import { Pagination,Tabs,TabPane,Table,TableColumn,Button,Popover  } from 'element-ui';

export default {

  props: {
    listAuthAgentCash: {
      type: Array,
      required: true
    },
    showOption:{
      type: String,
      required: true
    }
  },
  
  data () {
    return {
      
      authAgentCash : {
        nickName : '',
        phone    : ''
      },

      visible:false
    }
  },
  created(){
    
  },
  computed:{
    
  },
  methods:{
    handlerAgree(e){
       this.$emit('on-agree', e);
    },
    handlerRefuse(e){
      this.$emit('on-refuse', e);
    }
  },
  components: {
    elTable:Table,
    elTableColumn:TableColumn,
    elButton:Button,
    elPopover:Popover
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-table{font-size: 12px; color: #000;}
>>>.el-table td, .el-table th{padding: 0 !important;}
>>>.el-table thead{color: #000;}
>>>.el-table thead th{padding: 2px 0 !important;}
   .el-table .cell{padding-left: 2px;}
</style>
