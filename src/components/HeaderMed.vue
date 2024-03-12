<template>
  <!-- Topbar Start -->
<div class="navbar-custom">
<div class="container-fluid">
  <ul class="list-unstyled topnav-menu float-end mb-0">
      
      <li class="dropdown notification-list topbar-dropdown">
          <a class="nav-link dropdown-toggle waves-effect waves-light" 
          data-bs-toggle="dropdown" href="layouts-detached.html#" role="button" aria-haspopup="false" aria-expanded="false">
              <i style="font-size: 32px;" class="iconfont icon-messagecenter-fill"></i>
              <span class="badge bg-danger rounded-circle noti-icon-badge">2</span>
          </a>
          <div class="dropdown-menu dropdown-menu-end dropdown-lg">

              <!-- item-->
              <div class="dropdown-item noti-title">
                  <h5 class="m-0">
                      <span class="float-end">
                          <a href="" class="text-dark">
                              <small>全部已读</small>
                          </a>
                      </span>消息通知
                  </h5>
              </div>

              <div class="noti-scroll" data-simplebar>

                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item notify-item active">
                      <div class="notify-icon">
                          <i class="mdi mdi-comment-account-outline"></i>
                      </div>
                      <p class="notify-details">初相识</p>
                      <p class="text-muted mb-0 user-msg">
                          <small>刚刚购买月卡，充值￥19元。</small>
                      </p>
                  </a>

                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item notify-item">
                      <div class="notify-icon bg-primary">
                          <i class="mdi mdi-comment-account-outline"></i>
                      </div>
                      <p class="notify-details">昌业人力资源
                          <small class="text-muted">10 分钟前</small>
                      </p>
                      <p class="text-muted mb-0 user-msg">
                          <small>购买1年卡，充值￥189。</small>
                      </p>
                  </a>

              </div>

              <!-- All-->
              <a href="javascript:void(0);" class="dropdown-item text-center text-primary notify-item notify-all">
                  查看所有
                  <i class="fe-arrow-right"></i>
              </a>

          </div>
      </li>

      <li class="dropdown notification-list topbar-dropdown">
          <a class="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light" data-bs-toggle="dropdown" href="layouts-detached.html#" role="button" aria-haspopup="false" aria-expanded="false">
              
              <span class="pro-user-name ms-1">
                  管理员 <i class="iconfont arrow-down"></i> 
              </span>
          </a>
          <div class="dropdown-menu dropdown-menu-end profile-dropdown ">
              <!-- item-->
              <div class="dropdown-header noti-title">
                  <h6 class="text-overflow m-0">欢迎 !</h6>
              </div>

              <!-- item-->
              <a href="javascript:void(0);"  @click="modifyPassword"  class="dropdown-item notify-item">
                  <i class="fe-user"></i>
                  <span>我的账号</span>
              </a>

              <!-- item-->
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="fe-lock"></i>
                  <span>锁屏</span>
              </a>

              <div class="dropdown-divider"></div>

              <!-- item-->
              <a href="javascript:void(0);" @click="exit" class="dropdown-item notify-item">
                  <i class="fe-log-out"></i>
                  <span>退出</span>
              </a>

          </div>
      </li>

  </ul>

  <!-- LOGO -->
  <div class="logo-box">
      <a href="index.html" class="logo logo-light text-center">
          <span class="logo-sm">
            <!-- <img src="static/img/logo-med1.png" style="border-radius: 20px;" alt="" height="22"> -->
            <span class="logo-lg-text-light">期货算法</span>
          </span>

          <span class="logo-lg">
              <!-- <img src="static/img/logo-med1.png" style="border-radius: 30px;" alt="" height="45"> -->
          </span>
      </a>
  </div>

  <ul class="list-unstyled topnav-menu topnav-menu-left m-0">

      <li>
        <button class="button-menu-mobile waves-effect waves-light">
            <i class="iconfont icon-menu fe-menu"></i>
        </button>
      </li>
      
      <li class="dropdown d-none d-xl-block">
          <a class="nav-link dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" href="layouts-detached.html#" role="button" aria-haspopup="false" aria-expanded="false">
              用户中心
              <i class="iconfont arrow-down"></i> 
          </a>
          <div class="dropdown-menu">
              <!-- item-->
              <a href="javascript:void(0);" class="dropdown-item">
                  <i class="iconfont icon-tradingdata me-1"></i>
                  <span>数据分析</span>
              </a>

              <!-- item-->
              <a href="javascript:void(0);" class="dropdown-item">
                  <i class="iconfont icon-rise me-1"></i>
                  <span>今日新增</span>
              </a>

              <!-- item-->
              <a href="javascript:void(0);" class="dropdown-item">
                  <i class="iconfont icon-kehuquanyi me-1"></i>
                  <span>查看会员</span>
              </a>

              <div class="dropdown-divider"></div>

              <!-- item-->
              <a href="javascript:void(0);" class="dropdown-item">
                  <i class="iconfont icon-sound-filling-fill me-1"></i>
                  <span>发消息</span>
              </a>

          </div>
      </li>

      <li class="dropdown dropdown-mega d-none d-xl-block">
          <a class="nav-link dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" href="layouts-detached.html#" role="button" aria-haspopup="false" aria-expanded="false">
              财务中心
              <i class="iconfont arrow-down"></i> 
          </a>
          <div class="dropdown-menu dropdown-megamenu">
              <div class="row">
                  <div class="col-sm-8">
                      
                      <div class="row">
                          <div class="col-md-3">
                              <h5 class="text-dark mt-0">挂号</h5>
                              <ul class="list-unstyled megamenu-list">
                                  <li>
                                      <a href="javascript:void(0);">单独挂号</a>
                                  </li>

                                  <li>
                                      <a href="javascript:void(0);">联合挂号</a>
                                  </li>
                              </ul>
                          </div>

                          <div class="col-md-3">
                              <h5 class="text-dark mt-0">帮买药</h5>
                              <ul class="list-unstyled megamenu-list">
                                  <li>
                                      <a href="javascript:void(0);">跑腿服务</a>
                                  </li>
                                  <li>
                                      <a href="javascript:void(0);">渠道帮助购买</a>
                                  </li>
                              </ul>
                          </div>

                          <div class="col-md-3">
                              <h5 class="text-dark mt-0">住院</h5>
                              <ul class="list-unstyled megamenu-list">
                                  <li>
                                      <a href="javascript:void(0);">绿通</a>
                                  </li>
                                  <li>
                                      <a href="javascript:void(0);">自营渠道</a>
                                  </li>
                              </ul>
                          </div>

                          <div class="col-md-3">
                              <h5 class="text-dark mt-0">医院快速查询</h5>
                              <ul class="list-unstyled megamenu-list">
                                  <li>
                                      <a target="_blank" href="https://ai.aliyun.com/nls/tts">北医三院</a>
                                  </li>
                                  <li>
                                      <a href="javascript:void(0);">儿研所</a>
                                  </li>
                                  <li>
                                      <a href="javascript:void(0);">儿童医院</a>
                                  </li>
                                   <li>
                                      <a href="javascript:void(0);">西苑医院</a>
                                  </li>
                                  <li>
                                      <a href="javascript:void(0);">阜外医院</a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  
              </div>

          </div>
      </li>
  </ul>
  <div class="clearfix"></div>
</div>
</div>
<!-- end Topbar -->
</template>

<script>
import { api, buff } from "@/api/api.js";
import { mapState, mapMutations } from "vuex";

export default {
  
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState("userModule", ["userName"])
  },
  methods: {
    ...mapMutations("userModule", ["clear_user"]),

    exit:function(){
      this.clear_user({});
      this.$router.push('/login');
    },
    modifyPassword(){

      this.$router.push('/modify-password');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-dark{
    font-weight: bold;
}
</style>
