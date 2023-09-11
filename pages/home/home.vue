<template>
	<view>

		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<image style="width: 140px;height: 140px;" src="../../static/images/nuoMi.png"></image>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{user.nickName}}</view>
				<view class="u-font-14 u-tips-color">车牌号:{{user.carNo}}</view>
				<view class="u-font-14 u-tips-color">身份:{{user.type==1?'管理员':'会员'}}</view>
			</view>
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view> -->
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view> -->
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item :iconStyle="{color:'#3f80de'}" @click="toCollect" icon="setting" title="我的收藏">
				</u-cell-item>
				<u-cell-item :iconStyle="{color:'#3f80de'}" @click="showInfo" icon="setting" title="留言">
				</u-cell-item>
				<u-cell-item :iconStyle="{color:'#3f80de'}" @click="clear" icon="man-add-fill" title="清除缓存"></u-cell-item>
				<u-cell-item :iconStyle="{color:'#3f80de'}" @click="showAppInfo" icon="question-circle-fill" title="关于小程序"></u-cell-item>
			</u-cell-group>
		</view>

		<!-- <view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item :iconStyle="{color:'#3f80de'}" icon="setting" title="设置"></u-cell-item>
			</u-cell-group>
		</view> -->

		
		
		<u-select @confirm="selConfirm" v-model="show" :list="deptList"></u-select>
		
		
		<u-popup v-model="showModel" mode="center" border-radius="14" width="600">
			<view class="c-model-view u-p-25">
				<u-field style="height: 25vh;" label="留言" type="textarea" placeholder="请输入留言内容"
					v-model="commentText">
		
				</u-field>
		
				<u-button type="primary" class="u-m-t-50" @click="submitComment"  :ripple="true">发布
					  </u-button>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js"
	export default {
		data() {
			return {
				commentText:"",
				showModel:false,
				pic: 'https://uviewui.com/common/logo.png',
				show: false,
				nick: "未登录",
				userNo: "未绑定",
				deptName: "未绑定",
				user: "",
				admin: "",
				c:[],
				selObj:{},
				student:{
					name:"",
					userNo:"",
					deptFk:"",
					project:"",
					phone:"",
					deptNo:""
				},deptList:[]
			}
		},
		onShow:function() {
			this.user = appRequest.getUserInfo();
			if(!this.user){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
			console.log(this.user.carNo);

		},
		methods: {
			toCollect(){
				uni.navigateTo({
					url:"/pages/app/collect/collect"
				})
			},
			submitComment(){
				if(!this.commentText){
					uni.showToast({
						title:"请输入留言",
						icon:"none"
					});
					return;
				}
				let _this = this;
				appRequest.request({
					method: "POST",
					data: {
						content:this.commentText,
						type:3,
						uid:this.user.uid,
						uname:this.user.uname
					},
					url: appRequest.urlMap.addNmComment,
					success: function(res) {
						if(res.data.code == 200){
							_this.$api.msg("提交成功");
							_this.showModel = false;
						}else{
							_this.$api.msg(res.data.msg);
						}
					},
					fail: function(res) {
						_this.$api.msg("提交失败");
					}
				})
			},
			showInfo(){
				this.showModel = true;
				this.commentText="";
			},
			showAppInfo:function(){
				uni.showModal({
					title:"关于",
					content:"糯米充电，版本号0.012",
					showCancel:false
				})
			},
			clear:function(){
				uni.clearStorageSync();
				uni.showToast({
					title:"已清除",
					icon:"none"
				})
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			
			selConfirm(e) {
				this.selObj = e[0];
				for(let i=0;i<this.deptList.length;i++){
					if(this.deptList[i].value == this.selObj.value){
						this.selObj['no'] = this.deptList[i].no;
						break;
					}
				}
		
			},
			getDeptInfo: function(level) {
				let _this = this;
				appRequest.request({
					method: "GET",
					url: appRequest.getDeptData,
					success: function(res) {
						_this.deptList = [];
						res.data.data.map(function(item, index, arr) {
							if(level == item.level){
								_this.deptList.push({
									value: item.id,
									label: item.name,
									no:item.deptNo
								})
							}
						});
					},
					fail: function(res) {
			
					}
				})
			},
			submitCheck(){
				let _this = this;
				_this.student.deptFk = _this.selObj.value;
				_this.student.deptNo = _this.selObj.no;
				console.log(JSON.stringify(_this.student))
				if(!_this.student.name || !_this.student.userNo || !_this.student.deptFk || !_this.student.project ){
					uni.showToast({
						title:"请填写完整",
						icon:"none"
					})
					return;
				}
				
				try{
					let year = Number((new Date().getFullYear() + "").slice(2,4));
					let usrYear = Number((_this.student.userNo+"").slice(0,2));
					let dept = (_this.student.userNo+"").slice(2,4);
					if(year - usrYear > 4 ||  year - usrYear < 0 || dept != _this.selObj.no || (_this.student.userNo+"").length!=10){
						uni.showToast({
							title:"学号错误",
							icon:"error"
						})
						return;
					}
				}catch(e){
					//TODO handle the exception
					uni.showToast({
						title:"验证错误",
						icon:"error"
					})
					return;
				}
				
			},
			checkStudent() {
				let _this = this;
				// if (this.userInfo.token) {
				// 	uni.showToast({
				// 		title: '已完成学生认证,无需重复认证',
				// 		icon: "none"
				// 	})
				// 	return;
				// }
				_this.showModel = true;
				_this.getDeptInfo(1);
			}
		}
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
		background-color: rgba(144, 215, 236, 0.05);

	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
</style>
