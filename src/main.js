// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import toastRegistry from '@/components/Toast/index.js'
import loadingRegistry from '@/components/Loading/index.js'
Vue.config.productionTip = false
Vue.use(toastRegistry);
Vue.use(loadingRegistry);
Vue.use(Vant);
Vue.use(ElementUI);



Vue.directive('longpress', {
  bind: function (el, binding, vNode) {
    // 确保提供的表达式是函数
    if (typeof binding.value !== 'function') {
      // 获取组件名称
      const compName = vNode.context.name;
      let warn = `[longpress:] 1111 provided expression '${binding.expression}' is not a function, but has to be`;
      if (compName) { warn += `Found in component '${compName}'`; }
      console.warn(warn);
    }
    // 定义变量
    let pressTimer = null;
    // 创建计时器（ 1秒后执行函数 ）
    let start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return;
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          // 执行函数
          handler(e);
        }, 1000);
      }
    }
    // 取消计时器
    let cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    }
    // 运行函数
    const handler = (e) => {
      
      binding.value(e);
    }
    // 添加事件监听器
    el.addEventListener('mousedown', start);
    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#wrapper',
  router,
  store,
  components: { App },
  template: '<App/>'
})

