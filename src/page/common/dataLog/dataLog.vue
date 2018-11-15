<template>
<div class="dataLog" :style="{minHeight:sidebarHeight}">
    <div style="background:#FFF;" :style="{minHeight:sidebarHeight+'px'}">
        <div class="page_search">
            <div class="r">
                <el-button class="searchBtn" size="small" type="primary" @click="doSearch">查询</el-button>
                <el-button class="searchBtn" size="small" @click="resetSearch">重置</el-button>
                <el-button class="searchBtnToggle" size="mini" type="text" @click="toggleSearch"> {{ searchExpended?'收起':'展开'}}<i class="el-icon--right" :class="searchExpended? 'el-icon-arrow-up':'el-icon-arrow-down'"></i></el-button>
            </div>
            <div class="l" :style="{height:(this.searchExpended? '112px':'56px')}">
                <div class="serchFormBox">
                    <dataLogSearch ref="dataLogSearch" @formItemChange="formItemChange"></dataLogSearch>
                </div> 
            </div>
        </div>
        <div class="page_filter">
        <el-button-group>
            <el-button class="searchBtn" v-for="(item,i) in filter.items" :key="i" size="small" @click="changeFilter(i)" :type="filter.activeIndex==i?'primary':''">{{item.label}}</el-button>      
        </el-button-group>  
        <el-button-group style="margin-left:40px;">
            <el-button class="searchBtn" v-for="(item,i) in filter2.items" :key="i" size="small" @click="changeFilter2(i)" :type="filter2.activeIndex==i?'primary':''">{{item.label}}</el-button>
        </el-button-group>
        <el-autocomplete
        v-model="keywords"
        size="small"
        style="width:160px;"
        suffix-icon="el-icon-search"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
        ></el-autocomplete>
        </div>        
        <div class="table_box">
            <mytable :tableConfig="qwTableConfigLog" :tableData="qwTableConfigLogData" @sizeChange="sizeChange" @pageChange="pageChange" :border="false"/>
        </div>
    </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import dataLogSearch from "./dataLogSearch.vue"
