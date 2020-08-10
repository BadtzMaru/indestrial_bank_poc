<template>
	<div>
		<!-- 显示区域 -->
		<div class="page-wrapper d-flex">
			<!-- 小箭头 -->
			<div class="page-arrows"></div>
			<!-- 主要区域 -->
			<div class="flex-1 smsForm-wrapper d-flex flex-column a-center">
				<!-- 提示信息 -->
				<div class="result-msg">您的短信口令已开通成功!</div>
				<el-form ref="smsForm" label-width="120px">
					<el-form-item label="客户姓名: " prop="name">
						<span class="ml-3">{{smsForm.name}}</span>
					</el-form-item>
					<el-form-item label="借记卡号: " prop="cardID">
						<span class="ml-3">{{smsForm.cardID}}</span>
					</el-form-item>
					<el-form-item label="手机号: " prop="phone">
						<span class="ml-3">{{smsForm.phone}}</span>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<!-- 按钮区域 -->
		<div class="btn-wrapper d-flex j-sb a-center" style="padding-left: 70px;padding-right: 70px;">
			<div class="stepBtn stepBtn-danger">打印客户凭条</div>
			<div class="stepBtn stepBtn-primary">不打印</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				smsForm: {
					name: '张三',
					cardID: '6225487522215484326',
					phone: '159****0339',
				},
			};
		},
		methods: {
			
		},
	};
</script>

<style lang="less">
	.smsForm-wrapper{
		.el-form-item__label,.el-form-item__content{
			font-size: 22px!important;
		}
	}
	.result-msg{
		font-size: 30px;
		letter-spacing: 1px;
		margin-top: 60px;
		margin-bottom: 60px;
	}
</style>
