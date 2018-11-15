<template>
<div class="qw_root bg404"  :style="'height:' + (sidebarHeight-40) +'px;padding-top:100px;' ">
	<img src="../../assets/img/404.jpg">
</div>	
</template>
<script>
import {mapMutations,mapGetters,mapState} from 'vuex';
let vueObj={
	data(){
		return {
			
		}
	},
	computed:{
		...mapState({
			sidebarHeight: state => state.app.sidebarHeight
		})
	}
}
export default vueObj;
</script>
<style lang="less">
.qw_root{
	width: 100%;
	box-sizing:border-box;
}	
.bg404{
	background:rgb(244,244,244);
	img{
		display:block;
		width:600px;
		height:auto;
		margin:0 auto;
	}
}
</style>