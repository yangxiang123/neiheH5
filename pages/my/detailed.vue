<template>
	<view class="">
		<view class="top_box">
			<view class="top_list" :class="act == index ? 'top_list_act' : 'top_list'"
				v-for="(item,index) in tablist" :key="index" @click="change(item.type,index)">
				{{item.name}}
			</view>
		</view>
		<!-- <view class="flex text-center font32 bg-white" style="padding: 34rpx 0rpx;border-top: solid #F7F7F7 1rpx;">
			<view class="flex-sub" @click="change(0)">
				<span :class="type == 0 ? 'active' : ''">全部</span>
			</view>
			<view class="flex-sub" @click="change(1)">
				<span :class="type == 1 ? 'active' : ''">收入</span>
			</view>
			<view class="flex-sub" @click="change(2)">
				<span :class="type == 2 ? 'active' : ''">支出</span>
			</view>
			<view class="flex-sub" @click="change(3)">
				<span :class="type == 3 ? 'active' : ''">充值</span>
			</view>
		
			<view class="flex-sub" @click="change(4)">
				<span :class="type == 4 ? 'active' : ''">提现</span>
			</view>
			
			
		</view> -->
		<scroll-view id="list" :scroll-y="true" :style="'padding: 20rpx 27rpx;height:' + boxHeight + 'px'" @scrolltolower="getlist('up')">
			<view class="radius20 bg-white">
				<view class="bor-b-F2" style="padding: 38rpx 26rpx;" v-for="(item,index) in list"
					:key="index">
					<view class="font30 margin-bottom-xs text-bold" v-if="type == 4">
						提现
					</view>
					<view class="flex align-center">
						<view class="font26 flex-sub" style="color: #F3A715;">
							{{item.source_text}}
						</view>
						<view class="font36" :class="type != 2 ? 'text-blue' : 'text-red'">
							{{item.type == 1 ? '+' : '-'}}{{item.money}}
						</view>
					</view>
					<view class="flex align-center margin-top-sm col-999">
						<view class="font26 flex-sub">
							{{item.createtime_text}}
						</view>
<!-- 						<view class="font26">
							余额：{{item.after}}
						</view> -->
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
				type: 0,
				list: [],
				boxHeight: '',
				tablist: [{
					name: '全部',
					type: 0
				}, {
					name: '收入',
					type: 1
				}, {
					name: '支出',
					type: 2
				}, {
					name: '充值',
					type: 3
				}, {
					name: '提现',
					type: 4
				}],
				act: 0
			}
		},
		onLoad(e) {
			this.getlist();
		},
		onReady() {
			this.box();
		},
		onPullDownRefresh() {
			this.list = [];
			this.getlist();
		},
		methods: {
			box() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#list').boundingClientRect(data => {
					this.boxHeight = this.windowHeight - data.top - 40;
				}).exec();
			},
			getlist(e){
				if(e == 'up'){
					this.page++
				}
				if (e == 1) {
					this.list = [];
					this.page = 1;
				}
				this.util.request('money/money_log', {
					source: this.type,
					page: this.page
				}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					this.list = this.list.concat(res)
				})
			},
			change(e,index){
				this.act = index
				this.list = [];
				this.type = e;
				this.getlist(1);
			}
		}
	}
</script>

<style lang="scss">
	
	.top_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
	
		.top_list {
			width: 150rpx;
			height: 50rpx;
			background-color: #fff;
			color: #000;
			text-align: center;
			line-height: 50rpx;
			border-radius: 50rpx;
		}
	
		.top_list_act {
			border-radius: 50rpx;
			width: 150rpx;
			height: 50rpx;
			background-color: #fff;
			color: #000;
			border: 1rpx solid #000;
			text-align: center;
			line-height: 50rpx;
			box-sizing: border-box;
		}
	}
	page {
		background-color: #F7F7F7;
	}

	.active {
		border-bottom: solid 4rpx #b47528;
		padding-bottom: 14rpx;
		color: #b47528;
	}
</style>
