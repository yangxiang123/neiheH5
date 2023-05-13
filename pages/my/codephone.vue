<template>
	<view class="">
		<view class="" style="padding: 120rpx 68rpx;">
			<view class="font40">
				重新核验手机号
			</view>
			<view class="margin-top-sm font26 col-999">
				请核验已绑定的手机号，以便更换新号码
			</view>
			<view style="margin-top: 101rpx;">
				<!-- 18839852291 -->
				<input type="tel" v-model="mobile" class="text-blue" style="font-size: 46rpx;" placeholder="请输入要修改的手机号">
			</view>
		</view>
		<view class="flex align-center justify-center" style="margin-top: 50rpx;">
			<view @click="sendcode" class="flex align-center justify-center font30 btnbggg" style="width: 484rpx;height: 82rpx;">
				发送短信验证码
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: ''
			}
		},
		methods: {
			sendcode(){
				if (this.util.checkPhone(this.mobile)) {} else {
					this.util.showToast("请输入正确手机号");
					return false;
				}
				this.util.request('sms/send', {
					mobile: this.mobile,
					event:'changemobile'
				}, 'POST').then(res => {
					this.util.showMsg('发送成功，请注意查收', 1000 , this.util.urlTo('phoneyz?phone=' + this.mobile));
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