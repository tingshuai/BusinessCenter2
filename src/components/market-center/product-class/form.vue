<template>
	<el-row :gutter="10" class="product-class-form">
		<el-col :span="6">
			<el-card>
				<h1>产品概述</h1>
				<el-form ref="form" class="rbox-form" size="small" :rules="rules" :model="form" label-width="100px">
					<el-form-item label="产品大类:" prop="industry">
						<el-input disabled v-model="form.industry"></el-input>
					</el-form-item>
					<el-form-item label="关联资源:" prop="industry">
						<el-input disabled v-model="form.industry"></el-input>
					</el-form-item>
					<el-form-item label="交付方式:" prop="industry">
						<el-input disabled v-model="form.industry"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-date-picker disabled v-model="form.ableTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="更新时间">
							<el-date-picker disabled v-model="form.ableTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
								placeholder="选择日期时间">
							</el-date-picker>
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
		<el-col :span="12">
					<el-card>
						<h1>
								  公有属性
							  </h1>
							  <div>
								  <el-tag type="info" v-for="item in publicAttrs">{{item.label}}</el-tag>
									<el-button size="small" style="width: 100px;" type="primary">点击维护</el-button>
							  </div>
							  <h1>
									产品特性
							  </h1>
							  <div>
							  	<el-tag  v-for="item in privateAttrs">{{item.label}}</el-tag>
									<el-button size="small" style="width: 100px;" type="primary">点击维护</el-button>
						
							  </div>
										<h1>
											规格配置
										</h1>
										<div>
											<el-tag type="success" v-for="item in configAttrs">{{item.label}}</el-tag>
											<el-button size="small" style="width: 100px;" type="primary">点击维护</el-button>
								
										</div>
											
						
					</el-card>
		
				</el-col>
		<el-col :span="6">
			<el-card>
				<h1>详情模板</h1>
			  <img src="../../../assets/img/404.jpg" />
				<div class="bottom clearfix">
				  <el-button type="text" class="button">上传图片</el-button>
					<el-button type="text" class="button">删除图片</el-button>

				</div>
			  </div>
			</el-card>
		</el-col>
	</el-row>
</template>
<script>
	export default {
		props: ['form'],
		data(){
			return {
				rules:{
					code: [{
						required: true,
						message: '请输入编码...',
						trigger: 'change'
					}],
					value: [{
						required: true,
						message: '请输入名称...',
						trigger: 'change'
					}],
					
				},
				publicAttrs:[{
					label:'服务商',
					value:'服务商'
				},{
					label:'产品编码',
					value:'产品编码'
				},{
					label:'产品名称',
					value:'产品名称'
				},{
					label:'产品描述',
					value:'产品描述'
				},{
					label:'产品介绍',
					value:'产品介绍'
				}],
				privateAttrs:[{
					label:'风格',
					value:'风格'
				},{
					label:'材质',
					value:'产品编码'
				},{
					label:'适用季节',
					value:'产品名称'
				}],
				configAttrs:[{
					label:'颜色',
					value:'风格'
				},{
					label:'尺码',
					value:'产品编码'
				},{
					label:'款式',
					value:'产品名称'
				}]
			}
		}
	}
</script>
<style lang="less">
	.product-class-form{
		h1{
			line-height: 40px;
		}
		.el-tag{
			margin-right: 10px;
			margin-bottom: 10px;
			padding: 0 20px;
		}
	}
</style>