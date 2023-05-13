<template>
	<view style="bg">
		<!-- 背景图 -->
		<!-- 转盘 -->
		<view class="luck-list" style="">
			<view v-for="(item,index) in AwardList" :key="index">
				<view class="cell-item" :class="index==4||index===sel?'y-b':'w-b'" @tap="begin(index)">
					<view class="cell-content" :class="index==4||index===sel?'y':'w'">
						<image :src="item.img" mode="widthFix" style="width: 60rpx; height: 60rpx;" v-if="item.img">
						</image>
						<view style="margin-top: 5rpx;">
							<text style="font-size: 21rpx;">{{item.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			// 背景图
			nImg: String,
			// 列表
			AwardList: {
				type: Array,
				default: []
			},
			// 中奖索引

		},
		data() {
			return {
				sel: '',
				FastNums: 0,
				SlowNums: 0,
				time: 1000,
				LoopStatus: true,
				noClick: true,
				sell_fen: null,
				sjNum: 0
			}
		},
		onLoad() {

		},
		methods: {
			// 中奖后的逻辑
			updateMoney(money) {
				this.$emit('updateMoney', money)
			},
			// 开始抽奖
			begin(index) {
				if (index == 4) {
					if (!this.noClick) {
						uni.showToast({
							title: '请勿频繁点击',
							icon: "none",
							position: 'bottom'
						});
						return
					};
					this.noClick = false;
					this.FastNums = 0
					this.SlowNums = 0
					this.time = 200
					this.LoopStatus = true

					this.util.request('user/draw', {}, 'POST').then(res => {

						for (let i in this.AwardList) {
							if (this.AwardList[i].id == res.prize) {
								this.sjNum = i

							}
						}
						this.loop()
					})

				}
			},
			// 抽奖过程 控制
			loop() {
				let sjNum = this.sjNum

				if (!this.sel || this.sel < 9) {
					if (this.sel == 3) {
						this.sel = 0
					} else if (this.sel === '') {
						this.sel = 0
					} else if (this.sel == 2) {
						this.sel = 5
					} else if (this.sel == 5) {
						this.sel = 8
					} else if (this.sel == 8) {
						this.sel = 7
					} else if (this.sel == 7) {
						this.sel = 6
					} else if (this.sel == 6) {
						this.sel = 3
					} else {
						this.sel++
					}
					this.FastNums++
					if (this.FastNums == 4) {
						this.FastNums = 0
						this.time = 50
						this.SlowNums++
					}
					if (this.SlowNums == 8) {
						this.SlowNums = 0
						this.time = 500
						this.FastNums = 5
					}
					if (this.FastNums > 5) {
						if (this.sel == sjNum) {
							this.noClick = true;
							this.LoopStatus = false
							// 成功的逻辑
							uni.showToast({
								title: '恭喜获得-' + this.AwardList[sjNum].name,
								icon: "none",
								position: 'bottom'
							})
							this.updateMoney()

						}
					}
					if (this.LoopStatus) {
						setTimeout(() => {
							this.loop()
						}, this.time);
					}
				}
			}
		}

	}
</script>

<style scoped>
	/* 抽奖 */
	.luck-list {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		margin: 0 auto;
		margin-top: 440rpx;
		width: 600rpx;
	}

	.cell-item {
		width: 150rpx;
		height: 158rpx;
		border-radius: 30rpx;
		margin: 5rpx;
	}

	.cell-content {
		width: 150rpx;
		height: 138rpx;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.w {
		background-color: #fdf2ee;
	}

	.w-b {
		background-color: #f8d0c3;
	}

	.y {
		background-color: #fee610;
	}

	.y-b {
		background-color: #EFCD22;
	}
</style>