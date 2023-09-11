<template>
	<view>
		<u-navbar title="订单详情" :border-bottom="false"></u-navbar>
		<view class="page-body">
			<view class="order-bg"
				style="backgroundImage:url(https://cqrs.itux.cn/assets/addons/gaga/img/app/20.png">
				<view class="" style="height: 20rpx;"></view>
				<view class="order-content-bg"
					style="backgroundImage:url(https://cqrs.itux.cn/assets/addons/gaga/img/app/21.png">
					<view class="end-title">充电已结束</view>
					<view class="num">2.21 <text class="money">元 </text></view>
					<view class="car_no">豫888888 <text class="car_dec">电池已充满 </text></view>
					<view class="cost-dec">
						消费金额
					</view>


					<view class="personal">
						<view class="personal-kind">
							<text class="kind-title">电费</text>
						</view>
						<view class="personal-kind">
							<text class="kind-title color2">0.5000</text>
							<text class="kind-title color1"> 元</text>
						</view>
					</view>
					<view class="personal">
						<view class="personal-kind">
							<text class="kind-title">服务费</text>
						</view>
						<view class="personal-kind">
							<text class="kind-title color2">0.5000元</text>

						</view>
					</view>



					<view class="all-money">
						<view class="all-title">
							总计：
						</view>
						<view class="num">2.21 <text class="money">元 </text></view>
					</view>



					<view class="particulars">
						<view class="personal">
							<view class="personal-kind">
								<text class="kind-title color3">充电时长</text>
							</view>
							<view class="personal-kind">
								<text class="kind-title color4">3小时05分</text>
							</view>
						</view>
						<view class="personal">
							<view class="personal-kind">
								<text class="kind-title color3">订单编号</text>
							</view>
							<view class="personal-kind">
								<text class="kind-title color4">20230203000344355</text>
							</view>
						</view>

						<view class="personal">
							<view class="personal-kind">
								<text class="kind-title color3">充电电站</text>
							</view>
							<view class="personal-kind">
								<text class="kind-title color4">荣欣指头电子电器</text>
							</view>
						</view>
					</view>



					<view class="do-pay" @click="doStop">
						立即支付
					</view>
				</view>

			</view>



			<view class="common-mtb25" style="margin: 25rpx 0;">
				<!-- #ifdef MP-WEIXIN -->
				<adver :ad_id="order_detail_ad.unit_id" :type="order_detail_ad.ad_type"></adver>
				<!-- #endif -->
			</view>
		</view>

	</view>
</template>

<script>
	import adver from '@/components/adver';
	export default {
		components: {
			adver
		},
		data() {
			return {
				order_detail_ad: {}
			};
		},
		onLoad(opt) {
			this.order_detail_ad = JSON.parse(uni.getStorageSync("WXADDV")).order_detail
		},
		onReady() {

		},
		methods: {
			doStop() {

			},
			getChargeInfo() {


			},

			doStart() {


			},
			goTo: function() {


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
	.page-body {
		position: relative;

		.order-bg {
			height: 800rpx;
			width: 100%;

			background-size: 100% 100%;

			.order-content-bg {
				text-align: center;
				height: 1350rpx;
				width: 100%;

				background-size: 100% 100%;
				overflow: hidden;

				.end-title {
					margin: 50rpx 0;
					font-size: 34rpx;
					font-family: PingFangSC;
					font-weight: 600;
					color: #1F2022;
				}

				.num {
					font-size: 72rpx;
					font-family: PingFangSC;
					font-weight: 600;
					color: #FF3013;

					.money {
						font-size: 28rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #FF3013;
					}
				}

				.car_no {
					margin-top: 39rpx;
					font-size: 27rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #1F2022;
				}

				.car_dec {
					margin-right: 30rpx;
					font-size: 24rpx;
				}

				.cost-dec {
					margin-left: 50rpx;
					margin-top: 70rpx;
					margin-bottom: 30rpx;
					text-align: left;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #1F2022;

				}

				.personal {
					margin: 10rpx 50rpx;
					display: flex;
					justify-content: space-between;

					.personal-kind {
						position: relative;
						height: 60rpx;
						padding: 12px 0;
						display: flex;
						align-items: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #363646;

						.kind-title {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
						}

						.color1 {
							color: #FF3013;
						}

						.color2 {
							color: #FF3013;
						}
					}
				}

				.all-money {
					margin-top: 30rpx;
					height: 90rpx;
					display: flex;
					margin-right: 50rpx;
					align-items: center;
					justify-content: flex-end;
					font-size: 32rpx;
					font-family: PingFangSC;
					font-weight: 500;
					color: #1F2022;

					.all-title {
						position: relative;
						top: 14rpx;
					}
				}

				.particulars {
					margin: 120rpx 0 0;

					.color3 {
						font-size: 25rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #363646;
					}

					.color4 {
						font-size: 28rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #363646;
					}
				}

				.do-pay {

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
