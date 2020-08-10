<template>
	<div class="home">
		<!-- 顶部信息 -->
		<el-row>
			<!-- 顶部左边 -->
			<el-col :span="16">
				<div class="d-flex a-center header-height">
					<img src="../assets/img/industrial_bank_logo.png" class="IB_logo" draggable="false">
					<div class="cross-line ml-2"></div>
					<div class="text-white ml-3 us-n" style="font-size: 55px;letter-spacing: 10px;margin-bottom: 10px;">金融自助通</div>
				</div>
			</el-col>
			<!-- 顶部右边 -->
			<el-col :span="8">
				<div class="header-height d-flex flex-column a-end j-center pr-4">
					<div class="font-md" style="color: rgb(181,219,255);">超时倒计时<span class="mx-2" style="color: rgb(255,93,91);">{{countDown===-1?'--':countDown}}</span>秒</div>
					<div class="text-white font-sm" style="letter-spacing: 2px;">{{nowTime}}</div>
				</div>
			</el-col>
		</el-row>
		<!-- 主体 -->
		<el-row>
			<!-- 主体左边 -->
			<el-col :span="6">
				<div class="d-flex flex-column pt-5">
					<img src="../assets/img/sms.png" style="width: 260px;" draggable="false">
					<div class="my-3" style="color: rgb(132,142,173);letter-spacing: 2px;font-size: 28px;"><i class="el-icon-chat-line-square mr-2"></i>功能介绍</div>
					<div style="color: rgb(132,142,173);font-size: 19px;width: 260px;letter-spacing: 2px;">短信口令是指在使用兴业银行电子银行进行对外支付时,使用手机短信配合验证的一种交易确认方式</div>
					<div class="main-left-btn" style="margin-top: 80px;"><i class="el-icon-service mr-2"></i>视频服务</div>
					<div class="main-left-btn mt-4"><i class="el-icon-menu mr-2"></i>返回首页</div>
				</div>
			</el-col>
			<!-- 主体右边 -->
			<el-col :span="18">
				<div class="pt-3">
					<!-- 步骤显示 -->
					<div class="d-flex step-wrapper">
						<div class="step-item">
							<div class="step-top-wrapper" >
								<div class="step-circle step-success"><i class="el-icon-check"></i></div>
							</div>
							<div class="step-text">读取卡片</div>
						</div>
						<div class="step-item">
							<div class="step-top-wrapper" >
								<div class="step-circle step-success"><i class="el-icon-check"></i></div>
							</div>
							<div class="step-text">输入密码</div>
						</div>
						<div class="step-item">
							<div class="step-top-wrapper" >
								<div class="step-circle setp-ing">3</div>
								<img src="../assets/img/step-loading.png" class="step-loading-img" draggable="false">
							</div>
							<div class="step-text step-text-ing">读取身份</div>
						</div>
						<div class="step-item">
							<div class="step-top-wrapper" >
								<div class="step-circle setp-wait">4</div>
							</div>
							<div class="step-text">合约</div>
						</div>
						<div class="step-item">
							<div class="step-top-wrapper" >
								<div class="step-circle setp-wait">5</div>
							</div>
							<div class="step-text">短信认证</div>
						</div>
						<div class="step-item">
							<div class="step-top-wrapper">
								<div class="step-circle setp-wait">6</div>
							</div>
							<div class="step-text">确认开通</div>
						</div>
						<div class="step-item">
							<div class="step-top-wrapper">
								<div class="step-circle setp-wait">7</div>
							</div>
							<div class="step-text">影像采集</div>
						</div>
						<div class="step-item">
							<div class="step-top-wrapper" >
								<div class="step-circle setp-wait">8</div>
							</div>
							<div class="step-text">申请单打印</div>
						</div>
						<div class="step-item">
							<div class="step-top-wrapper" >
								<div class="step-circle setp-wait">9</div>
							</div>
							<div class="step-text">开通结果</div>
						</div>
						<!-- 分隔符 -->
						<div class="step_line"></div>
					</div>
					<!-- 路由 -->
					<router-view></router-view>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				nowTime: '2020年08月10日 12:00:00',
			};
		},
		computed: {
			...mapState(['nowStep','countDown']),
		},
		methods: {
			...mapMutations(['changeCountDown','doCountDown','clearUp']),
		},
		beforeCreate() {
			this.nowTime = this.$F.getNowTime();
		},
		mounted() {
			setInterval(()=>{
				this.nowTime = this.$F.getNowTime();
				if (this.countDown>0) {
					this.doCountDown();
				} else if (this.countDown === 0) {
					this.clearUp();
					this.$message({
						message: '您的操作超时了',
						type: 'warning',
					});
					this.$router.push('/plugin');
				}
			},1000);
		}
	}
</script>

<style lang="less">
	.home{
		width: 1200px;
		margin: 0 auto;
	}
	.IB_logo{
		width: 280px;
		height: 80px;
	}
	.header-height{
		height: 120px;
	}
	.cross-line{
		background-color: #FFFFFF;
		width: 2px;
		height: 45px;
	}
	.main-left-btn{
		background-color: rgb(148,142,165);
		color: #FFFFFF;
		width: 220px;
		height: 58px;
		text-align: center;
		line-height: 58px;
		font-size: 22px;
		letter-spacing: 3px;
		border-radius: 10px;
		cursor: pointer;
		&:hover{
			background-color: rgba(148,142,165,0.7);
			transition: all .3s;
		}
	}
	.step-wrapper{
		background-color: rgb(107,125,173);
		height: 120px;
		border-radius: 15px 15px 0 0;
		position: relative;
	}
	.step_line{
		position: absolute;
		width: 100%;
		background-color: rgb(125,139,182);
		height: 3px;
		top: 38%;
		left: 0;
	}
	.step-item{
		padding-top: 15px;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.step-circle{
		width: 50px;
		height: 50px;
		font-size: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}
	.step-success{
		color: #FFFFFF;
		background-color: rgb(40,167,69);
	}
	.setp-ing{
		color: rgb(40,167,69);
	}
	.setp-wait{
		color: rgb(201,205,223);
		border: 3px solid rgb(124,141,183);
	}
	.step-text{
		color: rgb(200,203,221);
		margin-top: 3px;
	}
	.step-text-ing{
		color: #FFFFFF!important;
	}
	.step-top-wrapper{
		background-color: rgb(107,125,173);
		width: 63px;
		height: 63px;
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.step-loading-img{
		position: absolute;
		width: 94%;
		animation: turn 2s linear infinite;
		left: 1px;
		top: 2px;
	}
	
	@keyframes turn{
		0%{-webkit-transform:rotate(0deg);}
		25%{-webkit-transform:rotate(90deg);}
		50%{-webkit-transform:rotate(180deg);}
		75%{-webkit-transform:rotate(270deg);}
		100%{-webkit-transform:rotate(360deg);}
	}
</style>
