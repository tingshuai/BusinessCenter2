<template>
	<div class="product-template-list">
	<el-row :gutter="10" >
		<el-col :span="6" v-for="template in tableData">
			 <el-card class="product-template">
      <img src="../../../assets/img/hamburger.png" >
      <div style="padding-top: 10px;">
        <span>好吃的汉堡</span>
        <div>
          <time class="time">{{ template.modifyTime }}</time>
          <el-button type="text" class="button">删除</el-button>
        </div>
      </div>
    </el-card>

		</el-col>
		
	</el-row>
	<div class="my-pagination">
		<page-tool @doSearch="doSearch" :pageParam="page"></page-tool>
	</div>
	</div>
</template>
<script>
	export default {
		props: ['config'],
		data(){
			return {
				tableData:[{
					modifyTime:'2018-11-11 12:12:12'
				},{
					modifyTime:'2018-11-11 12:12:12'
				}],
				page:{
					pageNo:1,
					pageSize: 10,
					total: 0
				}
			}
		},
		methods:{
			doSearch(){
				
			}
		}
	}
</script>
<style lang="less">
	.product-template-list{
		.product-template{
			text-align: center;
			img{
				width:300px;
				height: 360px;
				box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
				border-radius: 4px;
			}
		}
	}
</style>
