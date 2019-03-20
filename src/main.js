import Vue from 'vue'
import App from './App'
import 'common/stylus/index.styl'

Vue.config.productionTip = false
App.mpType = 'app'

/*
 * 消息提示
 * @param title 标题
 * @param flag '打钩' 还是 '无'
 * @param duration 持续时间
 * @return Promise(仅resolve)
*/
Vue.prototype.$toast = (title, flag = true, duration = 1000) => {
	return new Promise(resolve => {
		const icon = flag ? 'success' : 'none';
		wx.showToast({
	      	title: title,
	      	icon: icon
	    });
	    // 定时器
	    setTimeout(() => {
	    	resolve();
	    }, duration);
	});
}
/*
 * 加载中
 * @param title 标题
 * @param isMask 是否开启遮罩
 * @param duration 持续时间
 * @return Promise(仅resolve)
*/
Vue.prototype.$loading = (title, isMask = true, duration = 1000) => {
	return new Promise(resolve => {
		wx.showLoading({
			title: title,
			mask: isMask
		});
		// 定时器
	    setTimeout(() => {
	    	resolve();
	    }, duration);
	});
}
/*
 * 取消加载
*/
Vue.prototype.$unLoading = () => {
	wx.hideLoading();
}

const app = new Vue(App)
app.$mount()
