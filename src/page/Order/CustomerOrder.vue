<template>
  <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="form-horizontal">
          <div class="form-group row">
            
            <div class="col-sm-3">
              <!-- <input type="text" class="form-control form-control-sm" id="reservation" placeholder="起始时间-结束时间"> -->
              <vue-rangedate-picker v-model="time3" range></vue-rangedate-picker>
            </div>
            
            <div class="col-sm-2">
              <input type="text" class="form-control form-control-sm" placeholder="商户">
            </div>

            <div class="col-sm-2">
              <select class="form-control form-control-sm">
                <option>option 1</option>
                <option>option 2</option>
                <option>option 3</option>
                <option>option 4</option>
                <option>option 5</option>
              </select>
            </div>

            <div class="col-sm-1">
              <a class="btn btn-block btn-primary btn-sm" href="">查询</a>
            </div>
            <div class="col-sm-1">
              <a class="btn btn-block btn-primary btn-sm" href="">清空</a>
            </div>
            
          </div>
        </div><!-- /.container-fluid -->

      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        <div class="row">
          <div class="col-lg-12">
            <table class="table table-bordered">
              <thead>                  
                <tr>
                  <th style="width: 10px">#</th>
                  <th>订单编号</th>
                  <th>设备类别</th>
                  <th>可借个数</th>
                  <th>可还个数</th>
                  <th>所属渠道</th>
                  <th>商铺名称</th>
                  <th>设备状态</th>
                  <th style="width: 80px">操作</th>
                </tr>
              </thead>
              <tbody v-if="listCard && listCard.length>0">
                <tr>
                  <td>1.</td>
                  <td>Update software</td>
                  <td>
                    <div class="progress progress-xs">
                      <div class="progress-bar progress-bar-danger" style="width: 55%"></div>
                    </div>
                  </td>
                  <td><span class="badge bg-danger">55%</span></td>
                </tr>
              </tbody>
              <tfoot v-else>
                <tr>
                  <td colspan="8" class="nodata">无数据</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div class="card-footer clearfix">
          <ul class="pagination pagination-sm m-0 float-right">
            <li class="page-item"><a class="page-link" href="#">«</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">»</a></li>
          </ul>
        </div>
      </div>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
</template>

<script>


export default {
  
  data () {
    return {
     
      time3:"2019-12-2",
      smInput:'sm-input',
      listCard:[]
    }
  },
  components: {
    
  },
  created(){
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-header{padding: 7px 10px; }
.content{background-color: #fefefe; padding-top:.5rem;}
.mx-datepicker-range{width: 210px;}
>>>.mx-input{height: 30px;border-radius:.2rem;}
.mx-datepicker-range{width: 100%}
.nodata{text-align: center;}

</style>
