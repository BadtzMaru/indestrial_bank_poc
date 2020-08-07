<template>
	<div class="NK_wrapper">
		<div>
			<div @click="$emit('nk_keypress','1')">1</div>
		</div>
		<div>
			<div @click="$emit('nk_keypress','2')">2</div>
		</div>
		<div>
			<div @click="$emit('nk_keypress','3')">3</div>
		</div>
		<div>
			<div @click="$emit('nk_keypress','4')">4</div>
		</div>
		<div>
			<div @click="$emit('nk_keypress','5')">5</div>
		</div>
		<div>
			<div @click="$emit('nk_keypress','6')">6</div>
		</div>
		<div>
			<div @click="$emit('nk_keypress','7')">7</div>
		</div>
		<div>
			<div @click="$emit('nk_keypress','8')">8</div>
		</div>
		<div>
			<div @click="$emit('nk_keypress','9')">9</div>
		</div>
		<div>
			<div @click="judgeIdentity">{{isIdentity?'X':'清空'}}</div>
		</div>
		<div>
			<div @click="$emit('nk_keypress','0')">0</div>
		</div>
		<div>
			<div class="del-btn" @click="$emit('nk_del')">删除</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			isIdentity: {
				type: Boolean,
				default: false,
			}
		},
		methods: {
			judgeIdentity() {
				if (this.isIdentity) {
					this.$emit('nk_keypress','X');
				} else {
					this.$emit('nk_clearup');
				}
			},
		}
	}
</script>

<style lang="less">
	.NK_wrapper{
		display: flex;
		flex-wrap: wrap;
		padding-left: 40px;
		padding-right: 40px;
		&>div{
			width: 33.33%;
			padding-top: 10px;
			padding-bottom: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			&>div{
				background-color: rgb(147,147,149);
				width: 58%;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 62px;
				border-radius: 10px;
				color: #FFFFFF;
				font-size: 20px;
				cursor: pointer;
				transition: all .3s;
				&:hover{
					background-color: rgba(147,147,149,0.7);
				}
			}
		}
	}
	.del-btn{
		background-color: rgb(240,80,80)!important;
		&:hover{
			background-color: rgba(240,80,80,0.7)!important;
		}
	}
</style>
