<template>
	<view class="page">
		<view class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 35rpx 22rpx;">
			<view class="flex align-center flex-sub">
				<image src="/static/login/psd.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<view class="padding-left-sm">
					<input type="number" v-model="psd" maxlength="6" placeholder="请设置六位数支付密码" placeholder-class="font26">
				</view>
			</view>
		</view>
		<view class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 35rpx 22rpx;position: relative;">
			<view class="flex align-center flex-sub">
				<image src="/static/login/yzm.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<view class="padding-left-sm" style="" flex>
					<input type="number" v-model="psds" maxlength="6" placeholder="请输入验证码" placeholder-class="font26">
					
				</view>
			</view>
			<view @click="sendcode" class="text-blue font26 code" style="margin-top: 19rpx;">
				{{showText==true ? security_code : second+'s'}}
			</view>
		</view>
		
		<view class="flex align-center justify-center">
			<view @click="save" class="btnbggg" style="margin-top: 208rpx;">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				psd: '',
				psds: '',
				user: {},
				showText: true,
				security_code: '获取验证码',
				second: 60,
			}
		},
		onLoad(e) {
	
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			sendcode() {
				if(!this.showText){
					return false;
				}
				if (this.util.checkPhone(this.user.mobile)) {} else {
					this.util.showToast("请输入正确手机号");
					return false;
				}
				this.util.request('sms/send', {
					mobile: this.user.mobile,
					event:'buypwd'
				}, 'POST').then(res => {
					this.util.showToast('发送成功，请注意查收');
					this.getCode();
				})
			},
			getCode() { //倒计时
				this.showText = false
				var interval = setInterval(() => {
					let times = --this.second
					this.second = times < 10 ? '0' + times : times //小于10秒补 0
				}, 1000)
				setTimeout(() => {
					clearInterval(interval)
					this.second = 60
					this.showText = true
				}, 60000)
			},
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.user = res;
				})
			},
			save(){
				if(this.psd.length > 6){
					this.util.showToast('请设置六位数支付密码');
					return false
				}

				this.util.request('user/paypassword', {
					mobile: this.user.mobile,
					password: this.psd,
					captcha: this.psds
				}, 'POST').then(res => {
					uni.navigateBack()
				})
			}
		}
	}
</script>

<style>
	.page{
		padding:40rpx;
	}
	.code{
		position: absolute;
		right:30rpx;
		top:20rpx;
	}
</style>