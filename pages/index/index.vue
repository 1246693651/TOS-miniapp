<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<view>
				<view class='header'>
					<image src='../../static/img/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import Api from '../../api/config';
	export default {
		data() {
			return {
				res: '',
				err: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: false //默认为true
			};
		},
		methods: {
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes);
						let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						_this.nickName = nickName;
						_this.avatarUrl = avatarUrl;
						try {
							uni.setStorageSync('isCanUse', true); //记录是否第一次授权  false:表示不是第一次授权
							_this.isCanUse=true;
							_this.updateUserInfo();
						} catch (e) {}
					},
					fail(res) {
						console.log(res);
					}
				});
			},

			//登录
			login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});

				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						//通过code换取token
						Api.login(code).then(res=>{
							//获取token
							let token =  res.data.token;
							//token存储//隐藏loading
							uni.setStorageSync("token",token);
							uni.hideLoading();
						}).catch(err=>{
							console.log(err);
							uni.hideLoading();
							uni.showToast({
								title:'登录失败'
							});
						})
						
					},
				});
			},
			//向后台更新信息
			updateUserInfo() {
				uni.showLoading({
					title:'更新用户信息中'
				})
				Api.upadteUserInfo(this.nickName,this.avatarUrl).then(res=>{
					console.log(res);
					uni.hideLoading();
					uni.reLaunch({ //信息更新成功后跳转到小程序首页
						url: '/pages/home/home'
					});
				}).catch(err=>{
					console.log(err);
					uni.hideLoading();
					uni.showToast({
						title:'更新用户数据失败'
					})
				})
			}
		},
		onLoad() { //默认加载
			this.login();
			//this.getUserInfo();
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
