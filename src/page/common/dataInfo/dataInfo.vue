<template>
<div class="qwCommonPage">
<modelTree ref="modelTree" :config="treeConfig" @nodeLabelClicked="nodeLabelClicked"></modelTree>
<div class="rbox" :style="{minHeight:sidebarHeight-136+'px'}">
    <!-- 过滤条件 -->
    <modelFilter ref="modelFilter" @changFilterActiveIndex="changFilterActiveIndex" :config="configFilter"></modelFilter>
    <div class="infoBlock" :style="{minHeight:sidebarHeight-270+'px'}">
        <!-- 工具条 -->
        <blockToolbar ref="blockToolbar" style="min-height:64px;padding-top:10px;" :config="configToolbar['info']" @itemClicked="toolbarItemClick">
            <span slot="left" style="display:table;width:440px;float:left;transform: translateY(-1px);">
                <!-- 运维数据筛选条件表单 -->
                <qwForm ref="formSearch" @formItemChanged="formSearchItemChanged" v-if="configToolbar.info.rgroup.activeIndex<0" :config="formSearchConfig"></qwForm>
            </span>
        </blockToolbar>
        <!-- 授权表格 -->
        <div class="modBox" v-if="configToolbar.info.rgroup.activeIndex==0">
            <!-- 查询方案 -->
            <modelFilter :style="fixFilterStyle" ref="modelFilterQuery" @changFilterActiveIndex="changFilterActiveIndexQuery" :config="configFilterQuery"></modelFilter>
            <!-- 工具条 -->
            <blockToolbar ref="blockToolbarQuery" :style="fixToolbarStyle" :config="configToolbar['query']" @itemClicked="toolbarItemClickQuery"></blockToolbar>
            <!-- 查询表单 -->
            <div v-if="qwFormConfigQuery" class="formBox">
                <p class="formP">
                    <qwForm ref="qwFormQuery"  :config="qwFormConfigQuery"></qwForm>
                </p>
                <p class="pFr">
                    <el-button class="commonBtn" type="primary" size="mini" @click="showData(true,0)">查询数据</el-button>
                    <el-button class="commonBtn" size="mini" @click="showData(false,0)">取消</el-button>
                </p>
            </div>
            <p v-else  style="margin-top:24px;font-size:14px;color:#666;text-align:left;">
                暂无数据
            </p>
        </div>
        <div class="modBox" v-if="configToolbar.info.rgroup.activeIndex==1">
            <!-- 显示方案 -->
            <modelFilter ref="modelFilterDisplay" :style="fixFilterStyle" @changFilterActiveIndex="changFilterActiveIndexDisplay" :config="configFilterDisplay"></modelFilter>
            <!-- 工具条 -->
            <blockToolbar ref="blockToolbarDisplay" :style="fixToolbarStyle" :config="configToolbar['display']" @itemClicked="toolbarItemClickDisplay"></blockToolbar>
            <!-- 显示表格 -->
            <div v-if="qwTableConfigDisplay" class="formBox">
                <mytable style="margin-top:24px;" :tableConfig="qwTableConfigDisplay" :tableData="tableDataDisplay" :border="false"></mytable>
                <p class="pFr">
                    <el-button class="commonBtn" type="primary" size="mini" @click="showData(true,1)">确定显示</el-button>
                    <el-button class="commonBtn" size="mini" @click="showData(false,1)">取消</el-button>
                </p>
            </div>
            <p v-else  style="margin-top:24px;font-size:14px;color:#666;text-align:left;">
                暂无数据
            </p>
        </div>
        <div class="modBox" v-if="configToolbar.info.rgroup.activeIndex==2">
            <!-- 运维方案 -->
            <modelFilter ref="modelFilterManage" :style="fixFilterStyle" @changFilterActiveIndex="changFilterActiveIndexManage" :config="configFilterManage"></modelFilter>
            <!-- 工具条 -->
            <blockToolbar ref="blockToolbarManage" :style="fixToolbarStyle" :config="configToolbar['manage']" @itemClicked="toolbarItemClickManage"></blockToolbar>
        
            <!-- 查询表单 -->
                <div v-if="qwFormConfigManage" class="formBox">
                    <p class="formP">
                        <qwForm ref="qwformAppenedData"  :config="qwFormConfigManage"></qwForm>
                    </p>
                    <p class="pFr">
                        <el-button class="commonBtn" type="primary" size="mini" @click="doAppenedData">{{tableDataMod=="add"?'新增数据':'保存修改'}}</el-button>
                        <el-button class="commonBtn" size="mini" @click="showData(false,2)">取消</el-button>
                    </p>
                </div>
                <p v-else  style="margin-top:24px;font-size:14px;color:#666;text-align:left;">
                    暂无数据
                </p>
       </div>
       <div  v-if="configToolbar.info.rgroup.activeIndex<0" >
            <mytable style="margin-top:24px;" @add="addData" @edit="editData" @del="delData" v-if="table.tableConfig" :tableConfig="table.tableConfig" :border="false" :tableData="table.tableData" @pageChange="pageChange" @sizeChange="sizeChange"></mytable>
            <p v-else  style="margin-top:24px;font-size:14px;color:#666;text-align:left;"> 暂无数据 </p>
       </div>
       
    </div>
</div>
<qwDialog :config="DialogInfoCommon">
    <DialogInfoQueryBody @close="closeDialogInfoCommon" v-if="configToolbar.info.rgroup.activeIndex==0" ref="DialogInfoQueryBody"></DialogInfoQueryBody>
    <DialogInfoDisplayBody @close="closeDialogInfoCommon" v-else-if="configToolbar.info.rgroup.activeIndex==1" ref="DialogInfoDisplayBody"></DialogInfoDisplayBody>
    <DialogInfoManageBody @close="closeDialogInfoCommon" v-else-if="configToolbar.info.rgroup.activeIndex==2" ref="DialogInfoManageBody"></DialogInfoManageBody>
