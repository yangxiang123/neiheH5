<template>
	<view class="vieUpgrade_wrap">
		<!-- <view class="card_top">
			<view class="vip_text">
				<text>
					提示:你暂未开通钱包功能,需开通该业务才能开始使用钱包功能！
				</text>
				
			</view>
		</view> -->
		<view class="card_content">
			<view class="">
				<text>订单号</text>
				<text>111111111111111</text>
			</view>
			<view class="">
				<text>时间</text>
				<text></text>
			</view>
			<view class="">
				<text>金额</text>
				<text>￥5.00</text>
			</view>
		</view>
		<view class="bg-white radius20 margin-top-sm" style="padding: 39rpx 44rpx;padding-bottom: 81rpx;">
			<view class="flex flex-between align-center">
				
				<view class="font32">选择银行卡</view>
				<view class="font20" @click="util.urlTo('bank_list')" style="color: #0042FF;">绑定银行卡></view>
			</view>
			<!-- <view class="flex align-center" @tap="payType=-1" style="margin-top: 51rpx;">
				<image src="../../static/zfbpay.png" mode="" style="width: 70upx;height: 70upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					支付宝-快捷充值
				</view>
				<radio :checked="payType==-1" color="#3b3f47" style="transform: scale(.7);"></radio>
			</view>
			<view class="flex align-center margin-top" v-for="(item,index) in list" @tap="payType=item.id"
				style="margin-top: 51rpx;">
				<image src="/static/my/yuer.png" mode="" style="width: 64upx;height: 64upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					{{item.bank_name}}--{{item.bank_card}}
				</view>
				<radio :checked="payType==item.id" color="#3b3f47" style="transform: scale(.7);"></radio>
			</view> -->
			<!-- <view class="flex align-center margin-top" @tap="payType=2" style="margin-top: 51rpx;">
				<image src="../../static/yhk.png" mode="" style="width: 64upx;height: 64upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					汇元支付
				</view>
				<radio :checked="payType==2" color="#3b3f47" style="transform: scale(.7);"></radio>
			</view> -->
			<view class="flex align-center" @tap="payType=1" style="margin-top: 51rpx;">
				<image src="../../static/yhk.png" mode="" style="width: 70upx;height: 70upx;"></image>
				<view class="margin-left-sm flex-sub font30">
					银行卡
				</view>
				<radio :checked="payType==1" color="#0042FF" style="transform: scale(.7);"></radio>
			</view>
		</view>
		<text class="submit_btn" @click="vip_pay">
			确认支付
		</text>
		<!-- 支付密码弹窗 -->
		<view class="cu-modal" :class="modalName=='payModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="action" @tap="modalName=null">
						<view class="content">请输入支付密码</view>
						<text class="cuIcon-close col-999"></text>
					</view>
				</view>
				<view class=" bg-white flex justify-center" style="padding: 30upx 0 70upx 0;">
					<jpCoded ref="jpcode" style="height: 80rpx;" @inputVal="inputVal" :codes="codes" :width="width">
					</jpCoded>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import jpCoded from '@/components/jp-coded/jp-coded.vue'
	export default {
		components: {
			jpCoded
		},
		data(){
			return{
				pay_type:'balance',
				vip:{},
				userPayInfo:{},
				user:{},
				modalName:null,
				width:500,
				codes: '',
				payType:null
			}
		},
		methods:{
			getUserInfo() {
				this.user = uni.getStorageSync('userInfo')
				// this.util.getUserInfo().then(res => {
				// 	this.user = res;
				// })
			},
			pay_type_change(type){
				this.pay_type = type 
				console.log(this.pay_type);
				// 切换支付方式
			},
			
			vip_pay(){
				console.log(this.pay_type);
				if (this.pay_type == '' && this.user.pay_pwd == 0) {
					this.util.showMsg('您还未设置支付密码', 1000, this.util.urlTo('../my/psd'));
					return false
				}
				if(this.pay_type == 'balance'){
					this.modalName = 'payModal'
				}else if(this.pay_type == 'bank'){
					this.pay()
				}
				
				
			},
			pay(e){
				console.log(e);
				if(this.pay_type == 'balance'){
					this.util.request('user/vip_pay', {
						order_sn:this.userPayInfo.order_sn,
						pay_type:this.pay_type,
						paypwd:e
					}, 'POST').then(res => {
						this.modalName = null
						// this.getGoods()
						uni.showToast({
							title:'支付成功'
						})
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
						},1000)
						// this.vip = res.vip
						// this.userPayInfo = res.order
					})
				}else{
					this.util.request('goods/auction_order', {
						order_sn:this.userPayInfo.order_sn,
					}).then(res => {
						if (this.pay_type == 'balance') {
							console.log(res)
							this.order_sn = res.order_sn
						} else {
							if (res.redirectUrl) {
								this.util.urlTo('../pay/pay?url=' + res.redirectUrl)
							} else {
								this.util.showToast(res.cause);
							}
							// this.util.appPay(this.btnIndex, res).then(data => {
							// 	this.util.backTo(1, 2000);
							// })
						}
					})
				}
			},
			inputVal(e) {
				if (e.length == 6) {
					this.pay(e)
				}
			},
			
		},
		onLoad(e) {
			// let order_sn = []
			// let i = 0 
			console.log(JSON.parse(e.order_sn));
		},
		onShow() {
			this.getUserInfo()
		}
	}
