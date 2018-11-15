<template>
	<div class="product-class">
		<classified-search :config="classifiedConfig" @selected="selectedItem" />
		<detail-msg :data-left="dataLeft" :data-center="dataCenter" :data-right="dataRight"></detail-msg>
	</div>
</template>
<script>
	import {
		productsList,getPublicData
	} from "./api.js";
	import detailMsg from 'components/qfCommon/detail.vue'
	export default {
		components: {
			detailMsg
		},
		data() {
			return {
				classifiedConfig: [{
					title: '市场名称:',
					options: []
				}, {
					title: '市场大类:',
					options: []
				}, {
					title: '产品大类:',
					options: []
				}],
				dataLeft:{},
				dataCenter:{},
				dataRight:""
			}
		},
		methods: {
			getDataList(){
				let that = this;
				productsList({Vue:this}).then(res=>{
					that.dataList = res.list;
					that.initData({isFirst:true,cur:[0,0,0],curRow:0})
					that.$message.success("操作成功！");
				})
			},
			selectedItem(item,curItem,curRow){
				this.initData({
					"isFirst":false,
					"cur":curItem,
					"curRow":curRow
				})
			},
			initData(obj){
				let _lastValue = this.dataList[obj.cur[0]].children[obj.cur[1]].children[obj.cur[2]];
				this.dataLeft = _lastValue;
				switch(obj.curRow){//点击的层级
					case 0:{
						if( obj.isFirst ){//是否是刚进来时。。。。
							this.classifiedConfig[0].options = this.dataList;
							this.classifiedConfig[1].options = this.dataList[0].children;
							this.classifiedConfig[2].options = this.dataList[0].children[0].children;
							this.dataLeft = this.classifiedConfig[2].options[0];//初始化左侧详情数据
						}else{
							this.classifiedConfig[1].options = this.dataList[obj.cur[0]].children;
							this.classifiedConfig[2].options = this.dataList[obj.cur[0]].children[obj.cur[1]].children;
						}
						break;
					};
					case 1:{
						this.classifiedConfig[2].options = this.dataList[obj.cur[0]].children[obj.cur[1]].children;
						break;
					};
					case 2:{
						break;
					}
				}
				this.getPublic( _lastValue.value );
			},
			getPublic(id){
				getPublicData({Vue:this,"id":id}).then(res=>{
					this.dataCenter = res.data;
				})
			}
		},
		mounted() {
			this.getDataList();
		}
	}
</script>
<style lang="less">
	.custom-toolbar {
		margin: 10px 0px;
	}
	section{

	}
</style>
