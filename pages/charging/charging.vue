<template>
	<view>
		<u-navbar title="充电中..." :border-bottom="false"></u-navbar>
		<view class="page-body">
			<view class="charging-bg" style="backgroundImage:url(https://cqrs.itux.cn/assets/addons/gaga/img/app/13png">
				<view class="charging-title">
					<view class="charging-block">
						<image class="cong" src="../../static/images/san.png" mode=""></image>
						充电中...
					</view>

				</view>
				<view class="charging-time">
					已充电2小时
				</view>
				<view class="charging-car"
					style="backgroundImage:url(https://cqrs.itux.cn/assets/addons/gaga/img/app/11.png">
					<view class="charging-percent"
						style="backgroundImage:url(https://cqrs.itux.cn/assets/addons/gaga/img/app/12.png">
						<view class="">
							<image src="../../static/images/san.png" style="width: 34rpx;height: 48rpx;" mode="">
							</image>
						</view>
						<view class="charging-percent-num">
							50%
						</view>
					</view>
				</view>


				<view class="charg-device">
					<view class="">
						容新指头电子电气产...
					</view>
					<view class="charg-device-dec">
						<text>充电桩：02</text>
						<text>编码：1234567890</text>
					</view>
				</view>
				<view class="charg-device">
					<view class="" style="height: 20rpx;">

					</view>

					<view class="category">
						<view class="category-flex">
							<view class="category-text-top">
								12/24v
							</view>
							<view class="category-text">
								已充
							</view>
						</view>
						<view class="category-flex">
							<view class="category-text-top">
								6.8kw
							</view>
							<view class="category-text">
								功率
							</view>
						</view>
						<view class="category-flex">
							<view class="category-text-top">
								1时20分
							</view>
							<view class="category-text">
								辅助电源
							</view>
						</view>
					</view>
					<view class="category">
						<view class="category-flex">
							<view class="category-text-top">
								44.20
							</view>
							<view class="category-text">
								电流
							</view>
						</view>
						<view class="category-flex">
							<view class="category-text-top">
								36.90
							</view>
							<view class="category-text">
								充电金额(元)
							</view>
						</view>
						<view class="category-flex">
							<view class="category-text-top">
								1时20分
							</view>
							<view class="category-text">
								预计剩余
							</view>
						</view>
					</view>


					<view class="stop-char" @click="doStop">
						停止充电
					</view>

				</view>

			</view>
		</view>

	</view>
</template>
<script>
	import siteInfo from '@/siteinfo.js'
	export default {
		data() {
			return {
				siteInfo,
				bgco: '#ffffff',
				id: null
			};
		},
		onLoad(opt) {
			this.id = opt.id
			this.getChargeInfo()
		},
		methods: {
			doStop() {
				uni.showLoading({
					title: '正在关闭充电',
				})
				uni.showModal({
					title: '提示',
					content: '关闭成功',
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
			getChargeInfo() {},
			doStart() {},
			goTo: function() {},
		}
	}
</script>
<style>
	page {
		background-color: #EFF1F5;
	}
</style>
<style lang="scss" scoped>
	.page-body {
		position: relative;

		.charging-bg {
			height: 800rpx;
			width: 100%;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100% 100%;
			padding-top: 1rpx;

			.charging-title {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin-top: 70rpx;
				margin-bottom: 20rpx;

				.charging-block {
					width: 148rpx;
					height: 55rpx;
					line-height: 55rpx;
					font-size: 27rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #0EB866;
					background: #FFFFFF;
					box-shadow: 0px 0px 4rpx 0px rgba(70, 70, 70, 0.16);
					border-radius: 13rpx 0px 0px 13rpx;

					.cong {
						margin: 0 15rpx;
						width: 16rpx;
						height: 23rpx;
					}
				}
			}

			.charging-time {
				text-align: center;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFA800;
			}

			.charging-car {
				margin: 0 auto;
				height: 366rpx;
				width: 640rpx;
				background-repeat: no-repeat;
				background-position: center;

				background-size: 100% 100%;
				overflow: hidden;

				.charging-percent {
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;
					margin: 40rpx auto;
					height: 282rpx;
					width: 282rpx;
					background-repeat: no-repeat;
					background-position: center;
					background-size: 100% 100%;

					.charging-percent-num {
						font-size: 40rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #0EB866;
					}
				}
			}

			.charg-device {
				padding: 20rpx 0;
				margin: 36rpx 24rpx 0;
				text-align: center;
				background-color: #ffffff;
				border-radius: 7rpx;
				font-size: 34rpx;
				font-family: PingFangSC;
				font-weight: 500;
				color: #1F2022;

				.charg-device-dec {
					margin-top: 20rpx;
					font-size: 24rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #363646;
				}

				.category-text-top {
					font-size: 32rpx;
					color: #363646;
				}

				.category-text {
					font-size: 24rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #363646;
				}

				.stop-char {
					margin: 60rpx auto 20rpx;
					width: 617rpx;
					height: 89rpx;
					background: #20398A;
					text-align: center;
					line-height: 89rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					border-radius: 88rpx;
				}
			}

		}
	}
</style>
