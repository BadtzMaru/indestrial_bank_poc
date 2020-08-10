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
		overflow: auto;
	}
	button:focus{
		outline: none!important;
	}
	*{
		user-select: none;
	}
	::-webkit-scrollbar-track
	{
		background: rgba(0,0,0,.1);
		border-radius: 0;
	}
	::-webkit-scrollbar
	{
		-webkit-appearance: none;
		width: 10px;
		height: 10px;
	}
	::-webkit-scrollbar-thumb
	{
		cursor: pointer;
		border-radius: 5px;
		background: rgba(0,0,0,.25);
		transition: color .2s ease;
	}
	.page-wrapper{
		background-color: rgb(232,230,232);
		height: 520px;
		position: relative;
		overflow: auto;
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
	.stepBtn-danger{
		background-color: rgb(85,112,138);
		color: #FFFFFF;
		&:hover{
			background-color: rgba(85,112,138,0.7);
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
	.step-msg{
		color: #FFFFFF;
		font-size: 22px;
		letter-spacing: 3px;
	}
	.tool-bar{
		display: flex;
		align-items: center;
		background-color: rgb(255,255,255);
		box-shadow: 0px 10px 10px #ccc;
		height: 40px;
		padding-left: 30px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		&>i{
			font-size: 23px;
			cursor: pointer;
			transition: all .3s;
			margin-right: 15px;
			&:hover{
				color: rgb(65,165,238);
			}
		}
	}
</style>
