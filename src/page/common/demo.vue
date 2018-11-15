<template>
<div class="qwCommonPage">
<modelTree ref="modelTree" :config="treeConfig" @nodeLabelClicked="nodeLabelClicked"></modelTree>
<div class="rbox" style="{minHeight:sidebarHeight-136+'px'}">
    <!-- 过滤条件 -->
    <modelFilter ref="modelFilter" @changFilterActiveIndex="changFilterActiveIndex" :config="configFilter"></modelFilter>
    <div class="infoBlock">
      <!-- 工具条 -->
       <!-- 授权表格 -->
    </div>
</div>
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

} from '../dataAuthMehod/api.js';
export default {
    components:{
        qwForm,
        qwModalForm,
        modelTree,
        modelFilter,
        blockToolbar,
        qwDialog,
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        })
    },
    data(){
        return { 
            curRoleNode:null,          
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
                                        console.log("done2",data);
                                        if(data.index==0){
                                            data.self.validate(()=>{
                                                console.log('add done') 
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
                                        style:"width:100px;text-align:center;",
                                        // clicked:(data)=>{
                                        //     console.log("done",data);
                                        // }

                                    }
                                ],
                                eventCB:{//回调事件
                                    formBtnClicked:(data)=>{
                                        if(data.index==0){
                                            data.self.validate(()=>{
                                                console.log('add done') 
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
                        {
                            title:"授权策略",
                            activeIndex:0,
                            filterMod:"all",
                            show:false,
                            items:[
                                // {
                                //     label:"策略1.0",
                                //     disabled:true,
                                // }
                            ]
                        }
                    ],
            // filter config end
          
            // DialogAuthSetting:{
            //             title:"数据授权",
            //             titleStyle:"background:#FFF;",
            //             dialogVisible:false,
            //             width:"1224px",
            //             fullscreen:false,
            //             top:"15vh",
            //             modal:true,//遮罩
            //             modalAppendToBody:true,
            //             appendToBody:false,
            //             lockScroll:true,
            //             customClass:"",
            //             closeOnClickModal:true,
            //             closeOnPressEscape:true,
            //             showClose:true,
            //             center:false,
            //             beforeClose:()=>{
            //                 this.$refs.DialogAuthSettingBody.reset();
            //             }
            // },            
            configBlock:{
                curMod:'info',
               
            },
        }
    },
    mounted(){
        // this.init();
    },
    methods:{
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
                    this.getPermissionSchemeList(this.configFilter[0].items[this.configFilter[0].activeIndex],this.configFilter[data.i].items[data.j])
                }else{
                    this.configFilter[2].items=[];
                    this.configFilter[2].activeIndex=0; 
                    this.setNoData(true);
                }
            }else if(data.i==2){
                this.configFilter[2].activeIndex=data.j;
                this.setNoData(false);
            }
        },
        /*根据filter返回状态设置全局是否可以获取data*/
        setNoData(noData){
            if(noData){//无数据状态
                this.configBlock.curMod="info";
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
                        
                        this.configFilter[2].items=[];
                        this.configFilter[2].activeIndex=0;
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
                        this.configFilter[2].activeIndex=0;
                        this.$set(this.configFilter[2],"items",[]);
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
        toolbarItemClick(data){
             if(data.group=="right"){
                if(this.configBlock.curMod=="info"){//展示模式工具条点击
                    switch (data.index) {
                        case 0://数据授权
                            {
                                let curRole=this.$refs.roleTree.config.curNode
                                let curModel=this.$refs.modelTree.config.curNode
                                console.log(curRole,curModel);
                                if(!curRole ||( curRole && curRole.data.id<1)){
                                    this.$message.error("请选择指定角色！");
                                    break;
                                    return;
                                }
                                if(!curModel ||(curModel && curModel.data.id<1)){
                                    this.$message.error("请选择指定数据仓库！");
                                    break;
                                    return;
                                }
                                const getFilterItems = (index) =>{
                                    return this.configFilter[index].items;
                                }
                                let models =  getFilterItems(0);
                                let versions = getFilterItems(1);
                                let schemes = getFilterItems(2);
                                if(models.length==0){
                                    this.$message.error("当前数据仓库下不存在可用的数据模型！")
                                    break;return;
                                }else if(versions.length==0){
                                    this.$message.error("当前数据模型下不存在可用的版本！")
                                    break;return;
                                }else if(schemes.length==0){
                                    this.$message.error("当前数版本下不存在可用的授权策略！")
                                    break;return;
                                }
                                // 打开模态框
                                this.DialogAuthSetting.title="数据授权 - "+ curRole.data.label;                               
                                this.DialogAuthSetting.dialogVisible = true;
                                setTimeout(() => {
                                    this.$refs.DialogAuthSettingBody.setRole(curRole);
                                }, 30);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        
                
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
}
</style>


