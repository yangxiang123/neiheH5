<template>
	<view class="page">
		<u-sticky h5-nav-height="0">
			<view class="top-box"> </view>
		</u-sticky>
		<image class="banner" src="/static/banner/banner.gif" mode="widthFix"></image>
		<u-sticky h5-nav-height="0">
			<view class="tabs u-flex u-row-center">
				<view class="item" :class="{'item_avtive': current == 0}" @click="change(0)">首发</view>
				<view class="line"></view>
				<view class="item" :class="{'item_avtive': current == 1}" @click="change(1)">寄售</view>
			</view>
		</u-sticky>
		<template v-if="list.length">
			<!-- 列表 -->
			<view class="u-flex u-row-between u-flex-wrap padding list">
				<view class="item" v-for="(item,i) in list" :key="i" @click="go_detail(item)">
					<view class="img_box">
						<image :src="item.goods_image" mode="aspectFill"></image>
						<view class="price">¥ {{item.goods_price}}</view>
					</view>
					<view class="name u-line-1">
						{{item.goods_name}}
					</view>
				</view>
			</view>
			<!-- 没有更多 -->
			<view class="u-flex u-row-center u-p-b-30">
				<u-loadmore status="nomore" color="#fff" />
			</view>
		</template>
		<!-- loading -->
		<my-loading v-if="loading"></my-loading>
		<!-- 空状态 -->
		<empty mode="object" marginTop="200" v-else-if="!loading && !list.length"></empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				list: [],
				tab_list: [{
					name: '首发'
				}, {
					name: '寄售'
				}],
				current: 0,
				loading: false,
			}
		},
		onLoad(e) {
			this.get_list();
		},
		methods: {
			// 详情
			go_detail(item) {
				if (this.current == 0) {
					// 首发
					uni.navigateTo({
						url: '../home/info?type=0&id=' + item.id
					})
				} else {
					// 寄售
					uni.navigateTo({
						url: './index_detail?type=0&id=' + item.goods_id
					})
				}
			},
			change(index) {
				this.current = index;
				this.list = [];
				if (index == 0) this.get_list();
				else this.get_bazaar_recommend_goods();
			},
			// 首发数据
			async get_list() {
				this.loading = true;
				let arr = [];
				// 发售日历
				let calendar = await this.util.request('index/calendar');
				calendar.forEach(item => {
					arr = [...arr, ...item.goods];
				});
				// 精选推荐
				let choiceness = await this.util.request('index/choiceness');
				arr = [...arr, ...choiceness.goods];
				this.list = arr;
				if (choiceness.top) {
					this.list.unshift(choiceness.top);
				}
				this.loading = false;
			},
			// 寄售
			async get_bazaar_recommend_goods() {
				this.loading = true;
				let res = await this.util.request('goods/bazaar_recommend_goods');
				let arr = [];
				res.forEach(item => {
					// 将数据中 goods 提上来
					arr.push({
						...item,
						...item.goods
					})
				});
				this.list = arr;
				this.loading = false;
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #000;
	}

	.banner {
		width: 100%;
	}


	.tabs {
		width: 100%;
		font-size: 36rpx;
		color: #fff;
		font-weight: 700;
		padding: 30rpx;
		background-color: #000;

		.item {
			border-bottom: 2px solid transparent;
		}


		.line {
			width: 1px;
			height: 32rpx;
			margin: 0 70rpx;
			background-color: #606060;
		}

		.item_avtive {
			color: #448aca;
			border-bottom: 2px solid #448aca;
			transition-duration: .5s;
		}
	}

	.list {
		color: #fff;
		animation: show_list .3s linear;
		animation-fill-mode: forwards;
		padding-bottom: 0;


		.item {
			width: 330rpx;
			margin-bottom: 30rpx;

			.img_box {
				position: relative;
				width: 330rpx;
				height: 330rpx;
				border-radius: 10rpx;

				image {
					width: 330rpx;
					height: 330rpx;
					border-radius: 10rpx;
				}

				.price {
					background-color: rgba(16, 16, 16, .5);
					color: #fff;
					padding: 15rpx 0;
					font-size: 32rpx;
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					text-align: center;
				}
			}



			.name {
				padding: 20rpx 30rpx;
				font-size: 26rpx;
			}
		}
	}

	.top-box {
		width: 100%;
		background: linear-gradient(270.11deg, #000 -17.5%, #666 120.7%, #404040 0);
	}
</style>