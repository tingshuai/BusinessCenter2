<template>
	<div class="product-publish">
		<classified-search :config="classifiedConfig" :selected="selectedItems" @doSelectHandler="doClickHandler" />
		<toolbar class="custom-toolbar">
			<span slot="left">
				<el-radio-group size="small" v-model="queryParam.isAble">
					<el-radio-button label="">全部</el-radio-button>
					<el-radio-button label="已启用">只显示上架</el-radio-button>
					<el-radio-button label="已停用">只显示下架</el-radio-button>
				</el-radio-group>
			</span>
			<span slot="right">
				<el-button size="small" style="width: 100px;" type="primary">下架通知</el-button>
			</span>
		</toolbar>
		<publish-list :config="modelForm" />
	</div>
</template>
<script>
	import PublishList from '../../components/market-center/product-publish/list.vue'
	export default {
		components: {
			PublishList
		},
		data(){
			return {
				queryParam:{
					isAble:''
				},
				//筛选数据
				classifiedConfig: [{
					title: '市场名称:',
					options: []
				},{
					title: '市场大类:',
					options: []
				},{
					title: '产品大类:',
					options: []
				}],
				selectedItems: [{
					value: '',
					expanded: false
				},{
					value: '',
					expanded: false
				},{
					value: '',
					expanded: false
				}],
				modelForm:{
					
				}
			}
		},
		methods:{
			doClickHandler(index, option){
				
			}
		}
	}
</script>
<style lang="less">
		.custom-toolbar{
			margin: 10px 0px;
		}
</style>
