<template>
	<div>
		<!-- 显示区域 -->
		<div class="page-wrapper d-flex">
			<!-- 小箭头 -->
			<div class="page-arrows"></div>
			<!-- 主要区域 -->
			<div class="flex-1 smsForm-wrapper d-flex flex-column a-center" style="padding-top: 100px;">
				<el-form ref="smsForm" label-width="120px">
					<el-form-item label="客户姓名: " prop="name">
						<span class="ml-3">{{name}}</span>
					</el-form-item>
					<el-form-item label="借记卡号: " prop="cardID">
						<span class="ml-3">{{cardID}}</span>
					</el-form-item>
					<el-form-item label="手机号: " prop="phone">
						<span class="ml-3">{{phone|phoneAnonymity}}</span>
					</el-form-item>
				</el-form>
				<!-- 提示信息 -->
				<div class="confirm-msg">请务必保留本人手机号码,谨防被骗,造成损失</div>
			</div>
		</div>
		<!-- 按钮区域 -->
		<div class="btn-wrapper d-flex j-sb a-center" style="padding-left: 70px;padding-right: 70px;">
			<div class="stepBtn stepBtn-danger" @click="resetStep">取消</div>
			<div class="stepBtn stepBtn-primary" @click="nextStep">下一步</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(['cardID','phone','name']),
		},
		filters: {
			phoneAnonymity(val) {
				return val.substr(0,3)+'****'+val.substr(7);
			},
		},
		methods: {
			...mapMutations(['changeCountDown','changeNowStep']),
			resetStep() {
				this.$confirm('您确定要取消吗?').then(()=>{
					this.changeCountDown(-1);
					this.changeNowStep(1);
					this.$router.push('/plugin');
				}).catch(()=>{});
			},
			nextStep() {
				this.changeCountDown(120);
				this.changeNowStep(7);
				this.$router.push('/camera');
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
	.confirm-msg{
		color: rgb(255,28,32);
		font-size: 24px;
		margin-top: 30px;
	}
</style>
