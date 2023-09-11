<template>
	<view class="content blue-bg">
		<view class="sc-card u-p-t-20">
			<u-card v-for="(item,index) in articleList" :key="index" padding="20"
				box-shadow="3px 3px 10px rgba(0,0,0,0.1)" :border="false" :title="item.title" sub-title="资讯"
				thumb="">
				<view slot="body">
					<view class="u-body-item u-flex u-col-between u-p-t-0 u-m-b-20 u-m-t-20">
						<view class="u-body-item-title">
							{{item.content}}
						</view>
					</view>
					<view class="u-m-t-200">
						<image :src="getPic+item.pic1" style="width: 100%;" mode="aspectFit"></image>
					</view>

					<!-- <view class="u-flex u-row-right">
						<text class="u-font-20 u-tips-color">{{资讯}}</text>
					</view> -->
				</view>
				<view class="u-flex u-row-between" slot="foot">
					<text>{{item.createTime}}</text>
				</view>
			</u-card>
		</view>

	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js"
	export default {
		data() {
			return {
				commentObj: "",
				commentType: 0,
				commentText: "",
				showModel: false,
				userInfo: "",
				background: {
					backgroundImage: "linear-gradient(to bottom, rgba(108,172,255,1) , rgba(141,235,255,0.8))"
				},
				articleList: [],
				commentList: [],
				id:"",
				article:{},
				getPic:""
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getPic = appRequest.urlMap.getPic;
			this.getData();
		},
		methods: {
			getData(){
				let _this = this;
				appRequest.request({
					method: "POST",
					data: {
						id:this.id,
						type:1
					},
					url: appRequest.urlMap.findNmArticleList,
					success: function(res) {
						let su = false;
						if(res.data.code == 200){
							_this.articleList = res.data.data;
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
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.grid-text {
		font-size: 30rpx;
		margin-top: 4rpx;
		color: $u-type-info;
		font-weight: bold;
		text-shadow: 1px 1px 3px rgba($color: #000000, $alpha: 0.15);
	}

	.blue-bg {
		background: linear-gradient(to bottom, rgba(141, 235, 255, 0.8), rgba(141, 235, 255, 0));
	}

	.blue-bg2 {
		background: linear-gradient(to bottom, rgba(141, 235, 255, 0.9), rgba(141, 235, 255, 0.6));
	}

	.add-btn {
		position: fixed;
		right: 30px;
		bottom: 30px;
		border-radius: 30px;
		width: 60px;
		height: 60px;
		color: white;
		font-size: 40px;
		line-height: 60px;
		text-align: center;
	}

	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
