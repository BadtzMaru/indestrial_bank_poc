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
						<span class="ml-3">{{smsForm.name}}</span>
					</el-form-item>
					<el-form-item label="借记卡号: " prop="cardID">
						<span class="ml-3">{{smsForm.cardID}}</span>
					</el-form-item>
					<el-form-item label="手机号: " prop="phone">
						<span class="ml-3">{{smsForm.phone}}</span>
					</el-form-item>
					<el-form-item label="认证码: " prop="code">
						<el-input class="ml-3" style="width: 280px;" v-model="smsForm.code"></el-input>
						<el-button class="ml-5" type="primary">获取短信认证码</el-button>
					</el-form-item>
					<el-form-item label="推广人 " prop="code">
						<el-input class="ml-3" style="width: 280px;" v-model="smsForm.promoter"></el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<!-- 按钮区域 -->
		<div class="btn-wrapper d-flex j-sb a-center" style="padding-left: 70px;padding-right: 70px;">
			<div class="stepBtn stepBtn-danger">不同意</div>
			<div class="stepBtn stepBtn-primary">同意</div>
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
					code: '',
					promoter: '',
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
</style>
