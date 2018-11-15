<!--form表单弹出框-->
<template>
  <el-dialog title="收货地址" :visible.sync="config.showDialog">
    <el-form ref="form" :model="formValue" label-width="80px">
      <el-row>
        <template v-for="(item,index) in config.items">
          <el-col :span="item.span || 12" v-for="(item,index) in config.items">
            <el-form-item :label="item.label" v-if="item.type == 'input'">
              <el-input v-model="item.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="item.span || 12" v-if="item.type == 'select'">
            <el-form-item :label="item.label">
              <el-input v-model="item.value"></el-input>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    props:{
      config:{
        type:Object,
        default:{
          items:[]
        }
      }
    },
    components:{
      
    },
    data(){
      return{
        formValue:{}
      }
    },
    mounted(){
      
    },
    methods:{

    }
  }
</script>
<style type="text/css" scoped lang="less">
.toolbar {
  height: 60px;
	background: #FFF;
	box-shadow: 1px 1px 15px #e6e6e6;
  line-height: 60px;
  // .el-button {
  //   background: #e6e6e6;
  //   color: #686868;
  //   border: 0px solid #dcdfe6;
  // }
  .ltool {
     float: left;
    	margin-left: 10px;
  }
  .rtool {
  	float: right;
    span {
      margin-right: 20px;
    }
   
  }
}
</style>


