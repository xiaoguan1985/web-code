<template>
  <div>
    
    <div class="r-title"> 
      <h2>威县新乡贤</h2>
      <h3>
        登记表
      </h3>
    </div>

    <div class="r-body">
      <van-form @submit="onSubmit" v-if="registerSucess"  class="r-form">
        <van-field required
          v-model="username"
          name="姓名"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field name="radio" required label="性别">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>

       
        <van-field
          readonly
          clickable  required
          name="datetimePicker"
          :value="age"
          label="出生年月"
          placeholder="点击选择时间" :rules="[{ required: true, message: '请选择时间' }]"
          @click="showAge = true"
        />
        <van-popup v-model="showAge"  position="bottom">
          <van-datetime-picker
            type="date" :min-date="minDate"   :formatter="formatter"
            @confirm="onConfirmAge"
            @cancel="showAge = false"
          />
        </van-popup>

        <van-field
          readonly
          clickable required :rules="[{ required: true, message: '请选择民族' }]"
          name="picker"
          :value="nation"
          label="民族"
          placeholder="点击选择民族"
          @click="showNation = true"
        />
        <van-popup v-model="showNation"  position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirmNation"
            @cancel="showNation = false"
          />
        </van-popup>

        <van-field
          v-model="fellowData"
          is-link required :rules="[{ required: true, message: '请选择籍贯' }]"
          readonly
          label="籍贯"
          placeholder="请选择籍贯"
          @click="showFellow = true"
        />
        <van-popup v-model="showFellow" round position="bottom">
          <van-picker show-toolbar title="籍贯" :columns="options"  
          @cancel="showFellow = false"
            @confirm="onConfirmFellow"/>
        </van-popup>


        <van-field
          v-model="addressData"
          is-link required :rules="[{ required: true, message: '请选择常住地' }]"
          readonly
          label="经常居住地"
          placeholder="经常居住地"
          @click="showAddress = true"
        />
        <van-popup v-model="showAddress" round position="bottom">
          <van-picker show-toolbar title="常住地" :columns="optionsAddress"  @cancel="showAddress = false" @confirm="onConfirmAddress"/>
        </van-popup>


      


        <van-field
          readonly
          clickable required :rules="[{ required: true, message: '请选择政治面貌' }]"
          name="picker"
          :value="partyMember"
          label="政治面貌"
          placeholder="点击选择"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker"  position="bottom">
          <van-picker
            show-toolbar
            :columns="party"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>




        
        <van-field
          readonly
          clickable required :rules="[{ required: true, message: '请选择学历' }]"
          name="picker"
          :value="degree"
          label="学历/学位"
          placeholder="点击选择"
          @click="showDegree = true"
        />
        <van-popup v-model="showDegree"  position="bottom">
          <van-picker
            show-toolbar
            :columns="degreeData"
            @confirm="onConfirmDegree"
            @cancel="showDegree = false"
          />
        </van-popup>

        <van-field v-model="job" placeholder="请输入职业职称" label="职业职称" />
        <van-field v-model="duty" placeholder="请输入单位及职务" label="单位及职务" />
        <van-field v-model="tel"  placeholder="请输入手机号码" name="patternTel" required :rules="[{ required: true, pattern:patternTel, message: '请填写正确手机号' }]" type="tel" label="手机号码" />

        <van-field 
          v-model="honor"
          rows="3"
          autosize
          label="所获荣誉"
          type="textarea"
          maxlength="500"
          placeholder="请输入所获得荣誉"
          show-word-limit
        />

        <van-field 
          v-model="interest"
          rows="2"
          autosize
          label="爱好"
          type="textarea"
          maxlength="500"
          placeholder="戏曲、摄影、书法等"
          show-word-limit
        />



        <div style="margin: 16px;">
          <van-button round block type="primary" :loading="btnLoading" :disabled="btnDisabled" native-type="submit">提交</van-button>
        
          <div style="margin: 16px auto; display: flex; justify-content: center; flex-direction: column; align-items: center;">
            <div>软件技术支持：思维在线（北京）科技有限公司</div>
            <div>联系电话： <a href="tel:400-805-7060">400-805-7060</a> </div>
          </div>
        </div>


      </van-form>

      <div v-else>

        <van-empty image="network"  description="填报成功。欢迎加入新乡贤大家庭！" />
        <div class="acc">
          <div class="acc-item color-blue">威县新乡贤</div>
          <div class="acc-item ">
            按照县委县政府的文件要求，在威县乡村振兴领导小组新乡贤服务中心的领导下，为了团结在外的威县新乡贤助力威县乡村振兴事业。目的是为了宣传新乡贤事迹、沟通交流感情、推进乡村振兴工作。希望各位新乡贤给予关注和支持。谢谢大家！
          </div>
          <div class="acc-item">关注公众号，了解更多新乡贤事迹</div>
          <div class="acc-item" style="text-align:center;">
            <img src="static/img/weixian.jpg" alt="" weidth="180" height="180">
            <div>威县新乡贤</div>
          </div>
        </div>
        
      </div>
    </div>
    

    
  </div>
  
