import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import Request from './plugins/request/js/index'
Vue.component('cu-custom',cuCustom)

//挂载到vue到原型上
Vue.prototype.$http = Request();

Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
