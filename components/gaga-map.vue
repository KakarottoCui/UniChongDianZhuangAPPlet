<template>
	<view>
		<view class="map-box" >
			
			<view class="bootom-list">
				<view class="list-block">

					<image class="map-item-img"
						src="https://cqrs.itux.cn/assets/addons/gaga/img/app/9.png" mode="">
					</image>
					<view class="item-block" @click="goGaChargeDetail(nearObj)">
						<view class="item-header">
							<view class="item-header-left">
								<image class="logo" src="../static/images/logo.png" mode=""></image>
								<view class="cong-name">{{ nearObj.name }}</view>
							</view>
							<view class="item-header-right">
								<image class="address-icon" src="../static/images/address.png" mode="">
								</image>
								<view class="distance">{{ nearObj.distance }}km</view>
							</view>
						</view>
						<view class="item-type">
							<view class="type" v-for="(title,index) in types" :key="index">
								{{ title }}
								<view v-show="(index>0&&index!=2)" class="line"></view>
							</view>
						</view>
						<view class="item-num">
							<image class="all-icon" src="../static/images/all.png" mode=""></image>
							<view class="all-num">{{ nearObj.canuse_loopnum }}
								<view class="use"> /{{ nearObj.all_loopnum }}</view>
							</view>

						</view>
						<view class="item-price">
							<view class="price">
								<view class="unit-money inline">￥</view>
								<view class="inline">{{nearObj.feerate}}</view>
								<view class="unit inline"> /度</view>
							</view>
						</view>
					</view>
					<!-- <view class="navigation" @click="goAddress(nearObj.latitude,nearObj.longitude,nearObj.address)">
						<image class="gps-icon" src="../static/images/gps.png" mode=""></image>
						<view>导航</view>
					</view> -->
				</view>
				<iponebottom :bgco="bgco"></iponebottom>
			</view>
		</view>
	</view>
</template>

<script>
	import iponebottom from '@/components/iphone-bottom.vue'
	import siteInfo from '@/siteinfo.js'
	export default {

		components: {
			iponebottom,
		},
		data() {
			return {
				siteInfo,
				types: ["即插即充", "安全稳定", "快充"],
				height: 0,
				paddingTop: 0,
				topHeight: 0,
				mapHeight: 0,
				bgco: 'transparent',
				dealMarkers: []
			}
		},
		mounted() {


			// #ifdef MP-WEIXIN
			this.topHeight = getApp().globalData.statusBarHeight + 48 + 46 + 'px'
			this.mapHeight = uni.getSystemInfoSync().windowHeight - getApp().globalData.statusBarHeight - 48 - 46 + 'px'
			// #endif
			// #ifdef H5
			this.topHeight = 94 + 'px'
			this.mapHeight = uni.getSystemInfoSync().windowHeight - 94 + 'px'
			// #endif
		},
		props: {
			defaultmap: {
				type: Boolean,
				default: true
			},
			nearObj: {
				type: Object,
				default: ()=> {
					return {
						name:"充电站",
						distance:"500",
						canuse_loopnum:10,
						all_loopnum:20,
						feerate:10
					}
					
				}
			}
			
		},
		watch: {
			// markers(newval, olval) {
			// 	if (newval.length > 0) {
			// 		for (var i = 0; i < newval.length; i++) {
			// 			newval[i].width = 25;
			// 			newval[i].height = 28;
			// 			newval[i].rotate = 0;
			// 			newval[i].alpha = 0.5;
			// 			newval[i].iconPath = '../static/images/map-char.png';
			// 			newval[i].callout = { //自定义标记点上方的气泡窗口 点击有效
			// 				content: newval[i].name, //文本
			// 				color: '#ffffff', //文字颜色
			// 				fontSize: 14, //文本大小
			// 				borderRadius: 5, //边框圆角
			// 				 borderWidth:'5',
			// 				bgColor: '#00c16f', //背景颜色
			// 				display: 'ALWAYS', //常显
			// 			}
			// 		}
			// 		this.dealMarkers = newval;
			// 	}

			// }
		},
		methods: {
			goAddress(lat, lng, address) {
				this.$emit("goAddress", lat, lng, address)
			},
			goGaChargeDetail(item) {
				this.$emit("goGaChargeDetail", item)
			},
			regionchange(e) {
				this.$emit('regionchange', e)
			},
			navigation(e) {
				this.$emit('navigation', e)
			},
			relativeposi() {
				// uni.createMapContext("map", this).moveToLocation({
				// 	latitude: this.latitude,
				// 	longitude: this.longitude,
				// });
			},
			markertaptap(e) {
				this.$emit('markertaptap', e)
			},
			tapMap(e) {
				this.$emit('tapMap', e)
			},
			callouttap(e){
				this.$emit('callouttap', e)
			}
		},
	}
</script>

<style scoped lang="scss">
	.map-box {
		display: none;
	}

	.map-box.show {
		display: block;
	}

	.positFemr {
		position: fixed;
		width: 100%;
		/* height: 100vh; */
		position: fixed;
		top: 0;
		left: 0;
	}

	.bootom-list {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 96%;
		bottom: 116rpx;
	}

	.list-block {
		width: 100%;
		height: 310rpx;

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
