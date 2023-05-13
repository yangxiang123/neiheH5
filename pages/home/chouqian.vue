<template>
	<view>
		<view class="lists">
			<view class="big" v-for="(item,index) in list">
				<view class="" v-if="item.goods" @click="util.urlTo('chou_qian_xiang_qing?id='+item.id)">
					<image :src="item.goods.goods_image" mode="aspectFill" class="img"></image>

					<view class="information">
						<view class="flex justify-between align-center">
							<view class="information_title">{{item.goods.goods_name}}</view>
							<!-- <view class="font24">限量{{item.limit_number}}份</view> -->
						</view>
						<view class="flex align-center" style="margin-top:35rpx;">
							<!-- <image :src="item.publish_image" mode="" style="width:20rpx;height:20rpx;"></image> -->
							{{item.introduce}}
						</view>

						<!-- <view class="information_btn">￥{{item.goods_price}}</view> -->
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.get_list();
		},
		methods: {
			get_list() {
				this.util.request('user/draw_activity', {
					page: 1

				}).then(res => {
					console.log(res);
					this.list = res.data;
				})

			},
		}
	}
</script>

<style lang="scss">
	.big {
		background: #FFFFFF;
		box-shadow: 0px 8rpx 30rpx 0px rgba(0, 0, 0, 0.05000000074505806);
		border-radius: 30rpx;
		position: relative;
		margin-bottom: 30rpx;


		.top_float {
			font-size: 24rpx;
			align-items: center;
			padding: 20rpx 26rpx;
			background: rgba(0, 0, 0, 0.5);
			border-radius: 40rpx;
			color: #fff;
			position: absolute;
			left: 160rpx;
			top: 40rpx;
			font-family: Tensentype MeiHeiJ;
		}

		.img {
			width: 100%;
			height: 690rpx;
			border-radius: 30rpx;
		}

		.information {
			padding: 28rpx 30rpx;

			font-size: 20rpx;
			font-family: Source Han Sans CN-Regular, Source Han Sans CN;
			font-weight: 400;
			color: #848484;

			.information_title {
				font-size: 28rpx;
				font-family: Segoe UI-Bold, Segoe UI;
				font-weight: bold;
				color: #282828;
			}

			.information_btn {
				margin-top: 20rpx;
				font-size: 40rpx;
				font-family: PingFang SC-中粗体, PingFang SC;
				font-weight: bold;
				color: #444444;
			}

		}
	}


	.lists {
		padding: 30rpx;
		padding-top: 0rpx;


		.lists_box {
			margin-bottom: 34rpx;
			margin-left: 30rpx;
			// width: 330rpx;
			background-color: #fff;
			box-shadow: 0px 0px 60rpx 0px rgba(0, 0, 0, 0.10196078568696976);
			border-radius: 6rpx;
			width: 100%;

			.min_img {
				border-radius: 6rpx;
				width: 100%;
				height: 324rpx;
			}

			.text {
				padding: 28rpx 0 34rpx 32rpx;
				font-size: 28rpx;
				font-family: Segoe UI-Bold, Segoe UI;
				font-weight: bold;
				color: #282828;

				.price {
					font-size: 28rpx;
					font-family: Segoe UI-Bold, Segoe UI;
					font-weight: bold;
					color: #282828;
					margin-top: 5rpx;
				}
			}
		}


	}
</style>
