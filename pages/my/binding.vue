<template>
	<view class="padding font30">
		<view class="bg-white radius20 flex align-center margin-bottom-lg" style="padding: 40rpx 25rpx;">
			<view class="flex align-center">
				真实姓名
			</view>
			<view class="font30 col-999 padding-left-lg flex-sub">
				<input type="text" v-model="name" :disabled="true" placeholder="请输入真实姓名" placeholder-class="font30 col-999">
			</view>
		</view>
		<view class="bg-white radius20 flex align-center margin-bottom-lg" style="padding: 40rpx 25rpx;">
			<view class="flex align-center">
				银行卡号
			</view>
			<view class="font30 col-999 padding-left-lg flex-sub">
				<input type="text" v-model="account" placeholder="请输入银行卡号" placeholder-class="font30 col-999">
			</view>
		</view>
		<view class="bg-white radius20 flex align-center margin-bottom-lg" style="padding: 40rpx 25rpx;">
			<view class="flex align-center padding-right-sm">
				开户行
			</view>
			<view class="font30 col-999 padding-left-lg flex-sub">
				<input type="text" v-model="opening" placeholder="请输入开户行名称" placeholder-class="font30 col-999">
			</view>
		</view>
		<view class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 40rpx 25rpx;">
			<view class="flex align-center">
				预留手机号
			</view>
			<view class="font30 col-999 padding-left-lg flex-sub">
				<input type="text" v-model="phone" placeholder="请输入银行预留手机号" placeholder-class="font30 col-999">
			</view>
		</view>
		<view class="pad24">
			<view class="">
				温馨提示:
			</view>
			<view class="margin-top-sm col-999">
				请绑定银行"一类卡"卡号，请勿绑定任何银行界定
				的二类卡、网商银行、虚拟卡号等，可能会导致付
				款、收款不成功！
			</view>
		</view>
		
		<view class="flex justify-center" style="margin-top: 122rpx;">
			<view @click="bang" class="btnbggg" style="width: 580rpx;height: 94rpx;border-radius: 6rpx;">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				phone: '',
				account: '',
				opening: ''
			}
		},
		onLoad(e) {
			this.getbinding()
		},
		methods: {
			getbinding(){
				this.util.request('user/bind_bank', {}, 'get').then(res => {
					if(res){
						this.name = res.bank_name;
						this.phone = res.bank_phone;
						this.account = res.bank_account;
						this.opening = res.bank_opening;
					}else{
						this.util.request('user/auth_info').then(req => {
							if(req.status == 1){
								this.name = req.name
							}else{
								this.util.showMsg('您还未通过实名认证,请前往实名', 2000,this.util.urlTo('../index/shiming'));
							}
						})
					}
				})
				
			
			},
			bang(){
				this.util.request('user/bind_bank', {
					name: this.name,
					phone: this.phone,
					account: this.account,
					opening: this.opening
				}, 'POST').then(res => {
					this.util.showToast('绑定成功', true)
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
</style>