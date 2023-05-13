<template>
	<view class="page" v-if="all">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">
				{{all.box.box_name}}
			</block>
		</cu-custom>
		<view class="goods_img">
			<view class="image">
				<image :src="all.box.box_image" mode="aspectFill"></image>
			</view>
		
		</view>


		<!-- 拥有者 -->

		<view class="bot_content" >
			<view class="name_box">
				<view class="name_top">
					￥<text class="bing">{{all.box.box_price}}</text>
				</view>
				<view class="name_bot">
					<view class="title">{{all.box.box_name}}</view>
					<view class="bot">
						<view class="flex align-center" style="font-size: 20rpx;margin-top: 10rpx;">
							<view class="left flex justify-center align-center">
								限量
							</view>
							<view class="right flex justify-center align-center  ">
								{{all.box.limit_number}}
							</view>
						</view>
						<!-- <view class="flex align-center u-m-l-50" style="font-size: 20rpx;margin-top: 10rpx;">
							<view class="left flex justify-center align-center">
								流通
							</view>
							<view class="right flex justify-center align-center  ">
								{{all.box.limit_number}}
							</view>
						</view> -->
			
			
					</view>
				</view>
			
			</view>
			
			<view class="bg-white  " style="padding:40rpx 30rpx;padding-top:0;">
				<!-- <view class="miao_tit">作品详情</view> -->
				<view class="padding">
					<rich-text :nodes="all.box.box_details"></rich-text>
				</view>
				<!-- <view class="col-999">
					<view class="flex align-center">
						<view class="flex-sub  font26">
							发行方
						</view>
						<view class="">
							{{all.publisher}}
						</view>
					</view>
					<view class="flex align-center margin-top-sm">
						<view class="font26 flex-sub">
							发行日期
						</view>
						<view class="">
							{{all.publish_time_text}}
						</view>
					</view>
				</view> -->
			</view>
		</view>
		<view class="padding margin-top-lg  bg-white" style="margin-bottom:20rpx;">
			<view class="font32" style="color: #444;font-weight:600;">
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
			<view class="u-flex align-center justify-between bot_buy" v-if="all.oneself==0 && all.box.is_sell_out == 0">
				<view class="bot_price">￥{{all.box_price}}</view>
				<view class="bot_btn" @click="submit">立即购买</view>
			</view>
			<view @click="repeal" class="btnbggg" style="width: 580rpx;height: 78rpx;"
				v-if="all.oneself==1 && all.status==3">

				<view class="font34">
					取消转售
				</view>
			</view>
			<view class="flex align-center w-all justify-around" v-show="all.oneself==1 && all.status==1">
				<view @click="util.urlTo('/pages/my/conversion?type=2&id=' + all.id)" style="width: 210rpx;height: 78rpx;" class="btnbggg"
					v-show="all.status==1">

					<view class="font28">
						转赠
					</view>
				</view>
				<view @click="util.urlTo('/pages/my/resale?type=2&id=' + all.id)"
					class="btnbggg margin-lr-sm flex align-center justify-center" style="width: 210rpx;height: 78rpx;" v-show="all.status==1">

					<view class="font28 ">
						转售
					</view>
				</view>
				<view @click="open" class="btnbggg" style="width: 210rpx;height: 78rpx;" v-if="all.status==1">
					
					<view class="font28 padding-left-xs">
						拆盲盒
					</view>
				</view>
			</view>
		</view>

		<!-- 发布声明弹窗 -->
		<!-- <view class="cu-modal" :class="modalName=='Modal'?'show':''" style="z-index: 99999;">
			<view class="cu-dialog radius20 smbg po-rela bg-white" @click.stop>
				<view class="text-left" style="padding: 40rpx 60rpx 80rpx;border-bottom: solid 1rpx #F7F7F7;">
					<view class="font34 text-center">
						确定回收
					</view>
					<view class="" style="margin-top: 53rpx;">
						藏品：{{all.box.box_name}}
					</view>
					<view class="" style="margin-top: 53rpx;">
						价格：{{all.box_price}}元
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
		
		<view class="cu-modal" :class="modalName=='chai'?'show':''" style="z-index: 99999;" v-if="gift">
			<view class="cu-dialog bg-white padding-xl">
				<image :src="gift.goods_image" mode="aspectFit" style="width: 400upx;height: 400upx;" class="radius20">
				</image>
				<view class="margin-top">
					恭喜您获得[<text class="mycyan">{{gift.goods_name}}</text>]
				</view>
				<button class="cu-btn lg radius14 bgcyan margin-top" @tap="util.backTo()">确定</button>
			</view>
		</view>

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
					box: {}
				},
				btnShow: false,
				btnIndex: 0,
				user: {},
				type: 0,
				payText: '',
				base:{},
				way:'',
				order_sn:'',
				gift:null,
				show_pay:true

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
			open() {
				this.util.request('goods/open_box', {
					id: this.id
				}).then(res => {
					this.gift = res;
					this.modalName = 'chai';
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
					// url: './index?classid=' + this.all.box.box_class + '&id=' + this.all.box_id
					url: './index',
					success: function(res) {
						console.log(res)
						getApp().globalData.paramsData = {
							classid: that.all.box.box_class,
							id: that.all.box_id
						};
					}
				})
			},
			huishou() {
				this.util.request('hui_shou/huishou_box', {
					box_code_id: this.id
				}).then(res => {
					this.util.showToast('操作成功', true)
				})
			},
			getData() {
				this.util.request('goods/box_details', {
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
					id: this.all.box_id,
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
					title:'等待中',
					
				})
				if (this.user.real == 0) {
					this.show_pay = true
					uni.hideLoading()
					this.util.urlTo('../index/shiming');
				} else {
					this.util.request('order/box_order', {
						code: this.all.code,
						id: this.all.box_id,
					}).then(res => {
						this.show_pay = true
						uni.hideLoading()
						this.util.urlTo('../my/orderBoxDetail?id=' + res.order_sn);
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
		.bot_btn{
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
		min-height:1120rpx;
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
