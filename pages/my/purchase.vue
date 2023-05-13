<template>
	<view class="padding">
		<view class="flex align-center flex-wrap justify-between">
			<view class="bg-white radius20 margin-bottom-sm" @click="modalName='Modal'" v-for="(item,index) in 5" :key="index">
				<view class="po-rela">
					<image src="../../static/tx.jpg" style="width: 335rpx;height: 335rpx;" class="radius20" mode=""></image>
				</view>
				<view style="padding: 18rpx;">
					<view class="">
						王者全家福
					</view>
					<view class="flex align-center" style="font-size: 20rpx;margin-top: 14rpx;">
						<view class="left flex justify-center align-center">
							限量
						</view>
						<view class="right flex justify-center align-center text-white">
							8000份
						</view>
					</view>
					<view class="flex align-center" style="margin-top: 23rpx;">
						<view class="font36" style="color: #F3A715;">
							<span style="font-size: 24rpx;">￥</span>125.00
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 发布声明弹窗 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''" style="z-index: 1;">
			<view class="cu-dialog radius20 smbg po-rela bg-white" @click.stop>
				<view class="text-left" style="padding: 40rpx 60rpx;border-bottom: solid 1rpx #F7F7F7;">
					<view class="font34 text-center">
						确定质押
					</view>
					<view class="" style="margin-top: 53rpx;">
						藏品：西施世家
					</view>
					<view class="" style="margin-top: 53rpx;">
						质押周期：1周
					</view>
				</view>
				<view class="flex align-center">
					<view @click="modalName=''" class="flex-sub col-999 flex align-center justify-center" style="padding: 36rpx 0rpx;border-right: solid 1rpx #F7F7F7;">
						取消
					</view>
					<view class="flex-sub text-blue flex align-center justify-center" style="padding: 36rpx 0rpx;">
						确认
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: ''
			}
		},
		onLoad(e) {
	
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
	.left{
		background: linear-gradient(45deg, #F1BD4D 0%, #EFDE2E 100%);
		width: 56rpx;
		height: 34rpx;
		color: #8C521D;
		border-radius: 4rpx 0rpx 0rpx 4rpx;
	}
	.right{
		background-color: #8C521D;
		width: 88rpx;
		height: 34rpx;
		border-radius: 0rpx 4rpx 4rpx 0rpx;
	}
</style>