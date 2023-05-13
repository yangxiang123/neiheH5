<template>
	<view class="lottery-detail" v-if="shopDetailData">
		<!-- 抽奖结束前 -->
		<view class="detail-top" v-if="shopDetailData.is_end == 0">
			<view class="top-text u-flex">
				<text class="u-m-r-10">距抽签结果公布剩</text>
				<u-count-down :timestamp="end_time" @end="end"></u-count-down>
			</view>
		</view>
		<!-- 抽奖结束后 -->
		<view class="detail-result" v-if="shopDetailData.is_end">
			<view class="result-title">
				<text>当前活动已结束，查看中签结果</text>
			</view>
			<view class="result-list" @click="open">
				<text>查看本期中签名单<text>></text></text>
			</view>
		</view>

		<view class="bg-img">
			<!-- detailData.drowProduct.prizeImage -->
			<image class="bg-image" :src="shopDetailData.info.goods.goods_image" mode="aspectFill"></image>
		</view>
		<view class="detail-contont">
			<view class="contont-title">
				<text class="title-text">{{shopDetailData.info.goods.goods_name}}</text>
			</view>
			<!-- 抽奖结束之前的样式 -->
			<!-- <view class="contont-price">￥<text style="font-size: 46rpx;">{{shopDetailData.officialPrice}}</text>抽签价</view> -->
			<!-- 抽奖结束之后的样式 -->
			<view class="big-con">
				<view class="cont-price">
					<view class="draw-price">
						<view class="price-style">
							藏品价格
						</view>
						<view>￥{{shopDetailData.info.goods.goods_price}}</view>
					</view>

				</view>
			</view>


			<!-- v-if="shopDetailData.isFirst" -->
			<view class="choujiang">

				<!-- 抽奖结束之后的样式 -->
				<view class="btn-wrapper " v-if="shopDetailData.is_end == 1">
					<view class="btn end" @click="end()">
						已结束
					</view>
				</view>
				<!-- 抽奖结束之前的样式 -->
				<view class="btn-wrapper" v-else>
					<!-- 可购买 -->
					<template v-if="is_buy_time">
						<view class="btn" @click="go_details">
							立即购买
						</view>
					</template>
					<template v-else>
						<view class="btn" v-if="shopDetailData.draw_num" @click="draw()">
							参与抽奖
						</view>
						<view class="btns" v-else>
							已参与抽奖
						</view>
					</template>
				</view>
			</view>

			<view class="code">
				<image class="code-image" @click="share()" src="/static/bg2.png"></image>
				<view class="code-text1" @click="share()">
					查看我的抽签码
				</view>
				<view class="code-text2">
					{{shopDetailData.code_num[0] || '未参与抽奖'}}
				</view>
			</view>

		</view>

		<view class="detail-schedule">
			<view class="schedule-title">抽选攻略</view>
			<view class="schedule-contont">
				<view class="schedule-item">
					<view class="item-text">开始参与抽选</view>
					<view class="item-time">{{shopDetailData.info.start_time}}</view>
				</view>
				<view class="schedule-line"></view>
				<view class="schedule-contont">
					<view class="schedule-item">
						<view class="item-text">停止参与抽选</view>
						<view class="item-time">{{shopDetailData.info.end_time}}</view>
					</view>
				</view>
				<view class="schedule-line"></view>
				<view class="schedule-contont">
					<view class="schedule-item">
						<view class="item-text">公布抽签结果</view>
						<view class="item-time">{{shopDetailData.info.publish_result_time}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="goods-contont">
			<view class="title">商品详情</view>
			<view style="padding: 30rpx;">
				<rich-text :nodes="shopDetailData.info.description"></rich-text>
			</view>
		</view>

		<!-- 	<view class="goods-detail">
			<view class="goods-title">商品详情</view>
		</view> -->

		<!-- 遮罩层 -->
		<view class="mask" catchtouchmove="preventTouchMove" v-if="showModal"></view>
		<!-- 弹出层 -->
		<view class="modalDlg" v-if="showModal">
			<view class="drawCode-close" @click="ok()">
				<image src="/static/closebig.png" mode=""></image>
			</view>
			<view class="drawCode-mycode">
				<image src="/static/mycode.png" mode=""></image>
			</view>
			<view class="drawCode-juxing"></view>
			<text v-if="!shopDetailData.code_num.length">暂无抽签码</text>
			<view class="box" v-else>
				<view class="drawCode" v-for="(drawcode,i) in shopDetailData.code_num" :key="i">
					<view class="left">
						<text>{{drawcode}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 查看中奖名单 -->
		<!-- v-if="listShowModel" -->
		<view class="winList" v-if="listShowModel"></view>
		<view class="win-con" v-if="listShowModel">
			<!-- {{shopDetailData.winList.userName}} -->
			<view class="con-top" @click="listShowModel = false">
				<image src="/static/closebig.png" mode=""></image>
			</view>
			<view class="con-list">
				<text>获奖名单</text>
			</view>
			<!-- <view class="list-bot"> -->
			<!-- <image src="../../static/bottomline.png"></image> -->
			<!-- </view> -->
			<view class="mingdan">
				<view class="noList" v-if="draw_result.result.length == 0">
					<text>暂无获奖名单</text>
				</view>
				<view class="mindan-con" v-for="item in draw_result.result" :key="item.id" v-else>
					<view class="left">
						<view class="img">
							<image :src="item.user.avatar" mode=""></image>
						</view>
						<view class="text">
							<text>{{item.user.nickname}}</text>
						</view>
					</view>
					<view class="right">
						<text>中奖签号:{{item.code}}</text>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	// import apinew from '@/ask/askindex.js'
	export default {
		data() {
			return {
				// 商品的id
				id: '',
				// 抽签商品详情
				shopDetailData: null,
				// 弹窗
				showModal: false,
				listShowModel: false,
				showrule: false,
				ruletext: '',
				end_time: '',
				draw_result: {}, // 抽签结果
				is_buy_time: false
			}
		},
		onLoad(option) {
			this.id = option.id
			this.get_details();

		},
		methods: {
			// 去购买
			go_details() {
				uni.navigateTo({
					url: '/pages/home/info?id=' + this.shopDetailData.info.goods.id
				})
			},
			// 倒计时结束
			end() {
				this.get_details();
			},
			// 抽签结果
			draw_res() {
				this.util.request('user/draw_result', {
					setting: this.id
				}).then(res => {
					this.draw_result = res;
					if(res.prize_code == ''){
						this.$u.toast('很遗憾，您未中奖 该商品于'+this.shopDetailData.info.publish_result_time+'开始公售',8000)
					}else{
						this.$u.toast('恭喜您中奖了，请在'+this.shopDetailData.info.buy_time+'准时抢购',8000)
					}
				})
			},
			// 参与抽签
			draw() {
				this.util.request('user/code_draw', {
					setting: this.id
				}).then(res => {
					this.$u.toast('参与抽奖成功');
					this.get_details();
				})
			},
			// 抽签详情
			get_details() {
				this.util.request('user/draw_activity_detail', {
					setting: this.id
				}).then(res => {
					this.shopDetailData = res;
					var nowTime = new Date().getTime();
					var time = new Date(this.shopDetailData.info.end_time).getTime();
					this.end_time = (time - nowTime) / 1000;
					if (this.end_time < 0) {
						// 抽签结果
						this.draw_res();
					}

					// 是否可购买 is_buy_time
					var buy_time = new Date(this.shopDetailData.info.buy_time).getTime();
					if (nowTime - buy_time > 0) {
						this.is_buy_time = true;
					} else {
						this.is_buy_time = false;
					}


				})
			},

			// 查看获奖名单
			open() {
				this.listShowModel = true
			},

			// 已结束抽奖
			end() {
				uni.showToast({
					icon: 'none',
					title: '活动已结束'
				})
			},
			// 弹窗
			share() {
				this.showModal = true;
			},
			ok() {
				this.showModal = false
			},

		}

	}
</script>

<style lang="less" scoped>
	.lottery-detail {
		background-color: #F2F2F2;
	}

	.rule {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.8);


		.content {
			width: 563rpx;
			height: 801rpx;
			background: #202535;
			border: 1rpx solid #526196;
			border-radius: 20rpx;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;

			.top {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 88rpx 0 30rpx 0;

				.top_text {
					font-size: 40rpx;
					font-family: YouSheBiaoTiHei;
					font-weight: 400;
					color: #FFFFFF;
					margin-left: 30rpx;
					margin-right: 30rpx;
				}

				.minclass {
					width: 28rpx;
					height: 2rpx;
					background-color: #5E657D;
				}
			}

			.middle {
				width: 469rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #BDC3DA;
				line-height: 39rpx;
				margin: 0rpx auto;
				height: 420rpx;
				overflow-y: auto;
				word-break: break-all;
			}

			.button {
				width: 465rpx;
				height: 65rpx;
				line-height: 65rpx;
				background: #55D5FF;
				border-radius: 7rpx;
				font-size: 28rpx;
				font-family: PingFangSC;
				font-weight: 600;
				color: #171A1F;
				text-align: center;
				position: absolute;
				left: 48rpx;
				bottom: 92rpx;
			}

			.bottom_img {
				width: 484rpx;
				height: 13rpx;
				position: absolute;
				left: 40rpx;
				bottom: 26rpx;
			}
		}
	}

	.detail-top {
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		background-color: #292929;
		padding: 0 30rpx;

		.top-text {
			font-size: 28rpx;
			color: #A1A2A3;
			line-height: 40rpx;

			.top-time {
				padding: 1rpx 4rpx;
				margin: 0 5rpx;
				color: #292929;
				background: #FFFFFF;
				border-radius: 7rpx;
			}
		}

		.top-rule {
			font-size: 28rpx;
			text-decoration: underline;
			color: #A1A2A3;
			line-height: 40rpx;
		}
	}

	// 抽奖结果
	.detail-result {
		width: 100%;
		height: 160rpx;
		background-color: #000000;
		text-align: center;
		color: #fff;

		.result-title {
			font-size: 42rpx;
			padding-top: 20rpx;
			font-weight: 400;
		}

		.result-list {
			color: #999;
			font-size: 28rpx;
			padding-top: 20rpx;
		}
	}

	.bg-img {
		.bg-image {
			width: 750rpx;
			height: 720rpx;
		}
	}

	.detail-contont {
		position: relative;
		top: -200rpx;

		.contont-title {
			background: linear-gradient(rgba(0, 0, 0, 0) 10%, #FFFFFF 70%);
			text-align: bottom;
			padding: 200rpx 55rpx 10rpx 55rpx;

			.title-text {
				font-size: 37rpx;
				font-weight: 600;
				color: #17161B;
				line-height: 44rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}

		.contont-price {
			padding: 0 55rpx;
			font-size: 30rpx;
			color: #B09971;
			background-color: #fff;
		}

		// 活动已经结束之后的样式
		.big-con {
			width: 100%;
			background-color: #fff;

			.cont-price {
				width: 671rpx;
				margin-left: 40rpx;
				padding: 40rpx 0rpx;
				display: flex;
				// justify-content: center;
				align-items: center;
				background-color: #fff;

				.draw-price {
					// flex: 1;
					text-align: center;
					font-size: 46rpx;
					font-weight: 600;
					color: #E65F5B;
					line-height: 60rpx;
					// border-right: 2rpx solid #ccc;

					.price-style {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;
					}
				}

				.market-price {
					flex: 1;
					text-align: center;
					font-size: 46rpx;
					line-height: 60rpx;
					font-family: PingFangSC;
					font-weight: 600;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 20rpx;

					.price-style {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;

						.price {
							font-size: 46rpx;
							font-family: PingFangSC;
							font-weight: 600;
							color: #0C0C0C;
						}
					}

					.buy {
						// display: block;
						width: 135rpx;
						height: 42rpx;
						// position: absolute;
						// right: 10rpx;
						// top: 320rpx;
						font-size: 23rpx;
						font-family: PingFangSC;
						font-weight: 600;
						color: #FFFFFF;
						background-color: #0A0E28;
						line-height: 42rpx;
						border-radius: 21rpx 21rpx 21rpx 0rpx;
					}
				}
			}
		}

		.btn-wrapper {
			background-color: #fff;
			padding: 30rpx 0 90rpx 0;

			.btn.end {
				background-color: #C0C0C0;
			}

			.btn {
				width: 671rpx;
				height: 81rpx;
				background-color: #42D8ED;
				border-radius: 12rpx;
				font-size: 35rpx;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 81rpx;
				text-align: center;
				margin: 0 auto;
			}

			.btns {
				width: 671rpx;
				height: 81rpx;
				background-color: #C0C0C0;
				border-radius: 12rpx;
				font-size: 35rpx;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 81rpx;
				text-align: center;
				margin: 0 auto;
			}
		}

		.code {
			position: relative;
			background-color: #fff;
			padding: 0 38rpx 50rpx 38rpx;

			.code-image {
				width: 674rpx;
				height: 241rpx;
			}

			.code-text1 {
				font-size: 24rpx;
				color: #FFFFFF;
				position: absolute;
				left: 47%;
				top: 4rpx;
				transform: translateX(-50%);
			}

			.code-text2 {
				font-size: 35rpx;
				font-weight: 600;
				color: #6B552F;
				position: absolute;
				left: 50%;
				top: 141rpx;
				transform: translateX(-50%);
			}
		}
	}

	.detail-task {
		position: relative;
		top: -180rpx;
		padding: 50rpx 27rpx;
		background-color: #fff;

		.title {
			font-size: 33rpx;
			font-weight: 600;
			color: #010203;
			line-height: 37rpx;
		}

		.task-item {
			margin-top: 20rpx;
			position: relative;

			.task-image {
				width: 696rpx;
				height: 124rpx;
			}

			.item-contont {
				width: 657rpx;
				height: 124rpx;
				position: absolute;
				left: 39rpx;
				top: 0;

				.text1 {
					font-size: 32rpx;
					font-weight: 600;
					color: #010203;
					line-height: 50rpx;
					padding-top: 15rpx;
					display: flex;

					.helpRecord {
						font-size: 28rpx;
						color: #b18033;
					}
				}

				.text2 {
					font-size: 23rpx;
					color: #A1A2A3;
					line-height: 44rpx;
				}

				.btn {
					width: 144rpx;
					height: 56rpx;
					background: #010203;
					border-radius: 28rpx;
					font-size: 28rpx;
					color: #FFFFFF;
					line-height: 56rpx;
					position: absolute;
					right: 35rpx;
					top: 34rpx;
					text-align: center;

					.arrow {}
				}

				.btns {
					width: 144rpx;
					height: 56rpx;
					background: #010203;
					border-radius: 28rpx;
					font-size: 28rpx;
					color: #FFFFFF;
					line-height: 56rpx;
					position: absolute;
					right: 35rpx;
					top: 16rpx;
					text-align: center;
				}
			}
		}
	}

	.detail-schedule {
		position: relative;
		top: -160rpx;
		padding: 50rpx 27rpx 60rpx 27rpx;
		background-color: #fff;

		.schedule-title {
			font-size: 33rpx;
			font-weight: 600;
			color: #010203;
			line-height: 37rpx;
			margin-bottom: 20rpx;
		}

		.schedule-contont {
			display: flex;

			.schedule-item {
				width: 187rpx;

				.item-text {
					font-size: 27rpx;
					color: #595959;
					line-height: 37rpx;
					text-align: center;
				}

				.item-time {
					font-size: 24rpx;
					color: #FFFFFF;
					line-height: 37rpx;
					// height: 37rpx;
					background-color: #9C9C9C;
					border-radius: 10rpx;
					text-align: center;

				}
			}

			.schedule-line {
				flex: 1;
				height: 6px;
				background: #9C9C9C;
				position: relative;
				top: 65rpx;
			}
		}
	}

	.goods-detail {
		position: relative;
		top: -140rpx;
		padding: 50rpx 27rpx;
		background-color: #fff;

		.goods-title {
			font-size: 33rpx;
			font-weight: 600;
			color: #010203;
			line-height: 37rpx;
			margin-bottom: 20rpx;
		}
	}

	.goods-contont {
		position: relative;
		top: -140rpx;
		// padding: 20rpx 10rpx;
		background-color: #fff;

		.title {
			padding: 25rpx 26rpx;
			font-size: 33rpx;
			font-weight: 600;
			color: #010203;
		}

		.image {
			width: 100%;
		}
	}


	// 查看抽奖名单弹框
	.winList {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		z-index: 9000;
		opacity: 0.5;
	}

	.win-con {
		width: 644rpx;
		height: 801rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		overflow-y: auto;
		margin: 0 auto;
		position: fixed;
		top: 207rpx;
		left: 53rpx;
		z-index: 999999;
		padding-bottom: 50rpx;

		.con-top {
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			right: 19rpx;
			top: 19rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.con-list {
			font-size: 40rpx;
			font-family: YouSheBiaoTiHei;
			font-weight: 400;
			color: #000000;
			text-align: center;
			margin-top: 32rpx;
			margin-bottom: 90rpx;
		}

		.mindan-con {
			width: 607rpx;
			height: 131rpx;
			background: #EEEEEE;
			// border: 2rpx solid red;
			margin: 30rpx auto 39rpx auto;
			// margin-top: 81rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				flex: 1;
				display: flex;
				align-items: center;

				.img {
					width: 63rpx;
					height: 63rpx;
					margin: 21rpx 35rpx;

					image {
						width: 100%;
						height: 100%;
					}

				}

				.text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 39rpx;
				}
			}

			.right {
				flex: 1;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 39rpx;
				text-align: right;
				margin-right: 19rpx;
			}
		}

		.noList {
			text-align: center;

			text {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #000000;
			}
		}
	}

	// 抽签码弹出框

	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		z-index: 9000;
		opacity: 0.5;
	}

	.modalDlg {
		width: 70%;
		position: fixed;
		max-height: 700rpx;
		top: 260rpx;
		left: 0;
		right: 0;
		z-index: 9999;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 5rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 87rpx;
		overflow-y: scroll;

		.drawCode-close {
			width: 50rpx;
			height: 50rpx;
			// border: 1rpx solid red;
			position: absolute;
			right: 0;
			margin: 15rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.drawCode-mycode {
			width: 187rpx;
			height: 29rpx;
			// border: 1rpx solid red;
			margin-top: 62rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.drawCode-juxing {
			width: 510rpx;
			height: 3rpx;
			// border: 1rpx solid red;
			margin-top: 29rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;

			.drawCode {
				margin-top: 53rpx;

				.left,
				.right {
					width: 220rpx;
					height: 91rpx;
					text-align: center;
					font-size: 32rpx;
					font-family: PingFangSC;
					font-weight: 600;
					color: #6F5428;
					position: relative;

					text {
						position: absolute;
						top: 26rpx;
						left: 33rpx;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}


		.ok {
			width: 80rpx;
			height: 35rpx;
			background: #44b549;
			line-height: 35rpx;
			text-align: center;
			color: #fff;
			font-size: 15rpx;
			margin: 20rpx auto;
			border-radius: 100rpx;
		}


	}

	// 助力弹窗
	.help-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		z-index: 90000;
		opacity: 0.5;
	}

	.help-modalDlg {
		width: 597rpx;
		// height: 927rpx;
		position: fixed;
		top: 202rpx;
		left: 0;
		right: 0;
		z-index: 99999;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 5rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.help-center {
			.help-img {
				width: 100%;
				height: 588rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.help-userInfo {
				width: 100%;
				height: 97rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;

				.help-userImg {
					width: 97rpx;
					height: 97rpx;
					margin-left: 31rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 100%;
					}
				}


				.help-text {
					width: 396rpx;
					height: 63rpx;
					margin: 0 auto;
					line-height: 39rpx;
					margin-left: 16rpx;
					height: 97rpx;

					text {
						font-size: 25rpx;
						font-family: PingFang SC;
						font-weight: 400;
					}

					.info {
						margin-left: 10rpx;
					}
				}

			}

			.help-number {

				// height: 40rpx;
				line-height: 40rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #BEBEBE;
				text-align: right;
				margin-top: 47rpx;
				margin-right: 27rpx;
				// margin-bottom: 30rpx;
			}

			.help-btn {
				button {
					width: 535rpx;
					height: 97rpx;
					background: #000102;
					border-radius: 4rpx;
					line-height: 97rpx;
					margin: 0 auto;
					background: #000000;
					color: #fff;
					font-size: 31rpx;
					font-family: PingFang SC;
					font-weight: 400;
				}

				padding: 28rpx 26rpx;
			}
		}

	}

	// 积分弹窗框

	.showbuy {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.8);
		z-index: 60;

		.content {
			width: 563rpx;
			height: 642rpx;
			background: #202535;
			border: 1rpx solid #526196;
			border-radius: 20rpx;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			z-index: 70;

			.top {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 88rpx 0;

				.minclass {
					width: 28rpx;
					height: 2rpx;
					background-color: #5E657D;
				}
			}

			.middletext {
				width: 469rpx;
				height: 83rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				margin: 0 auto;
				color: #BDC3DA;
				line-height: 32px;
				word-break: break-all;
				letter-spacing: 5rpx;

				.colortext {
					color: #67FFE8;
				}
			}

			.line {
				width: 469rpx;
				height: 1rpx;
				border: 1rpx dashed #5E657D;
				opacity: 0.7;
				margin-top: 82rpx;
				margin-left: 46rpx;
			}

			.hint {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #626983;
				margin-top: 15rpx;
				margin-left: 46rpx;
			}

			.bottombutton {
				margin-top: 58rpx;
				margin-left: 46rpx;
				width: 469rpx;
				display: flex;
				justify-content: space-between;

				.buttonone {
					width: 207rpx;
					height: 65rpx;
					line-height: 65rpx;
					text-align: center;
					border: 2rpx solid #55D5FF;
					border-radius: 7rpx;
					font-size: 28rpx;
					font-family: PingFangSC;
					font-weight: 600;
					color: #55D5FF;
				}

				.buttontwo {
					width: 207rpx;
					height: 65rpx;
					line-height: 65rpx;
					text-align: center;
					background: #55D5FF;
					border-radius: 7rpx;
					font-size: 28rpx;
					font-family: PingFangSC;
					font-weight: 600;
					color: #171A1F;
				}
			}
		}
	}
</style>
