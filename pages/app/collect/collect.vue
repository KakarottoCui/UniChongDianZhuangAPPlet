<template>
	<view>
		<view  class="map-box" v-for="(item,index) in list">
			<view class="bootom-list">
				<view class="list-block">
					<image class="map-item-img"
						src="https://cqrs.itux.cn/assets/addons/gaga/img/app/9.png" mode="">
					</image>
					<view class="item-block" >
						<view class="item-header">
							<view class="item-header-left">
								<image style="width: 50rpx;height: 50rpx;" class="logo" src="../../../static/images/nuoMi.png" mode=""></image>
								<view class="cong-name">{{ item.station.title }}</view>
							</view>
						</view>
						<view class="item-type">
							<view class="type" >
								地址：<text style="color: cornflowerblue;">{{ item.station.area }}</text>
							</view>
						</view>
						<view class="item-type">
							<view class="type">
								{{ item.station.memo }}
							</view>
						</view>
						
						<view class="item-price">
							<view class="price">
								<view class="unit-money inline">￥</view>
								<view class="inline">{{item.station.num}}</view>
								<view class="unit inline"> 元/度</view>
							</view>
						</view>
					</view>
					<view class="navigation" @click="goGaChargeDetail(item.station)">
						<image class="gps-icon" src="../../../static/images/gps.png" mode=""></image>
						<view>详情</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js";
	export default {
		data() {
			return {
				user:{},
				list:[]
			}
		},onLoad:function(){
			this.user = appRequest.getUserInfo();
			this.getCollect();
		},
		
		methods: {
			goGaChargeDetail(item){
				uni.navigateTo({
					url:"/pages/app/chargeInfo/chargeInfo?id="+item.id
				})
			},
			getCollect(){
				let _this = this;
				appRequest.request({
					method: "POST",
					data: {
						validFlag:1,
						uid:this.user.uid
					},
					url: appRequest.urlMap.findNmCollectList,
					success: function(res) {
						if(res.data.code==200){
							_this.list = res.data.data
						}
						
					},
					fail: function(res) {
				
					}
				})
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
		height: 350rpx;
	
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
