
	editNmArticle: baseUrl+ "/nmArticle/editNmArticle",
	
	findNmChargeOrderList: baseUrl+ "/nmChargeOrder/queryList",
	findNmChargeOrder: baseUrl+ "/nmChargeOrder/queryObject",
	addNmChargeOrder: baseUrl+ "/nmChargeOrder/addNmChargeOrder",
	editNmChargeOrder: baseUrl+ "/nmChargeOrder/editNmChargeOrder",
	
	findNmCollectList: baseUrl+ "/nmCollect/queryList",
	findNmCollect: baseUrl+ "/nmCollect/queryObject",
	addNmCollect: baseUrl+ "/nmCollect/addNmCollect",
	editNmCollect: baseUrl+ "/nmCollect/editNmCollect",
	
	findNmCommentList: baseUrl+ "/nmComment/queryList",
	findNmComment: baseUrl+ "/nmComment/queryObject",
	addNmComment: baseUrl+ "/nmComment/addNmComment",
	editNmComment: baseUrl+ "/nmComment/editNmComment",
	
	findNmInfoTypeList: baseUrl+ "/nmInfoType/queryList",
	findNmInfoType: baseUrl+ "/nmInfoType/queryObject",
	addNmInfoType: baseUrl+ "/nmInfoType/addNmInfoType",
	editNmInfoType: baseUrl+ "/nmInfoType/editNmInfoType",
	
	findNmMessageList: baseUrl+ "/nmMessage/queryList",
	findNmMessage: baseUrl+ "/nmMessage/queryObject",
	addNmMessage: baseUrl+ "/nmMessage/addNmMessage",
	editNmMessage: baseUrl+ "/nmMessage/editNmMessage",
	
	findNmPicList: baseUrl+ "/nmPic/queryList",
	findNmPic: baseUrl+ "/nmPic/queryObject",
	addNmPic: baseUrl+ "/nmPic/addNmPic",
	editNmPic: baseUrl+ "/nmPic/editNmPic",
	
	findNmStationList: baseUrl+ "/nmStation/queryList",
	findNmStation: baseUrl+ "/nmStation/queryObject",
	addNmStation: baseUrl+ "/nmStation/addNmStation",
	editNmStation: baseUrl+ "/nmStation/editNmStation",
	
	findNmStationItemList: baseUrl+ "/nmStationItem/queryList",
	findNmStationItem: baseUrl+ "/nmStationItem/queryObject",
	addNmStationItem: baseUrl+ "/nmStationItem/addNmStationItem",
	editNmStationItem: baseUrl+ "/nmStationItem/editNmStationItem",
	
	findNmUserList: baseUrl+ "/nmUser/queryList",
	findNmUser: baseUrl+ "/nmUser/queryObject",
	addNmUser: baseUrl+ "/nmUser/addNmUser",
	editNmUser: baseUrl+ "/nmUser/editNmUser",
	
	findNmUserLoginList: baseUrl+ "/nmUserLogin/queryList",
	findNmUserLogin: baseUrl+ "/nmUserLogin/queryObject",
	addNmUserLogin: baseUrl+ "/nmUserLogin/addNmUserLogin",
	editNmUserLogin: baseUrl+ "/nmUserLogin/editNmUserLogin",

	getPicById : baseUrl + "/nmPic/getPicById/",
	
	getPic : baseUrl + "/getFile/0/",
	
	editQuUser: baseUrl+ "/quUser/editQuUser",
	
}

const getUserInfo = function(){
	var _this = this;
	try {
		const value = uni.getStorageSync('userInfo');
		console.log("1"+JSON.stringify(value));
		return value ? value : false;
	} catch (e) {
		return false;
	}
}

const login = function(){
	var _this = this;
}

const request = function(requestOpt) {
	try {
		requestOpt = requestOpt || {};
		if (!requestOpt.url) {
			requestFail();
			return;
		}
		var token = "";
		try {
			const value = uni.getStorageSync('userInfo');
			if (value) {
				token = value.token;
			}
		} catch (e) {
			token = "";
		}
		requestOpt.data = requestOpt.data || {};
		requestOpt.data['token'] = token;
		requestOpt.method = requestOpt.method || 'POST';
		requestOpt.header = requestOpt.header || {
			// 'content-type': 'application/x-www-form-urlencoded',
			'token': token
		};
		requestOpt.timeout = requestOpt.timeout || 30000;
		requestOpt.responseType = requestOpt.responseType || 'text';
		requestOpt.dataType = requestOpt.dataType || "json";
		requestOpt.sslVerify = requestOpt.sslVerify || true;
		requestOpt.success = requestOpt.success || function(res) {};
		requestOpt.fail = requestOpt.fail || function(res) {};
		requestOpt.complete = requestOpt.complete || function(res) {};
		uni.showLoading({
			title: "加载中"
		});

		uni.request({
			url: requestOpt.url,
			data: requestOpt.data,
			method: requestOpt.method,
			responseType: requestOpt.responseType,
			sslVerify: requestOpt.sslVerify,
			timeout: requestOpt.timeout,
			dataType: requestOpt.dataType,
			header: requestOpt.header,
			success: function(res) {
				requestOpt.success(res);
				if(res.data.code == 401){
					uni.showToast({
						title:"未登录",
						icon:'none'
					})
					uni.removeStorageSync('userInfo');
				}
			},
			fail: function(res) {
				requestOpt.fail(res);
			},
			complete: function(res) {
				uni.hideLoading();
			}
		});
	} catch (e) {
		//TODO handle the exception
		uni.hideLoading();
		uni.showToast({
			icon: "none",
			title: "请求异常"
		})
	}
}

//基准城市，默认北京
const addX = 39.923260746424354;
const addY = 116.33433023052703;


const sendMsg = function(uid,content,pid,type,creater){
	request({
		method: "POST",
		url: urlMap.addQuMessage,
		data: {
			uid:uid,
			pid:pid,
			stat:0,
			type:type,
			content:content,
			creater: creater,
			validFlag: 1
		},
		success: function(res) {
			
		},
		fail: function(res) {
	
		}
	});
}


export default {
	getUserInfo,
	baseUrl,
	request,
	urlMap,
	login,
	sendMsg,
	addX,
	addY
}
