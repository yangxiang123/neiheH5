<template>
	<view class="page" v-if="all">
			<u-navbar  :title="all.goods.goods_name"></u-navbar>
		
		<view class="goods_img">
			<view class="image">
				<image :src="all.goods.goods_image" mode="aspectFill"></image>
			</view>
		</view>

		<!-- 拥有者 -->

		<view class="bot_content">
			<view class="name_box">
				<view class="name_top">
					￥<text class="bing">{{all.goods_price}}</text>
				</view>
				<view class="name_bot">
					<view class="title">{{all.goods.goods_name}}</view>
					<view class="bot">
						<view class="flex align-center" style="font-size: 20rpx;margin-top: 10rpx;">
							<view class="left flex justify-center align-center">
								限量
							</view>
							<view class="right flex justify-center align-center  ">
								{{all.goods.limit_number}}
							</view>
						</view>
						<view class="flex align-center u-m-l-50" style="font-size: 20rpx;margin-top: 10rpx;">
							<view class="left flex justify-center align-center">
								持有
							</view>
							<view class="right flex justify-center align-center  ">
								{{all.goods.hold_number}}
							</view>
						</view>
						<!-- <view class="flex align-center u-m-l-50" style="font-size: 20rpx;margin-top: 10rpx;">
							<view class="left flex justify-center align-center">
								剩余
							</view>
							<view class="right flex justify-center align-center  ">
								{{all.goods.show_surplus_number}}
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
							<view class="bot_left" v-if="all && all.goods.publisher_info">
								<image :src="all.goods.publisher_info.avatar" mode=""></image>
								{{all.goods.publisher_info.name}}
							</view>
			
							<!-- <image src="/static/new/right.png" mode="" class="right_img"></image> -->
						</view>
					</view>
				</view>
				<view class="mide_bot">
					<view class="list">
						<view class="">所属专辑</view>
						<view class="list_right">{{all.goods.class_name_text}}</view>
					</view>
					<view class="list">
						<view class="">拥有者</view>
						<view class="list_right">{{all.goods.have_name}}</view>
					</view>
					<view class="list">
						<view class="">发布时间</view>
						<view class="list_right">{{all.goods.publish_time_text}}</view>
					</view>
					<view class="list"  style="border-bottom:0px solid #ccc;">
						<view class="">交易Hash</view>
						<view class="list_right">{{all.tx_hash}}</view>
					</view>
				</view>
			</view>

			<!-- <view class="bg-white  margin-top-lg" style="padding:0rpx 30rpx;">
				<view class="miao_tit">技术信息</view>
				<view class="margin-top-sm flex align-center justify-between" style="color: #9F9F9F;">
					<view class="">交易Hash</view>
					<view class="yincang" style="width:400rpx;word-break:break-all;">{{all.tx_hash}}</view>
				</view>
			</view> -->
			<view class="bg-white  margin-top-lg" style="padding:40rpx 30rpx;">
				<view class="miao_tit">作品详情</view>
				<view class="padding">
					<rich-text :nodes="all.goods.goods_details"></rich-text>
					
				</view>
				
			</view>
		</view>
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
		<view class="padding-sm foot-box bg-white text-center flex align-center justify-center"
			style="box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.12);">
			<view @click="submit" class="btnbggg font34" v-if="all.oneself==0 && show_pay"
				style="width: 580rpx;height: 90rpx;">
				<span class="font30">￥</span>{{all.goods_price}}
				<span class="padding-left-sm font34">立即购买</span>
			</view>
			<view @click="repeal" class="btnbggg" style="width: 580rpx;height: 78rpx;"
				v-if="all.oneself==1 && all.status==3">

				<view class="font34">
					取消转售
				</view>
			</view>
			<view class="flex align-center w-all justify-around" v-show="all.oneself==1 && all.status==1">
				<view @click="util.urlTo('/pages/my/conversion?type=1&id=' + all.id)" 	class="btnbggg margin-lr-sm flex align-center justify-center" style="width: 210rpx;height: 78rpx;"
					v-show="all.status==1">

					<view class="font28">
						转赠
					</view>
				</view>
				<view @click="util.urlTo('/pages/my/resale?type=1&id=' + all.id)"
					class="btnbggg margin-lr-sm flex align-center justify-center" style="width: 210rpx;height: 78rpx;"  v-show="all.status==1">

					<view class="font28 ">
						转售
					</view>
				</view>
			</view>
		</view>

		<!-- 发布声明弹窗 -->
		<!-- <view class="cu-modal" :class="modalName=='Modal'?'show':''" style="z-index: 1;">
			<view class="cu-dialog radius20 smbg po-rela bg-white" @click.stop>
				<view class="text-left" style="padding: 40rpx 60rpx 80rpx;border-bottom: solid 1rpx #F7F7F7;">
					<view class="font34 text-center">
						确定回收
					</view>
					<view class="" style="margin-top: 53rpx;">
						藏品：{{all.goods.goods_name}}
					</view>
					<view class="" style="margin-top: 53rpx;">
						价格：{{all.goods_price}}元
					</view>
				</view>
				<view class="flex align-center">
					<view @click="modalName=''" class="flex-sub col-999 flex align-center justify-center"
						style="padding: 36rpx 0rpx;border-right: solid 1rpx #F7F7F7;">
						取消
					</view>
					<view @click="huishou" class="flex-sub text-blue flex align-center justify-center"
						style="padding: 36rpx 0rpx;">
						确认
					</view>
				</view>
			</view>
		</view> -->

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

		<btn-modal :show="btnShow" :list="['支付宝','微信','余额']" @btnModalTab="btnModalTab"></btn-modal>
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
				codes: '',
				width: 600,
				modalName: '',
				id: '',
				all: {
					goods: {}
				},
				btnShow: false,
				btnIndex: 0,
				user: {},
				type: 0,
				payText: '',
				base: {},
				way: '',
				order_sn: '',
				show_pay: true
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.type = e.type;

			this.getarticle();
			this.getBase()
		},
		onShow() {
			this.getUserInfo();
			this.getData();
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
			repeal() {
				this.util.request('goods/cancel_turn', {
					id: this.id
				}).then(res => {
					this.util.showMsg('取消成功')
					this.getData()
				})
			},
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.user = res;
				})
			},
			getBase() {
				this.util.request('common/sitesinfo').then(res => {
					this.base = res;
				})
			},
			tomarket() {
				let that = this;
				uni.switchTab({
					// url: './index?classid=' + this.all.goods.goods_class + '&id=' + this.all.goods_id
					url: './index',
					success: function(res) {
						console.log(res)
						getApp().globalData.paramsData = {
							classid: that.all.goods.goods_class,
							id: that.all.goods_id
						};
					}
				})
			},
			huishou() {
				this.util.request('hui_shou/huishou_goods', {
					goods_code_id: this.id
				}).then(res => {
					this.util.showToast('操作成功', true)
				})
			},
			getData() {

				this.util.request('goods/goods_details', {
					id: this.id
				}).then(res => {
					this.all = res;
				})


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
					code: this.all.code,
					id: this.all.goods_id,
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
						code: this.all.code,
						id: this.all.goods_id,
					}).then(res => {
						this.show_pay = true
						uni.hideLoading()
						this.util.urlTo('../my/orderdetailed?id=' + res.order_sn);
					})
					// this.pay();
				}
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
	.middle {
		margin-top:-80rpx;
		padding:0 30rpx ;
	
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
				border-bottom: 1px solid #f0f0f0;
	
				.list_right {
					text-align: right;
					font-weight: 700;
					font-size: 28rpx;
					width:400rpx;word-break:break-all;
					
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
				margin-top:25rpx;
	
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
	.page {

		padding-bottom: 80px;
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
				border-radius: 20rpx;
				vertical-align: bottom ;
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