</script>

<style lang="scss">
	.vieUpgrade_wrap{
		min-height: 100vh;
		
		background-color: #F6F6F6;
		padding:  20rpx 24rpx;
		.card_top{
			background-color: #fff;
			margin-top: 20rpx;
			padding:24rpx;
			display: flex;
			box-shadow: 0rpx 10rpx 24rpx 0rpx rgba(0,0,0,0.03);
			border-radius: 20rpx;
			image{
				width: 120rpx;
				height: 120rpx;
			}
			.vip_text{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20rpx;
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN-Medium, Source Han Sans CN;
					font-weight: 600;
					color: #444444;
					line-height: 28rpx;
				}
				.vip_price{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					// line-height: 80rpx;
					text{
						color: #f1416c;
						
					}
					text:nth-child(1){
						font-size: 28rpx;
						font-weight: 700;
						color: #FF6363;
						line-height: 28rpx;
					}
				}
			}
		}
		.card_content{
			margin-top: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			box-shadow: 0rpx 10rpx 24rpx 0rpx rgba(0,0,0,0.03);
			padding:  30rpx 20rpx;
			view{
				padding: 0 24rpx;
				line-height:80rpx;
				border-bottom: 1px solid #F8F8F8;
				text{
					width: 150rpx;
					display: inline-block;
					color: #AFAFAF;
					white-space: nowrap;
				}
			}
		}
		.pay_type_title{
			line-height: 100rpx;
			position: relative;
			font-size: 32rpx;
			font-weight: 600;
		}
		// .pay_type_title::after{
		// 	position: absolute;
		// 	content: "";
		// 	width: 100rpx;
		// 	height: 10rpx;
		// 	background: linear-gradient(90deg,rgba(27,158,242,.8),rgba(27,158,242,0));
		// 	top: 90%;
		// 	left: 0%;
		// }
		.card_pay_type{
			// margin-top: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			box-shadow: 0rpx 10rpx 24rpx 0rpx rgba(0,0,0,0.03);
			view{
				display: flex;
				justify-content: space-between;
				line-height: 100rpx;
				align-items: center;
				padding: 5rpx 12rpx;
				border-bottom: 1px solid #F8F8F8;
				image{
					width: 48rpx;
					height: 48rpx;
				}
				view{
					text:nth-child(2){
						margin-left: 10rpx;
						font-size: 30rpx;
						color: #9F9F9F;
					}
				}
			}
		}
		.submit_btn{
			margin: 30rpx auto 20rpx auto;
			width: 662rpx;
			display: block;
			background: #3B3F47;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 100rpx;
		}
	}
</style>