<template>
	<view class=" font30">
		<view @click="settx" class="bg-white  flex align-center cell_down_border" style="padding: 40rpx">
			<view class="flex align-center flex-sub">
				头像
			</view>
			<view class="flex align-center">
				<image :src="info.avatar" style="width: 72rpx;height: 72rpx;border-radius: 50%;" mode=""></image>
				<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;margin-left: 16rpx;" mode="">
				</image>
			</view>
		</view>
		<view @click="show=true" class="bg-white  flex align-center cell_down_border" style="padding: 40rpx">
			<view class="flex align-center flex-sub">
				昵称
			</view>
			<view class="flex align-center">
				<view class="font30" style="color: #666666;">
					{{info.nickname}}
				</view>
				<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;margin-left: 16rpx;" mode="">
				</image>
			</view>
		</view>
		<!--  @click="util.urlTo('phone')" -->
		<view class="bg-white  flex align-center margin-bottom-sm cell_down_border" style="padding: 40rpx">
			<view class="flex align-center flex-sub">
				手机号码
			</view>
			<view class="flex align-center">
				<view class="font30" style="color: #666666;">
					{{info.mobile}}
				</view>
				<!-- <image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;margin-left: 16rpx;" mode=""></image> -->
			</view>
		</view>

		<view @click="toshiming" class="bg-white  flex align-center cell_down_border" style="padding: 40rpx">
			<view class="flex align-center flex-sub">
				实名认证
			</view>
			<view class="flex align-center">
				<view class="font30 col-999">
					{{info.real == 1 ? '已实名' : ''}}
				</view>
				<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;margin-left: 16rpx;" mode="">
				</image>
			</view>
		</view>
		<view @click="topsd" class="bg-white  flex align-center margin-bottom-sm cell_down_border" style="padding: 40rpx;">
			<view class="flex align-center flex-sub">
				设置操作密码
			</view>
			<view class="flex align-center">
				<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;margin-left: 16rpx;" mode="">
				</image>
			</view>
		</view>
		<view @click="toka" class="bg-white  flex align-center margin-bottom-sm cell_down_border" style="padding: 40rpx;">
			<view class="flex align-center flex-sub">
				提现银行卡
			</view>
			<view class="flex align-center">
				<image src="../../static/my/right.png" style="width: 12rpx;height: 22rpx;margin-left: 16rpx;" mode="">
				</image>
			</view>
		</view>


		<view @click="outlogin" class="out_btn">
			退出登录
		</view>

		<u-popup v-model="show" mode="bottom" :closeable="true" border-radius="18" height="183px">
			<view class="change_name">
				<view class="title">
					<view class="">修改昵称</view>

				</view>
				<view class="input">
					<u-input v-model="nickname" type="text" :border="true" />
				</view>
				<view class="botton" @click="profile('nickname')">保存</view>
			</view>
		</u-popup>



		<!-- 发布声明弹窗 -->
		<!-- <view class="cu-modal" :class="modalName=='Modal'?'show':''" style="z-index: 1;">
			<view class="cu-dialog radius20 smbg po-rela text-center bg-white" @click.stop>
				<view class="" style="padding: 40rpx 60rpx;border-bottom: solid 1rpx #F7F7F7;">
					<view class="font34">
						修改昵称
					</view>
					<view class="" style="margin-top: 53rpx;">
						原昵称：{{info.nickname}}
					</view>
					<view class="radius20" style="background-color: #F7F7F7;padding: 32rpx;margin-top: 36rpx;">
						<input type="text" v-model="nickname" name="" id="" placeholder="支持2-16位中英文、数字" placeholder-class="placesty">
					</view>
				</view>
				<view class="flex align-center">
					<view @click="modalName=''" class="flex-sub col-999 flex align-center justify-center" style="padding: 36rpx 0rpx;border-right: solid 1rpx #F7F7F7;">
						取消
					</view>
					<view @click="profile('nickname')" class="flex-sub text-blue flex align-center justify-center" style="padding: 36rpx 0rpx;">
						确认
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				modalName: '',
				info: {},
				nickname: '',
				show: false
			}
		},
		onLoad(e) {
			this.getinfo();
		},
		methods: {
			outlogin() {
				this.util.toLogin();
				return false;
			},
			toka() {
				this.util.urlTo('binding')
			},
			topsd() {
				if (this.info.have_set_pwd == 0) {
					this.util.urlTo('psd')
				} else {
					this.util.urlTo('psd2')
				}
			},
			toshiming() {
				if (this.info.real == 0) {
					this.util.urlTo('../index/shiming')
				} else {
					this.util.showToast('您已经实名过啦~')
				}
			},
			getinfo() {
				this.util.request('user/index', {}, 'POST').then(res => {
					this.info = res;
					this.nickname = this.info.nickname
				})
			},
			settx() {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: that.util.api.path + 'common/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'token': uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								that.profile(JSON.parse(uploadFileRes.data).data.url)
							}
						});
					}
				});
			},
			profile(e) {
				let data;
				if (e != 'nickname') {
					data = {
						avatar: e
					}
				} else {
					data = {
						nickname: this.nickname
					}
				}
				this.util.request('user/profile', data, 'POST').then(res => {
					if (e == 'nickname') {
						this.modalName = '';
						this.nickname = '';
						this.show = false
					}
					this.getinfo();
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f2f3f7;
		background-size: cover;
		min-height: 100vh;
	}

	.change_name {
		padding: 30rpx;

		.title {
			font-weight: 700;
			font-size: 40rpx;
			line-height: 56rpx;
			color: #14181f;
			padding-bottom: 30rpx;
		}

		input {
			height: 80rpx;
			padding: 0 30rpx;
			font-weight: 500;
			font-size: 28rpx;
			line-height: 39rpx;
			color: #2c2c34;
			width:100%;
			
		}

		.botton {
			margin-top:30rpx;
			height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			background: #000;
			color: #fff;
			width: 100%;
			font-weight: 500;
			font-size: 28rpx;
			line-height: 80rpx;
		}
	}

	.placesty {
		font-size: 24rpx;
		color: #999999;
	}
	.cell_down_border{
		border-bottom: 2rpx solid #F7F7F7;
	}
	.out_btn{
		position: relative;
		width: 95vw;
		margin: 100rpx auto;
		text-align: center;
		
		line-height: 100rpx;
		color: #fff;
		// font-weight: 600;
		font-size: 36rpx;
		background: linear-gradient(270deg,#1a1a1a,#666);
	}
</style>
