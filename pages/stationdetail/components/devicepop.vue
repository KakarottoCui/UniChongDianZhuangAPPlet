<template>
	<view>
		<u-popup v-model="isShow" mode="bottom" :closeable="true" border-radius="23" @close="closePop">
			<view class="device-list">
				<block>
					<view class="device-title">
						设备详情
					</view>
					<view style="height: 110rpx;">

					</view>
					<view class="device-content">
						<view class="device-time">
							<block>
								<view class="device-status">
									<view class="txt">空闲</view>
								</view>
								<text class="device-no">
									0153105168413841056
								</text>
							</block>
						</view>

						<view class="device-power">
							<view class="loop">
								01号
							</view>
							<view class="power">
								功率:120kw
							</view>
							<text>
								电压:750v
							</text>
						</view>

						<view  class="ticket-by"
							@click="startCharge()">
							启动充电
						</view>
					</view>
					<view style="height: 80rpx;">


					</view>


				</block>
				<!-- 	<block v-else>
					<view class="empty">
						正在加紧布置中...
					</view>
    
				</block> -->

			</view>


		</u-popup>

	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			devices: {
				type: Array,
				default: []
			}
		},

		data() {
			return {
				isShow: false
			}
		},

		methods: {
			startCharge() {
				this.$emit("startCharge")
			},

			closePop() {
				this.$emit("closePop", false)
			}
		},
		watch: {
			show: {
				handler(newVal, olVal) {
					this.isShow = newVal
				},
				immediate: true,
				deep: true
			}

		}
	}
</script>
<style lang="scss" scoped>
	.device-list {
		height: 700rpx;
		text-align: center;
		// overflow: auto;
		background-color: #FFFFFF;
		width: 100%;

		.device-title {
			position: fixed;
			z-index: 2;
			height: 100rpx;
			line-height: 100rpx;
			background-color: #FFFFFF;
			width: 100%;
			text-align: center;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #000000;
		}

		.device-content {
			position: relative;
			margin: 0 40rpx 25rpx;
			background: #F9F9F9;
			overflow: hidden;
			border-radius: 7rpx;

			.device-time {
				margin-left: 27rpx;
				margin-top: 30rpx;
				display: flex;
				height: 40rpx;
				align-items: center;

				.device-status {
					width: 67rpx;
					height: 32rpx;
					margin-right: 10rpx;
					text-align: center;
					background: #F0FCFF;
					border: 1rpx solid #00D2A5;
					border-radius: 7rpx;
					font-weight: 500;
					color: #0EB866;
					line-height: 32rpx;

					.txt {
						font-size: 24rpx;
						transform: scale(0.83, 0.83);
					}
				}

				.device-busy {
					border: 1rpx solid #FFAE00;
					background: #FFF9EB;
					color: #FFAE00;
				}

				.device-off {
					color: #999999;
					background: #FFF9EB;
				}

				.device-hitch {
					color: #999999;
					background: #ff0000;
				}

				.device-no {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #363646;
				}
			}

			.device-power {
				margin-left: 27rpx;
				margin-top: 22rpx;
				display: flex;
				font-size: 29rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-bottom: 30rpx;

				.loop {
					color: #363646;
					margin-right: 20rpx;
				}

				.power {
					margin-right: 70rpx;
				}
			}

			.ticket-by {
				position: absolute;
				right: 33rpx;
				transform: translateY(-50%);
				top: 50%;
				width: 140rpx;
				height: 72rpx;
				border: 2rpx solid #0EB866;
				border-radius: 36rpx;
				text-align: center;
				line-height: 68rpx;
				font-size: 27rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #0EB866;

			}
		}
	}

	.empty {
		text-align: center;
		margin-top: 76px;
		font-size: 15px;
		color: #ccc;
	}
</style>
