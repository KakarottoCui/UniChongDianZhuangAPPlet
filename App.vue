<script>

	export default {
		globalData: {
			feedbacktype:{},
			kefuphone:"",
			name:"",
			rechargeoption:"",
			wxaadv:{}, 
			spid: 0,
			code: 0,
			isLogin: false,
			userInfo: {},
			MyMenus: [],
			globalData: false,
			isIframe: false,
			tabbarShow: true,
			windowHeight: 0,
			locale: '',
			statusBarHeight: 0,
			navHeight: 0, 
			navigationBarHeight: 0, 
			socketObj: ""
		},
		onLaunch() {
			this.globalData.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			// #ifdef MP-WEIXIN
			const custom = wx.getMenuButtonBoundingClientRect()
			this.globalData.navigationBarHeight = custom.height + (custom.top - this.globalData.statusBarHeight) * 2
			this.globalData.navHeight = this.globalData.navigationBarHeight + this.globalData.statusBarHeight
			// #endif





			// #ifdef MP
			const updateManager = wx.getUpdateManager();
			const startParamObj = wx.getEnterOptionsSync();
			if (wx.canIUse('getUpdateManager') && startParamObj.scene != 1154) {
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					if (res.hasUpdate) {
						updateManager.onUpdateFailed(function() {
							return that.Tips({
								title: '新版本下载失败'
							});
						});
						updateManager.onUpdateReady(function() {
							wx.showModal({
								title: '更新提示',
								content: '新版本已经下载好，是否重启当前应用？',
								success(res) {
									if (res.confirm) {
										updateManager.applyUpdate()
									}
								}
							})
						})
						updateManager.onUpdateFailed(function() {
							wx.showModal({
								title: '发现新版本',
								content: '请删除当前小程序，重启搜索打开...',
							})
						})
					}
				})
			}
			// #endif
		},
		onShow: function() {

	
		},
		onHide: function() {

		},
		methods: {
		
		}
	}
</script>

<style lang="scss">
	html,body{
		width: 100%;
		height: 100%;
	}
	/* #ifndef APP-PLUS */
	@import "static/colorui/main.css";
	// @import "static/colorui/icon.css";
	@import "static/gaui/style/app.scss";
	@import 'static/iconfont/iconfont.css';
	@import "uview-ui/index.scss";
	@import "static/css/common.css";
	@import "static/css/style.scss";
	/* #endif */
</style>
