<template>
	<view class="list_wrap">
		<u-sticky h5-nav-height="0">
			<!-- 只能有一个根元素 -->
			<view class="chat_name">
				<u-icon name='arrow-left' size='40' @click='util.backTo(1)'></u-icon>
				<text>{{show_name}}</text>
				<text></text>
			</view>
		</u-sticky>
		<scroll-view ref='scroll' scroll-y="true" :style="{'height':contentHeight +'px'}" :scroll-top="scrolTop" @scroll='scroll' @scrolltoupper='scrolltoupper' :upper-threshold='0'>
			<view ref='chatContent' class="letterList chat_list_box" >
				<u-loadmore v-show="showLoadMore" :status="loadmoreStatus" icon-type="iconType" :load-text="loadText" />
				<view class="" v-for="(row,index) of chatList">
					<block v-if="row.type == 1">
						
						<view :class="['system',chatList.type == 1 && index == 0 ? 'sys':'']"
							:style="{padding:'10upx 0',marginBottom:'10upx'}">
							<!-- 文字消息 -->
							<view v-if="row.msg.type==0" class="text">
								{{row.msg.content.text}}
							</view>
							<!-- 领取红包消息 -->
							<view v-if="row.msg.type==5" class="red-envelope" style="letter-spacing:4upx;">
								<image src="/static/img/red-envelope-chat.png" :lazy-load="true" />
								<!-- {{row.msg}} -->
								<block
									v-if="row.msg.content.rid_user_id == my_data.id && row.msg.content.user_id == my_data.id">
									我领取了自己发出的
								</block>
								<block
									v-else-if="row.msg.content.rid_user_id != my_data.id && row.msg.content.user_id == my_data.id">
									我领取了{{row.msg.content.rid_nickname}}发出的
								</block>
								<block
									v-else-if="row.msg.content.rid_user_id == my_data.id && row.msg.content.user_id != my_data.id">
									{{row.msg.content.nickname}}领取了我发出的
								</block>
								<block v-else>
									{{row.msg.content.nickname}}领取了{{row.msg.content.rid_nickname}}发出的
								</block>
								<text style="color: red;" @tap="toDetails(row.msg.content.rid)">红包</text>
							</view>
						</view>
					</block>
					<!-- 用户消息 -->
					<block v-if="row.type==0">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.msg.user_info.uid == my_data.id">
							<!-- 左-消息 -->
							<view class="left"
								@longtap="msgAction(row.msg.id +'',row.msg.user_info.uid + '',row.msg.content.text)"
								:id="row.msg.id" @tap="goLink(row.msg.content.text)">
								<!-- 文字消息 -->
								<view v-if="row.msg.type==0" class="bubble">
									<rich-text :nodes="row.msg.content.text ? getHtml(row.msg.content.text) : ' '"
										space="true" selectable="true" />
								</view>
								<!-- 语言消息 -->
								<view v-if="row.msg.type==1" class="bubble voice" @tap="playVoice(row.msg)"
									:class="playMsgid == row.msg.id?'play':''">
									<view class="length">{{row.msg.content.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type==2"
								      class="bubble img"
								      @tap="showPic(row.msg)">
								  <image :src="(staticPath + row.msg.content.url)"
								         :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"
								         :lazy-load="true" />
								</view>
								<!-- 文件消息 -->
								<view v-if="row.msg.type==10" class="bubble" @tap="downFile(row.msg)">
									<view>{{row.msg.content.filename}}</view>
									<image @error="imageError3" :data-id="index" :src="('/static/theme/default/chat/' + row.msg.content.filetype + '.png')" :lazy-load="true"
										style="width: 30px;height: 40px;margin-left:5px" />
								</view>
								<!-- 视频消息 -->
								<view v-if="row.msg.type==3" class="bubble img">
									<image :src=" staticPath + row.msg.content.save_pic_path"
										style="width: 320px;height: 240px"></image>
									<image class="bubble-bofang" src="/static/theme/default/my/bofang.png"
										style="width: 50px;height: 50px;" @tap="autoVideo(row.msg)"></image>
								</view>
								
								<!-- 红包 -->
								<view v-if="row.msg.type==5" class="bubble red-envelope"
									@tap="openRedEnvelope(row.msg,index)">
									<image src="/static/img/red-envelope.png" :lazy-load="true"
										:style="{'opacity':(receive_list.indexOf(row.msg.content.rid))< 0 ? 1 : 0.6}">
									</image>
									<view class="tis">
										{{(receive_list.indexOf(row.msg.content.rid)) <0?'恭喜发财，大吉大利':'已领取'}}
									</view>
									<view class="blessing">
										<view class="info">
											{{row.msg.content.blessing}}
										</view>
										<view class="has-get-red">
											点击打开红包
										</view>
										<!--{{row.msg.content.blessing}}-->
									</view>
								</view>
								<!-- 在线视频 -->
								<view v-if="row.msg.type==6" class="bubble">
					
									<view> {{row.msg.content.text}}
									</view>
									<text style="margin-left:2px" class="iconfont-im">&#xe619;
									</text>
								</view>
								<!-- 在线音频-->
								<view v-if="row.msg.type==7" class="bubble">
									<view> {{row.msg.content.text}}
									</view>
									<text style="margin-left:2px" class="iconfonts">&#xe60b;
									</text>
								</view>
								<!--卡片-->
								<view v-if="row.msg.type==8" class="send-card" @tap="getCard(row.msg)">
									<view class="send-card-content">
										<image :src="staticPhoto+row.msg.content.face" :lazy-load="true"
											style="width: 85upx;height: 85upx;"></image>
										<text>{{row.msg.content.nickname}}</text>
									</view>
									<view class="send-card-content-text">
										<text>名片</text>
									</view>
								</view>
								<!--戳一戳-->
								<view v-if="row.msg.type==9" class="bubble img" @tap="showPic(row.msg)">
									<image src="/static/theme/default/zuochuo.gif" :lazy-load="true"
										style="width: 70px;height: 70px;" />
								</view>
					
							</view>
							<!-- 右-头像 -->
							<view class="right" @tap="goDetails(row.msg.user_info.uid,row)">
								<image
									:src="(row.msg.is_niming == 1) ? '/static/theme/default/my/niming.png' : myPhoto"
									:lazy-load="true" style="border-radius: 10px;" @error="imageError2" />
							</view>
						</view>
					
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.msg.user_info.uid != my_data.id">
							<!-- 左-头像 -->
							<view class="left" @tap="goDetails(row.msg.user_info.uid,row)">
								<image
									:src="(row.msg.is_niming == 1)? '/static/theme/default/my/niming.png' : (staticPhoto + row.msg.user_info.face)"
									:lazy-load="true" style="border-radius: 10px;" :data-id="index"
									@error="imageError" />
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right"
								@longtap="msgAction(row.msg.id +'',row.msg.user_info.uid + '',row.msg.content.text)"
								@tap="goLink(row.msg.content.text)">
								<view class="username">
									<view class="name">{{row.msg.user_info.username}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.msg.type==0" class="bubble">
									<rich-text :nodes="row.msg.content.text ? getHtml(row.msg.content.text) : ' '"
										space="true" />
								</view>
								<!-- 语音消息 -->
								<view v-if="row.msg.type==1" class="bubble voice" @tap="playVoice(row.msg)"
									:class="playMsgid == row.msg.id?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{row.msg.content.length}}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type==2"
								      class="bubble img"
								      @tap="showPic(row.msg)">
								  <image :src="(staticPath + row.msg.content.url)"
								         :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"
								         :lazy-load="true" />
								</view>
								<!-- 视频消息 -->
								<view v-if="row.msg.type==3"
								      class="bubble img">
								  <image :src="staticPath + row.msg.content.save_pic_path"
								         style="width: 320px;height: 240px"></image>
								  <image class="bubble-bofang-left"
								         src="/static/theme/default/my/bofang.png"
								         style="width: 50px;height: 50px;"
								         @tap="autoVideo(row.msg)"></image>
								</view>
								<!-- 文件消息 -->
								<view v-if="row.msg.type==10" class="bubble img" @tap="downFile(row.msg)">
									<view>{{row.msg.content.filename}}</view>
									<image @error="imageError3" :data-id="index" :src="('/static/theme/default/chat/' + row.msg.content.filetype + '.png')" :lazy-load="true"
										style="width: 30px;height: 40px;margin-left:5px" />
								</view>
								<!-- 红包 -->
								<view v-if="row.msg.type==5" class="bubble red-envelope"
									@tap="openRedEnvelope(row.msg,index)">
									<image src="/static/img/red-envelope-o.png" :lazy-load="true"
										:style="{'opacity':(receive_list.indexOf(row.msg.content.rid))< 0 ? 1 : 0.6}">
									</image>
									<view class="tis">
										{{(receive_list.indexOf(row.msg.content.rid)) <0?'恭喜发财，大吉大利':'已领取'}}
									</view>
									<view class="blessing">
										<view class="info">
											{{row.msg.content.blessing}}
										</view>
										<view class="has-get-red">
											点击打开红包
										</view>
										<!--{{row.msg.content.blessing}}-->
									</view>
								</view>
								<view v-if="row.msg.type==6" class="bubble">
									<text style="margin-right:2px" class="iconfont-im">&#xe619;
									</text>
									{{row.msg.content.text}}
					
								</view>
								<view v-if="row.msg.type==7" class="bubble">
									<text style="margin-right:2px" class="iconfonts">&#xe60b;
									</text>
									{{row.msg.content.text}}
								</view>
								<view v-if="row.msg.type==8" class="send-card" @tap="getCard(row.msg)">
									<view class="send-card-content">
										<image :src="staticPhoto+row.msg.content.face" :lazy-load="true"
											style="width: 85upx;height: 85upx;"></image>
										<text>{{row.msg.content.nickname}}</text>
									</view>
									<view class="send-card-content-text">
										<text>名片</text>
									</view>
								</view>
					
								<view v-if="row.msg.type==9" class="bubble img" @tap="showPic(row.msg)">
									<image src="/static/theme/default/youchuo.gif" :lazy-load="true"
										style="width: 70px;height: 70px;" />
								</view>
							</view>
						</view>
					</block>
				</view>
				
				
				
			</view>
			<!-- 最后加一个垫底的节点 -->
			  <view class="last-view" ></view>
		</scroll-view>
		<!-- 底部消息输入或操作 -->
		<view class="operation_box fBtn">
			<view class="operation_wrap">
				<u-icon @click='openVoice' name="mic" color="#606266" size="42"></u-icon>
				<!-- <u-input :fixed='true' :custom-style='userInput'  v-model="value" type="textarea"  :clearable='false' :height='height' :border="border"/> -->
				<!-- <textarea cursor-spacing='0' :fixed='true' placeholder-class='textarea' v-model="value"></textarea> -->
				<textarea auto-height="true" @input="inputText" :value="value" @focus="textareaFocus"
					:maxlength="-1" :show-confirm-bar="false" 
					style="width:540rpx;max-height: 90rpx;overflow:auto;border: 2rpx solid #909399; border-radius: 10px;padding-top: 4px;padding-bottom: 4px; " />
				<u-icon v-show="!value" name="plus" @click="openselectFileType" color="#606266" size="42"></u-icon>
				<u-icon v-show="!value"  name="thumb-up" @click="openmene" color="#606266" size="42"></u-icon>
				<u-button v-show="value" type="primary" size="mini" style='margin-left: 30rpx;'>发送</u-button>
			</view>
		</view>
		<!-- 录音或者操作菜单选择 -->
		<view class="operation_hidden_wrap" v-show="show">
			<view class="voice_wrap" v-show="options_type == 'voice'" @touchstart="startRecord" @touchend="endRecord">
				<u-icon name="mic" color="#606266" size='200'></u-icon>
			</view>
			<view class="menu_wrap" v-show="options_type == 'menu'">
				<view class="menu_item" @click="upload(1,'album')">
					<view class="menu_item_image album">
						
					</view>
					<text class="menu_item_text">图片</text>
				</view>
				<view class="menu_item" @click="showSelect = !showSelect">
					<view class="menu_item_image camera">
						
					</view>
					<text class="menu_item_text">拍摄</text>
				</view>
				<view class="menu_item" @click="upload(2,'album')">
					<view class="menu_item_image video">
						
					</view>
					<text class="menu_item_text">视频</text>
				</view>
				<view class="menu_item" @click="selectFile">
					<view class="menu_item_image video">
						
					</view>
					<text class="menu_item_text">文件</text>
				</view>
			</view>
			<view class="meme" v-show="options_type == 'mene'">
				<swiper class=""  duration="150">
					<swiper-item v-for="(page,pid) in emojiList" :key="pid" style="display: flex;flex-wrap: wrap;">
						<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)" class="emoji_wrap">
							<image :src="'/static/img/emoji/' + em.url" class="emoji"/>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
		</view>
		<!-- 选择拍摄照片或者视频 -->
		<u-action-sheet :list="list" v-model="showSelect" @click="selectPictureType"></u-action-sheet>
	</view>
</template>

<script>
	// import uActionSheet from '@/uview-ui/components/u-action-sheet/u-action-sheet.vue'
	import emoj_data from '../../static/js/message/emoji_data.js';
	import htmlParser from '../../common/html-parser';
	import md5 from '@/js_sdk/js-md5/build/md5.min.js';
	import _data from '@/common/_data.js'
	export default {
		// components:{
		// 	uActionSheet
		// },
		data() {
			return {
				show: false,
				border: true,
				value: '',
				height: '30rpx',
				autoHeight: true,
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
				userInput: {
					'width': '30rpx',
					'height':'60rpx'
				},
				options_type: '',
				recorderManager: {},
				innerAudioContext: {},
				voicePath: '',
				showImgPreview:false,//是否展示图片预览遮罩层
				showImgPreviewSrc:null,//图片预览遮罩层图片地址
				src:'https://oss.csctesting.cn/uploads/20220831/29fedd4e7ff5cb14c336f8ba32a2dafc.jpg',
				//录制秒数
				duration: 15,
				//录制音频路径
				voicePath: '',
				//计时器
				timer: '',
				//计时器秒数
				second: 0,
				// 拍照或者选择
				showSelect:false,
				list:[
					{
						value: '1',
						text: '照片'
					},
					{
						value: '2',
						text: '视频'
					}
				],
				// 表情列表
				emojiList: emoj_data.emoji_list,
				//聊天记录滚动区域
				loadMessage:'',
				message:[],
				scrolTop:0,
				old:{
					scrolTop:0,
				},
				oldheight:0,//标签位置
				newheight:0, //新窗口高度
				chatList:[],
				//触顶加载
				loadmoreStatus:'loadmore',//loadmore 前   loading  中   nomore  无
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				contentHeight:0,
				showLoadMore:false,
				pages:1,
				list_id:null,
				show_name:null
			}
		},
		watch:{
			show:(newVla,oldVal)=>{
				if(newVla){
					setTimeout(()=>{
						uni.pageScrollTo({
							scrollTop:99999,
							success:()=>{
								console.log('监听成功');
							}
						})
					})
				}
			},
			oldheight:(newVla,oldVal)=>{
				console.log('oldheight改变了',newVla,oldVal);
			},
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo')
			this.getMaxHeight()
		},
		onShow() {
			let _this = this
			_this.my_data = uni.getStorageSync('userInfo');
		},
		onLoad(options) {
			this.recorderManager = uni.getRecorderManager();
			// this.scrolTop = 999999
			// this.innerAudioContext = uni.createInnerAudioContext();
			// 为了防止苹果手机静音无法播放
			// uni.setInnerAudioOption({  
			// 	obeyMuteSwitch: false  
			// })

			// this.innerAudioContext.autoplay = true;

			console.log("uni.getRecorderManager()", uni.getRecorderManager())
			let self = this;
			this.recorderManager.onStop(function(res) {
				console.log('recorder stop' + JSON.stringify(res));
				self.voicePath = res.tempFilePath;
				// 此时已经将录音完成的地址复制到this.voicePath  可以执行上传
			});
			console.log("options: ",options);
			this.list_id = options.list_id
		},
		mounted() {
			// this.chatList.length = 20
			// this.autoScroll()
			// this.getChatList()
			// this.chatList = [
			// 	{type:1},
			// 	{type:1},	
			// 	{type:1},
			// 	{type:1},
			// 	{type:1},
			// 	{type:1},
			// 	{type:1},
			// 	{type:1},
			// 	{type:1},
			// 	{type:1},
			// 	{type:1},
				
			// ],
			this.getMsg()
			
		},
		methods: {
			getHtml(content) {
				return htmlParser(content);
			},
			autoScroll() {
			  let view_id = 'view_id_' + parseInt(Math.random() * 1000000)
			  // this.scrollTo = 9999
			  // this.endId = view_id
			  // this.scrollTo = 9999999
			},
			actionSheetCallback() {
				
			},
			// 
			openVoice() {
				this.show = this.show && this.options_type == "voice" ? false : true 
				this.options_type = "voice"
			},
			openselectFileType() {
				this.show = this.show && this.options_type == "menu" ? false : true
				this.options_type = "menu"
				console.log(this.show);
			},
			openmene(){
				this.show = this.show && this.options_type == "mene" ? false : true
				this.options_type = "mene"
				console.log(this.show);
			},
			//录音
			getTimeIntervalplus() {
				//初始化秒数
				this.second = 0
				//首先清除所有计时器
				clearInterval(this.timer);
				//设定一个计时器,将计时器的编号赋值给this.timer
				this.timer = setInterval(() => {
					//延迟的时间设为一秒,所以每过一秒,this.second加一
					this.second += 1;
					//判断当秒数大于等于输入框设定的秒数的时候
					if (this.second >= 5) {
						//停止录音
						this.recorderManager.stop((res)=>{
							console.log('tempFilePath',res.tempFilePath);
						});
						//清除计时器
						clearInterval(this.timer);
						//关闭弹出层
						// this.$refs.popup.close('bottom')
						console.log('录音结束')
						// this.show = true
					}
				}, 1000);
			},
			startRecord() {
				//首先对输入框中输入的数字进行判断
				if (this.duration >= 3 && this.duration <= 20) {
					// 点击开始录音
					console.log('开始录音');
					// this.$refs.popup.open('bottom')
					//将输入框中的数字进行加工成单位为ms的
					var tims = this.duration * 1000
					//封装的一个计时器,调用开始计时
					this.getTimeIntervalplus();
					const options = {
						//指定录音的时长
						duration: tims,
						//采样率
						sampleRate: 44100,
						//录音通道数
						numberOfChannels: 1,
						//编码码率
						encodeBitRate: 192000,
						//音频格式
						format: 'mp3',
						//指定帧大小
						frameSize: 50
					}
					console.log(options)
					this.recorderManager.start(options);
				} else {
					uni.showToast({
						title: '录制时长在3-20S之间',
						icon: 'none',
						duration: 2000
					});
				}
			},
			endRecord() {
				
				this.recorderManager.stop();
				clearInterval(this.timer); //清除计时器
				// this.playVoice()
			},
			playVoice() {
				console.log('播放录音');
				console.log('this.voicePath', this.voicePath);
				
				// if (this.voicePath) {
				// 	this.innerAudioContext.src = this.voicePath;
				// 	this.innerAudioContext.play();
				// }
			},

			// 上传
			upload(type,sourceType) {
				if(type == 1){
					uni.chooseImage({
						count: 6, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: [sourceType], //从相册选择
						success: function(res) {
							// console.log(JSON.stringify(res));
							console.log(res);
							_this.show = false
							
							// 执行上传或者调用接口
							
							
						},
						fail() {
							// 选择失败   判断用户是否授权相机和选择图片的权限
							
							
						}
					})
				}else if(type == 2){
					
					uni.chooseVideo({
						count: 6, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: [sourceType], //从相册选择
						success: function(res) {
							// console.log(JSON.stringify(res));
							console.log(res);
							_this.show = false
							
							// 执行上传或者调用接口
							
							
						},
						fail() {
							// 选择失败   判断用户是否授权相机和选择图片的权限
							
							
						}
					})
				}
				
			},
			videoErrorCallback: function(e) {
				// uni.showModal({
				// 	content: e.target.errMsg,
				// 	showCancel: false
				// })
			},
			videoPlay(){
				setTimeout(()=>{
					console.log(111);
				},5000)
			},
			showPreview(src){
				console.log(src);
				this.showImgPreviewSrc = 'https://oss.csctesting.cn/uploads/20220831/29fedd4e7ff5cb14c336f8ba32a2dafc.jpg' 
				this.showImgPreview = true
				
			},
			selectPictureType(index){
				console.log();
				if(this.list[index].text == '照片'){
					this.upload(1,'camera')
				}else if(this.list[index].text == '视频'){
					this.upload(2,'camera')
				}
			},
			addEmoji(em){
				console.log(em)
				this.value = this.value + em.alt
			},
			inputText(val){
				this.show = false
				this.value = val.detail.value
			},
			textareaFocus(){
				
			},
			//
			scroll(e){  
				// console.log('滚动高度',e.detail);
				
				// console.log('eeeee',e.detail);
				// let newH = e.detail.scrollHeight
				// this.newheight = e.detail.scrollHeight
				// console.log('aaaaa',this.newheight);
			},
			scrolltoupper(e){
				// console.log(e);
				// that.loadMessage='加载中'
				console.log(e);
				this.showLoadMore = true
				if(this.loadmoreStatus == 'loadmore'){
					this.loadmoreStatus = 'loading'
					let query = uni.createSelectorQuery(),
						that = this
						query.select('.letterList').boundingClientRect()
						query.exec(data=>{
							that.oldHeight = data[0].height
							console.log('oldHeight',this.oldHeight);
							this.getChatList()
						})
				}
			},
			getMaxHeight(){
				let systemHeight = uni.getSystemInfoSync().windowHeight,
					query = uni.createSelectorQuery(),
					lementHeight = 0,
					that = this
					this.$nextTick(function(){
						query.select('.fBtn').boundingClientRect()
						query.select('.chat_name').boundingClientRect()
						query.select('.letterList').boundingClientRect()
						query.exec(data=>{
							console.log(systemHeight,data);
							// 设置聊天内容滚动区域高度
							that.contentHeight = systemHeight - data[0].height  - data[1].height
							console.log(that.contentHeight);
							// 设置聊天内容 的  滚动的高度
							console.log(that.scrolTop);
						})
						that.scrolTop = 99999
					})
						
			},
			selectFile(){
				uni.chooseFile({
					extension:['.zip','.doc','.docx','txt','.pdf','.xls','.xlsx'],
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				})
			}, 
			getChatList(){
				// console.log(this.oldheight);
				let res = [{type:1},{type:2},{type:1},{type:2},{type:1},{type:2},{type:1},{type:2}]
				this.chatList = [...res,...this.chatList]
				// console.log(this.chatList);
				// console.log(this.oldHeight);
				let _that = this
				if(_that.showLoadMore){
					setTimeout(()=>{
						// _that.scrolTop = 0
						console.log('加载新内容完成，滚动页面记录高度',_that.oldHeight);
						this.$nextTick(function(){
							let query1 = uni.createSelectorQuery()
							query1.select('.letterList').boundingClientRect()
							query1.exec(data=>{
								console.log(data);
								console.log(data[0].height,this.oldHeight);
								_that.scrolTop = data[0].height - _that.oldHeight + Math.random()
								console.log(_that.scrolTop);
							})
						})
						if(true){
							_that.loadmoreStatus = 'loadmore'
							_that.showLoadMore = false
						}else{
							_that.loadmoreStatus = 'nomore'
							_that.showLoadMore = true
						}
					},)
				}
				// return
				// this.util.request('order/goods_order',{}).then(res=>{
					
					
				// 	// this.loadmoreStatus = 'loadmore'
				// })
			},
			getMsg(){
				this.chatList = _data.localData(this.list_id).list;
				this.show_name = _data.localData(this.list_id).show_name
				console.log("this.chatList: ",this.chatList);
			}
		}
	}
</script>

<style lang="scss">
	@import "@/static/css/chat/style.scss";
	.list_wrap {
		background-color: #F6F6F6;

		.chat_list_box {
			// min-height: 90vh;
			width: 100%;
			// overflow-y: scroll;
		}
	}

	/deep/.u-icon {
		// margin: 0 auto;
		display: flex;
		justify-content: center;

		width: 70rpx !important;
	}

	.operation_wrap {
		// padding: 0 30rpx;
		min-height: 70rpx;
		display: flex;
		align-items: center;
		background-color: #fff;

	}
	.operation_box{
		background-color: #fff;
		padding: 20rpx 0rpx;
		height: 105rpx;
		display: flex;
		
		align-items: center;
		
	}
	.chat_name {
		position: static;
		background-color: #fff;
		width: 100vw;
		height: 80rpx;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.operation_hidden_wrap {
		height: 30vh;
		width: 100%;
	}

	.chat_list_box {
		padding: 60rpx 30rpx;

		.chat_cell {
			display: flex;
			margin-top: 30rpx;
			.userImg {
				image {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.userName {
				margin-left: 30rpx;

				.chat_content {
					margin-top: 10rpx;
					width: fit-content;
					max-width: 500rpx;
					background-color: #fff;
					border-radius: 10rpx;
					padding: 10rpx;
					position: relative;

				}

				.chat_content::after {
					position: absolute;
					left: -20rpx;
					top: 8rpx;
					content: '';
					width: 0%;
					height: 0%;
					border: 10rpx solid;
					border-color: transparent #fff transparent transparent;
				}
			}
		}

		.chat_cell_isMe {
			display: flex;
			flex-direction: row-reverse;

			.userImg {
				image {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.userName {
				margin-right: 30rpx;
				display: flex;
				flex-direction: column;
				align-items: flex-end;

				.chat_content {
					margin-top: 10rpx;
					width: fit-content;
					max-width: 500rpx;
					background-color: #3A9BF5;
					border-radius: 10rpx;
					padding: 10rpx;
					position: relative;
					color: #fff;
				}

				.chat_content::after {
					position: absolute;
					right: -20rpx;
					top: 8rpx;
					content: '';
					width: 0%;
					height: 0%;
					border: 10rpx solid;
					border-color: transparent transparent transparent #3A9BF5;
				}
			}
		}
	}

	.voice_wrap {
		width: 100%;
		display: flex;
		height: 100%;
		align-items: center;

		justify-content: center;

	}

	.menu_wrap {
		width: 100%;
		display: flex;
		height: 100%;
		flex-wrap: wrap;
		align-items: flex-start;
		padding: 40rpx;
	}

	.menu_item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.myVideo{
		width: 60vw;
	}
	.myAudio{
		width: fit-content;
		display: flex;
		align-items: center;
	}
	.u-mask-show{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.menu_item_image{
		width: 150rpx;
		height: 150rpx;
		background-size: 100%;
	}
	.menu_item_image{
		font-size: 32rpx;
		
	}
	.album{
		background-image: url('../../static/img/chat_icon/8173.png');
		
	}
	.camera{
		background-image: url('../../static/img/chat_icon/8174.png');
	}
	.video{
		background-image: url('../../static/img/chat_icon/8175.png');
	}
	.meme{
		padding: 30rpx 0;
	}
	/deep/.uni-swiper-item{
		display: flex !important;
	}
	.emoji_wrap{
		display: flex;
		width: 40rpx;
		margin: 0rpx 40rpx;
	}
	.emoji{
		width: 40rpx;
		height: 40rpx;
	}
	.textarea{
		border: 1px solid;
		height: 80rpx;
	}
	.file_wrap{
		display: flex;
		.file_type_img{
			width: 100rpx;
			height: 100rpx;
		}
		.file_message{
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
			justify-content: space-between;
		}
	}
	
	.sys:nth-child(1) {
		margin-top: 50px;
	}
	.text{
		text-align: center;
	}
</style>
