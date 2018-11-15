<template>
	<div class="model-filter">
		<el-table height="600" border stripe ref="table" :data="tableData" style="width: 100%"  >
			<el-table-column type="#" width="55"/>
			<el-table-column resizable show-overflow-tooltip property ="filterKey" align="center" label="关键字"  />
			<el-table-column resizable show-overflow-tooltip property ="modifyTime" align="center" label="更新时间" width="200" />
				
		</el-table>
	</div>
</template>
<script>
	import { devModelFilterList } from "api/devcenter-devmodel.js"
	export default {
		props: ['config'],
		data(){
			return {
				tableData:[]
			}
		},
		methods:{
			doSearch(modelId){
				if(modelId==this.modelId)
					return;
				else
					this.modelId = modelId;
				this.tableData.splice(0,this.tableData.length);
				 if(modelId!=null&&modelId>0){
					 devModelFilterList({
						 Vue:this,
						 params:{
							 modelId:modelId
							},
					 }).then(res=>{
					 	if(res.result){
					 		this.tableData = res.model;
					 	}
					 })
				 }
			}
		}
	}
</script>
<style lang="less">
	.model-filter{
		width: 98%;
		padding: 0 auto;
	}
</style>
