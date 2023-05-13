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
					<view class="flex align-center flex-sub" style="font-size: 20rpx">
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
		<view class="margin-top-lg font30">
			请输入好友的区块链地址/手机号
		</view>
		<view class="bg-white radius20 margin-top-lg" style="padding: 32rpx 41rpx;">
			<textarea name="" id="" cols="30" rows="10" v-model="blockchain" placeholder="请输入好友的区块链地址/手机号" placeholder-class="font26 col-999"></textarea>
		</view>
		<!-- 取消   继续购买 -->
		<view class="flex align-center justify-center margin-top-lg">
			<view @click="submit" class="btnbggg font30" style="width: 484rpx;height: 82rpx;border-radius: 47rpx;">
				转赠
			</view>
		</view>
		<view style="margin-top: 59rpx;">
			<view class="font32">
				转赠说明
			</view>
			<view class="margin-top-sm col-999 font24" style="line-height: 45rpx;">
				<rich-text :nodes="content" v-if="content"></rich-text>
			</view>
		</view>
		
		<view class="" style="height: 120rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: false,
				modalName: '',
				blockchain: '',
				all: {
					goods:{}
				},
				content: '',
				type:''
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.type = e.type;
			this.getData();
			this.getcontent();
		},
		methods: {
			getData() {
				if(this.type == 1){
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
			submit(){
				if(!this.blockchain){
					this.util.showToast('请输入好友的区块链地址/手机号');
					return false
				}
				this.util.request('goods/goods_give', {
					id: this.id,
					type: this.type,
					account: this.blockchain
				}).then(res => {
					this.util.showMsg('转赠成功')
					
					setTimeout(()=>{uni.navigateBack({
						delta: 2
					})},1500)
				})
			},
			getcontent(){
				this.util.request('common/article', {
					id: 5
				}).then(res => {
					this.content = res.content;
				})
			}
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
		border-radius: 4rpx 0rpx 0rpx 4rpx;
	}
	
	.right {
		color: #3b3f47;
		padding: 4rpx 8rpx;
		border-radius: 0rpx 4rpx 4rpx 0rpx;
	}
	
</style>