<template>
	<view class="page">
		<view class="list" v-if="list.length">
			<view class="item u-row-between" v-for="(item,i) in list" :key="i"
				@click="util.urlTo('/pages/my/notice?id='+item.id)">
				<view class="left u-row-between">
					<view class="title u-line-2">{{item.title}}</view>
					<view class="time">{{item.create_time}}</view>
				</view>
				<image :src="item.cover" mode="aspectFill"></image>
			</view>
			<view class="u-flex u-row-center u-p-b-30">
				<u-loadmore :status="status" color="#fff" />
			</view>
		</view>
		<!-- 空状态 -->
		<empty mode="news" marginTop="200" v-else></empty>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				list: [],
				page: 1,
				last_page: 1,
				status: 'loadmore'
			}
		},
		onLoad(e) {
			this.get_list();
		},
		onReachBottom() {
			if (this.page != this.last_page) {
				this.page++;
				this.get_list();
			} else {
				this.status = 'nomore';
			}
		},
		methods: {
			// 列表数据
			async get_list() {
				this.loading = true;
				this.status = 'loading';
				let res = await this.util.request('index/news', {
					type: 1,
					category: 0,
					page: this.page
				});
				this.list = [...this.list, ...res.data];
				this.last_page = res.last_page;
				if (this.page != this.last_page) this.status = 'loadmore';
				else this.status = 'nomore';
			},

		},

	}
</script>

<style lang="scss">
	page {
		background: #000;
	}

	.list {
		padding: 30rpx 40rpx 0;
		color: #fff;
		animation: show_list .3s linear;
		animation-fill-mode: forwards;

		.item {
			display: flex;
			padding: 30rpx;
			box-sizing: border-box;
			background: linear-gradient(180deg, #414141, #0e0e0e);
			border-radius: 40rpx;
			border: 1px solid #ddd;
			margin-bottom: 30rpx;

			.left {
				display: flex;
				flex-direction: column;
				width: calc(100% - 170rpx);
				height: 150rpx;
				padding: 15rpx 0;

				.title {
					font-weight: bold;
					font-size: 28rpx;
				}

				.time {
					color: #afafaf;
					font-size: 24rpx;
				}
			}

			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>