<template>
	<view class="content">
		<u-navbar title="充值" bgColor="#FFFFFF" titleStyle="font-size: 38rpx;color:#000000;font-weight:1000;" leftIconColor="#000000" :autoBack="true" :placeholder="true"></u-navbar>
		
		<view class="tips-top">充值金额</view>
		<view class="recharge-box">
			<view class="list" :class="{'lists':item.status==true}" v-for="(item,index) in list" :key="index" @tap="listBut(item)">{{item.num}}</view>
			<input type="digit" :disabled="inputStatus" v-model="inputPrice" placeholder="请输入充值金额">
		</view>
		
		<view class="list-box">
			<view class="tips">充值方式</view>
			<view class="lists">
				
				<view class="line"></view>
				
				<!-- #ifdef APP-PLUS-->
				<view class="list" @tap="payBut(1)">
					<image class="icon1" src="../../../static/yhk.png" mode=""></image>
					<view class="text">支付宝支付</view>
					<!-- <image class="icon" src="../../static/x1.png" v-show="payType!=1"></image>
					<image class="icon" src="../../static/x3.png" v-show="payType==1"></image> -->
				</view>
				<!-- #endif -->
				
				<!-- #ifdef H5 -->
				<view class="list" @tap="payBut(2)">
					<image class="icon1" src="../../../static/yhk.png" mode=""></image>
					<view class="text">支付宝支付</view>
					<!-- <image class="icon" src="../../static/x1.png" v-show="payType!=2"></image>
					<image class="icon" src="../../static/x3.png" v-show="payType==2"></image> -->
				</view>
				<!-- #endif -->
				
				<!-- #ifdef APP-PLUS -->
					<view class="list" @tap="payBut(3)">
						<image class="icon1" src="../../../static/yhk.png" mode=""></image>
						<view class="text">微信支付</view>
						<!-- <image class="icon" src="../../static/x1.png" v-show="payType!=3"></image>
						<image class="icon" src="../../static/x3.png" v-show="payType==3"></image> -->
					</view>
				<!-- #endif -->
				
				<!-- #ifdef H5 -->
					<!-- <view class="list" @tap="payBut(4)">
						<image class="icon1" src="../../static/9.png" mode=""></image>
						<view class="text">微信支付</view>
						<image class="icon" src="../../static/x1.png" v-show="payType!=4"></image>
						<image class="icon" src="../../static/x3.png" v-show="payType==4"></image>
					</view> -->
				<!-- #endif -->
				
				<view class="line"></view>
			</view>
		</view>
		
		<view class="zhu">注：自定义充值必须是10的倍数，每次充值不得少于10元</view>
		
		<view class="butt">
			<view class="but" @tap="tixianBut">
				充值
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					num:10,
					status:true
				},
				{
					num:100,
					status:false
				},
				{
					num:500,
					status:false
				},
				{
					num:1000,
					status:false
				},
				{
					num:5000,
					status:false
				},
				{
					num:'自定义',
					status:false
				}],
				price:10,
				inputPrice:'',
				inputStatus:true,
				
				// #ifdef APP-PLUS
					payType:1,
				// #endif
				
				// #ifdef H5
					payType:2,
				// #endif
			}
		},
		onLoad() {
			let that=this;
		},
		methods: {
			listBut(item){
				let that = this;
				that.list.forEach(function(v,k){
					v.status = false;
				})
				item.status = true;
				if(item.num == '自定义'){
					that.price = 0;
					that.inputStatus = false;
				}else{
					that.price = item.num;
					that.inputPrice = '';
					that.inputStatus = true;
				}
			},
			payBut(type){
				let that = this;
				that.payType = type;
			},
			tixianBut(){
				let that = this;
				let money = '';
				if(that.price==0){
					if(that.inputPrice == ''){
						that.tui.toast('请输入充值金额');
						return false;
					}else{
						money = that.inputPrice;
						// if(Math.round(Number(money)/10) != Number(money)/10 || Number(money)<10){
						// 	that.tui.toast('充值金额必须是10的倍数');
						// 	return false;
						// }
					}
				}else{
					money = that.price;
				}
				
				uni.showLoading({
					title: '充值中...',
					mask: true
				});
				
				this.$http('/mine/Recharge',{
					count:money,
					type:that.payType,
					ip:'183.17.60.48'
				}).then(function(res){
					uni.hideLoading();
					if(res.code=='10000'){
						
						//支付宝APP
						if(that.payType == 1){
							that.tui.aLiPay(res.data,function(res1){
								that.tui.toast('充值成功','none',1000,function(){
									that.tui.urlBack(1);
								})
							},function(err){
								that.tui.toast('取消支付');
							})
						}
						
						//支付宝H5
						if(that.payType == 2){
							document.querySelector('body').innerHTML = res.data;
							document.forms[0].submit();
						}
						
						//微信APP
						if(that.payType == 3){
							that.tui.wxPay(res.data,function(res1){
								that.tui.toast('充值成功','none',1000,function(){
									that.tui.urlBack(1);
								})
							},function(err){
								that.tui.toast('取消支付');
							})
						}
						
					}else{
						that.tui.toast(res.info);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.recharge-box{
		width: 710rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.list{
			width: 210rpx;
			height: 80rpx;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			background-color: #F9F9F9;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			text-align: center;
			line-height: 80rpx;
			border: 1px solid #000000;
		}
		.lists{
			background: #FEE50D;
			color: #000000;
		}
		input{
			width: 650rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #AFACBB;
			padding: 20rpx 30rpx;
			background-color: #F9F9F9;
			border-radius: 10rpx;
		}
	}
	
	.tips-top{
		width: 700rpx;
		margin: 0 auto;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #000000;
		padding: 20rpx 0;
	}
	
	.list-box{
		width: 750rpx;
		margin: 0 auto;
		padding: 20rpx 0 0 0;
		.tips{
			width: 700rpx;
			margin: 0 auto;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #000000;
			padding: 20rpx 0;
		}
		.line{
			width: 100%;
			height: 1rpx;
			background-color: #eeeeee;
		}
		.list{
			width: 690rpx;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.icon1{
				width: 40rpx;
				height: 40rpx;
			}
			.text{
				flex: 1;
				padding: 0 15rpx;
				font-size: 28rpx;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: #000000;
			}
			.icon{
				width: 31rpx;
				height: 31rpx;
			}
		}
	}
	
	.zhu{
		width: 700rpx;
		padding: 20rpx 0;
		margin: 0 auto;
		font-size: 26rpx;
		font-family: PingFang-SC-Regular, PingFang-SC;
		font-weight: 400;
		color: #EA4B4B;
	}
	
	.butt{
		width: 750rpx;
		margin: 0 auto;
		position: fixed;
		bottom: 0;
		padding: 10rpx 0 100rpx 0;
		.but{
			width: 600rpx;
			height: 100rpx;
			margin: 0 auto;
			background-color: red;
			text-align: center;
			line-height: 100rpx;
			background: #FEE50D;
			border-radius: 55rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #000000;
			border: 1px solid #000000;
		}
	}
	
	
	
</style>
