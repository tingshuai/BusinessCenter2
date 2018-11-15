<template>
<div class="qwCommonPage">
<modelTree ref="modelTree" :config="treeConfig" @delNode="BeforNodeDelete" @nodeLabelClicked="nodeLabelClicked"></modelTree>
<div class="rbox">
    <!-- 过滤条件 -->
    <div class="filterBlock">
        <div class="filterGroup" v-for="(item,i) in configFilter" :key="i">
            <div class="l">
                <h3 class="fTitle">{{item.title}}</h3>
            </div>
            <div class="r">
                <div class="qwBtns" style="min-height:32px;" :style="(item.show?'height:auto':'height:56px;overflow: hidden;')">
                    <template v-if="configFilter[i].items.length>0">
                         <span v-for="(item2,j) in item.items" :key="j" v-show="(configFilter.curMod=='all')||(configFilter.curMod=='on'&&(item2.isAble==true))||(configFilter.curMod=='off'&&(item2.isAble==false))">
                         <el-button :class="item2.disabled?'is-disabled':''"
                            v-if="configFilter[i].activeIndex==j"
                            type="primary"
                            @click="changFilterActiveIndex(i,j)"
                        >{{item2.label}}</el-button>
                         <el-button  :class="item2.disabled?'is-disabled':''"
                            v-else
                            :plain="true"                            
                            @click="changFilterActiveIndex(i,j)"
                        >{{item2.label}}</el-button>
                    </span>  
                    </template>
                    <template v-else>
                        <span class="nodata">暂无数据</span>
                    </template>
                </div>               
                <el-button  class="showOrHide" type="text" @click="configFilter[i].show=!configFilter[i].show" >{{configFilter[i].show?'收起':'展开'}} <i :class="configFilter[i].show? 'el-icon-arrow-up' :'el-icon-arrow-down'"></i></el-button>
            </div>
        </div>
    </div>
    <!-- 展示模式 -->
    <div class="infoBlock" v-if="configBlock.curMod=='info'" :style="{minHeight:sidebarHeight-230+'px'}">
        <div class="qwToolbar">
            <span class="l">
                <el-button-group class="qwToolGroup">
                    <el-button v-for="(item,i) in configBlock.modInfo.group.items" @click="changeToobarFilter(i)" :key="i" :class="configBlock.modInfo.group.activeIndex==i?'active':''"> {{item.title}}  </el-button>
                </el-button-group>
            </span>
            <span class="r">  
                <el-button
                    :class="configBlock.modInfo.rgroup.activeIndex==i?'active':''"
                    v-for="(item,i) in configBlock.modInfo.rgroup.items"
                    :key="i"
                    :type="item.type" 
                    :plain="true"
                    :disabled="item.disabled"
                    @click="changeMod(item,i)"
                >{{item.title}}</el-button> 
            </span>
        </div>
        <div class="contentBox" style="width:100%;">
            <div class="nodata" v-if="configBlock.isNoData">
                <p style="text-align:center; font-size:14px;color:#666; margin-top:100px;padding-bottom:400px;">暂无数据 <el-button v-if="isAddDataShow" type="primary" @click="toAddModelData" size="mini">添加数据</el-button></p>
            </div>
            <div class="content" v-else style="width:100%;padding-top:26px;">
                <mytable style="margin-top:24px;" :tableConfig="configBlock.modInfo.table.tableConfig" :border="false" :tableData="configBlock.modInfo.table.tableData" @setTag="setTag" @startAble="startAble"  @stopAble="stopAble"></mytable>
            </div>
        </div>
    </div>
    <!-- 编辑模式 -->
    <div class="infoBlock" v-if="configBlock.curMod=='edit'" :style="{minHeight: (sidebarHeight-290) + 'px'}">        
        <div class="qwToolbar">
            <span class="l">
                <el-button-group class="qwToolGroup">
                    <el-button v-for="(item,i) in configBlock.modEdit.group.items" @click="changeToobarFilter(i)" :key="i" :class="configBlock.modEdit.group.activeIndex==i?'active':''"> {{item.title}}  </el-button>
                </el-button-group>
            </span>
            <span class="r">  
                <el-button
                    :class="configBlock.modEdit.rgroup.activeIndex==i?'active':''"
                    v-for="(item,i) in configBlock.modEdit.rgroup.items"
                    :key="i"
                    :type="item.type" 
                    :plain="true"
                    @click="editToolbarRBtnClick(item,i)"
                >{{item.title}}</el-button> 
            </span>
        </div> 
        <div class="contentBox">
             <div class="content"  style="width:100%;padding-top:26px;">
                <mytable style="margin-top:24px;" v-if=" this.treeConfig.curNode && this.treeConfig.curNode.data.id>0" @selectChange="selectChangeTableEdit" :tableConfig="configBlock.modEdit.table.tableConfig" :border="false" :tableData="configBlock.modEdit.table.tableData"  @addLine="addLine"  @delLine="delLine"></mytable>
                <p v-else style="font-size:14px;color:#666;text-align:center;">  请选择指定的数据仓库  </p>
            </div>
        </div>
    </div>

