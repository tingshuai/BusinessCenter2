<template>
  <el-table
    :data="table.tableData"
    :stripe="table.config.stripe || true"
    :border="table.config.border || true"
    style="width: 100%">
    <el-table-column
      :label="item.label"
      align="center"
      :prop="item.prop" v-for="item in table.tableHead">
    </el-table-column>
    <el-table-column :label="table.config.control.label || '操作'" :width="table.config.control.width">
      <template slot-scope="scope">
          <el-button v-for="item in table.config.btns"
          :size="item.size || 'mini'"
          :type="item.type || 'default'"
          align="center"
          v-if="!item.mode"
          @click="handleEvent( scope.$index, scope.row, item )">{{ item.text }}</el-button>
          <el-switch
            v-for="item in table.config.btns"
            v-if="item.mode == 'switch'"
            v-model="item.value"
            active-text="启"
            inactive-text="停"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    props:{
      "table":{
        type:[Array,Object],
        default:[]
      }
    },
    data() {
      return {
     
      }
    },
    methods:{
      handleEvent(index,row,item){
       return this.$emit(item.eventName,index,row,item)
      }
    },
    mounted(){
     
    }
  }
            // table:{
            //     tableData:[],
            //     tableHead:[
            //         {"label":"单位组ID","prop":"unitGroupId"},
            //         {"label":"单位","prop":"unit"},
            //         {"label":"是否基准单位","prop":"isStandard"},
            //         {"label":"值域精度","prop":"dataPrecision"},
            //         {"label":"换算比","prop":"rate"},
            //         {"label":"换算公式","prop":"rateConfig"},
            //         {"label":"删除标识","prop":"deleted"},
            //         {"label":"企业ID","prop":"companyId"},
            //         {"label":"创建时间","prop":"createTime"},
            //         {"label":"创建人","prop":"createBy"}
            //     ],
            //     tableTitle:"",
            //     config:{//elementUI---table 的属性项目
            //         stripe:true,
            //         control:{
            //             label:"操作",
            //             width:"220"
            //         },
            //         btns:[
            //             {
            //                 type:"default",
            //                 eventName:"editRow",
            //                 text:"编辑",
            //                 size:"",
            //                 mode:""
            //             },
            //             {
            //                 type:"danger",
            //                 eventName:"deleteRow",
            //                 text:"删除",
            //                 size:"",
            //                 mode:""
            //             },
            //             {
            //                 type:"primary",
            //                 mode:"switch",
            //                 eventName:"setEnable",
            //                 text:"启停",
            //                 size:"",
            //                 value:true
            //             }
            //         ]
            //     }
            // }
</script>
