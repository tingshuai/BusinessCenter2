<template>
<div class="lTree">
    <el-form class="treeForm" style="padding:14px;box-sizing:border-box;">
        <el-input placeholder="请输入关键字" class="treesearch" style="width:304px;" @change="treeStatusChange" @input="treeStatusChange" v-model="config.treeFilter.keyWords">
            <el-button slot="append" @click="treeStatusChange">搜索</el-button>
        </el-input>    
    </el-form>
    <div class="treeBox qwscroll" :style="'padding-bottom:0;height:' + (this.leftTreeNum==2?parseInt((parseInt(this.sidebarHeight)) * 0.6)-170 : (parseInt(this.sidebarHeight)-194)) + 'px'">
    <el-tree  ref="lTree"
        :props="config.propsTree"
        :style="{minHeight: (this.leftTreeNum==2?parseInt((parseInt(this.sidebarHeight)) * 0.6)-200 : (parseInt(this.sidebarHeight)-220))+'px',width:(320+ (config.maxLevel>1 ? (config.maxLevel-3)*24 : 0)) + 'px'}"
        :data="config.treeData"
        :show-checkbox="false"
        node-key="id"
        :filter-node-method="filterNode"
        :expand-on-click-node="false">
        <span class="custom-tree-node" style="display:block;" slot-scope="{ node, data }">            
            <span style="display:inline;cursor:pointer;" ><i v-if="(!node.loading)" @click="changeExpended(node,data)" :class="{'el-icon-caret-right':!node.expanded,'el-icon-caret-top':node.expanded,'el-icon-loading1': node.loading}"></i><label :ref="'qwModelTreeLabel_'+data.id"  :class="(config.curNode && (node.id==config.curNode.id))? 'curNode':''" @click="nodeLabelClicked(node,data)">{{ node.label }}</label></span>
        </span>
    </el-tree>    
    <qwModalForm ref="qwModalFormTree" :config="config.treeDialogConfig"></qwModalForm>
    <qwModalForm ref="qwModalFormTreeEdit" :config="config.treeDialogConfigEdit"></qwModalForm>
    <qwModalForm ref="qwModalFormTreeSee" :config="config.treeDialogConfigSee"></qwModalForm>
    </div>
</div> 
</template>
<script>
import qwForm from "../../components/qwform/qwform.vue"
import qwModalForm from "../../components/qwform/qwMoalForm.vue"
import {timestampToTime} from "../dataModel/filter.js"
import {mapState} from "vuex"

