<template>
	<view class="page" v-if="all">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">
				{{all.goods_name}}
			</block>
		</cu-custom>
			
	
		<view class="goods_img">
			<view class="image">
				<image :src="all.goods_image" mode="aspectFill"></image>
			</view>
		</view>

		<!-- 作品故事 -->
		<view class="bot_content">
			<view class="name_box">
				<view class="name_top">
					￥<text class="bing">{{all.goods_price}}</text>
				</view>

				<view class="name_bot">
					<view class="title">{{all.goods_name}}</view>
					<view class="bot">
						<view class="flex align-center" style="font-size: 20rpx;margin-top: 10rpx;">
							<view class="left flex justify-center align-center">
								限量
							</view>
							<view class="right flex justify-center align-center  ">
								{{all.limit_number}}
							</view>
						</view>
						<view class="flex align-center u-m-l-50" style="font-size: 20rpx;margin-top: 10rpx;">
							<view class="left flex justify-center align-center">
								持有
							</view>
							<view class="right flex justify-center align-center  ">
								{{all.hold_number}}
							</view>
						</view>
						<!-- <view class="flex align-center u-m-l-50" style="font-size: 20rpx;margin-top: 10rpx;">
							<view class="left flex justify-center align-center">
								剩余
							</view>
							<view class="right flex justify-center align-center  ">
								{{all.show_surplus_number}}
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<view class="middle">
				<view class="mid_top u-flex u-row-between">
					<view class="box">
						<view class="name">品牌方</view>
						<view class="bot">
							<view class="bot_left">
								<image src="/static/logo.png" mode=""></image>
								熊猫艺术
							</view>
							<!-- <image src="/static/new/right.png" mode="" class="right_img"></image> -->
						</view>
					</view>
					<view class="box">
						<view class="name">创作者</view>
						<view class="bot">
							<view class="bot_left" v-if="all && all.publisher_info">
								<image :src="all.publisher_info.avatar" mode=""></image>
								{{all.publisher_info.name}}
							</view>

							<!-- <image src="/static/new/right.png" mode="" class="right_img"></image> -->
						</view>
					</view>
				</view>
				<view class="mide_bot">
					<view class="list">
						<view class="">所属专辑</view>
						<view class="list_right">{{all.class_name_text}}</view>
					</view>
					<view class="list" style="border-bottom:0px solid #ccc;">
						<view class="">发布时间</view>
						<view class="list_right">{{all.publish_time_text}}</view>
					</view>
				</view>
			</view>



			<view class="bg-white  margin-top-lg" style="padding:40rpx 30rpx;padding-top:0; ">
				<view class="miao_tit">作品详情</view>
				<view class="padding">
					<rich-text :nodes="all.goods_details"></rich-text>
				</view>

			</view>
		</view>
		<!-- 购买须知 -->
		<view class="padding margin-top-lg  bg-white" style="margin-bottom:20rpx;">
			<view class="font32">
				购买须知
			</view>
			<view class="margin-top-sm text-sm text999 letter" style="line-height: 42rpx;">
				<rich-text :nodes="payText"></rich-text>
			</view>
		</view>
		<view class="mar28 text-center text999 text-sm">
			{{base.support}}
			<view class="">
				{{base.beian}}
			</view>
		</view>
		<!-- 按钮 -->
		<view class="padding-sm foot-box bg-white text-center flex align-center justify-center"
			style="box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.12);">

			<view class="u-flex align-center justify-between bot_buy" >
				<view class="bot_price">￥{{all.goods_price}}</view>
				<view class="bot_btn" v-if="all.oneself==0 && show_pay && all.is_sell_out == 0"
					v-show="all.goods_number!=0 " @click="submit">立即购买</view>
			</view>


			<view @click="toshichang" class="btnbggg font34" style="width: 580rpx;height: 90rpx;"
				v-show="all.goods_number==0 || all.is_sell_out == 1">
				进入市场
			</view>



		</view>
		<!-- <btn-modal :show="btnShow" :list="['支付宝','微信','余额']" @btnModalTab="btnModalTab"></btn-modal> -->

		<!-- 支付密码弹窗 -->
		<view class="cu-modal" :class="modalName=='payModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="action" @tap="modalName=null">
						<view class="content">请输入支付密码</view>
						<text class="cuIcon-close col-999"></text>
					</view>
				</view>
				<view class=" bg-white flex justify-center" style="padding: 30upx 0 70upx 0;">
					<jpCoded ref="jpcode" style="height: 80rpx;" @inputVal="inputVal" :codes="codes" :width="width">
					</jpCoded>
				</view>
			</view>
		</view>

		<tfgg-verify :shows="sliderVerifyFLag" @result="success" @change="isShowimage"></tfgg-verify>
	</view>
