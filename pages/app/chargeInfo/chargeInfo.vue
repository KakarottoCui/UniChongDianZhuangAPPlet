<template>
	<view>
		<view class="page-body">
			<view class="content station"
			style="backgroundImage:url(https://cqrs.itux.cn/assets/addons/gaga/img/app/19.png">
				<view class="common-header">
					<view class="">
						{{station.title}}
					</view>
				</view>
				<view class="personal">
					<view class="personal-kind">
						<text class="kind-title" style="width: 400rpx;">{{station.memo}}</text>
					</view>
				</view>
				<view class="personal">
					<view class="personal-kind">
						<text class="kind-title">充电桩：{{stationItem.length}}个</text>
					</view>
				</view>
			</view>


			<view class="content">
				<view class="common-header">
					<view class="">
						费用明细
					</view>
				</view>
				<view class="unit-block">
					<view class="item-price">
						<text class="unit-title">电费：</text>
						<text class="unit-money">￥</text>
						{{ station.num|| '' }}
						<text class="unit">元/度</text>
					</view>
					<view class="personal">
						<view class="personal-kind">
							<text class="kind-title">功率：</text>
						</view>
						<view class="personal-kind">
							<!-- <text class="kind-title color2">0.5000元/度</text> -->
							<text class="kind-title color2">{{ station.power}}KW</text>
						</view>
					</view>
					
				</view>

				<view class="desc">
					<text>{{station.sname}}</text>
					<text class="u-m-l-50" @click="addCollect">{{collect?'取消收藏':'点击收藏'}}</text>
				</view>
			</view>

			<view class="content common-mtb25" v-for="(item,index) in stationItem" :key="index">
				<view class="common-header">
					<view class="">
						{{item.title}}-充电桩
					</view>
				</view>
				<view class="car-no-title" :style="{color: item.state==0 ?'forestgreen':'red'}">
					{{item.state==1?'使用中':'空闲'}}
				</view>
				<view class="car-no">
					<text>{{ item.memo	 }}</text>
				</view>
				<view class="line">

				</view>

				<view class="navigation" v-if="item.state==0" @click="entering(item)">
					<text>下单使用</text>
				</view>
			</view>
			<view style="height: 140rpx;">
			</view>
			
		</view>
		<car-number-input :show="show" @closePop="closePop" @numberInputResult="numberInputResult"
			:defaultStr="defaultNum"></car-number-input>
			
	</view>
</template>

