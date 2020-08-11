<template>
	<div>
		<!-- 显示区域 -->
		<div class="page-wrapper d-flex">
			<!-- 小箭头 -->
			<div class="page-arrows"></div>
			<!-- 主要区域 -->
			<div class="flex-1">
				<div class="page-title">请插入银行卡</div>
				<div class="d-flex a-center j-center pt-4">
					<img src="../assets/img/bank_card.png" class="plugin_card" draggable="false">
				</div>
			</div>
			<div class="flex-1">
				<div class="page-title">或手动输入卡号</div>
				<el-form :model="form" status-icon ref="ruleForm" :rules="rules">
					<el-form-item class="d-flex j-center" prop="cardID">
						<el-input @input="handleInputCardID" prefix-icon="el-icon-bank-card" v-model="form.cardID" style="width: 350px;font-size: 23px;"></el-input>
					</el-form-item>
				</el-form>
				<number-keybord @nk_clearup="handleClearup" @nk_keypress="handleKeypress" @nk_del="handleDel"></number-keybord>
			</div>
		</div>
		<!-- 按钮区域 -->
		<div class="btn-wrapper d-flex j-sb a-center" style="padding-left: 70px;padding-right: 70px;">
			<div class="stepBtn" :class="ruleFlag?'stepBtn-primary':'stepBtn-disable'" @click="resetCardID">重新获取</div>
			<div class="stepBtn" :class="ruleFlag?'stepBtn-primary':'stepBtn-disable'" @click="nextStep">确定</div>
		</div>
	</div>
</template>

<script>
	import numberKeybord from '@/components/number_keybord.vue';
	import {mapState,mapMutations} from 'vuex';
	export default {
		components: {
			numberKeybord,
		},
		data() {
			var validateCardID = (rule,value,callback)=>{
				if (value === ''){
					return callback(new Error('银行卡不能为空'));
				}
				if (!/^(\d{16}|\d{19})$/.test(value)){
					return callback(new Error('银行卡为16或19位的数字'));
				}
				callback();
			};
			return {
				form: {
					cardID: '',
				},
				rules: {
					cardID: [
						{validator:validateCardID,trigger: 'change'}
					]
				},
				ruleFlag: false,
			};
		},
		methods: {
			...mapMutations(['changeNowStep','changeCardID','changeCountDown']),
			handleKeypress(e) {
				if (this.form.cardID.length<19) {
					this.form.cardID += e;
				} else {
					this.$message({
						message: '银行卡不能超过19位',
						type: 'warning',
					});
				}
				this.doReg();
			},
			handleDel() {
				this.form.cardID = this.form.cardID.substr(0,this.form.cardID.length-1);
				this.doReg();
			},
			handleClearup() {
				this.form.cardID = '';
				this.doReg();
			},
			handleInputCardID() {
				if (this.form.cardID.length>19) {
					this.form.cardID = this.form.cardID.substr(0,19);
					this.$message({
						message: '银行卡不能超过19位',
						type: 'warning',
					});
				}
				this.form.cardID = this.form.cardID.replace(/\D/g,'');
				this.doReg();
			},
			doReg() {
				if (/^(\d{16}|\d{19})$/.test(this.form.cardID)){
					this.ruleFlag = true;
				} else {
					this.ruleFlag = false;
				}
			},
			resetCardID() {
				this.form.cardID = '';
				this.doReg();
			},
			nextStep() {
				if (!this.ruleFlag) {
					this.$message({
						message: '请输入正确的银行卡帐号',
						type: 'warning',
					});
				} else {
					this.changeCardID(this.form.cardID);
					this.changeCountDown(120);
					this.changeNowStep(2);
					this.$router.push('/password');
				}
			},
		}
	}
</script>

<style lang="less">
	.plugin_card{
		width: 200px;
		position: relative;
		animation: card 2.5s linear infinite;
	}
	@keyframes card{
		from {
			top: 50px;
			opacity: 0;
		}
		to{
			top: 0px;
			opacity: 1;
		}
	}
</style>
