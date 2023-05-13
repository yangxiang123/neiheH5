<template>
	<view class="">
		<view class="top_hei">
			<view class="nav">{{all.order_status_text}}</view>
			<view class="hui" v-if="all.order_status == 0">
				剩余支付时间:{{timeEnd}}
			</view>
		</view>
		<!-- <view class="flex align-center pad24 justify-between">
			<view class="flex align-center">
				<image v-if="all.order_status == 0" src="../../static/my/dfk.png" style="width: 40rpx;height: 40rpx;"
					mode=""></image>
				<image v-if="all.order_status == 1" src="../../static/my/jycg.png" style="width: 40rpx;height: 40rpx;"
					mode=""></image>
				<image v-if="all.order_status == 2" src="../../static/my/yqx.png" style="width: 40rpx;height: 40rpx;"
					mode=""></image>
				<view class="padding-left-sm font36">
					{{all.order_status_text}}
				</view>
			</view>

			<button class="cu-btn" style="border-radius:50rpx;background-color:#c4c4c4;" v-show="all.order_status==0"
				@tap="close_pay">取消支付</button>
		</view> -->
		<view class="padding bot_bg">
			<view class="flex align-center margin-top-sm bg-white pad24 radius20">
				<image :src="all.goods.goods_image" style="width: 160rpx;height: 160rpx;border-radius: 20rpx;"
					mode="aspectFill">
				</image>
				<view class="padding-left-sm flex-sub">
					<view class="font30">
						{{all.goods.goods_name}}
					</view>
					<view class="flex align-center flex-sub" style="margin-top: 48rpx;">
						<view class="flex align-center flex-sub" style="font-size: 20rpx;">
							<view class="left flex justify-center align-center">
								编号
							</view>
							<view class="right flex justify-center align-center text-white">
								{{all.goods_code}}
							</view>
						</view>
						<view class="font32" style="color:  #3b3f47;">
							￥{{all.order_amount}}
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white radius20 margin-top-sm" style="padding: 32rpx 41rpx;">
				<view class="font30">
					订单信息
				</view>
				<view class="font26 col-999" style="margin-top: 32rpx;">
					订单金额：￥{{all.order_amount}}
				</view>
				<view class="font26 col-999" style="margin-top: 32rpx;">
					订单编号：{{all.order_sn}}
					<image @click="util.copy(all.order_sn)" src="../../static/my/copy.png"
						style="width: 20rpx;height: 22rpx;margin-left: 10rpx;" mode=""></image>
				</view>
				<view class="font26 col-999" style="margin-top: 23rpx;">
					创建时间：{{all.order_time_text}}
				</view>
				<view v-if="all.order_status_text == '已完成'" class="font26 col-999" style="margin-top: 23rpx;">
					付款时间：{{all.pay_time_text}}
				</view>
				<view v-if="all.order_status_text == '已完成'" class="font26 col-999" style="margin-top: 23rpx;">
					支付方式：{{all.pay_type_text}}
				</view>
				<!-- <view v-if="all.order_status_text == '已完成'" class="font26 col-999" style="margin-top: 23rpx;">
				支付流水：{{all.out_sn}}
			</view> -->
			</view>
			<view v-if="all.order_status==0" class="bg-white radius20 margin-top-sm"
				style="padding: 39rpx 44rpx;padding-bottom: 41rpx;">
				<view class="font32">
					支付方式
				</view>
				<!-- <view class="flex align-center margin-top" v-for="(item,index) in list" @tap="payType=item.id"
					style="margin-top: 51rpx;">
					<image src="../../static/my/yuer.png" mode="" style="width: 64upx;height: 64upx;"></image>
					<view class="margin-left-sm flex-sub font30">
						{{item.bank_name}}--{{item.bank_card}}
					</view>
					<radio :checked="payType==item.id" color="#3b3f47" style="transform: scale(.7);"></radio>
				</view> -->




				
				<!-- <view class="flex align-center" @tap="payType=-2" style="margin-top: 51rpx;">
					<image src="../../static/zfbpay.png" mode="" style="width: 70upx;height: 70upx;"></image>
					<view class="margin-left-sm flex-sub font30">
						支付宝-快捷充值
					</view>
					<radio :checked="payType==-2" color="#3b3f47" style="transform: scale(.7);"></radio>
				</view> -->
				
				
				
				
				<view class="flex align-center margin-top" @tap="payType=0" style="margin-top: 51rpx;">
					<image src="../../static/my/yuer.png" mode="" style="width: 64upx;height: 64upx;"></image>
					<view class="margin-left-sm flex-sub font30">
						余额
					</view>
					<radio :checked="payType==0" color="#3b3f47" style="transform: scale(.7);"></radio>
				</view>
				<!-- <view class="flex align-center margin-top" @tap="payType=-1" style="margin-top: 51rpx;">
					<image src="/static/yhk.png" mode="" style="width: 64upx;height: 64upx;"></image>
					<view class="margin-left-sm flex-sub font30">
						杉德支付
					</view>
					<radio :checked="payType==-1" color="#3b3f47" style="transform: scale(.7);"></radio>
				</view> -->
				<!-- 汇元快捷 -- 银行卡列表   需开启getList()获取银行卡列表 -->
				<view class="flex align-center margin-top" v-for="(item,index) in list" @tap="payType=item.id"
					style="margin-top: 51rpx;">
					<image src="/static/my/yuer.png" mode="" style="width: 64upx;height: 64upx;"></image>
					<view class="margin-left-sm flex-sub font30">
						{{item.bank_name}}--{{item.bank_card}}
					</view>
					<radio :checked="payType==item.id" color="#3b3f47" style="transform: scale(.7);"></radio>
				</view>
				
				
				
				
				
				<!-- <view class="flex align-center margin-top" @tap="payType=1" style="margin-top: 51rpx;">
				<image src="../../static/zfbpay.png" mode="" style="width: 64upx;height: 64upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					支付宝
				</view>
				<radio :checked="payType==1" color="#0042FF" style="transform: scale(.7);"></radio>
			</view> -->

				<!-- <view class="flex align-center margin-top" @tap="payType=3" style="margin-top: 51rpx;">
				<image src="../../static/zfbpay.png" mode="" style="width: 64upx;height: 64upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					支付宝-快捷
				</view>
				<radio :checked="payType==3" color="#0042FF" style="transform: scale(.7);"></radio>
			</view> -->
			</view>

			<view class="" style="height: 120rpx;"></view>
			<!-- 取消   继续购买 -->
			<!-- <view v-if="all.order_status_text == '已取消'" class="flex align-center justify-center">
			<view class="btnbg" style="width: 484rpx;height: 82rpx;">
				继续购买
			</view>
		</view> -->
			<!-- 支付   确认支付 -->
			<view v-if="all.order_status == 0" class="foot-box flex align-center justify-between bg-white"
				style="padding: 24rpx 28rpx;">
				<!-- <view class="flex-sub font32 padding-left-lg" style="color: #F3A715;">
					￥{{all.order_amount}}
				</view> -->
				<view class="close" @click="close_pay">取消支付</view>

				<view class="btnbggg" style="width: 400rpx;" @click="paySubmit2">
					确定支付
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='payModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg292B2B justify-end">
					<view class="content">请输入操作密码</view>
					<view class="action" @tap="modalName='';clearPwd()">
						<text class="cuIcon-close text-black"></text>
					</view>
				</view>
				<view class="padding-top padding-bottom-xl" v-if="modalName=='payModal'">
					<validcode ref="pwd" :maxlength="6" :isPwd="true" @finish="inputVal"></validcode>
				</view>
			</view>
		</view>


		<u-popup v-model="show" mode="center" border-radius="25" closeable width="300px" height="300px">
			<view style="padding:50rpx 40rpx;padding-top:80rpx;">
				<view class="input">
					<u-input type="text" :disabled="true" maxlength="11" v-model="link_url"></u-input>
				</view>
				<view class="input">
					<u-input type="number" placeholder="请输入验证码" :password-icon="false" v-model="code"></u-input>
				</view>
				<view class="btnbggg" style="width:100%;margin-top:80rpx;" @click="submit">提交</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import jpCoded from '@/components/jp-coded/jp-coded.vue'
	import api from '@/common/api.js'
	export default {
		components: {
			jpCoded
		},
		data() {
			return {
				id: '',
				payType: 0,
				all: {
					goods: {}
				},
				timer: null,
				timeEnd: '',
				modalName: '',
				codes: '',
				width: 600,
				pwd: '',
				list: [],
				link_url: '',
				code: '',
				show: false
			}
		},
		onLoad(e) {
			
			e.id ? this.id = e.id : '';
			this.getinfo();
			// 汇元快捷需开启绑定银行卡列表接口获取
			this.getlist()
		},
		onUnload() {
			uni.$emit('refreshData');
		},
		onPullDownRefresh() {
			this.all = {
				goods: {}
			};
			this.getinfo();
		},
		methods: {
			getlist() {
				this.util.request('user/signed_bank_card', {

				}).then(res => {
					uni.stopPullDownRefresh()
					this.list = this.list.concat(res);
				})
			},
			close_pay() {
				let _this = this
				uni.showModal({

					content: '是否取消订单',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.util.request('order/cancel_order', {
								order_sn: _this.id,

							}).then(res => {
								_this.getinfo();
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			clearPwd() {
				this.$refs.pwd.clear();
			},
			submit() {
				this.util.request('pay/heepay_confirm_pay', {
					hy_token_id: this.link_url,
					code: this.code
				}).then(res => {
					this.show = false
					this.util.showMsg('支付成功')

					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)

					// this.link_url = res
					// this.show = true
					// uni.setStorageSync('url', res.url);
					// this.util.urlTo('../pay/pay');
				})
			},
			paySubmit2() {
				if (this.payType == 0) {
					this.getPass();
				} else if (this.payType == -1) {
					this.util.getUserInfo().then(gdx => {
						this.util.request('pay/pay_ment', {
							order_sn: this.id,
							pay_type: 'bank',
							// user_id: gdx.user_id,
							// card: this.payType
						}).then(res => {
							// this.link_url = res.url
							// this.show = true
							// #ifdef H5
							window.location.href = res.url
							// window.location.href = res.url.redirect_url;
							// #endif
							
							
							
							// #ifdef APP-PLUS
							uni.setStorageSync('url', res.url);
							// uni.setStorageSync('url', res.url.redirect_url);
							this.util.urlTo('../pay/pay');
							// #endif	
						})
					})
				}else if (this.payType == -2) {
					this.util.getUserInfo().then(gdx => {
						this.util.request('pay/pay_ment', {
							order_sn: this.id,
							pay_type: 'adapay_alipay',
							user_id: gdx.user_id,
							card: this.payType
						}).then(res => {
							// #ifdef H5
							window.location.href = res.response
							// #endif
							// #ifdef APP-PLUS
							uni.setStorageSync('url', res.response);
							this.util.urlTo('../pay/base');
							// #endif
						})
					})

				} else {
					this.util.getUserInfo().then(gdx => {
						this.util.request('pay/pay_ment', {
							order_sn: this.id,
							pay_type: 'heepay',
							user_id: gdx.user_id,
							card: this.payType
						}).then(res => {
							this.link_url = res.url
							this.show = true
							// uni.setStorageSync('url', res.url);
							// this.util.urlTo('../pay/pay');
						})
					})
				}
			},
			paySubmit() {
				if (this.payType == 0) {
					this.getPass();
				} else if (this.payType == 1 || this.payType == 2) {
					this.util.getUserInfo().then(gdx => {
						this.util.request('pay/pay_ment', {
							order_sn: this.id,
							pay_type: this.payType == 2 ? 'bank' : 'sd',
							user_id: gdx.user_id
						}).then(res => {
							uni.setStorageSync('url', res.url);
							this.util.urlTo('../pay/pay');
						})
					})
				} else if (this.payType == 3) {
					// #ifdef APP-PLUS
					this.util.getUserInfo().then(gdx => {
						this.util.request('pay/pay_ment', {
							order_sn: this.id,
							pay_type: 'quick_alipay',
							user_id: gdx.user_id,
							client_type: 'app'
						}).then(res => {
							uni.showToast({
								title: 'sdasdasd'
							})
						})
					})
					// #endif
					// #ifdef H5
					this.util.getUserInfo().then(gdx => {
						this.util.request('pay/pay_ment', {
							order_sn: this.id,
							pay_type: 'quick_alipay',
							user_id: gdx.user_id,
							client_type: 'h5'
						}).then(res => {
							uni.setStorageSync('link', res.url.data);
							this.util.urlTo('../pay/base');
						})
					})
					console.log(1111111111111111)
					// #endif
				}
			},
			getPass() {
				this.util.getUserInfo().then(res => {
					if (res.pay_pwd == 1) {
						this.modalName = 'payModal';
					} else {
						this.util.showMsg('您还未设置支付密码', 1000, this.util.urlTo('../my/psd'));
					}
				})
			},
			inputVal(e) {
				console.log(e)
				let _this = this;
				this.pwd = e
				if (e.length == 6) {
					// this.util.request('user/check_pay_available', {
					// 	paypwd: e,
					// }, 'POST').then(res => {
					// 	console.log(res)
					// 	this.modalName = null;
					// 	if (res.code == 1) {
					// 		this.pay2();
					// 	} else {
					// 		uni.showModal({
					// 			content: '支付密码错误，请重试',
					// 			confirmText: '重试',
					// 			cancelText: '忘记密码',
					// 			success: function(res) {
					// 				if (res.confirm) {
					// 					console.log('用户点击确定');
					// 					this.modalName = 'payModal';
					// 				} else if (res.cancel) {
					// 					console.log('用户点击取消');
					// 					uni.navigateTo({
					// 						url: '/pages/my/psd'
					// 					})
					// 				}
					// 			}
					// 		});
					// 	}
					// 	// this.getlist();
					// })
					uni.request({
						url: `${api.apis}/api/user/check_pay_available`,
						// url: 'user/check_pay_available',
						data: {
							paypwd: e,
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Accept-Language': 'zh-cn',
							'token': uni.getStorageSync('token')
						},
						success(res) {
							console.log(res)
							_this.modalName = null;
							if (res.data.code == 1) {
								_this.pay2();
							} else {
								uni.showModal({
									content: '支付密码错误，请重试',
									confirmText: '重试',
									cancelText: '忘记密码',
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
											_this.modalName = 'payModal';
										} else if (res.cancel) {
											console.log('用户点击取消');
											uni.navigateTo({
												url: '/pages/my/psd'
											})
										}
									}
								});
							}
						},
						fail(err) {
							_this.showToast('加载失败，请检查网络');
						}
					})

				}
			},
			pay2() {
				this.util.request('order/order_pay', {
					order_sn: this.id,
					pay_type: 'balance',
					paypwd: this.pwd,
				}).then(res => {
					this.modalName = null;
					this.util.showMsg('支付成功')

					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)

				})
			},
			getinfo() {
				this.util.request('order/order_details', {
					order_sn: this.id

				}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					this.all = res;
					console.log(res)
					let _this = this;
					this.timer = setInterval(function() {
						_this.timeEnd = _this.util.secChange(_this.all.residue);
						if (_this.all.residue == 0) {
							_this.util.request('order/cancel_find', {
								order_sn: _this.all.order_sn
							}).then(res => {
								clearInterval(_this.timer);
								_this.getinfo();
							})
						}
						_this.all.residue--;
					}, 1000);
				})
			},

		}
	}
