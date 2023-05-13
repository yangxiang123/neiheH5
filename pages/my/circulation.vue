<template>
	<view class="">
		<view class="top_box">
			<view class="top_list" :class="act == index ? 'top_list_act' : 'top_list'" v-for="(item,index) in tablist"
				:key="index" @click="change(item.type,index)">
				{{item.name}}
			</view>
		</view>
		<!-- <view class="flex text-center font32 bg-white" style="padding: 34rpx 0rpx;border-top: solid #F7F7F7 1rpx;">
			<view class="flex-sub" @click="change(1)">
				<span :class="type == 1 ? 'active' : ''">我转赠的</span>
			</view>
			<view class="flex-sub" @click="change(2)">
				<span :class="type == 2 ? 'active' : ''">我收到的</span>
			</view>
		</view> -->
		<scroll-view id="list" :scroll-y="true" :style="'padding: 20rpx 0;height:' + boxHeight + 'px'"
			@scrolltolower="getlist('up')">
			<view class="big_list">
				<view class="bg-white margin-bottom-sm radius20 lists" v-for="(item,index) in list" :key="index">
					<view class="">
						<image :src="item.goods_image" style="width: 340rpx;height: 340rpx;border-radius: 20rpx;"
							mode=""></image>
						<view class="padding-left-sm flex-sub u-margin-top-20">
							<view class="font30 text-bold name">
								{{item.goods_name}}
							</view>
							<view class="margin-top-xs font24 col-999">
								{{type == 1 ? '转赠对象' : '接收对象'}}：{{item.tonickname}}
							</view>
							<view class="flex align-center col-999 font24 margin-top-xs">
								{{type == 1 ? '转赠时间' : '接收时间'}}：{{item.give_time_text.slice(0,11)}}
							</view>
						</view>
					</view>
					<!-- <view class="flex align-center" style="margin-top: 25rpx;" v-if="type == 1">
					<view class="flex-sub"></view>
					<view v-if="item.give_status == 1" class="btnbg font26" style="width: 180rpx;height: 60rpx;">
						{{item.give_status_text}}
					</view>
					<view v-if="item.give_status == 2" class="flex align-center justify-center font26" style="width: 180rpx;height: 60rpx;background-color: #F0F0F0;border-radius: 30rpx;">
						{{item.give_status_text}}
					</view>
				</view> -->
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
				type: 1,
				list: [],
				boxHeight: '',
				tablist: [{
					name: '我转赠的',
					type: 1
				}, {
					name: '我收到的',
					type: 2
				}],
				act: 0
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
					this.boxHeight = this.windowHeight - data.top - 40;
				}).exec();
			},
			change(e, index) {
				this.act = index
				this.list = [];
				this.page = 1;
				this.type = e;
				this.getlist();
			},
			getlist(e) {
				if (e == 'up') {
					this.page++
				}
				this.util.request('user/give_record', {
					type: this.type,
					page: this.page
				}).then(res => {
					uni.stopPullDownRefresh()
					this.list = this.list.concat(res);
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}
	
	.name{
		width:320rpx;
		white-space:nowrap;
		
		overflow:hidden;
		
		text-overflow:ellipsis;
	}

	.top_box {
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 30rpx;

		.top_list {
			width: 250rpx;
			height: 80rpx;
			background-color: #F5F5F5;
			color: #000;
			text-align: center;
			line-height: 80rpx;
			border-radius: 50rpx;
		}

		.top_list_act {
			border-radius: 50rpx;
			width: 250rpx;
			height: 80rpx;
			background-color: #fff;
			color: #000;
			border: 1rpx solid #000;
			text-align: center;
			line-height: 80rpx;
			box-sizing: border-box;
		}
	}

	.big_list {
		display: flex !important;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;

		.lists {
			padding-bottom: 20rpx;

		}

	}

	.active {
		border-bottom: solid 4rpx #3B3F47;
		padding-bottom: 14rpx;
		color: #3B3F47;
	}
</style>
