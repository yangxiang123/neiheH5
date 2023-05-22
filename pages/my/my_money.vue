<template>
	<view class="page">
		<view class="lists">
			<view class="title">汇元钱包</view>
			<view class="btn" @click="tohuiyuan">进入</view>
		</view>
		<!-- <view class="lists">
			<view class="title">杉德钱包</view>
			<view class="btn" @click="tushande">进入</view>
		</view> -->
		<view class="lists">
			<view class="title">官方钱包　</view>
			<view class="btn" @click="util.urlTo('/pages/my/money')">进入</view>
		</view>
		<view class="lists">
			<view class="title">连连钱包　</view>
			<view class="btn" @click="util.urlTo('/pages/my/lianlian/wallet')">进入</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			tushande() {
				this.util.request('user/sd_wallet', {}, 'POST').then(res => {

					// console.log(res)

					// #ifdef H5
					window.location.href = res;
					// #endif



					// #ifdef APP-PLUS
					uni.setStorageSync('url', res);
					this.util.urlTo('../pay/pay');
					// #endif	
				})
			},
			tohuiyuan() {
				this.util.request('user/heepay_wallet', {}, 'POST').then(res => {



					// #ifdef H5
					window.location.href = res.url;
					// #endif



					// #ifdef APP-PLUS
					uni.setStorageSync('url', res.url);
					this.util.urlTo('../pay/pay');
					// #endif	
				})

			}

		}
	}
</script>

<style lang="scss">
	.page {
		padding: 44rpx;

		.lists {
			position: relative;
			border-radius: 30rpx;
			margin-bottom: 44rpx;
			width: 100%;
			height: 300rpx;
			padding: 44rpx;
			box-sizing: border-box;
			// background: linear-gradient(270deg,#1a1a1a,rgba(21,21,21,.62));
			background: url('@/static/bg/lv_bg.png') no-repeat center;
			background-size: cover;
			background-repeat: no-repeat;
			// background-attachment: fixed;

			&:nth-child(2) {
				background: url('@/static/bg/bg2.png') no-repeat center;
			}
			&:nth-child(3) {
				background: url('@/static/bg/bg3.png') no-repeat center;
			}

			.title {
				color: #fff;
				font-size: 48rpx;
				font-weight: 600;
			}

			.btn {
				background-color: #fff;
				width: 140rpx;
				height: 50rpx;
				border-radius: 10rpx;
				text-align: center;
				line-height: 50rpx;
				color: #1a1a1a;
				position: absolute;
				right: 44rpx;
				bottom: 44rpx;
			}
		}
	}
</style>