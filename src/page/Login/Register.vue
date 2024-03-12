<template>
  <div>
    
    <div class="r-title"> 
      <h2>影视委</h2>
      <h3>
        全媒体运营、网络主播培训报名系统
      </h3>
    </div>

    <div class="r-body">
      <van-form @submit="onSubmit" v-if="registerSucess" class="r-form">
        <van-field required
          v-model="username"
          name="用户名"
          label="用户名"
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
        <van-field v-model="digit" required  :rules="[{ required: true, message: '请填写年龄' }]" type="digit" label="年龄" />

        <van-field
          readonly
          clickable required  :rules="[{ required: true, message: '请选择民族' }]"
          name="picker"
          :value="nation"
          label="民族"
          placeholder="点击选择民族"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker"  position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>

        <van-field v-model="card" name="patternCard" required  :rules="[{ pattern:patternCard, message: '请填写正确身份证号' }]" label="身份证号" />
        
        <van-field name="uploader" required label="照片">
          <template #input>
            <van-uploader :after-read="afterRead" :max-count="1" @oversize="onOversize" v-model="uploader" />
          </template>
        </van-field>

        <van-field v-model="tel" name="patternTel" required :rules="[{ required: true, pattern:patternTel, message: '请填写正确手机号' }]" type="tel" label="手机号" />
        <van-field v-model="email" name="patternTel" :rules="[{ required: true, pattern:patternEmail, message: '请填写正确邮箱' }]" required label="邮箱" />
        <van-field v-model="address" :rules="[{ required: true, message: '请填写通讯地址' }]" required label="通讯地址" />
        <van-field required
          v-model="interest"
          rows="2" :rules="[{ required: true, message: '请填写爱好' }]"
          autosize
          label="爱好特长"
          type="textarea"
          maxlength="50"
          placeholder="请填写爱好"
          show-word-limit
        />

        <van-field v-model="Livestream"  placeholder="请填写直播平台" label="直播平台" />
        <van-field
          v-model="LiveExperience"
          rows="2"
          autosize
          label="直播经历"
          type="textarea"
          maxlength="50"
          placeholder="请输入直播经历"
          show-word-limit
        />


        <div style="margin: 16px;">
          <van-button round block type="primary" :loading="btnLoading" :disabled="btnDisabled" native-type="submit">提交</van-button>
        </div>
      </van-form>

      
      <div v-else>

        <van-empty image="network"  description="报名成功,请尽快打款。" />
        <div class="acc">
          <div class="acc-item">开户名：商海红船(北京)文化科技有限公司</div>
          <div class="acc-item">开户行：中国工商银行股份有限公司北京电信大楼支行</div>
          <div class="acc-item">银行账号：0200 2352 0906 7053 107</div>
        </div>
        
      </div>
    </div>
    
    
  </div>
  
</template>

<script>

import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import { agentCode } from "@/api/agent.js";
import { getCookie, setCookie } from "@/util/util";
import { mapState, mapMutations } from "vuex";
import axios from 'axios'

export default {
  
  data () {
    return {
      btnDisabled:false,
      btnLoading:false,
      registerSucess:true,
     
      radio: '1',
      digit: '',

      tel:'',
      username:'',
      card:'',
      email:'',
      address:'',

      interest:'', // 爱好

      Livestream:'', // 直播
      LiveExperience:'', // 直播经历

      uploader: [],
      img:'',

      nation: '',  // 民族
      columns: ['汉族', '回族', '壮族', '维吾尔族', '苗族'
      , '彝族', '土家族', '藏族', '蒙古族', '侗族', '布依族', '瑶族', '白族', '朝鲜族', '哈尼族'
      , '黎族', '哈萨克族', '傣族', '畲族', '傈僳族', '东乡族', '仡佬族', '拉祜族', '佤族', '水族'
      , '纳西族', '羌族', '土族', '仫佬族', '锡伯族', '柯尔克孜族', '景颇族', '撒拉族', '布朗族', '毛南族'
      , '塔吉克族', '普米族', '阿昌族', '怒族', '鄂温克族', '京族', '基诺族', '德昂族', '保安族', '俄罗斯族'
      , '裕固族', '乌孜别克族', '门巴族', '鄂伦春族', '独龙族', '赫哲族', '高山族', '珞巴族', '塔塔尔族'],
      showPicker: false,


      patternTel:   /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
      patternEmail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      patternCard:  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    }
  },
  created(){

    let query = this.$route.query;
   
  },
  computed: {
    ...mapState("userModule", ["token"])
  },
  components: {
  },
  methods:{

    onConfirm(value) {
      this.nation = value;
      this.showPicker = false;
    },
    
    async onSubmit(){
      console.log(this.username);

      this.btnLoading = true;
      
      let users = {
        userName : this.username,
        sex: this.radio,
        age: this.digit,
        nation: this.nation,
        card: this.card,
        tel: this.tel,
        email:this.email,
        address: this.address,
        interest: this.interest,
        LiveStream: this.Livestream,
        LiveExperience: this.LiveExperience,
        img:this.img
      }

      try{

        let res = await fetchPost(api.saveOtherVideoRegister, users);

        console.log(res);

        if(res.status){
          if(res.data.code == "1"){
            this.btnDisabled = true;
            this.btnLoading = false;
            this.registerSucess = false;
            this.$toast('报名成功，请等待审核通知。', 3000); 
          }
          if(res.data.code == "-1"){
            this.btnLoading = false;
            this.$toast('报名失败，手机号、身份证号已经注册。', 3000);
          }
        }else{
          this.$toast('报名失败！', 3000);
        }
      }catch(e){
        this.$toast(e.msg, 3000);
      }
      

    },
    afterRead(file){

      let ax = axios.create();
      let param = new FormData();
      param.append("file", file.file);
      
      //let res = await fetchPost(api.upLoadQiniu,formData);
       let config = {       
        headers: { 
            //添加请求头           
            "Content-Type": "multipart/form-data"  ,
            "accept": "*/*"                      
        }   
       }; 

      ax.post(api.upLoadQiniu, param, config)
      .then(result => {
        let res = result.data

        if(res.status){
          this.img = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    onOversize(file){

      Toast('文件大小不能超过 500kb');
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

.wrapper_showOverlay {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block_showOverlay {
    width: 180px;
    height: 60px;
    background-color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .acc{
    margin: 0 24px;
    font-size: 14px;
  }
  .acc-item{
    padding-bottom: 12px;
  }
</style>
