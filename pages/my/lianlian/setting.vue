<template>
	<view class="">
		<view class="list u-flex " @click="editPwd">
			<view class="">修改支付密码</view>
			<view class="">
				<u-icon name="arrow-right" color="#666" size="28"></u-icon>
			</view>
		</view>
		<view class="list u-flex " @click="forgetPwd">
			<view class="">忘记支付密码</view>
			<view class="">
				<u-icon name="arrow-right" color="#444" size="28"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	// import pwd from'@/common/pwd.js'
	export default {
		data() {
			return {
				pwdScript: document.createElement('script')
			}
		},
		onLoad() {
			this.pwdScript.src = "https://oss-mpay-static.lianlianpay.com/lib/accp-password/v2.0.0.js";
			document.body.appendChild(this.pwdScript);
		},
		methods: {
			editPwd() {
				lianlianpay.invokePasswordControl({
					/**
					 * passwordScene 使用场景
					 * setting_password-设置密码
					 * change_password-修改密码
					 * bind_card_password-换绑卡
					 * cashout_password-提现
					 * pay_password-支付
					 */
					passwordScene: 'bind_card_password',
					oidPartner: '2020042300285003', // 商户号
					userId: '91755872196523', // 用户号
					passwordElementToken: 'e47d0adf94dc51c7dc96c2b1510667fe', // 向服务端请求生成的 token
					env: 'ste', // 默认 production-生产
					styles: { // 样式集合
						themeColor: '#0E59F0', // 主题颜色（按钮等）
					}
				}, (res) => {
					console.log('密码数据', res)
				})
			},
			forgetPwd(){
				
			}
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.list {
		justify-content: space-between;
		padding: 30rpx 20rpx 30rpx 20rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #444;
		margin: 30rpx 40rpx;
		background-color: #efefef;
		border-radius: 20rpx;
		
	}
</style>