</template>

<script>
	import jpCoded from '@/components/jp-coded/jp-coded.vue'
	export default {
		components: {
			jpCoded
		},
		data() {
			return {
				id: '',
				codes: '',
				width: 600,
				all: {
					goods: {}
				},
				btnShow: false,
				btnIndex: 0,
				user: {},
				type: 0,
				payText: '',
				modalName: '',
				sliderVerifyFLag: false,
				base: {},
				way: null,
				order_sn: '',
				show_pay: true
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.type = e.type;
			this.getData();
			this.getarticle();
			this.getBase()
		},
		onShow() {
			this.getUserInfo();
		},
		onPullDownRefresh() {
			this.getData();
			this.getarticle();
		},
		methods: {
			prevImg(img) {
				console.log(9999999999)
				console.log(img)
				let urls = []
				urls.push(img);
				uni.previewImage({
					urls
				})
			},
			toshichang() {
				uni.switchTab({
					url: '/pages/market/index'
				})
			},
			getBase() {
				this.util.request('common/sitesinfo').then(res => {
					this.base = res;
				})
			},
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.user = res;
				})
			},
			getData() {
				this.util.request('goods/goods_msg', {
					id: this.id
				}).then(res => {
					this.all = res;
					uni.stopPullDownRefresh()
				})
			},
			success(e) {
				this.util.request('rund_buy/befor_add_set', {
					goods_id: this.id
				}).then(res => {
					this.util.showToast('抽签成功');
					this.sliderVerifyFLag = false;
					this.getData();
				})
			},
			isShowimage(e) {
				this.sliderVerifyFLag = e;
				uni.showToast({
					title: '验证失败',
					icon: 'none'
				});
			},
			befor_add_set() {
				if (this.user.real == 0) {
					this.util.urlTo('../index/shiming');
				} else {
					this.sliderVerifyFLag = true;
				}
			},
			btnModalTab(e) {
				console.log(e)
				this.btnIndex = e;
				this.btnShow = false;
				if (this.btnIndex != -1) {
					console.log(1111111111)
					this.pay();
				}
				if (e == 2 && this.user.have_set_pwd == 0) {
					this.util.showMsg('您还未设置支付密码', 1000, this.util.urlTo('../my/psd'));
					return false
				}
				if (e == 2) {
					this.modalName = 'payModal';
					return false
				}
			},
			inputVal(e) {
				console.log(e)
				if (e.length == 6) {
					this.util.request('user/check_pay_available', {
						paypwd: e
					}).then(res => {

						this.pay2();
					})
				}
			},
			pay2() {
				this.util.request('order/order_pay', {
					order_sn: this.order_sn,
					pay_type: this.way
				}).then(res => {

					this.modalName = null;
					this.getData()
					this.util.showMsg('支付成功')
				})
			},
			pay() {
				this.way = 'alipay';
				if (this.btnIndex == 1) {
					this.way = 'wechat';
				} else if (this.btnIndex == 2) {
					this.way = 'balance';
				}
				this.util.request('order/advance_order', {
					// code: this.all.code,
					id: this.id,
					pay_type: this.way
				}).then(res => {
					if (this.btnIndex == 2) {
						console.log(res)
						this.order_sn = res.order_sn
					} else {
						if (res.redirectUrl) {
							this.util.urlTo('../pay/pay?url=' + res.redirectUrl)
						} else {
							this.util.showToast(res.cause);
						}
						// this.util.appPay(this.btnIndex, res).then(data => {
						// 	this.util.backTo(1, 2000);
						// })
					}
				})
			},
			submit() {
				this.show_pay = false
				uni.showLoading({
					title: '等待中',

				})
				if (this.user.real == 0) {
					this.show_pay = true
					uni.hideLoading()
					this.util.urlTo('../index/shiming');
				} else {
					this.util.request('order/advance_order', {
						id: this.id
					}).then(res => {
						this.show_pay = true
						uni.hideLoading()
						this.util.urlTo('../my/orderdetailed?id=' + res.order_sn);
					})
					// this.pay();
				}

				setTimeout(() => {
					this.show_pay = true
				}, 3000)
			},
			into(type, id) {
				uni.reLaunch({
					url: '/pages/DAO/DAO?type=' + type + '&id=' + id
				})
			},
			getarticle(e) {
				this.util.request('common/article', {
					id: 4
				}).then(res => {
					this.payText = res.content;
				})
			}
		}
	}
</script>

