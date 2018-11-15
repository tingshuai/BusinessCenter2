<template>
<div class="qw_logobox">
	<div class="l">
		<img src="../../assets/img/logo_icon.png" alt="logo" class="logo_icon">
	</div>
	<div class="r">
		<h1 class="app_name">数据中心</h1>
		<p class="cp_name">飞戎机器人科技有限公司</p>
	</div>
	<!-- <h1 style="line-height:60px;background:#FFF;color:#06F;padding-left:10px;">QWADMIN</h1> -->
</div>	
</template>
<script>
import {mapState} from 'vuex'
let qwLogo={
	computed:{
		...mapState({

		})
	}
}
export default qwLogo;	
</script>
<style lang="less">
.qw_logobox{
	width:260px;
	height:80px;
	background:rgba(240,242,245,1);
	.l{
		box-sizing: border-box;
		padding: 16px 10px 0 20px; 
		float: left;
		.logo_icon{
			display: inline-block;
			width: 44px;
			height: 44px;
		}

	}
	.r{
		width: 100%;
		height: 80px;
		box-sizing: border-box;
		padding: 0 10px 0 74px;
		.app_name{
			font-size:20px;
			display: block;
			width: 100%;
			box-sizing: border-box;
			line-height: 20px;
			padding: 17px 0 8px;
			font-family:MicrosoftYaHei-Bold;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
		.cp_name{
			font-size: 14px;
			color: #999;
			text-align: left;
			display: block;
			height: 18px;
			line-height: 18px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}	
</style>