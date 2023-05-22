<template>
	<view class="page">
		<view class="header_wrap">
			<u-navbar :is-back="true" :background='{"background":`${showNavWhite?"#fff":""}`}' title="藏品合成"
				:title-color='`${showNavWhite?"#000":"#fff"}`' :back-icon-color='`${showNavWhite?"#000":"#fff"}`'>

			</u-navbar>
			<!-- <image src="" mode="aspectFill"></image> -->
		</view>
		<view class="contend_wrap">
			<view class="contend">
				<view class="tips_wrap">
					<view class="dian dian1"></view>
					<view class="dian dian2"></view>
					<view class="dian dian3"></view>
					<view class="tips_name_wrap">
						<text class="tips_name">请选择活动</text>
					</view>
					<view class="dian dian3"></view>
					<view class="dian dian2"></view>
					<view class="dian dian1"></view>

				</view>

				<u-tabs :list="tab_list" active-color="#fff" inactive-color="#fff" bg-color="none" :is-scroll="false"
					:current="current" @change="change"></u-tabs>
				<template v-if="current == 0">
					<view @click="util.urlTo('synthesizer?id=' + item.id)"
						class="card_cell radius20 u-m-t-30 margin-bottom-sm" v-for="(item,index) in list" :key="index"
						style="padding: 37rpx 32rpx;">
						<view class="hd_img_wrap">
							<image :src="item.goods_image" mode="aspectFill"></image>
						</view>
						<view class="hd_message_wrap">
							<text>{{item.goods_name}}</text>
							<text>活动截至时间:{{item.compound_time_text}}</text>
							<view class="">
								<text>立即参与</text>
							</view>
						</view>
						<!-- <view class="font30 text-bold">
								《{{item.goods_name}}》
							</view>
							<view class="flex align-center" style="margin-top: 50rpx;color: #666666;">
								<view class="flex-sub">
									合成进度 <span class="text-blue">{{item.user_count}}</span>/{{item.need_count}}
								</view>
								<view class="font26">
									截至时间：{{item.compound_time_text}}
								</view>
							</view> -->
					</view>

				</template>

				<template v-else>
					<view @click="util.urlTo('compound?id=' + item.id)"
						class="card_cell radius20 u-m-t-30 margin-bottom-sm" v-for="(item,index) in list" :key="index"
						style="padding: 37rpx 32rpx;">
						<view class="hd_img_wrap">
							<image :src="item.cover" mode="aspectFill"></image>
						</view>
						<view class="hd_message_wrap">
							<text>{{item.name}}</text>
							<text>活动截至时间:{{item.end_time}}</text>
							<view class="">
								<text>立即参与</text>
							</view>
						</view>
					</view>

				</template>
			</view>
		</view>


	</view>
	<!-- <view class="flex align-center justify-center font42 text-bold" style="height: 50vh;">
		暂未开放,敬请期待
	</view> -->
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				list: [],
				showNavWhite: false,
				tab_list: [{
					name: '普通合成'
				}, {
					name: '缤纷合成'
				}],
				current: 0,
				page: 1,
				last_page: 0
			}
		},
		onLoad() {
			this.change(this.current);
		},
		onReachBottom() {
			if (this.last_page > this.page) {
				if (this.current == 1) {
					this.get_list2();
				}
			}
		},
		methods: {
			change(index) {
				uni.showLoading();
				this.current = index;
				this.list = [];
				if (this.current == 0) {
					// 普通合成
					this.get_list();
				} else {
					// 缤纷合成
					this.get_list2();
				}
			},
			// 缤纷合成
			get_list2() {
				this.util.request('goods/colorful_merge', {
					page: this.page
				}).then(res => {
					this.last_page = res.last_page;
					this.list = [...this.list, ...res.data];
					uni.hideLoading();
				})
			},
			get_list() {
				this.util.request('goods/compound_list', {}).then(res => {
					this.list = res;
					uni.hideLoading();
				})
			}
		},
		onPageScroll(e) {
			if (e.scrollTop > 0) {
				this.showNavWhite = true
			} else {
				this.showNavWhite = false
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .u-border-bottom {
		border-bottom: none;
	}

	.page>>>.u-navbar-inner {
		background: transparent !important;
	}

	.header_wrap {
		width: 100vw;
		background: url('../../static/img/synthesis_topBg.jpg');
		background-size: 100%;
		height: 700rpx;

		image {
			width: 100vw;
			height: 500rpx;
		}
	}

	.contend_wrap {
		// transform: translateY(-110rpx);
		position: absolute;
		width: 100%;
		top: 590rpx;
	}

	.contend {
		// margin-top: 30rpx;
		background-color: #F15A22;
		padding-bottom: 40rpx;
		min-height: 56vh;

		.tips_wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 110rpx;

			view {
				margin: 0 10rpx;
			}

			.tips_name_wrap {
				.tips_name {
					color: #fff;
					font-size: 36rpx;
					font-weight: 600;
				}
			}

			.dian {
				width: 18rpx;
				height: 18rpx;

				border-radius: 50%;
				background-color: #000;
			}

			.dian1 {
				background-color: #F47B4E;
			}

			.dian2 {
				background-color: #F9BDA7;
			}

			.dian3 {
				background-color: #FFFFFF;
			}
		}

		.card_cell {
			margin: 0 20rpx 20rpx 20rpx;
			height: 264rpx;
			display: flex;
			background-color: #FFFDF9;

			.hd_img_wrap {
				image {
					width: 198rpx;
					height: 198rpx;
					border-radius: 20rpx;
				}
			}

			.hd_message_wrap {
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 70%;

				text:nth-child(1) {
					font-size: 34rpx;
					font-weight: 600;
					color: #000;
					width: 0.6;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;

				}

				text:nth-child(2) {
					font-size: 28rpx;
					color: #616161;
					// font-weight: 600;
				}

				view:nth-child(3) {
					display: flex;
					justify-content: flex-end;

					text {
						background-color: #FE6F35;
						border-radius: 30rpx;
						color: #fff;
						font-size: 28rpx;
						font-weight: 600;
						padding: 10rpx 40rpx;
					}
				}
			}
		}
	}

	page {
		background-color: #F7F7F7;
	}

	.wrap {
		// margin-top: -88px; 
		// background-image: url("https://file.18art.art/file/oss/nft/image/nft-goods/002e546e8b294e3f8ccf6c7a5d5a3f7a.jpg");
		// background-color: rgb(241, 90, 34);
	}

	// /deep/ .cuIcon-back{
	// 	color: #fff;
	// }
	// .header_wrap{
	// 	/deep/ .content{
	// 		color: #fff;
	// 		font-weight: 600;
	// 	}
	// }
	/deep/ .u-border-bottom:after {
		border-bottom-width: 0px;
	}
</style>