<template>

<!-- ========== Left Sidebar Start ========== -->
    <div class="left-side-menu">

        <div class="h-100" data-simplebar>
            <!--- Sidemenu -->
            <div id="sidebar-menu">

                <ul id="side-menu">

                    <li class="menu-title">首页</li>

                    <li>
                        <a href="index.html">
                            <span class="badge bg-success float-end">7</span>
                            <i class="iconfont icon-all-fill"></i>
                            <span> 驾驶舱 </span>
                        </a>
                    </li>

                    <li class="menu-title mt-2">音频</li>
                    <li>
                        <a href="#sidebarEmail" data-bs-toggle="collapse">
                            <i class="iconfont icon-add-account1"></i>
                            <span> 场景管理 </span>
                            <span class="menu-arrow"></span>
                        </a>
                        <div class="collapse" id="sidebarEmail">
                            <ul class="nav-second-level">
                                <li>
                                    <a href="#/aiuser">分类管理</a>
                                </li>
                                <li>
                                    <a href="#/aivoiceperson">AI人物管理</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="apps-calendar.html">
                            <i class="iconfont icon-video-camera"></i>
                            <span> 视频配音样例 </span>
                        </a>
                    </li>

                    <li>
                        <a href="#apps-aiStatistics" data-bs-toggle="collapse">
                            <i class="iconfont icon-tradingdata"></i>
                            <span> 数据统计 </span>
                            <span class="menu-arrow"></span>
                        </a>
                        <div class="collapse" id="apps-aiStatistics">
                            <ul class="nav-second-level">
                                <li>
                                    <a href="#/aiStatistics">生成语音统计</a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li class="menu-title mt-2">视频</li>
                    <li>
                        <a href="layouts-detached.html#sidebarAuth" data-bs-toggle="collapse">
                            <i class="iconfont icon-video-camera-add"></i>
                            <span> 视频标签 </span>
                        </a>
                    </li>


                    <li class="menu-title mt-2">用户</li>
                    <li>
                        <a href="#/users">
                            <i class="iconfont icon-vip-fill"></i>
                            <span> 用户统计 </span>
                        </a>
                        
                    </li>

                    <li class="menu-title mt-2">系统设置</li>
                    <li>
                        <a href="#/user/card" >
                            <i class="iconfont icon-homepage-ads-fill"></i>
                            <span> 语音会员卡管理 </span>
                        </a>
                    </li>
                    <li>
                        <a href="#/user/card-record">
                            <i class="iconfont icon-homepage-ads-fill"></i>
                            <span> 购卡记录 </span>
                        </a>
                    </li>


                     <!-- 添加class： menu-open 菜单展开 -->
                    <li :class="item.isOpen?'menu-open':''" v-for="(item,index) in menuTrue" v-bind:key="index">
                        <a :href="'#' + item.href" :class="[$route.path == item.href?'active':'']" data-bs-toggle="collapse">
                            <i class="iconfont" :class="item.icon"></i>
                            <span> {{item.title}} </span>
                            <span class="menu-arrow" v-show="item.children && item.children.length>0"></span>
                        </a>


                        <div class="collapse" :id="item.href">

                            <ul class="nav-second-level" v-show="item.children && item.children.length>0">
                                <li class="nav-item" v-for="(childItem, childIndex) in item.children" :key="childIndex">
                                    <a :href="'#' + childItem.href"  :class="[$route.path == childItem.href?'active':'']">
                                        <i class="iconfont" :class="childItem.icon"></i>
                                        <span>{{childItem.title}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>

            </div>
            <!-- End Sidebar -->

            <div class="clearfix"></div>

        </div>
        <!-- Sidebar -left -->

    </div>
<!-- Left Sidebar End -->



</template>

<script>
// import { menu } from "@/api/data.js";
// import { filterMenu } from "@/util/util.js";
import { mapState  } from "vuex";
import { fetchGet, fetchPost } from "@/api/axios_config.js";
import { api, buff } from "@/api/api.js";

export default {
  name: 'Sidebar',
  data () {
    return {
      list : [],
      cHeight : '0px'
    }
  },
  computed:{

    ...mapState("userModule", ["roleId"]),

    menuTrue : function(){
      let that = this;
      let result = this.list;
     
      return result.map(item => {
        return {
          ...item,
          isOpen: function(){
            let m = false;
            m = item.href == that.$route.path ? true : false;
            if(item.children){
              item.children.forEach(child => {
                if(child.href === that.$route.path){
                  m = true;
                }
              });
            }
            return m;
          }()
        };
      });
    }
  },
  methods:{

    async getAllMenu(){
      
      if(!this.roleId){
        this.$toast('数据错误');
        return false;
      }
      let res = await fetchGet(api.getMenuByRoleId, {roleId:this.roleId});

      this.list = res.data;
    }
  },
  created(){
    this.getAllMenu()
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-sidebar>.nav-item .nav-icon.fa, .nav-sidebar>.nav-item .nav-icon.fab, .nav-sidebar>.nav-item .nav-icon.far, .nav-sidebar>.nav-item .nav-icon.fas, .nav-sidebar>.nav-item .nav-icon.glyphicon, .nav-sidebar>.nav-item .nav-icon.ion{font-size: .8rem;}
.sidebar{padding-left: 0;padding-right: 0;}
.nav-pills .nav-link{border-radius: 0;}
.main-sidebar, .main-sidebar::before{width: 200px;}
.nav-parent{background-color: #495057;}
[class*=sidebar-dark-] .nav-treeview>.nav-item>.nav-link.active, [class*=sidebar-dark-] .nav-treeview>.nav-item>.nav-link.active:focus, [class*=sidebar-dark-] .nav-treeview>.nav-item>.nav-link.active:hover{background-color: #007bff;color: #e9ecef;}
.elevation-4 {
    box-shadow: 0 1px 1px rgba(0,0,0,.25),0 1px 5px rgba(0,0,0,.22)!important;
}
.elevation-3 {
    box-shadow: 0 1px 1px rgba(0,0,0,.25),0 1px 5px rgba(0,0,0,.22)!important;
}
[class*=sidebar-light-] {
    background-color: #f8f9fa;
}
</style>
