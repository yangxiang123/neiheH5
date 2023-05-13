<template>
	<view class="padding">
		<view class="" v-for="(item,index) in 4" :key="index">
			<view @click="show(index)" class="bg-white flex align-center radius20" style="padding: 18rpx 31rpx;">
				<view class="flex-sub flex align-center">
					<image src="../../static/tx.jpg" style="width: 76rpx;height: 76rpx;border-radius: 50%;" mode=""></image>
					<view class="padding-left-sm font30">
						奈斯俱乐部NFT质押
					</view>
				</view>
				<view class="font26 col-999">
					<image src="../../static/market/bottom.png" style="width: 30rpx;height: 17rpx;" mode=""></image>
				</view>
			</view>
			<view v-if="showindex == index"  v-for="(items,indexs) in 4" :key="indexs" class="flex align-center" style="padding: 18rpx 31rpx;border-bottom: solid 1rpx #E7E7E7;">
				<view class="flex-sub">
					<view class="" style="color: #222;">
						30份西施NFt质押一周
					</view>
					<view class="font26 margin-top-xs" style="color: #666;">
						30碎片
					</view>
				</view>
				<view class="btnbg" style="width: 136rpx;height: 60rpx;">
					申购
				</view>
			</view>
		</view>
	</view>
	<!-- <view class="flex align-center justify-center font42 text-bold" style="height: 50vh;">
		暂未开放,敬请期待
	</view> -->
</template>

<script>
	export default {
		data() {
			return {
				showindex: -1
			}
		},
		onLoad(e) {
	
		},
		methods: {
			show(e){
				console.log(e)
				if(!isNaN(e) && this.showindex == -1){
					this.showindex = e;
				}else{
					this.showindex = -1;
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
</style>