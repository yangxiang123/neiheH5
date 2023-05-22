<template>
	<view class="page">
		<view class="share" id="poster">
			<img src="/static/nh/share.png" alt="" class="bg">
			<view class="connet">
				<view class="avatar_box">
					<img :src="user.avatar" alt="">
					<view>{{user.nickname}}</view>
				</view>
				<view class="bottom_box u-flex u-row-between">
					<view class="left u-flex">
						<text>我的推荐码</text>
						<text>{{data.code}}</text>
						<text>扫码注册即可完成邀请</text>
					</view>
					<view class="right">
						<img :src="data.qrcode" alt="">
					</view>
				</view>
			</view>
		</view>

		<view class="btn_box u-flex u-row-between">
			<view class="btn" @click="save_img">保存图片</view>
			<view class="btn">我的邀请</view>
		</view>
	</view>
</template>

<script>
	import html2canvas from "html2canvas";
	export default {
		data() {
			return {
				user: {},
				data: {},
				img_url: ''
			};
		},
		onLoad() {
			this.user = uni.getStorageSync('info');
			this.get_share();
		},
		methods: {
			// 保存图片
			save_img() {
				uni.showLoading({
					title: '海报生成中...'
				})
				let dom = document.querySelector('#poster'); // 获取dom元素
				html2canvas(dom, {
					width: dom.clientWidth,
					height: dom.clientHeight,
					scale: 2,
					allowTaint: true,
					useCORS: true,
					backgroundColor: null,
					border: 'none',
				}).then((canvas) => {
					let dataURL = canvas.toDataURL("image/png");
					this.img_url = dataURL;
					this.downloadIamge(dataURL, this.user.nickname);
					uni.hideLoading();
				});
			},
			// 下载图片
			downloadIamge(imgsrc, name) {
				//下载图片地址和图片名
				let image = new Image();
				// 解决跨域 Canvas 污染问题
				image.setAttribute("crossOrigin", "anonymous");
				image.onload = function() {
					let canvas = document.createElement("canvas");
					canvas.width = image.width;
					canvas.height = image.height;
					let context = canvas.getContext("2d");
					context.drawImage(image, 0, 0, image.width, image.height);
					let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
					let a = document.createElement("a"); // 生成一个a元素
					let event = new MouseEvent("click"); // 创建一个单击事件
					a.download = name || "photo"; // 设置图片名称
					a.href = url; // 将生成的URL设置为a.href属性
					a.dispatchEvent(event); // 触发a的单击事件
				};
				image.src = this.img_url;

			},
			// 分享的东西
			async get_share() {
				this.data = await this.util.request('Invite/index', 'POST');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 100rpx 24rpx;
	}

	.share {
		position: relative;
		height: 852rpx;

		.bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

		}

		.connet {
			position: relative;
			z-index: 99;
			padding: 32rpx;
			color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
		}

		.avatar_box {
			img {
				width: 152rpx;
				height: 152rpx;
				border-radius: 50%;
				margin-bottom: 16rpx;
			}
		}

		.bottom_box {
			.left {
				flex-direction: column;
				align-items: flex-start;
				font-size: 20rpx;
				font-family: PingFangSC-Regular-Regular, PingFangSC-Regular;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 24rpx;

				text {
					&:nth-child(2) {
						font-size: 40rpx;
						font-family: PingFangSC-Medium-Regular, PingFangSC-Medium;
						color: #F9F9F9;
						line-height: 48rpx;
						margin: 8rpx 0;
					}
				}

			}

			img {
				width: 128rpx;
				height: 128rpx;
			}
		}
	}

	.btn_box {
		position: fixed;
		bottom: 100rpx;
		left: 24rpx;
		right: 24rpx;

		.btn {
			height: 104rpx;
			background: linear-gradient(173deg, #000000 0%, #2C2C2C 100%);
			border-radius: 12rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Regular-Regular, PingFangSC-Regular;
			font-weight: 400;
			color: #F9F9F9;
			border: 1rpx solid #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 48%;
		}
	}
</style>