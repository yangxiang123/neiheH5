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
			<view class="inp u-flex u-row-between">
				<input type="tel" v-model="mobile" placeholder="请输入手机号" placeholder-class="placesty" class="">
				<image src="/static/nh/user.png" mode="widthFix"></image>
			</view>
			<view class="inp u-flex u-row-between">
				<input type="password" v-model="psd" placeholder="请输入密码" placeholder-class="placesty">
				<image src="/static/nh/password.png" mode="widthFix"></image>
			</view>
			<view style="margin-top: 70rpx;">
				<u-button type="primary" shape="circle" :loading="loading" class="submit font30" hover-class="none"
					@click="login">
					登 录
				</u-button>
				<view class="flex align-center font26" style="margin-top: 36rpx;color: #5E5E5E;">
					<view class="flex-sub" @click="util.urlTo('reg')">
						注册账号
					</view>
					<view @click=" util.urlTo('reset')">
						忘记密码?
					</view>
				</view>
			</view>
		</view>
		<view class="flex font26 margin-top agreement">
			<view class="flex">
				<radio :checked="radio" color="#5E5E5E" style="transform: scale(.7);" @tap="radio = !radio"></radio>
				<view class="u-m-l-15" @tap="radio = !radio">已阅读并同意</view>
				<view @click="util.urlTo('../my/agreement?id=2')">《用户服务协议》</view>
				<view @click="util.urlTo('../my/agreement?id=1')">《隐私权益》</view>
			</view>
		</view>
		<!-- 按钮 -->

		<tfgg-verify :shows="sliderVerifyFLag" @result="success" @change="isShowimage"></tfgg-verify>
		<!-- </view> -->
	</view>
</template>

<script>
	import _mixins from '@/common/_mixins.js'
	export default {
		data() {
			return {
				sliderVerifyFLag: false,
				radio: false,
				BtnText: '获取验证码',
				second: 60,
				mobile: '',
				psd: '',
				iswugan: false,
				token: '',
				loading: false,
			}
		},
		onLoad() {
			if (uni.getStorageSync('token')) {
				uni.reLaunch({
					url: '../home/index'
				})
				return false;
			}
			this.invite_code = this.GetQueryString("invite_code");
			if (this.invite_code) {
				// uni.reLaunch({
				// 	url: 'register?invite_code=' + this.invite_code
				// })
				this.util.urlTo('reg?invite_code=' + this.invite_code);
			} else {
				// if (uni.getStorageSync('token')) {
				// 	uni.reLaunch({
				// 		url: '../index/index'
				// 	})
				// }
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
			GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return (decodeURIComponent(r[2]));
				return null;
			},
			success(e) {
				this.util.showToast('验证通过')
				this.token = e;
				this.sliderVerifyFLag = false;
				this.submit()
			},
			login() {
				if (!this.radio) {
					this.util.showToast("请阅读并同意隐私协议");
					return false;
				}
				if (this.util.checkPhone(this.mobile)) {} else {
					this.util.showToast("请输入正确手机号");
					return false;
				}
				if (!this.psd) {
					this.util.showToast("请输入密码");
					return false;
				}
				// this.sliderVerifyFLag = true;
				this.loading = true;
				this.submit();
			},
			submit() {
				this.util.request('user/login', {
					account: this.mobile,
					password: this.psd,
					wg_token: this.token
				}, 'POST').then(res => {
					this.loading = false;
					try {
						uni.setStorageSync('info', res.userinfo)
						uni.setStorageSync('token', res.userinfo.token)
						// uni.setStorageSync('im_token', res.im_token.token)
					} catch (e) {
						console.log(e)
					}
					
					uni.switchTab({
						url: '/pages/home/index'
					})

					//登陆上去之后重新获取数据刷新页面
					// _mixins.methods.$socketSend({
					// 	action: 'checkToken',
					// 	data: res.im_token.token,
					// }, function(res) {
					// 	// console.log(res)
					// 	uni.hideLoading()
					// 	// uni.reLaunch({
					// 	// 	url: '../chat/index',
					// 	// });
					// });

					this.util.request('user/index', {}, 'POST').then(res => {
						uni.setStorageSync('userInfo', res)
					})


				}).catch(e => {

					this.loading = false;
				})
			},
			isShowimage(e) {
				this.sliderVerifyFLag = e;
				uni.showToast({
					title: '验证失败',
					icon: 'none'
				});
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

	.hui {
		font-size: 28rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #5E5E5E;
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

	/* 
	.topbak {
		background: url('@/static/login_bg.png') no-repeat center;
		background-size: 100% 100%;
		height: 350rpx;
		width: 100%;
		background-position: 0rpx -20rpx;
	} */

	.content1 {
		position: relative;
		bottom: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		/* background-color: #fff; */
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

	/deep/ .submit {
		margin: 0 auto;
		width: 662rpx;
		height: 100rpx;
		background: linear-gradient(149deg, #000000 0%, #404040 100%);
		line-height: 100rpx;
		text-align: center;
		color: #fff;
		border-radius: 100rpx;
		font-weight: bold;
		font-size: 34rpx;
		border: none !important;

	}

	.title {
		padding: 28rpx 0rpx 14rpx;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	input {
		color: #5E5E5E;
		font-size: 28rpx;
	}

	.plsty {
		color: #5E5E5E;
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
		font-size: 26rpx;
		color: #AAAAAA;
	}

	.inp {
		width: 100%;
		height: 90rpx;
		background: #FFFFFF;
		border-radius: 90rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		// border: 1px solid #cad3df;
		margin-top: 50rpx;

		image {
			width: 32rpx;

		}
	}

	.agreement {
		position: absolute;
		bottom: 30rpx;
		left: 44rpx;
		right: 44rpx;
		justify-content: center;
		color: #5E5E5E;
	}
</style>