<template>
	<el-row :gutter="10" class="model-info">
		<el-col :span="11">
			<el-card>
				<h1>模型概述</h1>
				<el-form ref="form" class="rbox-form" size="small" :model="form" label-width="130px">
					<el-form-item label="行业领域:">
						<el-input disabled v-model="form.industry"></el-input>
					</el-form-item>
					<el-form-item label="设备大类:" >
						<el-input disabled v-model="form.devClass"></el-input>
					</el-form-item>
					<el-form-item label="品牌及制造商:" >
						<el-input disabled v-model="form.brand"></el-input>
					</el-form-item>
					<el-form-item label="设备型号:" >
						<el-input disabled v-model="form.spec"></el-input>
					</el-form-item>
					<el-form-item label="出厂年月:" >
						<el-input disabled v-model="form.productDate"></el-input>
					</el-form-item>
					<el-form-item label="处理器品牌">
						<el-input disabled v-model="form.plcBrand"></el-input>
					</el-form-item>
					<el-form-item label="处理器型号" >
						<el-input disabled v-model="form.plcSpec"></el-input>
					</el-form-item>
					<el-form-item label="报文解析">
							<el-input disabled v-model="form.parseRule"></el-input>
					</el-form-item>
					<el-form-item label="启停标识:">
						<el-tag type="success" v-show="form.isAble=='已启用'">{{form.isAble}}</el-tag>
						<el-tag type="danger" v-show="form.isAble=='已停用'">{{form.isAble}}</el-tag>
					</el-form-item>
					<el-form-item label="启停时间:">
						<el-date-picker disabled v-model="form.ableTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
				</el-form>
			</el-card>

		</el-col>
		<el-col :span="13">
			<el-card>
				<h1>设备照片</h1>
			  <img src="" />
				
			</el-card>
		</el-col>
	</el-row>
</template>
<script>
	export default {
		props: ['form']
	}
</script>
<style lang="less">
	.model-info{
		h1{
			line-height: 40px;
		}
		.el-form-item--small.el-form-item {
			margin-bottom: 10px;
		}
	}
</style>
