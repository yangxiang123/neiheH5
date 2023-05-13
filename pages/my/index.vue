<template>
	<view class="page">
		<u-navbar :is-back="false" title="我的">
			<view class="u-slot-right">
				<view class="set" @click="util.urlTo('/pages/my/info')">
					<u-icon name="setting" color="#444" size="48"></u-icon>
				</view>
			</view>
		</u-navbar>
		<!-- <view class="bg-white">
			<cu-custom bgColor="bg-white" :isBack="false">
				<block slot="content" class="">我的</block>
				<block slot="right">
					<view class="set" @click="util.urlTo('/pages/my/setting')">
						<u-icon name="setting" color="#444" size="48"></u-icon>
					</view>
				</block>
			</cu-custom>
		</view> -->

		<view class="top-box">
			<view class="my">
				<image :src="info.avatar" mode="" class="my_img"></image>
				<view class="my_text">
					<view class="" style="">{{info.nickname}}</view>

				</view>
			</view>
			<view class="bot">
				<view class="flex align-center">
					<view class="hui">区块链地址:{{info.blockuserid}} </view>
					<image src="/static/my/copy2.png" mode="" class="hui_img" @click="util.copy(info.blockuserid)">
					</image>
				</view>
				<view class="btn_box u-flex justify-between">
					<view class="btn_mone u-flex justify-center" @click="util.urlTo('/pages/my/my_collection')">
						<image src="/static/new/btn1.png" mode=""></image> 我的藏品
					</view>
					<view class="btn_mone u-flex justify-center" @click="gomy_money()">
						<image src="/static/new/btn2.png" mode=""></image>进入钱包
					</view>
				</view>
			</view>

		</view>

		<view class="content">
			<view class="lists" v-for="(item,index) in lists" :key="index" @click="todeil(index,item.url)">
				<view class="list_left">
					<image :src="item.img" mode=""></image>
					{{item.name}}
				</view>
				<view class="">
					<text class="renz" v-if="index== 1">{{info.real == 0?'未认证':'已认证'}}</text>
					<u-icon name="arrow-right" color="#444" size="36"></u-icon>
				</view>
			</view>

		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				lists: [{
						img: '/static/new/list1.png',
						name: '我的订单',
						url: '/pages/my/order'
					},
					// {
					// 	img: '/static/new/list1.png',
					// 	name: '我的盲盒订单',
					// 	url: '/pages/my/order?type=1'
					// },
					{
						img: '/static/new/list2.png',
						name: '我的认证',
						url: ''
					},
					{
						img: '/static/new/list3.png',
						name: '账号与安全',
						url: '/pages/my/info'
					},
					{
						img: '/static/new/list4.png',
						name: '我的转赠记录',
						url: '/pages/my/circulation'
					},
					{
						img: '/static/new/list5.png',
						name: '关于我们',
						url: '/pages/my/agreement?id=9'
					},

				],
				goodsTag: null,
				goodsbox: null,



			}
		},
		onShow(e) {
			this.getinfo();

		},
		methods: {
			tomore(e) {
				if (e == 0) {
					uni.navigateTo({
						url: '/pages/market/my_lists'
					})
				} else {
					uni.navigateTo({
						url: '/pages/market/my_boxlists'
					})
				}
			},
			getinfo() {
				this.info = uni.getStorageSync('userInfo')
				this.util.request('user/index', {}, 'POST').then(res => {
					this.info = res;
				})
			},
			todeil(index, url) {
				if (index != 1) {
					uni.navigateTo({
						url: url
					})
				} else {
					if (this.info.real == 0) {
						this.util.urlTo('../index/shiming')
					} else {
						this.util.showToast('您已经实名过啦~')
					}
				}
			},
			gomy_money() {
				// let userInfo = uni.getStorageSync('info')
				uni.navigateTo({
					url: '/pages/my/my_money'
				})
				return
				if (this.info.wallet_status == 0) {
					this.util.request('user/wallet_order', {}).then(res => {
						if (res.order.order_sn) {
							uni.navigateTo({
								url: `/pages/my/openWallet?order_sn=${res.order.order_sn}&update_time=${res.order.update_time}&order_amount=${res.order.order_amount}`
							})
						}
					})
				} else {
					uni.navigateTo({
						url: '/pages/my/my_money'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: #fafafa;
	}

	.set {
		position: absolute;
		right: 30rpx;
		top: 20rpx;
	}

	.content {
		margin: 0 30rpx;
		// border: 1rpx solid;
		border-radius: 30rpx;
		padding: 0 40rpx;
		background-color: #fff;
		box-shadow: 0rpx 10rpx 24rpx 0rpx rgba(0, 0, 0, 0.03);

		.lists {
			height: 120rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 4rpx solid #F7F7F7;

			.list_left {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				font-weight: bold;
				color: #000;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 25rpx;
				}
			}

			.renz {
				font-size: 28rpx;
				font-weight: bold;
				color: #000;
				margin-right: 15rpx;
			}
		}

		.lists:last-child {
			border-bottom: none !important;
		}
	}








	.top-box {

		background: #F3D36F;
		width: 690rpx;
		margin: 30rpx auto;
		border-radius: 30rpx;

		.my {
			padding: 20rpx 30rpx;
			margin-top: 30rpx;
			display: flex;
			align-items: center;

			.my_img {
				width: 102rpx;
				height: 102rpx;
				border-radius: 100%;
			}

			.my_text {
				margin-left: 10rpx;
				font-size: 36rpx;
				font-family: PingFang SC-中黑体, PingFang SC;
				font-weight: bold;
				color: #444;
			}
		}

		.bot {
			border-radius: 0 0 30rpx 30rpx;
			margin-top: 30rpx;
			padding: 20rpx 20rpx;
			background-color: #E9C770;

			.hui {
				color: #444;
				width: 550rpx;
				margin-left: 20rpx;
				font-weight: bold;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;


			}

			.hui_img {
				width: 28rpx;
				height: 28rpx;
				margin-left: 20rpx;
				border-radius: 0%;
			}
		}

		.btn_box {
			margin-top: 20rpx;

		}
	}

	.btn_mone {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 314rpx;
		height: 94rpx;
		border-radius: 20rpx;
		background: #fff;
		font-style: normal;
		font-weight: 600;
		font-size: 28rpx;
		letter-spacing: 1px;
		color: #000;

		image {
			width: 46rpx;
			height: 46rpx;
			margin-right: 15rpx;
		}

	}
</style>