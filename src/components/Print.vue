<template>
	<div>
		<!-- 显示区域 -->
		<div class="page-wrapper d-flex">
			<!-- 小箭头 -->
			<div class="page-arrows"></div>
			<!-- 主要区域 -->
			<div class="flex-1">
				<!-- 顶部工具栏 -->
				<div class="tool-bar">
					<i @click="handleZoomOut" class="el-icon-zoom-in" title="放大"></i>
					<i @click="handleZoomIn" class="el-icon-zoom-out" title="缩小"></i>
					<i @click="handlePreview" class="el-icon-view" title="预览"></i>
					<i @click="handlePageTurn" class="el-icon-reading" title="翻页模式"></i>
				</div>
				<!-- 工具栏占位 -->
				<div style="height: 40px;"></div>
				<!-- 条约图片 -->
				<div class="contract-wrapper">
					<img v-for="(item,index) in contractArr" :key="index" :style="zoomInOutStyle" :src="item">
				</div>
			</div>
		</div>
		<!-- 按钮区域 -->
		<div class="btn-wrapper d-flex j-sb a-center" style="padding-left: 70px;padding-right: 70px;">
			<div class="stepBtn stepBtn-danger" @click="handlePrint">打印</div>
			<div class="stepBtn stepBtn-primary" @click="nextStep">确定</div>
		</div>
		<!-- 条约弹出层 -->
		<el-dialog title="条约预览" :visible.sync="dialogVisible" :modal-append-to-body="false">
			<div style="height: 500px;overflow: auto;">
				<img v-for="(item,index) in contractArr" :key="index" class="w-100" :src="item">
			</div>
			<div slot="footer">
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 等待弹出层 -->
		<div class="wait-wrapper" :class="waitShow?'':'d-none'">
			<div class="wait-main">
				<div>倒计时<span>{{waitCountDown===-1?'--':waitCountDown}}</span>秒</div>
				<div>该步骤需工作人员授权,<br>请联系工作人员</div>
				<div>
					<div class="border " :class="waitRetry?'wait-btn-cancel':'wait-btn-retry'" @click="handleWaitRetry">重试</div>
					<div class="border wait-btn-cancel" @click="handleWaitCancel">取消</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				contractArr: [
					require('@/assets/img/contract/contract_1.jpg'),
					require('@/assets/img/contract/contract_2.jpg'),
					require('@/assets/img/contract/contract_3.jpg'),
					require('@/assets/img/contract/contract_4.jpg'),
				],
				zoomInOut: 0,
				dialogVisible: false,
				pageTurn: false,
				waitShow: false,
				waitCountDown: -1,
				waitSI: -1,
				waitRetry: false,
			};
		},
		computed: {
			zoomInOutStyle() {
				if (this.pageTurn) return {width:'50%'};
				if (this.zoomInOut === 1) return  {width: '120%'};
				if (this.zoomInOut === 2) return  {width: '140%'};
				if (this.zoomInOut === 3) return  {width: '160%'};
				return {width: '100%'};
			}
		},
		methods: {
			...mapMutations(['changeCountDown','changeNowStep','changeCountPause']),
			handleZoomOut() {
				if (this.zoomInOut < 3) return this.zoomInOut++;
				this.$message('无法放大了');
			},
			handleZoomIn() {
				if (this.zoomInOut > 0) return this.zoomInOut--;
				this.$message('无法缩小了');
			},
			handlePreview() {
				this.dialogVisible = true;
			},
			handlePageTurn() {
				this.pageTurn = !this.pageTurn;
			},
			handlePrint() {
				this.$message({
					message: '预留打印接口',
				});
			},
			handleWaitRetry() {
				if (this.waitRetry) {
					this.nextStep();
				} else {
					this.$message({
						message: '暂时无法重试',
						type: 'info',
					});
				}
			},
			nextStep() {
				this.waitRetry = false;
				this.waitShow = true;
				this.changeCountDown(120);
				this.changeCountPause(true);
				this.waitCountDown = 120;
				this.waitSI = setInterval(()=>{
					if (this.waitCountDown > 0) {
						this.waitCountDown--;
					} else if (this.waitCountDown === 0) {
						this.$message({
							message: '处理超时请重试',
							type: 'warning',
						});
						this.waitCountDown = -1;
						clearInterval(this.waitSI);
						this.changeCountPause(false);
						this.waitRetry = true;
					}
				},1000);
				// 模拟工作人员授权成功
				setTimeout(()=>{
					this.changeCountPause(false);
					this.changeCountDown(120);
					this.changeNowStep(9);
					this.$router.push('/result');
				},5000);
			},
			handleWaitCancel() {
				this.$confirm('您确定要取消等待吗?').then(()=>{
					this.waitShow = false;
					clearInterval(this.waitSI);
					this.waitCountDown = -1;
					this.changeCountPause(false);
				}).catch(()=>{});
			}
		},
		created() {
			if (this.$store.state.nowStep !== 8) {
				this.$router.push('/');
			}
		}
	};
</script>

<style lang="less">
	.contract-wrapper{
		width: 100%;
		height: 480px;
		overflow: auto;
		display: flex;
		flex-wrap: wrap;
	}
	.wait-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0,0,0,0.7);
		z-index: 2;
		.wait-main{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			background-color: #FFFFFF;
			background-color: #FFFFFF;
			width: 750px;
			height: 450px;
			&>div:nth-of-type(1){
				color: rgb(43,124,211);
				text-align: right;
				font-size: 23px;
				letter-spacing: 1px;
				padding-right: 25px;
				margin-top: 10px;
				&>span{
					color: rgb(253,99,99);
				}
			}
			&>div:nth-of-type(2){
				text-align: center;
				font-size: 24px;
				letter-spacing: 2px;
				margin-top: 100px;
			}
			&>div:nth-of-type(3){
				display: flex;
				justify-content: space-around;
				margin-top: 100px;
				&>div{
					width: 130px;
					height: 45px;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					transition: all .3s;
					border-radius: 5px;
				}
			}
		}
	}
	.wait-btn-retry{
		color: #ccc;
	}
	.wait-btn-cancel{
		background-color: rgb(0,68,166);
		color: #FFFFFF;
		&:hover{
			background-color: rgba(0,68,166,0.7);
		}
	}
</style>
