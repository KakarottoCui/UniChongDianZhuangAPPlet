import Vue from 'vue'
import App from './App'
import store from './store'
import uView from 'uview-ui';

     
import util from 'utils/util'
Vue.use(uView);
Vue.prototype.$util = util;
Vue.config.productionTip = false

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}



App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
Vue.prototype.$api = {msg};
app.$mount()
