<template>
	<view>
		<u-navbar title="开始充电" :border-bottom="false"></u-navbar>
		<view class="page-body">
			<view class="content station"
			style="backgroundImage:url(https://cqrs.itux.cn/assets/addons/gaga/img/app/19.png">
				<view class="common-header">
					<view class="">
						金城时代广成
					</view>
				</view>
				<view class="personal">
					<view class="personal-kind">
						<text class="kind-title">充电桩：{{1 || ''}} 号</text>
					</view>
				</view>
				<view class="personal">
					<view class="personal-kind">
						<text class="kind-title">充电桩编号：{{1234567890|| '' }}</text>
					</view>
				</view>
			</view>


			<view class="content">
				<view class="common-header">
					<view class="">
						费用明细
					</view>
				</view>
				<view class="time">
					当前计费时段
				</view>
				<view class="unit-block">
					<view class="item-price">
						<text class="unit-title">电费：</text>
						<text class="unit-money">￥</text>
						{{ 5|| '' }}
						<text class="unit">/度</text>
					</view>
					<view class="item-price">
						<text class="unit-title">服务费：</text>
						<text class="unit-money">￥</text>
						{{ 3 || '' }}
						<text class="unit">/度</text>
					</view>
				</view>

				<view class="desc">
					<text>充电期间免费停车</text>
				</view>
			</view>






			<view class="content common-mtb25">
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
							150kw
						</view>
						<view class="category-text">
							电桩功率
						</view>
					</view>
					<view class="category-flex">
						<view class="category-text-top">
							500v
						</view>
						<view class="category-text">
							平台电压
						</view>
					</view>
					<view class="category-flex">
						<view class="category-text-top">
							12/24v
						</view>
						<view class="category-text">
							辅助电源
						</view>
					</view>
				</view>

				<view class="bg-img">

				</view>

			</view>


			<view class="content common-mtb25">
				<view class="common-header">
					<view class="">
						充电信息
					</view>
				</view>
				<view class="car-no-title">
					车牌号
				</view>
				<view class="car-no" v-if="carno">
					<text>{{ carno	 }}</text>
				</view>
				<view class="car-no" v-else>
					<text>{{ carno	 }}</text>
				</view>
				<view class="line">

				</view>

				<view class="pay-title">
					支付选择
				</view>
				<view class="my-price">
					￥300（个人钱包）
				</view>
				<view class="no-price">
					账户余额不足？点击<text style="color: #FE773B;" @click="goTo">立即充值</text>
				</view>

				<view class="navigation" @click="entering">
					<text>绑定车辆</text>
				</view>
			</view>
			<view style="height: 140rpx;">
			</view>
			<view class="confirm-buy">
				<view class="buy-bottom">
					<text class="item-price mt0"><text class="unit-money">￥</text>8 <text class="unit">
							/度</text>
					</text>
					<view class="now-buy" @click="doStart">
						开始充电
					</view>

				</view>
				<iponebottom :bgco="bgco"></iponebottom>
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
	export default {
		components: {
			iponebottom,
			carNumberInput,
			adver
		},
		data() {
			return {
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
				canUse: true
			};
		},
		onLoad(opt) {

		},
		methods: {




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
