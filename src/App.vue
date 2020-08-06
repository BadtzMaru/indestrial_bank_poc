<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="less">
	#app{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: url(assets/img/bg_main.jpg) no-repeat;
		background-size: 100% 100%; 
	}
	button:focus{
		outline: none!important;
	}
	*{
		user-select: none;
	}
	.page-wrapper{
		background-color: rgb(232,230,232);
		height: 520px;
		position: relative;
	}
	.btn-wrapper{
		background-color: rgb(148,154,181);
		height: 100px;
		border-radius: 0 0 15px 15px;
	}
	.stepBtn{
		width: 150px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		font-size: 19px;
		letter-spacing: 2px;
		cursor: pointer;
		transition: all .3s;
	}
	.stepBtn-disable{
		background-color: rgb(239,239,239);
		color: rgb(197,199,199);
		&:hover{
			background-color: rgba(239,239,239,0.7);
		}
	}
	.stepBtn-primary{
		background-color: rgb(82,93,156);
		color: #FFFFFF;
		&:hover{
			background-color: rgba(82,93,156,0.7);
		}
	}
	.page-arrows{
		position: absolute;
		box-sizing: content-box;
		width: 0;
		height: 0;
		border-top: 20px solid transparent;
		border-right: 20px solid rgb(232,230,232);
		border-bottom: 20px solid transparent;
		left: 0;
		top: 30%;
		transform: translateX(-100%);
	}
	.page-title{
		text-align: center;
		color: rgb(32,111,231);
		font-size: 25px;
		padding-top: 20px;
		padding-bottom: 20px;
	}
</style>
