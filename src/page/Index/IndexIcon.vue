<template>

<div class="content-page">
    <div class="content">

        <!-- Start Content-->
        <div class="container-fluid">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <h5 class="page-title" @click="openDialogVisible">添加纳音描述</h5>
                    </div>
                </div>
            </div>     
            <!-- end page title --> 

            <div class="row">
                
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">

                            <div class=" flex flex-center space-between">

                                <div>
                                    <span class="bg-warning fw-medium text-light rounded px-2 font-14 py-1 text-danger">应</span>
                                </div>
                                <div style="margin: 0 1rem;">

                                    <el-popover placement="right" width="800" trigger="click">
                                        <div class="flex row ">
                                            <div class="flex" v-for="(child, index) in naYinList">
                                                <div @click="onNaYinLayer(n)" class=" border  border-warning catch" 
                                                v-for="n in child">
                                                    <span>
                                                        {{ n.key }} 
                                                    </span>
                                                    <span class="catch-nayin">
                                                        {{ n.value }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <span  slot="reference" class="flex align-items-center ">
                                            <span style="cursor: pointer;" class="fw-semibold text-dark rounded px-2 font-14 py-1 border border-warning">{{ yZhu }}</span> 
                                            <span style="cursor: pointer;" class="fw-semibold text-danger rounded px-2 font-14 py-1 border border-warning font-zhu margin-left">{{ naYin }}</span> 
                                        </span>
                                       
                                    </el-popover>

                                </div>
                                <div>
                                    <span>{{ m_time }}</span>
                                </div>
                                <div class="na-yin">
                                    <p class="mb-0 text-center dz-font">年</p>
                                    <div class=" na-height" >
                                        <span class="font-zhu">{{ yZhu }}</span>
                                        <h6 class=" text-danger font-zhu">{{ naYin }}</h6>
                                    </div>
                                    
                                </div>

                                <div class="na-yin">
                                    <p class=" mb-0 text-center dz-font">月</p>
                                    <div class="na-height" >
                                        <span class="font-zhu" >{{ mZhu }}</span>
                                        <h6 class=" text-danger font-zhu">{{ mNaYin }}</h6>
                                    </div>
                                    
                                </div>

                                <div class="na-yin">

                                    <el-popover placement="right" width="800" trigger="click">
                                        <div class="flex row">
                                            <div class="flex" v-for="(child, index) in naYinList">
                                                <div @click="onNaYinLayerD(n)" class=" border  border-warning catch"  v-for="n in child">
                                                    <span>
                                                        {{ n.key }} 
                                                    </span>
                                                    <span class="catch-nayin">
                                                        {{ n.value }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <span  slot="reference" >
                                            <p class=" mb-0 text-center dz-font">日</p>
                                            <div class="na-height " >
                                                <span class="font-zhu text-muted" >{{ dZhu }}</span>
                                                <h6 class=" text-danger font-zhu">{{ dNaYin }}</h6>
                                            </div>
                                        </span>
                                       
                                    </el-popover>
                                    
                                </div>

                                <div class="na-yin">
                                    

                                    <el-popover placement="right" width="800" trigger="click">
                                        <div class="flex row ">
                                            <div class="flex" v-for="(child, index) in naYinList">
                                                <div @click="onNaYinLayerH(n)" class=" border  border-warning catch"  v-for="n in child">
                                                    <span>
                                                        {{ n.key }} 
                                                    </span>
                                                    <span class="catch-nayin">
                                                        {{ n.value }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <span  slot="reference" >
                                            <p class=" mb-0 text-center dz-font">时</p>
                                            <div class="na-height" >
                                                <span class="font-zhu text-primary">{{ hZhu }}</span>
                                                <h6 class=" text-danger font-zhu">{{ hNaYin }}</h6>
                                            </div>
                                        </span>
                                       
                                    </el-popover>
                                    
                                </div>
                            </div>

                            <div class="row m5">
                                <div class="col-lg-12  flex space-between flex-end">
                                    
                                    

                                    <div v-for="(item, index) in dizhiV1" :key="index" @click="onDiZhi(item)" class="di-zhi">
                                        
                                        <el-tooltip v-for="(child, index) in item.desc" class="item" effect="dark" :content="getDesc(item.desc)" placement="top">
                                            <span v-if="item.desc.length === 0"></span>
                                            <span v-else class="item px-2 py-1 border border-warning text-danger" data-key1="child" v-longpress="longPressHandler">{{child}} </span>
                                        </el-tooltip>


                                        <span class="el-dropdown-link na-center item font-zhu" @click="openDiZhi(item)">
                                            {{item.value}}
                                        </span>

                                        <el-divider v-for="(child, index) in item.desc"></el-divider>
                                    </div>


                                </div>
                            </div>

                            <div class="flex flex-center space-between">
                                <div>
                                    <span class="bg-dark fw-medium text-light rounded px-2 font-14 py-1">世</span>
                                </div>
                                <div style="margin: 0 1rem;">


                                    <el-popover placement="right" width="800" trigger="click">
                                        <div class="flex row">
                                            <div class="flex"  v-for="(child, index) in naYinList">
                                                <div @click="onNaYinLayer1(n)" class=" border  border-warning catch" v-for="n in child">
                                                    <span>
                                                        {{ n.key }}
                                                    </span>
                                                    <span class="catch-nayin">
                                                        {{ n.value }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <span  slot="reference" class="flex align-items-center ">
                                            <span style="cursor: pointer;" class="fw-semibold text-dark rounded px-2 font-14 py-1 border border-warning">{{ yZhu1 }}</span> 
                                            <span style="cursor: pointer;" class="fw-semibold text-danger rounded px-2 font-14 py-1 border border-warning font-zhu margin-left">{{ naYin1 }}</span> 
                                        </span>                                       
                                    </el-popover>


                                </div>
                                <div>
                                    <span>{{ m_time }}</span>
                                </div>
                                <div class="na-yin">
                                    <p class="mb-0 text-center dz-font">年</p>
                                    <div class="na-height" >
                                        <span class="font-zhu" >{{ yZhu1 }}</span>
                                        <h6 class="text-danger font-zhu">{{ naYin1 }}</h6>
                                    </div>
                                    
                                </div>
                                <div class="na-yin">
                                    <p class=" mb-0 text-center dz-font">月</p>
                                    <div class="na-height" >
                                        <span class="font-zhu" >{{ mZhu }}</span>
                                        <h6 class="text-danger font-zhu">{{ mNaYin }}</h6>
                                    </div>
                                    
                                    
                                </div>
                                <div class="na-yin">
                                    

                                    <el-popover placement="right" width="800" trigger="click">
                                        <div class="flex row ">
                                            <div class="flex" v-for="(child, index) in naYinList">
                                                <div @click="onNaYinLayerD1(n)" class=" border  border-warning catch"  v-for="n in child">
                                                    <span>
                                                        {{ n.key }} 
                                                    </span>
                                                    <span class="catch-nayin">
                                                        {{ n.value }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <span  slot="reference" >
                                            <p class=" mb-0 text-center dz-font">日</p>
                                            <div class="na-height" >
                                                <span class="font-zhu  text-muted" >{{ dZhu1 }}</span>
                                                <h6 class="text-danger font-zhu">{{ dNaYin1 }}</h6>
                                            </div>
                                        </span>
                                       
                                    </el-popover>
                                    
                                    
                                </div>
                                <div class="na-yin">
                                    <el-popover placement="right" width="800" trigger="click">
                                        <div class="flex row ">
                                            <div class="flex" v-for="(child, index) in naYinList">
                                                <div @click="onNaYinLayerH1(n)" class=" border  border-warning catch"  v-for="n in child">
                                                    <span>
                                                        {{ n.key }} 
                                                    </span>
                                                    <span class="catch-nayin">
                                                        {{ n.value }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <span  slot="reference" >
                                            <p class=" mb-0 text-center dz-font">时</p>
                                            <div class="na-height" >
                                                <span class="font-zhu text-primary">{{ hZhu1 }}</span>
                                                <h6 class=" text-danger font-zhu">{{ hNaYin1 }}</h6>
                                            </div>
                                        </span>
                                       
                                    </el-popover>
                                </div>

                            </div>

                            <div class="row m5">
                                <div class="col-lg-12  flex space-between flex-end">
                                    <!-- <span v-for="item in dizhi" class="avatar-sm rounded-circle bg-light na-center">{{item}}</span> -->


                                    <div v-for="(item, index) in dizhiV2" :key="index" @click="onDiZhi1(item)" class="di-zhi">
                                        <el-tooltip v-for="(child, index) in item.desc" class="item" effect="dark" :content="getDesc(item.desc)" placement="top">
                                            <span v-if="item.desc.length === 0"></span>
                                            <span v-else class="item px-2 py-1 border border-warning text-danger" >{{child}} </span>
                                        </el-tooltip>

                                        <span class="el-dropdown-link na-center item font-zhu" @click="openDiZhi1(item)">
                                            {{item.value}}
                                        </span>

                                        <el-divider v-for="(child, index) in item.desc"></el-divider>
                                        <!-- <span class="item" v-html="item.hour">
                                        </span> -->
                                    </div>

                                </div>

                                
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
            
        </div> <!-- container -->
    </div> <!-- content -->
    <VFooter></VFooter>


    <el-dialog
        
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">

        <div class="flex wrap space-around" >
            <div class="flex space-around"  v-for="(child, index) in nayinListV1">
                <label class="lbl-content">
                    {{ child.value }} 
                </label>
                <span style="margin: 0 10px;"><el-input v-model="child.desc" placeholder="请输入内容"></el-input></span>
                <span>
                    <el-button type="primary" @click="openPrompt(child)" icon="el-icon-check " circle></el-button>
                    
                </span>
            </div>
        </div>

    </el-dialog>

    <!-- 第一行地支 -->
    <el-dialog
        :visible.sync="dialogDiZhiVisible" top="5vh"
        width="500px"
        :before-close="handleCloseZhi">

        <div class="flex  justify-content-center">
            <div  v-for="(child, index) in nayinListExt">
                <div class=" border  border-warning catch1"  @click="checkNaYin(n)"
                v-for="n in child">
                    <span>
                        {{ n.key }} 
                    </span>
                    <span class="catch1-nayin">
                        {{ n.value }}
                    </span>
                </div>
            </div>
        </div>

    </el-dialog>

    <!-- 第二行地支 -->
    <el-dialog
        :visible.sync="dialogDiZhiVisible1" top="5vh"
        width="500px"
        :before-close="handleCloseZhi1">

        <div class="flex justify-content-center">
            <div  v-for="(child, index) in nayinListExt">
                <div class=" border  border-warning catch1"  @click="checkNaYin1(n)"
                v-for="n in child">
                    <span>
                        {{ n.key }} 
                    </span>
                    <span class="catch1-nayin">
                        {{ n.value }}
                    </span>
                </div>
            </div>
        </div>

    </el-dialog>

    <el-dialog
        :visible.sync="dialogDiZhiVisible2"
        width="500px"
        :before-close="handleCloseZhi2">

        <div class="flex">
            <div  v-for="(child, index) in nayinListExt">
                <div class=" border  border-warning catch1"  @click="checkNaYin(n)"
                v-for="n in child">
                    <span>
                        {{ n.key }} 
                    </span>
                    <span class="catch1-nayin">
                        {{ n.value }}
                    </span>
                </div>
            </div>
        </div>

    </el-dialog>

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
import { getCookie, setCookie } from "@/util/util";
import VFooter from "@/components/Footer.vue";
import moment from 'moment';
import { bazi } from "@/util/bazi";
import { sysData } from "@/util/sys";

export default {
  
  data () {

    return {

      m_time : '',

      yijing_yao: [
        {Id:1, Name:'应',bgColor:'',Color:''},
        {Id:2, Name:'世',bgColor:'',Color:''}
      ],

      yZhu : '',
      yZhu1 : '',
      mZhu : '',
      dZhu : '',
      dZhu1 : '',
      hZhu : '',
      hZhu1 : '',

      naYin: '',
      naYin1: '',
      yNaYin : '',
      mNaYin : '',
      dNaYin : '',
      dNaYin1: '',
      hNaYin : '',
      hNaYin1: '',

      dizhi : [],
      dizhiV1: [],
      dizhiV2: [],

      naYinList: [],
      nayinListExt: [],
      nayinListV1 : [],

      dialogVisible: false,
      dialogDiZhiVisible: false,
      dialogDiZhiVisible1: false,
      dialogDiZhiVisible2: false,
      
      currentItemDiZhi : {},
      currentItemDiZhi1: {}
    }
  },
  methods:{

    openNaYin(){
        console.log(123)
    },

    onNaYinLayer(child){
        this.naYin = child.value;
        this.yZhu = child.key;
    },

    onNaYinLayer1(child){
        this.naYin1 = child.value;
        this.yZhu1 = child.key;
    },

    onDiZhi(item){
        this.currentItemDiZhi = item;
    },
    onDiZhi1(item){
        this.currentItemDiZhi1 = item;
    },

    openPrompt(n){
        
        setCookie(n.value, n.desc);
        this.$message({
          message: `${n.value}保存成功...`,
          type: 'success'
        });

    },
    
    handleClose(){
        this.dialogVisible = false;
    },
    handleCloseZhi(){
        this.dialogDiZhiVisible = false;
    },
    handleCloseZhi1(){
        this.dialogDiZhiVisible1 = false;
    },
    handleCloseZhi2(){
        this.dialogDiZhiVisible2 = false;
    },
    openDialogVisible(){

        this.nayinListV1 = sysData.nayinListV1.map((item,index) => {
            return {
                key:item.key,
                value:item.value,
                desc:getCookie(item.value)
            }
        })
        this.dialogVisible = true;
    },
    
    openDiZhi(item){

        if(item.desc && item.desc.length > 2){

            this.$message({
                message: '选择已经超过限制',
                type: 'warning'
            });

            return false;
        }

        this.dialogDiZhiVisible = true;
    },
    openDiZhi1(item){

        if(item.desc && item.desc.length > 2){

            this.$message({
                message: '选择已经超过限制',
                type: 'warning'
            });

            return false;
        }
        this.dialogDiZhiVisible1 = true;
    },
    checkNaYin(n){

        if(this.currentItemDiZhi.desc &&  Array.isArray(this.currentItemDiZhi.desc) && this.currentItemDiZhi.desc.length > 2 ){
            this.dialogDiZhiVisible = false;
            return false;
        }

        this.dizhiV1.map((item,index) => {
            return {
                ...item,
                desc: []
            }
        })

        if(!Array.isArray(this.currentItemDiZhi.desc)){
            this.currentItemDiZhi.desc = []
        }
        this.currentItemDiZhi.desc.push(n.value);
        this.currentItemDiZhi.desc = [...new Set(this.currentItemDiZhi.desc)];
        this.currentItemDiZhi.hour = `<span class="fw-semibold text-dark rounded px-2 font-14 py-1 border border-warning">刻桥</span> <span class="fw-semibold text-dark rounded px-2 font-14 py-1 border border-warning">分桥</span>`;
    },
    checkNaYin1(n){

        if(this.currentItemDiZhi1.desc &&  Array.isArray(this.currentItemDiZhi1.desc) && this.currentItemDiZhi1.desc.length > 2 ){
            this.dialogDiZhiVisible1 = false;
            return false;
        }

        this.dizhiV2.map((item,index) => {
            return {
                ...item,
                desc: ''
            }
        })

        if(!Array.isArray(this.currentItemDiZhi1.desc)){
            this.currentItemDiZhi1.desc = []
        }
        this.currentItemDiZhi1.desc.push(n.value);
        this.currentItemDiZhi1.desc = [...new Set(this.currentItemDiZhi1.desc)];
        this.currentItemDiZhi1.hour = `<span class="fw-semibold text-dark rounded px-2 font-14 py-1 border border-warning">刻桥</span> <span class="fw-semibold text-dark rounded px-2 font-14 py-1 border border-warning">分桥</span>`;
    },
    getDesc(desc){
        return getCookie(desc);
    },
    onNaYinLayerD(child){
        this.dZhu = child.key;
        this.dNaYin = child.value;
    },
    onNaYinLayerH(child){
        this.hZhu = child.key;
        this.hNaYin = child.value;
    },
    onNaYinLayerD1(child){
        this.dZhu1 = child.key;
        this.dNaYin1 = child.value;
    },
    onNaYinLayerH1(child){
        this.hZhu1 = child.key;
        this.hNaYin1 = child.value;
    },
    longPressHandler(event, arg){
        console.log('长按事件触发', event, arg);
    }
  },
  components: {
    echart: ECharts,
    VFooter,
    moment
  },
  created(){
    
    this.m_time = moment().format("YYYY年MM月DD日 HH:mm:SS");

    this.yZhu = bazi.yZhu();
    this.yZhu1 = bazi.yZhu();
    this.mZhu = bazi.mZhu();
    this.dZhu = bazi.dZhu();
    this.dZhu1 = bazi.dZhu();
    this.hZhu = bazi.hZhu();
    this.hZhu1 = bazi.hZhu();

    this.naYin =  bazi.naYin(this.yZhu);
    this.naYin1 =  bazi.naYin(this.yZhu1);
    this.yNaYin = bazi.naYin(this.yZhu);
    this.mNaYin = bazi.naYin(this.mZhu);
    this.dNaYin = bazi.naYin(this.dZhu);
    this.dNaYin1 = bazi.naYin(this.dZhu1);
    this.hNaYin = bazi.naYin(this.hZhu);
    this.hNaYin1 = bazi.naYin(this.hZhu1);

    this.dizhi = sysData.dzTest;
    this.naYinList = sysData.nayinList;
    this.nayinListExt = sysData.nayinListExt;


    this.nayinListV1 = sysData.nayinListV1.map((item,index) => {
      return {
        key:item.key,
        value:item.value,
        desc:getCookie(item.value)
      }
    })

    this.dizhiV1 = sysData.dzTest.map((item, index)=>{

        return {
            key : item + 1,
            value : item,
            desc : ''
        }
    })
    this.dizhiV2 = sysData.dzTest.map((item, index)=>{

        return {
            key : item + 1,
            value : item,
            desc : ''
        }
    })

  },
  computed:{
     ...mapState("userModule", ["userId"])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-page{
    margin-top:0;
}
.page-title{
    cursor: pointer;
}
.font-zhu{
    font-size: 13px;
    font-weight: 700;
}
.font-write{
    color: #FFF;
}
.css-k5zpz8 {
    color: #22e39e;
}
.vertical {
    writing-mode: vertical-lr; /* 从上至下 */
    text-orientation: upright; /* 保持正常显示 */
    letter-spacing: 5px;
}
.flex{
    display: flex;
}
.row{
    flex-grow: row;
}
.wrap{
    flex-wrap:wrap;
}
.lbl-content{
    padding: 12px 0;
}
.space-around{
    justify-content:space-around;
}
.justify-content-center{
    justify-content:center;
}
.flex-center{
    align-items: center;
}
.space-between{
    justify-content: space-between;
}
.flex-end{
    align-items: flex-end;
}
.align-items-center{
    align-items: center;
}
.na-yin{
    margin-left: 20px;
}
.font-15{
    font-size: 48rpx;
    font-weight: 500;
}
.font-zhu{
    font-weight: 700;
    color: #000;
    writing-mode: vertical-rl;
    letter-spacing: 2px;
    font-size: 20px;
}
.na-height{
    /* line-height: 4.5rem;
    text-align: center;
    margin: 10px 0; */

    justify-content: center;
    align-items: center;
    display: flex;
}
.m5{
    margin: 6rem 0;
}
.catch{
    position: relative;
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.catch-nayin{
    position: absolute;
    top: 0;
    right: 0;
    color: red;
}
.catch1{
    position: relative;
    height: 60px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.catch1-nayin{
    position: absolute;
    top: 0;
    right: 0;
    color: red;
    font-size: 12px;
}
.na-center{
    justify-content: center;
    align-items: center;
    display: flex;
}
.di-zhi{
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: center;
}
.di-zhi .item{
    margin: 5px 0;
    font-weight: 700;
    font-size: 14px;
}
.dz-font{
    background-color: #ffce86;
    color: #f7531f;
    border-radius: 2px;
}
.margin-left{
    margin-left: 10px;
}
>>>.el-divider{
    background-color: #f7531f;
}
>>>.el-divider--horizontal{
    margin: 2px 0;
}
</style>
