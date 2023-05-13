<template>
	<view class="padding">
		<view class="" style="padding: 140rpx 68rpx;">
			<view class="font40">
				输入短信验证码
			</view>
			<view class="font26 col-999 margin-top-sm" v-if="phone">
				验证码已发送至{{ym(phone)}}
			</view>
		</view>
		<view class="w-all">
			<messageinput v-model="code" mode="middleLine" :maxlength="4" @finish="submit"></messageinput>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payType: 1,
				code: '',
				phone: ''
			}
		},
		onLoad(e) {
			e.phone ? this.phone = e.phone : '';
		},
		methods: {
			ym(e){
				return this.util.phoneMask(e)
			},
			submit(e){
				this.util.request('user/changemobile', {
					mobile: this.phone,
					captcha: e
				}, 'POST').then(res => {
					this.util.showMsg('修改成功请重新登录', 1000 , this.util.toLogin());
				})
			}
		}
	}
</script>

<style>
</style>