<template>
	<view style="height: 100%;width: 95%;margin: 0 auto 14rpx;">
		<!-- #ifdef MP-WEIXIN -->
		<ad unit-id="adunit-1f8d9d0f2d829c4e" type="banner" bindclose="adClose" style="width: 100%;"></ad>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		props: {
			ad_id: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
