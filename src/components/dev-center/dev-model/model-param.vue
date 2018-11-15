<template>
	
	<el-card class="model-attr">
	  <h1>
		  公有参数
	  </h1>
	  <div>
		  <el-tag v-for="item in publicParams">{{item.alias}}</el-tag>
	  </div>
	  <h1>
			私有参数
	  </h1>
	  <div>
	  	<el-tag type="success" v-for="item in privateParams">{{item.alias}}</el-tag>

	  </div>
	</el-card>
</template>
<script>
	import { devModelParamList } from "api/devcenter-devmodel.js"
	export default {
		props: ['config'],
		data(){
			return {
				publicParams:[],
				privateParams:[]
			}
		},
		methods:{
			doSearch(modelId){
				if(modelId==this.modelId)
					return;
				else
					this.modelId = modelId;
				this.publicParams.splice(0,this.publicParams.length);
				this.privateParams.splice(0,this.privateParams.length);
				 if(modelId!=null&&modelId>0){
					 devModelParamList({
						 Vue:this,
						 params:{
							 modelId:modelId
							},
					 }).then(res=>{
					 	if(res.result){
					 		let attrList = res.model;
					 		attrList.forEach(attr=>{
								 if(attr.type=='公有参数')
										this.publicParams.push(attr)
									else if(attr.type=='私有参数')
										this.privateParams.push(attr)
					 		})
					 	}
					 })
				 }
			}
		}
	}
</script>
<style lang="less">
	.model-attr{
		.el-tag{
			margin-right: 15px;
			padding: 0 20px;
		}
	}
</style>