import {
    permissionRoleListRole,
    permissionRoleList,
    permissionRoleGrid,
    permissionRoleAdd,
    permissionRoleEdit,
    permissionRoleGet,
    permissionRoleDel
} from './departTreeApi.js'
export default {
    components:{
        qwModalForm
    },
    props:{
        leftTreeNum:{
            type: Number,
            default:()=>{
                return 2
            }
        },
        config:{
            type: Object,
            default:()=>{
                return {
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
                        label: '所有角色',
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
                                        name:"角色名称",
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
                                                permissionRoleAdd({Vue:this,params:params}).then(res=>{
                                                    if(res.result){
                                                        this.loadTree(this.config.curNode,this.config.curNode.data);
                                                        this.closeTreeModal();
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
                                title:"新增数据仓库角色",
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
                                        name:"角色名称",
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
                                                        id:this.config.curNode.data.id,
                                                        alias:data.config.formData.name,
                                                    }
                                                permissionRoleEdit({Vue:this,params:params}).then(res=>{
                                                    if(res.result){
                                                        res.model.label=res.model.alias;
                                                        this.config.curNode.data=res.model;
                                                        this.closeTreeModal2();
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
                                title:"编辑数据仓库角色",
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
                                label:"",//角色名称
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
                                            let modal=this.$refs.qwModalFormTreeSee;
                                            if(modal){
                                                modal.closeModal();
                                            }
                                        }
                                        return false;
                                    }
                                }
                            },
                        qwDialog:{
                                title:"查看 - 数据仓库角色",
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
        }
    },
    data(){
        return {
            treeHeight: 0,
            treeBoxStyle:'',
            emptySrc:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
        }
    },

    computed:{
        ...mapState({
            sidebarHeight : (state)=>{
                this.treeBoxStyle = 'height:'+ ((state.app.sidebarHeight)- 270)+'px;'
                return  state.app.sidebarHeight
            } 
        }),
    },
    watch:{
        sidebarHeight(val,val_){
            console.log("this.sidebarHeight up",val,val_)
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        /*初始化*/
        init(){
            this.treeHeight= (this.leftTreeNum==2?parseInt((parseInt(this.sidebarHeight)) * 0.6)-200 : (parseInt(this.sidebarHeight)-220));
            this.treeBoxStyle = 'padding-bottom:0;height:' + (this.leftTreeNum==2?parseInt((parseInt(this.sidebarHeight)) * 0.6)-170 : (parseInt(this.sidebarHeight)-194)) + 'px'
            let node=this.$refs['lTree'].$children[0].node;
            let data=node.data;
            this.loadTree(node,data);
        },
         /*数据仓库详情*/
        nodeDetail(node,data){
            let modal=this.$refs.qwModalFormTreeSee;
            if(modal){
                modal.showModal()
                setTimeout(() => {
                    this.config.treeDialogConfigSee.qwForm.formData=JSON.parse(JSON.stringify(data));
                }, 30);
            }
        },
        /*筛选tree数据*/
        filterNode(value,data) {
            if(data.id==0){
                return true;
            }else{
                if(value.status==0){
                    if(value.keyWords!=""){
                         return data.label.indexOf(value.keyWords)>=0;
                     }else{
                         return true;
                    }
                 }else{
                    let tag= value.status==1? true:false;
                     if(data.isAble==tag){
                         if(value.keyWords!=""){
                             return data.label.indexOf(value.keyWords)>=0;
                         }else{
                             return true;
                         }
                     }
                }
            }
        },
        /*筛选参数改变函数*/
        treeStatusChange(data){
            this.$refs["lTree"].filter(this.config.treeFilter);
        },
         /*数据仓库数据转换为treeData数据*/
        transModel(model){
            let temp=[];
            for(let item of model){
                temp.push({...item,label:item.roleName,children:[]})
            }
            return temp;
        },
        /*加载树子元素*/
        loadTree(node,data){
            if(node.level==2){
                node.expanded=true;
                node.loading=false;
                node.loaded=true;
                return;
            }
            node.loading=true;
            node.loaded=false;
            permissionRoleListRole({Vue:this,params:{parentId:data.id}}).then(res=>{
                if(res.model.length>0){                  
                    this.config.maxLevel= this.config.maxLevel> (node.level+1)? this.config.maxLevel :node.level+1;
                    if(undefined==data.children)data.children=[];
                    let temp = this.transModel(res.model);
                    for(let attr in data.children){
                        for(let attr2 in temp){
                            if(data.children[attr].id == temp[attr2].id){
                                temp.splice(attr2,1);
                            }
                        }
                    }
                    for(let item of temp){
                        data.children.push(item);
                    }
                    node.expanded=true;
                    node.loading=false;
                    node.loaded=true;
                    setTimeout(() => {
                        if(data.id==0){
                            let label=this.$refs["qwModelTreeLabel_"+res.model[0].id];
                            if(label)label.click();
                        }    
                    }, 30);
                }else{
                    if(data.id==0){
                        this.$message.error("暂无角色数据！");
                    }
                    node.loading=false;
                    node.loaded=true;
                }
            },e=>{
                node.loading=false;
                node.loaded=false;
            })
          
        },
        /*点击图标展开收起或加载子树*/
        changeExpended(node,data){
            if(node.loaded){
                node.expanded = !node.expanded;
            }else{
                this.loadTree(node,data);
            }
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
        //点击标题
        nodeLabelClicked(node,data){
            this.$set(this.config,"curNode",node)
            this.$emit("nodeLabelClicked",node);
        },
        append(data,node) {
            let modal=this.$refs['qwModalFormTree'];
            modal.showModal();
            // this.curNode=node;
             this.$set(this.config,"evtNode",node)
            setTimeout(() => {
                let treeIdPath =data.id==0? '' : ((data.treeIdPath? data.treeIdPath : '')+'/'+data.id);
                let treeNamePath = data.id==0? '':((data.treeNamePath? data.treeNamePath :'')+'/'+data.label);
                modal.setFormData({ pname : data.label,name : "",pid:data.id,treeIdPath:treeIdPath,treeNamePath:treeNamePath});
                setTimeout(() => {
                    modal.clearValidate();
                }, 30);
            }, 30);                      
        },
        closeTreeModal2(){
            let modal=this.$refs['qwModalFormTreeEdit'];
            modal.closeModal();
            setTimeout(() => {
                modal.resetForm();
            }, 30); 
        },
        edit(node,data){
            let modal=this.$refs['qwModalFormTreeEdit'];
            modal.showModal();
            this.config.curNode=node;
            setTimeout(() => {
                let treeIdPath =data.treeIdPath;
                let treeNamePath = data.treeNamePath;
                modal.setFormData({
                    pid:data.parentId,
                    pname:node.parent.data.label,
                    name:data.label,
                    treeIdPath:data.treeIdPath?data.treeIdPath:('/'+node.parent.data.id),
                    treeNamePath:data.treeNamePath?data.treeNamePath:('/'+node.parent.data.label),
                })
                modal.clearValidate();  
            }, 30);
        },        
        closeTreeModal(){
            let modal=this.$refs['qwModalFormTree'];
            modal.closeModal();
            setTimeout(() => {
                modal.resetForm();
            }, 30); 
        },
        setAble(node, data){
            let params={id: data.id,isAble:!data.isAble}
            permissionRoleAble({Vue:this,params:params}).then(res=>{
                if(res.result){
                    node.data={...node.data, ...res.model};
                    this.$message.success("操作成功！")
                }
            })
        },
    }

}
</script>
<style lang="less">
@import url("../../assets/style/pageCommon.less");
</style>
