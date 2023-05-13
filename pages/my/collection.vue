<template>
	<view class="padding">
		<view class="flex align-center flex-wrap justify-between">
			<view v-if="item.goods" class="bg-white radius20 margin-bottom-sm" @click="util.urlTo('/pages/market/info?type=1&id=' + item.id)" v-for="(item,index) in list" :key="index">
				<view class="po-rela">
					<image :src="item.goods.goods_image" style="width: 335rpx;height: 335rpx;" class="radius20" mode=""></image>
				</view>
				<view style="padding: 18rpx;">
					<view class="">
						{{item.goods_name}}
					</view>
					<view class="flex align-center" style="font-size: 20rpx;margin-top: 14rpx;">
						<view class="left flex justify-center align-center">
							编号
						</view>
						<view class="right flex justify-center align-center text-white">
							{{item.code}}
						</view>
					</view>
					<view class="flex align-center" style="margin-top: 23rpx;">
						<view class="font36" style="color: #F3A715;">
							<span style="font-size: 24rpx;">￥</span>{{item.goods_price}}
						</view>
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
				type: 1,
				list: []
			}
		},
		onShow() {
			this.list = [];
			this.getlist();
		},
		onPullDownRefresh() {
			this.list = [];
			this.getlist();
		},
		methods: {
			getlist(){
				this.util.request('user/user_compound', {}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					this.list = this.list.concat(res);
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}
	.left{
		background: linear-gradient(45deg, #F1BD4D 0%, #EFDE2E 100%);
		padding: 7rpx;
		color: #8C521D;
		border-radius: 4rpx 0rpx 0rpx 4rpx;
	}
	.right{
		background-color: #8C521D;
		padding: 9rpx;
		border-radius: 0rpx 4rpx 4rpx 0rpx;
	}
</style>