<template>
	<div>
		<section class="wrap" v-for="(item,index) in config">
			<aside class="title">{{ item.title }}</aside>
			<aside class="terms"><span v-for="(it,i) in item.options" class="text" v-bind:class="[ curIndex[index] == i ? 'act' : '' ]" @click="triggerEvent(it,index,i)">{{ it.key || '' }}</span></aside>
		</section>
	</div>
</template>

<script>
	export default {
		props:{
			config:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				width: 120,
				curIndex:[0,0,0,0]
			};
		},
		methods: {
			triggerEvent(data,index,i){
				this.curIndex.splice(index,1,i);
				this.$emit("selected",data,this.curIndex,index);
				return;
			}
		},
		computed:{
			
		},
		mounted(){
		
		},
		watch: {}
	};
</script>


<style lang="less">
	.wrap{
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: stretch;
		.title{
			width: 100px;
			font-size: 16px;
			margin: 10px 0;
		}
		.terms{
			display: flex;
			flex-wrap: wrap;
			.text{
				font-size: 12px;
				border: 1px solid #a7a7a7;
				padding: 4px 10px;
				margin: 5px 10px;
				line-height: 20px;
				&:hover{
					cursor: pointer;
				}
			}
		}
	}
.act{
	border:1px solid #409eff!important;
	color: #409eff!important;
}
</style>
