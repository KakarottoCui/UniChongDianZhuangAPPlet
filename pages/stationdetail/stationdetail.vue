<template>
	<view>
		<u-navbar :background="{backgroundColor: 'transparent',}" :border-bottom="false"></u-navbar>
		<view class="detail-bg">
			<image src="https://cqrs.itux.cn/assets/addons/gaga/img/app/15.png" mode=""></image>
		</view>
		<view class="page-body" :style="{paddingTop:paddTop}">

			<view class="address" @click="goAddress">
				<view class="address-header">
					金城时代广成
				</view>
				<view class="address-title">
					充电桩编号：<text>1234567890</text>
				</view>
				<view class="address-detail">
					<image class="address-icon" src="../../static/images/address.png" mode=""></image>
					<view class="address-name">

					</view>
					<view class="navigation" @click="goAddress()">
						<image class="gps-icon" src="../../static/images/gps.png" mode=""></image>
						<text>导航</text>
					</view>
				</view>
			</view>


			<view class="content">
				<view class="common-header">
					<view class="">
						姚砦路与黄河路交叉口东北角
					</view>
					<view class="common-detial">
						<text>价格详情</text>
						<image class="common-right-icon" src="../../static/images/right-icon.png" mode=""></image>
					</view>
				</view>
				<view class="time">
					当前计费时段
				</view>
				<view class="item-price"><text class="unit-money">￥</text>1.6 <text class="unit"> /度</text>
				</view>
				<view class="desc">
					<text>充电期间免费停车</text>
				</view>
			</view>


			<view class="content device-bg-img">
				<view class="common-header" @click="deviceDetail">
					<view class="">
						设备信息
					</view>
					<view class="common-detial">
						<text>查看详情</text>
						<image class="common-right-icon" src="../../static/images/right-icon.png" mode=""></image>
					</view>
				</view>
				<view class="category">
					<view class="category-flex">
						<view class="category-text-top">
							10
						</view>
						<view class="category-text">
							快充空闲
						</view>
					</view>
					<view class="category-flex">
						<view class="category-text-top">
							15
						</view>
						<view class="category-text">
							总枪数
						</view>
					</view>
					<view class="category-flex">
						<view class="category-text-top">
							0
						</view>
						<view class="category-text">
							即将充满
						</view>
					</view>
				</view>



			</view>



			<view class="content">
				<view class="personal">
					<view class="personal-kind">
						<text class="kind-title">客服电话</text>
					</view>
					<view class="personal-kind">
						<text class="kind-title color1" @click="freeTell(stationDetail.respon_phone)">13103895694</text>
					</view>
				</view>
				<view class="personal">
					<view class="personal-kind">
						<text class="kind-title">账户余额</text>
					</view>
					<view class="personal-kind">
						<text class="kind-title color2">50</text>
					</view>
				</view>
			</view>


			<view style="height: 140rpx;">

			</view>
			<view class="confirm-buy">
				<view class="buy-bottom">
					<text class="item-price mt0"><text class="unit-money">￥</text>8 <text class="unit"> /度</text>
					</text>
					<view class="now-buy" @click="goScanQrcode">
						扫码充电
					</view>
				</view>
				<iponebottom :bgco="bgco"></iponebottom>
			</view>


		</view>


		<device-pop @startCharge="startCharge" :devices="devices" :show="show" @closePop="closePop"></device-pop>

	</view>
</template>

