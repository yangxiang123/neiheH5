<template>
	<view class="content">
		<cu-custom bgColor="bg-color" :isBack="true" style="color: #444;">
			<block slot="backText"></block>
			<block slot="content">我的钱包</block>
			<!-- <block slot="right">
				<view class="padding-right-sm col-999" @click="util.urlTo('detailed')">
					余额明细
				</view>
			</block> -->
		</cu-custom>
		<view class="page-body">
			<view class="page-top">
				<view class="balance">
					<view class="flex solid-bottom padding justify-between">
						<view class="padding-sm margin-xs">
							<view>
								<view class="label">可用余额(元)</view>
								<view class="num">{{wallet.amt_balcur}}</view>
							</view>
						</view>
						<view class="padding-sm margin-xs">

							<text class="recharge-btn" @click="torecharge">
								充值
							</text>

							<view class="wenhao" @click="showInfo=true">
								?
							</view>

						</view>
					</view>
					<view class="flex">
						<view class="flex-sub padding-sm margin-xs">
							<view class="small">
								<view class="label">资金总额(元)</view>
								<view class="num">{{wallet.amt_balaval}}</view>
							</view>
						</view>
						<view class="flex-sub padding-sm margin-xs">
							<view class="small">
								<view class="label">冻结金额(元)</view>
								<view class="num">{{wallet.amt_balfrz}}</view>
							</view>
						</view>
						<view class="tx" @click="util.urlTo('/pages/my/lianlian/withdrawal')">提现</view>
					</view>
				</view>
			</view>

			<view>
				<view class="card_box">
					<u-cell-group :border="false">
						<u-cell-item style="border-radius: 10rpx;" bg-color="#f4f4f5" :border-bottom="false"
							title="账单明细" @click="util.urlTo('/pages/my/lianlian/bill')">
							<image src="../../../static/lianlian/llzf_icon_008.png" class="iconImg" slot="icon" mode="">
							</image>
						</u-cell-item>
						<u-gap height="25" bg-color="#F4F9F9"></u-gap>
						<u-cell-item style="border-radius: 10rpx;" bg-color="#f4f4f5" :border-bottom="false" title="银行卡"
							@click="util.urlTo('/pages/my/lianlian/bank_list')">
							<image src="../../../static/lianlian/llzf_icon_006.png" class="iconImg" slot="icon" mode="">
							</image>
						</u-cell-item>
						<u-gap height="25" bg-color="#F4F9F9"></u-gap>
						<!-- <u-cell-item style="border-radius: 10rpx;" bg-color="#f4f4f5" :border-bottom="false"
							title="安全设置" @click="util.urlTo('/pages/my/lianlian/setting')">
							<image src="../../../static/lianlian/llzf_icon_001.png" class="iconImg" slot="icon" mode="">
							</image>
						</u-cell-item> -->
					</u-cell-group>
				</view>
			</view>

		</view>

		<u-popup v-model="showInfo" mode="center" border-radius="15">
			<view class="info-box" v-if="userInfo">
				<view class="title">ACS虚拟卡收款信息</view>
				<view class="info">户名:{{userInfo.real_name}}</view>
				<view class="info">账号:{{userInfo.linked_agrtno}}</view>
				<view class="info">开户支行:连连银通-备金账户</view>
				<view class="info">开户银行(行别):支付机构备金存管账户或者其他991</view>
				<view class="info">省:浙江 市:杭州</view>
				<view class="info">开户行号:{{userInfo.bank_account}}</view>
				<view style="height: 40rpx;"></view>
				<view class="title">以下时间不支持加款</view>
				<view class="info">工作日 17：15 -- 20.30</view>
				<view class="info">节假日前一日17：15 节假日后一日20：30之间</view>
			</view>
		</u-popup>

		<u-popup v-model="showActivation" mode="center" border-radius="15">
			<view class="info-box">
				<view class="tips">温馨提示</view>
				<view class="remark">
					尊敬的客户您好！您即将使用连连钱包，<text style="color: #FB861A;">开户请支付{{userInfo.activation_money}}元开户费</text>，如需继续，请选择以下支付方式支付相关费用
				</view>
				<view class="pay-type">
					<view class="pay-title">支付方式</view>
					<view class="type-pay">
						<u-image class="inline left" width="35rpx" height="35rpx" :show-loading="false"
							src="../../../static/lianlian/bank_icon.png"></u-image>
						<view class="inline center">银行卡快捷支付</view>
						<u-image v-if="payType == 1" class="inline right" width="35rpx" height="35rpx"
							:show-loading="false" src="../../../static/lianlian/checked.png"></u-image>
						<u-image v-else class="inline right" width="28rpx" height="28rpx" :show-loading="false"
							src="../../../static/lianlian/uncheck.png" @click="payType=1"></u-image>
					</view>
					<!-- <view class="type-pay">
						<u-image class="inline left" width="35rpx" height="35rpx" :show-loading="false"
							src="../../../static/lianlian/ye.png"></u-image>
						<view class="inline center">余额</view>
						<text class="nobanace">余额不足</text>
						<u-image v-if="payType == 2" class="inline right" width="35rpx" height="35rpx"
							:show-loading="false" src="../../../static/lianlian/checked.png"></u-image>
						<u-image v-else class="inline right" width="28rpx" height="28rpx" :show-loading="false"
							src="../../../static/lianlian/uncheck.png" @click="payType=2"></u-image>
					</view> -->
					<view class="btn">
						<u-row>
							<u-col span="6" style="text-align: center;">
								<u-button @click="showActivation=false" type="info" size="mini" :hair-line="false" style="color: #666;">取消</u-button>
							</u-col>
							<u-col span="6" style="text-align: center;">
								<u-button type="success" size="mini" :hair-line="false" @click="activation()">确认</u-button>
							</u-col>
						</u-row>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import _mixins from '@/common/_mixins.js'
	export default {
		data() {
			return {
				showInfo: false,
				showActivation: false,
				payType: 1, //1微信 2余额
				wallet:{
					amt_balaval:0,
					amt_balcur:0,
					amt_balfrz:0,
					bank_account:''
				},
				userInfo:false
			}
		},
		onLoad() {
			//查看是否激活
			this.userInfo = uni.getStorageSync('info')
			if(!this.userInfo.is_open){
				//去激活
				this.showActivation = true
			}
			this.util.request('Lianlian/userInfo', {}, 'POST').then(res => {
				this.wallet = {
					amt_balaval:res.acctinfo_list[0].amt_balaval,//资金总额
					amt_balcur:res.acctinfo_list[0].amt_balcur,//可用余额
					amt_balfrz:res.acctinfo_list[0].amt_balfrz,//冻结金额
					bank_account:res.bank_account
				}
			})
		},
		methods: {
			torecharge() {
				this.util.urlTo('/pages/my/lianlian/recharge')
			},
			activation(){
				this.util.request('Lianlian/userActivationOrder', {}, 'POST').then(res => {
					//选择银行卡
					this.util.urlTo('/pages/my/lianlian/bank_list?txn_seqno='+res.txn_seqno)
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #F4F9F9;
		min-height: 100vh;
		
		.btn{
			text-align: center;
			margin-top: 50rpx;
		}

		.info-box {
			padding: 30rpx;
			width: 560rpx;

			.title {
				font-weight: 600;
				font-size: 30rpx;
			}

			.info {
				font-size: 26rpx;
				color: #444;
				margin: 10rpx 0;
			}

			.tips {
				text-align: center;
				font-weight: 600;
				font-size: 30rpx;
			}

			.remark {
				font-size: 24rpx;
				color: #444;
				margin-top: 20rpx;
			}

			.pay-type {
				margin-top: 20rpx;
				font-size: 28rpx;

				// font-weight: 600;
				.pay-title {
					font-weight: 600;
				}

				.type-pay {
					margin-top: 20rpx;
					position: relative;

					.inline {
						display: inline-block;
					}

					.center {
						position: relative;
						top: -10rpx;
						left: 15rpx;
						color: #444;
						font-weight: 0;
						font-size: 25rpx;
					}

					.right {
						position: absolute;
						right: 40rpx;
					}

					.nobanace {
						font-size: 24rpx;
						color: #c0c0c0;
						position: absolute;
						top: 0;
						right: 90rpx;
					}
				}

			}

		}

		.page-body {
			padding: 0 30rpx;

			.card_box {
				margin: 30rpx auto;
				background-color: #FFFFFF;
				border-radius: 20rpx;

				.iconImg {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}

			.page-top {
				width: 100%;
				height: 365rpx;
				background: url('@/static/lianlian/bg.png') no-repeat center;
				background-repeat: no-repeat;
				border-radius: 30rpx;

				.balance {
					position: relative;
					color: #fff;

					.recharge-btn {
						background-color: rgba(255, 255, 255, 0.4);
						border-radius: 25rpx;
						padding: 10rpx 30rpx;
						font-size: 25rpx;
						position: relative;
						left: -30rpx;
					}

					.wenhao {
						background-color: rgba(255, 255, 255, 0.4);
						width: 46rpx;
						height: 46rpx;
						border-radius: 30rpx;
						text-align: center;
						padding-top: 5rpx;
						position: absolute;
						top: 55rpx;
						right: 30rpx;
					}

					.label {
						font-size: 28rpx;
					}

					.num {
						font-size: 38rpx;
						margin-top: 10rpx;
						font-weight: 600;
					}

					.small {
						position: relative;
						left: 30rpx;

						.label {
							font-size: 25rpx;
						}

						.num {
							font-size: 28rpx;
							margin-top: 10rpx;
							font-weight: 600;
						}
					}

					.tx {
						position: absolute;
						right: 0;
						top: 280rpx;
						padding: 5rpx 10rpx 5rpx 20rpx;
						background-color: rgba(255, 255, 255, 0.4);
						border-radius: 20rpx 0 0 20rpx;
					}
				}
			}
		}
	}
</style>