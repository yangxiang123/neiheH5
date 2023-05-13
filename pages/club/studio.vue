<template>
	<view class="">
		<view class="">
			<image :src="all.back_image" style="width: 100%;height: 360rpx;" mode=""></image>
		</view>
		<view class="bg-white margin radius20 radius20 padding text-center po-rela" style="margin-top: -50rpx;">
			<image :src="all.organiza_image" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: -105rpx;" mode=""></image>
			<view class="font32" style="color: #222222;">
				{{all.organiza_name}}
			</view>
			<view class="font26 margin-top-xs" style="color: #666666;">
				{{all.fans_num}} 粉丝
			</view>
			<view class="font24 margin-top-sm" style="color: #222222;">
				{{all.organiza_jianjie}}
			</view>
			<view class="flex justify-center margin-top-sm">
				<view @click="gz" class="btnbg align-center" style="width: 200rpx;height: 64rpx;">
					<span v-if="all.have_follow == 0" class="cuIcon-add" style="margin-top: 5rpx;"></span>
					<view class="">
						{{all.have_follow == 0 ? '关注' : '取消关注'}}
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white margin radius20 radius20">
			<view class="font34 text-bold padding" style="color: #222222;">
				藏品空间
			</view>
			<view class="flex flex-wrap justify-between" style="background-color: #F7F7F7;">
				<view class="bg-white radius20 margin-bottom-sm" style="width: 49%;" @click="util.urlTo('../home/info?type=3&id=' + item.id)" v-for="(item,index) in list" :key="index">
					<view class="po-rela">
						<image :src="item.goods_image" style="width: 335rpx;height: 335rpx;" class="radius20" mode=""></image>
					</view>
					<view style="padding: 18rpx;">
						<view class="" style="color: #222222;">
							{{item.goods_name}}
						</view>
						<view class="flex align-center" style="font-size: 20rpx;margin-top: 14rpx;">
							<view class="left flex justify-center align-center">
								限量
							</view>
							<view class="right flex justify-center align-center text-white">
								{{item.goods_number}}份
							</view>
						</view>
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
				page: 1,
				id: '',
				all: {},
				list: [],
				user: {}
			}
		},
		onLoad(e) {
			e.id ? this.id = e.id : '';
			this.getinfo();
			this.getlist();
		},
		onShow() {
			this.getUserInfo();
		},
		onPullDownRefresh() {
			this.list = [];
			this.getinfo();
			this.getlist();
		},
		methods: {
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.user = res;
				})
			},
			getinfo(){
				this.util.request('center/organiza_info', {
					organiza_id: this.id
				}).then(res => {
					this.all = res;
				})
			},
			getlist(e){
				this.util.request('center/organiza_goods', {
					organiza_id: this.id,
					page: this.page,
					limit: 10
				}).then(res => {
					uni.stopPullDownRefresh()
					this.list = res.list;
				})
			},
			gz(){
				if (this.user.real == 0) {
					this.util.urlTo('../index/shiming');
				} else {
					this.util.request(this.all.have_follow == 0 ? 'center/follow_jlb' : 'center/unfollow_jlb', {
						organiza_id: this.id
					}).then(res => {
						this.util.showToast(this.all.have_follow == 0 ? '关注成功' : '取关成功');
						this.getinfo();
					})
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
	
	.left{
		background: linear-gradient(45deg, #F1BD4D 0%, #EFDE2E 100%);
		padding: 4rpx 8rpx;
		color: #8C521D;
		border-radius: 4rpx 0rpx 0rpx 4rpx;
	}
	.right{
		background-color: #8C521D;
		padding: 4rpx 8rpx;
		border-radius: 0rpx 4rpx 4rpx 0rpx;
	}
</style>