<script>
	import iponebottom from '@/components/iphone-bottom.vue'
	import DevicePop from './components/devicepop.vue'
	import {
		systemInfo
	} from "@/utils/mixin.js"
	import {
		openLocation
	} from '@/utils/location.js'
	import siteInfo from '@/siteinfo.js'
	export default {
		components: {
			iponebottom,
			DevicePop
		},
		mixins: [systemInfo],
		data() {
			return {
				siteInfo,
				show: false,
				paddTop: 0,
				bgco: '#ffffff',
				stationDetail: {},
				id: null,
				latitude: null,
				longitude: null,
				devices: [],
				price_lv_now: {},
				userInfo: {}
			};
		},
		onLoad(options) {
			this.id = options.id
			this.latitude = options.latitude
			this.longitude = options.longitude
		},
		onShow() {},
		mounted() {
			this.getSystemInfo()
			// #ifdef MP-WEIXIN
			this.paddTop = 418 - this.statusBarHeight * 2 - 96 + 'rpx'
			// #endif
			// #ifdef H5
			this.paddTop = 418 - 88 + 'rpx'
			// #endif

		},
		methods: {
			goScanQrcode() {
				uni.scanCode({
					success: (res) => {
						console.log('res', res)
						const q = decodeURIComponent(res.result.replace("pages/startcharge/startcharge?q=",
							""))
						console.log('q', q)
						var l = q.replace(siteinfo.host + "/UserScan/Charge?", "", q);
						var arr = l.split('&')
						var device_no = arr[0].split('=')[1];
						var loop = arr[1].split('=')[1];
						var path = "/pages/startcharge/startcharge?device_no=" + device_no + "&loop=" +
							loop;
						wx.navigateTo({
							url: path,
						})
						// setTimeout(() => {
						// 	this.tabID = 0;
						// 	this.loadOn.home = true;
						// })

					},
					fail: (res) => {
						uni.showToast({
							title: '扫码失败',
							icon: 'none'
						})
						this.loadOn.home = true;
						this.tabID = 0;
					}
				})
			},


			startCharge(device_no, loop, device_state, status) {
				var path = "/pages/startcharge/startcharge?device_no"

				wx.redirectTo({
					url: path,
				})
				this.show = false;

			},
			closePop(flag) {
				this.show = flag
			},
			deviceDetail() {
				this.show = !this.show;
			},
			goPriceDetail() {

			},
			freeTell(phone) {
				wx.makePhoneCall({
					phoneNumber: phone, //仅为示例，并非真实的电话号码
					success: function() {
						console.log("拨打电话成功！")
					},
					fail: function() {
						console.log("拨打电话失败！")
					}
				})
			},
			goAddress(lat, lng, address) {
				openLocation(lat, lng, address)
			},
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

		.address {
			margin: 0 24rpx;
			margin-top: 22rpx;
			background: #FFFFFF;
			border-radius: 7rpx;
			overflow: hidden;
			padding-left: 30rpx;

			.address-header {
				margin: 39rpx 0 23rpx 0;
				height: 33rpx;
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #1F2022;
				line-height: 37rpx;
			}

			.address-title {
				height: 23rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #5F646A;
				line-height: 47rpx;
			}

			.address-detail {
				position: relative;
				margin-top: 44rpx;
				margin-bottom: 43rpx;
				display: flex;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #5F646A;

				.address-name {
					margin-left: 30rpx;
					width: 62%;
				}

				.address-icon {
					position: absolute;
					top: 4rpx;
					left: 0;
					width: 18rpx;
					height: 22rpx;
				}

				.navigation {
					position: absolute;
					right: 40rpx;
					bottom: 0rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 117rpx;
					height: 55rpx;
					border: 2rpx solid #20398A;
					border-radius: 36rpx;
					font-size: 27rpx;
					font-family: PingFang;
					font-weight: 500;
					color: #20398A;

					.gps-icon {
						margin-right: 10rpx;
						width: 22rpx;
						height: 22rpx;
					}
				}
			}
		}

		.content {
			margin: 0 24rpx;
			margin-top: 22rpx;
			background: #FFFFFF;
			border-radius: 7rpx;
			overflow: hidden;
			padding-left: 30rpx;
			padding-right: 36rpx;



			.time {
				display: inline-block;
				padding: 0 8rpx;
				margin: 19rpx 0 0 0;

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





			.bg-img {}



			.personal {
				margin: 0 auto;
				display: flex;
				justify-content: space-between;

				.personal-kind {
					position: relative;
					height: 70rpx;
					padding: 12px 0;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;

					.kind-title {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
					}

					.color1 {
						color: #20398A;
					}

					.color2 {
						color: #363646;
					}
				}
			}


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
			}
		}



	}
</style>
