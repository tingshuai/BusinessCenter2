<template>
<div class="qwFormTable">
    <!-- table head -->
<el-row class="row">
    <el-col :span="Math.floor(24/config.colConfig.length)" v-for="(item,i) in config.colConfig" :key="i">
        <span class="qw_thead">{{item.label}}</span>
    </el-col>
</el-row>    
    <!-- table_body -->
<el-row class="row">
    <el-form label-width="0">
            
    </el-form>
</el-row>
</div>    
</template>
<script>
let vueObj = {
    data(){
        return {
            config:{
                colConfig:[
                    {
                        label:"表组件1",
                        key:"col1",
                        type:"label"
                    },                    
                    {
                        label:"表组件1",
                        key:"col2",
                        type:"select",
                        dropDown:{
                            action:"/test/test",
                            method:"post",
                            items:[
                                {label:"test1",value:"test1"},
                                {label:"test2",value:"test2"},
                            ]
                        }
                    },                    
                    {
                        label:"表组件1",
                        key:"col3",
                        type:"input"
                    },
                ],
                teableData:[
                    {
                        col1:"col1",
                        col2:"col2",
                        col3:"col3",
                    }
                ]
            }
        }
    }
}
export default vueObj;
</script>
<style lang="less">
.qwFormTable{
    width: 100%;
    box-sizing: border-box;
    .row{
        border:1px solid #DDD;
        line-height: 32px;
    }
    .el-col + .el-col{
        border-left: 1px solid #DDD;
        text-align: center;
    }
    .row + .row{
        border-top: none;
        min-height: 32px;
    }
}
</style>

