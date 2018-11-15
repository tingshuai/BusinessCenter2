<template>
	<div>
		<toolbar>
			<span slot="left">
				<el-input size="small" style="width: 150px;" v-model="queryParam.companyName" placeholder="企业名称搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.devClass" placeholder="设备大类搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.brand" placeholder="设备品牌类型搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.spec" placeholder="设备型号搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.plcBrand" placeholder="处理器品牌搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.plcSpec" placeholder="处理器型号搜索..."></el-input>
				<el-input size="small" style="width: 150px;" v-model="queryParam.commCode" placeholder="机联网编码搜索..."></el-input>

				<el-button icon="el-icon-search" size="small" style="width: 100px;" type="primary" @click="doSearch">查询</el-button>
				<el-button icon="el-icon-close" size="small" style="width: 100px;" @click="queryParam={}">清空条件</el-button>
			</span>
		</toolbar>
		
		<div>
			<el-table height="600" border stripe ref="table" :data="tableData" style="width: 100%"  >
				<el-table-column type="#" width="55"/>
				<el-table-column resizable show-overflow-tooltip property ="companyName" align="center" label="企业名称"  />
				<el-table-column label="设备概况" align="center">
					<el-table-column resizable show-overflow-tooltip property ="devClass" align="center" label="设备大类" width="120" />
					<el-table-column resizable show-overflow-tooltip property ="brand" align="center" label="品牌及制造商" width="150" />
					<el-table-column resizable show-overflow-tooltip property ="spec" align="center" label="设备型号" width="100"/>
					<el-table-column resizable show-overflow-tooltip property ="productDate" align="center" label="出厂年月" width="100"/>
				</el-table-column>
				<el-table-column label="设备处理器" align="center">
					<el-table-column resizable show-overflow-tooltip property ="plcBrand" align="center" label="品牌" width="120" />
					<el-table-column resizable show-overflow-tooltip property ="plcSpec" align="center" label="型号" width="100" />
				</el-table-column>
				<el-table-column label="设备上云" align="center">
					<el-table-column resizable show-overflow-tooltip property ="cloudDate" align="center" label="上云时间" width="120" />
					<el-table-column resizable show-overflow-tooltip property ="commCode" align="center" label="机联网编码" width="120" />
					<el-table-column resizable show-overflow-tooltip property ="commType" align="center" label="通讯方式" width="120" />
					<el-table-column resizable show-overflow-tooltip property ="longitude" align="center" label="经度" width="120" />
					<el-table-column resizable show-overflow-tooltip property ="latitude" align="center" label="纬度" width="120" />
					<el-table-column resizable show-overflow-tooltip property ="commStatus" align="center" label="通讯状态" width="120" />
					<el-table-column resizable show-overflow-tooltip property ="lastAcquisitTime" align="center" label="上次采集时间" width="150" />
				</el-table-column>
			</el-table>
			<div class="my-pagination">
				<page-tool @doSearch="doSearch" :pageParam="page"></page-tool>
			</div>
		</div>
	</div>
</template>
<script>
	import { cloudDevList } from "../../../api/devcenter-clouddev.js"
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
			doSearch(page){
				let param = {...this.queryParam}
				if(page==null||page.pageNo==null){
					this.page.pageNo =1
				}
				param.pageNo =this.page.pageNo
				param.pageSize =this.page.pageSize	 
				
				cloudDevList({
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
