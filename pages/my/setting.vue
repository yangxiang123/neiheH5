<template>
	<view class="padding page">
		<view @click="util.urlTo('info')" class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 35rpx 22rpx;">
			<view class="flex align-center flex-sub">
				<image src="/static/my/grxx.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<view class="padding-left-sm">
					个人信息
				</view>
			</view>
			<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;" mode=""></image>
		</view>
		<view @click="util.urlTo('setting2')" class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 35rpx 22rpx;">
			<view class="flex align-center flex-sub">
				<image src="/static/my/zhaq.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<view class="padding-left-sm">
					账号安全
				</view>
			</view>
			<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;" mode=""></image>
		</view>
		<view @click="util.urlTo('binding')" class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 35rpx 22rpx;">
			<view class="flex align-center flex-sub">
				<image src="/static/my/zhaq.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<view class="padding-left-sm">
					提现银行卡
				</view>
			</view>
			<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;" mode=""></image>
		</view>
		<view @click="util.urlTo('bank_list')" class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 35rpx 22rpx;">
			<view class="flex align-center flex-sub">
				<image src="/static/my/zhaq.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<view class="padding-left-sm">
					快捷支付
				</view>
			</view>
			<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;" mode=""></image>
		</view>
		<view @click="util.urlTo('agreement?id=2')" class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 35rpx 22rpx;">
			<view class="flex align-center flex-sub">
				<image src="/static/my/yhxy.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<view class="padding-left-sm">
					用户协议
				</view>
			</view>
			<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;" mode=""></image>
		</view>
		<view @click="util.urlTo('agreement?id=1')" class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 35rpx 22rpx;">
			<view class="flex align-center flex-sub">
				<image src="/static/my/ysxy.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<view class="padding-left-sm">
					隐私协议
				</view>
			</view>
			<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;" mode=""></image>
		</view>
		<view @click="util.urlTo('circulation')" class="bg-white radius20 flex align-center margin-bottom-sm" style="padding: 35rpx 22rpx;">
			<view class="flex align-center flex-sub">
				<image src="/static/my/ysxy.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<view class="padding-left-sm">
					转赠记录
				</view>
			</view>
			<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;" mode=""></image>
		</view>
		
		<view @click="outlogin" class="text-black flex align-center justify-center radius20 bg-white font32" style="height: 120rpx;margin-top: 180rpx;">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
	
		},
		methods: {
			outlogin(){
				this.util.toLogin();
				return false;
			}
		}
	}
</script>

<style>
	page {
		background: #F2F3F7;
		background-size: cover;	
	}
</style>