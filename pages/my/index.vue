<template>
	<view class="page">
		<view class="top-box" :style="{'padding-top':CustomBar+'px'}">
			<view class="my">
				<image :src="info.avatar" mode="" class="my_img"></image>
				<view class="my_text">
					<view class="" style="">{{info.nickname}}</view>
					<view class="flex align-center" style="margin-top:10rpx;">
						<view class="hui">{{info.blockuserid}} </view>
						<image src="/static/my/copy.png" mode="" class="hui_img" @click="util.copy(info.blockuserid)">
						</image>
					</view>
				</view>
			</view>
			<view class="btn_box u-flex justify-between">
				<view class="btn_mone u-flex justify-center" @click="util.urlTo('/pages/my/my_collection')">我的藏品</view>
				<view class="btn_mone u-flex justify-center" @click="gomy_money">进入钱包</view>
			</view>
		</view>
		<view class="my_box">
			<view class="lists" v-for="(item,index) in lists" :key="index" @click="todeil(index,item.url)">
				<image :src="item.img" mode=""></image>
				<view class="">{{item.name}}</view>
			</view>
		</view>
		<u-sticky h5-nav-height="0">
			<u-tabs :list="tab_list" :is-scroll="false" :current="current" @change="change" active-color="#282828"
				inactive-color="#999"></u-tabs>
		</u-sticky>

		<template v-if="list.length">
			<view class="list_box">
				<view v-for="(item,index) in list" :key="index">
					<view class="lists_box" v-if="item.goods"
						@click="util.urlTo('/pages/market/my_lists2?id='+item.goods_id+'&type1='+typeIndex+'&act='+current)">
						<image :src="item.goods.goods_image" mode="aspectFill" class="min_img"></image>
						<view class="num">x {{item.total_num}}</view>
						<view class="text">
							<view class="">{{item.goods.goods_name}}</view>
							<view class="flex align-center flex-sub margin-top-xs">
								<image :src="item.goods.publish_image"
									style="width: 38rpx;height: 38rpx;border-radius: 50%;" mode="">
								</image>
								<view class="padding-left-sm font24 col-999 text-1" style="width: 120rpx;">
									{{item.goods.publisher}}
								</view>
							</view>
						</view>
					</view>
					<view class="lists_box" v-if="item.box"
						@click="util.urlTo('/pages/market/my_boxlists2?id='+item.box_id+'&type1='+typeIndex+'&act='+current)">
						<image :src="item.box.box_image" mode="aspectFill" class="min_img"></image>
						<view class="num">x {{item.total_num}}</view>
						<view class="text">
							<view class="">{{item.box.box_name}}</view>
							<view class="flex align-center flex-sub margin-top-xs">
								<image :src="item.box.publish_image"
									style="width: 38rpx;height: 38rpx;border-radius: 50%;" mode="">
								</image>
								<view class="padding-left-sm font24 col-999 text-1" style="width: 120rpx;">
									{{item.box.publisher}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 没有更多 -->
			<view class="u-flex u-row-center u-p-b-30">
				<u-loadmore status="nomore" color="#333" />
			</view>
		</template>
		<!-- loading -->
		<my-loading v-if="loading" style="background-color: #fff;"></my-loading>
		<!-- 空状态 -->
		<empty mode="data" v-else-if="!loading && !list.length" style="background-color: #fff;"></empty>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		
		<u-mask :show="maskShow">
			<my-loading v-if="true" style="margin-top: 400rpx;"></my-loading>
		</u-mask>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				maskShow: false,
				tab_list: [{
					name: '藏品'
				}, {
					name: '盲盒'
				}, {
					name: '寄售中'
				}, {
					name: '已售出'
				}],
				current: 0,
				info: {},
				lists: [{
						img: '/static/lists5.png',
						name: '我的订单',
						url: '/pages/my/order'
					},
					// {
					// 	img: '/static/new/list1.png',
					// 	name: '我的盲盒订单',
					// 	url: '/pages/my/order?type=1'
					// },
					{
						img: '/static/lists6.png',
						name: '我的认证',
						url: ''
					},
					{
						img: '/static/lists10.png',
						name: '账号与安全',
						url: '/pages/my/info'
					},

					{
						img: '/static/lists1.png',
						name: '我的转赠记录',
						url: '/pages/my/circulation'
					},
					{
						img: '/static/lists7.png',
						name: '关于我们',
						url: '/pages/my/agreement?id=9'
					},

				],

				list: [], // 列表数据
				typeIndex: 0,
				scrollTop: 0

			}
		},
		onShow(e) {
			this.getinfo();
			// 获取数据
			this.change(this.current);
		},
		onLoad(e) {
			if(e.reg == 'true'){
				//重新获取数据
				this.util.request('user/index', {}, 'POST').then(res => {
					uni.setStorageSync('info', res)
					uni.setStorageSync('userInfo', res)
				})
				this.gomy_money()
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// 藏品
			async get_cang_pin() {
				this.list = await this.util.request('user/user_compound', {
					type: 1
				});
				this.loading = false;
			},
			// 盲盒
			async get_mang_he() {
				this.list = await this.util.request('user/user_box', {
					type: 1
				});
				this.loading = false;
			},
			// 寄售 || 售出
			async get_ji_shou(type) {
				this.list = await this.util.request('user/user_compound', {
					type
				});
				let arr = await this.util.request('user/user_box', {
					type
				});
				this.list = this.list.concat(arr);
				this.loading = false;
			},

			change(index) {
				this.current = index;
				this.list = [];
				this.loading = true;
				if (index == 0) {
					this.typeIndex = 0;
					// 藏品
					this.get_cang_pin();
				} else if (index == 1) {
					// 盲盒
					this.typeIndex = 0;
					this.get_mang_he();
				} else if (index == 2) {
					// 寄售中
					this.typeIndex = 1;
					this.get_ji_shou(2);
				} else {
					// 已售出
					this.typeIndex = 2;
					this.get_ji_shou(3);
				}

			},
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
					uni.getStorageSync('info', res)
					uni.getStorageSync('userInfo', res)
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
				let userInfo = uni.getStorageSync('info')
				
				
				//判断是否开户
				if(!userInfo.is_acctopen){
					//没有开户 访问开户接口
					this.maskShow = true
					this.util.request('Lianlian/openacct', {}).then(res => {
						//跳转url
						window.location.href=res.gateway_url
					})
					return
				}
				
				
				uni.navigateTo({
					// url: '/pages/my/my_money'
					url:'/pages/my/lianlian/wallet'
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


	.list_box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 30rpx;
		animation: show_list .3s linear;
		animation-fill-mode: forwards;

		.lists_box {
			margin-bottom: 30rpx;
			width: 330rpx;
			// width: 330rpx;
			// padding: 20rpx;
			background-color: #fff;
			box-shadow: 0px 20rpx 24rpx 0px rgba(0, 0, 0, 0.0313725508749485);
			border-radius: 10rpx;
			position: relative;

			.num {
				padding: 5rpx 15rpx;
				border-radius: 30rpx;
				background-color: rgba(0, 0, 0, 0.4);
				color: #fff;
				font-size: 26rpx;
				position: absolute;
				right: 30rpx;
				top: 260rpx;
			}

			.top_float {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				background-color: #FFFFFF;
				opacity: 0.5;
				border-radius: 20rpx 20rpx 0px 0px;
				position: absolute;
				left: 0;
				top: 0;
			}

			.min_img {
				border-radius: 6rpx;
				width: 330rpx;
				height: 330rpx;
			}

			.text {
				// padding: 20rpx 0 0rpx 8rpx;
				padding: 28rpx 0 34rpx 32rpx;
				font-size: 28rpx;
				font-family: Segoe UI-Bold, Segoe UI;
				font-weight: bold;
				color: #282828;


				.price {
					margin-top: 20rpx;
					font-size: 40rpx;
					font-weight: bold;
					color: #282828;
				}

				.num {
					font-size: 24rpx;
					font-weight: 400;
					color: #848484;
				}
			}
		}
	}



	.top-box {
		padding: 20rpx 30rpx;
		background: linear-gradient(307deg, #1E2127 0%, #3B3F47 100%);
		padding-bottom: 40rpx;

		.set {
			padding-top: 20rpx;
			display: flex;
			flex-direction: row-reverse;

			image {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.my {
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
				color: #FFFFFF;

				.hui {
					color: #9DA6AD;
					width: 182rpx;
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
		}

		.btn_box {
			margin-top: 44rpx;

		}
	}

	.my_box {
		display: flex;
		flex-wrap: wrap;
		border-radius: 0rpx;
		box-shadow: 0px 8rpx 24rpx 0px rgba(0, 0, 0, 0.019999999329447746);
		padding: 40rpx 0;
		background-color: #fff;

		.lists {
			text-align: center;
			font-size: 20rpx;
			font-family: Segoe UI-Regular, Segoe UI;
			font-weight: 400;
			color: #282828;
			width: 20%;

			image {
				width: 70rpx;
				height: 70rpx;
			}
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