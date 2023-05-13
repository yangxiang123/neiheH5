<template>
	<view class="padding">
		<view class="flex align-center bg-white pad24 radius20" v-if="type == 1">
			<image :src="all.goods.goods_image" style="width: 160rpx;height: 160rpx;border-radius: 20rpx;" mode=""></image>
			<view class="padding-left-sm flex-sub">
				<view class="font30 text-bold">
					{{all.goods.goods_name}}
				</view>
				<view class="flex align-center flex-sub" style="margin-top: 48rpx;">
					<view class="flex align-center flex-sub" style="font-size: 20rpx;">
						<view class="left flex justify-center align-center">
							编号
						</view>
						<view class="right flex justify-center align-center text-white">
							{{all.code}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex align-center bg-white pad24 radius20" v-else>
			<image :src="all.box.box_image" style="width: 160rpx;height: 160rpx;border-radius: 20rpx;" mode=""></image>
			<view class="padding-left-sm flex-sub">
				<view class="font30 text-bold">
					{{all.box.box_name}}
				</view>
				<view class="flex align-center flex-sub" style="margin-top: 48rpx;">
					<view class="flex align-center flex-sub" style="font-size: 20rpx;">
						<view class="left flex justify-center align-center">
							编号
						</view>
						<view class="right flex justify-center align-center text-white">
							{{all.code}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white radius20 margin-top-sm" style="padding: 32rpx 41rpx;">
			<view class="font30">
				设置单价
			</view>
			<view class="margin-top-sm flex align-center radius20 " style="border: solid 1rpx #E7E7E7;padding: 38rpx 34rpx;">
				<input @input="calculate" v-model="money" type="number" class="flex-sub text-blue text-bold font30">
				<view class="font30 col-999">
					￥
				</view>
			</view>
			<view class="margin-top-sm" style="line-height: 90rpx;">
				<!-- <view class="flex align-center col-999 font26">
					<view class="flex-sub">
						支付通道服务费（{{sitesinfo.serve_pay}}%）
					</view>
					<view class="">
						￥{{resaleinfo.serve_pay ? resaleinfo.serve_pay : '0.00'}}
					</view>
				</view> -->
				<!-- <view class="flex align-center col-999 font26">
					<view class="flex-sub">
						平台综合服务费（{{sitesinfo.serve_terrace}}%）
					</view>
					<view class="">
						￥{{resaleinfo.serve_terrace ? resaleinfo.serve_terrace : '0.00'}}
					</view>
				</view> -->
				<!-- <view class="flex align-center col-999 font26">
					<view class="flex-sub">
						创作者版权分成（{{sitesinfo.serve_write}}%）
					</view>
					<view class="">
						￥{{resaleinfo.serve_write ? resaleinfo.serve_write : '0.00'}}
					</view>
				</view> -->
				<view class="flex align-center">
					<view class="flex-sub">
						转售所得
					</view>
					<view class="text-blue font30">
						￥{{resaleinfo.turn_gains ? resaleinfo.turn_gains : '0.00'}}
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white radius20 margin-top-sm" style="padding: 39rpx 44rpx;padding-bottom: 41rpx;">
			<view class="font32">
				转售须知
			</view>
			<view class="margin-top-sm col-999" style="line-height: 45rpx;">
				1、您将获得除支付通道服务费（{{sitesinfo.serve_pay}}%）、平台综合服务
				费（{{sitesinfo.serve_terrace}}%）、创作者版权分成（{{sitesinfo.serve_write}}%）之外的所有售卖收
				入。
			</view>
		</view>
		<view class="flex align-center font30 margin-top-sm">
			<view class="flex align-center">
				<radio :checked="radio" color="#3b3f47" style="transform: scale(.7);" @tap="radio=!radio"></radio>
				<view class="margin-left-sm" @tap="radio=!radio">
					我已阅读并同意
				</view>
				<view class="text-blue" @click="util.urlTo('rich_text?type=1')">
					《寄售协议》
				</view>
			</view>
		</view>
		
		<view class="" style="height: 120rpx;"></view>
		
		<view class="flex align-center justify-center">
			<view @click="iszs" class="btnbggg" style="width: 580rpx;height: 94rpx;border-radius: 47rpx;">
				确定转售
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='Modal'?'show':''" style="z-index: 1;">
			<view class="cu-dialog radius20 smbg po-rela text-center bg-white" @click.stop>
				<view class="" style="padding: 40rpx 60rpx 90rpx;border-bottom: solid 1rpx #F7F7F7;">
					<view class="font34">
						转售确认
					</view>
					<view class="text-left" style="margin-top: 53rpx;" v-if="type == 1">
						藏品：{{all.goods.goods_name}}
					</view>
					<view class="text-left" style="margin-top: 53rpx;" v-else>
						藏品：{{all.box.box_name}}
					</view>
					<view class="text-left" style="margin-top: 53rpx;">
						价格：{{money}}元
					</view>
				</view>
				<view class="flex align-center">
					<view @click="modalName=''" class="flex-sub col-999 flex align-center justify-center" style="padding: 36rpx 0rpx;border-right: solid 1rpx #F7F7F7;">
						取消
					</view>
					<view @click="getPass" class="flex-sub text-blue flex align-center justify-center" style="padding: 36rpx 0rpx;">
						确认
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='payModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg292B2B justify-end">
					<view class="content">请输入操作密码</view>
					<view class="action" @tap="modalName='';clearPwd()">
						<text class="cuIcon-close text-black"></text>
					</view>
				</view>
				<view class="padding-top padding-bottom-xl" v-if="modalName=='payModal'">
					<validcode ref="pwd" :maxlength="6" :isPwd="true" @finish="inputVal"></validcode>
				</view>
			</view>
		</view>
	</view>
	<!-- <view class="flex align-center justify-center font42 text-bold" style="height: 50vh;">
		暂未开放,敬请期待
	</view> -->
</template>

<script>
	import api from '@/common/api.js'
	export default {
		data() {
			return {
				modalName: '',
				radio: false,
				id: '',
				money: null,
				all: {
					goods: {}
				},
				resaleinfo: {},
				sitesinfo: {},
				user: {},
				type:1
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.type = e.type;
			this.getData();
			this.rateinfo();
			this.getarticle();
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.user = res;
				})
			},
			getData() {
				if(this.type==1){
					this.util.request('goods/goods_details', {
						id: this.id
					}).then(res => {
						this.all = res;
					})
				}else{
					this.util.request('goods/box_details', {
						id: this.id
					}).then(res => {
						this.all = res;
					})
				}
			},
			iszs(){
				if (!this.radio) {
					this.util.showToast("请阅读并同意隐私协议");
					return false;
				}
				if (!this.money) {
					this.util.showToast("请设置单价");
					return false;
				}
				this.modalName='Modal';
			},
			getPass() {
				this.util.getUserInfo().then(res => {
					if (res.pay_pwd == 1) {
						this.modalName = 'payModal';
					} else {
						this.util.showMsg('您还未设置支付密码', 1000, this.util.urlTo('../my/psd'));
					}
				})
			},
			inputVal(e) {
				console.log(e)
				let _this = this;
				this.pwd = e
				if (e.length == 6) {
					uni.request({
						// url: 'http://xingchuangyuan.hefuscm.cn/api/user/check_pay_available',
						url: `${api.path}/user/check_pay_available`,
						data: {
							paypwd: e,
			
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Accept-Language': 'zh-cn',
							'token': uni.getStorageSync('token')
						},
						success(res) {
							console.log(res)
							_this.modalName = null;
							if (res.data.code == 1) {
								_this.submit();
							} else {
								uni.showModal({
									content: '支付密码错误，请重试',
									confirmText: '重试',
									cancelText: '忘记密码',
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
											_this.modalName = 'payModal';
										} else if (res.cancel) {
											console.log('用户点击取消');
											uni.navigateTo({
												url: '/pages/my/psd'
											})
										}
									}
								});
							}
						},
						fail(err) {
							_this.showToast('加载失败，请检查网络');
						}
					})
			
				}
			},
			submit(){
				this.util.request('goods/goods_turn', {
					id: this.id,
					type: this.type,
					price: this.money
				}).then(res => {
					this.util.showToast('操作成功', true)
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				})
			},
			calculate(){
				this.util.request('goods/calculate', {
					id: this.id,
					type: this.type,
					price: this.money
				}).then(res => {
					this.resaleinfo = res;
				})
			},
			rateinfo(){
				this.util.request('common/sitesinfo', {}).then(res => {
					this.sitesinfo = res;
				})
			},

		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}
.left {
		background: #3b3f47;
		padding: 4rpx 8rpx;
		color: #fff;
		border-radius: 10rpx 0rpx 0rpx 10rpx;
	}
	
	.right {
		color: #444;
		padding: 4rpx 8rpx;
		border-radius: 0rpx 10rpx 10rpx 0rpx;
		/* border: 1rpx solid #3b3f47; */
	}
</style>