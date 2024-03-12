<template>
  <div id="wrapper" class="wrapper">
    
    <!-- <VHead v-if='$route.meta.requireAuth'></VHead> -->

    <!-- <Sidebar v-if='$route.meta.requireAuth'></Sidebar> -->

    <router-view></router-view>
    
  </div>
</template>

<script>

import VHead from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: 'APP',
  components: {
    VHead,
    Sidebar,
  },
  computed:{
    ...mapState("userModule", ["agentType"]),
  }
}
</script>

<style>
.card-footer{
  background-color: #fff;
}
.content-page{
  margin-left: 0;
}
</style>
