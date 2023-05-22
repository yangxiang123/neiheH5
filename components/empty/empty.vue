<template>
	<view class="empty_box">
		<view class="empty" v-if="show" :style="{marginTop: marginTop + 'rpx', marginBottom :marginBottom + 'rpx'}">
			<image :src="icons[mode].icon"></image>
			<view class="text">
				{{text ? text : icons[mode]['text']}}
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
				default: 100
			},
			// 组件距离下一个元素之间的距离
			marginBottom: {
				type: [String, Number],
				default: 100
			},
			// 显示哪个图标
			mode: {
				type: String,
				default: 'data'
			},
			// 显示文字
			text: {
				type: String,
			}
		},
		data() {
			return {
				icons: {
					car: {
						text: '购物车为空',
						icon: require('./img/car.png')
					},
					page: {
						text: '页面不存在',
						icon: require('./img/page.png')
					},
					search: {
						text: '没有搜索结果',
						icon: require('./img/search.png')
					},
					address: {
						text: '没有收货地址',
						icon: require('./img/address.png')
					},
					order: {
						text: '暂无订单',
						icon: require('./img/order.png')
					},
					coupon: {
						text: '没有优惠券',
						icon: require('./img/coupon.png')
					},
					favor: {
						text: '暂无收藏',
						icon: require('./img/favor.png')
					},
					permission: {
						text: '无权限',
						icon: require('./img/permission.png')
					},
					history: {
						text: '暂无浏览记录',
						icon: require('./img/history.png')
					},
					news: {
						text: '无新闻列表',
						icon: require('./img/news.png')
					},
					message: {
						text: '消息列表为空',
						icon: require('./img/message.png')
					},
					data: {
						text: '暂无数据',
						icon: require('./img/list.png')
					}
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
	.empty_box {
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