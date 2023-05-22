<template>
	<view>
		<!-- banner -->
		<image class="banner" src="/static/banner/banner.gif"></image>
		<view class="share_box" @click="util.urlTo('/pages/my/invite')">邀请好友</view>
		<!-- abount -->
		<view class="abount">
			<view class="abount_box flex align-end justify-center">
				<image src="/static/nh/abount.png" mode="widthFix"></image>
			</view>
			<view class="tips_text">
				内核数字文创平台（NHart）是致力IP孵化、专属品牌打造、数字营销、多元场景应用到web3全产业链运营的专业数字文创平台。
			</view>
			<view class="tips_text">
				平台依托国家级区块链BSN基础网络的开放联盟链作为底层区块链基础设施，致力于建设行业顶级web3应用。
			</view>
		</view>
		<image src="/static/nh/index2.gif" class="index_img" mode="widthFix"></image>
		<!-- 购买须知 -->
		<view class="abount">
			<view class="abount_box buy flex align-end justify-center">
				<image src="/static/nh/gmxz.png" mode="widthFix"></image>
			</view>
			<view class="tips_text">
				内核数字文创平台（NHart）是致力IP孵化、专属品牌打造、数字营销、多元场景应用到web3全产业链运营的专业数字文创平台。
			</view>
			<view class="tips_text">
				平台依托国家级区块链BSN基础网络的开放联盟链作为底层区块链基础设施，致力于建设行业顶级web3应用。
			</view>
		</view>
		<!-- 分享链接 -->
		<view class="share flex justify-center">
			<image src="/static/nh/hand.png" mode="" class="hand"></image>
			<view class="btn">分享链接</view>
		</view>


		<!-- bottom_banner -->
		<image class="banner" src="/static/nh/bottom.gif"></image>


	</view>
</template>

<script>
	import api from '@/common/api.js'
	export default {
		data() {
			return {
				user: {},
				is_show: false, // 认证
				token: '',
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			this.util.getVersion();
			// #endif
		},
		onShow() {
			this.token = uni.getStorageSync('token');
			if (this.token) {
				this.getUserInfos();
			}
		},

		methods: {
			// 用户信息
			getUserInfos() {
				this.util.getUserInfo().then(res => {
					this.user = res;
					uni.setStorageSync('info', res)
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
		font-family: PingFang SC;
	}

	.banner {
		width: 100%;
		height: 440rpx;
	}

	.share_box {
		position: fixed;
		right: 0;
		top: 500rpx;
		padding: 32rpx 22rpx;
		background: linear-gradient(180deg, #000000 0%, #232323 100%);
		border-radius: 14rpx 0 0 14rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular-Regular, PingFangSC-Regular;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 36rpx;
		writing-mode: vertical-lr;
		z-index: 999;

	}

	.index_img {
		width: 100%;
	}

	.tips_text {
		padding: 0 50rpx;
		color: rgb(70, 70, 70);
		font-size: 28rpx;
		line-height: 42rpx;
		margin-bottom: 30rpx;
	}

	.abount_box {
		background: url('@/static/nh/abount_bg.png') no-repeat center;
		background-size: contain;
		width: 100%;
		height: 300rpx;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;

		image {
			width: 40%;
		}
	}

	.abount {
		.buy {
			background: url('@/static/nh/gmxz_bg.png') no-repeat center;
			background-size: cover;
		}
	}

	.share {
		padding: 200rpx 0 100rpx;
		position: relative;

		.hand {
			position: absolute;
			left: -32%;
			top: -100rpx;
			height: 440rpx;
			transform: rotate(-2deg);
		}

		.btn {
			background: linear-gradient(180.00deg, rgba(0, 0, 0, 1.00), rgba(35, 35, 35, 1.00) 100%);
			color: #fff;
			font-size: 28rpx;
			border-radius: 16rpx;
			padding: 20rpx 36rpx;
		}
	}
</style>