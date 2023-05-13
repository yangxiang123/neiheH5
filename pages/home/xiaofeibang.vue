<template>
	<view class="page">
		<!-- 	<view class="title">排行榜</view>
		<view class="text">邀请好友拿限量藏品</view> -->
		<image src="/static/rank_bg4.jpg" mode="widthFix" class="bg"></image>
		<!-- <image src="/static/rank_bg3.png" mode="widthFix" class="bg"></image> -->
		<view class="box">
			<view class="flex justify-between align-center way" v-for="(item,index) in list.data">
				<view class="hao" v-if="index<10" :class="index==0?'hao1':index==1?'hao2':index==2?'hao3':'hao'">
					NO.{{index+1}}</view>
				<view class="flex align-center">
					<image :src="item.user.avatar" mode=""></image>
					<view class="name">{{item.user.nickname}}</view>
				</view>
				<view class="bot">{{item.total_amount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {}
			}
		},
		methods: {
			getlist() {
				this.util.request('goods/user_holding', {}, 'POST').then(res => {
				// this.util.request('invite/holding_rank', {}, 'POST').then(res => {
					console.log(res);
					uni.stopPullDownRefresh()
					this.list = res;
					
				})
			},
		},
		onShow() {
			this.getlist()
		}
	}
</script>

<style lang="scss">
	page {
		// background: url('@/static/rank_bg2.jpg') no-repeat;
		// background-size: cover;
		// min-height: 100vh;
		background-color: rgb(219, 17, 15);

		.bg {
			width: 100%;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
		}



		.title {
			font-size: 72rpx;
			font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
			padding-top: 120rpx;
			letter-spacing: 20rpx;
		}

		.text {
			font-size: 24rpx;
			font-family: PingFang SC-常规体, PingFang SC;
			font-weight: normal;
			color: #FFFFFF;
			text-align: center;
			padding-top: 120rpx;
			letter-spacing: 20rpx;
		}

		.box {

			padding: 0 72rpx 0 72rpx;
			padding-bottom: 32rpx;
			position: relative;
			// bottom: 600rpx;
			// bottom: 900rpx;
			top: 500rpx;


			.way {
				padding: 40rpx;
				margin-bottom: 32rpx;
				border-radius: 20rpx;
				background: url('@/static/rank_bg5.jpg') no-repeat center;
				background-size: 100% 100%;

				image {
					width: 68rpx;
					height: 68rpx;
					border-radius: 100%;
				}

				.name {
					font-size: 28rpx;
					color: #fff;
					margin-left: 20rpx;
				}

				.bot {
					color: #fff;
					font-size: 36rpx;
				}
			}

			.hao {
				color: #fff;
				font-size: 36rpx;
			}

			.hao1 {
				color: #FFC300;
				font-size: 36rpx;
			}

			.hao2 {
				color: #B9B9B9;
				font-size: 36rpx;
			}

			.hao3 {
				color: #E28F00;
				font-size: 36rpx;
			}
		}
	}
</style>
