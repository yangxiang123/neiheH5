<template>
	<view class="page">
		<view class="title">邀请好友 加入我们</view>		
		<view class="text-center margin-top-sm">
			<image src="../../static/yqhb.png" style="width: 460rpx;height: 212rpx;margin-top:140rpx;" mode=""></image>
		</view>
		<!-- <view class="btnbggg" style="width:100%;;margin-top:100rpx;"  @click="look">邀请好友</view> -->

		<view class="" style="margin-top:80rpx;">
			<view class="bg-white radius20" style="width: 608rpx;">
				<view class="flex align-center radius20" style="margin:30rpx auto;width:100%;">
					<view class="two_btn" :class="act == 0?'two_btn1 two_btn':'two_btn'" @click="act = 0">排行榜</view>
					<view class="two_btn2" :class="act == 1?'two_btn3 two_btn':'two_btn2 two_btn'" @click="act = 1">我的好友
					</view>
				</view>
				<view class="flex align-center" style="padding: 24rpx 32rpx;border-bottom: solid 1rpx #E7E7E7;"
					v-for="(item,index) in list2.ranking" :key="index" v-if="act == 0">
					<view class="font36 u-margin-right-30" :class="index==0?'hao1':index==1?'hao2':index==2?'hao3':'hao'">NO.{{index+1}}</view>
					<image :src="item.inviter.avatar" style="width: 72rpx;height: 72rpx;border-radius: 50%;" mode=""></image>
					<view class="flex-sub padding-left-sm">
						<view class="font26">
							{{item.inviter.nickname}}
						</view>
						<!-- <view class="margin-top-xs">
							{{item.is_auth_text}}
						</view> -->
					</view>
					<view class="">
						邀请{{item.num}}人
					</view>
				</view>
				<view v-for="(item,index) in all" :key="index" class="flex align-center pad28 margin-bottom-lg"
					:class="index==0?'':'bor'" v-if="act == 1">
					<view class="" v-if="item.user">
						<image :src="item.user.avatar" mode="aspectFill" class="round"
							style="width: 80upx;height: 80upx;">
						</image>
					</view>
					<view class="margin-left  hidden flex-sub" v-if="item.user">
						<view class="text-lg text-1 margin-bottom-xs">
							{{item.user.nickname}}
						</view>
						<view class="" v-show="item.user.real_status==1">
							已实名
						</view>
						<view class="text999" v-show="item.user.real_status==0">
							未实名
						</view>
					</view>
					<view class=" text-sm">
						{{item.invitetime_text}}
					</view>
				</view>
				<view class="text-center padding-bottom-lg" v-if="list.list && !list.list[0]">
					暂无邀请人
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				all: [],
				list: '',
				days: ['今日', '昨日', '本月', '上月'],
				days_act: 0,
				act: 0,
				page: 1,
				real: '',
				invite: '',
				list2:''
			}
		},
		onShow(e) {
			this.getinfo();
			this.getlist();
			this.getlist2()
		},
		onPullDownRefresh() {
			this.list = '';
			this.list2 = '';
			this.getlist();
			this.getinfo();
			this.getlist2()
		},
		methods: {
			getlist2() {
				this.util.request('invite/inviteRank', {}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					this.list2 = res;
					console.log(this.list2)
				})
			},
			look() {
				console.log(this.list.poster)
				let _this = this;
				let imgArray = [];
				// 多张
				for (let i = 0; i < 1; i++) {
					imgArray.push(_this.list.poster);
				}
				
				uni.previewImage({
					current: 1, //当前为第几张
					urls: imgArray,
					// indicator: 'number',
					// loop: true
				});
				// this.util.lookImg(this.list.poster);
			},
			getlist() {
				this.util.request('Invite/index', {}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					this.list = res;
					console.log(this.list)
				})
			},
			getinfo() {
				this.util.request('invite/junior', {
					page: this.page
				}).then(res => {
					this.all = res.list;
					console.log(this.all)
					// this.page++;
					this.real = res.real;
					this.invite = res.invite;
				})
			}
		}
	}
</script>

<style>
	.page {
		padding:100rpx 72rpx;
		
	}
	.hao{
		color: #444444;
		font-size: 36rpx;
	}
	.hao1{
		color:#FFC300;
		font-size: 36rpx;
	}
	.hao2{
		color:#B9B9B9;
		font-size: 36rpx;
	}
	.hao3{
		color:#E28F00;
		font-size: 36rpx;
	}
	
	.title{
		text-align: center;
		font-size: 48rpx;
		font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
		font-weight: bold;
		color: #3D3D3D;
	}

	.btn {
		width: 156rpx;
		height: 58rpx;
		line-height: 58rpx;
		text-align: center;
		background: linear-gradient(0deg, #1A9EFF 0%, #0FB8FF 100%);
		border-radius: 29rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.two_btn {
		width: 50%;
		height: 98rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #16A8FF;
		opacity: 0.5;
		border-radius: 20rpx 0px 0px 20rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		text-align: center;
		line-height: 46rpx;
		color: #FFFFFF;
		
	}

	.two_btn2 {
		border-radius: 0rpx 20rpx 20rpx 0rpx;
		opacity: 0.5;
	}

	.two_btn3 {
		border-radius: 0rpx 20rpx 20rpx 0rpx;
		opacity: 1;
	}

	.two_btn1 {

		opacity: 1;
	}




	.cos_day {
		width: 111rpx;
		height: 46rpx;
		background: linear-gradient(0deg, #1A9EFF 0%, #0FB8FF 100%);
		opacity: 0.5;
		border-radius: 5rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 46rpx;
		color: #FFFFFF;
	}

	.cos_day1 {
		width: 111rpx;
		height: 46rpx;
		background: linear-gradient(0deg, #1A9EFF 0%, #0FB8FF 100%);
		line-height: 46rpx;
		border-radius: 5rpx;
		opacity: 1;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.yqtitle {
		background: url('@/static/my/yqlb.png') no-repeat;
		height: 82rpx;
		background-size: 408rpx 82rpx;
		background-position: 50% 0rpx;
		z-index: 99;
	}
</style>
