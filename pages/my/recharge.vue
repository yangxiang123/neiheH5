<template>
	<view class="padding">
		<view class="bg-white flex align-center radius20" style="padding: 18rpx 31rpx;">
			<view class="flex-sub flex align-center">
				<image :src="user.avatar" style="width: 71rpx;height: 71rpx;border-radius: 50%;" mode=""></image>
				<view class="padding-left-sm font30">
					{{user.nickname}}
				</view>
			</view>
			<view class="font26 col-999">
				金额：{{user.money}}
			</view>
		</view>
		<view class="bg-white radius20 margin-top-sm" style="padding: 39rpx 44rpx;padding-bottom: 81rpx;">
			<view class="font32">
				充值金额
			</view>
			<view class="box">
				<view class="box_list" :class="price_act==index?'box_list2':'box_list'" v-for="(item,index) in price_list" @click="check_price(item,index)">{{item}}</view>
			</view>
			<view class="flex align-center radius20"
				style="border: solid #F7F7F7 1rpx;padding: 37rpx 30rpx;margin-top: 33rpx;">
				<input type="number" v-model="money" style="border: none;" :disabled="is_deisable"
					:placeholder="'充值金额需大于' + sitesinfo.min_topup + '元'" placeholder-class="font32 col-999"
					class="flex-sub" >
				<view class="col-999 font30">
					￥
				</view>
			</view>
		</view>
		<view class="bg-white radius20 margin-top-sm" style="padding: 39rpx 44rpx;padding-bottom: 81rpx;">
			<view class="flex flex-between align-center">
				
				<view class="font32">支付方式</view>
				<!-- <view class="font20" @click="util.urlTo('bank_list')" style="color: #0042FF;">绑定银行卡></view> -->
			</view>
			<!-- <view class="flex align-center" @tap="payType=-1" style="margin-top: 51rpx;">
				<image src="../../static/zfbpay.png" mode="" style="width: 70upx;height: 70upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					支付宝-快捷充值
				</view>
				<radio :checked="payType==-1" color="#3b3f47" style="transform: scale(.7);"></radio>
			</view> -->
			
			
			
			
			
			
			<!-- <view class="flex align-center margin-top" @tap="payType=-1" style="margin-top: 51rpx;">
				<image src="/static/yhk.png" mode="" style="width: 64upx;height: 64upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					杉德支付
				</view>
				<radio :checked="payType==-1" color="#3b3f47" style="transform: scale(.7);"></radio>
			</view> -->
			<!-- 汇元快捷 -- 银行卡列表    还需要开启银行卡列表获取getList() -->
			<view class="flex align-center margin-top" v-for="(item,index) in list" @tap="payType=item.id"
				style="margin-top: 51rpx;">
				<image src="/static/my/yuer.png" mode="" style="width: 64upx;height: 64upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					{{item.bank_name}}--{{item.bank_card}}
				</view>
				<radio :checked="payType==item.id" color="#3b3f47" style="transform: scale(.7);"></radio>
			</view>
			
			
			
			<!-- 	<view class="flex align-center" @tap="payType=0" style="margin-top: 51rpx;">
				<image src="../../static/zfbpay.png" mode="" style="width: 70upx;height: 70upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					
					支付宝充值
				</view>
				<radio :checked="payType==0" color="#0042FF" style="transform: scale(.7);"></radio>
			</view>
			<view class="flex align-center" @tap="payType=1" style="margin-top: 51rpx;">
				<image src="../../static/yhk.png" mode="" style="width: 70upx;height: 70upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					
					银行卡充值
				</view>
				<radio :checked="payType==1" color="#0042FF" style="transform: scale(.7);"></radio>
			</view>
			<view class="flex align-center" @tap="payType=2" style="margin-top: 51rpx;">
				<image src="../../static/zfbpay.png" mode="" style="width: 70upx;height: 70upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					
					支付宝-快捷充值
				</view>
				<radio :checked="payType==2" color="#0042FF" style="transform: scale(.7);"></radio>
			</view> -->
			<!-- <view class="flex align-center margin-top" @tap="payType=2">
				<image src="../../static/my/yuer.png" mode="" style="width: 35upx;height: 35upx;"></image>
				<view class="margin-left-sm flex-sub">
					余额
				</view>
				<radio :checked="payType==2" color="#0EADFF" style="transform: scale(.7);"></radio>
			</view> -->
		</view>

		<view class="flex align-center justify-center" style="margin-top: 150rpx;">
			<view @click="paySubmit2" class="btnbggg font30" style="width: 484rpx;height: 82rpx;">
				确定
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
				<view class="btnbggg" style="width:100%;margin-top:80rpx;" @click="submit2">提交</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payType: -1,
				money: null,
				user: {},
				sitesinfo: {},
				pay_type: 'ALIPAY',
				list: [],
				link_url: '',
				code: '',
				show: false,
				price_list: [10,
					50,
					100,
					200,
					500,
					1000,
					2000,
					5000,
					'自定义'
				],
				price_act:8,
				is_deisable:false
				


			}
		},
		onLoad(e) {
		},
		onShow() {
			this.getUserInfo();
			this.getsitesinfo();
			// 汇元快捷需开启绑定银行卡列表接口获取
			this.getlist()
		},
		methods: {
			check_price(item,index){
				this.price_act = index
				if(index != 8){
					this.is_deisable = true
					this.money = item
				}else{
					this.money = ''
					this.is_deisable = false
				}
			},
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.user = res;
				})
			},
			getlist() {
				this.util.request('user/signed_bank_card', {

				}).then(res => {
					uni.stopPullDownRefresh()
					this.list = this.list.concat(res);
				})
			},
			submit2() {
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
						this.util.request('money/topup', {
							money: this.money,
							pay_type: 'bank',
							// user_id: gdx.user_id,
							// card: this.payType
						}).then(res => {
							// return
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
						this.util.request('money/topup', {
							money: this.money,
							pay_type: 'heepay',
							user_id: gdx.user_id,
							card: this.payType
						}).then(res => {
							this.link_url = res.response
							this.show = true
							// uni.setStorageSync('url', res.url);
							// this.util.urlTo('../pay/pay');
						})
					})
				}
			},
			submit() {
				if (!this.money) {
					this.util.showToast('请输入有效充值金额');
					return false
				}
				if (this.payType == 2) {
					// #ifdef H5
					this.util.request('money/topup', {
						pay_type: 'quick_alipay',
						money: this.money,
						client_type: 'h5'
					}).then(res => {
						// console.log(res.response.data)
						uni.setStorageSync('link', res.response.data);
						this.util.urlTo('../pay/base?url=' + res.response.data);
					})
					// #endif
				} else {
					this.util.request('money/topup', {
						pay_type: this.payType == 0 ? 'sd' : 'bank',
						money: this.money
					}).then(res => {
						uni.setStorageSync('url', res.response);
						this.util.urlTo('../pay/pay');
					})
				}

				// if (this.payType == 1) {
				// 	this.pay_type = 'ALIPAY'
				// } else {
				// 	this.pay_type = 'WECHAT'
				// }
				// this.util.request('money/topup', {
				// 	money: this.money,
				// 	pay_type:  this.pay_type
				// }, 'POST').then(res => {
				// 	if (res.response) {
				// 		if (this.pay_type = 'ALIPAY') {
				// 			this.util.urlTo('../pay/pay?url=' + res.response)
				// 		} else {
				// 			const platform = uni.getSystemInfoSync().platform;

				// 			if (platform == 'android') {
				// 				window.open(res.response);
				// 			} else {
				// 				window.location.href = res.response;
				// 			}
				// 		}

				// 	} else {
				// 		this.util.showToast(res.cause);
				// 	}
				// 	// this.money = null;
				// 	// this.util.showToast(res.msg)
				// })
			},
			getsitesinfo() {
				this.util.request('common/sitesinfo', {}, 'POST').then(res => {
					this.sitesinfo = res;
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}
	
	.box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		
		.box_list{
			width:180rpx;
			height:80rpx;
			border:1rpx solid #ccc;
			text-align: center;
			line-height:80rpx;
			margin-top:20rpx;
		}
		.box_list2{
			width:180rpx;
			height:80rpx;
			background-color: #3b3f47;
			color: #fff;
			text-align: center;
			line-height:80rpx;
			margin-top:20rpx;
		}
		
	}

	.input {
		background: #F6F6F6;
		border-radius: 163rpx;
		padding: 20rpx 38rpx;
		margin-bottom: 40rpx;
	}
</style>