</template>

<script>

import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import { weixian, pc } from "@/api/weixian.js";
import { agentCode } from "@/api/agent.js";
import { getCookie, setCookie } from "@/util/util";
import { mapState, mapMutations } from "vuex";

export default {
  
  data () {
    return {

      btnDisabled:false,
      btnLoading:false,
      registerSucess:true,
     
      radio: '1',

      showAge: false,
      age:    "",
      minDate:new Date("1949/01/01"),
      maxDate:new Date("2020/01/01"),

      partyMember:'',
      party:['群众','共青团员','无党派人士','中国共产党','中国国民党革命委员会','中国民主同盟','中国民主建国会','中国民主促进会','中国农工民主党','中国致公党','九三学社','台湾民主自治同盟'],
      showPicker:false,      


      tel:'',
      username:'',      
      job:'',
      duty:'',   //职业
      address:'',
      honor:'',  // 荣誉

      interest:'', // 爱好

      
      nation: '',  // 民族
      columns: ['汉族', '回族', '壮族', '维吾尔族', '苗族'
      , '彝族', '土家族', '藏族', '蒙古族', '侗族', '布依族', '瑶族', '白族', '朝鲜族', '哈尼族'
      , '黎族', '哈萨克族', '傣族', '畲族', '傈僳族', '东乡族', '仡佬族', '拉祜族', '佤族', '水族'
      , '纳西族', '羌族', '土族', '仫佬族', '锡伯族', '柯尔克孜族', '景颇族', '撒拉族', '布朗族', '毛南族'
      , '塔吉克族', '普米族', '阿昌族', '怒族', '鄂温克族', '京族', '基诺族', '德昂族', '保安族', '俄罗斯族'
      , '裕固族', '乌孜别克族', '门巴族', '鄂伦春族', '独龙族', '赫哲族', '高山族', '珞巴族', '塔塔尔族'],
      showNation: false,



      degree:'',  // 学历
      degreeData:['初中','高中','大专','本科','研究生','博士'],
      showDegree:false,



      // 籍贯
      showFellow: false,
      fellowData: '',

      // 常住地
      showAddress: false,
      addressData: '',
      optionsAddress:pc,

      patternTel:   /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,

    }
  },
  created(){

    let query = this.$route.query;

    console.log(this.options)
       
  },
  computed: {

    options : function(){

      let obj = weixian.map(p=>{

        let c = [];

        for(let i=0;i<p.children.length;i++){
          let child = {
            "text":p.children[i],
            "value": p.value + '00' + Number(i + 1)
          }
          c.push(child)
        }

        p.children = c;

        return {...p}
      })

      return obj;
    }
  },
  components: {
  },
  methods:{
    onConfirmDegree(value){
      this.showDegree = false;
      this.degree = value;
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onConfirmFellow(value) {

      // let obj = { text: children[i], value: '00' + Number(i + 1)) }

      this.showFellow = false;
      this.fellowData = value.join('/');
    },
    onConfirmAddress(value){
      this.showAddress = false;
      this.addressData = value.join('/');
    },
    onConfirmAge(date) {
      this.showAge = false;
      
      let y = date.getFullYear();
      
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      this.age = y + '-' + m + '-' + d;

    },
    onConfirmNation(value) {
      this.nation = value;
      this.showNation = false;
    },
    onConfirm(value) {
      this.partyMember = value;
      this.showPicker = false;
    },
    formatter(type, val) {
      if (type === 'year') {
        return val + '年';
      }
      if (type === 'month') {
        return val + '月';
      }
      if (type === 'day') {
        return val + '日';
      }
      return val;
    },
    async onSubmit(){
      console.log(this.username)
      
      let users = {
        userName : this.username,
        sex: this.radio,
        age: this.age,
        nation: this.nation,
        fellow:this.fellowData,
        address: this.addressData,
        tel: this.tel,
        partyMember:this.partyMember,
        degree:this.degree,
        duty:this.duty,
        job:this.job,

        interest: this.interest,
        honor:this.honor
        
      }

      try{

        let res = await fetchPost(api.saveFellowRegister, users);

        console.log(res);

        if(res.status){
          if(res.data.code == "1"){
            this.btnDisabled = true;
            this.btnLoading = false;
            this.registerSucess = false;
            this.$toast('填写成功。', 3000); 
          }
          if(res.data.code == "-1"){
            this.btnLoading = false;
            this.$toast('填写失败，手机号已经注册。', 3000);
          }
        }else{
          this.$toast('填写失败', 3000);
        }
      }catch(e){
        this.$toast(e.msg, 3000);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h2,h3{
  color:#1890ff !important;
}
.r-title{text-align: center; }
.r-title h2, .r-title h3{
  margin: 12rpx 0;
}
.r-body{
  background: #fff;
}
.r-form{
      padding-bottom: 100px;
}

.acc{
  margin: 0 24px;
  font-size: 14px;
}
.acc-item{
  padding-bottom: 12px;
}
.color-blue{
  color:var(--van-primary-color)
}
</style>
