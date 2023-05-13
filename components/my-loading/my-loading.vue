<template>
	<view>
		<view class="loading u-flex u-row-center">
			<u-loading :show="true" size="50" mode="flower"></u-loading>
			<view class="text">努力加载中...</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-loadding",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.loading {
		padding: 200rpx 100rpx;
		flex-direction: column;

		.text {
			color: #c7c7c7;
			font-size: 26rpx;
			margin-top: 20rpx;
		}
	}
</style>