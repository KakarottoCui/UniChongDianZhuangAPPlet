<template>
	<view style="padding: 20rpx;">
		<view class="map-box" v-for="(item,index) in orderList">
			<view class="bootom-list">
				<view class="list-block">
					<image class="map-item-img"
						src="https://cqrs.itux.cn/assets/addons/gaga/img/app/9.png" mode="">
					</image>
					<view class="item-block" >
						<view class="item-header">
							<view class="item-header-left">
								<image style="width: 50rpx;height: 50rpx;" class="logo" src="../../static/images/nuoMi.png" mode=""></image>
								<view class="cong-name">{{ item.title }}</view>
							</view>
							<view class="item-header-right">
								<view class="distance">单号:{{ item.id }}</view>
							</view>
						</view>
						<view class="item-type">
							<view class="type" >
								地址：<text style="color: cornflowerblue;">{{ item.station.area }}</text>
							</view>
						</view>
						<view class="item-type">
							<view class="type">
								{{ item.stationItem.title +"-充电桩" }}
							</view>
							<view class="type u-p-l-20" :style="{color: item.state==0 ?'forestgreen':'red'}">
								{{ item.state == 0 ?'充电中':'已完成'}}
							</view>
							<view class="type u-p-l-20" style="color:goldenrod;" v-if="item.state==2">
								<text class="u-tips-color"></text>{{ item.star}}星评价
							</view>
						</view>
						
						<view class="item-price" v-if="item.state!=0">
							
							<view class="price">
								<view class="unit-money inline u-tips-color" >总计：￥</view>
								<view class="inline">{{item.price}}</view>
								<view class="unit inline"> 元</view>
							</view>
						</view>
						<view class="item-header-right">
							<view class="distance u-tips-color">{{ item.createTime +"  "}} 开始充电</view>
						</view>
						<view class="item-header-right"  v-if="item.state!=0">
							<view class="distance u-tips-color">{{ item.endTime+" " }} 结束充电</view>
						</view>
						
					</view>
					
					<view  v-if="item.state==0" class="navigation" @click="endOrder(item)">
						<view>结束充电</view>
					</view>
					<view v-if="item.state==1" class="navigation" @click="change(item)">
						<view>评价</view>
					</view>
					
				</view>
			</view>
		</view>
		
		
		<u-select @confirm="confirm" v-model="show" :list="list"></u-select>
			
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
				list:[{
					label:"1星",
					value:1
				},{
					label:"2星",
					value:3
				},{
					label:"3星",
					value:3
				},{
					label:"4星",
					value:4
				},{
					label:"5星",
					value:5
				}
					
				],
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
				orderList:[],
				sel:""
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
			
		},onShow:function(){
			this.getData();
		},
		methods: {
			confirm(e) {
				var copyItem = JSON.parse(JSON.stringify(this.sel));
				copyItem.star = e[0].value;
				copyItem.state = 2;
				this.editOrder(copyItem);
			},
			getData(){
				let _this = this;
				appRequest.request({
					method: "POST",
					data: {
						validFlag:1,
						uid:this.user.id
					},
					url: appRequest.urlMap.findNmChargeOrderList,
					success: function(res) {
						let su = false;
						if(res.data.code == 200){
							_this.orderList = res.data.data;
						}
					},
					fail: function(res) {
				
					}
				})
			},
			endOrder(item){
				var _this = this;
				var copyItem = JSON.parse(JSON.stringify(item));
				copyItem.state = 1;
				var range = new Date().getTime() - new Date(copyItem.createTime).getTime();
				var price = ((range/(1000*60*60)) * copyItem.station.num * copyItem.station.power).toFixed(2);
				copyItem.price = price;
				uni.showModal({
					title:"信息",
					content:"是否结束充电？充电时长"+(range/(1000*60*60)).toFixed(2)+"小时，充电功率"+item.station.power+"千瓦，总价"+price+"元",
					confirmText:"确认支付",
					success:function(res){
						if(res.confirm){
							_this.editOrder(copyItem);
						}
					}
				})
			},
			change(item){
				this.show = true;
				this.sel = item;
			},
			editOrder(item){
				let _this = this;
				appRequest.request({
					method: "POST",
					data: item,
					url: appRequest.urlMap.editNmChargeOrder,
					success: function(res) {
						let su = false;
						if(res.data.code == 200){
							_this.getData();
						}else{
							_this.$api.msg("提交失败");
						}
					},
					fail: function(res) {
						_this.$api.msg("提交失败");
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
			entering() {

				this.show = true
			}
		}
	}
</script>
<style lang="scss">
	.map-box {
		display: block;
		margin:20rpx;
		box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
		border-radius: 10rpx;
	}
	
	.list-block {
		width: 100%;
		height: 360rpx;
	
		position: relative;
	
		.map-item-img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	
		.item-block {
			position: relative;
			z-index: 2;
			overflow: hidden;
			padding: 0 40rpx;
			height: 100%;
	
	
	
			.item-header {
				margin-top: 50rpx;
	
				display: flex;
				justify-content: space-between;
				height: 40rpx;
	
				.item-header-left {
					display: flex;
					align-items: center;
					height: 100%;
	
					.cong-name {
						width: 350rpx;
						font-size: 34rpx;
						font-family: PingFang;
						font-weight: bold;
						color: #1F2022;
						overflow: hidden; //超出的文本隐藏
						text-overflow: ellipsis; //溢出用省略号显示
						white-space: nowrap; // 默认不换行；
	
					}
	
					.logo {
						margin-right: 18rpx;
						width: 40rpx;
						height: 100%;
					}
				}
	
				.item-header-right {
					height: 100%;
					display: flex;
					align-items: center;
					font-size: 23rpx;
					font-family: PingFang;
					font-weight: bold;
					color: #1F2022;
	
					.address-icon {
						margin-right: 10rpx;
						width: 17rpx;
						height: 21rpx;
					}
				}
			}
	
			.item-type {
				display: flex;
				margin-top: 20rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #5F646A;
	
				.line {
					display: inline-block;
					margin: 0 20rpx;
					height: 16rpx;
					width: 1rpx;
					height: 16rpx;
					background: #D2D2D2;
				}
			}
	
			.item-num {
				height: 40rpx;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
	
				.all-icon {
					width: 38rpx;
					height: 38rpx;
					margin-right: 16rpx;
				}
	
				.all-num {
					display: flex;
					align-items: center;
					font-size: 27rpx;
					font-family: PingFang;
					font-weight: bold;
					color: #000000;
	
					.use {
						color: #5F646A;
						font-size: 20rpx;
					}
				}
			}
	
			.item-price {
				margin-top: 20rpx;
				font-size: 49rpx;
				font-family: PingFang;
				font-weight: 800;
				color: #FF3013;
	
				.unit-money {
					font-size: 28rpx;
					font-family: PingFang;
					font-weight: 500;
				}
	
				.inline {
					display: inline;
				}
	
				.unit {
					font-size: 20rpx;
					font-family: PingFang;
					font-weight: 500;
					color: #5F646A;
				}
			}
		}
	
		.navigation {
			position: absolute;
			z-index: 4;
			right: 40rpx;
			bottom: 40rpx;
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
	
			.gps-icon {
				margin-right: 10rpx;
				width: 34rpx;
				height: 34rpx;
			}
		}
	
	}
</style>