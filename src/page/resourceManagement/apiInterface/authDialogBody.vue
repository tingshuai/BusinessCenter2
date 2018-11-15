//云应用    ...
<template> 
	<div class="market-mgrs">
		<classified-searchs :config="classifiedConfig" :selected="selectedItems" @doSelectHandler="doClickHandler" />
		<toolbars class="custom-toolbars">
			<span slot="left">
				<el-radio-group size="small" v-model="queryParam.isAble" @change="cloudApplication">
					<el-radio-button label="">全部</el-radio-button>
					<el-radio-button label="T">只显示启用</el-radio-button>
					<el-radio-button label="F">只显示停用</el-radio-button>
				</el-radio-group>
                <span>
                    <el-input size="small" style="width: 150px;" v-model="queryParam.appName" placeholder="应用名称搜索..."></el-input>
                    <el-button size="small" style="width: 80px;" type="primary" @click="cloudApplication">查询</el-button>
                    <el-button size="small" style="width: 100px;" @click="empty()">清空条件</el-button>
                 </span>
			</span>

			<!-- <span slot="right">
				<el-button icon="el-icon-plus" size="small" style="width: 100px;" type="primary" @click="doAdd">新增API</el-button>
				<el-button icon="el-icon-delete" size="small" style="width: 100px;" @click="batchDeleting()">批量删除</el-button>
				<el-button icon="el-icon-setting" size="small" style="width: 100px;" @click="doAbleOrDisable()">批量启停</el-button>
			</span> -->
		</toolbars>

        <!-- <div>
			<el-table height="600" border stripe ref="table" :data="tableData" style="width: 100%" @selection-change="tableSelectChanged"
			    @row-dblclick="remove" @row-click="tableRowClick">
				<el-table-column type="selection" width="55" />
				<el-table-column resizable show-overflow-tooltip property="authType" align="center" label="选择" width="100">
					<template slot-scope="scope">
						<el-tag size="medium" :type="scope.row.authType=='已认证'?'success':scope.row.authType=='待认证'?'warning':scope.row.authType=='认证失败'?'danger':'info'">{{ scope.row.authType }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column resizable show-overflow-tooltip property="apiType" align="center" label="接口分类" width="100" />
				<el-table-column resizable show-overflow-tooltip property="industry" align="center" label="行业领域" width="100" />
				<el-table-column resizable show-overflow-tooltip property="industry" align="center" label="应用专属" width="100" />
				<el-table-column resizable show-overflow-tooltip property="code" align="center" label="接口编码" width="100" />
				<el-table-column resizable show-overflow-tooltip property="version" align="center" label="接口名称" width="100" />
				<el-table-column resizable show-overflow-tooltip property="industry" align="center" label="版本号" width="100" />
				<el-table-column resizable show-overflow-tooltip property="industry" align="center" label="接口地址" width="120" />
				<el-table-column resizable show-overflow-tooltip property="industry" align="center" label="可见设置" width="120" />
				<el-table-column label="操作" align="center" width="300">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
						<el-button size="mini" type="danger" @click="enableDiscontinuation(scope.row)">启用</el-button>
					</template>
				</el-table-column>
				</el-table-column>
			</el-table>
			<div class="my-pagination">
				<page-tool @doSearch="doSearch" :pageParam="page"></page-tool>
			</div>
		</div> -->

		<!-- 表格 -->
         <mytable style="background:#fff" :tableConfig="tableConfig" :tableData="tableData" @doAdd="doAdd" @batchDeleting="batchDeleting" @doAbleOrDisable="doAbleOrDisable" @buttonFunction="buttonFunction"></mytable>
		
		<!-- 弹窗 -->
		<my-toast :config="toastAddData" @doSave="doSave" @close="close">
		    <toast-body ref='toastBodys'></toast-body>
		</my-toast>
	</div>
</template>
<script>
	import {
		marketList, //获取标签
		cloudCompanyList, //获取云应用列表
		newCloudApplication, //新增云应用
		batchDeleting, //批量删除云应用
		BatchStartAndStopCloudApplication, //批量启停云应用
	} from "./api.js"
	import toastBody from './toastBody' //弹窗
	import mytable from "components/zyxCommon/Table.vue" //表格
	export default {
		components: {
			toastBody,
			mytable,//表格
		},
		data() {
			return {
				saveType:'', //类型
				toastAddData: {
					title: "新增应用", //弹窗标题
					dialogVisible: false, //弹窗显示
					width: "600px", //弹窗宽
					btnData: [{
					name: '保存', //按钮名
					method: 'doSave', //回调函数
					bgColor: 'dialog-bule' //按钮背景
					}, {
					name: '取消', //按钮名
					method: 'close' //回调函数
					}]
				},
				queryParam: {
					isAble: '', //启停标识
					appName:'',  //应用名称
					appType: '', //应用分类
					industry: '', //行业领域
					appId:"", //应用专属
				},
				//筛选数据
				classifiedConfig: [{
					title: '接口分类:',
					options: []
				},{
					title: '行业领域:',
					options: []
				},{
					title: '应用专属:',
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
				marketForm: {

                },
				//列表
				selItemArr: [],
                currSelItem: null,
				industryField: null, //行业领域

				isBatch: false,
				queryParam: {
					status:''
				},
				// page: {
				// 	pageNo: 1,
				// 	pageSize: 10,
				// 	total: 0
				// },
				// tableData: [], //表格
				tableConfig:{
					//操作按钮配置
					toolbarConfig: [{
						disabled: false,
						method: "doAdd",
						type:'primary',
						name: "新增应用"
					},{
						disabled: true,
						method: "batchDeleting",
						name: "批量删除"
					},{
						disabled: true,
						method: "doAbleOrDisable",
						name: "批量启停"
					}
					],
					//表格字段配置 
					colConfig: [{
						field: "apiType",
						label: "接口分类",
						type: "text",
					},
						{ 
						field: "industry",
						label: "行业领域",
						type: "text",
					},
					{
						field: "industry",
						label: "应用专属",
						type: "text",
					},
					{
						field: "code",
						label: "接口编码",
						type: "text",
					},
					{
						field: "version", 
						label: "接口名称",
						type: "text",
					},
					{
						field: "industry", 
						label: "版本号",
						type: "text",
					},
					{
						field: "industry", 
						label: "接口地址",
						type: "text",
					},
					{
						field: "industry", 
						label: "可见设置",
						type: "text",
					},
					{
						field: "查看详情",
						label: "操作",
						type: "btnText6",
					}
					],
					isSelection: true, //是否可选
					isPage: true, //是否分页
					currentSelectArr: [], //当前勾选的数据
					align: "center", //文本对齐方式
					pageNum: 1,
					pageSize: 10,
					total: 0,
					isHigh: false,
					isLoading: true, //是否开启loading
					loadShow: false //loading控制
				},
				tableData: []
			
			}
		},
		methods: {
			close() { //取消
				this.toastAddData.dialogVisible = false;
            },
			doAdd() { //新增应用
				this.toastAddData.dialogVisible = true;
				this.saveType = '新增';
			},
			remove(data) {  //删除
                let apiId = [data.id];
				this.$confirm("确定删除?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					batchDeleting({
						Vue: this,
						params: {
							apiId,
						}
					}).then(data => {
					this.$message({
						message: "删除成功！",
						type: "success",
					});
						this.cloudApplication(); //刷新数据
					});
				})
				.catch(() => {
					this.$message({
					type: "info",
					message: "已取消删除"
					});
				});
			},
			batchDeleting() {  //批量删除
				let len = this.tableConfig.currentSelectArr.length - 1;
				let apiId = '';
				//判断删除的size是否等于当前页的数量
				this.tableConfig.currentSelectArr.forEach((item, index) => {    
					apiId = apiId += len === index ? item.id : item.id + ",";
					apiId = apiId.split(',')
				});
				let flag = this.tableData.length === this.tableConfig.currentSelectArr.length;
				this.$confirm("确定删除?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
				}).then(() => {
					batchDeleting({
						Vue: this,
						params: {
							apiId,
						}
					}).then(data => {
						this.$message({
						message: "删除成功！",
						type: "success"
					});
					//回到上一页
					if (flag) {
						 this.tableConfig.pageNo +=
                         this.tableConfig.pageNo - 1 >= 1 ? -1 : 0;
					}
					    this.cloudApplication(); //刷新数据
					});
				})
				.catch(() => {
					this.$message({
					type: "info",
					message: "已取消删除"
					});
				});
			},
			enableDiscontinuation(data){ //启用/停用
			     let apiId = [data.id];
                 BatchStartAndStopCloudApplication({
						Vue: this,
						params: {
							apiId,
						}
					}).then(data => {
					this.$message({
						message: "启用成功！",
						type: "success",
					});
						// this.getDate(this.search.searchData); //刷新数据
						this.cloudApplication();
					});
			},
			doAbleOrDisable() { //批量启用
				let len = this.tableConfig.currentSelectArr.length - 1;
				let apiId = '';
				//判断删除的size是否等于当前页的数量
				this.tableConfig.currentSelectArr.forEach((item, index) => {    
					apiId = apiId += len === index ? item.id : item.id + ",";
					apiId = apiId.split(',')
				});
				let flag = this.tableData.length === this.tableConfig.currentSelectArr.length;
				this.$confirm("确定启用?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
				}).then(() => {
					BatchStartAndStopCloudApplication({
						Vue: this,
						params: {
							apiId,
						}
					}).then(data => {
						this.$message({
						message: "启用成功！",
						type: "success"
					});
					//回到上一页
					if (flag) {
						debugger;
						this.$refs.table.selection.pageNo +=
						this.$refs.table.selection - 1 >= 1 ? -1 : 0;
					}
					    this.cloudApplication(); //刷新数据
					});
				})
				.catch(() => {
					this.$message({
					type: "info",
					message: "已取消启用"
					});
				});
			},
			doSave() { //保存
				if(this.saveType == '新增'){ //保存
					this.$refs['toastBodys'].submitForm(this.eidtOperations.bind(this, true));
				}else if(this.saveType == '编辑'){ //编辑
					this.$refs['toastBodys'].submitForm(this.eidtOperationss.bind(this, true));
				}
			},
			eidtOperations(){
				newCloudApplication({ //保存实际操作
					params: this.$refs['toastBodys'].ruleForm,
					Vue: this
				}).then(data => {
						this.$message({
						message: "保存成功！",
						type: 'success'
					});
				
					this.toastAddData.dialogVisible = false;
				})
			},
			eidtOperationss(){
				newCloudApplication({ //修改实际操作
					params: this.$refs['toastBodys'].ruleForm,
					Vue: this
					}).then(data => {
					this.$message({
						message: "修改成功！",
						type: 'success'
					});
					this.getDate(this.search.searchData);
					this.toastAddData.dialogVisible = false;
					})
            },
			doClickHandler(index, option) { //分页搜索点击事件
				switch(index){//点击的层级
					case 0:{
					    this.classifiedConfig[1].options=  [];
						this.queryParam.appType= option.value;
						let mar = option.children;
						mar.forEach(list =>  {
							list.label = list.key;
							list.value = list.value;		
							this.classifiedConfig[1].options.push(list); //接口分类
						})
						this.cloudApplication(); //云应用列表
						break;
					};
					case 1:{
						this.classifiedConfig[2].options=  [];
						this.queryParam.industry= option.value;
						let mars = option.children;
						mars.forEach(lists =>  {
							lists.label = lists.key;
							lists.value = lists.value;		
							this.classifiedConfig[2].options.push(lists); //行业领域
						})
						this.cloudApplication(); //云应用列表
						break;
					};
					case 2:{					
						this.queryParam.appId= option.value;
						this.cloudApplication(); //云应用列表
						break;
					}
				}
			},
			doSearch() { //获取分页栏标签
				marketList({
					Vue: this,
					params: this.queryParam,
				}).then(res => {
					if (res.code) {
						let marketList = res.list;
						if (marketList != null && marketList.length > 0) {
							marketList.forEach(market => {
								market.label = market.key;
								market.value = market.value;
								this.classifiedConfig[0].options.push(market); //应用分类
							});
							//应用分类默认选中第一个
							this.selectedItems[0].value = this.classifiedConfig[0].options[0].value;
							this.selectedItems[1].value = this.classifiedConfig[0].options[0].value;
							this.selectedItems[2].value = this.classifiedConfig[0].options[0].value;
							this.doClickHandler(0, this.classifiedConfig[0].options[0])
							this.doClickHandler(1, this.classifiedConfig[1].options[0])
							this.doClickHandler(2, this.classifiedConfig[2].options[0])
						}

					}
				})
			},
			tableRowClick(row) { //列表
			    // debugger;
				this.currSelItem = row;
				if (row) {
					this.$refs.table.toggleRowSelection(row);
				} else {
					this.$refs.table.clearSelection();
				}
			},
			tableSelectChanged(selection) {  //表格勾选触发
				// this.batchDeleting(selection)
			},
			buttonFunction(data,type){
				if(type == 'edit'){ //编辑
                      this.edit(data);
				}else if(type =='remove'){  //删除
				      this.remove(data);
				}else if(type == 'enableDiscontinuation'){ //启用
				      this.enableDiscontinuation(data);
				}
			},
			edit(data){  //编辑
				// debugger;
				this.toastAddData.dialogVisible = true;
				this.toastAddData.title = "编辑";
				this.saveType = '编辑';
				setTimeout(() => {
					let {
						alias, //应用分类
					} = data;
					this.$set(this.$refs['toastBodys'],'ruleForm',{
						alias, //应用分类
					});
					//清除校验
					this.$refs['toastBodys'].resetForm();
				}, 0);
			},
			batchAudit(){
				this.isBatch = true;
				this.showAudit();
			},
			showAudit(){
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
				this.approvalData.passActive = true;
				this.approvalData.dialogVisible = true;
			},
			empty(){ //清空条件
				this.queryParam={};
				this.selectedItems[0].value = this.classifiedConfig[0].options[0].value;
				this.selectedItems[1].value = this.classifiedConfig[0].options[0].value;
				this.selectedItems[2].value = this.classifiedConfig[0].options[0].value;
				this.doClickHandler(0, this.classifiedConfig[0].options[0]);
				this.doClickHandler(1, this.classifiedConfig[0].options[0]);
				this.doClickHandler(2, this.classifiedConfig[0].options[0]);
			},
			setAttr(data){ //数据处理
				for(let attr in data){
					if((data[attr]==undefined) || data[attr]=="")delete data[attr];
				}
				return data;
			},
			cloudApplication(page){ //获取云应用列表
				let params = {pageSize:this.tableConfig.pageSize,pageNo:this.tableConfig.pageNum,appName: this.queryParam.appName,isAble:this.queryParam.isAble,appType:this.queryParam.appType,industry:this.queryParam.industry,appId:this.queryParam.appId}
				params=this.setAttr(params);
				cloudCompanyList({Vue:this,params:params}).then(res=>{  
					this.tableData = res.list;
				})
		    },
		},
		mounted: function () {
			this.doSearch(); //分页栏
			this.cloudApplication(); //云应用列表
		},
		watch: { //监听按钮
			'tableConfig.currentSelectArr': function () {
				if (this.tableConfig.currentSelectArr.length === 0) {
					this.tableConfig.toolbarConfig[1].disabled = true
					this.tableConfig.toolbarConfig[2].disabled = true
				} else {
					this.tableConfig.toolbarConfig[1].disabled = false
					this.tableConfig.toolbarConfig[2].disabled = false
				}
			}
		}
	}
</script>
<style lang="less">
	.custom-toolbar {
		margin: 10px 0px;
	}
	 .market-mgrs{
		position: relative;
	}
	.custom-toolbars{
		width:60%;
		// border:1px solid red;
		position: absolute;
        top:155px;
        z-index: 999;
	}
</style>