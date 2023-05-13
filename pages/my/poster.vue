<template>
	<view class="bg po-rela">



		<view class="box">
			<view class="top">
				<view class="box">
					<view class="title">
						您的专属邀请码为
					</view>
					<view class="code">
						{{all.code}}
					</view>
					<view class="image">
						<image :src="all.qrcode" mode=""></image>
					</view>
					<view class="context">
						<view class="">扫描二维码</view>
						<view class="">下载注册熊猫文创账号</view>
					</view>
				</view>

			</view>
			<view class="bot">
				<view class="content">
					<view class="title">我已邀请{{invite}}人</view>
					<view class="box">
						<view class="top_title">
							<view class="name">用户昵称</view>
							<view class="time">邀请时间</view>
						</view>
						<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower" v-if="list != ''">
							<view class="lists" v-for="(item,index) in list" :key="index">
								<view class="name">{{item.user.nickname}}</view>
								<view class="time">{{item.invitetime_text}}</view>
							</view>
						</scroll-view>
						<!-- <scroll-view  scroll-y="true" class="scroll-Y" @scrolltolower="lower">
							<view class="lists" v-for="(item,index) in 30" :key="index">
								<view class="name">item.user.nickname</view>
								<view class="time">item.invitetime_text</view>
							</view>
						</scroll-view> -->

						<u-empty text="暂无邀请" mode="list" v-if="list == ''"></u-empty>

					</view>
				</view>
			</view>
		</view>
		<!-- <image :src="all.qr_image" style="width: 240rpx;height: 240rpx;position: absolute;bottom: 60rpx;right: 60rpx;" mode=""></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				all: {},
				list: [],
				page: 1,
				invite: 0,
				is_next: true
			}
		},
		onShow(e) {
			this.list = []
			this.getlist()
			this.getinfo()
		},

		methods: {
			lower() {
				if (this.is_next == true) {
					this.page += 1
					this.getinfo()
				}
			},
			getlist() {
				this.util.request('Invite/index', {}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					this.all = res;
					console.log(this.all)
				})
			},
			getinfo() {
				this.util.request('invite/junior', {
					page: this.page
				}).then(res => {
					this.invite = res.invite
					this.list = this.list.concat(res.list);
					if (res.list.length < 50) {
						this.is_next = false
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {

		min-height: 100vh;
	}

	.scroll-Y {
		height: 460rpx;
	}



	.box {

		.top {
			background: url('@/static/new/poster_bg.jpg') no-repeat center;
			background-size: 100% 100%;
			height: 1200rpx;
			overflow: hidden;

			.box {
				margin-top: 363rpx;
				text-align: center;

				.title {
					color: #5c2a01;
					font-family: HarmonyOS Sans SC;
					font-style: normal;
					font-weight: 400;
					font-size: 26rpx;
				}

				.code {
					margin-top: 50rpx;
					font-family: HarmonyOS Sans SC;
					font-style: normal;
					font-weight: 700;
					font-size: 50rpx;
					letter-spacing: 2.73rpx;
					color: #ffec00;
				}

				.image {
					display: flex;
					justify-content: center;
					margin-top: 54rpx;

					image {
						width: 282rpx;
						height: 282rpx;
					}
				}

				.context {
					margin-top: 57rpx;
					font-family: HarmonyOS Sans SC;
					font-style: normal;
					font-weight: 400;
					font-size: 26rpx;
					line-height: 34prx;
					text-align: center;
					letter-spacing: 1.33rpx;
					color: #5c2a01;
				}
			}
		}

		.bot {
			background: url('@/static/new/poster_bg2.png') no-repeat center;
			background-size: 100% 100%;
			min-height: 830rpx;
			padding-bottom: 50rpx;

			.content {
				background: url('@/static/new/poster_bg3.png') no-repeat center;
				background-size: 100% 100%;
				height: 890rpx;
				width: 610rpx;
				margin: 0 70rpx;
				margin-top: -60rpx;
				padding: 0 20rpx;
				padding-top: 150rpx;
				box-sizing: border-box;


				.title {
					margin-bottom: 20rpx;
					font-style: normal;
					font-weight: 400;
					font-size: 26rpx;
					line-height: 26rpx;
					color: #5c2a01;
					text-align: center;
				}

				.box {
					width: 570rpx;
					height: 570rpx;
					// overflow-y: auto;
					border-radius: 20rpx;
					background: #fffef5;

					.top_title {
						height: 90rpx;
						background: #f6e9c7;
						border-radius: 20rpx 20rpx;
						font-weight: 400;
						font-size: 26rpx;
						line-height: 90rpx;
						color: #682f00;
						display: flex;
						align-items: center;
						text-align: center;

						.name {
							width: 40%;
						}

						.time {
							width: 60%;
						}

					}

					.lists {
						color: #444;
						font-size: 24rpx;
						text-align: center;
						margin-top: 20rpx;
						display: flex;
						align-items: center;

						.name {
							width: 40%;
						}

						.time {
							width: 60%;
						}
					}
				}
			}
		}
	}
</style>