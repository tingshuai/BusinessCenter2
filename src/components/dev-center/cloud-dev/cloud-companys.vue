<template>
	<div>
		<toolbar>
			<span slot="left">
				<el-input size="small" style="width: 150px;" v-model="queryParam.province" placeholder="省份搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.city" placeholder="市县搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.authType" placeholder="认证类型搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.industry" placeholder="行业领域搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.companyName" placeholder="企业名称搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.companyNature" placeholder="企业性质搜索..."></el-input>
				<el-button icon="el-icon-search" size="small" style="width: 120px;" type="primary" @click="doSearch">查询</el-button>
				<el-button icon="el-icon-close" size="small" style="width: 100px;"  @click="queryParam={}">清空条件</el-button>
			</span>
		</toolbar>
		
		<div>
			<el-table height="600" border stripe ref="table" :data="tableData" style="width: 100%" @row-dblclick="doView" >
				<el-table-column type="#" width="55"/>
				<el-table-column resizable show-overflow-tooltip property ="province" align="center" label="省份" width="120" />
				<el-table-column resizable show-overflow-tooltip property ="city" align="center" label="所在市" width="120" />
				<el-table-column resizable show-overflow-tooltip property ="authType" align="center" label="认证类型" width="100" />
				<el-table-column resizable show-overflow-tooltip property ="industry" align="center" label="行业领域" width="150"/>
				<el-table-column resizable show-overflow-tooltip property ="companyName" align="center" label="企业名称" />
				<el-table-column resizable show-overflow-tooltip property ="companyNature" align="center" label="企业性质" width="120" />
				<el-table-column label="企业设备" align="center">
					<el-table-column resizable show-overflow-tooltip property ="devTypeCount" align="center" label="设备种类" width="120" />
					<el-table-column resizable show-overflow-tooltip property ="devCount" align="center" label="设备数量" width="120" />
				</el-table-column>
				<el-table-column label="设备上云" align="center">
					<el-table-column resizable show-overflow-tooltip property ="cloudDevTypeCount" align="center" label="设备种类" width="120" />
					<el-table-column resizable show-overflow-tooltip property ="cloudDevCount" align="center" label="设备数量" width="120" />
				</el-table-column>
			</el-table>
			<div class="my-pagination">
				<page-tool @doSearch="doSearch" :pageParam="page"></page-tool>
			</div>
		</div>
	</div>
</template>
<script>
import { cloudCompanyList } from "../../../api/devcenter-clouddev.js"

	export default {
		props: ['config'],
		data(){
			return {
				queryParam:{
					province:''
				},
				tableData:[],
				page:{
					pageNo:1,
					pageSize: 10,
					total: 0
				}
			}
		},
		methods:{
			doView(){
				
			},
			doSearch(page){
				let param = {...this.queryParam}
				if(page==null||page.pageNo==null){
					this.page.pageNo =1
				}
				param.pageNo =this.page.pageNo
				param.pageSize =this.page.pageSize	 
				
				cloudCompanyList({
					Vue:this,
					params:param
				}).then(res=>{
				if(res.result){
					this.tableData = res.model;
				}
				})
			}
		}
	}
</script>
<style lang="less">
	
</style>
