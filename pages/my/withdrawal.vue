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
				提现金额
			</view>
			<view class="box">
				<view class="box_list" :class="price_act==index?'box_list2':'box_list'" v-for="(item,index) in price_list" @click="check_price(item,index)">{{item}}</view>
			</view>
			<view class="flex align-center padding-bottom-xs" style="border-bottom: solid #F7F7F7 1rpx;margin-top: 84rpx;">
				<view class="flex-sub">
					<input type="number" :disabled="is_deisable" v-model="amount" class="" placeholder="￥请输入整数" placeholder-class="font32 col-999" name="" id="">
				</view>
				<view class="">
					余额：￥{{user.money}}
				</view>
			</view>
		</view>
		<view class="bg-white radius20 margin-top-sm" style="padding: 39rpx 44rpx;padding-bottom: 81rpx;">
			<view class="font32">
				收款方式
			</view>
			<view class="flex align-center col-999">
				<view style="height: 64rpx;"></view>
				<view class="flex-sub">
					{{name}}
				</view>
				<view class="">
					{{account}}
				</view>
			</view>
			<view @click="util.urlTo('binding')" class="flex align-center justify-center radius20 font32" style="background-color: #F0F0F0;width: 616rpx;height: 100rpx;margin-top: 20rpx;">
				添加收款方式
			</view>
		</view>
		<view class="font26 col-999 letter padding" style="line-height: 40rpx;">
			<view class="margin-top-sm">
				1、支付要求，提现金额最低为{{sitesinfo.min_withdraw}}元
			</view>
			<view class="margin-top-sm">
				2、银行卡：T+1工作日完成到账，节假日顺延
			</view>
			<view class="margin-top-sm">
				3、提现的账户姓名必须与账户实名信息一致，否则会
				打款失败，退回至账户余额
			</view>
		</view>
		
		<view class="flex align-center justify-center" style="margin-top: 88rpx;">
			<view @click="submit" class="btnbggg font30" style="width: 484rpx;height: 82rpx;">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payType: 1,
				amount: null,
				user: {},
				sitesinfo: {},
				name: '',
				account: '',
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
			this.getbinding();
		},
		methods: {
			check_price(item,index){
				this.price_act = index
				if(index != 8){
					this.is_deisable = true
					this.amount = item
				}else{
					this.amount = ''
					this.is_deisable = false
				}
			},
			getbinding(){
				this.util.request('user/bind_bank', {}, 'get').then(res => {
					this.name = res.bank_name;
					this.account = res.bank_account;
				})
			},
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.user = res;
				})
			},
			submit(){
				if(!this.amount){
					this.util.showToast('请输入有效提现金额');
					return false
				}
				if(this.amount < this.sitesinfo.min_withdraw){
					this.util.showToast('输入金额小于最小提现金额');
					return false
				}
				uni.showLoading({
					title: '加载中',
					mask:true
				})
				this.util.request('money/withdraw', {
					amount: this.amount
				}, 'POST').then(res => {
					this.amount = null;
					uni.hideLoading()
					this.util.showToast('申请提现成功')
				})
			},
			getsitesinfo(){
				this.util.request('common/sitesinfo', {}, 'POST').then(res => {
					this.sitesinfo = res;
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
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
</style>