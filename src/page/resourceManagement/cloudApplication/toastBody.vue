//新增应用
<template>
  <div class="gm-toast-bodys">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- 1.0.1 -->
        <el-row>
            <el-col :span="8">
                <el-form-item label="应用类型：" prop="alias">
                   <el-input type="text" v-model="ruleForm.alias" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="行业领域：" prop="authUrl">
                  <el-input type="text" v-model="ruleForm.authUrl" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="版本号：" prop="spaceSize">
                   <el-input type="text" v-model="ruleForm.spaceSize" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.2 -->
        <el-row>
            <el-col :span="8">
                <el-form-item label="应用编码：" prop="releaseUrl">
                  <el-input type="text" v-model="ruleForm.releaseUrl" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="应用名称：" prop="version">
                   <el-input type="text" v-model="ruleForm.version" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="服务商：" prop="type">
                   <el-input type="text" v-model="ruleForm.type" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.3 -->
        <el-row>
            <el-col :span="4">
                <el-form-item prop="unitTypde">
                    <el-checkbox v-model="checked">是否需要云存储</el-checkbox>
                </el-form-item>
            </el-col>
             <el-col :span="12">
                <el-form-item prop="unitTyped">
                    <el-checkbox v-model="checkedz">是否需要短信收发</el-checkbox>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.4 -->
        <el-row>
            <el-col :span="10">
                <el-form-item label="应用地址：" prop="industry">
                    <el-input type="text" v-model="ruleForm.industry" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="10">
                <el-form-item label="授权地址：" prop="industry">
                    <el-input type="text" v-model="ruleForm.industry" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.5 -->
        <el-row>
            <el-col :span="10">
                <el-form-item label="应用图标：" prop="industry">
                   <el-input type="text" v-model="ruleForm.industry" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
            </el-col>
        </el-row>
        <!-- 1.0.6 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="应用说明：" prop="remark">
               <el-input
                maxlength="200"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                placeholder="请输入内容"
                v-model="ruleForm.remark">
               </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 1.0.7 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用菜单：" prop="sysDictId">  
              <!-- <el-select placeholder="请选择" v-model="ruleForm.sysDictId">
                <el-option>
                </el-option>
              </el-select> -->
          </el-form-item>
          </el-col>
        </el-row>
    </el-form>
  </div>
</template>
<script>
  import {
   
  } from "./api.js";
  export default {
    props:['toastData'],
    data() {
      return {
        checked: true, //是否勾选
        checkedz: true, //是否勾选
        ruleForm: {
           orderNum:'',
           remark:'',//请输入内容
           sysDictId:'',//应用菜单
        },
        rules: { //校验
          alias: [{ required: true, message: '应用类型', trigger: ['blur','change'] }], //产品型号
        },
      };
    },
    mounted(){
       
    },
    methods: {
      submitForm(fun) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (fun) {
              fun();
            }
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    }
  }
</script>
<style lang="less">
  .gm-toast-bodys {
    margin-top:20px;
    width:90%;
    margin-left:50px;
    .el-form-item__content {
      color: #333;
      font-size: 14px;
    }
    .el-form-item__label {
      color: #666666;
      font-size: 14px;
    }
    .utb-btn{
      border-bottom:1px dashed #eee;
      height:50px;
      width:123%;
      margin-left:14px;
      padding-left: 85px;
      margin-bottom: 20px;
    }
    .el-button--mini, .el-button--small {
      width: 110px;
    }
  }
</style>