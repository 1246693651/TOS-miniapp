import Request from '../plugins/request/js/index';

export default {
	// 获取 模拟token 通过小程序登录获取token
	getMockToken() {
		// 1.wx获取登录用户code
		let code = null;
		let _this = this;
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				_this.code = loginRes.code;
				if (_this.isCanUse) {
					//非第一次授权获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							//获取用户信息后向调用信息更新方法
							//console.log(infoRes);
							let nickName = infoRes.userInfo.nickName; //昵称
							let avatarUrl = infoRes.userInfo.avatarUrl; //头像
							_this.nickName = nickName;
							_this.avatarUrl = avatarUrl;
							_this.updateUserInfo(); //调用更新信息方法
						}
					});
				}else{
					
				};
				
			},
		});
		return Request().post('/api/user/login', {
			data: {
				code: code
			}
		});
	},

	// 验证 模拟token，id为 123456 则 success，code 200， 否则 fail code 为 401
	checkMockToken(token) {
		return Request().request({
			url: '/api/user/checkToken',
			method: 'get',
			params: {
				'token': token
			},
			header: {
				token,
				uid: 'ux'
			},
			count: 0 // 用来记录 每个实例请求的 请求次数（可以用来判断 重新发送请求的次数）
		});
	}
};
