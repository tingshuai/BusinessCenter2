<template>
	
	<el-card class="model-attr">
	  <h1>
		  公有属性
	  </h1>
	  <div>
		  <el-tag v-for="item in publicAttrs">{{item.alias}}</el-tag>
	  </div>
	  <h1>
			私有属性
	  </h1>
	  <div>
	  	<el-tag type="success" v-for="item in privateAttrs">{{item.alias}}</el-tag>

	  </div>
	</el-card>
</template>
<script>
 import { devModelAttrList } from "api/devcenter-devmodel.js"

	export default {
		props: ['config'],
		data(){
			return {
				publicAttrs:[],
				privateAttrs:[],
				modelId:0
			}
		},
		methods:{
			doSearch(modelId){
				if(modelId==this.modelId)
					return;
				else
					this.modelId = modelId;
				this.publicAttrs.splice(0,this.publicAttrs.length);
				this.privateAttrs.splice(0,this.privateAttrs.length);
				 if(modelId!=null&&modelId>0){
					 devModelAttrList({
						 Vue:this,
						 params:{
							 modelId:modelId
							},
					 }).then(res=>{
					 	if(res.result){
					 		let attrList = res.model;
					 		attrList.forEach(attr=>{
								 if(attr.type=='设备共性')
										this.publicAttrs.push(attr)
									else if(attr.type=='设备特性')
										this.privateAttrs.push(attr)
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
