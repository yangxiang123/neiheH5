<template>
	<view class="">
		<view class="top_box">
			<u-row gutter="15" class="search-row">
				<u-col span="7">
					<view class="search-box">
						<u-input v-model="searchDate" type="text" disabled @click="dateShow=true" placeholder="选择日期"
						:custom-style="{'color':'#c0c4cc','font-size':'25rpx'}"
							border height="60" />
						<u-calendar v-model="dateShow" :mode="dateMode" @change="dateChange"></u-calendar>
					</view>
				</u-col>
				<u-col span="5">
					<view class="search-box">
						<u-input v-model="searchType" type="text" disabled @click="typeShow=true" placeholder="选择类型"
							border height="60" :custom-style="{'color':'#c0c4cc','font-size':'25rpx'}" />
						<u-select v-model="typeShow" :list="typeList" @confirm="typeSelect"></u-select>
					</view>
				</u-col>
			</u-row>
		</view>
		<scroll-view id="list" :scroll-y="true" :style="'padding: 20rpx 27rpx;height:' + boxHeight + 'px'"
			@scrolltolower="getlist('up')">
			<view>
				<view class="bor-b-F2" style="padding: 20rpx 20rpx;" v-for="(item,index) in list" :key="index">
					
					<view class="flex align-center">
						<view class="font26 flex-sub" style="color: #333;font-weight: 600;">
							{{item.source_text}}
						</view>
						<view class="font36" :class="item.type == 1 || item.type == 3 ? 'text-green' : 'text-red'">
							{{item.type == 1 || item.type == 3 ? '+' : '-'}}{{item.money}}
						</view>
					</view>
					<view class="flex align-center margin-top-sm col-999">
						<view class="font26 flex-sub">
							余额：{{item.after}}
						</view>
						<view class="font26">
							{{item.createtime_text}}
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
				//日期筛选参数
				searchDate: '',
				dateShow: false,
				dateMode: '',
				//类型筛选参数
				searchType: '',
				typeShow: false,
				typeList: [{
					label: '全部',
					value: 0
				}, {
					label: '收入',
					value: 1
				}, {
					label: '支出',
					value: 2
				}, {
					label: '充值',
					value: 3
				}, {
					label: '提现',
					value: 4
				}],
				//搜索参数
				searchParms:{
					type:0,
				},


				page: 1,
				list: [
					{
						type:1,
						source_text:"收入",
						money:500,
						createtime_text:"2023-5-4",
						after:670
					},
					{
						type:2,
						source_text:"支出",
						money:500,
						createtime_text:"2023-5-4",
						after:670
					},
					{
						type:3,
						source_text:"充值",
						money:500,
						createtime_text:"2023-5-4",
						after:670
					},
					{
						type:4,
						source_text:"提现",
						money:500,
						createtime_text:"2023-5-4",
						after:670
					}
					
				],
				boxHeight: '',
				act: 0
			}
		},
		onLoad(e) {
			// this.getlist();
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
			getlist(e) {
				if (e == 'up') {
					this.page++
				}
				if (e == 1) {
					this.list = [];
					this.page = 1;
				}
				this.util.request('money/money_log', {
					source: this.searchParms.type,
					page: this.page
				}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					this.list = this.list.concat(res)
				})
			},
			dateChange(res) {
				this.searchDate = res.startDate + '至' + res.endDate
				this.searchParms.startdate = res.startDate
				this.searchParms.enddate = res.endDate
				// this.getlist(1);
			},
			typeSelect(res) {
				let obj = res[0];
				this.searchType = obj.label
				this.searchParms.type = obj.value
			}
		}
	}
</script>

<style lang="scss">
	.top_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 30rpx;

		.search-row {
			margin-right: 100rpx;
		}


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