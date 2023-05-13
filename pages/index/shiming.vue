<template>
	<view class="page">
		<view v-if="type == 0">
			<view class="tips">
				<view class="tips_title">
					「 填写实名信息 」
				</view>
				<view class="tips_text">
					根据相关法律法规，身份证与账号一一绑定，为保障你的信息安全，请填写您本人的实名信息。请务必填写您本人的真实身份信息，平台将不定期随机抽查，无法证明本人的用户将限制登录或限制转赠。
				</view>
			</view>
			<view class="form">
				<view class="form_item flex align-center  padding-left-lg padding-right-lg">
					<!-- <view class="font30 text-black" style="min-width: 120rpx;">
						真实姓名
					</view> -->
					<input type="text" v-model="name" style="flex: 1;height: 120rpx;border: none;"
						placeholder="请输入身份证姓名" placeholder-class="placesty">
				</view>
				<view class="form_item flex align-center  padding-left-lg padding-right-lg">
					<!-- <view class="font30" style="min-width: 120rpx;">
						身份证号
					</view> -->
					<view class="flex-sub">
						<input type="idcard" v-model="code" style="flex: 1;height: 120rpx;border: none;"
							placeholder="请输入身份证号码" placeholder-class="placesty">
					</view>
				</view>
				<view class="form_item flex align-center  padding-left-lg padding-right-lg">
					<!-- <view class="font30" style="min-width: 120rpx;">
						联系方式
					</view> -->
					<view class="flex-sub">
						<input disabled type="number" v-model="mobile" style="flex: 1;height: 120rpx;border: none;"
							placeholder-class="placesty">
					</view>
				</view>
				<!-- <view class="flex align-center font30 margin-top-sm" style="margin-top: 60rpx;">
					<view class="flex align-center">
						<radio :checked="radio" style="transform: scale(0.7); margin-right: 15rpx;" @tap="radio=!radio">
						</radio>
						<view class="" @tap="radio=!radio" style="color: #666666;">
							我已阅读并同意
						</view>
						<view style="color: #9fa0a5;" @click="util.urlTo('../my/agreement?id=3')">
							《使用条款》
						</view>
					</view>
				</view> -->
			</view>
			<!-- 按钮 -->
			<view style="margin-top: 171rpx;" class="flex justify-center">
				<view @click="success" class="submit_btn">
					立即认证
				</view>
			</view>
		</view>
		<view class="text-center" v-if="type != 0">
			<image :src="type == 1 ? '/static/login/shz.png' : '/static/login/shcg.png'"
				style="width: 400rpx;height: 400rpx;" mode=""></image>
			<view class="font32" style="color: #fff;">
				{{type == 1 ? '审核中' : '审核成功'}}
			</view>
		</view>

		<tfgg-verify :shows="sliderVerifyFLag" @result="success" @change="isShowimage"></tfgg-verify>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				radio: true,
				name: '',
				code: '',
				mobile: '',
				all: {},
				sliderVerifyFLag: false
			}
		},
		onShow(e) {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.mobile = res.mobile;
					this.all = res;
				})
			},
			success(e) {
				this.util.request('user/realname', {
					name: this.name,
					idcard: this.code
				}, 'POST').then(res => {
					this.sliderVerifyFLag = false;
					this.util.showToast('认证完成', true)
					// setTimeout(()=>{
					// 	uni.navigateBack({
					// 		delta:1
					// 	})
					// },1000)
				})
			},
			save() {
				if (!this.radio) {
					this.util.showToast("请阅读并同意使用条款");
					return false;
				}
				if (this.util.checkName(this.name)) {} else {
					this.util.showToast("请输入真实姓名");
					return false;
				}
				if (!this.util.checkIDCard(this.code)) {
					this.util.showToast("请输入有效身份证号码");
					return false;
				}
				if (!this.util.checkPhone(this.mobile)) {
					this.util.showToast("请输入正确的手机号");
					return false;
				}
				this.sliderVerifyFLag = true;
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
	page {
		background-color: #000;
	}

	.tips {
		.tips_title {
			font-size: 44rpx;
			color: #fff;
			font-weight: bold;
			padding: 40rpx 0;

		}

		.tips_text {
			font-size: 28rpx;
			color: #9fa0a5;
			line-height: 25px;
			padding: 0 30rpx 30rpx;
		}
	}

	.page {
		padding: 0 20rpx;
		/* width: 100%;
		height: 1506rpx;
		background: url('@/static/zhucebg.png') no-repeat;
		background-size: 100% 1506rpx; */
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

	.title {
		padding: 28rpx 0rpx 14rpx;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	input {
		border: solid 1rpx #999999;
		padding: 22rpx 34rpx;
		border-radius: 12rpx;
		padding-left: 0rpx;
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

	.form {
		.form_item {
			border: 1rpx solid #F7F7F7;
			margin-bottom: 40rpx;
			border-radius: 100rpx;

			input {
				color: #fff;
				font-size: 28rpx;
			}
		}
	}

	.placesty {
		font-size: 30rpx;
		color: #9F9F9F;
	}

	.inp {
		background-color: white;
		border: none;
		box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.08);
		border-radius: 41rpx;
		height: 82rpx;
		margin-top: 19rpx;
	}

	.submit_btn {
		font-size: 36rpx;
		width: 90vw;
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		background: #000;
		font-weight: 700;
		border: 1px solid #fff;
		border-radius: 100rpx;
	}
</style>