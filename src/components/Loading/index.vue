<template>
    <div class="loading_component_area" v-if="!close">
        <!-- <div class="loading_component_shade">
            
        </div> -->
        <div class="loading_component_content">
            <div class="loader-03"></div>
            <div class="loading_component_tips">
                {{tips}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        'tips':String,
        'close':Boolean
    },
    mounted () {
      
       
    }
}
</script>
<style >

.loading_component_area{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height: 100%;
    z-index: 9999;
    background-color: #6c757d94;
    
}

 .loading_component_shade{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height: 100%;
        z-index: 100;
        background:rgba(0,0,0,0.4);
    }
.loading_component_content{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    width: 10rem;
    padding:.28rem 0 .2rem 0;
    background:rgba(0,0,0,0.75);
    border-radius:2px;
    font-size:14px;
    color:#fff;
    text-align: center;
    z-index:101
}
.loader-03 {
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    -webkit-animation: 1s loader03 linear infinite;
    animation: 1s loader03 linear infinite;
    position: relative;
    display: inline-block;
    vertical-align: middle
}
.loading_component_tips{
    margin-top:.24rem;
}
@keyframes loader03 {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>

