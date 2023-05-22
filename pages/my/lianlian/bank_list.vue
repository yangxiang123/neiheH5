<template>
	<view class="page">
		<view class="way" v-for="(item,index) in list" :key="index" @click="checkBank(index)">
			<view class="name">{{item.linked_brbankname}}</view>
			<view class="" style="margin-top:10rpx;">{{userInfo.real_name}}{{item.linked_phone}}</view>
			<view class="code">{{item.linked_acctno}}</view>
		</view>
		<!-- <u-button style="margin-top: 50rpx;" shape="circle" type="primary" @click="addbank">添加银行卡</u-button> -->

		<u-popup v-model="showSms" mode="center" border-radius="15">
			<view class="info-box">
				<view class="tips">请输入验证码</view>
				<view style="margin-top: 100rpx;">
					<u-input v-model="masCode" placeholder="请输入手机验证码" :border="false" :custom-style="{'border-bottom':'1rpx solid #c8c7cc'}" />
				</view>
				<view style="margin-top: 100rpx;">
					<u-button type="primary" @click="checkCode">确定</u-button>
				</view>
			</view>
		</u-popup>
		
		<u-popup v-if="list.length > 0" v-model="popShow" mode="bottom" border-radius="30" height="1000rpx">
			<view style="width: 100%;text-align: center;padding-top: 160rpx;">
				<view style="display: inline-block;">
					<u-image  src="../../../static/lianlian/ll_bank_icon_015.png" width="200rpx" height="200rpx"></u-image>
					<view class="success">交易成功</view>
					<view class="success-num"><text style="font-size: 40rpx;">¥</text>{{linked_num}}</view>
					<view style="font-size: 30rpx;color: #999;">{{list[linked_index].linked_brbankname}}</view>
				</view>
				<u-button style="margin: 300rpx 70rpx 0 70rpx;" shape="circle" type="primary" @click="payOver">关闭</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				txn_seqno: '',
				userInfo: {},
				pwdScript: document.createElement('script'),
				showSms:false,
				masCode:'',
				codeParms:{},
				popShow:false,
				linked_index:0,
				linked_num:0,
				backUrl:''
			}
		},
		onLoad(e) {
			if (e.txn_seqno) {
				this.txn_seqno = e.txn_seqno
				//加载密码控件
				this.pwdScript.src = "https://oss-mpay-static.lianlianpay.com/lib/accp-password/v2.0.0.js";
				document.body.appendChild(this.pwdScript);
			}
			this.userInfo = uni.getStorageSync('info')
			
			//银行卡列表
			this.getlist()

		},
		methods: {
			getlist() {
				this.util.request('Lianlian/bankInfo', {

				}).then(res => {
					this.list = res.linked_acctlist
				})
			},
			addbank() {
				this.util.urlTo('/pages/my/lianlian/bind');
			},
			checkBank(index) {
				this.linked_index = index
				let linked_acctno = this.list[index].linked_acctno
				let that = this
				if (that.txn_seqno) {
					that.util.request('Lianlian/token', {
						txn_seqno: that.txn_seqno,
						password_scene: 'pay_password',
						amount: that.userInfo.activation_money,
						type: 2
					}).then(res => {
						lianlianpay.invokePasswordControl({
							/**
							 * passwordScene 使用场景
							 * setting_password-设置密码
							 * change_password-修改密码
							 * bind_card_password-换绑卡
							 * cashout_password-提现
							 * pay_password-支付
							 */
							passwordScene: 'pay_password',
							oidPartner: res.oid_partner, // 商户号
							userId: that.userInfo.user_id, // 用户号
							passwordElementToken: res.password_element_token, // 向服务端请求生成的 token
							env: 'production', // 默认 production-生产
							styles: { // 样式集合
								themeColor: '#0E59F0', // 主题颜色（按钮等）
							}
						}, (pres) => {
							// console.log(pres)
							// console.log(pres.password)
							// console.log(pres.randomKey)
							let lbParms = {
								txn_seqno: that.txn_seqno,
								amount: that.userInfo.activation_money,
								password: pres.data.password,
								random_key: pres.data.randomKey,
								linked_acctno: linked_acctno
							}
							// console.log(lbParms)
							//银行卡快捷支付
							that.util.request('Lianlian/bankcard', lbParms).then(bres => {
								that.codeParms = {
									txn_seqno:that.txn_seqno,
									amount:bres.total_amount,
									token:bres.token,
								}
								//二次短信验证
								that.showSms = true
							})
						})
					})
				}
				if(uni.getStorageSync('recharge') == 1){
					uni.setStorageSync('recharge', this.list[index])
					this.util.urlTo('/pages/my/lianlian/recharge')
				}
				if(uni.getStorageSync('withdrawal') == 1){
					uni.setStorageSync('withdrawal', this.list[index])
					this.util.urlTo('/pages/my/lianlian/withdrawal')
				}
			},
			checkCode(){
				this.codeParms.verify_code = this.masCode
				this.util.request('Lianlian/validationSms', this.codeParms).then(res => {
					//交易成功
					this.linked_num = res.total_amount
					//重新获取数据
					this.util.request('user/index', {}, 'POST').then(res => {
						uni.setStorageSync('info', res)
						uni.setStorageSync('userInfo', res)
					})
					this.popShow = true
					this.showSms = false
				})
			},
			payOver(){
				this.util.urlTo('/pages/my/lianlian/wallet')
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 30rpx 50rpx;


		.way {
			width: 100%;
			padding: 50rpx;
			background: url('@/static/lianlian/ll_bank_icon_003.png') no-repeat center;
			background-repeat: no-repeat;
			color: #fff;
			font-size: 26rpx;
			border-radius: 30rpx;
			margin-bottom: 20rpx;

			.name {
				font-size: 36rpx;
				font-weight: bold;
			}

			.code {

				margin-top: 30rpx;
				font-size: 30rpx;
			}
		}
		.info-box {
			padding: 30rpx;
			width: 560rpx;
			.tips {
				text-align: center;
				font-weight: 600;
				font-size: 30rpx;
			}
		
		}
	}
</style>