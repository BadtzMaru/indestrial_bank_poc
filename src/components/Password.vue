<template>
	<div>
		<!-- 显示区域 -->
		<div class="page-wrapper d-flex">
			<!-- 小箭头 -->
			<div class="page-arrows"></div>
			<!-- 主要区域 -->
			<div class="flex-1">
				<div class="page-title"></div>
				<div class="d-flex a-center j-center" style="padding-top: 80px;">
					<img src="../assets/img/pos_password.png" class="posPassword" draggable="false">
				</div>
			</div>
			<div class="flex-1">
				<div class="page-title">请输入密码</div>
				<el-form :model="form" status-icon ref="ruleForm" :rules="rules">
					<el-form-item class="d-flex j-center" prop="password">
						<el-input type="password" @input="handleIptChange" prefix-icon="el-icon-lock" v-model="form.password" style="width: 350px;font-size: 23px;"></el-input>
					</el-form-item>
				</el-form>
				<number-keybord @nk_clearup="handleClearup" @nk_keypress="handleKeypress" @nk_del="handleDel"></number-keybord>
			</div>
		</div>
		<!-- 按钮区域 -->
		<div class="btn-wrapper d-flex j-sb a-center" style="padding-left: 70px;padding-right: 70px;">
			<div class="stepBtn stepBtn-disable">重新获取</div>
			<div class="stepBtn stepBtn-primary">确定</div>
		</div>
	</div>
</template>

<script>
	import numberKeybord from '@/components/number_keybord.vue';
	export default {
		components: {
			numberKeybord,
		},
		data() {
			var validatePassword = (rule,value,callback)=>{
				if (value === ''){
					return callback(new Error('密码不能为空'));
				}
				if (!/^\d{6}$/.test(value)){
					return callback(new Error('密码为6数字'));
				}
				callback();
			};
			return {
				form: {
					password: '',
				},
				rules: {
					password: [
						{validator:validatePassword,trigger: 'change'}
					]
				},
			};
		},
		methods: {
			handleKeypress(e) {
				if (this.form.password.length<6) {
					this.form.password += e;
				} else {
					this.$message({
						message: '密码不能超过6位',
						type: 'warning',
					});
				}
			},
			handleDel() {
				this.form.password = this.form.password.substr(0,this.form.password.length-1);
			},
			handleClearup() {
				this.form.password = '';
			},
			handleIptChange() {
				this.form.password = this.form.password.replace(/\D/g,'');
			}
		},
	};
</script>

<style lang="less">
	.posPassword{
		width: 80%;
	}
</style>
