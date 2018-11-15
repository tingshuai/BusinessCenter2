<template>
	<div class="model-filter">
		<el-table height="600" border stripe ref="table" :data="tableData" style="width: 100%"  >
			<el-table-column type="#" width="55"/>
			<el-table-column resizable show-overflow-tooltip property ="paramName" align="center" label="参数名" width="120" />
			<el-table-column resizable show-overflow-tooltip property ="dateType" align="center" label="数据类型" width="120" />
			<el-table-column resizable show-overflow-tooltip property ="dataPrecision" align="center" label="数据精度" width="120" />
			<el-table-column resizable show-overflow-tooltip property ="startCode" align="center" label="起始标识" width="120" />
			<el-table-column resizable show-overflow-tooltip property ="byteLen" align="center" label="字节长度" width="120" />
			<el-table-column resizable show-overflow-tooltip property ="parseRule" align="center" label="解析规则"  />	
			<el-table-column resizable show-overflow-tooltip property ="computeRule" align="center" label="计算规则"  />	
			<el-table-column resizable show-overflow-tooltip property ="translateRule" align="center" label="转义选项"  />	
		</el-table>
	</div>
</template>
<script>
	import { devModelResolutionList } from "api/devcenter-devmodel.js"
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
					 devModelResolutionList({
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