<script>
	import iponebottom from '@/components/iphone-bottom.vue'
	import carNumberInput from '@/components/car-number-input/car-number-input.vue'

	import adver from '@/components/adver';
	import siteInfo from '@/siteinfo.js'
	import appRequest from "@/common/appRequestUrl.js";
	export default {
		components: {
			iponebottom,
			carNumberInput,
			adver
		},
		data() {
			return {
				collect:false,
				siteInfo,
				bgco: '#ffffff',
				defaultNum: '',
				show: false,
				loop: null,
				device_no: null,
				station: {},
				device: {},
				loopInfo: {},
				policy: {},
				pricetime: "",
				energy_charge: 0,
				service_charge: 0,
				totalMOney: 0,
				is_can_start: true,
				station_detail: {},
				userInfo: {},
				carno: '未绑定车牌',
				canUse: true,
				user:{},
				id:0,
				station:{},
				stationItem:[]
			};
		},
		onLoad(opt) {
			this.user = appRequest.getUserInfo();
			if(!this.user){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
			this.id = opt.id;
			this.getStationInfo();
			this.getItem();
			this.getCollect();
			
		},
		methods: {
			addCollect(){
				if(this.collect){
					let _this = this;
					appRequest.request({
						method: "POST",
						data: {
							validFlag:0,
							id:this.collect.id
						},
						url: appRequest.urlMap.editNmCollect,
						success: function(res) {
							_this.getCollect();
						},
						fail: function(res) {
					
						}
					})
				}else{
					let _this = this;
					appRequest.request({
						method: "POST",
						data: {
							validFlag:1,
							aid:this.id,
							uid:this.user.uid
						},
						url: appRequest.urlMap.addNmCollect,
						success: function(res) {
							if(res.data.code == 200){
								_this.getCollect();
							}
						},
						fail: function(res) {
					
						}
					})
				}
				
			},
			getCollect(){
				let _this = this;
				appRequest.request({
					method: "POST",
					data: {
						validFlag:1,
						aid:this.id,
						uid:this.user.uid
					},
					url: appRequest.urlMap.findNmCollectList,
					success: function(res) {
						if(res.data.code == 200){
							_this.collect = res.data.data.length > 0 ?res.data.data[0]:false;
						}
					},
					fail: function(res) {
				
					}
				})
			},
			getStationInfo(){
				let _this = this;
				appRequest.request({
					method: "POST",
					data: {
						validFlag:1,
						id:this.id
					},
					url: appRequest.urlMap.findNmStation,
					success: function(res) {
						let su = false;
						if(res.data.code == 200){
							_this.station = res.data.data;
						}
					},
					fail: function(res) {
				
					}
				})
			},
			getItem(){
				let _this = this;
				appRequest.request({
					method: "POST",
					data: {
						validFlag:1,
						sid:this.id
					},
					url: appRequest.urlMap.findNmStationItemList,
					success: function(res) {
						let su = false;
						if(res.data.code == 200){
							_this.stationItem = res.data.data;
						}
					},
					fail: function(res) {
				
					}
				})
			},



			doStart() {
				uni.showModal({
					title: '提示',
					content: '开启成功',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('成功')
							wx.redirectTo({
								url: '/pages/user/charge/chargelist'
							})
						} else {}
					}
				})
			},
			goTo: function() {
				let id = this.station.id;
				console.log(id)
				wx.navigateTo({
					url: `/pages/user/wallet/topup?station_id=${id}`,
				})
			},
			closePop(flag) {
				this.show = flag
			},
			numberInputResult(e, flag) {
				if (flag) {
					this.carno = e

					mineApi.saveCar({
						carno: e
					}, 1).then(res => {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					})
				}

			},
			entering(item) {
				let _this = this;
				uni.showModal({
					title:"下单确认",
					content:"确认使用"+item.title+"-充电桩充电？下单人："+this.user.nickName+"，车牌号："+this.user.carNo+"。"
					,success:function(res){
						if(res.confirm){
							_this.addOrder(item);
						}
					}
				})
			},addOrder:function(item){
				var data = {
					title:this.station.title,
					sid:this.station.id,
					zid:item.id,
					state:0,
					price:0,
					pow:this.station.power,
					uid:this.user.uid,
					carNo:this.user.carNo,
					star:0
				}
				let _this = this;
				appRequest.request({
					method: "POST",
					data: data,
					url: appRequest.urlMap.addNmChargeOrder,
					success: function(res) {
						if(res.data.code == 200){
							uni.showModal({
								title:"信息",
								content:"下单成功",
								showCancel:false,
								success:function(res){
									_this.getItem();
								}
							})
						}else{
							_this.$api.msg(res.data.msg);
						}
					},
					fail: function(res) {
						_this.$api.msg("提交失败");
					}
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #EFF1F5;
	}
</style>
<style lang="scss" scoped>
	.detail-bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 418rpx;

		image {
			width: 100%;
			height: 100%;
		}

	}

	.page-body {
		position: relative;
		margin-top: 17rpx;

		.unit-block {
			display: flex;
			justify-content: space-between;
		}

		.item-price {
			font-size: 49rpx;
			font-family: PingFang;
			font-weight: 800;
			color: #FF3013;

			.unit-title {
				font-size: 20rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #5F646A;
			}

			.unit-money {
				font-size: 28rpx;
				font-family: PingFang;
				font-weight: 500;
			}

			.unit {
				font-size: 20rpx;
				font-family: PingFang;
				font-weight: 500;
				color: #5F646A;
			}
		}

		.mt0 {
			margin-top: 0;
		}

		.content {
			position: relative;
			margin: 0 24rpx;
			background: #FFFFFF;
			border-radius: 7rpx;
			overflow: hidden;
			padding-left: 30rpx;
			padding-right: 36rpx;

			.category {
				margin-top: 30rpx;

				.category-text-top {
					font-size: 32rpx;
					font-family: PingFangSC;
					font-weight: 500;
					color: #363646;
				}

				.category-text {
					font-size: 24rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #363646;
				}
			}

			.time {
				display: inline-block;
				padding: 0 8rpx;
				margin: 14rpx 0;
				text-align: center;
				background: #F0FCFF;
				border: 1rpx solid #00D2A5;
				font-size: 19rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #0EB866;
				border-radius: 7rpx;
			}

			.desc {
				margin-bottom: 24rpx;
				margin-top: 8rpx;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}

			.personal {
				margin: 10rpx 0;
				display: flex;
				justify-content: space-between;

				.personal-kind {
					position: relative;
					height: 40rpx;
					display: flex;
					align-items: center;
					font-size: 24rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #5F646A;

				}
			}



			.car-no-title,
			.pay-title {

				font-size: 24rpx;
				font-family: PingFangSC;
				font-weight: 400;
				color: #363646;
			}

			.car-no-title {
				margin: 30rpx 0 25rpx 0;
			}

			.pay-title {
				margin: 32rpx 0;
			}

			.car-no {
				margin-bottom: 30rpx;
				font-size: 32rpx;
				font-family: PingFangSC;
				font-weight: 500;
				color: #363646;
			}

			.line {
				height: 2rpx;
				background: #EFF1F5;
			}

			.my-price {
				font-size: 27rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #363646;
				margin-bottom: 22rpx;
			}

			.no-price {
				font-size: 24rpx;
				font-family: PingFang SC;
				color: #999999;
				margin-bottom: 22rpx;
			}


			.navigation {
				position: absolute;
				right: 40rpx;
				top: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 167rpx;
				height: 72rpx;
				border: 2rpx solid #20398A;
				border-radius: 36rpx;
				font-size: 27rpx;
				font-family: PingFang;
				font-weight: 500;
				color: #20398A;
			}


		}

		.common-mtb25 {
			margin: 25rpx 24rpx;
		}

		.station {
			margin: 0 24rpx;
			padding-bottom: 24rpx;
			background-repeat: no-repeat;
			background-position: center;


			background-size: 100% 100%;
		}

		.confirm-buy {
			position: fixed;
			bottom: 0;
			width: 100%;

			.buy-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 112rpx;
				background: #FFFFFF;
				opacity: 1;
				padding: 0 60rpx;

				.buy {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FE0606;
				}

				.buy-money {
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 56rpx;
					color: #FE0606;
				}

				.now-buy {
					width: 263rpx;
					height: 90rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					background: #20398A;
					opacity: 1;
					border-radius: 50rpx;
					line-height: 90rpx;
					text-align: center;
				}

				.no-use {
					background-color: #ccc;
				}
			}
		}

	}
</style>