import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import * as API from '@/api';
import zhCn from 'ant-design-vue/lib/locale-provider/zh_CN';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './permission'; // permission control
import '@/plugins';
import '@/tool';
import VueAnimateNumber from 'vue-animate-number'

Vue.use(VueAnimateNumber)
Vue.config.productionTip = false;
Vue.prototype.$api = API;
// 获取设备宽度
const deviceWidth = document.documentElement.clientWidth;

// 假设设计稿宽度为750px，rem基准值设置为75
const baseWidth = 750;
const baseFontSize = 30;

// 计算当前设备下的rem基准值
const fontSize = deviceWidth / baseWidth * baseFontSize;

// 设置html的font-size
document.documentElement.style.fontSize = fontSize + 'px';
const vm = new Vue({
    router,
    store,
    render: function(createElement) {
        return createElement('a-config-provider', { props: { locale: zhCn } }, [
            createElement(App)
        ]);
    }
});

vm.$mount('#app');