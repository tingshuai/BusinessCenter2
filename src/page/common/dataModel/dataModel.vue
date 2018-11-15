<template>
<div class="qwCommonPage">
<modelTree ref="modelTree" :showMenus="true" :config="treeConfig" @delNode="BeforNodeDelete" @nodeLabelClicked="nodeLabelClicked"></modelTree>
<div class="rbox">
    <!-- 过滤条件 -->
    <div class="filterBlock">
        <div class="filterGroup" v-for="(item,i) in configFilter" :key="i" v-show="(i==0)|| (i>0&&filterGroupConfig.show)" >
            <div class="l">
                <h3 class="fTitle">{{item.title}}</h3>
            </div>
            <div class="r">
                <div class="qwBtns" style="min-height:32px;" :style="(filterGroupConfig.show?'height:auto':'height:32px;overflow: hidden;')">
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
                <el-button  v-if="i==0" class="showOrHide" type="text" @click="filterGroupConfig.show=!filterGroupConfig.show" >{{filterGroupConfig.show?'收起':'展开'}} <i :class="filterGroupConfig.show? 'el-icon-arrow-up' :'el-icon-arrow-down'"></i></el-button>
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
        <div class="contentBox">
            <div class="nodata" v-if="configBlock.isNoData">
                <p style="text-align:center; font-size:14px;color:#666; margin-top:100px;padding-bottom:400px;">暂无数据 <el-button v-if="this.treeConfig.curNode" type="primary" @click="toAddModelData" size="mini">添加数据</el-button></p>
            </div>
            <div class="content" v-else>
                <h2 class="ctitle">{{configBlock.modInfo.content.title}}</h2>
                <p class="row" v-for="(item,i) in configBlock.modInfo.content.items" :key="i">
                    <span class="label">{{item.label}}</span>
                    <span class="val" v-if="item.type=='text'">{{typeof(item.trasVal)=='function'? item.trasVal(item.value) : item.value}}</span>
                    <span class="val" v-if="item.type=='btns'">
                        <el-button v-show="item.activeIndex==j" size="mini" v-for="(item2,j) in item.items" :class="item2.class" :key="j">{{item2.label}}</el-button>
                    </span>
                    
                </p>
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
            <div class="content">
                <!-- <h2 class="ctitle">{{configBlock.modEdit.content.title?}}</h2> -->
                <qwForm ref="formEditOrAdd" v-if="this.treeConfig.curNode && this.treeConfig.curNode.data.id>0" :config="configBlock.modEdit.content.formConfig"></qwForm>
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
import modelTree from "../common/modelTree.vue"

