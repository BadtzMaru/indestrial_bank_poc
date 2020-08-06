<template>
	<div>
		<!-- 显示区域 -->
		<div class="page-wrapper d-flex">
			<!-- 小箭头 -->
			<div class="page-arrows"></div>
			<!-- 主要区域 -->
			<div class="flex-1">
				<div class="page-title">请插入银行卡</div>
			</div>
			<div class="flex-1">
				<div class="page-title">或手动输入卡号</div>
				<el-form>
					<el-form-item class="d-flex j-center">
						<el-input prefix-icon="el-icon-bank-card" v-model="form.cardID" style="width: 350px;font-size: 23px;" clearable></el-input>
					</el-form-item>
				</el-form>
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
	export default {
		data() {
			return {
				form: {
					cardID: '',
				},
			};
		},
	}
</script>

<style>
	
</style>
