import App from './App'
import util from '@/common/util.js';
Vue.prototype.util = util;
import Vue from 'vue'
import uView from "uview-ui";
Vue.use(uView);
// 自定义导航栏
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
// 自定义选择框
import btnmodal from './components/btn-modal/btn-modal.vue'
// uview验证码
import messageinput from './components/u-message-input/u-message-input.vue'
Vue.component('messageinput',messageinput)
//图片验证
import tfggVerify from './components/tfgg-verify/tfgg-verify.vue'
Vue.component('tfgg-verify',tfggVerify)


import validCode from './components/p-validCode/validCode.vue'
Vue.component('validcode',validCode)


// import md5 from 'js-md5'

import _mixins from './common/_mixins';
import _common from './common/common';
import _data from './common/_data';
import store from './store';
// Vue.use(md5)
// #ifndef VUE3

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif