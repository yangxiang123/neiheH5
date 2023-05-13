<template>
	<view class="page">
		<view class="empty" v-if="show" :style="{
		marginTop: marginTop + 'rpx'
	}">
			<image src="./img/address.png" v-if="mode == 'address'"></image>
			<image src="./img/list.png" v-if="mode == 'list'"></image>
			<image src="./img/message.png" v-if="mode == 'message'"></image>
			<image src="./img/order.png" v-if="mode == 'order'"></image>
			<image src="./img/search.png" v-if="mode == 'search'"></image>
			<image src="./img/news.png" v-if="mode == 'news'"></image>
			<image src="./img/favor.png" v-if="mode == 'favor'"></image>
			<image src="./img/history.png" v-if="mode == 'history'"></image>
			<image src="./img/coupon.png" v-if="mode == 'coupon'"></image>
			<image src="./img/permission.png" v-if="mode == 'permission'"></image>
			<image src="./img/car.png" v-if="mode == 'car'"></image>
			<image src="./img/page.png" v-if="mode == 'page'"></image>
			<image src="./img/list.png" v-if="mode == 'data'"></image>
			<image src="./img/list.png" v-if="mode == 'recommend'"></image>
			<image src="./img/list.png" v-if="mode == 'object'"></image>


			<view class="text">
				{{icons[mode]}}
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "empty",
		props: {
			// 是否显示
			show: {
				type: Boolean,
				default: true
			},
			// 组件距离上一个元素之间的距离
			marginTop: {
				type: [String, Number],
				default: 0
			},
			// 显示哪个图标
			mode: {
				type: String,
				default: 'data'
			},
		},
		data() {
			return {
				icons: {
					car: '购物车为空',
					page: '页面不存在',
					search: '没有搜索结果',
					address: '没有收货地址',
					order: '暂无订单',
					coupon: '没有优惠券',
					news: '暂无资讯',
					message: '消息列表为空',
					list: '暂无记录',
					data: '暂无数据',
					recommend: '暂无推荐',
					object: '暂无藏品'
				},
			};
		}
	}
</script>

<style lang="scss">
	.page {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	image {
		width: 160px;
		height: 160px;
	}

	.empty {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.text {
		text-align: center;
		color: #c0c4cc;

	}
</style>