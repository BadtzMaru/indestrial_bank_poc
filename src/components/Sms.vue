<template>
	<div>
		<!-- 显示区域 -->
		<div class="page-wrapper d-flex">
			<!-- 小箭头 -->
			<div class="page-arrows"></div>
			<!-- 主要区域 -->
			<div class="flex-1 smsForm-wrapper d-flex a-center ">
				<el-form :model="smsForm" ref="smsForm" label-width="350px">
					<el-form-item label="客户姓名: " prop="name">
						<span class="ml-3">{{name}}</span>
					</el-form-item>
					<el-form-item label="借记卡号: " prop="cardID">
						<span class="ml-3">{{cardID}}</span>
					</el-form-item>
					<el-form-item label="手机号: " prop="phone">
						<span class="ml-3">{{phone|phoneAnonymity}}</span>
					</el-form-item>
					<el-form-item label="认证码: " prop="code">
						<el-input @input="handleCodeInput" class="ml-3" style="width: 280px;" v-model="smsForm.code"></el-input>
						<el-button @click="getCode" class="ml-5" type="primary" :disabled="codeFlag">{{codeMsg}}</el-button>
					</el-form-item>
					<el-form-item label="推广人 " prop="code">
						<el-input class="ml-3" style="width: 280px;" v-model="smsForm.promoter"></el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<!-- 按钮区域 -->
		<div class="btn-wrapper d-flex j-center a-center" style="padding-left: 70px;padding-right: 70px;">
			<div class="stepBtn stepBtn-primary" @click="nextStep">下一步</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				smsForm: {
					code: '',
					promoter: '',
				},
				codeFlag: false,
				smsCountDown: -1,
				smsCode: '',
				smsSI: '',
			};
		},
		computed: {
			...mapState(['cardID','name','phone']),
			codeMsg() {
				if (!this.codeFlag) {
					return '获取短信认证码';
				} else {
					return `${this.smsCountDown}秒后重新获取`;
				}
			},
		},
		filters: {
			phoneAnonymity(val) {
				return val.substr(0,3)+'****'+val.substr(7);
			},
		},
		methods: {
			...mapMutations(['changePromoter','changeCountDown','changeNowStep']),
			getCode() {
				if (this.codeFlag) {
					this.$message({
						message: `您的短信认证码还在有效期内`,
						type: 'warning',
					});
				} else {
					this.smsCode = this.$F.randomNum(1000,9999);
					this.$message({
						message: `您的短信认证码为: ${this.smsCode}(模拟数据)`,
					});
					console.log(`您的短信认证码为: ${this.smsCode}(模拟数据)`);
					this.smsCountDown = 60;
					this.codeFlag = true;
					this.smsSI = setInterval(()=>{
						if (this.smsCountDown>0) {
							this.smsCountDown--;
						} else {
							this.codeFlag = false;
							this.smsCountDown = -1;
							clearInterval(this.smsSI);
						}
					},1000);
				}
			},
			handleCodeInput() {
				if (this.smsForm.code.length>4) {
					this.smsForm.code = this.smsForm.code.substr(0,4);
				}
				this.smsForm.code = this.smsForm.code.replace(/\W/g,'');
			},
			nextStep() {
				if (!this.smsForm.code) {
					this.$message({
						message: '短信认证码不能为空',
						type: 'error',
					});
				} else if (this.smsForm.code != this.smsCode) {
					this.$message({
						message: '短信认证码错误,请重新输入',
						type: 'error',
					});
				} else {
					this.changePromoter(this.smsForm.promoter.trim());
					this.changeCountDown(120);
					this.changeNowStep(6);
					this.$router.push('/confirm');
				}
			},
		},
	};
</script>

<style lang="less">
	.smsForm-wrapper{
		.el-form-item__label,.el-form-item__content{
			font-size: 22px!important;
		}
	}
</style>
