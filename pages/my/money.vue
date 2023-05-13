<template>
	<view class="page">
		<cu-custom bgColor="bg-color" :isBack="true" style="color: #444;">
			<block slot="backText" ></block>
			<block slot="content">我的钱包</block>
			<!-- <block slot="right">
				<view class="padding-right-sm col-999" @click="util.urlTo('detailed')">
					余额明细
				</view>
			</block> -->
		</cu-custom>
		<view class="header_box">
			<text class="margin_top30 moneyText">钱包余额</text>
			<text class="margin_top30 money">{{info.money}}</text>
			<view class="btns margin_top30">
				<view class="btns_item btns_item1" @click="torecharge">
					充值
				</view>
				<view class="btns_item btns_item2" @click="tixian" >
					提现
				</view>
			</view>
		</view>
		<view class="card_box">
			<u-cell-group>
				<u-cell-item title="交易记录"  @click="util.urlTo('detailed')">
					<image src="../../static/my/recordlogo.png" class="iconImg" slot="icon" mode=""></image>
				</u-cell-item>
				<u-cell-item title="银行卡"  @click="util.urlTo('bank_list')">
					<image src="../../static/my/banklogo.png" class="iconImg" slot="icon" mode=""></image>
				</u-cell-item>
			</u-cell-group>
		</view>
		<!-- <view class="" style="padding:44rpx;">
			<view class="bg text-white" style="padding: 0 42rpx;">
				<view class="font32" style="text-align: left;padding-top: 76rpx;color: #fff;font-weight:300;">
					钱包余额(元）
				</view>
				<view class="" style="font-size: 40rpx;text-align: left;margin-top:24rpx;color: #fff;font-weight: bold;">
					{{info.money}}
				</view>
				
				
				<view class="flex align-center " style="margin-top: 60rpx;flex-direction: row-reverse;">
					
					<view @click="tixian" class="btn text-lu bg-white flex align-center justify-center margin-left-lg">
						提现
					</view>
					<view @click="torecharge" class="btn text-lu bg-white flex align-center justify-center">
						充值
					</view>
					
				</view>
			</view>
		</view> -->
		<!-- <view class="btnbggg"  @click="util.urlTo('bank_list')" style="position:fixed;left:44rpx;bottom:50rpx;">绑定银行卡</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			}
		},
		onShow(e) {
			this.getinfo();
		},
		methods: {
			getinfo(){
				this.util.getUserInfo().then(res => {
					this.info = res;
				})
			},
			torecharge(){
				this.util.urlTo('recharge')
				// this.util.showToast('通道维护')
			},
			tixian(){
				if(this.info.real == 1){
					this.util.urlTo('withdrawal')
				}else{
					this.util.showMsg('您还未实名认证,请前往实名', 2000,this.util.urlTo('../index/shiming'));
				}
			}
		}
	}
</script>

<style lang="scss">
	.page{
		background-color: #F4F9F9;
		min-height: 100vh;
	}
	.margin_top30{
		margin-top: 30rpx;
	}
	.header_box{
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		/* height: 300rpx; */
		width: 100%;
		align-items: center;
		background-image: linear-gradient( 90deg,#545DFF,#545DFF);
	}
	.moneyText{
		color: #FFFFFF;
	}
	.money{
		color: #FFFFFF;
		font-size: 50rpx;
	}
	/deep/ .u-cell-box{
		border-radius: 30rpx;
	}
	/deep/ .u-cell-item-box{
		border-radius: 30rpx;
		// background-color: red;
		border: none;
	}
	.card_box{
		width: 90%;
		margin: 30rpx auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.iconImg{
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
	.btns{
		margin-top: 50rpx;
		display: flex;
		
	}
	.btns_item{
		padding: 10rpx 100rpx;
		border-radius: 30rpx;
		
	}
	.btns_item1{
		background-color: #FFFFFF;
		color: #A694FF;
	}
	.btns_item2{
		background-color: #545DFF;
		color: #E6E9FF;
		border: 1px solid #AFB3FF;
		margin-left: 40rpx;
	}
	.bg{
		background: url('@/static/money_bg.png') no-repeat center;
		height: 354rpx;
		
		background-size: 100% 100%;
	}
	.btn{
		width: 176rpx;
		height: 60rpx;
		background: #fffff;
		box-shadow: 0px 2rpx 10rpx 0px rgba(0,0,0,0.15000000596046448);
		border-radius: 262rpx;
		text-align: center;
		line-height:60rpx;
		/* color: #fff; */
	}
</style>