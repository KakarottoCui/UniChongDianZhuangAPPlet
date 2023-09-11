<template>
	<view>
		<u-navbar title="价格详情" :border-bottom="false"></u-navbar>
		<view class="page-body">
			<view class="price-content" v-for="(item,index) in price_lv" :key="index">
				<view class="price-header">
					<view class="">
						{{ item.title || ''}}
					</view>
				</view>
				<view class="price-detial" v-show="item.flag">
					当前时段
				</view>
				<view class="personal">
					<view class="personal-kind">
						<text class="kind-title">电费</text>
					</view>
					<view class="personal-kind">
						<!-- <text class="kind-title color1">0.8200元/度</text> -->
						<text class="kind-title color1"> {{ item.rate.toFixed(2)|| 0}}元/度</text>
					</view>
				</view>
				<view class="personal">
					<view class="personal-kind">
						<text class="kind-title">服务费</text>
					</view>
					<view class="personal-kind">
						<!-- <text class="kind-title color2">0.5000元/度</text> -->
						<text class="kind-title color2">{{ item.fee.toFixed(2) || 0}}元/度</text>
					</view>
				</view>
				<view class="line">

				</view>
				<view class="total-bottom">
					<text>合计</text>
					<text class="mt0 item-price"><text class="unit-money">￥</text>
						<!-- 1.10 -->
						{{ (item.rate +  item.fee).toFixed(2) || 0}}
						<text class="unit"> /度</text>
					</text>
				</view>

			</view>
		</view>
		<view class="" style="height: 120rpx;">

		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {

			};
		},
		computed: {
			price_lv() {

				let arr = this.$store.state.priceLv;

				for (let i = 0; i < arr.length; i++) {
					if (utils.checkAuditTime(arr[i].title.split("-")[0], arr[i].title.split("-")[1])) {
						let obj = arr[i];
						arr.splice(i, 1);
						obj.flag = true;
						arr.unshift(obj);
					}
				}


				return arr;
			}
		},
		onReady() {

		},
		methods: {}
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

		.price-content {
			position: relative;
			margin: 0 24rpx;
			margin-top: 22rpx;
			background: #FFFFFF;
			border-radius: 7rpx;
			overflow: hidden;
			padding-left: 30rpx;
			padding-right: 36rpx;

			.price-header {
				margin-top: 35rpx;
				height: 50rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #0EB866;

			}

			.price-detial {
				position: absolute;
				top: 46rpx;
				right: 0;
				width: 126rpx;
				height: 35rpx;
				margin-left: 30rpx;
				text-align: center;
				font-size: 21rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				background: linear-gradient(0deg, #EDCB11, #FFA800, #FFC43E);
				border-radius: 7rpx 0px 0px 7rpx;
			}

			.personal {
				margin: 10rpx auto;
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
						color: #363646;
					}

					.color2 {
						color: #363646;
					}
				}
			}

			.line {
				height: 2rpx;
				background: #EFF1F5;
			}

			.total-bottom {
				height: 94rpx;

				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #1F2022;
			}
		}


	}
</style>
