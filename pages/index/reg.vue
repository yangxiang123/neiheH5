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
			<view class="inp">
				<input type="tel" v-model="mobile" placeholder="请输入手机号" placeholder-class="placesty">
			</view>
			<view class="flex align-center inp">
				<input type="number" v-model="code" placeholder="请输入4位数验证码" placeholder-class="placesty"
					class="flex-sub">
				<view style="width: 61rpx;"></view>
				<view @click="sendcode" class="font26" style="color: #5E5E5E;">
					{{showText==true ? security_code : second+'s'}}
				</view>
			</view>
			<view class="inp">
				<input type="password" v-model="password" placeholder="请输入密码" placeholder-class="placesty">
			</view>
			<view class="inp">
				<input type="text" v-model="qrcode" placeholder="请输入邀请码" placeholder-class="placesty">
			</view>
			<view class="flex align-center font26 margin-top-xl" style="color: #5E5E5E;">
				<view class="flex align-center">
					<radio :checked="radio" color="#3B3F47" style="transform: scale(.5);" @tap="radio=!radio">
					</radio>
					<view class="" @tap="radio=!radio">已阅读并同意</view>
					<view @click="util.urlTo('../my/agreement?id=2')">《用户服务协议》</view>
					<view @click="util.urlTo('../my/agreement?id=1')">《隐私权益》</view>
				</view>
			</view>
			<view style="margin-top: 60rpx;">
				<view class="submit font30" @click="submit">
					注册
				</view>
				<view class="flex-sub" style="margin:30rpx; color: #5E5E5E;" @click="util.urlTo('index')">
					登录
				</view>

			</view>
		</view>
		<!-- 按钮 -->

		<tfgg-verify :shows="sliderVerifyFLag" @result="success" @change="isShowimage"></tfgg-verify>
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
				mobile: '',
				code: '',
				password: '',
				qrcode: '',
				sliderVerifyFLag: false,
				token: ''
			}
		},
		onLoad(e) {
			if (e.invite_code) {
				this.qrcode = e.invite_code;
			}
		},
		methods: {
			getQueryVariable(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			},
			success(e) {
				this.util.showToast('验证通过')
				this.token = e;
				this.sliderVerifyFLag = false;
				this.regsubmit()
			},
			isShowimage(e) {
				this.sliderVerifyFLag = e;
				uni.showToast({
					title: '验证失败',
					icon: 'none'
				});
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
					event: 'mobilelogin'
				}, 'POST').then(res => {
					this.util.showToast('发送成功，请注意查收');
					this.getCode();
				})
			},
			submit() {
				if (!this.radio) {
					this.util.showToast("请阅读并同意隐私协议");
					return false;
				}
				if (this.util.checkPhone(this.mobile)) {} else {
					this.util.showToast("请输入正确手机号");
					return false;
				}
				if (this.code.length < 4) {
					this.util.showToast("请输入4位数验证码");
					return false;
				}
				if (this.password.length < 6) {
					this.util.showToast("请输入至少6位数密码");
					return false;
				}

				this.sliderVerifyFLag = true;
				// this.regsubmit();
			},
			regsubmit() {
				let that = this;
				this.util.request('user/register', {
					mobile: this.mobile,
					captcha: this.code,
					password: this.password,
					inviter: this.qrcode,
				}, 'POST').then(res => {
					this.util.showToast('注册成功');
					uni.setStorageSync('info', res.userinfo)
					uni.setStorageSync('token', res.userinfo.token);
					setTimeout(function() {
						that.util.urlTo('index');
					}, 1000)
					// this.util.showToast(res.data,true);
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


	.topbak {
		background: url('@/static/login_wtb_bg.jpg') no-repeat center;
		background-size: 100% 100%;
		height: 350rpx;
		width: 100%;
		background-position: 0 -20rpx;
	}

	.hui {
		font-size: 24rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #9F9F9F;
	}

	.content1 {
		position: relative;
		bottom: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		background-color: #fff;
		padding: 52rpx 40rpx;
		/* 	width: 100%;
		height:100vh;
		background: url('@/static/zhucebg.png') no-repeat;
		background-size: contain; */
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

	/* 
	input {
		border: solid 1rpx #999999;
		padding: 22rpx 34rpx;
		border-radius: 12rpx;
	} */


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