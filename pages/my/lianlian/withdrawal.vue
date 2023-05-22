<template>
	<view>
		<view class="list" @click="util.urlTo('/pages/my/lianlian/bank_list')">
			<view class="">充值方式</view>
			<view @click="rechargeMeyhod">
				<view v-if="bankCard" class="list2 u-flex " @click="checkBank">
					<view class="">{{bankCard.linked_brbankname}}({{bankCard.linked_acctno}})
						<view class="hour">24小时内到账</view>
					</view>
					<view class="">
						<u-icon name="arrow-right" color="#666" size="24"></u-icon>
					</view>
				</view>
				<view v-else class="list2 u-flex ">
					<view class="">选择充值方式
					</view>
					<view class="">
						<u-icon name="arrow-right" color="#666" size="24"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<view class="recharge-box">
			<view class="rmb">¥</view>
			<view class="input">
				<u-input v-model="rechargeNum" placeholder="" :clearable="false" type="number" 
				:focus="true"
				@input="inputChange"
				:custom-style="{'font-size':'80rpx','font-weight':700,'width':inputWidth}"
					:border="false" />
			</view>
			<view class="balance">
				当前余额：{{wallet.amt_balcur}}
			</view>
		</view>
		<view style="margin: 0 70rpx;position: fixed;top: calc(100vh - 200rpx); width: calc(100vw - 140rpx);">
			<u-button style="margin-top: 50rpx;" shape="circle" type="success" @click="doRecharge">确定</u-button>
		</view>
		
		<u-popup v-model="popShow" mode="bottom" border-radius="30" height="1000rpx">
			<view style="width: 100%;text-align: center;padding-top: 160rpx;">
				<view style="display: inline-block;">
					<u-image  src="../../../static/lianlian/checked.png" width="150rpx" height="150rpx"></u-image>
					<view class="success">充值成功</view>
					<view class="success-num"><text style="font-size: 40rpx;">¥</text>{{rechargeNum}}</view>
					<view style="font-size: 30rpx;color: #999;">{{bankCard.linked_brbankname}}</view>
				</view>
				<u-button style="margin: 300rpx 70rpx 0 70rpx;" shape="circle" type="success" @click="payOver">关闭</u-button>
			</view>
		</u-popup>
		
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rechargeNum: '',
				inputWidth: "100rpx",
				popShow:false,
				bankCard:false,
				userInfo:{},
				txn_seqno:'',
				showSms:false,
				masCode:'',
				pwdScript: document.createElement('script'),
				wallet:{
					amt_balaval:0,
					amt_balcur:0,
					amt_balfrz:0,
					bank_account:''
				},
			}
		},
		onLoad() {
			this.util.request('Lianlian/userInfo', {}, 'POST').then(res => {
				this.wallet = {
					amt_balaval:res.acctinfo_list[0].amt_balaval,//资金总额
					amt_balcur:res.acctinfo_list[0].amt_balcur,//可用余额
					amt_balfrz:res.acctinfo_list[0].amt_balfrz,//冻结金额
					bank_account:res.bank_account
				}
			})
			let card = uni.getStorageSync('withdrawal')
			if(card && card != 1){
				this.bankCard = card
				//加载密码控件
				this.pwdScript.src = "https://oss-mpay-static.lianlianpay.com/lib/accp-password/v2.0.0.js";
				document.body.appendChild(this.pwdScript);
			}
			uni.setStorageSync('withdrawal', false)
			this.userInfo = uni.getStorageSync('info')
		},
		methods: {
			inputChange(e){
				let lennum = e.length*45
				if(lennum < 700){
					this.inputWidth = lennum+'rpx'
				}
			},
			rechargeMeyhod(){
				uni.setStorageSync('withdrawal', 1)
				this.util.urlTo('/pages/my/lianlian/bank_list')
			},
			doRecharge(){
				if(!this.bankCard){
					this.util.showToast("请选择收款方式");
					return
				}
				if(!this.rechargeNum){
					this.util.showToast("请输入提现金额");
					return
				}
				let that = this
				that.txn_seqno = 'TX'+that.userInfo.user_id+Date.parse(new Date())
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
							amount: that.rechargeNum,
							password: pres.data.password,
							random_key: pres.data.randomKey,
							linked_acctno:  that.bankCard.linked_acctno
						}
						// console.log(lbParms)
						//提现申请
						that.util.request('Lianlian/withdrawal', lbParms).then(bres => {
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
	.success{
		font-size: 30rpx;
		font-weight: 600;
	}
	.success-num{
		font-size: 60rpx;
		font-weight: 600;
		margin-top: 50rpx;
	}
	.recharge-box {
		width: 100%;
		text-align: center;
		position: relative;
		margin-top: 60rpx;
		.rmb {
			display: inline-block;
			font-size: 50rpx;
			font-weight: 600;
			position: absolute;
			top: 20rpx;
		}

		.input {
			display: inline-block;
			margin-left: 50rpx;
			// border-bottom: #999 solid 1rpx;
		}
		.balance{
			font-size: 26rpx;
			color: #999;
		}
	}

	.list {
		justify-content: space-between;
		padding: 30rpx 20rpx 30rpx 40rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #444;
		background-color: #efefef;

		.list2 {
			justify-content: space-between;
			padding: 30rpx 20rpx 30rpx 0;
			font-weight: 400;
			font-size: 28rpx;
			color: #444;
			background-color: #efefef;

			.hour {
				position: absolute;
				font-size: 24rpx;
				color: #999;
				top: 135rpx;
			}
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
</style>