//新增API
<template>
  <div class="gm-toast-bodys">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- 1.0.1 -->
        <el-row>
            <el-col :span="24">
                <el-form-item label="应用类型：" prop="alias">
                   <el-input type="text" v-model="ruleForm.alias" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.2 -->
        <el-row>
            <el-col :span="24">
                <el-form-item label="应用编码：" prop="releaseUrl">
                  <el-input type="text" v-model="ruleForm.releaseUrl" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.3 -->
        <el-row>
            <el-col :span="24">
                <el-form-item label="应用编码：" prop="releaseUrl">
                  <el-input type="text" v-model="ruleForm.releaseUrl" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.4 -->
        <el-row>
            <el-col :span="24">
                <el-form-item label="应用地址：" prop="industry">
                    <el-input type="text" v-model="ruleForm.industry" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.5 -->
        <el-row>
            <el-col :span="24">
                <el-form-item label="应用图标：" prop="industry">
                   <el-input type="text" v-model="ruleForm.industry" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.6 -->
        <el-row>
            <el-col :span="24">
                <el-form-item label="应用编码：" prop="releaseUrl">
                  <el-input type="text" v-model="ruleForm.releaseUrl" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.7 -->
        <el-row>
            <el-col :span="24">
                <el-form-item label="应用编码：" prop="releaseUrl">
                  <el-input type="text" v-model="ruleForm.releaseUrl" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.8 -->
        <el-row>
            <el-col :span="24">
                <el-form-item label="应用编码：" prop="releaseUrl">
                  <el-input type="text" v-model="ruleForm.releaseUrl" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.0.9 -->
        <el-row>
            <el-col :span="24">
                <el-form-item label="应用编码：" prop="releaseUrl">
                  <el-input type="text" v-model="ruleForm.releaseUrl" maxlength="8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 1.10 -->
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
    width:75%;
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