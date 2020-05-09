import Request from '../plugins/request/js/index';

export default {
	//登录模块
	
	/**
	 * 登录
	 */
	login(code){
		return Request().post('/api/user/login',{data:{
			code:code
		}});
	},
	
	//用户模块
	
	/**
	 * 获取用户信息
	 */
	getUserInfo(){
		return Request().get('/api/user/getUserInfo');
	},
	
	/**
	 * 更新用户到头像和昵称
	 * @param {Object} nickname
	 * @param {Object} avatar
	 */
	upadteUserInfo(nickname,avatar){
		return Request().post('/api/user/updateUserInfo',{
			data:{
				nickname:nickname,
				avatar:avatar
			}
		});
	}
		
	
}