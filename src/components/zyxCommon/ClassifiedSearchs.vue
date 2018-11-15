<template>
	<div style="margin: 0px auto;">
		<div class="classified-search">
			<div class="classified" v-for="(item,index_) in config">
				<div class="item-label" style="width:120px;">{{item.title+'('+item.options.length+')'}}</div>
				<div class="item-option" :class="{
											'expanded':selected[index_]!=null&&selected[index_].expanded==true
										}" >
						<!-- <el-tooltip class="item" effect="light"  :content="option.label" placement="top-start"> -->
						<span v-for="(option,subIndex_) in item.options" :class="{
												'selected':selected[index_]!=null&&selected[index_].value==option.value,
												'disabled' :option.disabled&&option.disabled==true
											}" @click="doSelectHandler(index_,option)">
							{{option.label}}
						</span>
		<!-- 			</el-tooltip> -->
				</div>
				<div class="item-operate" @click="selected[index_].expanded=!selected[index_].expanded" >
				收起/展开
				</div>
			</div>

		</div>
		
	</div>
</template>

<script>
	export default {
		props:['config','selected'],
		data() {
			return {
				width: 120
// 				config: [{
// 					title: '经营门店',
// 					options: [{
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '1'
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '2'
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '3',
// 						disabled: true
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '4'
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '5'
// 					}]
// 				}, {
// 					title: '经营门店',
// 					options: [{
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '1'
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '2'
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '3',
// 						disabled: true
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '4'
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '5'
// 					}]
// 				}, {
// 					title: '经营门店',
// 					options: [{
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '1'
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '2'
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '3',
// 						disabled: true
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '4'
// 					}, {
// 						label: '救死扶伤解放路上交电费收费的',
// 						value: '5'
// 					}]
// 				}],
// 				selected: [{
// 					value : '3',
// 					expanded:false
// 				},{
// 					value : '3',
// 					expanded:false
// 				},{
// 					value : '1',
// 					expanded:false
// 				}]
			};
		},
		methods: {
			doSelectHandler(index_,option){
				this.selected[index_].value =option.value;
				this.$emit('doSelectHandler',index_,option);
			},
			expanedClickHandler(index_){
				this.selected[index_].expanded=!this.selected[index_].expanded
			}
			
		},

		watch: {}
	};
</script>


<style lang="less">
	.classified-search {
		background: #fff;
		border-radius: 4px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		.classified:not(:first-child) {
			border-top: none;
		}
		.classified {
			min-height: 30px;
			line-height: 40px;
			display: flex;
			flex-flow: row wrap-reverse;
			border: 1px solid #E8E8E8;
			.item-label {
				font-size: 14px;
				font-family: PingFang-SC-Medium;
				color: #333333;
				font-weight: 700;
				padding-left: 20px;
				border-right: 1px solid #E8E8E8;
			}
			.item-option {
				line-height: 30px;
				    height: 34px;
				overflow: hidden;
				flex: 1;
				&.expanded{
					height: auto;
					overflow: none;
				}
				
				>span {
					margin: 0px 5px;
					font-size: 14px;
					width: 120px;
					height: 26px;
					line-height: 26px;
					text-align: center;
					display: inline-block;
					border-radius: 4px;
					color: #2A93FF;
					border: 1px solid #2A93FF;
					overflow: hidden;
					background-color: #FFF;
					text-overflow: ellipsis;
					cursor: pointer;
					&.selected {
						color: #FFF;
						background-color: #2A93FF;
					}
					&.disabled {
						color: #909399;
						border: 1px solid #909399;
					}
					&.selected.disabled {
						color: #FFF;
						background-color: #909399;
						border: none;
					}
				}
			}
			.item-operate {
				width: 120px;
				min-height: 40px;
				font-size: 12px;
				text-align: center;
				background-color: #F7F7F7;
			}
		}
	}
</style>
