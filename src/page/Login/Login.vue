<template>
  <div class="account-pages mt-5 mb-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-4">
                        <div class="card shadow-none">

                            <div class="card-body p-3">
                                
                                <div class="text-center w-75 m-auto">
                                    <div class="auth-logo">
                                        <a href="index.html" class="logo logo-dark text-center">
                                            <span class="logo-lg">
                                                <img src="static/img/logo-sm.png" alt="" height="22">
                                            </span>
                                        </a>
                    
                                        <a href="index.html" class="logo logo-light text-center">
                                            <span class="logo-lg">
                                                <img src="static/img/logo-sm.png" alt="" height="22">
                                            </span>
                                        </a>
                                    </div>
                                    <h3 class="text-muted mb-4 mt-3">期货算法统一登录系统</h3>
                                </div>

                                <div class="mb-3">
                                    <label for="emailaddress" class="form-label">账号</label>
                                    <input type="text" class="form-control" v-model="userName" placeholder="账号">
                                </div>

                                <div class="mb-3">
                                    <label for="password" class="form-label">密码</label>
                                    <input type="password" class="form-control" v-model="passWord" placeholder="密码">
                                </div>

                                

                                <div class="mb-3">
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="checkbox-signin" checked>
                                        <label class="form-check-label" for="checkbox-signin">Remember me</label>
                                    </div>
                                </div>

                                <div class="text-center d-grid">
                                    <button class="btn btn-primary" @click="submit"> 登录 </button>
                                </div>

                            </div> <!-- end card-body -->
                        </div>
                        <!-- end card -->

                    </div> <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
</template>

<script>

import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";
import { agentCode } from "@/api/agent.js";
import { getCookie, setCookie } from "@/util/util";
import { mapState, mapMutations } from "vuex";

export default {
  
  data () {
    return {
      userName: '',
      passWord: '',
      code:'',
      codeImgSrc : '',
      title: '',
      background: ''
    }
  },
  created(){

    let query = this.$route.query;
   
    if(query){
      console.log(query.code)
      let agent = agentCode.find(item=>{
        return item.code == query.code
      })
      
      if(agent){
        this.title = agent.name;
        this.background = "login-page" + agent.background;
      }else{
        this.title = "期货算法";
        this.background = "login-page2";
      }
    }
  },
  computed: {
    ...mapState("userModule", ["token"])
  },
  methods:{

    ...mapMutations("userModule", ["update_user"]),

    async submit(){
      
      let that = this;

      if(this.userName.length && this.passWord.length){
        
        try{
          
          if(that.userName === "admin" && that.passWord === "9876543210"){
            
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });

            await that.delay(1000);

            loading.close();
           
            this.update_user({
              userId: 1,
              token: "adiejde-012",
              userName: "admin",
              roleId:1
            })

            this.$router.push(`/IndexIcon`);
          } else{
            this.$toast("用户名密码错误~~");
            return;
          }
         
        }
        catch(e){
          
          this.$loading_close();
          this.$toast(e.msg);
          return false;
        }
      }else{
        this.$toast("请输入用户名密码！");
        return false;
      }
    },

    async delay(ms) {
      
        return new Promise(resolve => {
            window.setTimeout(resolve, ms);
        });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-header{padding: 7px 10px;}
.login-logo{color: #fff;}


.login-page1{background-image: url('/static/img/login/01.jpg')}
.login-page2{background-image: url('/static/img/login/02.jpg')}
.login-page3{background-image: url('/static/img/login/03.jpg')}
.login-page4{background-image: url('/static/img/login/04.jpg')}
.login-page5{background-image: url('/static/img/login/05.jpg')}
.login-page6{background-image: url('/static/img/login/06.jpg')}
.login-card-body{border-radius: 3px;}
</style>
