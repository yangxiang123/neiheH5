<template>
	<view class="page">
		<cu-custom bgColor="transparent" :isBack="false"></cu-custom>
		<view class="top_box u-flex u-row-center">
			<view class="top_text u-flex u-row-center">
				<text>HELLO !</text>
				<text>WELCOME TO</text>
			</view>
			<image src="/static/nh/logo.png"></image>
			<view class="btn_text  u-flex u-row-center">
				优质艺术文创
			</view>
		</view>
		<view class="form">
			<!-- <view class="flex align-center">

					<view class="font26 padding-left-xs hui">
						账号
					</view>
				</view> -->
			<view class="inp">
				<input type="tel" v-model="mobile" placeholder="请输入手机号" placeholder-class="placesty">
			</view>
			<!-- <view class="flex align-center" style="margin-top: 46rpx;">

					<view class="font26 padding-left-xs hui">
						验证码
					</view>
				</view> -->
			<view class="flex align-center inp">
				<input type="tel" v-model="code" placeholder="请输入4位数验证码" placeholder-class="placesty" class=" flex-sub">
				<view style="width: 61rpx;"></view>
				<view @click="sendcode" class="font26" style="color: #5E5E5E;">
					{{showText==true ? security_code : second+'s'}}
				</view>
			</view>
			<!-- <view class="flex align-center" style="margin-top: 46rpx;">

					<view class="font26 padding-left-xs hui">
						设置密码
					</view>
				</view> -->
			<view class="inp">
				<input type="password" v-model="psd" placeholder="请输入密码" placeholder-class="placesty">
			</view>
			<!-- <view class="flex align-center" style="margin-top: 46rpx;">

					<view class="font26 padding-left-xs hui">
						确认密码
					</view>
				</view> -->
			<view class="inp">
				<input type="password" v-model="psds" placeholder="请再次输入6位数密码" placeholder-class="placesty">
			</view>
			<view style="margin-top: 60rpx;">
				<view @click="zhuce" class="submit font30">
					重置密码
				</view>

			</view>
		</view>
		<!-- 按钮 -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: false,
				second: 60,
				showText: true,
				security_code: '获取验证码',
				title: 'Hello',
				mobile: '',
				code: '',
				pid: null,
				psd: '',
				psds: ''
			}
		},
		onLoad(e) {

		},
		methods: {
			sendcode() {
				if (!this.showText) {
					return false;
				}
				if (this.util.checkPhone(this.mobile)) {} else {
					this.util.showToast("请输入正确手机号");
					return false;
				}
				this.util.request('sms/send', {
					mobile: this.mobile,
					event: 'resetpwd'
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
			zhuce() {
				// if (!this.radio) {
				// 	this.util.showToast("请阅读并同意隐私协议");
				// 	return false;
				// }
				if (!this.util.checkPhone(this.mobile)) {
					this.util.showToast('请输入正确的手机号')
					return false
				}
				if (this.code.length < 4) {
					this.util.showToast('请输入4位数验证码')
					return false
				}
				if (this.psd.length < 6) {
					this.util.showToast('请输入至少六位数密码')
					return false
				}
				if (this.psds != this.psd) {
					this.util.showToast('两次密码输入不一致')
					return false
				}
				this.util.request('user/resetpwd', {
					mobile: this.mobile,
					captcha: this.code,
					newpassword: this.psd
				}, 'POST').then(res => {
					this.util.showMsg('重置密码成功', 1000, this.util.backTo(1, 1000))
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background: #F0F0F0;
		height: 100vh;
		padding: 0 44rpx;
	}

	.top_box {
		padding: 50rpx 0;
		flex-direction: column;

		.top_text {
			flex-direction: column;
			font-size: 24rpx;
			font-family: Helvetica-Bold-Regular, Helvetica-Bold;
			font-weight: 400;
			color: #191919;
			line-height: 28rpx;
		}

		image {
			width: 330rpx;
			height: 166rpx;
			margin: 40rpx 0 20rpx;
		}

		.btn_text {
			width: 180rpx;
			height: 34rpx;
			border-radius: 17rpx;
			border: 2rpx solid #2B2B2B;
			font-size: 20rpx;
			font-family: Helvetica-Bold-Regular, Helvetica-Bold;

		}
	}


	.hui {
		font-size: 24rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #9F9F9F;
	}

	.content {
		padding: 52rpx 40rpx;

	}

	.item {
		width: 660rpx;
		height: 540rpx;
		border-radius: 30rpx;
		background-color: white;
		margin: 0rpx auto;
		position: relative;
		top: 446rpx;
	}

	.submit {
		margin: 0 auto;
		width: 662rpx;
		height: 100rpx;
		background: linear-gradient(149deg, #000000 0%, #404040 100%);
		border-radius: 6rpx;
		line-height: 100rpx;
		text-align: center;
		color: #fff;
		border-radius: 100rpx;
		font-weight: bold;
	}

	.title {
		padding: 28rpx 0rpx 14rpx;
	}

	.flex {
		display: flex;
		align-items: center;
	}


	.plsty {
		color: #8A8A8A;
		font-size: 26rpx;
	}

	.mar {
		margin: 0rpx 40rpx;
	}

	.btn {
		color: white;
		font-size: 32rpx;
		line-height: 82rpx;
		height: 82rpx;
		background: linear-gradient(0deg, #1A9EFF 0%, #0FB8FF 100%);
		border-radius: 12rpx;
	}

	.yzm {
		font-size: 26rpx;
		color: #1198EA;
		border: solid 1rpx #1198EA;
		width: 192rpx;
		padding: 27rpx 0rpx;
		text-align: center;
		border-radius: 12rpx;
	}

	.placesty {
		font-size: 28rpx;
		color: #5E5E5E;
	}

	.inp {
		background: #FFFFFF;
		height: 90rpx;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		border-radius: 90rpx;
		padding: 0 30rpx;

		input {
			height: 100%;
			color: #5E5E5E !important;
			font-size: 28rpx;
		}
	}
</style>