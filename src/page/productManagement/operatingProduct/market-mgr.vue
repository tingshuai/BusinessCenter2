<template>
	<div class="market-mgr">
		<classified-search :config="classifiedConfig" :selected="selectedItems" @doSelectHandler="doClickHandler" />
		<toolbar class="custom-toolbar">
			<span slot="left">
				<el-radio-group size="small" v-model="queryParam.isAble" @change="doSearch">
					<el-radio-button label="">全部</el-radio-button>
					<el-radio-button label="已启用">只显示启用</el-radio-button>
					<el-radio-button label="已停用">只显示停用</el-radio-button>
				</el-radio-group>
			</span>
			<span slot="right">
				<el-button icon="el-icon-plus" size="small" style="width: 100px;" type="primary" v-show="!editModel" @click="doAdd">新增市场</el-button>
				<el-button icon="el-icon-edit" size="small" style="width: 80px;" :disabled="marketForm==null||marketForm.isAble=='已启用'" v-show="!editModel" @click="editModel = true;">编辑</el-button>
				<el-button icon="el-icon-delete" size="small" style="width: 80px;" :disabled="marketForm==null||marketForm.isAble=='已启用'"
				   v-show="!editModel" @click="doDelete">删除</el-button>
				<el-button icon="el-icon-setting" size="small" style="width: 80px;" :disabled="marketForm==null" v-show="!editModel" @click="doAbleOrDisable(marketForm.isAble==null?'启/停用':marketForm.isAble=='已停用'?'启用':'停用')">
					{{marketForm.isAble==null?'启/停用':marketForm.isAble=='已停用'?'启用':'停用'}}
				</el-button>
				<el-button icon="el-icon-success" size="small" style="width: 80px;" type="primary" v-show="editModel" @click="doSave">保存</el-button>
				<el-button icon="el-icon-back" size="small" style="width: 80px;" type="danger" v-show="editModel" @click="editModel=false;">返回</el-button>
			</span>
		</toolbar>
		<market-form :form="marketForm" ref="marketForm" :edit-model="editModel
" />
	</div>
</template>
<script>
	import {
		marketList,
		saveOrUpdateMarket,
		deletMarket,
		ableOrDisableMarket
	} from "../../api/marketcenter-marketmgr.js"
	import MarketForm from '../../components/market-center/market-mgr/form.vue'
	export default {
		components: {
			MarketForm
		},
		data() {
			return {
				editModel: false,
				queryParam: {
					isAble: ''
				},
				//筛选数据
				classifiedConfig: [{
					title: '市场名称:',
					options: []
				}],
				selectedItems: [{
					value: '',
					expanded: false
				}],
				marketForm: {

				},
				marketClassMap:null
			}
		},
		methods: {
			doAdd() {
				this.marketForm = {
					isAble: "已停用",
					classList:[]
				}
				this.editModel = true;
			},
			doDelete() {
				this.$confirm('您确认删除市场, 是否继续?', '系统提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deletMarket({
						Vue: this,
						params: {
							marketId: this.marketForm.id
						},
					}).then(res => {
						if (res.result) {
							this.doSearch();
						}
					})

				});
			},
			doAbleOrDisable(opName) {
				this.$confirm('您确认' + opName + '市场, 是否继续?', '系统提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					ableOrDisableMarket({
						Vue: this,
						params: {
							marketId: this.marketForm.id
						},
					}).then(res => {
						if (res.result) {
							this.doSearch();
						}
					})

				});
			},
			doSave() {
				if(this.marketForm.alias==null||this.marketForm.alias==''){
					this.$message({
					message: '请输入市场名称...',
					type: 'warning'
					});
					return ;
				}else if(this.marketForm.classList==null||this.marketForm.classList.length==0){
					this.$message({
					message: '请维护市场分类...',
					type: 'warning'
					});
					return ;
				}else{
					saveOrUpdateMarket({
						Vue: this,
						params: this.marketForm,
					}).then(res => {
						if (res.result) {
							this.editModel = false;
							this.doSearch();
						}
					})
				}
			},
			doClickHandler(index, option) {
				this.marketForm = { ...option
				};
				this.marketForm.classList=this.marketClassMap.get(this.marketForm.id);
				delete this.marketForm.label;
				delete this.marketForm.value;
				delete this.marketForm.disabled;
			
			},
			doSearch() {
				this.classifiedConfig[0].options.splice(0, this.classifiedConfig[0].options.length);
				marketList({
					Vue: this,
					params: this.queryParam,
				}).then(res => {
					if (res.result) {
						
						let marketList = res.model.marketList;
						let classList = res.model.classList;
						
						
						if (marketList != null && marketList.length > 0) {
							marketList.forEach(market => {
								market.label = market.alias
								market.value = market.id;
								if (market.isAble == '已停用')
									market.disabled = true
								this.classifiedConfig[0].options.push(market);
							});
							
							this.marketClassMap = new Map();
							classList.forEach(marketClass=>{
								if(this.marketClassMap.has(marketClass.marketId))
									this.marketClassMap.get(marketClass.marketId).push(marketClass);
								else
									this.marketClassMap.set(marketClass.marketId,[marketClass]);
							});
							//默认选中第一个
							this.selectedItems[0].value = this.classifiedConfig[0].options[0].value;
							this.doClickHandler(0, this.classifiedConfig[0].options[0])
						}

					}
				})
			}
		},
		mounted: function () {
			this.doSearch();
		}
	}
</script>
<style lang="less">
	.custom-toolbar {
		margin: 10px 0px;
	}
</style>
