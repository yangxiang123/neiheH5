<template>
	<view class="padding">
		<view class="flex align-center flex-wrap justify-between">
			<view class="bg-white radius20 margin-bottom-sm" @click="util.urlTo('../club/studio?id=' + item.id)" v-for="(item,index) in list" :key="index" style="width: 48%;">
				<view class="po-rela">
					<image :src="item.organiza_image" style="width: 335rpx;height: 335rpx;" class="radius20" mode=""></image>
				</view>
				<view style="padding: 18rpx;">
					<view class="text-center">
						{{item.organiza_name}}
					</view>
					<view class="font24 col-999 margin-top-xs">
						{{item.organiza_jianjie}}
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
				list: []
			}
		},
		onLoad(e) {
			this.getlist();
		},
		onPullDownRefresh() {
			this.list = [];
			this.getlist();
		},
		methods: {
			getlist(){
				this.util.request('center/organiza_list', {
					my_follow: 1
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
</style>