<template>
	<view class="padding">
		<view class="bg flex align-center justify-center text-white">
			0
		</view>
		
		<view class="margin-top-sm radius20 bg-white">
			<view class="flex align-center justify-center font30" style="padding: 45rpx 0rpx;">
				碎片明细
			</view>
			<view class="flex align-center" v-for="(item,index) in list" :key="index" style="padding: 28rpx 32rpx;border-top: #E7E7E7 1rpx solid;">
				<view class="flex-sub">
					<view class="">
						来源：质押获取
					</view>
					<view class="font24 col-999 padding-top-xs">
						时间：2022-05-23
					</view>
				</view>
				<view class="">
					+99
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
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
	.bg{
		background: url("@/static/my/fragmentbg.png") no-repeat;
		height: 320rpx;
		background-size: cover;
		font-size: 80rpx;
	}
</style>