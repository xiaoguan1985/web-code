<template>
  <!-- Content Wrapper. Contains page content -->
    <div class="content-page">
      <!-- Content Header (Page header) -->
      <div class="content">
        <div class="container-fluid">

            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <h5 class="page-title">药品管理</h5>
                        <div>
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">产品管理</a></li>
                                <li class="breadcrumb-item"><a href="javascript: void(0);">药品管理</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
              <div class="col-xl-3 col-md-6" v-for="item in listCategory" :key="item.id">
                  <div class="card">
                      <div class="card-body">
                          <div class="d-flex justify-content-between">
                              <div class="avatar-lg text-center bg-light rounded-circle">
                                  {{item.categoryName}}
                              </div>
                              <div class="text-end">
                                  <p class="text-uppercase rounded-pill">北医三院</p>
                                  <p class="text-uppercase">购买次数</p>
                                  <h2 class="mb-0  text-success"><span data-plugin="counterup">
                                    {{item.useCount}}</span></h2>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="col-xl-3 col-md-6">
                  <div class="card">
                      <div class="card-body">
                          <div class="d-flex justify-content-between">
                              <div class="iconfont icon-add-select avatar-lg text-center bg-light rounded-circle">
                                  
                              </div>
                              <div class="text-end d-flex align-items-center">
                                  <h5><span data-plugin="counterup">添加药品</span></h5>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
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

export default {
  
  data () {
    return {
     
      listCategory:[]
    }
  },
  components: {
    
  },
  computed:{
    ...mapState("userModule", ["userId"]),
  },
  created(){
   this.getAllAiVoiceCategory();
  },
  methods:{
    
    async getAllAiVoiceCategory(){

      let res = await fetchGet(api.getAllAiVoiceCategory);

      this.listCategory = res.data;
    },

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-lg{
  line-height: 4rem;
  color: #55adc1;
  font-weight: bold;
  border: 5px solid #03a9f4;
}
.red-color{
  color: #f56c6c;
  padding: 2px 5px;
  border-radius: 2px;
  border: 1px solid #ddd;
}
</style>
