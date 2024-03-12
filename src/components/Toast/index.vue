<template>
    <div class="compomemt_toast_container" v-if="isShow">
        <div class="compomemt_toast_content">
            {{title}}
        </div>
    </div>
</template>
<script>
export default {
    name:'Toast',
    data(){
        return {
            isShow:true
        }
    },
    props:['title','duration'],
    mounted () {
        const timer = setTimeout(()=>{
            this.isShow = false;
            clearTimeout(timer);
        },this.duration)
    }
}
</script>
<style scoped>
    .compomemt_toast_container{
        width:100%;
        position: fixed;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        text-align: center;
        z-index: 9999;
        
    }
    .compomemt_toast_content{
            max-width: 20rem;
            background: rgba(0,0,0,0.75);
            color:#fff;
            font-size:14px;
            padding:.24rem .3rem;
            border-radius: 4px;
            display: inline-block;
            text-align: left;
            box-sizing: border-box
        }

</style>

