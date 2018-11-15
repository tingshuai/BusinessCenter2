//文件资源
<template>
    <div class="qwCommonPage">
        <!-- 可维护树结构 -->
        <modelTree ref="modelTree" :config="treeConfig" @delNode="BeforNodeDelete" @nodeLabelClicked="nodeLabelClicked"></modelTree>
        <div class="rbox" style="{minHeight:sidebarHeight-136+'px'}">
            <!-- 表格配置 -->
            <div class="contentBox">
                <el-row>
                    <authQuery ref="authQuery" class="contentBox_s"></authQuery>
                </el-row>  
            </div>
        </div>
    </div>
</template>
<script>
import modelTree from "common/modelTree.vue" //树结构
import authQuery from "./authQuery.vue" //表格
import {mapState} from "vuex"
import {
    treestructure, //树结构
} from './api.js';
export default { 
    components:{ 
        modelTree, //树结构
        authQuery, //表格
    },
    computed:{
        ...mapState({ 
            sidebarHeight : state=> state.app.sidebarHeight
        })
    },
    data(){
        return {
            treeConfig:{ //树结构配置
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
                treeData:[ //树结构配置
                    {
                    id: 0,
                    isEdit:false,
                    label: '所有文件夹',
                    children:[{
                        label:"wew",
                        value:'1'
                    }]
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
                                    rules:[
                                        {
                        label:"wew",
                        value:'1'
                    }
                                    ],
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
                                                debugger;
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
                                                debugger;
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
                                    debugger;
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
            }
        }
    },
    mounted(){
        // this.$refs.authQuery.init();
    },
    methods:{
        BeforNodeDelete(data){ //树结构
            debugger;
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
        /*tree label 点击事件回调*/
        nodeLabelClicked(node){
            this.getDataModelList(node);
        },
        /*关闭前调用*/ 
        ruleDialogClose(){
           
        },
        //点击标题
        nodeLabelClicked(node,data){
            debugger;
            this.treeConfig.curNode=node;
            let params = {warehouseId: node.data.id}
            treestructure({Vue:this,params:params}).then(res=>{
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
    }
}
</script>
<style lang="less">
@import url("~style/pageCommon.less");
.qwCommonPage{
   .contentBox{
        background:#FFF;
    }
    .contentBox_s{
        width:95%;
        margin:0 auto
    }
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