<style lang="scss">
	// .nav {
	// 	display: flex;
	// 	align-items: center;
	// 	min-height: 88rpx;
	// 	justify-content: space-between;
	// 	color: #444;
	// 	background-color: #fff;
	// 	font-size: 36rpx;
	// 	padding-bottom:20rpx;
	// }


	.middle {
		margin-top: -80rpx;
		padding: 0 30rpx;

		.mide_bot {
			padding: 20rpx 30rpx;
			border: 1rpx solid #ddd;
			border-radius: 36rpx;
			background: #fff;
			margin-top: 30rpx;

			.list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 28rpx 0;
				border-bottom: 1rpx solid #f0f0f0;
				
			
			
				.list_right {
					font-weight: 700;
					font-size: 28rpx;


					color: rgba(0, 0, 0, .8);
				}
			}
		}

		.box {
			width: 336rpx;
			height: 192rpx;
			padding: 40rpx 20rpx 24rpx 30rpx;
			background: #fff;
			border: 1rpx solid #ddd;
			border-radius: 36rpx;
			box-sizing: border-box;

			.name {
				font-weight: 700;
				font-size: 30rpx;
				line-height: 30rpx;
				letter-spacing: 1.17647rpx;
				color: #000;
			}

			.bot {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 25rpx;

				.bot_left {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #444;

					image {
						width: 72rpx;
						height: 72rpx;
						border-radius: 100%;
						margin-right: 20rpx;
					}
				}

				.right_img {
					width: 22rpx;
					height: 22rpx;
				}
			}
		}

	}

	.bot_buy {
		width: 100%;
		padding: 0 30rpx;

		.bot_price {
			font-size: 48rpx;
			color: #444;
			font-weight: 800;
		}

		.bot_btn {
			width: 390rpx;
			height: 88rpx;
			background: linear-gradient(270deg, #1a1a1a, rgba(21, 21, 21, .62));
			border-radius: 6rpx;

			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
		}

	}


	page {
		padding-bottom: 100rpx;

		background: #fff;
	}

	.goods_img {

		background: url('@/static/new/box_bg.png') no-repeat center;
		background-size: 100% 100%;
		min-height: 1120rpx;
		overflow: hidden;

		.image {
			position: relative;
			z-index: 102;
			display: block;
			width: 590rpx;
			margin: 220rpx auto 10rpx;
			padding: 9.16rpx 9.22rpx;
			background: #fff;

			border-radius: 20rpx;

			image {
				width: 572rpx;
				height: 572rpx;
			}


		}




	}

	.miao_tit {
		font-size: 32rpx;
		font-family: PingFang SC-中粗体, PingFang SC;
		font-weight: bold;
		color: #444444;

	}

	.bot_content {
		background-color: #fff;
		border-radius: 50rpx 50rpx 0 0;
		margin-top: -30rpx;
	}

	.name_box {
		background: linear-gradient(270deg, #1a1a1a, rgba(21, 21, 21, .62));

		border-radius: 30rpx;
		width: 690rpx;
		margin: 0 auto;
		position: relative;
		bottom: 140rpx;


		.name_top {
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;

			.bing {
				font-size: 56rpx;
				font-weight: 700;
			}

			font-weight: 600;
			font-size: 40rpx;
			color: #fff;
		}

		.name_bot {
			padding: 30rpx;
			border-radius: 30rpx;
			background-color: #fff;
			border: 1rpx solid #CCC;
		}

		.title {
			font-size: 40rpx;
			font-family: PingFang SC-中粗体, PingFang SC;
			font-weight: bold;
			color: #444444;
		}

		.bot {

			font-size: 24rpx;
			font-family: PingFang SC-常规体, PingFang SC;
			font-weight: normal;
			color: #9F9F9F;
			display: flex;
			align-items: center;

			.bot_right {
				margin-left: 60rpx;
			}
		}
	}



	.left {
		display: inline-block;
		margin-top: 23rpx;
		padding: 0 8rpx;
		height: 36rpx;
		font-style: normal;
		font-weight: 700;
		font-size: 24rpx;
		line-height: 36rpx;
		color: #441c02;
		background: linear-gradient(23.86deg, #ffccb8 -15.3%, #ffc582 96.5%);
	}

	.right {
		display: inline-block;
		margin-top: 23rpx;
		padding: 0 8rpx;
		height: 36rpx;
		font-style: normal;
		font-weight: 700;
		font-size: 24rpx;
		line-height: 36rpx;
		color: #b47528;
		background: rgba(240, 213, 182, .24);
	}


	.btn {
		background: url(../../static/market/btn.png) no-repeat;
		background-size: cover;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}
</style>