import mytable from "../../components/tableEx.vue"
const arrOp = {"ALL":0,"ADD":1,"DEL":2,"EDIT":3}
const objTransOp = {"ALL":"全部","ADD":"添加数据","DEL":"删除数据","EDIT":"更新数据"}
const arrOp2 = {"ALL":0,"PLATFORM":1,"INTERFACE":2}
const objTransOp2 = {"ALL":"全部","PLATFORM":"系统","INTERFACE":"接口"}
import {
    dataLogGrid,
    dataLogOptionLike
} from "../dataAuthMehod/api.js"
export default {
    components:{
        dataLogSearch,
        mytable
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        })
    },
    data(){
        return {
            searchExpended: false,
            /* searchFilter */
            keywords:"",
            filter:{
                activeIndex: 0,
                items:[
                    {
                        label:"全部",
                    },
                    {
                        label:"新增数据",
                    },
                    {
                        label:"删除数据",
                    },
                    {
                        label:"更新数据",
                    },
                    // {
                    //     label:"查询数据",
                    // },
                    // {
                    //     label:"查询权限",
                    // },
                ]
            },
            filter2:{
                activeIndex: 0,
                items:[
                    {
                        label:"全部",
                    },
                    {
                        label:"系统",
                    },
                    {
                        label:"接口",
                    },
            ]},
            qwTableConfigLog:{
                toolbarConfig: [],
                isBorder: false,
                size:'medium',
                isSelection: false, //是否可选
                isPage: true, //是否分页
                currentSelectArr: [], //当前勾选的数据
                align: "center", //文本对齐方式
                pageNo: 1,
                pageSize: 20,
                total: 0,
                isHigh: false,
                isLoading: false, //是否开启loading
                loadShow: false, //loading控制
                colConfig:[
                    {
                        field: "id",
                        label: "序号",
                        type: "text",
                        minWidth:50
                    },                    
                    {
                        field: "createTime",
                        label: "操作时间",
                        type: "text",
                        minWidth:50
                    },                    
                    {
                        field: "operateType",
                        label: "操作类型",
                        type: "text",
                        minWidth:50,
                        transVal(val){
                            return objTransOp[val]
                        }
                    },                    
                    {
                        field: "operateSrc",
                        label: "接入方式",
                        type: "text",
                        minWidth:50,
                        transVal(val){
                            return objTransOp2[val]
                        }
                    },                    
                    {
                        field: "createBy",
                        label: "操作账号",
                        type: "text",
                        minWidth:50
                    },                    
                    {
                        field: "treeNamePath",
                        label: "仓库路径",
                        type: "text",
                        minWidth:50
                    },                    
                    {
                        field: "modelName",
                        label: "数据模型",
                        type: "text",
                        minWidth:50
                    },                    
                    {
                        field: "versionNo",
                        label: "版本号",
                        type: "text",
                        transVal(val){
                            return  'V'+ val+'.0';
                        },
                        minWidth:50
                    }
                ]
            },
            qwTableConfigLogData:[],
            searchTrans:{
                    operateType:"operateType",
                    optionAppSrc:"operateSrc",
                    user:"createBy",
                    warehouseId:"wareHouseId",
                    modelId:"modelId",
                    versionId: "versionId"
                },
            searchDropDowns:[],
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.setSearchData([{key:'operateType',val:"ALL"}]);
            this.setSearchData([{key:'optionAppSrc',val:"ALL"}]);
            setTimeout(() => {
                this.doSearch();
            }, 30);
        },
        changeFilter(i){
            this.filter.activeIndex = i;
            for(let attr in arrOp){
                if(arrOp[attr]==i){
                    this.setSearchData([{key:'operateType',val:attr}]);
                    setTimeout(() => {
                        this.doSearch()
                    }, 50);
                    break;
                }
            }

        },
        changeFilter2(i){
            this.filter2.activeIndex = i;
            for(let attr in arrOp2){
                if(arrOp2[attr]==i){
                    this.setSearchData([{key:'optionAppSrc',val:attr}]);
                    setTimeout(() => {
                        this.doSearch()
                    }, 50);
                    break;
                }
            }
        },
        toggleSearch(){
            this.searchExpended = !this.searchExpended;
            // let search = this.$refs.dataLogSearch;
            // if(search){
            //     search.toggle( this.searchExpended)
            // } 
        },
        querySearchAsync(queryString, cb) {
            if(queryString==""){
                return cb(this.searchDropDowns);
            }
            let params ={
                search: queryString
            }
            dataLogOptionLike({Vue:this,params: params}).then(res=>{
                let temp=[];
                for(let item of res.model){
                    temp.push({id: parseInt(item.value),type:item.group,value:(item.group=="model"?'模型':'仓库')+ item.label})
                }
                if(temp.length>0)this.searchDropDowns=temp;
                cb(this.searchDropDowns);
            },(e)=>{
                cb(this.searchDropDowns);
            })
            },
        handleSelect(item) {
            switch (item.type) {
                case "model":
                    {
                        this.setSearchData([{key:"modelId",val:item.id}]);                        
                        setTimeout(() => {
                            this.doSearch()
                        }, 10);
                    }
                    break;
                case "warehouse":    
                    {
                        this.setSearchData([{key:"warehouseId",val:item.id}])
                        setTimeout(() => {
                            this.doSearch()
                        }, 10);
                    }
                default:
                    break;
            }
            console.log(item);
        },
        formItemChange(data){
            let val = data.config.formData[data.item.key];
            switch (data.item.key) {
                case "operateType":                    
                    this.filter.activeIndex = arrOp[val]
                    break;
                case "optionAppSrc":
                    this.filter2.activeIndex = arrOp2[val]
                    break;
                case "time":{
                    let start=parseInt(val[0].replace(/-/g,"").replace(/ /g,"").replace(/:/g,""));
                    let end=parseInt(val[1].replace(/-/g,"").replace(/ /g,"").replace(/:/g,""));
                    if(start-end >= 0){
                        this.$message.error("结束时间必须大于开始时间！");
                        setTimeout(() => {
                            this.setSearchData([{key:'time',val:""}]); 
                        }, 30);
                    }
                }break;
                default:
                    break;
            }
            this.doSearch();
        },
        setSearchData(data){          
            let vueObjSearch = this.$refs.dataLogSearch;
            if(!vueObjSearch){
                this.$message.error("系统错误！请刷新重试！");
                return;
            }else{
                vueObjSearch.setData(data);
            }
        },
        pageChange(){
            this.doSearch()
        },
        sizeChange(){
            this.doSearch();
        },
        doSearch(){
            let vueObjSearch = this.$refs.dataLogSearch;
            if(!vueObjSearch){
                this.$message.error("系统错误！请刷新重试！");
                return;
            }else{
                let formData =  vueObjSearch.getData();
                let params = {};
                for(let attr in formData){
                    if(""!=formData[attr]){
                        if(attr == 'operateType' || (attr =='optionAppSrc')){
                            if('ALL'!= formData[attr]){
                                params[this.searchTrans[attr]] = formData[attr]
                            }
                        }
                        else if(attr=="time"){
                            params.startTime = formData[attr][0]? formData[attr][0] :'';
                            params.endTime = formData[attr][1]? formData[attr][1] :'';
                        }else{
                            if(this.searchTrans[attr]) params[this.searchTrans[attr]] = formData[attr];
                        }
                    }
                }
                params.pageSize = this.qwTableConfigLog.pageSize;
                params.pageNo = this.qwTableConfigLog.pageNo;
                
                dataLogGrid({Vue:this,params:params}).then(res=>{
                    this.$set(this.qwTableConfigLog, "total", res.model.numRows);
                    this.qwTableConfigLogData =res.model.items;
                    this.$set(this.qwTableConfigLog, "loadShow", false);
                })
            }
        },
        resetSearch(){
            let vueObjSearch = this.$refs.dataLogSearch;
            if(!vueObjSearch){
                this.$message.error("系统错误！请刷新重试！");
                return;
            }else{
                vueObjSearch.reset();
                setTimeout(() => {
                    this.$set(this.qwTableConfigLog, "pageNo", 1);
                    this.init();
                }, 0);
            }
        },
    }
    
}
</script>
<style lang="less">
.dataLog{
    background: #FFF;
    min-width: 1280px;
    .page_search{
        min-width: 1280px;
        width: 100%;
        box-sizing: border-box;
        padding: 24px 0 0 24px;
        border-bottom: 1px dashed #E5E5E5;
        .l{
            .serchFormBox{
                display: table;
            }
            overflow: hidden;
            padding-right: 320px;
            -o-transition: height 0.2s ease-in;
            -ms-transition: height 0.2s ease-in;
            -moz-transition: height 0.2s ease-in;
            -webkit-transition: height 0.2s ease-in;
            transition: height 0.2s ease-in;
        }
        .r{
            width: 320px;
            padding-left: 24px;
            box-sizing: border-box;
            float: right;
            height: 32px;
        }
    }
    .page_filter{
        padding: 24px 0 16px 24px;
        .el-input{
            margin-left: 40px;
        }
        .el-input .el-input__inner{
            border-radius: 0;
            transform: translateY(-1px);
        }
    }
    .searchBtn{
        border-radius: 0;
        min-width: 88px;
    }
    .searchBtnToggle{
        font-size: 14px;
        color:#2A93FF;
    }
    .table_box{
        box-sizing: border-box;
        padding: 24px;
        background: #FFF;
    }
}
</style>