import {timestampToTime} from "./filter.js"
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

} from './api.js';
export default {
    components:{
        qwTree,
        qwForm,
        qwModalForm,
        modelTree,
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        })
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
                ]
            },
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
            // tree dialog end
            configFilter:[
                {
                    title:"数据模型",
                    activeIndex:0,
                    curMod:'all',
                    items:[
                        // {
                        //     label:"年度运营数据",
                        //     disabled:true,
                        // },   
                    ]
                },
               
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
                                title:'新增数据',
                                type:'primary'
                            },
                            {
                                title:'编辑',
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
        // treeData:{
        //     handler(new_,old_){
        //         console.log('new_===><',this.recursion(new_));
        //     },
        //     deep:true
        // }
    // },
    methods:{
        /*数据仓库启停设置*/
        setAble(node, data){
            let params={id: data.id,isAble:!data.isAble}
            warehouseAble({Vue:this,params:params}).then(res=>{
                if(res.result){
                    node.data={...node.data, ...res.model};
                    this.$message.success("操作成功！")
                    console.log("tag001===>",res)
                }
            })
        },
        /*数据仓库数据转换为treeData数据*/
        transModel(model){
            let temp=[];
            for(let item of model){
                temp.push({...item,label:item.alias,children:[]})
            }
            return temp;
        },
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
                        setTimeout(() => {
                            this.resetEditData();    
                        }, 30);                  
                    }else{
                        this.configFilter[0].items=this.transFilterBtnData(res.model);
                        this.configBlock.curMod="info";                        
                        this.changFilterActiveIndex(0,0);
                    }
                }
            })
        },
        setNodata(tag=false){
            if(tag){
                this.configBlock.isNoData = true;
                this.configBlock.modInfo.rgroup.items[1].disabled=true;
                this.configBlock.modInfo.rgroup.items[2].disabled=true;
                this.configBlock.modInfo.rgroup.items[3].disabled=true;
                //  console.log("this.configBlock.modInfo.rgroup",this.configBlock.modInfo.rgroup)
            }else{
                this.configBlock.isNoData = false;
                this.configBlock.modInfo.rgroup.items[1].disabled=false;
                this.configBlock.modInfo.rgroup.items[2].disabled=false;
                this.configBlock.modInfo.rgroup.items[3].disabled=false; 
            }
        },
        // tree needed
        //获取最深层deep
        recursion(obj){
            let num =0,
            qwTreeDataRec=(obj,k)=>{
                num = Math.max(num,k);
                console.log('num==>',num);
                if (obj.list)
                    obj.list.forEach(function(v, i){
                        qwTreeDataRec(v,k+1);
                    });
            }
            qwTreeDataRec(obj,1);            
            return num;
        },
        changFilterActiveIndex(i,j){
            if(i==0){
                this.configBlock.curMod="info"
                let item=this.configFilter[i].items[j];
                this.configBlock.modEdit.content.title = item.title+'';
                this.configBlock.modInfo.content.title=item.label;
                if(/^\d{10,13}$/.test(item.ableTime))item.ableTime=timestampToTime(item.ableTime);
                for(let attr in this.configBlock.modInfo.content.items){                    
                    if(this.configBlock.modInfo.content.items[attr].type=='text'){            
                        this.configBlock.modInfo.content.items[attr].value= item[this.configBlock.modInfo.content.items[attr].key]
                    } else if(this.configBlock.modInfo.content.items[attr].type=='btns'){
                         for(let attr2 in this.configBlock.modInfo.content.items[attr].items){
                             if(this.configBlock.modInfo.content.items[attr].items[attr2].value==item[this.configBlock.modInfo.content.items[attr].key]){
                                 this.configBlock.modInfo.content.items[attr].activeIndex=attr2;
                                 break;
                             }
                         }
                    }   
                }
                this.setNodata(false);
            }
            this.configFilter[i].activeIndex=j;
        },
        toAddModelData(){
            this.changeMod(null,0)
        },
        setEditData(data){
            console.log("setEditData")
            data.isAble=data.isAble==true? '1':'2';
            data.isPermission=data.isPermission==true? '1':'2';
            this.configBlock.modEdit.content.formConfig.formData=JSON.parse(JSON.stringify(data));//Object.assign({...data});
        },
        //infoblock
        changeMod(item,i){
            if(i==0){  
                if(!this.treeConfig.curNode){
                    this.$message.error("请先选择指定的数据仓库!");
                    return;
                }              
                this.configBlock.curMod='edit';                
                this.configBlock.modEdit.mod="add"
                this.$set(this.configBlock.modEdit.content.formConfig,"formData", { modelCode:"",  alias:"",  isPermission:"",  remark:"",  fTimeCreate:"",  fTimeUpdate:"",  isAble:"", ableTime:"" })
                this.resetEditData();
            }else if(i==1){
                let data=this.configFilter[0].items[this.configFilter[0].activeIndex];
                if(!data){
                    this.$message.error('请先选择或创建数据模型!');
                    return ;
                }                
                this.configBlock.curMod="edit"
                this.configBlock.modEdit.mod="edit"
                setTimeout(() => {
                    this.setEditData(data);
                }, 30);
            } else if(i==2) {
                let lastIndex=this.configFilter[0].activeIndex;
                let curItem=this.configFilter[0].items[lastIndex];
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
            let form=this.$refs["formEditOrAdd"];
            if(undefined == form){
                return;
            }else{
                setTimeout(() => {
                    if(form){
                        form.resetForm();
                        form.clearValidate();
                    }
                }, 100);
            }            
        },
        //编辑模式下右侧工具条按钮
        editToolbarRBtnClick(item,i){
             if(i==0){
                if(!this.treeConfig.curNode){
                    return;
                } 
                this.$refs["formEditOrAdd"].validate(()=>{
                    let params={
                        warehouseId:this.treeConfig.curNode.data.id,
                        modelCode:this.configBlock.modEdit.content.formConfig.formData.modelCode,
                        alias:this.configBlock.modEdit.content.formConfig.formData.alias,
                        isPermission:this.configBlock.modEdit.content.formConfig.formData.isPermission=='1'? true:false,
                        remark:this.configBlock.modEdit.content.formConfig.formData.remark,// fTimeCreate:"",// fTimeUpdate:"",
                        isAble:this.configBlock.modEdit.content.formConfig.formData.isAble=='1'? true:false,
                    }
                    if(this.configBlock.modEdit.mod == "edit"){
                        params.id=-1;
                        params.id=this.configBlock.modEdit.content.formConfig.formData.id;
                    }
                    let action= this.configBlock.modEdit.mod == "add"? dataModelAdd:dataModelEdit;
                    action({Vue:this,params:params}).then(res=>{
                        if(res.result){
                        this.$message.success("操作成功!");
                        this.resetEditData();
                        this.nodeLabelClicked(this.treeConfig.curNode,this.treeConfig.curNode.data) 
                        }
                    })
                })
            }else if(i==1){
                if(this.configBlock.isNoData){
                    return;
                }
                this.configBlock.curMod="info";
                console.log(this.configBlock.modEdit.mod)
            }
        },
        changeToobarFilter(i){
            let filterMod=["all","on","off"];
            this.configBlock.modInfo.group.activeIndex=i;
            this.configBlock.modEdit.group.activeIndex=i;
            this.configFilter.curMod=filterMod[i];
        },


    }
}
</script>
<style lang="less">
@import url("../../assets/style/pageCommon.less");
</style>