</div>
</div>
</template>
<script>
import qwTree from "../../components/qwform/qwtree.vue"
import qwForm from "../../components/qwform/qwform.vue"
import qwModalForm from "../../components/qwform/qwMoalForm.vue"
import {timestampToTime} from "../dataModel/filter.js"
import mytable from "../../components/tableEx.vue"
import modelTree from "../common/modelTree.vue"

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

    structureList,
    structureGrid,
    structureAdd,
    structureEdit,
    structureAble,
    structureDel,
    structureBatch

} from './api.js';
import {dataType,dataTypeArr,getDataTypeLabelByValue,dataAble} from "../../api/common.js"
export default {
    components:{
        qwTree,
        qwForm,
        qwModalForm,
        mytable,
        modelTree
        
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        }),
        isAddDataShow(){
            return this.treeConfig.curNode&&(this.configFilter[0].items.length>0)&&(this.configFilter[1].items.length>0) 
        }
    },
    data(){
        return {
            emptySrc:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
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
                ],
                dataType:dataType,
            },
            id:0,
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
                    evtNode:null,
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
                                                        this.$refs["modelTree"].loadTree(this.treeConfig.evtNode,this.treeConfig.evtNode.data);
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
                                                        this.treeConfig.evtNode.data=res.model;
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
            
            filterGroupConfig:{
                show:true,
            },
            
            configFilter:[
                {
                    title:"数据模型",
                    activeIndex:0,
                    curMod:'all',
                    show:true,
                    items:[
                        // {
                        //     label:"年度运营数据",
                        //     disabled:true,
                        // },   
                    ]
                }, {
                    title:"版本号",
                    activeIndex:0,
                    curMod:'all',
                    show:true,
                    items:[
                        // {
                        //     label:"年度运营数据",
                        //     disabled:true,
                        // },   
                    ]
                }
               
            ],
            configBlock:{
                curMod:'info',
                isNoData: true,
                modInfo:{                
                    group:{
                        activeIndex:0,
                        items:[
                            {
                                title:'全部',
                            },
                            {
                                title:'只显示启用',
                            },
                            {
                                title:'只显示停用',
                            },
                        ]
                    },
                    rgroup:{
                        activeIndex:0,
                        items:[
                            {
                                title:'新增版本',
                                type:'primary'
                            },
                            {
                                title:'编辑/添加',
                                type:''
                            },
                            {
                                title:'删除',
                                type:''
                            },
                            {
                                title:'启停',
                                type:''
                            }
                        ]
                    },
                    table:{
                        tableConfig: {
                            //操作按钮配置
                            toolbarConfig: [
                            ],
                            //表格字段配置
                            colConfig: [
                            {
                            field: "id",
                            label: "序号",
                            type: "text",
                            minWidth:50
                            },
                            {
                            field: "alias",
                            label: "字段名称",
                            type: "text"
                            },
                            {
                            field: "dataType",
                            label: "数据类型",
                            type: "text",
                            transVal(val){
                                return getDataTypeLabelByValue(val)
                            }
                            },
                            {
                            field: "defaultValue",
                            label: "默认值",
                            type: "text"
                            },
                            {
                            field: "isKey",
                            label: "是否关键字",
                            type: "text",
                            transVal(val){
                                return val?'是':'否'
                            }
                            },
                            {
                            field: "formatInfo",
                            label: "数据格式化",
                            type: "text"
                            },
                            {
                            field: "isAble",
                            label: "启停标识",
                            size:"mini",
                            type: "buttonAble"
                            },
                            {
                            field: "ableBy",
                            label: "启停人",
                            type: "text"
                            },                        
                            { 
                                fields:[
                                    {
                                        name:'启用',
                                        method:'startAble',
                                        showFunc(row){
                                            return row.isAble==false
                                        }
                                    },                                
                                    {
                                        name:'停用',
                                        method:'stopAble',
                                        showFunc(row){
                                            return row.isAble==true
                                        }
                                    },
                                    {
                                        name:'标记关键字段',
                                        method:'setTag',
                                        showFunc(row){
                                        return row.isKey==false
                                        }
                                    },
                                    {  
                                        name:'取消关键字段',
                                        method:'setTag',
                                        showFunc(row){
                                            return row.isKey==true
                                        }
                                    },
                                ],                             
                                minWidth:"100px",
                                label: "操作",
                                type: "btnsTextWithMethod" 
                            }
                            ],
                            isBorder: true,
                            size:'medium',
                            isSelection: false, //是否可选
                            isPage: false, //是否分页
                            currentSelectArr: [], //当前勾选的数据
                            align: "center", //文本对齐方式
                            pageNo: 1,
                            pageSize: 20,
                            total: 0,
                            isHigh: false,
                            isLoading: true, //是否开启loading
                            loadShow: false //loading控制
                        },
                        tableData: [],
                    },
                    content:{
                        title:"年度运维数据",
                        show:false,
                        items:[
                            {   
                                type:'text',
                                label:"模型编码",
                                key:"modelCode",
                                value:""//BM123456789
                            },
                            {   
                                type:'text',
                                label:"模型名称",
                                key:"alias",
                                value:""
                            },
                            {   
                                type:'text',
                                label:"数据授权",
                                key:'isPermission',
                                trasVal(val){
                                    if(val)return "是"
                                    else return "否"
                                },
                                value:""//授权控制
                            },
                            {   
                                type:'text',
                                label:"描述",
                                key:'remark',
                                value:""
                            },
                            {   
                                type:'btns',
                                label:"模型编码",
                                key:'isAble',
                                activeIndex:-1,
                                items:[
                                    {
                                        type:'info',
                                        class:'open',
                                        label:"已启用",
                                        value: true,
                                    },
                                    {
                                        type:'info',
                                        class:'close',
                                        label:"已停用",
                                        value:false
                                    }
                                ]
                            },
                            {   
                                type:'text',
                                label:"启停时间",
                                key:"ableTime",
                                value:""//2018-09-19 12:00:00
                            }
                        ]
                    }
            },
            modEdit:{
                    mod:'add',                
                    group:{
                        activeIndex:0,
                        items:[
                            {
                                title:'全部',
                            },
                            {
                                title:'只显示启用',
                            },
                            {
                                title:'只显示停用',
                            },
                        ]
                    },
                    rgroup:{
                        activeIndex:0,
                        items:[
                            {
                                title:'保存',
                                type:'primary'
                            },
                            {
                                title:'取消',
                                type:''
                            }
                        ]
                    },
                    table:{
                        tableConfig: {
                            //操作按钮配置
                            toolbarConfig: [
                            // {
                            // icon: "circle-plus",
                            // disabled: false,
                            // method: "add",
                            // name: "新增",
                            // type:'primary'
                            // },
                           
                            ],
                            //表格字段配置
                            colConfig: [
                            {
                                field: "id",
                                label: "序号",
                                type: "text"
                            },
                            {
                                field: "alias",
                                label: "字段名称",
                                type: "input"
                            },
                            {
                                field: "dataType",
                                label: "数据类型",
                                type: "select",
                            },
                            {
                                field: "defaultValue",
                                label: "默认值",
                                type: "input"
                            },
                            {
                                field: "formatInfo",
                                label: "数据格式化",
                                type: "select"
                            },
                            {
                                field: "isAble",
                                label: "启停标识",
                                type: "select"
                            },
                            // {
                            //     field: "ableBy",
                            //     label: "启停人",
                            //     type: "input"
                            // },                        
                            { fields:[
                                {
                                    name:'新增行',
                                    method:'addLine',
                                    showFunc(row){
                                      return true
                                    }
                                },                                
                                {
                                    name:'删除行',
                                    method:'delLine',
                                    showFunc(row){
                                        return true;
                                    }
                                },
                            ], label: "操作", type: "btnsTextWithMethod" }
                            ],
                            isBorder: true,
                            size:'medium',
                            isSelection: false, //是否可选
                            isPage: false, //是否分页
                            currentSelectArr: [], //当前勾选的数据
                            align: "center", //文本对齐方式
                            pageNo: 1,
                            pageSize: 20,
                            total: 0,
                            isHigh: false,
                            isLoading: true, //是否开启loading
                            loadShow: false //loading控制
                        },
                        tableData: [],
                    },
                    content:{
                        title:"年度运维数据",
                        formConfig:{      
                                labelWidth: 80,
                                itemWidth:340,
                                itemSpan:24,
                                formLabelAlign:'right',
                                items:[
                                    {   
                                        colStyle:"",
                                        key:"modelCode",
                                        type:"input",
                                        name:"模型编码",
                                        disabled:false,
                                        clearable:true,
                                        suffixIcon:"",
                                        prefixIcon:"",
                                        maxLength:40,
                                        minLength:0,
                                        rows:1,//textarea适用
                                        autoComplete:"off",
                                        readonly:false,
                                        rules:[{required:true,message:"请输入模型编码",trigger:["input","change","blur"]}],
                                    },
                                    {   
                                        colStyle:"",
                                        key:"alias",
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
                                        rules:[{required:true,message:"请输入模型名称",trigger:["input","change","blur"]}],
                                    },
                                    {
                                        key:"isPermission",
                                        type:"radio",
                                        name:"模型授权",
                                        items:[{
                                            label:'暂无控制',
                                            value:'2',
                                            disabled:false,
                                        },{
                                            label:'权限控制',
                                            value:'1',
                                            disabled:false,
                                        }],
                                        rules:[{required:true,message:"请选择模型授权",trigger:["input","change","blur"]}],
                                    },{
                                        key:"remark",
                                        type:"textarea",
                                        name:"描述",
                                        span:24,
                                        width:340,
                                        disabled:false,
                                        clearable:true,
                                        suffixIcon:"",
                                        prefixIcon:"",
                                        maxLength:40,
                                        minLength:0,
                                        rows:3,//textarea适用
                                        autoComplete:"off",
                                        readonly:false,
                                        rules:[{required:true,message:"请输入描述",trigger:["input","change","blur"]}],
                                    },
                                    {
                                        key:"isAble",
                                        type:"radio",
                                        name:"启停标识",
                                        items:[{
                                            label:'启用',
                                            value:'1',
                                            disabled:false,
                                        },{
                                            label:'停用',
                                            value:'2',
                                            disabled:false,
                                        }],
                                        rules:[{required:true,message:"请选择启停标识",trigger:["input","change","blur"]}],
                                    },
                                   
                                ],
                                formData:{
                                    modelCode:"",
                                    alias:"",
                                    isPermission:"",
                                    remark:"",
                                    fTimeCreate:"",
                                    fTimeUpdate:"",
                                    isAble:"",
                                    ableTime:"",
                                },
                                formBtns:[],
                                eventCB:[]
                        }
                    }
                }
            }            
        }
    },
    // watch:{
    //     treeData:{
    //         handler(new_,old_){
    //             console.log('new_===><',this.recursion(new_));
    //         },
    //         deep:true
    //     }
    // },
    mounted(){
        // this.init();
    },
    methods:{
        BeforNodeDelete(data){
            if(data.node==this.treeConfig.curNode){
                let id=data.node.parent.data.id;
                if(data.node.parent.data.children.length>1){
                    for(let item of data.node.parent.data.children){
                        if(item.id!=data.nodeData.id){
                            id=item.id;
                            break;
                        }
                    }
                }
                data.node.remove(data.nodeData);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                setTimeout(() => {
                    let label=data.self.$refs["qwModelTreeLabel_" + id];
                    if(label)label.click();
                }, 30);
            }else{
                data.node.remove(data.node.data.id);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }
            
        },
        /*初始化*/
        // init(){
        //     let node=this.$refs['lTree'].$children[0].node;
        //     let data=node.data;
        //     this.loadTree(node,data);
        // },
        /*数据仓库详情*/
        // nodeDetail(node,data){
        //     console.log(data);
        //     let modal=this.$refs.qwModalFormTreeSee;
        //     if(modal){
        //         modal.showModal()
        //         setTimeout(() => {
        //             this.treeDialogConfigSee.qwForm.formData=JSON.parse(JSON.stringify(data));
        //         }, 30);
        //     }
        // },
        /*筛选tree数据*/
        // filterNode(value,data) {
        //     if(data.id==0){
        //         return true;
        //     }else{
        //         if(value.status==0){
        //             if(value.keyWords!=""){
        //                  return data.label.indexOf(value.keyWords)>=0;
        //              }else{
        //                  return true;
        //             }
        //          }else{
        //             let tag= value.status==1? true:false;
        //              if(data.isAble==tag){
        //                  if(value.keyWords!=""){
        //                      return data.label.indexOf(value.keyWords)>=0;
        //                  }else{
        //                      return true;
        //                  }
        //              }
        //         }
        //     }
        // },
        /*筛选参数改变函数*/
        // treeStatusChange(data){
        //     this.$refs["lTree"].filter(this.treeFilter);
        // },
        // /*数据仓库启停设置*/
        // setAble(node, data){
        //     let params={id: data.id,isAble:!data.isAble}
        //     warehouseAble({Vue:this,params:params}).then(res=>{
        //         if(res.result){
        //             node.data={...node.data, ...res.model};
        //             this.$message.success("操作成功！")
        //             console.log("tag001===>",res)
        //         }
        //     })
        // },
        /*数据仓库数据转换为treeData数据*/
        // transModel(model){
        //     let temp=[];
        //     for(let item of model){
        //         temp.push({...item,label:item.alias,children:[]})
        //     }
        //     return temp;
        // },
        // /*加载树子元素*/
        // loadTree(node,data){
        //     node.loading=true;
        //     node.loaded=false;
        //     warehouseList({Vue:this,params:{parentId:data.id}}).then(res=>{
        //         if(res.model.length>0){
        //             this.maxLevel= this.maxLevel> (node.level+1)? this.maxLevel :node.level+1;
        //             if(undefined==data.children)data.children=[];
        //             let temp = this.transModel(res.model);
        //             for(let attr in data.children){
        //                 for(let attr2 in temp){
        //                     if(data.children[attr].id == temp[attr2].id){
        //                         temp.splice(attr2,1);
        //                     }
        //                 }
        //             }
        //             for(let item of temp){
        //                 data.children.push(item);
        //             }
        //             node.expanded=true;
        //             node.loading=false;
        //             node.loaded=true;
        //               setTimeout(() => {
        //                 if(data.id==0){
        //                     let label=this.$refs["qwModelTreeLabel_"+res.model[0].id];
        //                     if(label)label.click();
        //                 }    
        //             }, 30);
        //         }else{
        //             if(data.id==0){
        //                 this.$message.error("暂无数据仓库数据！");
        //             }
        //             node.loading=false;
        //             node.loaded=true;
        //         }
        //     },e=>{
        //         node.loading=false;
        //         node.loaded=false;
        //     })
          
        // },
        // /*点击图标展开收起或加载子树*/
        // changeExpended(node,data){
        //     if(node.loaded){
        //         node.expanded = !node.expanded;
        //     }else{
        //         this.loadTree(node,data);
        //     }
        // },
        /*转换为筛选按钮数据*/
        transFilterBtnData(data){
            let temp=[];
            for(let item of data){
                item.label=item.alias;
                item.disabled=!item.isAble
                temp.push(item);
            }
            return temp;
        },
        //点击标题
        nodeLabelClicked(node,data){
            this.treeConfig.curNode=node;
            let params = {warehouseId: node.data.id}
            dataModelList({Vue:this,params:params}).then(res=>{
                if(res.result){
                    this.changeToobarFilter(0);
                    this.configFilter[0].items=res.model;
                    if(res.model.length==0){
                        this.setNodata(true);
                        this.configBlock.curMod="info" 
                        this.$set(this.configFilter[1],"items",[]);
                        this.$set(this.configFilter[1],"activeIndex",0);
                        setTimeout(() => {
                            this.resetEditData();    
                        }, 30); 
                        this.$set(this.configFilter[1],"activeIndex",0);
                        this.$set(this.configFilter[1],"items",[]);                 
                    }else{
                        this.configFilter[0].items=this.transFilterBtnData(res.model);
                        this.configBlock.curMod="info";
                        this.$set(this.configBlock.modInfo.table,"tableData",[])   
                        this.$set(this.configBlock.modEdit.table,"tableData",[]);                   
                        this.changFilterActiveIndex(0,0);
                    }
                }
            })
        },
        setNodata(tag=false){
            if(tag){
                this.configBlock.isNoData = true;
                this.configBlock.modInfo.rgroup.items[1].disabled=false;
                this.configBlock.modInfo.rgroup.items[2].disabled=true;
                this.configBlock.modInfo.rgroup.items[3].disabled=true;
                this.$set(this.configBlock.modInfo.table,"tableData",[])   
                this.$set(this.configBlock.modEdit.table,"tableData",[]);   
            }else{
                this.configBlock.isNoData = false;
                this.configBlock.modInfo.rgroup.items[1].disabled=false;
                this.configBlock.modInfo.rgroup.items[2].disabled=false;
                this.configBlock.modInfo.rgroup.items[3].disabled=false; 
            }
        },
        // tree needed
        //获取最深层deep
        // recursion(obj){
        //     let num =0,
        //     qwTreeDataRec=(obj,k)=>{
        //         num = Math.max(num,k);
        //         console.log('num==>',num);
        //         if (obj.list)
        //             obj.list.forEach(function(v, i){
        //                 qwTreeDataRec(v,k+1);
        //             });
        //     }
        //     qwTreeDataRec(obj,1);            
        //     return num;
        // },
        // nodeInputBlur(node,data){
        //     if(data.label=="")data.label="选项"+data.id;
        //     this.curData.isEdit=false;
        // },
        // //真实加载节点
        // loadNode(node,data,fun=()=>{}){
        //     const newChild = { id: this.id++,pid:data.id, isEdit:false, label: "选项" + this.id, children: [] };
        //     if (!data.children) {
        //         this.$set(data, 'children', []);
        //     }
        //     data.children.push(newChild);
        //     if('function'==typeof(fun))fun(node,data)
        //     node.loading=false;
        //     node.loaded=true;            
        //     console.log("loadNode")


        // },
        //真实添加1条数据
        // addNode(node,data){
        //      this.maxLevel=this.maxLevel>node.level? this.maxLevel : node.level;
        //         const newChild = { id: this.id++,pid:data.id, isEdit:false, label: "选项" + this.id, children: [] };
        //         if (!data.children) {
        //             this.$set(data, 'children', []);
        //         }
        //         data.children.push(newChild);
        //         node.expanded=true;
        // },
        // closeTreeModal(){
        //     let modal=this.$refs['qwModalFormTree'];
        //     modal.closeModal();
        //     setTimeout(() => {
        //         modal.resetForm();
        //     }, 30); 
        // },
        // closeTreeModal2(){
        //     let modal=this.$refs['qwModalFormTreeEdit'];
        //     modal.closeModal();
        //     setTimeout(() => {
        //         modal.resetForm();
        //     }, 30); 
        // },
        // append(data,node) {
        //     let modal=this.$refs['qwModalFormTree'];
        //     modal.showModal();
        //     this.treeConfig.curNode=node;
        //     setTimeout(() => {
        //         let treeIdPath =data.id==0? '' : ((data.treeIdPath? data.treeIdPath : '')+'/'+data.id);
        //         let treeNamePath = data.id==0? '':((data.treeNamePath? data.treeNamePath :'')+'/'+data.label);
        //         modal.setFormData({ pname : data.label,name : "",pid:data.id,treeIdPath:treeIdPath,treeNamePath:treeNamePath});
        //         setTimeout(() => {
        //             modal.clearValidate();
        //         }, 30);
        //     }, 30);                      
        // },
        // setEditById(treeData,id){
        // if(!treeData)return;
        //     for(var i=0;i<treeData.length;i++) {
        //         var td = treeData[i];
        //         if(td.id==id) {
        //             td.isEdit=true;
        //         }else{
        //             td.isEdit=false;
        //         }
        //         if(td.children&&td.children.length){
        //             this.setEditById(td.children,id)
        //         }
        //     }
        // },
        // findByNodeId(treeData,id){
        //     if(!treeData)return;
        //     for(var i=0;i<treeData.length;i++) {
        //         var td = treeData[i];
        //         if(td.id==id) {
        //             return td;
        //         }else{
        //         return this.deleteLocalDep(td.children, id);
        //     }
        // }
        // },
        // deleteLocalDep(treeData,data){
        // if(!treeData)return;
        // for(var i=0;i<treeData.length;i++) {
        //     var td = treeData[i];
        //     if(td.id==data.id) {
        //         let temp=JSON.parse(JSON.stringify(treeData));
        //         temp.splice(i,1);
        //         treeData=temp;
        //     return;
        //     }else{
        //     this.deleteLocalDep(td.children, data);
        //     }
        // }
        // },
        // edit(node,data){
        //     console.log(node,data);
        //     let modal=this.$refs['qwModalFormTreeEdit'];
        //     modal.showModal();
        //     this.treeConfig.curNode=node;
        //     setTimeout(() => {
        //         let treeIdPath =data.treeIdPath;
        //         let treeNamePath = data.treeNamePath;
        //         modal.setFormData({
        //             pid:data.parentId,
        //             pname:node.parent.data.label,
        //             name:data.label,
        //             treeIdPath:data.treeIdPath?data.treeIdPath:('/'+node.parent.data.id),
        //             treeNamePath:data.treeNamePath?data.treeNamePath:('/'+node.parent.data.label),
        //         })
        //         modal.clearValidate();  
        //     }, 30);
        // },
        // remove(node, data) {
        //     if(node.level==1){
        //         return;
        //     }   
        //     this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning',
        //         center: true
        //         }).then(() => {
        //             let params={
        //                 ids:data.id
        //             }
        //             warehouseDel({Vue:this,params:params}).then(res=>{
        //                 if(res.result){
        //                     node.remove(data);
        //                     this.$message({
        //                         type: 'success',
        //                         message: '删除成功!'
        //                     });
        //                 }else{
        //                     this.$message({
        //                         type: 'error',
        //                         message: res.message
        //                     });
        //                 }
        //             })                 
        //         }).catch(() => {
        //             this.$message({
        //                 type: 'info',
        //                 message: '已取消删除'
        //             });
        //         });
            
        // return;
        // },
        //filter
        changFilterActiveIndex(i,j){
            this.configFilter[i].activeIndex=j;
            if(i==0){
                this.configBlock.curMod="info"
                let item=this.configFilter[i].items[j];
                if(!item)return;
                let params={modelId:item.id}
                versionList({Vue:this,params:params}).then(res=>{
                    if(res.result){
                        if(res.model.length>0){
                            // this.setNodata(false);
                            for(let attr in res.model){
                                res.model[attr].disabled=!res.model[attr].isAble;
                                res.model[attr].label="版本 " + res.model[attr].versionNo+".0";
                            }
                            this.$set(this.configFilter[1],"items",res.model);
                            this.$set(this.configFilter[1],"activeIndex",0);
                            this.changFilterActiveIndex(1,0);

                        }else{
                            this.$set(this.configFilter[1],"items",[]);
                            this.$set(this.configFilter[1],"activeIndex",0);
                            this.setNodata(true);
                        }
                    }
                })
                // this.configBlock.modEdit.content.title = item.title+'';
                // this.configBlock.modInfo.content.title=item.label;
                // if(/^\d{10,13}$/.test(item.ableTime))item.ableTime=timestampToTime(item.ableTime);
                // for(let attr in this.configBlock.modInfo.content.items){                    
                //     if(this.configBlock.modInfo.content.items[attr].type=='text'){            
                //         this.configBlock.modInfo.content.items[attr].value= item[this.configBlock.modInfo.content.items[attr].key]
                //     } else if(this.configBlock.modInfo.content.items[attr].type=='btns'){
                //          for(let attr2 in this.configBlock.modInfo.content.items[attr].items){
                //              if(this.configBlock.modInfo.content.items[attr].items[attr2].value==item[this.configBlock.modInfo.content.items[attr].key]){
                //                  this.configBlock.modInfo.content.items[attr].activeIndex=attr2;
                //                  break;
                //              }
                //          }
                //     }   
                // }
                this.setNodata(false);
            }else if(i==1){//版本号
                let item=this.configFilter[i].items[j];
                if(!item)return;
                this.loadInfoTableData();
            }
            this.configFilter[i].activeIndex=j;
        },
        toAddModelData(){

            this.changeMod(null,1)
        },
        setEditData(data){
            console.log("setEditData")
            data.isAble=data.isAble==true? '1':'2';
            data.isPermission=data.isPermission==true? '1':'2';
            this.configBlock.modEdit.content.formConfig.formData=JSON.parse(JSON.stringify(data));//Object.assign({...data});
        },
        //infoblock
        /*添加表格数据*/
        addTableData(data=null){
            data=data? data:{
                "id":"",
                "alias":"",
                "dataType":"",
                "defaultValue":"",
                "formatInfo":"",
                "isAble":"",
                "ableBy":"",                
                "select_dataType": dataType,
                "select_formatInfo":[],
                "select_isAble":dataAble,
            }
            this.configBlock.modEdit.table.tableData.push(data);

        },
        /*添加1行数据*/
        addLine(row){
            this.addTableData()
        },
        /*删除1行数据*/
        delLine(data){
            let row = data.val;
            // console.log("delLine====>",row)
            // console.log("this.configBlock.modEdit.mod",this.configBlock.modEdit.mod)
            if(this.configBlock.modEdit.mod=="add"||(this.configBlock.modEdit.mod=="edit")){
                for(let attr in this.configBlock.modEdit.table.tableData){
                    if(row==this.configBlock.modEdit.table.tableData[attr]){
                        if(this.configBlock.modEdit.table.tableData.length>1){
                            if(row.id>0){
                                let params={ids:row.id}
                                structureDel({Vue:this,params:params}).then(res=>{
                                    if(res.result){
                                        this.$message.success("操作成功！");
                                        this.configBlock.modEdit.table.tableData.splice(attr,1);
                                    }
                                })
                            } else{
                                this.configBlock.modEdit.table.tableData.splice(attr,1);
                            }
                        }else{
                            this.$message.error("请至少保留1行数据")
                        }
                        break;
                    }
                }
            }else{
                console.log("delLine mod edit done...")
            }
         
        },
        addVersion(){            
            if(this.configFilter[0].items.length==0){
                this.$message.error("请先添加数据模型");
                return;
            }
            if(!this.treeConfig.curNode){
                this.$message.error("请先选择指定的数据仓库");
                return;
            }
            let params={modelId:this.configFilter[0].items[this.configFilter[0].activeIndex].id,isAble:true}
            versionAdd({Vue:this,params:params}).then(res=>{
                if(res.result){
                    this.nodeLabelClicked(this.treeConfig.curNode,this.treeConfig.curNode.data);
                }
            })
        },
        changeMod(item,i){
            if(i==0){ 
                this.addVersion();
                // this.$set(this.configBlock.modEdit.content.formConfig,"formData", { modelCode:"",  alias:"",  isPermission:"",  remark:"",  fTimeCreate:"",  fTimeUpdate:"",  isAble:"", ableTime:"" })
                // this.resetEditData();
            }else if(i==1){
                if(!this.treeConfig.curNode){
                    this.$message.error("请先选择指定的数据仓库");
                    return;
                }
                if(this.configFilter[0].items.length==0){
                    this.$message.error("请先添加数据模型");
                    return;
                }   
                
                if(this.configFilter[1].items.length==0){
                    this.$message.error("请先添加数据版本");
                    return;
                }
                this.configBlock.curMod="edit"               
                this.configBlock.modEdit.mod="add"
                setTimeout(() => {
                    // alert("编辑")
                    if(this.configBlock.modInfo.table.tableData.length<1){
                        this.configBlock.modEdit.table.tableData=[];
                        this.addTableData()
                    }else{                                                
                        let dataTemp=[];
                        let nullData={
                            "id":"",
                            "alias":"",
                            "dataType":"",
                            "defaultValue":"",
                            "formatInfo":"",
                            "isAble":"",
                            "ableBy":"",                
                            "select_dataType": dataType,
                            "select_formatInfo":[],
                            "select_isAble":dataAble,
                        }
                       
                        for(let attr in this.configBlock.modInfo.table.tableData){
                            //  console.log("tes231313=indexOf==>",this.configBlock.modInfo.table.tableData[attr].dataType,dataTypeArr.indexOf(this.configBlock.modInfo.table.tableData[attr].dataType))
                            if(dataTypeArr.indexOf(this.configBlock.modInfo.table.tableData[attr].dataType)<1)this.configBlock.modInfo.table.tableData[attr].dataType="";//测试
                            this.configBlock.modInfo.table.tableData[attr].select_dataType=JSON.parse(JSON.stringify(dataType));
                            this.configBlock.modInfo.table.tableData[attr].select_formatInfo=[{label:"无",value:"无"}];
                            for(let item of dataType){
                                if( this.configBlock.modInfo.table.tableData[attr].dataType==item.value){
                                    this.configBlock.modInfo.table.tableData[attr].select_formatInfo=JSON.parse(JSON.stringify(item.format));
                                }
                            } 
                            this.configBlock.modInfo.table.tableData[attr].select_isAble=JSON.parse(JSON.stringify(dataAble));
                            dataTemp.push(JSON.parse(JSON.stringify({...nullData,...this.configBlock.modInfo.table.tableData[attr]})))
                        };
                        console.log("dataTemp===>",dataTemp);
                        this.configBlock.modEdit.table.tableData=dataTemp;
                        // this.configBlock.modEdit.table.tableData=JSON.parse(JSON.stringify(this.configBlock.modInfo.tableData));
                    }
                }, 100);
                
                // this.configBlock.modEdit.table.tableData=[];
                // this.addTableData()
                // let data=this.configFilter[0].items[this.configFilter[0].activeIndex];
                // if(!data){
                //     return ;
                // }                
                // this.configBlock.modEdit.mod="edit"
                // setTimeout(() => {
                //     this.setEditData(data);
                // }, 30);
            } else if(i==2) {
                let curItem=this.configFilter[0].items[this.configFilter[0].activeIndex];
                if(!curItem)return;
                let params={ids: curItem.id}
                dataModelDel({Vue:this,params:params}).then(res=>{
                    if(res.result){
                       this.$message.success("操作成功!");
                       this.resetEditData();
                       this.nodeLabelClicked(this.treeConfig.curNode,this.treeConfig.curNode.data) 
                    }
                })
            } else if(i==3){
                let curItem=this.configFilter[0].items[this.configFilter[0].activeIndex];
                if(!curItem)return;
                let params={
                    warehouseId:this.treeConfig.curNode.data.id,
                    modelCode:curItem.modelCode,
                    alias:curItem.alias,
                    isPermission:curItem.isPermission=='1'? true:false,
                    remark:curItem.remark,// fTimeCreate:"",// fTimeUpdate:"",
                    isAble:curItem.isAble==true? false:true,//注意：这里要取反
                    id:curItem.id
                }
                dataModelEdit({Vue:this,params:params}).then(res=>{
                    if(res.result){
                       this.$message.success("操作成功!");
                       this.resetEditData();
                       this.nodeLabelClicked(this.treeConfig.curNode,this.treeConfig.curNode.data) 
                    }
                })
            }
        },
        resetEditData(){
            // this.configBlock.modEdit.table.tableData
            // let form=this.$refs["formEditOrAdd"];
            // if(undefined == form){
            //     return;
            // }else{
            //     setTimeout(() => {
            //         form.resetForm();

            //     }, 100);
            //     form.clearValidate();
            // }            
        },
        //编辑模式下右侧工具条按钮
        editToolbarRBtnClick(item,i){
            if(i==0){
                let tem=[];
                for(let item of this.configBlock.modEdit.table.tableData){
                    if(item.id)tem.push({id:item.id,modelId:this.configFilter[0].items[this.configFilter[0].activeIndex].id,versionId:this.configFilter[1].items[this.configFilter[1].activeIndex].id,alias:item.alias,dataType:item.dataType,defaultValue:item.defaultValue,formatInfo:item.formatInfo,isAble:item.isAble})
                    else tem.push({modelId:this.configFilter[0].items[this.configFilter[0].activeIndex].id,versionId:this.configFilter[1].items[this.configFilter[1].activeIndex].id,alias:item.alias,dataType:item.dataType,defaultValue:item.defaultValue,formatInfo:item.formatInfo,isAble:item.isAble})
                }
                let data=tem;//Object.assign({...tem});
                let params={list:data}
                structureBatch({Vue:this,params:params}).then(res=>{
                    if(res.result){
                        this.$message.success("操作成功!")
                        this.nodeLabelClicked(this.treeConfig.curNode,this.treeConfig.curNode.data);
                    }
                })
                
            }else if(i==1){
                this.nodeLabelClicked(this.treeConfig.curNode,this.treeConfig.curNode.data);
                this.configBlock.curMod="info";
            }
        },
        changeToobarFilter(i){
            let filterMod=["all","on","off"];
            this.configBlock.modInfo.group.activeIndex=i;
            this.configBlock.modEdit.group.activeIndex=i;
            this.configFilter.curMod=filterMod[i];
        },
        loadInfoTableData(){
            let params={
                    modelId:this.configFilter[0].items[this.configFilter[0].activeIndex].id,
                    versionId:this.configFilter[1].items[this.configFilter[1].activeIndex].id
                }
                structureList({Vue:this,params:params}).then(res=>{
                    if(res.model.length>0){
                        this.setNodata(false);
                        this.configBlock.curMod="info";
                        for(let attr in res.model){
                            res.model[attr].isAble_=res.model[attr].isAble_==true?'启用':'停用';
                        }
                        this.configBlock.modInfo.table.tableData=res.model;
                    }else{
                        this.configBlock.curMod="info";
                        this.setNodata(true);
                        this.configBlock.modInfo.table.tableData=[];
                    }
                })
        },
        setAble(data){
            structureAble({Vue:this,params:data}).then(res=>{
                if(res.result){
                    this.$message.success("操作成功！");
                    this.loadInfoTableData();
                }
            })
        },
        startAble(row){
            let data = row.val;
            let params={id:data.id,isAble:!data.isAble}
            this.setAble(params);
            // console.log("startAble",...arguments)
        },
        stopAble(row){
            let data = row.val;
            let params={id:data.id,isAble:!data.isAble}
            this.setAble(params);
        },
        setTag(row){            
            let data = row.val;
            let params={"id":data.id,"isKey":!data.isKey}
            structureEdit({Vue:this,params:params}).then(res=>{
                if(res.result){
                    this.$message.success("操作成功！");
                    this.nodeLabelClicked(this.treeConfig.curNode,this.treeConfig.curNode.data);
                }
            })
        },
        selectChangeTableEdit(data){
            if(data.item.field=="dataType"){
                data.scope.row.formatInfo="";
                data.scope.row.defaultValue="";
                // console.log(data.scope.row)
                for(let item of data.scope.row.select_dataType){
                    if(item.value==data.scope.row.dataType){
                        data.scope.row.select_formatInfo=item.format;
                        // switch (item.value) {
                        //     case "datetime":
                        //         {
                        //             this.
                        //         }
                        //         break;
                        
                        //     default:
                        //         break;
                        // }
                        // console.log("item.value==>",item.value)
                    }
                }                
            }
        },

    }
}
</script>
<style lang="less">
@import url("../../assets/style/pageCommon.less");
</style>