</qwDialog>
<!--  重命名解决方案 -->
<qwModalForm ref="DialogRename" :config="DialogConfigRename"></qwModalForm>
<qwModalForm ref="DialogSchemeAdd" :config="qwModalFormSchemeAdd"></qwModalForm>
</div>
</template>
<script>
import qwForm from "../../components/qwform/qwform.vue"
import qwDialog from "../../components/qwform/qwDialog.vue"
import qwModalForm from "../../components/qwform/qwMoalForm.vue"
import {timestampToTime} from "../dataModel/filter.js"
import modelTree from "../common/modelTree.vue"
import modelFilter from "../common/modelFilter.vue"
import blockToolbar from "../common/blockToolbar.vue"
import mytable from "../../components/tableEx.vue"
import DialogInfoQueryBody from "./DialogInfoQueryBody.vue"
import DialogInfoDisplayBody from "./DialogInfoDisplayBody.vue"
import DialogInfoManageBody from "./DialogInfoManageBody.vue"
import {mapState} from "vuex"
import {
    warehouseList,
    warehouseGrid,
    warehouseAdd,
    warehouseEdit,
    warehouseAble,
    warehouseDel,
    
    dataModelList,
    dataModelGrid,
    dataModelAdd,
    dataModalAble,
    dataModelEdit,
    dataModelDel,

    versionList,
    versionGrid,
    versionAble,
    versionAdd,
    versionDel,

    permissionSchemeList,
    permissionSchemeGrid,
    permissionSchemeAdd,
    permissionSchemeEdit,
    permissionSchemeAble,
    permissionSchemeDel,

    permissionActionList,
    permissionActionGrid,
    permissionActionAdd,
    permissionActionEdit,
    permissionActionGet,
    permissionActionDel,

    permissionLineList,
    permissionLineGrid,
    permissionLineAdd,
    permissionLineEdit,
    permissionLineGet,
    permissionLineDel,

    permissionColumList,
    permissionColumGrid,
    permissionColumAdd,
    permissionColumEdit,
    permissionColumGet,
    permissionColumDel,
    structureList,

    querySchemeList,
    querySchemeEdit,
    querySchemeAdd,
    querySchemeDel,
    queryDesignList,
    queryDesignGet,
    
    displaySchemeList,
    displaySchemeAdd,
    displaySchemeEdit,
    displaySchemeDel,

    maintainDesignGet,

    maintainSchemeList,
    maintainSchemeAdd,
    maintainSchemeEdit,
    maintainSchemeDel,

    displayDesignGet,
    dataDomainGridDefined,
    dataDomainAdd,
    dataDomainEdit,
    dataDomainDel
} from '../dataAuthMehod/api.js';
import http from '../../api/base.js'
import { JsonParse, formatJson } from '../../api/common';
export default {
    components:{
        qwForm,
        qwModalForm,
        modelTree,
        modelFilter,
        blockToolbar,
        qwDialog,
        mytable,
        DialogInfoQueryBody,
        DialogInfoDisplayBody,
        DialogInfoManageBody
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        })
    },
    data(){
        return { 
            fixToolbarStyle:"padding-top:24px;border-bottom:1px dashed #E5E5E5;",
            fixFilterStyle:"border-bottom:1px dashed #E5E5E5;padding: 20px 0 0 0;",
            curRoleNode:null,
            // curDisplayDesign:null,   
            treeConfig:{
                treeFilter:{
                        status:0,
                        keyWords:""
                    },
                    dropDown:{
                        treeStatus:[
                            {
                                label:"全部",
                                value:0,
                            },                    
                            {
                                label:"已启用",
                                value:1,
                            },
                            {
                                label:"已停用",
                                value:2,
                            }
                        ]
                    },
                    id:0,
                    maxLevel:1,
                    curNode:null,
                    treeData:[
                        {
                        id: 0,
                        isEdit:false,
                        label: '所有仓库',
                        children:[]
                        }
                    ],
                    propsTree: {
                    label: 'label',
                    children: 'children',
                    isLeaf: 'leaf'
                    },
                    filterGroupConfig:{
                        show:true,
                    },
                    // tree dialog
                    treeDialogConfig:{
                        qwForm:{
                                labelWidth: 100,
                                itemWidth:440,
                                itemSpan:24,                        
                                mod:'add',
                                items:[                                
                                    {   
                                        colStyle:"",
                                        key:"pname",
                                        type:"input",
                                        name:"父级名称",
                                        disabled:false,
                                        clearable:true,
                                        suffixIcon:"",
                                        prefixIcon:"",
                                        maxLength:40,
                                        minLength:0,
                                        rows:1,//textarea适用
                                        autoComplete:"off",
                                        readonly:true,
                                        rules:[],
                                    },
                                    {   
                                        colStyle:"",
                                        key:"name",
                                        type:"input",
                                        name:"模型名称",
                                        disabled:false,
                                        clearable:true,
                                        suffixIcon:"",
                                        prefixIcon:"",
                                        maxLength:40,
                                        minLength:0,
                                        rows:1,//textarea适用
                                        autoComplete:"off",
                                        readonly:false,
                                        rules:[{required:true,message:"该项为必填项",trigger:["input","change","blur"]}],
                                    }
                                ],
                                formData:{
                                    pid:-1,
                                    pname:"",
                                    name:"",
                                    treeIdPath:'',
                                    treeNamePath:'',
                                },
                                formBtnsStyle:"text-align:right",
                                formBtns:[
                                    {
                                        size:"small",//medium / small / mini
                                        type:"primary",//primary / success / warning / danger / info / text
                                        plain:false,//是否朴素
                                        round:false,//是否圆角按钮
                                        circle:false,//是否圆形按钮
                                        loading:false,//是否加载中状态
                                        disabled:false,//是否禁用
                                        icon:"",//图标class
                                        autofocus:false,//自动获取焦点
                                        nativeType:"button",//button / submit / reset
                                        label:"保存",
                                        class:"",
                                        style:"width:100px;text-align:center;",
                                    }
                                ],
                                eventCB:{//回调事件
                                    formBtnClicked:(data)=>{
                                        if(data.index==0){
                                            data.self.validate(()=>{
                                                let params={
                                                        parentId:data.config.formData.pid,
                                                        treeIdPath:data.config.formData.treeIdPath,
                                                        alias:data.config.formData.name,  
                                                        treeNamePath:data.config.formData.treeNamePath
                                                    }
                                                warehouseAdd({Vue:this,params:params}).then(res=>{
                                                    if(res.result){
                                                        this.$refs["modelTree"].loadTree(this.treeConfig.curNode,this.treeConfig.curNode.data);
                                                        this.$refs["modelTree"].closeTreeModal();
                                                    }
                                                })  
                                            },()=>{
                                                console.log('err done')
                                            })
                                        }
                                        return false;
                                    }
                                }
                            },
                        qwDialog:{
                                title:"新增数据仓库模型",
                                titleStyle:"background:#FFF;",
                                dialogVisible:false,
                                width:"480px",
                                fullscreen:false,
                                top:"15vh",
                                modal:true,//遮罩
                                modalAppendToBody:true,
                                appendToBody:false,
                                lockScroll:true,
                                customClass:"",
                                closeOnClickModal:true,
                                closeOnPressEscape:true,
                                showClose:true,
                                center:false,
                                beforeClose:()=>{
                                    console.log("beforeClose")
                                }
                            }
                    },
                    treeDialogConfigEdit:{
                        qwForm:{
                                labelWidth: 100,
                                itemWidth:440,
                                itemSpan:24,
                                items:[                                
                                    {   
                                        colStyle:"",
                                        key:"pname",
                                        type:"input",
                                        name:"父级名称",
                                        disabled:false,
                                        clearable:true,
                                        suffixIcon:"",
                                        prefixIcon:"",
                                        maxLength:40,
                                        minLength:0,
                                        rows:1,//textarea适用
                                        autoComplete:"off",
                                        readonly:true,
                                        rules:[],
                                    },                                                            
                                    {   
                                        colStyle:"",
                                        key:"treeIdPath",
                                        type:"input",
                                        name:"ID路径",
                                        disabled:false,
                                        clearable:true,
                                        suffixIcon:"",
                                        prefixIcon:"",
                                        maxLength:40,
                                        minLength:0,
                                        rows:1,//textarea适用
                                        autoComplete:"off",
                                        readonly:true,
                                        rules:[],
                                    },                                              
                                    {   
                                        colStyle:"",
                                        key:"treeNamePath",
                                        type:"input",
                                        name:"仓库名路径",
                                        disabled:false,
                                        clearable:true,
                                        suffixIcon:"",
                                        prefixIcon:"",
                                        maxLength:40,
                                        minLength:0,
                                        rows:1,//textarea适用
                                        autoComplete:"off",
                                        readonly:true,
                                        rules:[],
                                    },
                                    {   
                                        colStyle:"",
                                        key:"name",
                                        type:"input",
                                        name:"模型名称",
                                        disabled:false,
                                        clearable:true,
                                        suffixIcon:"",
                                        prefixIcon:"",
                                        maxLength:40,
                                        minLength:0,
                                        rows:1,//textarea适用
                                        autoComplete:"off",
                                        readonly:false,
                                        rules:[{required:true,message:"该项为必填项",trigger:["input","change","blur"]}],
                                    }
                                ],
                                formData:{
                                    pid:-1,
                                    pname:"",
                                    name:"",
                                    treeIdPath:'',
                                    treeNamePath:'',
                                },
                                formBtnsStyle:"text-align:right",
                                formBtns:[
                                    {
                                        size:"small",//medium / small / mini
                                        type:"primary",//primary / success / warning / danger / info / text
                                        plain:false,//是否朴素
                                        round:false,//是否圆角按钮
                                        circle:false,//是否圆形按钮
                                        loading:false,//是否加载中状态
                                        disabled:false,//是否禁用
                                        icon:"",//图标class
                                        autofocus:false,//自动获取焦点
                                        nativeType:"button",//button / submit / reset
                                        label:"保存",
                                        class:"",
                                        style:"width:100px;text-align:center;"

                                    }
                                ],
                                eventCB:{//回调事件
                                    formBtnClicked:(data)=>{
                                        if(data.index==0){
                                            data.self.validate(()=>{
                                                let params={
                                                        id:this.treeConfig.curNode.data.id,
                                                        alias:data.config.formData.name,
                                                    }
                                                warehouseEdit({Vue:this,params:params}).then(res=>{
                                                    if(res.result){
                                                        res.model.label=res.model.alias;
                                                        this.treeConfig.curNode.data=res.model;
                                                        this.$refs["modelTree"].closeTreeModal2();
                                                    }
                                                })  
                                            },()=>{
                                                console.log('err done')
                                            })
                                        }
                                        return false;//return false或者该函数不存在则直接触发emit "formBtnClicked" return true则不向下执行
                                    }
                                }
                            },
                        qwDialog:{
                                title:"编辑数据仓库模型",
                                titleStyle:"background:#FFF;",
                                dialogVisible:false,
                                width:"480px",
                                fullscreen:false,
                                top:"15vh",
                                modal:true,//遮罩
                                modalAppendToBody:true,
                                appendToBody:false,
                                lockScroll:true,
                                customClass:"",
                                closeOnClickModal:true,
                                closeOnPressEscape:true,
                                showClose:true,
                                center:false,
                                beforeClose:()=>{
                                    console.log("beforeClose")
                                }
                            }
                    },
                    treeDialogConfigSee:{
                        qwForm:{
                                labelWidth: 200,
                                itemWidth:440,
                                itemSpan:24,
                                items:[                                
                                    {   
                                        colStyle:"",
                                        key:"ableBy",
                                        type:"labelInfo",
                                        name:"启用人："                             
                                    },                                
                                    {   
                                        colStyle:"",
                                        key:"ableTime",
                                        type:"labelInfo",
                                        transVal(timestamp){
                                            if(/^\d{10}$/.test(timestamp)||(/^\d{13}$/.test(timestamp))){
                                                var date = (timestamp + '').length == 13 ? new Date(timestamp) : new Date(timestamp*13) ;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                                                var Y = date.getFullYear() + '-';
                                                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                                                var D = date.getDate() + ' ';
                                                var h = date.getHours() + ':';
                                                var m = date.getMinutes() + ':';
                                                var s = date.getSeconds();
                                                return Y + M + D + h + m + s;
                                            }else{
                                                return timestamp;
                                            }
                                        
                                        },
                                        name:"启用时间："                             
                                    },                                
                                    {   
                                        colStyle:"",
                                        key:"label",
                                        type:"labelInfo",
                                        name:"仓库名称："                            
                                    },                                
                                    {   
                                        colStyle:"",
                                        key:"isAble",
                                        type:"labelInfo",
                                        transVal(val){
                                            return val==true?'是':'否'
                                        },
                                        name:"是否启用："                             
                                    },                                
                                    {   
                                        colStyle:"",
                                        key:"modifyBy",
                                        type:"labelInfo",
                                        name:"修改数据人员："                           
                                    },                                
                                    {   
                                        colStyle:"",
                                        key:"modifyTime",
                                        type:"labelInfo",
                                        name:"修改数据时间："                          
                                    },
                                ],
                                formData:{
                                ableBy:"",//启用人
                                ableTime:"",//启用时间
                                label:"",//模型名称
                                isAble:"",//是否启用
                                modifyBy:"",//修改人
                                modifyTime:"",//修改时间
                                },
                                formBtnsStyle:"text-align:right",
                                formBtns:[
                                    {
                                        size:"small",//medium / small / mini
                                        type:"danger",//primary / success / warning / danger / info / text
                                        plain:false,//是否朴素
                                        round:false,//是否圆角按钮
                                        circle:false,//是否圆形按钮
                                        loading:false,//是否加载中状态
                                        disabled:false,//是否禁用
                                        icon:"",//图标class
                                        autofocus:false,//自动获取焦点
                                        nativeType:"button",//button / submit / reset
                                        label:"关闭",
                                        class:"",
                                        style:"width:100px;text-align:center;",

                                    }
                                ],
                                eventCB:{//回调事件
                                    formBtnClicked:(data)=>{
                                        console.log("done2",data);
                                        if(data.index==0){
                                            let modal=this.$refs.modelTree.$refs.qwModalFormTreeSee;
                                            if(modal){
                                                modal.closeModal();
                                            }
                                        }
                                        return false;
                                    }
                                }
                            },
                        qwDialog:{
                                title:"查看 - 数据仓库模型",
                                titleStyle:"background:#FFF;",
                                dialogVisible:false,
                                width:"480px",
                                fullscreen:false,
                                top:"15vh",
                                modal:true,//遮罩
                                modalAppendToBody:true,
                                appendToBody:false,
                                lockScroll:true,
                                customClass:"",
                                closeOnClickModal:true,
                                closeOnPressEscape:true,
                                showClose:true,
                                center:false,
                                beforeClose:()=>{
                                    console.log("beforeClose")
                                }
                            }
                    },
            },
            // filter config
            configFilterQuery:[
                 {
                    title:"查询方案",
                    activeIndex:0,
                    filterMod:"all",
                    show:false,
                    items:[
                        // {
                        //     label:"年度运营数据",
                        //     disabled:true,
                        // }
                    ]
                }
            ],
            // filter config
            configFilterDisplay:[
                 {
                    title:"显示方案",
                    activeIndex:0,
                    filterMod:"all",
                    show:false,
                    items:[
                        // {
                        //     label:"年度运营数据",
                        //     disabled:true,
                        // }
                    ]
                }
            ],
            // filter config
            configFilterManage:[
                 {
                    title:"运维方案",
                    activeIndex:0,
                    filterMod:"all",
                    show:false,
                    items:[
                        // {
                        //     label:"年度运营数据",
                        //     disabled:true,
                        // }
                    ]
                }
            ],
            configFilter:[
                        {
                            title:"数据模型",
                            activeIndex:0,
                            filterMod:"all",
                            show:false,
                            items:[
                                // {
                                //     label:"年度运营数据",
                                //     disabled:true,
                                // }
                            ]
                        },
                        {
                            title:"版本号",
                            activeIndex:0,
                            filterMod:"all",
                            show:false,
                            items:[
                                // {
                                //     label:"V1.0",
                                //     disabled:true,
                                // }
                            ]
                        },
                        // {
                        //     title:"授权策略",
                        //     activeIndex:0,
                        //     filterMod:"all",
                        //     show:false,
                        //     items:[
                        //         // {
                        //         //     label:"策略1.0",
                        //         //     disabled:true,
                        //         // }
                        //     ]
                        // }
                    ],
            // filter config end
          table:{
                    tableConfig: null,//{
                        // //操作按钮配置
                        // toolbarConfig: [
                        // ],
                        // //表格字段配置
                        // colConfig: [
                        // {
                        // field: "id",
                        // label: "序号",
                        // type: "text",
                        // minWidth:50
                        // },
                        // {
                        // field: "treeNamePath",
                        // label: "仓库路径",
                        // type: "text"
                        // },
                        // {
                        // field: "modelAlias",
                        // label: "数据模型",
                        // type: "text"
                        // },
                        // {
                        // field: "versionNo",
                        // label: "版本号",
                        // type: "text",
                        // transVal(val){
                        //     return "V"+val+'.0';
                        // }
                        // },
                        // {
                        // field: "schemeAlias",
                        // label: "授权策略",
                        // type: "text"
                        // },
                        // {
                        // field: "orgPath",
                        // label: "部门路径",
                        // type: "text",
                        // transVal(val){
                        //     return val.replace(",","/");
                        // }
                        // },
                        // {
                        // field: "name",
                        // label: "姓名",
                        // type: "text"
                        // }
                    //     ],
                    //     isBorder: true,
                    //     size:'medium',
                    //     isSelection: false, //是否可选
                    //     isPage: true, //是否分页
                    //     currentSelectArr: [], //当前勾选的数据
                    //     align: "center", //文本对齐方式
                    //     pageNo: 1,
                    //     pageSize: 20,
                    //     total: 0,
                    //     isHigh: false,
                    //     isLoading: true, //是否开启loading
                    //     loadShow: false //loading控制
                    // },
                    tableData: [],
                },
            DialogInfoCommon:{
                        title:"自定义查询",
                        titleStyle:"background:#FFF;",
                        dialogVisible:false,
                        width:"1224px",
                        fullscreen:false,
                        top:"15vh",
                        modal:true,//遮罩
                        modalAppendToBody:true,
                        appendToBody:false,
                        lockScroll:true,
                        customClass:"",
                        closeOnClickModal:true,
                        closeOnPressEscape:true,
                        showClose:true,
                        center:false,
                        beforeClose:()=>{
                            let bodys=["DialogInfoQueryBody","DialogInfoDisplayBody","DialogInfoManageBody"]
                            let dialog = this.$refs[bodys[this.configToolbar.info.rgroup.activeIndex]];
                            if(dialog)dialog.reset();
                        }
            }, 
            configToolbar:{
                info:{
                    group:{ activeIndex:0,items:[] },
                    rgroup:{
                        activeIndex:-1,
                        items:[
                            {
                                title:'自定义查询',
                                type:''
                            },
                            
                            {
                                title:'自定义显示',
                                type:''
                            },
                            {
                                title:'自定义运维',
                                type:''
                            }
                        ]
                    },
                },
                query:{
                    group:{ activeIndex:0,items:[] },
                    rgroup:{
                        activeIndex:0,
                        items:[
                            {
                                title:'新增方案',
                                type:''
                            },
                            
                            {
                                title:'重命名',
                                type:''
                            },
                            {
                                title:'查询排版',
                                type:''
                            },
                            {
                                title:'删除',
                                type:''
                            }
                        ]
                    },
                },
                display:{
                    group:{ activeIndex:0,items:[] },
                    rgroup:{
                        activeIndex:0,
                        items:[
                            {
                                title:'新增方案',
                                type:''
                            },
                            
                            {
                                title:'重命名',
                                type:''
                            },
                            {
                                title:'排版设计',
                                type:''
                            },
                            {
                                title:'删除',
                                type:''
                            }
                        ]
                    },
                },
                manage:{
                    group:{ activeIndex:0,items:[] },
                    rgroup:{
                        activeIndex:0,
                        items:[
                            {
                                title:'新增方案',
                                type:''
                            },
                            
                            {
                                title:'重命名',
                                type:''
                            },
                            {
                                title:'排版设计',
                                type:''
                            },
                            {
                                title:'删除',
                                type:''
                            }
                        ]
                    },
                },
            },          
            configBlock:{
                curMod:'info',
            },
            DialogConfigRename:{
                 qwDialog:{
                    title:"重命名方案",
                    titleStyle:"background:#FFF;",
                    dialogVisible:false,
                    width:"480px",
                    fullscreen:false,
                    top:"15vh",
                    modal:true,//遮罩
                    modalAppendToBody:true,
                    appendToBody:false,
                    lockScroll:true,
                    customClass:"",
                    closeOnClickModal:true,
                    closeOnPressEscape:true,
                    showClose:true,
                    center:false,
                    beforeClose:()=>{
                        this.DialogConfigRename.qwForm.formData.model=null;
                        this.DialogConfigRename.qwForm.formData.version=null;
                        this.DialogConfigRename.qwForm.formData.id=-1;
                        this.DialogConfigRename.qwForm.formData.mod="";
                        this.$refs.DialogRename.resetForm();
                        console.log("beforeClose")
                    }
                },
                qwForm:{
                        labelWidth: 100,
                        itemWidth:440,
                        itemSpan:24,                        
                        mod:'add',
                        items:[                                
                            {   
                                colStyle:"",
                                key:"alias",
                                type:"input",
                                name:"查询方案",
                                disabled:false,
                                clearable:true,
                                suffixIcon:"",
                                prefixIcon:"",
                                maxLength:40,
                                minLength:0,
                                rows:1,//textarea适用
                                autoComplete:"off",
                                readonly:false,
                                rules:[{required:true,message:"该项不能为空！", trigger:["change","input","blur"]}],
                            }
                        ],
                        formData:{
                            id:-1,
                            mod: "query",
                            alias:"",
                            model:null,
                            version:null,
                        },
                        formBtnsStyle:"text-align:right",
                        formBtns:[
                            {
                                size:"small",//medium / small / mini
                                type:"primary",//primary / success / warning / danger / info / text
                                plain:false,//是否朴素
                                round:false,//是否圆角按钮
                                circle:false,//是否圆形按钮
                                loading:false,//是否加载中状态
                                disabled:false,//是否禁用
                                icon:"",//图标class
                                autofocus:false,//自动获取焦点
                                nativeType:"button",//button / submit / reset
                                label:"保存",
                                class:"",
                                style:"width:100px;text-align:center;",
                                // clicked:(data)=>{
                                //     console.log("done",data);
                                // }

                            }
                        ],
                        eventCB:{//回调事件
                            formBtnClicked:(data)=>{
                                let that=this;
                                if(data.index==0){
                                    data.self.validate(()=>{
                                        let formData = data.config.formData;
                                        let params = {
                                            id:formData.id,
                                            alias: formData.alias
                                        }
                                        let query_={
                                            0:querySchemeEdit,
                                            1: displaySchemeEdit,
                                            2:  maintainSchemeEdit
                                        }
                                        let action = query_[that.configToolbar.info.rgroup.activeIndex];
                                        action({Vue:this,params:params}).then(res=>{
                                            this.$message.success("操作成功！")
                                            let page = data.self.$parent.$parent.$parent.$parent
                                            data.self.$parent.$parent.$parent.closeModal();
                                            page.toolbarItemClick({group:"right",index:this.configToolbar.info.rgroup.activeIndex })
                                        })                                    
                                    },()=>{
                                        console.log('err done')
                                    })
                                }
                                return false;
                            }
                        }
                    }
            },
            qwFormConfigQuery:null,
            qwFormConfigDisplay:null,
            qwFormConfigManage:null,
            qwModalFormSchemeAdd:{
                        qwForm:{
                                labelWidth: 100,
                                itemWidth:440,
                                itemSpan:24,
                                items:[
                                    {   
                                        colStyle:"",
                                        key:"name",
                                        type:"input",
                                        name:"方案名称",
                                        disabled:false,
                                        clearable:true,
                                        suffixIcon:"",
                                        prefixIcon:"",
                                        maxLength:40,
                                        minLength:0,
                                        rows:1,//textarea适用
                                        autoComplete:"off",
                                        readonly:false,
                                        rules:[{required:true,message:"该项为必填项",trigger:["input","change","blur"]}],
                                    }
                                ],
                                formData:{
                                    mod:'query',
                                    name:"",
                                },
                                formBtnsStyle:"text-align:right",
                                formBtns:[
                                    {
                                        size:"small",//medium / small / mini
                                        type:"primary",//primary / success / warning / danger / info / text
                                        plain:false,//是否朴素
                                        round:false,//是否圆角按钮
                                        circle:false,//是否圆形按钮
                                        loading:false,//是否加载中状态
                                        disabled:false,//是否禁用
                                        icon:"",//图标class
                                        autofocus:false,//自动获取焦点
                                        nativeType:"button",//button / submit / reset
                                        label:"保存",
                                        class:"",
                                        style:"width:100px;text-align:center;",
                                        // clicked:(data)=>{
                                        //     console.log("done",data);
                                        // }

                                    }
                                ],
                                eventCB:{//回调事件
                                    formBtnClicked:(data)=>{
                                        let that = this;
                                        if(data.index==0){
                                            data.self.validate(()=>{
                                                let model = that.getFilter(0);
                                                let version = that.getFilter(1);
                                                let params ={
                                                    modelId: model.id,
                                                    versionId: version.id,
                                                    alias: data.config.formData.name
                                                }
                                                let query_={
                                                    0:querySchemeAdd,
                                                    1: displaySchemeAdd,
                                                    2:  maintainSchemeAdd
                                                }
                                                let action = query_[that.configToolbar.info.rgroup.activeIndex];
                                                action({Vue:that,params:params}).then(res=>{
                                                    that.$message.success("操作成功！");
                                                    that.$refs.DialogSchemeAdd.resetForm();
                                                    that.$refs.DialogSchemeAdd.closeModal();
                                                    that.toolbarItemClick({group:"right",index:that.configToolbar.info.rgroup.activeIndex });
                                                })
                                            },()=>{
                                                console.log('err done')
                                            })
                                        }
                                        return false;//return false或者该函数不存在则直接触发emit "formBtnClicked" return true则不向下执行
                                    }
                                }
                            },
                        qwDialog:{
                                title:"新增方案",
                                titleStyle:"background:#FFF;",
                                dialogVisible:false,
                                width:"480px",
                                fullscreen:false,
                                top:"15vh",
                                modal:true,//遮罩
                                modalAppendToBody:true,
                                appendToBody:false,
                                lockScroll:true,
                                customClass:"",
                                closeOnClickModal:true,
                                closeOnPressEscape:true,
                                showClose:true,
                                center:false,
                                beforeClose:()=>{
                                    this.$refs.DialogSchemeAdd.resetForm();
                                    console.log("beforeClose")
                                }
                            }
                    },
            qwTableConfigDisplay:null,
            tableDataDisplay:[],
            tableDataMod:'add',
            tableCurData:null,
            formSearchConfig:{
                labelWidth: 80,
                itemWidth:200,
                itemSpan:12,
                items:[
                     {   
                        key:'displaySchemeId',
                        name:'显示方案',
                        type:'select',
                        controlWidth:"120px",
                        placeholder:"请选择",
                        dropDown:{
                            data:[]
                        }
                    },
                    {   
                        key:'querySchemeId',
                        name:'查询方案',
                        type:'select',
                        controlWidth:"120px",
                        placeholder:"请选择",
                        dropDown:{
                            data:[]
                        }
                    },                   
                    // {   
                    //     key:'manageSchemeId',
                    //     name:'运维方案',
                    //     type:'select',
                    //     controlWidth:"120px",
                    //     placeholder:"请选择",
                    //     dropDown:{
                    //         data:[]
                    //     }
                    // },
                ],
                formData:{
                    querySchemeId: "",
                    displaySchemeId:"",
                    manageSchemeId:""
                }
            },
            curQueryScheme:null,
            curDisplayScheme:null,
            // curManageScheme:null 
       }
    },
    mounted(){
        // this.init();
    },
    methods:{
        closeDialogInfoCommon(){
            this.toolbarItemClick({group:"right",index:this.configToolbar.info.rgroup.activeIndex })
            this.DialogInfoCommon.dialogVisible=false;
        },
        /*tree label 点击事件回调*/
        nodeLabelClicked(node){
            this.getDataModelList(node);
        },
        /*过滤器点击回调*/
        changFilterActiveIndex(data){
            if(data.i==0){//数据模型切换
                if(this.configFilter[data.i].items[data.j]){
                    this.getVersionList(this.configFilter[data.i].items[data.j]);
                }else{
                    this.configFilter[1].items=[];
                    this.configFilter[1].activeIndex=0;
                    
                    this.configFilter[2].items=[];
                    this.configFilter[2].activeIndex=0; 
                    this.setNoData(true);
                }
            }else if(data.i==1){//数据版本切换
                 if(this.configFilter[data.i].items[data.j]){
                    //获取运维数据筛选下拉 
                    if(this.configToolbar.info.rgroup.activeIndex >= 0){
                        this.toolbarItemClick({group:"right",index:this.configToolbar.info.rgroup.activeIndex })
                    }
                    this.InitSearchDropDown();
                 }
            }
        },
        changFilterActiveIndexQuery(data){
            if(data.i==0){
                this.getQueryDesign();
            }
        },
        changFilterActiveIndexDisplay(data){
            if(data.i==0){
                this.getDisplayDesign();
            }
        },
        changFilterActiveIndexManage(data){
            if(data.i==0){
                this.getManageDesign();
            }
        },
        /*根据filter返回状态设置全局是否可以获取data*/
        setNoData(noData){
            if(noData){//无数据状态
                this.configBlock.curMod="info";
                this.$set(this.table,"tableConfig",null);
                this.$set(this.table,"tableData",[]);
                let form=this.$refs.formSearch;
                if(form){
                    form.resetForm();
                }
                this.$set(this.formSearchConfig.items[0].dropDown,'data',[]);
                this.$set(this.formSearchConfig.items[1].dropDown,'data',[]);
                this.qwTableConfigDisplay=null;
            }else{
                this.configBlock.curMod="info";
                // 加载infoBlock数据
            }
        },
        /*dataModel数据转换为filter items*/
        transFilterBtnData(data){
            let temp=[];
            for(let item of data){
                item.label=item.alias;
                item.disabled=!item.isAble
                temp.push(item);
            }
            return temp;
        },        
        /*根据仓库id获取所有模型*/
        getDataModelList(node){
            let params={ warehouseId: node.data.id}
            dataModelList({Vue:this,params:params}).then(res=>{
                if(res.result){
                    this.configFilter[0].items=this.transFilterBtnData(res.model);
                    this.configFilter[0].activeIndex=0;
                    if(this.configFilter[0].items.length>0){
                        this.changFilterActiveIndex({i:0,j:0});
                    }else{
                        this.configFilter[0].items=[];
                        this.configFilter[0].activeIndex=0;
                        
                        this.configFilter[1].items=[];
                        this.configFilter[1].activeIndex=0;

                        // this.configFilter[2].items=[];
                        // this.configFilter[2].activeIndex=0;
                        this.setNoData(true);

                    }
                }
            })
        },        
        /*获取版本列表*/
        getVersionList(model){
            let params={modelId:model.id}
            versionList({Vue:this,params:params}).then(res=>{
                if(res.result){
                    if(res.model.length>0){
                        for(let attr in res.model){
                            res.model[attr].disabled=!res.model[attr].isAble;
                            res.model[attr].label="版本 " + res.model[attr].versionNo+".0";
                        }
                        this.configFilter[1].items=res.model;
                        this.configFilter[1].activeIndex=0;
                        this.changFilterActiveIndex({i:1,j:0});
                    }else{
                        this.configFilter[1].activeIndex=0;
                        this.$set(this.configFilter[1],"items",[]);
                        // this.configFilter[2].activeIndex=0;
                        // this.$set(this.configFilter[2],"items",[]);
                        this.setNoData(true);
                    }
                    
                }
            })
        },
        getPermissionSchemeList(model,version){
            let params={modelId:model.id,versionId:version.id};
            permissionSchemeList({Vue:this,params:params}).then(res=>{
                if(res.result){
                    if(res.model.length>0){
                        for(let attr in res.model){
                            res.model[attr].disabled=!res.model[attr].isAble;
                            res.model[attr].label=res.model[attr].alias;
                            res.model[attr].permissionActionList={"add": false, "del": false, "edit": false, "find": false};
                        }
                        this.configFilter[2].items=res.model;
                        this.configFilter[2].activeIndex=0;
                        this.setNoData(false);
                    }else{
                        this.configFilter[2].activeIndex=0;
                        this.configFilter[2].items=[];
                        this.setNoData(true);
                    }
                }
            })
        },
        getFilter(index){
            return this.configFilter[index].items[this.configFilter[index].activeIndex]
        },
        setRenameDialogConfigAndShow(mod="query"){
            switch (mod) {
                case "query":
                    {
                        let scheme =this.configFilterQuery[0].items[this.configFilterQuery[0].activeIndex];
                        if(!scheme){
                            this.$message.error("请选择制定的查询方案！");
                            return;
                        }
                        this.$set(this.DialogConfigRename.qwForm.formData,"model",this.getFilter(0));
                        this.$set(this.DialogConfigRename.qwForm.formData,"version",this.getFilter(1));

                        this.$set(this.DialogConfigRename.qwForm.items[0],"name","查询方案"); 
                        this.$set(this.DialogConfigRename.qwForm.formData,"id",scheme.id);
                        this.$set(this.DialogConfigRename.qwForm.formData,"mod","query");
                        this.DialogConfigRename.qwDialog.dialogVisible = true;
                        setTimeout(() => {
                            this.$set( this.DialogConfigRename.qwForm.formData,"alias", scheme.alias );
                        }, 10);
                    }
                    break;
                case "display":
                    {
                        let scheme =this.configFilterDisplay[0].items[this.configFilterDisplay[0].activeIndex];
                        if(!scheme){
                            this.$message.error("请选择制定的查询方案！");
                            return;
                        }
                        this.$set(this.DialogConfigRename.qwForm.formData,"model",this.getFilter(0));
                        this.$set(this.DialogConfigRename.qwForm.formData,"version",this.getFilter(1));

                        this.$set(this.DialogConfigRename.qwForm.items[0],"name","查询方案"); 
                        this.$set(this.DialogConfigRename.qwForm.formData,"id",scheme.id);
                        this.$set(this.DialogConfigRename.qwForm.formData,"mod","query");
                        this.DialogConfigRename.qwDialog.dialogVisible = true;
                        setTimeout(() => {
                            this.$set( this.DialogConfigRename.qwForm.formData,"alias", scheme.alias );
                        }, 10);
                    }
                break;
                case "manage":
                {
                    let scheme =this.configFilterManage[0].items[this.configFilterManage[0].activeIndex];
                        if(!scheme){
                            this.$message.error("请选择制定的查询方案！");
                            return;
                        }
                        this.$set(this.DialogConfigRename.qwForm.formData,"model",this.getFilter(0));
                        this.$set(this.DialogConfigRename.qwForm.formData,"version",this.getFilter(1));

                        this.$set(this.DialogConfigRename.qwForm.items[0],"name","运维方案"); 
                        this.$set(this.DialogConfigRename.qwForm.formData,"id",scheme.id);
                        this.$set(this.DialogConfigRename.qwForm.formData,"mod","manage");
                        this.DialogConfigRename.qwDialog.dialogVisible = true;
                        setTimeout(() => {
                            this.$set( this.DialogConfigRename.qwForm.formData,"alias", scheme.alias );
                        }, 10);
                }
                default:
                    break;
            }
        },
        toolbarItemClickQuery(data){
            switch (data.index) {
                case 0://新增方案
                    {                        
                        let modal = this.$refs.DialogSchemeAdd;
                        this.$set(this.qwModalFormSchemeAdd.qwForm,"mod","query");
                        modal.showModal();
                    //    this.qwModalFormSchemeAdd
                    }
                    break;
                case 1://重命名
                    {             
                        this.setRenameDialogConfigAndShow("query")
                    }
                    break;
                case 2://查询排版
                    {    
                        let model=this.getFilter(0);
                        let version = this.getFilter(1);
                        if(!model){
                            this.$message.error("请选择指定的数据模型！");                                
                            return;
                        }
                        if(!version){
                            this.$message.error("请选择指定的模型版本！");                                
                            return;
                        }
                        let schemeLen =   this.configFilterQuery[0].items.length;
                        if(schemeLen<1){
                            this.$message.error("请先创建至少1条查询方案！")
                            return;
                        }                     
                        let scheme = this.configFilterQuery[0].items[this.configFilterQuery[0].activeIndex];
                        if(!scheme){
                            this.$message.error("请选择指定的查询方案！")
                            return;
                        }
                        
                        this.DialogInfoCommon.dialogVisible=true;
                        setTimeout(() => {
                            this.$refs.DialogInfoQueryBody.init({mod:"edit",tree:{loadTreeAction: structureList,params:{ modelId: model.id,versionId: version.id }, model:model, version:version,scheme:scheme}})
                        }, 30);
                    }
                    break;
                case 3://删除
                    {                   
                       let item =this.configFilterQuery[0].items[this.configFilterQuery[0].activeIndex];
                        this.$confirm('该操作将删除解决方案“' + item.label + '”？', '数据删除提示', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                        })
                        .then(() => {
                            let params = {ids:item.id}
                            querySchemeDel({Vue:this,params:params}).then(res=>{
                                this.$message.success("操作成功！");
                                this.toolbarItemClick({group:"right",index:this.configToolbar.info.rgroup.activeIndex })
                            })
                        })
                        .catch(action => {
                            
                        });
                    }
                    break;
            
                default:
                    break;
            }
        },
        toolbarItemClickDisplay(data){
            switch (data.index) {
                case 0://新增方案
                    {
                        let modal = this.$refs.DialogSchemeAdd;
                        this.$set(this.qwModalFormSchemeAdd.qwForm,"mod","display");
                        modal.showModal();
                    //    this.qwModalFormSchemeAdd
                    }
                    break;
                case 1://重命名
                    {                        
                        this.setRenameDialogConfigAndShow("display")
                    }
                    break;
                case 2://查询排版
                    {                        
                        let model=this.getFilter(0);
                        let version = this.getFilter(1);
                        if(!model){
                            this.$message.error("请选择指定的数据模型！");                                
                            return;
                        }
                        if(!version){
                            this.$message.error("请选择指定的模型版本！");                                
                            return;
                        }
                        let schemeLen =   this.configFilterDisplay[0].items.length;
                        if(schemeLen<1){
                            this.$message.error("请先创建至少1条显示方案！")
                            return;
                        }                     
                        let scheme = this.configFilterDisplay[0].items[this.configFilterDisplay[0].activeIndex];
                        if(!scheme){
                            this.$message.error("请选择指定的显示方案！");
                            this.setNoData(true);
                            return;
                        }
                        
                        this.DialogInfoCommon.dialogVisible=true;
                        setTimeout(() => {
                            this.$refs.DialogInfoDisplayBody.init({mod:"edit",tree:{loadTreeAction: structureList,params:{ modelId: model.id,versionId: version.id }, model:model, version:version,scheme:scheme}})
                        }, 30); 
                    }
                    break;
                case 3://删除
                    {                        
                        let item =this.configFilterDisplay[0].items[this.configFilterDisplay[0].activeIndex];
                        this.$confirm('该操作将删除方案“' + item.label + '”？', '数据删除提示', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                        })
                        .then(() => {
                            let params = {ids:item.id}
                            displaySchemeDel({Vue:this,params:params}).then(res=>{
                                this.$message.success("操作成功！");
                                this.toolbarItemClick({group:"right",index:this.configToolbar.info.rgroup.activeIndex })
                            })
                        })
                        .catch(action => {
                            
                        });
                    }
                    break;
            
                default:
                    break;
            }
        },
        toolbarItemClickManage(data){
            switch (data.index) {
                case 0://新增方案
                    {
                        let modal = this.$refs.DialogSchemeAdd;
                        this.$set(this.qwModalFormSchemeAdd.qwForm,"mod","manage");
                        modal.showModal();
                    }
                    break;
                case 1://重命名
                    {                        
                         this.setRenameDialogConfigAndShow("manage")
                    }
                    break;
                case 2://查询排版
                    {                        
                        let model=this.getFilter(0);
                        let version = this.getFilter(1);
                        if(!model){
                            this.$message.error("请选择指定的数据模型！");                                
                            return;
                        }
                        if(!version){
                            this.$message.error("请选择指定的模型版本！");                                
                            return;
                        }
                        let schemeLen =   this.configFilterManage[0].items.length;
                        if(schemeLen<1){
                            this.$message.error("请先创建至少1条显示方案！")
                            return;
                        }                     
                        let scheme = this.configFilterManage[0].items[this.configFilterManage[0].activeIndex];
                        if(!scheme){
                            this.$message.error("请选择指定的显示方案！")
                            return;
                        }
                        
                        this.DialogInfoCommon.dialogVisible=true;
                        setTimeout(() => {
                            this.$refs.DialogInfoManageBody.init({mod:"edit",tree:{loadTreeAction: structureList,params:{ modelId: model.id,versionId: version.id }, model:model, version:version,scheme:scheme}})
                        }, 30);
                    }
                    break;
                case 3://删除
                    {                        
                        let item =this.configFilterManage[0].items[this.configFilterManage[0].activeIndex];
                        this.$confirm('该操作将删除方案“' + item.label + '”？', '数据删除提示', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                        })
                        .then(() => {
                            let params = {ids:item.id}
                            maintainSchemeDel({Vue:this,params:params}).then(res=>{
                                this.$message.success("操作成功！");
                                this.toolbarItemClick({group:"right",index:this.configToolbar.info.rgroup.activeIndex })
                            })
                        })
                        .catch(action => {
                            
                        });
                    }
                    break;
            
               default:
                    break;
            }
        },
        getQuerySchemeList(){
            let model=this.getFilter(0);
            if(!model){
                this.$message.error("请选择指定的模型！")
                this.setNoData(true);
                return;
            }
            let version = this.getFilter(1);
            if(!version){
                this.$message.error("请选择指定的版本！");
                this.setNoData(true)
                return;
            }
            let params ={
                versionId: version.id,
                modelId: model.id
            }
            querySchemeList({Vue:this,params:params}).then(res=>{
                if(res.model){
                    let temp = [];
                    for(let item of res.model){
                        temp.push({ ...item, label: item.alias?item.alias :'未命名方案_'+ item.id })
                    }
                    this.$set(this.configFilterQuery[0], "items",temp);
                    if(this.formSearchConfig.formData.querySchemeId>0){
                        let tag =false;
                        for(let attr in temp){
                            if(temp[attr].id==this.formSearchConfig.formData.querySchemeId){
                                this.$set(this.configFilterQuery[0], "activeIndex",attr);
                                tag=true;
                                break;
                            }
                        }
                        if(!tag){
                            this.$set(this.configFilterQuery[0], "activeIndex",0);
                        }
                    }else{
                        this.$set(this.configFilterQuery[0], "activeIndex",0);
                    }
                    if(temp.length==0){
                        this.qwFormConfigQuery=null;
                    }else{
                        this.getQueryDesign();
                    }
                }
            })
            // alert("自定义查询")
        },
        getDisplaySchemeList(cb = ()=>{}){
            let model=this.getFilter(0);
            if(!model){
                this.$message.error("请选择指定的模型！")
                this.setNoData(true);
                return;
            }
            let version = this.getFilter(1);
            if(!version){
                this.$message.error("请选择指定的版本！");
                this.setNoData(true)
                return;
            }
            let params ={
                versionId: version.id,
                modelId: model.id
            }
            displaySchemeList({Vue:this,params:params}).then(res=>{
                if(res.model){
                    let temp = [];
                    for(let item of res.model){
                        temp.push({ ...item, label: item.alias?item.alias :'未命名方案_'+ item.id })
                    }
                    this.$set(this.configFilterDisplay[0], "items",temp);
                    this.$set(this.configFilterDisplay[0], "activeIndex",0);
                    if(temp.length==0){
                        this.$set(this.table,"tableConfig",null);
                        this.qwFormConfigDisplay=null;
                    }else{

                        this.getDisplayDesign(cb)
                    }
                }
            })
        },
        getDisplayDesign(cb=()=>{}){
            let model=this.getFilter(0);
            let version=this.getFilter(1);
            if(!model || (!version)){
                return;
            }else{
                let scheme = this.configFilterDisplay[0].items[this.configFilterDisplay[0].activeIndex];
                if(!scheme){
                    this.$message.error("请先选择指定的查询方案！");
                    return;
                }
                let params ={
                    versionId:version.id,
                    modelId:model.id,
                    schemeId:scheme.id
                }
                displayDesignGet({Vue:this,params:params}).then(res=>{
                    if(res.model){
                        if(res.model.config){
                            let config_=JsonParse(res.model.config);
                            if(!config_){
                                this.$message.error("配置解析失败！请重新编辑该查询方案！")                                
                            }else{
                                if('function'== typeof(cb)){
                                    // this.curDisplayDesign=res.model;
                                    setTimeout(() => {
                                        cb();    
                                    }, 10);  
                                }
                                this.qwTableConfigDisplay=config_.configView;
                            }
                        }else{
                            // this.curDisplayDesign=null;
                            this.$set(this.table,"tableConfig",null);
                            this.qwFormConfigDisplay=null;
                            this.qwTableConfigDisplay = null;
                        }
                        
                        
                    }
                })
            }
        },
        getManageSchemeList(){
            let model=this.getFilter(0);
            if(!model){
                this.$message.error("请选择指定的模型！")
                this.setNoData(true);
                return;
            }
            let version = this.getFilter(1);
            if(!version){
                this.$message.error("请选择指定的版本！");
                this.setNoData(true)
                return;
            }
            let params ={
                versionId: version.id,
                modelId: model.id
            }
            maintainSchemeList({Vue: this, params: params}).then(res=>{
                if(res.model){
                    let temp = [];
                    for(let item of res.model){
                        temp.push({ ...item, label: item.alias?item.alias :'未命名方案_'+ item.id })
                    }
                    this.$set(this.configFilterManage[0], "items",temp);
                    this.$set(this.configFilterManage[0], "activeIndex",0);
                    if(temp.length==0){
                        this.qwFormConfigManage=null
                    }else{
                        this.getManageDesign();
                    }
                }
            })
        },
        getManageDesign(){
             let model=this.getFilter(0);
             let version=this.getFilter(1);
            if(!model || (!version)){
                return;
            }else{
                let scheme = this.configFilterManage[0].items[this.configFilterManage[0].activeIndex];
                if(!scheme){
                    this.$message.error("请先选择指定的查询方案！");
                    return;
                }
                let params ={
                    versionId:version.id,
                    modelId:model.id,
                    schemeId:scheme.id
                }
                maintainDesignGet({Vue:this,params:params}).then(res=>{
                    if(res.model){
                        if(res.model.config){
                            let config_= JsonParse(res.model.config);
                            if(!config_){
                                this.$message.error("配置解析失败！请重新编辑该查询方案！")
                            }else{
                                this.qwFormConfigManage=config_.configView;
                                if(this.tableDataMod=="edit" && this.tableCurData){
                                    setTimeout(() => {
                                        //将表格数据写入 
                                        let formData = this.qwFormConfigManage.formData;
                                        for(let attr in formData){
                                            if(this.tableCurData[attr.replace('item_',"id_")]){
                                                this.$set(this.qwFormConfigManage.formData,attr, this.tableCurData[attr.replace('item_',"id_")]);
                                            }
                                        }    
                                    }, 30);
                                }
                            }
                        }else{
                            this.qwFormConfigManage = null;
                        }                       
                        
                    }
                })
            }
        },
        getQueryDesign(){
             let model=this.getFilter(0);
             let version=this.getFilter(1);
            if(!model || (!version)){
                return;
            }else{
                let scheme = this.configFilterQuery[0].items[this.configFilterQuery[0].activeIndex];
                if(!scheme){
                    this.$message.error("请先选择指定的查询方案！");
                    return;
                }
                let params ={
                    versionId:version.id,
                    modelId:model.id,
                    schemeId:scheme.id
                }
                queryDesignGet({Vue:this,params:params}).then(res=>{
                    if(res.model){
                        if(res.model.config){
                            let config_=JsonParse(res.model.config);
                            if(!config_){
                                this.$message.error("配置解析失败！请重新编辑该查询方案！")
                            }else{
                                this.qwFormConfigQuery=config_.configView;
                            }
                        }else{
                            this.qwFormConfigQuery = null;
                        }
                        
                        
                    }
                })
            }
        },
        toolbarItemClick(data){
            if(data.group=="right"){
                this.configToolbar.info.rgroup.activeIndex=data.index;
                switch (data.index) {
                    case 0://自定义查询
                        {
                            this.$set(this.DialogInfoCommon,"title","自定义查询")
                            this.getQuerySchemeList();
                        }
                        break;
                    case 1://自定义显示
                        {                            
                            this.$set(this.DialogInfoCommon,"title","自定义显示")
                            this.getDisplaySchemeList()
                        }
                        break;
                    case 2://自定义运维
                        {
                            this.$set(this.DialogInfoCommon,"title","自定义运维")
                            this.getManageSchemeList()
                            // alert("自定义运维")
                        }
                        break;
                
                    default:
                        break;
                }
            }
            
        },
        pageChange(){
            this.getTableData();
        },
        sizeChange(){
            this.getTableData();
        },
        showData(isWithDisplay=false,id=-1){
            if(isWithDisplay){
                switch (id) {
                    case 0:
                        {        
                            let form = this.$refs.qwFormQuery;
                            if(form){
                                let tag =false;
                                for(let attr in form.config.formData){
                                    if(form.config.formData[attr]!=''){
                                        tag=true;
                                        break;
                                    }
                                }
                                if(!tag){
                                    this.$message.error("查询条件不能为空");
                                }else{                                    
                                    let scheme = this.configFilterQuery[0].items[this.configFilterQuery[0].activeIndex];
                                    this.$set(this.configToolbar.info.rgroup,"activeIndex",-1);
                                    setTimeout(() => {                                
                                        this.$set(this.formSearchConfig.formData,this.formSearchConfig.items[1].key,scheme.id);
                                        this.refreshCurData(JSON.parse(JSON.stringify(form.config.formData)));
                                    }, 0);

                                }
                            }   
                        }
                        break;
                    case 1:{
                        let scheme = this.configFilterDisplay[0].items[this.configFilterDisplay[0].activeIndex];
                            this.$set(this.configToolbar.info.rgroup,"activeIndex",-1);
                            setTimeout(() => {
                                this.$set(this.formSearchConfig.formData,this.formSearchConfig.items[0].key,scheme.id);
                                this.refreshCurData();
                            }, 0);
                    }break; 

                    default:
                        break;
                }
            }else{
                switch (id) {
                    case 0:
                        {
                            this.$set(this.formSearchConfig.formData,"querySchemeId","");
                        }
                        break;
                    default:
                        break;
                }
                this.$set(this.configToolbar.info.rgroup,"activeIndex",-1);
            }
            
        },
        addData(data){
            this.tableDataMod="add";            
            this.$set(this.configToolbar.info.rgroup,"activeIndex",2);
            this.toolbarItemClick({group:"right",index:this.configToolbar.info.rgroup.activeIndex })
        },
        editData(data){
            this.tableDataMod="edit";
            this.tableCurData=data.val;
            this.$set(this.configToolbar.info.rgroup,"activeIndex",2);
            this.toolbarItemClick({group:"right",index:this.configToolbar.info.rgroup.activeIndex })
        },
        delData(data){
            let params = {id : data.val.id};
            dataDomainDel({Vue:this,params:params}).then(res=>{
                this.$message.success("操作成功！");  
                this.table.tableData.splice(data.index,1);
            })
        },
        initTableConfig(searchData = null){
            if(!this.curDisplayScheme){
                this.$message.error("请选择指定的显示方案！");
                this.setNoData(true);                
                return;
            }else{
                let params = {
                    modelId: this.curDisplayScheme.modelId,
                    varsionId: this.curDisplayScheme.versionId,
                    schemeId: this.curDisplayScheme.id
                }
                displayDesignGet({Vue:this,params}).then(res=>{
                    if(res.model.config){
                        let config= JsonParse(res.model.config);
                            if(config){
                                config.configView.isPage=true;
                                config.configView.colConfig.push({
                                    type:'btnsTextWithMethod',
                                    label:"操作",
                                    fields:[
                                        {
                                            name:"新增",
                                            method:"add"
                                        },
                                        {
                                            name:"编辑",
                                            method:"edit"
                                        },
                                        {
                                            name:"删除",
                                            method:"del"
                                        },
                                    ]
                                })
                                // this.this.curDisplayDesign=res.model;
                                this.$set(this.table,'tableConfig',config.configView);
                                this.$set(this.table,'tableData',[]);
                                this.getTableData(searchData);
                            }else{
                                this.$message.error("显示方案解析失败！请刷新重试~");
                                this.setNoData(true);
                                // alert("noData");
                            }
                    }else{
                        // alert('nodata')
                        this.setNoData(true)
                    }
                   
                })
            }
        },
        getTableData(searchData = null){
            let dataDomain ={}
            let params;
            if(searchData){
                console.log("searchData==>",searchData)
                for(let attr in searchData){
                    if(''!=searchData[attr])dataDomain[attr.replace(/^item_/,'')] = searchData[attr]
                }
                // params = {
                //     versionId: this.curQueryScheme.versionId,
                //     modelId: this.curQueryScheme.modelId,
                //     schemeId: this.curQueryScheme.id
                // } 
                // queryDesignGet({Vue:this,params:params}).then(res=>{
                //     console.log("getTableData=this.curQueryScheme=>",res.model.structureIds);
                // })
            }
            params={
                    pageSize : this.table.tableConfig.pageSize,
                    pageNo   : this.table.tableConfig.pageNo,
                    modelId: this.curDisplayScheme.modelId,
                    versionId: this.curDisplayScheme.versionId,
                    displaySchemeId: this.curDisplayScheme.id
            }
            params.dataDomain= JSON.stringify(dataDomain);
            // 待完成...查询条件未添加
            // for(let item of this.table.tableConfig.colConfig){
            //     if(item.type=="text"){
            //         params.dataDomain[item.field.replace("item_","a_")] 
            //     }
            // }
            dataDomainGridDefined({Vue:this,params:params}).then(res=>{
                this.$set(this.table.tableConfig,"total",res.model.numRows);
                if(res.model.numRows>0){
                    this.$set( this.table.tableConfig,"numRows",res.model.numRows);
                    let temp = [];
                    for(let item of res.model.items){
                        for(let attr in item){
                            if(/^\"/.test(item[attr]) && (/\"$/.test(item[attr]))){
                                item[attr] = item[attr].replace(/^\"/,"").replace(/\"$/,"")
                            }
                        }
                        temp.push(item);
                    }
                    this.$set( this.table,"tableData" ,temp);
                    this.$set(this.table.tableConfig,"loadShow",false)
                }else{
                    this.$set(this.table,"tableData" , []);
                }
                
                this.$set(this.table.tableConfig,"loadShow",false)
            })
        },
        refreshTable(){            
            this.$set(this.configToolbar.info.rgroup,"activeIndex",-1);
            this.$set(this.table,'tableData',[]);
            this.getTableData();
        },
        doAppenedData(){
            let form =this.$refs.qwformAppenedData;
            if(form){
                form.validate(()=>{
                    let model=this.getFilter(0);
                    let version= this.getFilter(1);
                    let params = {
                        modelId: model.id,
                        versionId: version.id,
                        dataDomain:"",
                    }
                    let formData = form.config.formData;
                    let tag =false;
                    let dataDomain = {};
                    for(let attr in formData){
                        if(formData[attr]!=""){
                            tag=true;
                            dataDomain[attr.replace("item_","a_")] = formData[attr]
                        }
                    }                    
                    if(!tag){
                        this.$message.error("新增数据请至少包含1条非空数据！");
                        return;
                    }else{
                        params.dataDomain = JSON.stringify(dataDomain);
                        if(this.tableDataMod=="add"){
                             dataDomainAdd({Vue:this,params:params}).then(res=>{
                                this.$message.success("操作成功！");
                                form.resetForm();
                                this.refreshTable();
                            })
                        }else if(this.tableDataMod=="edit"){
                            params.id= this.tableCurData.id;
                            dataDomainEdit({Vue:this,params:params}).then(res=>{
                                this.$message.success("修改成功！")
                                form.resetForm();
                                this.refreshTable();
                            })
                        }
                       
                    }
                })
            }
        },
        /*初始化筛选下拉框*/ 
        InitSearchDropDown(){
            let model = this.getFilter(0);
            let version = this.getFilter(1);
            if(!model||(!version)){
                return
            }else{
                let params = {
                    modelId:model.id,
                    versionId:version.id
                }
               
                displaySchemeList({Vue:this,params:params}).then(res=>{
                     if(res.model){
                        let temp=[];
                        for(let item of res.model){
                            temp.push({...item, label:item.alias,value:item.id});
                        }
                        // this.$set(this.formSearchConfig.items[1].dropDown,'data',temp)
                        this.$set(this.formSearchConfig.items[0].dropDown,'data',temp)
                        if(temp.length>0){
                             this.$set(this.formSearchConfig.formData,"displaySchemeId",temp[0].value);
                        }else{
                            this.$set(this.formSearchConfig.formData,"displaySchemeId","");
                        }
                    }
                    querySchemeList({Vue:this,params:params}).then(res=>{
                        if(res.model){
                            let temp=[];
                            for(let item of res.model){
                                temp.push({...item, label:item.alias,value:item.id});
                            }
                            // this.$set(this.formSearchConfig.items[0].dropDown,'data',temp)
                            this.$set(this.formSearchConfig.items[1].dropDown,'data',temp)
                            this.$set(this.formSearchConfig.formData,"querySchemeId","");
                            this.refreshCurData();
                        }
                    })

                })
            }
        },
        refreshCurData(searchData = null){
            let val = this.formSearchConfig.formData.querySchemeId;
            let schemeList;
            if(val){
                schemeList = this.formSearchConfig.items[1].dropDown.data;
                for(let item of schemeList){
                    if(val== item.value){
                        this.curQueryScheme = item;
                        break;
                    }
                }
            }else{
                 this.curQueryScheme = null;
            }               
            val = this.formSearchConfig.formData.displaySchemeId; 
            if(val){
                schemeList = this.formSearchConfig.items[0].dropDown.data;
                for(let item of schemeList){
                    if(val== item.value){
                        this.curDisplayScheme = item;
                        break;
                    }
                }
            }else{
                this.curDisplayScheme = null;
            }
            this.initTableConfig(searchData); 
        },
        formSearchItemChanged(data){
            switch (data.item.key) {
                case "querySchemeId":
                    {
                        this.$set(this.configToolbar.info.rgroup,'activeIndex',0);
                        this.toolbarItemClick({group:"right",index:this.configToolbar.info.rgroup.activeIndex })
                    }
                    break;
                case "displaySchemeId":
                    {
                        this.refreshCurData();
                    }
                    break;
            
                default:
                    break;
            }            
        }    
    }
}
</script>
<style lang="less">
@import url("../../assets/style/pageCommon.less");
.qwCommonPage{
    .groupItem{
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        min-height: 100px;
        margin-top: 32px;
        position: relative;        
        padding: 42px 0;
        .gr_title{
            color: #333;
            position: absolute;
            left: 24px;
            font-size: 18px;
            line-height: 18px;
            top: -10px;
            margin: 0;
            padding: 0;
            background: #FFF;
        }
        .qwrow +.qwrow{
            margin-top: 30px;
        }
        .qwrow{
            width: 100%;
            box-sizing: border-box;
            line-height: 32px;
            .labelItem{
                display: inline-block;
                .lbl{
                    display: inline-block;
                    width: 150px;
                    text-align: right;
                    font-size: 14px;
                    color: #666;
                    line-height: 32px;
                }
                .val{
                    font-size: 14px;
                    color: #333;
                    line-height: 32px;
                }
            }
        }
    }
    .actionbox_info .el-checkbox__input.is-disabled+span.el-checkbox__label{
        color: #333;
        cursor: pointer;
    }
    .actionbox_info .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
        border-color: #666;
    } .actionbox_info .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner:after{
        border-color: #555;
    }
    .info .el-tree-node__expand-icon.expanded {
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg);
    }
    .info .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
        background-color: #409EFF;
        border-color: #409EFF;
        color: #FFF;
    }
    .info .el-icon-caret-right{
        color: #409EFF;
    }
    .info .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
        border-color: #FFF;
    }
    .groupRbox{
        box-sizing: border-box;
        padding-left: 24px;
    }
    .qwerror{
        margin-left: 10px;
        font-size: 14px;
        position: absolute;
        left: 100%;
        width: 240px;
        top:-4px;
        color: rgb(245, 108, 108);
        line-height: 32px;
    }
    .formBox{
        padding: 64px 0 0 0;
        .formP{
            display:table;
            width:100%;
        }
    }
    .commonBtn{
        border-radius: 0;
        min-width: 88px;
    }
    .pFr{
        text-align:right;
        margin-top:32px;
    }
}
</style>


