<template>
	<view>
		<view style="padding: 20rpx;">
			<u-search :show-action="false" @search="search" @clear="search" placeholder="输入关键词搜索" v-model="keyword"></u-search>
		</view>
		<view class="swipe-view" style="text-align: center;padding: 20rpx;">
			<u-swiper border-radius="18" bg-color="rgba(255,255,255,0)" :effect3d="true" mode="rect" :list="sw"
				></u-swiper>
			<!-- <u-swiper indicatorMode="dot" :indicator="true" :list="tipList"></u-swiper> -->
		</view>
		<view class="tip" style="padding: 2% 5% 0 5%; display: flex; justify-content: center;">
			<u-tabs bg-color="rgba(255,255,255,0)" :list="tipList" :is-scroll="true" :current="tab"
				@change="click"></u-tabs>
			<!-- <u-tabs active-color="#102b6a" inactive-color="white" :list="tipList" :current="tipCurrent" @change="change"></u-tabs> -->
			<!-- <u-tabs lineColor="#102b6a" :inactiveStyle="{color:'white'}" :activeStyle="{color:'#102b6a'}" :list="tipList" @click="click"></u-tabs> -->
		</view>
		<view v-if="tab==0" class="sc-card">
			<u-card @click="showItem(item)" v-for="(item,index) in article" :key="index" padding="20"
				box-shadow="3px 3px 10px rgba(0,0,0,0.1)" :border="false" :title="item.title" sub-title="最新资讯"
				thumb="">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">{{item.content}}</view>
						<image :src="getPic+item.pic1" mode="aspectFill" style="width: 100rpx;height: 100rpx;">
						</image>
					</view>
				</view>
				<view class="u-flex u-row-between" slot="foot">
					<text>{{item.createTime}}</text>
				</view>
			</u-card>
		</view>
		<view v-if="tab==1" class="map-box" v-for="(item,index) in stationList">
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
								<image class="address-icon" src="../../static/images/address.png" mode="">
								</image>
								<view class="distance">{{ item.dis }}</view>
							</view>
						</view>
						<view class="item-type">
							<view class="type" >
								地址：<text style="color: cornflowerblue;">{{ item.area }}</text>
							</view>
						</view>
						<view class="item-type">
							<view class="type">
								{{ item.memo }}
							</view>
						</view>
						<view class="item-num">
							<image class="all-icon" src="../../static/images/all.png" mode=""></image>
							<view class="all-num">{{ item.unuse }}
								<view class="use"> /{{ item.stationItemList.length }}</view>
							</view>
		
						</view>
						<view class="item-price">
							<view class="price">
								<view class="unit-money inline">￥</view>
								<view class="inline">{{item.num}}</view>
								<view class="unit inline"> 元/度</view>
							</view>
						</view>
					</view>
					<view class="navigation" @click="goGaChargeDetail(item)">
						<image class="gps-icon" src="../../static/images/gps.png" mode=""></image>
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
				stationList:[],
				location:{
					addX:"",
					addY:""
				},
				sw:[],
				article:[],
				keyword:"",
				tab:0,
				tipList: [{
					name: '最新资讯'
				}, {
					name: '我要充电'
				}],
				getPic:""
			};
		},onLoad:function(){
			this.getLocation();
			this.getSw();
			this.getArticle();
			this.getPic = appRequest.urlMap.getPic;
		},methods:{
			goGaChargeDetail(item){
				uni.navigateTo({
					url:"/pages/app/chargeInfo/chargeInfo?id="+item.id
				})
			},
			showItem(item){
				uni.navigateTo({
					url:"/pages/app/infoItem?id="+item.id
				})
			},
			click(index){
				this.tab = index;
				this.keyword = "";
				if(this.tab==0){
					this.getArticle();
				}else{
					this.getStationData();
				}
			},
			search(){
				if(this.tab==0){
					this.getArticle();
				}else{
					this.getStationData();
				}
			},
			getArticle(){
				let _this = this;
				appRequest.request({
					method: "POST",
					data: {
						validFlag:1,
						type:1,
						title:this.keyword
					},
					url: appRequest.urlMap.findNmArticleList,
					success: function(res) {
						let su = false;
						if(res.data.code == 200){
							_this.article = res.data.data;
						}
					},
					fail: function(res) {
				
					}
				})
			},
			getSw(){
				let _this = this;
				appRequest.request({
					method: "POST",
					data: {
						validFlag:1,
						type:0
					},
					url: appRequest.urlMap.findNmArticleList,
					success: function(res) {
						let su = false;
						if(res.data.code == 200){
							res.data.data.map(function(item,index){
								_this.sw.push(appRequest.urlMap.getPic+item.pic1);
							});
						}
					},
					fail: function(res) {
				
					}
				})
			},
			getStationData(){
				let _this = this;
				appRequest.request({
					method: "POST",
					data: {
						validFlag:1,
						info:1,
						title:this.keyword
					},
					url: appRequest.urlMap.findNmStationList,
					success: function(res) {
						let su = false;
						if(res.data.code == 200){
							_this.stationList = res.data.data;
							_this.formatStationData();
						}
					},
					fail: function(res) {

					}
				})
			},formatStationData(){
				for(var i=0;i<this.stationList.length;i++){
					var obj = this.stationList[i];
					var unuse = 0;
					for(var j=0;j<obj.stationItemList.length;j++){
						if(obj.stationItemList[j].state==0){
							unuse++;
						}
					}
					obj.dis = this.getDistance(obj.addX,obj.addY,this.location.addX,this.location.addY);
					obj['unuse'] = unuse;
				}
				this.$forceUpdate();
			},getLocation:function(){
				var _this = this;
				this.location.addX = appRequest.addX;
				this.location.addY = appRequest.addY;
				wx.getLocation({
					type: 'wgs84',
					success(res) {
						const latitude = res.latitude
						const longitude = res.longitude
						const speed = res.speed
						const accuracy = res.accuracy
						_this.location.addY = longitude;
						_this.location.addX = latitude;
					}
				})
			},getDistance(lat1, lng1, lat2, lng2) {
				function rad(d) {
					return d * Math.PI / 180.0;
				}
				var radLat1 = rad(lat1);
				var radLat2 = rad(lat2);
				var a = radLat1 - radLat2;
				var b = rad(lng1) - rad(lng2);
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137; // EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000; //输出为公里

				var distance = s;
				var distance_str = "";

				if (parseInt(distance) >= 1) {
					distance_str = distance.toFixed(1) + "km";
				} else {
					distance_str = (distance * 1000).toFixed(1) + "m";
				}
				return distance_str;
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
