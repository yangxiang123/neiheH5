<template>
	<view class="padding">
		<view class="flex align-center bg-white pad24 radius20 margin-bottom-sm" v-for="(item,index) in list" :key="index">
			<image :src="item.goods_image" style="width: 160rpx;height: 160rpx;border-radius: 20rpx;" mode=""></image>
			<view class="padding-left-sm flex-sub">
				<view class="font30">
					{{item.goods_name}}
				</view>
				<view class="flex align-center flex-sub margin-top-sm" style="font-size: 20rpx;">
					<view class="left flex justify-center align-center">
						编号
					</view>
					<view class="right flex justify-center align-center text-white">
						{{item.goods_code}}
					</view>
				</view>
				<view class="flex align-center flex-sub" style="margin-top: 30rpx;">
					<view class="font32 flex-sub" style="color: #F3A715;">
						￥{{item.goods_price}}
					</view>
					<view class="font24" style="color: #AF2A2B;">
						{{item.status_text}}
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
				page: 1,
				list: {}
			}
		},
		onLoad(e) {
	
		},
		onShow() {
			this.getlist();
		},
		onPullDownRefresh() {
			this.list = [];
			this.getlist();
		},
		methods: {
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.user = res;
				})
			},
			getlist(){
				this.util.request('hui_shou/my_huishou_list', {
					page: this.page,
					limit: 20,
					type: 0
				}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					this.list = res.list;
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
	.left{
		background: linear-gradient(45deg, #F1BD4D 0%, #EFDE2E 100%);
		padding: 4rpx 8rpx;
		color: #8C521D;
		border-radius: 4rpx 0rpx 0rpx 4rpx;
	}
	.right{
		background-color: #8C521D;
		padding: 4rpx 8rpx;
		border-radius: 0rpx 4rpx 4rpx 0rpx;
	}
</style>