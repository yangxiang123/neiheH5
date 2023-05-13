<template>
	<view class="page">
		<view class="way" v-for="(item,index) in list" :key="index">
			<view class="name">{{item.bank_name}}</view>
			<view class="" style="margin-top:10rpx;">{{item.user_name}}</view>
			<view class="code">{{item.bank_card}}</view>
		</view>
		
		<view class="btnbggg" style="width:100%;margin-top:50rpx;"  @click="addbank">添加银行卡</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				list:[]
			}
		},
		onLoad() {
			this.getlist()
			

		},
		methods: {
			getlist(){
				this.util.request('user/signed_bank_card', {
					
				}).then(res => {
					uni.stopPullDownRefresh()
					this.list = res;
				})
			},
			addbank(){
				this.util.request('user/bind_pay_card', {
					
				}).then(res => {
					uni.setStorageSync('url', res);
					this.util.urlTo('../pay/pay');
					
					// // #ifdef H5
					// window.location.href = res;
					// // #endif
								
					// // #ifdef APP-PLUS
					// plus.runtime.openURL(res)
					// // #endif		
				})
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
			background: linear-gradient(90deg, #3b3f47 0%, #404040 100%);
			color: #fff;
			font-size:26rpx;
			border-radius:30rpx;
			margin-bottom: 20rpx;

			
			.name{
				font-size:36rpx;
				font-weight: bold;
			}
			
			.code{
				
				margin-top:30rpx;
				font-size:30rpx;
			}
		}
	}
</style>