</script>

<style lang="scss">
	.bot_bg {
		background-color: #fff;
		border-radius: 30rpx 30rpx 0 0;
		position: relative;
		bottom: 30rpx;
	}

	.close {
		margin-right: 20rpx;
		background: transparent;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		border: 2rpx solid #000;
		-webkit-border-radius: 20rpx;
		-moz-border-radius: 20rpx;
		border-radius: 20rpx;
		color: #000;
		font-weight: 400;
		font-size: 28rpx;
		letter-spacing: 1rpx;
		width: 230rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
	}

	.top_hei {

		width: 100%;
		height: 320rpx;
		background: url('../../static/new/top_ng.png') no-repeat center;
		background-size: 100% 100%;
		text-align: center;

		.nav {
			padding-top: 100rpx;
			font-weight: 700;
			font-size: 44rpx;
			line-height: 60rpx;
			color: #fff;
		}

		.hui {
			margin-top: 20rpx;
			font-style: normal;
			font-size: 24rpx;
			line-height: 34rpx;
			font-weight: 400;
			text-align: center;
			letter-spacing: 3rpx;
			color: hsla(0, 0%, 100%, .6);
		}
	}

	.input {
		background: #F6F6F6;
		border-radius: 163rpx;
		padding: 20rpx 38rpx;
		margin-bottom: 40rpx;
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
</style>
