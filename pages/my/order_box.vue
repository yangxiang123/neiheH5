<template>
	<view class="">
		<!-- <view class="bg-white">
			<cu-custom bgColor="bg-white" :isBack="true">
				<block slot="content">我的订单</block>
				<block slot="right">
					<view class="margin-right" @click="type1 = !type1;getlist(1)">
						{{type1?'藏品':'盲盒'}}
					</view>
				</block>
			</cu-custom>
		</view> -->
		<view class="flex text-center font32 bg-white" style="padding: 34rpx 0rpx;border-top: solid #F7F7F7 1rpx;">
			<view class="flex-sub" @click="change(999)">
				<span :class="type == 999 ? 'active' : ''">全部</span>
			</view>
			<view class="flex-sub" @click="change(0)">
				<span :class="type == 0 ? 'active' : ''">进行中</span>
			</view>
			<view class="flex-sub" @click="change(1)">
				<span :class="type == 1 ? 'active' : ''">已完成</span>
			</view>
			<view class="flex-sub" @click="change(2)">
				<span :class="type == 2 ? 'active' : ''">已取消</span>
			</view>
		</view>
		<scroll-view id="list" :scroll-y="true" :style="'padding: 20rpx 27rpx;height:' + boxHeight + 'px'" @scrolltolower="getlist('up')">
			<view class="bg-white margin-bottom-sm radius20" style="padding: 29rpx 26rpx;" v-for="(item,index) in list"
				:key="index" v-if="type1 == true">
				<view @click="util.urlTo('orderdetailed?id=' + item.order_sn)" class="flex align-center">
					<view class="font26 flex-sub col-999">
						{{item.order_time_text}}
					</view>
					<view class="font26 col-999 flex align-center">
						<view class="padding-right-sm">
							查看详情
						</view>
						<image src="../../static/my/right.png" style="width: 11rpx;height: 19rpx;" mode=""></image>
					</view>
				</view>
				<view v-if="item.goods" class="flex align-center margin-top-sm">
					<image :src="item.goods.goods_image" style="width: 160rpx;height: 160rpx;border-radius: 10rpx;" mode=""></image>
					<view class="padding-left-sm flex-sub">
						<view class="font30">
							{{item.goods.goods_name}}
						</view>
						<view class="flex align-center" style="font-size: 20rpx;margin-top: 26rpx;">
							<view class="left flex justify-center align-center">
								编号
							</view>
					<!-- 		<view class="right flex justify-center align-center text-white " >
								{{item.goods_code}}
							</view> -->
							<view class="right flex justify-center align-center text-white " >
								****
							</view>
						</view>
						<view class="flex align-center" style="margin-top: 30rpx;">
							<view class="font32 flex-sub" style="color:  #3b3f47;">
								￥{{item.order_amount}}
							</view>
							<view class="text-red font24">
								{{item.order_status_text}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view  class="bg-white margin-bottom-sm radius20" style="padding: 29rpx 26rpx;" v-for="(item,index) in list" v-if="type1 == false">
				<view @click="util.urlTo('orderBoxDetail?id=' + item.order_sn)" class="flex align-center">
					<view class="font26 flex-sub col-999">
						{{item.order_time_text}}
					</view>
					<view class="font26 col-999 flex align-center">
						<view class="padding-right-sm">
							查看详情
						</view>
						<image src="../../static/my/right.png" style="width: 11rpx;height: 19rpx;" mode=""></image>
					</view>
				</view>
				<view class="flex align-center margin-top-sm">
					<image :src="item.box.box_image" style="width: 160rpx;height: 160rpx;border-radius: 10rpx;" mode=""></image>
					<view class="padding-left-sm flex-sub">
						<view class="font30">
							{{item.box.box_name}}
						</view>
						<view class="flex align-center" style="font-size: 20rpx;margin-top: 26rpx;">
							<view class="left flex justify-center align-center">
								编号
							</view>
							<view class="right flex justify-center align-center text-white">
								{{item.goods_code}}
							</view>
						</view>
						<view class="flex align-center" style="margin-top: 30rpx;">
							<view class="font32 flex-sub" style="color: #3b3f47;">
								￥{{item.order_amount}}
							</view>
							<view class="text-red font24">
								{{item.order_status_text}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				type: 999,
				list: [],
				boxHeight: '',
				type1:true
			}
		},
		onLoad(e) {
			this.getlist();
		},
		onPullDownRefresh() {
			this.list = [];
			this.getlist();
		},
		onReady() {
			this.box();
		},
		methods: {
			box() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#list').boundingClientRect(data => {
					// this.boxHeight = this.windowHeight - data.top - 40;
					this.boxHeight = this.windowHeight - data.top - 0;
				}).exec();
			},
			change(e){
				this.page = 1;
				this.type = e;
				this.list = [];
				this.getlist();
			},
			getlist(e){
				if(e == 'up'){
					this.page++;
				}
				if(e == 1){
					this.list = [];
					this.page = 1;
				}
				this.util.request('order/goods_order', {
					type: this.type == 999 ? '' : this.type,
					page: this.page,
					source:this.type1?1:2
				}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					this.list = this.list.concat(res);
					console.log(res)
					console.log(this.list)
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.active {
		border-bottom: solid 4rpx #b47528;
		padding-bottom: 14rpx;
		color: #b47528;
	}
	.left {
		background: #3b3f47;
		padding: 4rpx 8rpx;
		color: #fff;
		border-radius: 6rpx 0rpx 0rpx 6rpx;
	}
	
	.right {
		color: #3b3f47;
		padding: 4rpx 8rpx;
		border-radius: 0rpx 6rpx 6rpx 0rpx;
		border: 1rpx solid #3b3f47;
	}
</style>