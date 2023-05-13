<template>
	<view>
		<cu-custom bgColor="#000" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view class="padding">
			<view class="title">{{data.title}}</view>
			<view class="time">{{data.create_time}}</view>
			<u-parse :html="data.content" :show-with-animation="true"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {}
			}
		},
		onLoad(e) {
			this.get_content(e.id);
		},
		methods: {
			async get_content(news) {
				let res = await this.util.request('index/new_detail', {
					news
				});
				this.data = res.new;
			}
		}
	}
</script>

<style>
	page {
		color: #fff !important;
		background: #000;
	}

	.title {
		font-weight: bold;
		font-size: 30rpx;
		margin-bottom: 30rpx;
	}

	.time {
		margin-bottom: 30rpx;
		font-size: 26rpx;
	}
</style>