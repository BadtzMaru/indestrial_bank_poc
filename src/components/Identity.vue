<template>
	<div>
		<!-- 显示区域 -->
		<div class="page-wrapper d-flex">
			<!-- 小箭头 -->
			<div class="page-arrows"></div>
			<!-- 主要区域 -->
			<div class="flex-1">
				<div class="page-title">请插入身份证</div>
				<div class="d-flex a-center j-center pt-3">
					<img src="../assets/img/identity-front.png" class="plugin_card" draggable="false">
				</div>
			</div>
			<div class="flex-1">
				<div class="page-title">或手动输入</div>
				<el-form :model="form" status-icon ref="ruleForm" :rules="rules">
					<el-form-item class="d-flex j-center" prop="identity">
						<el-input @input="handleIptChange" prefix-icon="el-icon-s-custom" v-model="form.identity" style="width: 350px;font-size: 23px;"></el-input>
					</el-form-item>
				</el-form>
				<number-keybord :isIdentity="true" @nk_clearup="handleClearup" @nk_keypress="handleKeypress" @nk_del="handleDel"></number-keybord>
			</div>
		</div>
		<!-- 按钮区域 -->
		<div class="btn-wrapper d-flex j-sb a-center" style="padding-left: 70px;padding-right: 70px;">
			<div class="stepBtn" :class="ruleFlag?'stepBtn-danger':'stepBtn-disable'" @click="resetIdentity">重新输入</div>
			<div class="stepBtn" :class="ruleFlag?'stepBtn-primary':'stepBtn-disable'" @click="nextStep">确定</div>
		</div>
	</div>
</template>

<script>
	import numberKeybord from '@/components/number_keybord.vue';
	import {mapMutations} from 'vuex';
	export default {
		components: {
			numberKeybord,
		},
		data() {
			var validateIdentity = (rule,value,callback)=>{
				if (value === ''){
					return callback(new Error('身份证不能为空'));
				}
				if (!/^\d{17}[\dX]$/.test(value)){
					return callback(new Error('身份证格式不正确'));
				}
				callback();
			};
			return {
				form: {
					identity: '',
				},
				rules: {
					identity: [
						{validator:validateIdentity,trigger: 'change'}
					]
				},
				ruleFlag: false,
			};
		},
		methods: {
			...mapMutations(['changeCountDown','changeIdentity','changeNowStep']),
			handleKeypress(e) {
				if (this.form.identity.length<18) {
					this.form.identity += e;
				} else {
					this.$message({
						message: '身份证不能超过18位',
						type: 'warning',
					});
				}
				this.doReg();
			},
			handleDel() {
				this.form.identity = this.form.identity.substr(0,this.form.identity.length-1);
				this.doReg();
			},
			handleClearup() {
				this.form.identity = '';
				this.doReg();
			},
			handleIptChange() {
				if (this.form.identity.length> 18) this.form.identity = this.form.identity.substr(0,18);
				this.form.identity = this.form.identity.replace(/[^\dXx]/g,'');
				this.form.identity = this.form.identity.replace(/x/g,'X');
				this.doReg();
			},
			doReg() {
				if (/^\d{17}[\dX]$/.test(this.form.identity)) {
					this.ruleFlag = true;
				} else {
					this.ruleFlag = false;
				}
			},
			resetIdentity() {
				this.form.identity = '';
				this.doReg();
			},
			nextStep() {
				this.changeIdentity(this.form.identity);
				this.changeCountDown(120);
				this.changeNowStep(4);
				this.$router.push('/contract');
			},
		},
	};
</script>

<style lang="less">
	.posPassword{
		width: 80%;
	}
</style>
