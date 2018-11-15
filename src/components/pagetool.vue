
<template>
	<div class="pagetool">
		<el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="pageParam.pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="pageParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParam.total">
		</el-pagination>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			pageParam: {
				default:()=>{
					return {
						pageNo: 1,
						pageSize: 10,
						total: 0
					}
				}
			}
		},

		methods: {
			/**显示条数变化 */
			sizeChange(val) {
				this.pageParam.pageSize = val;
				this.doSearch();
			},
			pageChange(val) {
				this.pageParam.pageNo = val;
				this.doSearch();
			},
			doSearch() {
				//按钮事件回调
				this.$emit("doSearch",this.pageParam);
			}
		}
	};
</script>
<style>
	.pagetool{
		text-align: center;
	}
</style>