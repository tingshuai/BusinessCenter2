<template> 
<div class="authQuery">
    <!-- 搜索 -->
    <div class="search">   
        <el-form  :inline="true" v-model="formSearch" label-width="80px">
            <el-form-item v-for="(item, i) in formSearchConfig" :key="i" :label="item.label" :prop="item.key" :style="item.formItemStyle? item.formItemStyle : ''">
                <el-input v-if="item.type=='input'" v-model="formSearch[item.key]" size="mini" :placeholder="item.placeholder?item.placeholder:'请输入'+item.label"></el-input>
                <el-select v-if="item.type=='select'" :filterable="item.filterable" @focus="formItemFocus(item,i)" @change="formItemChange(item,i)" v-model="formSearch[item.key]" size="mini" :placeholder="item.placeholder?item.placeholder:'请选择'+item.label">
                    <el-option v-for="(lbl,j) in item.dropDown" :label="lbl.label" :key="j" :value="lbl.value"></el-option>
                </el-select>
            </el-form-item>
            <div class="el-form-item" style="padding-top:3px;">
                <el-button type="primary" size="mini" @click="getOrgPersonPermission">查询</el-button>       
                <el-button size="mini" @click="empty">清空</el-button> 
            </div>      
        </el-form>
    </div>
    <!-- 表格 -->
    <mytable style="margin-top:-20px;" :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add" @remove="remove"></mytable>
</div>
</template>
<script>
import {
    queryFileList, //查询文件列表
    batchUpload, //批量上传
    batchDeleting, //批量删除
} from './api.js';
import mytable from "components/zyxCommon/Table.vue" 
export default {
    components:{
        mytable
    },
    data(){
        return {
            formSearch:{
                filePath:"",  //文件后缀搜索
                fileName:"", //文件名搜索
            },
            formSearchConfig:[
                {
                    span:6,
                    type: "input",
                    placeholder:"文件后缀搜索...",
                    itemStyle:"width:150px",
                    key:"filePath",
                    dropDown:[

                    ]
                },
                {
                    span:6,
                    type: "input",
                    filterable: true,
                    placeholder:"文件名搜索...",
                    itemStyle:"width:150px",
                    key:"fileName",
                    dropDown:[

                    ]
                }
            ],
            tableConfig:{
                //操作按钮配置
                toolbarConfig: [{
                    disabled: false,
                    method: "add",
                    type:'primary',
                    name: "批量上传"
                },{
                    disabled: true,
                    method: "remove",
                    name: "批量删除"
                }
                ],
                //表格字段配置 
                colConfig: [{
                    field: "fileName",
                    label: "文件名称",
                    type: "text",
                },
                    { 
                    field: "filePath",
                    label: "文件后缀",
                    type: "text",
                },
                {
                    field: "modifyTime",
                    label: "上传时间",
                    type: "text",
                },
                {
                    field: "fileType",
                    label: "上传人",
                    type: "text",
                },
                {
                    field: "fileSize",
                    label: "文件大小(KB)",
                    type: "text",
                },
                {
                    field: "查看详情",
                    label: "操作",
                    type: "btnText",
                }
                ],
                isSelection: true, //是否可选
                isPage: true, //是否分页
                currentSelectArr: [], //当前勾选的数据
                align: "center", //文本对齐方式
                pageNum: 1,
                pageSize: 10,
                total: 0,
                isHigh: false,
                isLoading: true, //是否开启loading
                loadShow: false //loading控制
            },
            tableData: []

        }
    },
    mounted(){
        this.init();
    },
    methods:{
        empty(){
            this.formSearch ={};
        },
        add(){ //批量上传
            let len = this.tableConfig.currentSelectArr.length - 1;
            let fileId = "";
            //判断删除的size是否等于当前页的数量
            this.tableConfig.currentSelectArr.forEach((item, index) => {    
            fileId += len === index ? item.id : item.id + ",";
            fileId = fileId.split(',')
            });
            let flag = this.tableData.length === this.tableConfig.currentSelectArr.length;
            this.$confirm("确定上传?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
            })
            .then(() => {
                batchUpload({
                Vue: this,
                params: {
                    fileId,
                }
                }).then(data => {
                this.$message({
                    message: "上传成功！",
                    type: "success"
                });
                //回到上一页
                if (flag) {
                    this.tableConfig.pageNo +=
                    this.tableConfig.pageNo - 1 >= 1 ? -1 : 0;
                }
                this.getDate(this.search.searchData); //刷新数据
                });
            })
            .catch(() => {
                this.$message({
                type: "info",
                message: "已取消上传"
                });
            });
        },
        remove(){ //批量删除
            // debugger;
            let len = this.tableConfig.currentSelectArr.length - 1;
            let fileId = "";
            //判断删除的size是否等于当前页的数量
            this.tableConfig.currentSelectArr.forEach((item, index) => {    
            fileId += len === index ? item.id : item.id + ",";
            fileId = fileId.split(',')
            });
            let flag =
            this.tableData.length === this.tableConfig.currentSelectArr.length;
            this.$confirm("确定删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
            })
            .then(() => {
                batchDeleting({
                Vue: this,
                params: {
                    fileId,
                }
                }).then(data => {
                this.$message({
                    message: "删除成功！",
                    type: "success"
                });
                //回到上一页
                if (flag) {
                    this.tableConfig.pageNo +=
                    this.tableConfig.pageNo - 1 >= 1 ? -1 : 0;
                }
                this.getDate(this.search.searchData); //刷新数据
                });
            })
            .catch(() => {
                this.$message({
                type: "info",
                message: "已取消删除"
                });
            });
        },
        init(){ 
            this.getOrgPersonPermission();
        },
        setAttr(data){
            for(let attr in data){
                if((data[attr]==undefined) || data[attr]=="")delete data[attr];
            }
            return data;
        },
        getOrgPersonPermission(){ //查询文件列表
            let params = {pageSize:this.tableConfig.pageSize,pageNo:this.tableConfig.pageNum,filePath: this.formSearch.filePath, fileName: this.formSearch.fileName}
            params=this.setAttr(params);
            queryFileList({Vue:this,params:params}).then(res=>{ 
                this.tableData = res.list;
            })
        },
        pageChange(){
            this.getOrgPersonPermission();
        },
        sizeChange(){
            this.getOrgPersonPermission();
        },
    },
    watch: { //监听按钮
        'tableConfig.currentSelectArr': function () {
            if (this.tableConfig.currentSelectArr.length === 0) {
                this.tableConfig.toolbarConfig[0].disabled = true
                this.tableConfig.toolbarConfig[1].disabled = true
            } else {
                this.tableConfig.toolbarConfig[0].disabled = false
                this.tableConfig.toolbarConfig[1].disabled = false
            }
        }
    }
}
</script>
<style lang="less">
.authQuery{
    position: relative;
    box-sizing: border-box;
    padding-top: 24px;
    .el-input__inner{
        border-radius: 0;
    }
    .search{
        position: absolute;
        top:10px;
        z-index: 999;
    }
    .el-button{
        width: 88px;
        border-radius: 0;
    }
}
</style>