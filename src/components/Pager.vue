
<template>
    <ul class="pagination pagination-sm m-0 float-right">
        <li v-show="pages>0" class="page-item"><a class="page-link" href="#"> « </a></li>
        
        <li v-for="i in pages" :key="i" class="page-item" :class="{active: i === currentPage}" @click="goPage(i)">
            <a class="page-link" href="javascript:void(0);">{{i}}</a>
        </li>
        
        <li v-show="pages>0" class="page-item"><a class="page-link" href="#"> » </a></li>
        <li>
          <select class="form-control form-control-sm" v-model="size" @on-change="goSize">
            <option
            v-for="item in pageSizeOpts"
            :key="item"
            :label="item"
            :value="item">
            </option>
          </select>
        </li>
        <li class="total-page"><span style="margin-left:10px;">共 {{total}} 条记录</span></li>
    </ul>
</template>

<script>
export default {
  props:{
      pages : Number,
      currentPage : Number,
      total: Number,
      size:{
         default: 15
      }
  },
  data () {
    return {

      pageSizeOpts: [15, 30, 60, 100],
    }
  },
  methods: {
    goPage(e) {
      this.$emit("pageClick", e);
    },
    goSize(e){
      this.$emit("sizeClick", e);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.total-page{height: 31px; line-height: 31px;}
</style>

