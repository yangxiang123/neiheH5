<template>
	<view class="page">
		 <!-- <my-turntable-draw
		  v-if="AwardList.length"
		    ref="raffleWheel" 
		    :width="650"
		    :height="650"
		    :prizeList="AwardList"
		    :targetIndex="targetIndex"
		    @befoterClick="befoterClick"
		    @afterClick="afterClick"
		  >
		  </my-turntable-draw> -->
		<!-- <i671-lucky v-if="AwardList.length" ref="lucky" startText="开始" :wIndex="wIndex" :luckyList="AwardList"
			@onReadyStart="onReadyStart" @lotteryData="getLotterData"></i671-lucky> -->
		<pt-lottery v-if="AwardList.length" ref="pt-lottery" lotteryBg="../../static/lotteryBg.png" lotteryBtn="../../static/lotteryBtn.png"
			:prizeList="AwardList" :showTimes="false" @start="start" @end="end"></pt-lottery>
		<!-- <gb-choujiang :AwardList="AwardList" @updateMoney="updateMoney"></gb-choujiang> -->
		<view class="bot">
			<view class="u-flex u-row-between">
				<view class="left">
					剩余积分:{{fen}}
				</view>
				<view class="" @click="chakan">点击查看中奖列表>>></view>
			</view>

			<view class="margin-top-sm text-sm text999 letter" style="line-height: 42rpx;">
				<rich-text :nodes="toalt"></rich-text>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='Modal'?'show':''" style="z-index: 999;">
			<view class="cu-dialog radius20 smbg po-rela bg-white">
				<scroll-view :scroll-y="true" class="scroll-Y" @scrolltolower="lower">
					<view class="list">
						<view class="close" @click.stop="modalName=''">
							<u-icon name="close" color="#ccc" size="40"></u-icon>
						</view>

						<view class="way" v-for="(item,index) in lists" :key="index">
							<view class="way_left">
								<image :src="item.prize.img" mode=""></image>
								<view class="">{{item.prize.name}}</view>
							</view>
							<view class="time">{{item.create_time}}</view>
						</view>

					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import myTurntableDraw from '@/components/my-turntable-draw/my-turntable-draw'
	import i671Lucky from '@/components/i671-lucky/i671-lucky.vue'
	export default {
		components: {
			i671Lucky,
			myTurntableDraw
		},
		data() {
			return {
				// 背景图，可网络地址，可本地

				// 中奖的索引，也就是AwardList数组的索引，sjNum不能等于4，4是立即抽奖
				sjNum: 0,
				// false前端，true后端
				isQd: true,
				// 可自己后端获取，也可以前端
				AwardList: [],
				fen: '',
				toalt: '',
				pay_score: '',
				modalName: '',
				page: 1,
				last_page: 1,
				lists: [],
				prizeIndex: 0,
				prizeList: [],
				wIndex: 0,
				targetIndex:0
			}
		},
		mounted() {
			this.getinit()
		},
		// onShow() {		

		// },
		// onReady() {
		// 	this.getinit()
		// },
		methods: {
			lower() {
				console.log(1)
				if (this.page < this.last_page) {
					this.page += 1
					this.getmodle_list()
				}
			},
			chakan() {
				this.lists = []
				this.page = 1
				this.getmodle_list()
				this.modalName = 'Modal'
			},
			getmodle_list() {
				this.util.request('user/draw_record', {
					page: this.page
				}, 'POST').then(res => {
					this.lists = this.lists.concat(res.data)
					this.last_page = res.last_page
				})
			},
			//获取数据
			getinit() {
				this.util.request('user/prizes', {}, 'POST').then(req => {

					this.fen = req.score
					req.prizes.forEach(item => {
						// that.$set(item.shipping_address, 'oneloc', 1)
						this.$set(item, 'prizeName', item.name)
						this.$set(item, 'prizeIcon', item.img)

					})
					this.AwardList = req.prizes


					console.log(this.AwardList)
				})
				this.util.request('user/draw_rule', {}, 'POST').then(res => {
					this.toalt = res.rule
					this.pay_score = res.pay_score


				})
			},
			// 中奖后的逻辑
			updateMoney(sjNum) {

				// 中奖后获取最新状态
				this.getinit()
			},
			start(){
				this.util.request('user/draw', {}, 'POST').then(res => {
					for (let i in this.AwardList) {
						if (this.AwardList[i].id == res.prize) {
							this.prizeIndex = i
							this.$refs['pt-lottery'].init(this.prizeIndex)
						}
					}
				
				})
				 
				
			},
			
			end(){
				this.getinit()
				if(this.prizeIndex == 0){
					uni.showToast({
						icon: 'none',
						title: '未中奖，再接再厉!'
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: '恭喜您获取'+this.AwardList[this.prizeIndex].prizeName
					})
				}
				
			},
			// onReadyStart() {
			// 	this.util.request('user/draw', {}, 'POST').then(res => {
			// 		for (let i in this.AwardList) {
			// 			if (this.AwardList[i].id == res.prize) {
			// 				this.wIndex = i
			// 				this.$refs.lucky.onStart()
			// 			}
			// 		}
			
			// 	})
			// },
			// getLotterData(data) {
			// 	this.$u.toast('恭喜您获得'+data.name)
			// 	this.getinit()
			// }

			// 获取本次中奖的
			// getData() {
			// 	// 概率指定，如果是前端控制，如果后端控制下面步骤判断步骤可以省略  直接后端获取sjNum值即可
			// 	if (this.isQd) {
			// 		this.util.request('user/draw', {}, 'POST').then(res => {
			// 			console.log()
			// 			for (let i in this.AwardList) {
			// 				if (this.AwardList[i].id == res.prize) {
			// 					this.sjNum = i
			// 					console.log(this.sjNum)
			// 				}
			// 			}
			// 		})
			// 	}
			// }

		}
	}
</script>

<style lang="scss">
	.page {
		height: 100vh;
		width: 100%;
		background: url('@/static/luck2.png') no-repeat center;
		background-size: 100% 100%;
		position: relative;
		overflow: hidden;


		.bot {
			padding: 0 44rpx;
			padding-top: 60rpx;
			color: #fff;
		}

		.list {
			width: 100%;
			height: 800rpx;
			padding: 30rpx;

			.close {
				text-align: right;
			}

			.way {
				height: 100rpx;
				line-height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
				border-bottom: 1rpx solid #F5F5F5;
				color: #444;

				.way_left {
					display: flex;
					align-items: center;
				}

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}

				.time {
					color: #ccc
				}
			}
		}
	}
</style>
