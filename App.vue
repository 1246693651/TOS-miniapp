<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/* @import "app.css"; */
</style>

<script>
	import Vue from 'vue'
	export default {
		// globalData:{
		// 	sessionId:uni.getStorageSync('token'),
		// 	nickName:'',
		// 	avatat:''
		// },
		onLaunch: function() {
			console.log('App Launch');
			// let globalData = this.$options.globalData;
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
			//判断是否授权
			if (uni.getStorageSync('isCanUse')) {
				console.log("已经授权过！");
			}else{
				//第一次登录
				uni.reLaunch({ //跳转到授权界面
					url: '/pages/index/index'
				});
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
</style>
