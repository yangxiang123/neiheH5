<template>
	<view class="padding font30">
		<view @click="toshiming" class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 40rpx 25rpx;">
			<view class="flex align-center flex-sub">
				实名认证
			</view>
			<view class="flex align-center">
				<view class="font30 col-999">
					{{user.real == 1 ? '已实名' : ''}}
				</view>
				<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;margin-left: 16rpx;" mode=""></image>
			</view>
		</view>
		<view @click="topsd" class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 40rpx 25rpx;">
			<view class="flex align-center flex-sub">
				设置操作密码
			</view>
			<view class="flex align-center">
				<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;margin-left: 16rpx;" mode=""></image>
			</view>
		</view>
		<view @click="topsword" class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 40rpx 25rpx;">
			<view class="flex align-center flex-sub">
				修改登录密码
			</view>
			<view class="flex align-center">
				<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;margin-left: 16rpx;" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}
			}
		},
		onLoad(e) {
	
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			topsword(){
				uni.navigateTo({
					url:'/pages/index/reset'
				})
			},
			toshiming(){
				if(this.user.real == 0){
					this.util.urlTo('../index/shiming')
				}else{
					this.util.showToast('您已经实名过啦~')
				}
			},
			topsd(){
				if(this.user.have_set_pwd == 0){
					this.util.urlTo('psd')
				}else{
					this.util.urlTo('psd2')
				}
			},
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.user = res;
				})
			},
		}
	}
</script>

<style>
	page {
		background: #F2F3F7;
		background-size: cover;
		min-height: 100vh;
	}
</style>