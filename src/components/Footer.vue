<template>
  <!-- Footer Start -->
    <!-- <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    2024 &copy; 
                    <span v-if="agentType == 1">快速交易</span>
                    <span v-else>{{MedInfo.projectName}}</span>  <a href="">期货交易平台</a> 
                </div>
                <div class="col-md-6">
                    <div class="text-md-end footer-links d-none d-sm-block">
                        <a href="javascript:void(0);">最新作品</a>
                    </div>
                </div>
            </div>
        </div>
    </footer> -->
    <!-- end Footer -->
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {MedInfo} from '@/api/data.js';

export default {
  
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      MedInfo:MedInfo
    }
  },
  computed:{
    ...mapState("userModule", ["agentType"]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
