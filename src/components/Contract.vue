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
			<div class="stepBtn stepBtn-danger" @click="disagree">不同意</div>
			<div class="step-msg">请仔细阅读以上合约/协议/须知</div>
			<div class="stepBtn stepBtn-primary" @click="agree">同意</div>
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
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
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
			};
		},
		computed: {
			...mapState(['nowStep']),
			zoomInOutStyle() {
				if (this.pageTurn) return {width:'50%'};
				if (this.zoomInOut === 1) return  {width: '120%'};
				if (this.zoomInOut === 2) return  {width: '140%'};
				if (this.zoomInOut === 3) return  {width: '160%'};
				return {width: '100%'};
			}
		},
		methods: {
			...mapMutations(['changeCountDown','changeNowStep']),
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
			disagree() {
				this.$confirm('您确定不同意合约吗?','提示',{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(()=>{
					this.$message('您已取消合约');
					this.changeCountDown(-1);
					this.changeNowStep(1);
					this.$router.push('/plugin');
				}).catch(()=>{});
			},
			agree() {
				this.changeCountDown(120);
				this.changeNowStep(5);
				this.$router.push('/sms');
			},
		},
		created() {
			if (this.nowStep !== 4) {
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
</style>
