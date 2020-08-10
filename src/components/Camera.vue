<template>
	<div>
		<!-- 显示区域 -->
		<div class="page-wrapper">
			<!-- 小箭头 -->
			<div class="page-arrows"></div>
			<!-- 主要区域 -->
			<div class="camera-msg">请您移除帽子及面部遮挡物,目视摄像头点击拍摄按钮</div>
			<!-- 摄像区域 -->
			<div class="cmera-area">
				<!-- 左边摄像头 -->
				<video id="video" class="camera-main">
					<!-- <div class="camera-main-msg">摄像头正在开起,请稍后...</div> -->
				</video>
				<!-- 右边选择 -->
				<div class="d-flex flex-column j-sb ml-5">
					<!-- 上 -->
					<div class="d-flex a-center">
						<div class="camera-select-wrapper">
							<canvas id="canvas1" class="camera-select-inner"></canvas>
						</div>
						<el-radio v-model="selectImg" label="1" class="ml-3">使用此照片</el-radio>
					</div>
					<!-- 下 -->
					<div class="d-flex a-center">
						<div class="camera-select-wrapper">
							<canvas id="canvas2" class="camera-select-inner"></canvas>
						</div>
						<el-radio v-model="selectImg" label="2" class="ml-3">使用此照片</el-radio>
					</div>
				</div>
			</div>
		</div>
		<!-- 按钮区域 -->
		<div class="btn-wrapper d-flex j-sb a-center" style="padding-left: 70px;padding-right: 70px;">
			<div class="stepBtn stepBtn-danger" id="shootBtn">拍摄</div>
			<div class="stepBtn stepBtn-primary" @click="nextStep">确定</div>
		</div>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				selectImg: '1',
				imgFlag: true,
				img1: '',
				img2: '',
			};
		},
		methods: {
			...mapMutations(['changeCountDown','changeNowStep','changeCameraImg']),
			nextStep() {
				if (this.selectImg == 1) {
					var tempImg = this.img1;
				} else if (this.selectImg == 2) {
					var tempImg = this.img2;
				}
				if (!tempImg) {
					return this.$message({
						message: '您还尚未拍摄照片',
						type: 'warning',
					});
				}
				this.changeCameraImg(tempImg);
				this.changeCountDown(120);
				this.changeNowStep(8);
				this.$router.push('/print');
			}
		},
		mounted() {
			var video = document.getElementById('video');
			var canvas1 = document.getElementById('canvas1');  
			var context1 = canvas1.getContext('2d');
			var canvas2 = document.getElementById('canvas2');
			var context2 = canvas2.getContext('2d');
			if (navigator.mediaDevices.getUserMedia) {
				//最新的标准API
				navigator.mediaDevices.getUserMedia({video : {width: 1010, height: 1000}}).then(success).catch(error);
			} else if (navigator.webkitGetUserMedia) {
				//webkit核心浏览器
				navigator.webkitGetUserMedia({video : {width: 1010, height: 1000}},success, error)
			} else if (navigator.mozGetUserMedia) {
				//firfox浏览器
				navigator.mozGetUserMedia({video : {width: 1010, height: 1000}}, success, error);
			} else if (navigator.getUserMedia) {
				//旧版API
				navigator.getUserMedia({video : {width: 1010, height: 1000}}, success, error);
			}
			function success(stream) {
				video.srcObject = stream;
				video.play();
			}
			function error(error) {
				this.$message({
					message: `访问用户媒体设备失败${error.name}, ${error.message}`,
					type: 'warning',
				});
			}
			document.getElementById('shootBtn').onclick = ()=>{
				if (this.imgFlag) {
					context1.drawImage(video, 0, 0,300,150);
					this.img1 = document.getElementById('canvas1').toDataURL();
				} else {
					context2.drawImage(video, 0, 0,300,150);
					this.img2 = document.getElementById('canvas2').toDataURL();
				}
				this.imgFlag = !this.imgFlag;
			}
		}
	};
</script>

<style lang="less">
	.camera-msg{
		color: rgb(42,117,231);
		font-size: 25px;
		text-align: center;
		height: 120px;
		line-height: 120px;
		letter-spacing: 2px;
	}
	.cmera-area{
		display: flex;
		padding-left: 100px;
		.camera-main{
			width: 420px;
			height: 300px;
			background-color: rgb(0,0,0);
			position: relative;
			.camera-main-msg{
				color: #FFFFFF;
				font-size: 20px;
				letter-spacing: 2px;
				text-align: center;
				position: absolute;
				top: 50%;
				left: 0;
				right: 0;
				transform: translateY(-50%);
			}
		}
		.camera-select-wrapper{
			width: 150px;
			height: 120px;
			border: 1px solid #aaa;
			padding: 5px;
			background-color: #FFFFFF;
			box-shadow: 5px 5px 10px #ccc;
			.camera-select-inner{
				border: 1px solid #aaa;
				height: 100%;
				width: 100%;
				background-color: rgb(222,235,255);
			}
		}
	}
</style>
