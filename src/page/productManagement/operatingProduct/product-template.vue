<template>
	<div class="product-class">
		<classified-search :config="classifiedConfig" :selected="selectedItems" @doSelectHandler="doClickHandler" />
		<toolbar class="custom-toolbar">
			<span slot="left">
				<el-radio-group size="small" v-model="queryParam.isAble">
					<el-radio-button label="">全部</el-radio-button>
					<el-radio-button label="已启用">只显示启用</el-radio-button>
					<el-radio-button label="已停用">只显示停用</el-radio-button>
				</el-radio-group>
			</span>
			<span slot="right">
				<el-button size="small" style="width: 100px;" type="primary">上传模板</el-button>
				<el-button size="small" style="width: 80px;">删除</el-button>
				<el-button size="small" style="width: 80px;">启/停用</el-button>
			</span>
		</toolbar>
		<template-list :config="modelForm" />
	</div>
</template>
<script>
	import TemplateList from '../../components/market-center/product-template/list.vue'
	export default {
		components: {
			TemplateList
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
