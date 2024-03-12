/**
 * @desc：如何实现一个vue全局组件(通过js的方式调用)
 * vue.extend 函数生成一个 组件构造器 可以用这个函数构造出一个 vue组件实例
 * 用 document.body.appendChild() 动态的把组件加到 body里面去
 * vue.prototype.$toast = showToast 可以在全局注册组件
 */
import vue from 'vue'
import loadingComponent from './index.vue'

// 返回一个扩展实例构造器
const LoadingConstructor = vue.extend(loadingComponent);
let loadingDom
// 定义弹出组件的函数
function showLoading(tips, close) {
    if(loadingDom){
        loadingDom.tips = tips;
        loadingDom.close = close;
        return false;
    }
    // 生成实例
    loadingDom = new LoadingConstructor();
    loadingDom.tips = tips;
    loadingDom.close = close;
    // 实例挂载到创建的div上
    document.body.appendChild(loadingDom.$mount().$el);
}
// 注册为全局组件的函数
function registryLoading() {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$toast()
    vue.prototype.$loading = showLoading;
    vue.prototype.$loading_close = function(){
       
        return showLoading("",true)
    }
}

export default registryLoading