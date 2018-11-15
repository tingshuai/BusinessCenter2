<template>
	<div class="product-publish-list">
	<el-row :gutter="10" >
		<el-col :span="4" v-for="template in tableData">
			 <el-card class="product">
      <img src="../../../assets/img/hamburger.png" >
      <div style="padding-top: 10px;">
        <span>好吃的汉堡</span>
        <div>
          <time class="time">{{ template.modifyTime }}</time>
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
				},{
					modifyTime:'2018-11-11 12:12:12'
				},{
					modifyTime:'2018-11-11 12:12:12'
				},{
					modifyTime:'2018-11-11 12:12:12'
				},{
					modifyTime:'2018-11-11 12:12:12'
				},{
					modifyTime:'2018-11-11 12:12:12'
				},{
					modifyTime:'2018-11-11 12:12:12'
				},{
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
	.product-publish-list{
		.product{
			text-align: center;
			margin-bottom: 10px;
			img{
				width: 210px;
    height: 260px;
				box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
				border-radius: 1px;
			}
		}
	}
</style>
