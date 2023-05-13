<template>
	<view class="">
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<view class="top_box">
				<view class="top_list" :class="act == index ? 'top_list_act' : 'top_list'"
					v-for="(item,index) in tablist" :key="index" @click="change(item.type,index)">
					{{item.name}}
				</view>
			</view>
			<!-- <view class="flex text-center font32 bg-white" style="padding: 34rpx 0rpx;border-top: solid #F7F7F7 1rpx;">
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
			</view> -->
		</u-sticky>
		<scroll-view id="list" :scroll-y="true" :style="'padding: 20rpx 27rpx;height:' + boxHeight + 'px'"
			v-show="list.length>0" @scrolltolower="getlist('up')">
			<view class="bg-white margin-bottom-sm radius20" style="padding: 29rpx 26rpx;" v-for="(item,index) in list"
				:key="index">

				<view class="lists" v-if="item.top_type==0">
					<view class="flex align-center justify-between">
						<view class="type_btn">藏品</view>
						<!-- <view class="font26 flex-sub col-999">
							{{item.order_time_text}}
						</view> -->
						<view class="font26 col-999 flex align-center"
							@click="util.urlTo('orderdetailed?id=' + item.order_sn)">
							<view class="padding-right-sm"
								:class="item.order_status==1?'':item.order_status==2?'text-red':item.order_status==0?'text-blue':''">
								{{item.order_status_text}}
							</view>
							<image src="../../static/my/right.png" style="width: 11rpx;height: 19rpx;" mode=""></image>
						</view>
					</view>
					<view v-if="item.goods" class="flex align-center margin-top-sm">
						<image :src="item.goods.goods_image" style="width: 160rpx;height: 160rpx;border-radius: 10rpx;"
							mode=""></image>
						<view class="padding-left-sm right_index" style="width:480rpx;">
							<view class="left_name">
								<view class="font30">
									{{item.goods.goods_name}}
								</view>
								<view class="font32 " style="color:  #3b3f47;">
									￥{{item.order_amount}}
								</view>

							</view>

							<view class="flex align-center justify-between" style="margin-top: 60rpx;">
								<view class="code">#{{item.goods_code}}<text
										class="hou">/{{item.goods.limit_number}}</text>
								</view>
								<view class=" font24">
									{{item.order_time_text}}
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="lists" v-if="item.top_type==1">
					<view class="flex align-center justify-between">
						<!-- <view class="font26 flex-sub col-999">
							{{item.order_time_text}}
						</view> -->
						<view class="type_btn">盲盒</view>
						<view class="font26 col-999 flex align-center">
							<view class="padding-right-sm" @click="util.urlTo('orderBoxDetail?id=' + item.order_sn)">
								{{item.order_status_text}}
							</view>
							<image src="../../static/my/right.png" style="width: 11rpx;height: 19rpx;" mode=""></image>
						</view>
					</view>
					<view class="flex align-center margin-top-sm">
						<image :src="item.box.box_image" style="width: 160rpx;height: 160rpx;border-radius: 10rpx;"
							mode=""></image>
						<view class="padding-left-sm right_index" style="width:480rpx;">
							<view class="left_name">
								<view class="font30">
									{{item.box.box_name}}
								</view>
								<view class="font32 " style="color: #3b3f47;">
									￥{{item.order_amount}}
								</view>
							</view>

							<view class="flex align-center justify-between" style="margin-top: 60rpx;">

								<view class="code">#{{item.goods_code}}<text
										class="hou">/{{item.box.limit_number}}</text>
								</view>
								<view class=" font24">
									{{item.order_time_text}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</scroll-view>
		<view class="listIsNull" v-show="list.length == 0">
			<image src="../../static/my/good_null.png" mode=""></image></text>
			<text>暂无订单</text>
		</view>

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
				type1: true,
				tablist: [{
					name: '全部',
					type: 999
				}, {
					name: '进行中',
					type: 0
				}, {
					name: '已完成',
					type: 1
				}, {
					name: '已取消',
					type: 2
				}],
				act: 0
			}
		},
		onLoad(e) {
			if(e.type == 0){
				this.change(0,1)
				return
			}
			this.getlist();
			uni.$on('refreshData', () => {
				this.list = [];
				this.page = 1;
				this.getlist();
			})
		},
		mounted() {
			// location.reload()
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
			change(e, index) {
				this.act = index
				this.page = 1;
				this.type = e;
				this.list = [];
				this.getlist();
			},
			getlist(e) {
				if (e == 'up') {
					this.page++;
				}
				if (e == 1) {
					this.list = [];
					this.page = 1;
				}
				this.util.request('order/goods_order', {
					type: this.type == 999 ? '' : this.type,
					page: this.page,
					source: 1
				}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					res.forEach(item => {
						this.$set(item, 'top_type', 0)
					})

					this.list = this.list.concat(res);


				})
				this.util.request('order/goods_order', {
					type: this.type == 999 ? '' : this.type,
					page: this.page,
					source: 2
				}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					res.forEach(item => {
						this.$set(item, 'top_type', 1)
					})
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

	.top_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;

		.top_list {
			width: 150rpx;
			height: 50rpx;
			background-color: #F5F5F5;
			color: #626262;
			text-align: center;
			line-height: 50rpx;
			border-radius: 50rpx;
		}

		.top_list_act {
			border-radius: 50rpx;
			width: 150rpx;
			height: 50rpx;
			background-color: #00CBD7;
			color: #fff;
			text-align: center;
			line-height: 50rpx;
			box-sizing: border-box;

		}
	}

	.active {
		border-bottom: solid 8rpx #000;
		padding-bottom: 14rpx;
		color: #000;
	}


	.lists {
		.type_btn {
			background-color: #000;
			width: 80rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			color: #fff;
		}





		.left_name {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.code {
			line-height: 34rpx;

			font-weight: 700;
			font-size: 28rpx;
			color: #000;

			.hou {
				font-weight: 400;
				font-size: 24rpx;
				color: #CCC;
				white-space: nowrap;
			}
		}
	}

	.listIsNull {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 200rpx;

		image {
			width: 540rpx;
			height: 380rpx;
			// height: 241rpx;
		}

		text {
			color: #D5D5D5;
		}
	}
</style>