<template>
<div class="DialogInfoQueryBody">
<div class="treebox">
    <modelStructureTree ref="modelStructureTree" @treeCheckedItemsChange="treeCheckedItemsChange"/>
</div>
<div class="r">
    <div class="formsel">
        <h3 class="sel_title">表单预览</h3>
        <!-- {{configEvents}} -->
        <!-- {{checkItems}} -->
        <!-- {{formatJson(configView)}}<br> -->
        <!-- <br> -->
        <!-- {{configitems}} -->
            <qwform v-if="configView" :config="configView"></qwform>
            <p v-else style="font-size:14px;color:#666;text-align:left;">暂无数据</p>
        <div style="clear:both;"></div>    
    </div>
    <div class="formdesign">
        <h3 class="design_title" style="margin-bottom:0;">查询方案 
            <!-- <el-button-group style="margin-left:12px;">
                <el-button @click="changeMod('add')" :type="mod=='add'? 'primary' : ''" size="mini">新增</el-button>
                <el-button @click="changeMod('edit')" :type="mod=='edit'? 'primary': ''" size="mini">编辑</el-button>
            </el-button-group> -->

            <div class="qwformbox_inline" style="display:inline-block; transform:translateY(-8px);">
                <el-form ref="formSheme" :model="formScheme.formData" :inline="true" :label-width="'80px'" style="margin-left:6px;">
                    <!-- 方案名称 -->
                    <el-form-item v-if="mod=='add'" label="" prop="schemeName"  :rules="[{required:true,message:'该项为必填项',trigger:['input','change','blur']}]">
                        <el-input style="formSchemeItem" size="medium" v-model="formScheme.formData.schemeName" placeholder="请输入方案名称"></el-input>
                    </el-form-item>
                    <!-- 方案名称 -->
                    <el-form-item v-else label="" prop="schemeName" :rules="[{required:true,message:'请选择方案名称',trigger:['input','change','blur']}]">
                        <el-select filterable v-model="formScheme.formData.schemeName" @change="chemeChanged" placeholder="请选择方案名称">
                            <el-option v-for="(item,i) in formScheme.dropDown.scheme" :label="item.label" :value="item.value" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            
            </h3>
        <h3 class="design_title">排版详情            
            <el-button size="mini" type="" style="border-radius:0;float:right;width:88px;" @click="clearFormDesign"> 清空 </el-button>
            <el-button size="mini" @click="saveDesignForm" type="primary" style="border-radius:0;float:right;margin-right:20px;width:88px;"> 生成预览 </el-button>
        </h3>
        <qwform ref="qwformDesign" style="height:146px;" @formItemChanged="formItemChanged" :config="formDesignConfig"></qwform>
        <div style="clear:both;"></div>
    </div>
</div>
<div style="clear:both;"></div>
    <p class="btn_bottom_box">
        <el-button size="mini" type="" style="border-radius:0;float:right;width:88px;" @click="close"> 关闭 </el-button>
        <el-button size="mini" type="primary" @click="saveScheme" style="border-radius:0;float:right;margin-right:20px;width:88px;"> 保存排版 </el-button>
    </p>
<!--  v-if="formDesignConfig.formData.dataSource=='3'"   -->
    <qwMoalForm ref="modalFormDataSource" v-if="formDesignConfig.formData.dataSource=='2'" :config="configModalFormDataSource2"></qwMoalForm>
    <qwMoalForm ref="modalFormDataSource" v-if="formDesignConfig.formData.dataSource=='1'"  :config="configModalFormDataSource"></qwMoalForm>
    <!-- 事件管理 -->
    <qwDialog :config="DialogEvent">
        <formEventBody ref="formEventBody" @saveEvents="DialogEventSaveEvents" @cancel="DialogEventCanceled" />
    </qwDialog>
</div>    
</template>
<script>
import modelStructureTree from "./modelStructureTree.vue"
import qwform from "../../components/qwform/qwform.vue"
import qwDialog from "../../components/qwform/qwDialog.vue"
import qwMoalForm from "../../components/qwform/qwMoalForm.vue"
import formEventBody from "./fromEventBody.vue"
import http from '../../api/base.js'
 const isJSON_test=(str) => {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            return true;
        } catch(e) {
            return false;
        }
    }
    }　
import {
    formatJson,
    JsonParse,
    queryControls,
    ruleControls,
    needSourceContrls,
    formEvents
} from "../../api/common.js"
import{
    querySchemeList,
    querySchemeGrid,
    querySchemeAdd,
    querySchemeEdit,
    querySchemeDel,

    queryDesignList,
    queryDesignGrid,
    queryDesignAdd,
    queryDesignEdit,
    queryDesignDel,
queryDesignGet,
} from '../dataAuthMehod/api.js';
export default {
    components:{
        modelStructureTree,
        qwform,
        qwDialog,
        qwMoalForm,
        formEventBody
    },
    data(){
        return {
            curDesignId:-1,
            mod:"add",//add | edit
            isConfigOK:false,
            checkItems:[],
            configitems:{},//key 为 item_加上id的值
            configView:null,
            model:   null,
            version: null,
            scheme:  null,
            DialogEvent:{
                        title:"事件管理",
                        titleStyle:"background:#FFF;",
                        dialogVisible:false,
                        width:"1224px",
                        fullscreen:false,
                        top:"15vh",
                        modal:false,//遮罩
                        modalAppendToBody:true,
                        appendToBody:false,
                        lockScroll:true,
                        customClass:"",
                        closeOnClickModal:true,
                        closeOnPressEscape:true,
                        showClose:true,
                        center:false,
                        beforeClose:()=>{
                            let dialog = this.$refs.formEventBody;
                            if(dialog)dialog.reset();
                        }
            }, 
            formScheme:{                           
                labelWidth: 80,
                itemWidth:276,
                itemSpan:8,
                dropDown:{
                    scheme:[],
                },
                formData:{
                    schemeName:"",
                }
            },
            formDesignConfig:{             
                labelWidth: 80,
                itemWidth:276,
                itemSpan:8,
                controlWidth:"160px",
                items:[ 
                    {
                        key:"field",
                        type:"select",
                        name:"字段名",
                        span:8,
                        dropDown:{
                            data:[]
                        },
                        rules:[{required:true,message:"该项为必填项",trigger:["input","change","blur"]}],
                    },
                    
                    {
                        key:"control",
                        type:"select",
                        name:"查询控件",
                        span:8,
                        dropDown:{
                            data:[...queryControls]
                        },
                        rules:[{required:true,message:"该项为必填项",trigger:["input","change","blur"]}],
                    },  
                    {   
                        colStyle:"",
                        key:"defaultValue",
                        type:"input",
                        name:"默认值",
                        disabled:false,
                        clearable:true,
                        suffixIcon:"",
                        prefixIcon:"",
                        maxLength:40,
                        width:400,
                        minLength:0,
                        span:8,
                        rows:1,//textarea适用
                        autoComplete:"off",
                        readonly:false,
                        rules:[{required:false,message:"该项为必填项",trigger:["input","change","blur"]}],
                    },                  
                    
                                   
                    {   
                        colStyle:"",
                        key:"controlWidth",
                        type:"inputNumber",
                        name:"控件宽度",
                        formItemStyle:"width:300px;",
                        placeholder:"请输入控件宽度(纯数字|不含标签)",
                        rules:[{required:false}],
                        disabled:false,
                        min:100,
                        span:8,
                        max:2000,
                        step:1,
                        precision:0,//精度
                        controls:false,//是否使用控制按钮
                        size:"medium",//small,mini
                        label:"",
                        controlsPosition:"right",//right or ''
                    },
                    
                    {
                        key:"dataSource",
                        type:"radio",
                        name:"数据源",
                        span:8,
                        width:400,
                        items:[{
                            label:'无',
                            value:'0',
                            disabled:false,
                        },{
                            label:'本地',
                            value:'1',
                            disabled:false,
                        },{
                            label:'远程',
                            value:'2',
                            disabled:false,
                        }],
                    }, 
                    {
                        key:"spanVal",
                        type:"slider",
                        name:"排版",
                        min: 1,               
                        max: 24,
                        width:600,               
                        disabled: false,          
                        step: 1,   
                        size:"mini", 
                        span: 24,       
                        showInput: false,         
                        showInputControls: false, 
                        inputSize: "mini",         
                        showStops: true,         
                        showTooltip: false,       
                        formatTooltip: function(value){return value},     
                        range: false,             
                        vertical: false,          
                        height: "",            
                        label: "",             
                        debounce: 300,          
                        tooltipClass: "",
                        showAfterHtml:true,
                        controlWidth:'440px',
                        controlStyle:"transform:tanslateY(-2px);",
                        afterHtml(item,config){
                            return parseInt(config.formData[item.key]*(1/24)*100) + "%"
                        },
                        afterStyle:"position:absolute;left:440px;top:0;line-height:32px;padding-left:6px;",
                        interStyle:"width:140px;"
                    }, 
                        
                ],
                formData:{
                    field:"",
                    clumn:"",
                    control:"",
                    controlWidth:"",
                    spanVal: 8,
                    defaultValue:"",
                    dataSource: "0",
                    dataSourceConfig:"",
                    schemeName:"",
                },
                formBtnsStyle:"text-align:left;padding-left:80px;",
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
                        label:"配置数据源",
                        class:"",
                        style:"width:100px;text-align:center;border-radius:0;"
                    },
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
                        label:"事件管理",
                        badge:0,
                        class:"",
                        style:"width:100px;text-align:center;border-radius:0;"
                    },
                   
                ],
                eventCB:{//回调事件
                    formBtnClicked:(data)=>{
                        /*btn: {…}, index: 0, config: {…}, self:{...Vuecomponent} */ 
                        switch (data.index) {
                            case 0:
                                {
                                    if(data.config.formData.field=="" || (data.config.formData.control=="")){
                                        this.$message.error("请先选择指定的字段和控件！");
                                        return;
                                    }
                                    if(!(needSourceContrls.indexOf(data.config.formData.control)>=0)){
                                        this.$message.error("该组件无需配置数据源！");
                                        return;
                                    }
                                    let page =data.self.$parent;
                                    page.showDataSource();//page.configModalFormDataSource2.qwDialog.dialogVisible = true;
                                }
                                break;
                            case 1:    
                                {
                                    this.showDialogFormEvent();
                                }break;
                            default:
                                break;
                        }
                        console.log("formBtnClicked==>",data);
                        return false;//return false或者该函数不存在则直接触发emit "formBtnClicked" return true则不向下执行
                    }
                }
            },
            configModalFormDataSource:{
                            qwDialog:{
                                title:"本地数据源",
                                titleStyle:"background:#FFF;",
                                dialogVisible:false,
                                width:"840px",
                                fullscreen:false,
                                top:"15vh",
                                modal:false,//遮罩
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
                            },
                            qwForm:{
                                labelWidth: 0,
                                itemWidth:300,
                                itemSpan:24,
                                items:[
                                    {
                                        key:"dataSource",
                                        type:"textarea",
                                        name:"",
                                        controlWidth:"800px",
                                        span:24,
                                        width:1186,
                                        disabled:false,
                                        clearable:true,
                                        suffixIcon:"",
                                        placeholder:"请输入本地数据源，以json方式输入",
                                        prefixIcon:"",
                                        maxLength:1000,
                                        minLength:0,
                                        rows:20,//textarea适用
                                        autoComplete:"off",
                                        readonly:false,
                                        rules:[{required:true,trigger:["input","change","blur"],validator:(rule,value,callback)=>{
                                            if(""==value){
                                                return callback(new Error("本地数据源不能为空！"))
                                            }
                                            if(!isJSON_test(value)){
                                                return callback(new Error("未识别的JSON！"))
                                            }
                                            return callback();
                                        }}]
                                    }
                                ],
                                formData:{
                                    dataSource:"",
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
                                    label:"JSON校验",
                                    class:"",
                                    style:"width:100px;text-align:center;",
                                    clicked: (data)=>{
                                        console.log("done clicked  frombtn 0")
                                    }
                                },
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
                                    clicked: (data)=>{
                                        console.log("done clicked  frombtn 0")
                                    }
                                },
                                {
                                    size:"small",//medium / small / mini
                                    type:"",//primary / success / warning / danger / info / text
                                    plain:false,//是否朴素
                                    round:false,//是否圆角按钮
                                    circle:false,//是否圆形按钮
                                    loading:false,//是否加载中状态
                                    disabled:false,//是否禁用
                                    icon:"",//图标class
                                    autofocus:false,//自动获取焦点
                                    nativeType:"button",//button / submit / reset
                                    label:"取消",
                                    class:"",
                                    style:"width:100px;text-align:center;",
                                    clicked: (data)=>{
                                        console.log("done clicked  frombtn 0")
                                    }
                                }

                            ],
                            eventCB:{//回调事件
                                formBtnClicked:(data)=>{
                                    switch (data.index) {
                                        case 0://JSON校验
                                            {
                                                // console.log(this.config.configModalFormDataSource.qwForm.formData.dataSource);
                                                if(isJSON_test(this.configModalFormDataSourceconfigModalFormDataSource.qwForm.formData.dataSource)){
                                                    this.$message.success("校验成功！")
                                                }else{
                                                    this.$message.error("校验失败！")
                                                }
                                            }
                                            break;
                                        case 1://保存
                                            {
                                                data.self.validate(()=>{
                                                    this.$set(this.formDesignConfig.formData,"dataSourceConfig",JSON.stringify({type:"1",config: JSON.parse(this.configModalFormDataSource.qwForm.formData.dataSource)}));
                                                    setTimeout(() => {
                                                        this.$message.success("操作成功！")
                                                        data.self.$parent.$parent.$parent.resetForm();
                                                        data.self.$parent.$parent.$parent.closeModal();
                                                    }, 30);
                                                })
                                            }
                                            break;
                                        case 2://取消
                                            {
                                                data.self.$parent.$parent.$parent.resetForm();
                                                data.self.$parent.$parent.$parent.closeModal();
                                            }
                                            break;
                                        
                                        default:
                                            break;
                                    }
                                    return false;//return false或者该函数不存在则直接触发emit "formBtnClicked" return true则不向下执行
                                }
                            }
                            }
                    },
            configModalFormDataSource2:{
                                qwDialog:{
                                    title:"远程数据源",
                                    titleStyle:"background:#FFF;",
                                    dialogVisible:false,
                                    width:"1224px",
                                    fullscreen:false,
                                    top:"15vh",
                                    modal:false,//遮罩
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
                                },
                                qwForm:{
                                    labelWidth: 276,
                                    itemWidth:800,
                                    itemSpan:24,
                                    items:[
                                        {
                                            key:"method",
                                            name:"请求方式",
                                            type:"select",
                                            controlWidth:"200px",
                                            span: 24,
                                            dropDown:{
                                                data:[
                                                    {label:"GET",value:"fetchGet"},
                                                    {label:"POST",value:"fetchPost"},
                                                    {label:"POSTJSON",value:"fetchPostJson"}
                                                ]
                                            }
                                        },
                                        {
                                            key:"romotePath",
                                            name:"远程地址",
                                            type:"input",
                                            width:1200,
                                            controlWidth:"680px",
                                            rules:[{required:true,trigger:["input","change","blur"],validator: (rule, value, callback)=>{
                                                if(""==value){
                                                    return callback(new Error("远程地址不能为空！"))
                                                }else if(!(/^http[s]{0,1}:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+/.test(value))){
                                                    return callback(new Error("远程地址有误！"));
                                                }
                                                return callback();
                                            }}]
                                        },
                                        {
                                            key:"params",
                                            type:"textarea",
                                            name:"参数信息",
                                            span:24,
                                            width:1200,
                                            disabled:false,
                                            clearable:true,
                                            suffixIcon:"",
                                            placeholder:"请输入请求参数，以json方式输入",
                                            prefixIcon:"",
                                            maxLength:1000,
                                            minLength:0,
                                            rows:14,//textarea适用
                                            autoComplete:"off",
                                            readonly:false,
                                            controlWidth:"680px",
                                            rules:[{required:true,trigger:["input","change","blur"],validator: (rule, value, callback)=>{
                                                if(""==value){
                                                    return callback(new Error("请求参数不能为空！"))
                                                }
                                                //this.config.configModalFormDataSource2.qwForm.formData.method=='fetchPostJson' && (
                                                if(!isJSON_test(value)){
                                                    return callback(new Error("未识别的JSON！"))
                                                }                                                
                                                return callback();
                                            }}]
                                        },
                                        {
                                            key:"key",
                                            name:"key字段",
                                            type:"input",
                                            width:800,
                                            controlWidth:"400px",
                                            rules:[{required:true,trigger:["input","change","blur"],validator:(rule,value,callback)=>{
                                                if(""==value){
                                                    return callback(new Error("key字段不能为空！"))
                                                }
                                                if(!/^[a-zA-Z]{1}[a-zA-Z0-9]{0,}$/.test(value)){
                                                    return callback(new Error("key字段必须字母开头的字母和数字组成！"))
                                                }
                                                return callback();
                                            }}]
                                        },
                                        {
                                            key:"value",
                                            name:"value字段",
                                            type:"input",
                                            width:800,
                                            controlWidth:"400px",
                                            rules:[
                                                {
                                                    required:true,
                                                    trigger:["input","change","blur"],
                                                    validator:(rule,value,callback)=>{
                                                        if(""==value){
                                                            return callback(new Error("value字段不能为空！"))
                                                        }
                                                        if(!/^[a-zA-Z]{1}[a-zA-Z0-9]{0,}$/.test(value)){
                                                            return callback(new Error("value字段必须字母开头的字母和数字组成！"))
                                                        }
                                                        return callback();
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    formData:{
                                        romotePath:"",
                                        method:"",
                                        dataSource:"",
                                        params:"",
                                        key:"",
                                        value:""
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
                                        label:"通讯校验",
                                        class:"",
                                        style:"width:100px;text-align:center;",
                                        clicked: (data)=>{
                                            console.log("done clicked  frombtn 0")
                                        }
                                    },
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
                                        clicked: (data)=>{
                                            console.log("done clicked  frombtn 0")
                                        }
                                    },
                                    {
                                        size:"small",//medium / small / mini
                                        type:"",//primary / success / warning / danger / info / text
                                        plain:false,//是否朴素
                                        round:false,//是否圆角按钮
                                        circle:false,//是否圆形按钮
                                        loading:false,//是否加载中状态
                                        disabled:false,//是否禁用
                                        icon:"",//图标class
                                        autofocus:false,//自动获取焦点
                                        nativeType:"button",//button / submit / reset
                                        label:"取消",
                                        class:"",
                                        style:"width:100px;text-align:center;",
                                        clicked: (data)=>{
                                            console.log("done clicked  frombtn 0")
                                        }
                                    }

                                ],
                                eventCB:{//回调事件
                                    formBtnClicked:(data)=>{
                                        let that=this;
                                        if(data.index==0){ console.log("通讯校验！")
                                            data.self.validate(()=>{
                                                // debugger
                                                let http_=http;
                                                let action= http_[that.configModalFormDataSource2.qwForm.formData.method];                                                
                                                if('function'==typeof(action)){
                                                    http_[that.configModalFormDataSource2.qwForm.formData.method](data.config.formData.romotePath,{params:JSON.parse(data.config.formData.params)},true).then(res=>{
                                                        this.$message.success("校验成功！")
                                                    },(e)=>{
                                                        this.$message.error("校验失败！")
                                                    })
                                                }else{
                                                    this.$message.error("未识别的请求方法！");
                                                    return;
                                                }
                                               
                                            })
                                        } else if(data.index==1){//保存
                                            data.self.validate(()=>{
                                                this.$set(this.formDesignConfig.formData,"dataSourceConfig",JSON.stringify({type: "2",config: this.configModalFormDataSource2.qwForm.formData}));
                                                setTimeout(() => {
                                                    this.$message.success("操作成功！")
                                                    data.self.$parent.$parent.$parent.resetForm();
                                                    data.self.$parent.$parent.$parent.closeModal();
                                                }, 30);
                                            })
                                        } else if(data.index==2){//取消
                                            data.self.resetForm();
                                            data.self.$parent.$parent.$parent.closeModal();
                                        }
                                        return false;//return false或者该函数不存在则直接触发emit "formBtnClicked" return true则不向下执行
                                    }
                                }
                                }
                        },
                        configEvents:{},
        }
    },
    methods:{
        formatJson(s){
           return formatJson(s)
        },
        showDialogFormEvent(){
            if(!this.formDesignConfig.formData.field){
                this.$message.error("请先选择指定的字段！");
                return;
            }
            let field= null;
            for(let item of this.checkItems){
                if(item.id==this.formDesignConfig.formData.field){
                    field= item;
                    break;
                }
            }
            if(!this.formDesignConfig.formData.control){
                this.$message.error("请选择指定的控件！")
                return;
            }
            let control = null;
            for(let item of queryControls){
                if(item.value==this.formDesignConfig.formData.control){
                    control= item;
                    break;
                }
            }
            if(!field || (!control)){
                console.error("未找到指定的字段或控件！");
                return;
            }
            let events = this.configEvents["item_"+field.id]
            this.DialogEvent.title = "事件管理/" + field.label +"/" + control.label;
            this.DialogEvent.dialogVisible = true;
            setTimeout(() => {
                this.$refs.formEventBody.init({field:field,control:control,events:events});
            }, 30);

        },
        init(data={tree:{}}){
            this.model=data.tree.model;
            this.version=data.tree.version;
            this.scheme=data.tree.scheme;
            this.$refs.modelStructureTree.init(data.tree);
            this.changeMod(data.mod);
            
        },
        transConfigToEditData(config){
            if(!config){
                this.configitems =[];
                this.configView = null;
                this.$refs.modelStructureTree.setCheckedKeys([]);
            }else{
                this.configView = config.configView;
                this.configitems = config.configitems;
                this.configEvents = config.configEvents? config.configEvents : {};
                let keys= [];
                for(let attr in config.configitems){
                    let id =parseInt(attr.split("_")[1]);
                    if(id>0)keys.push(id)
                }
                this.$refs.modelStructureTree.setCheckedKeys(keys);
            }
        },
        chemeChanged(data){
            let params ={
                modelId: this.model.id,
                versionId: this.version.id,
                schemeId:data
            }
            queryDesignGet({Vue:this,params:params}).then(res=>{
                if(res.model){
                    this.curDesignId =res.model.id;
                    if(this.curDesignId){
                        let config = JsonParse(res.model.config);
                        this.transConfigToEditData(config);
                    }else{
                        this.transConfigToEditData(null);
                    }
                }else{
                    this.changeMod("add");
                    this.$message.error("模型不存在或已被删除！")
                }
            })
        },
        buildQueryFormConfig(tags = false){
            let that = this;
            const defConfig = {
                labelWidth: 80,
                controlWidth: "100px",
                itemSpan:8,
                items:[],
                itemEventCB:{
                    focus:{},   //获取焦点
                    blur:{},    //失去焦点
                    input:{},   //输入事件
                    change:{},  //值被改变
                },
                formData:{},
            };
            this.isConfigOK =true;
            let config=JsonParse(formatJson(defConfig));
            // config.itemWidth="200px";
            let lblMax =0;
            let tag = true;
            for(let attr in this.checkItems){
                let key='item_'+this.checkItems[attr].id;
                lblMax = this.checkItems[attr].label.length> lblMax? this.checkItems[attr].label.length : lblMax;
                let tag =true;
                if(!this.configitems[key]){
                    config.items.push({
                        key: key,
                        name: this.checkItems[attr].label,
                        type: "labelInfo"
                    })
                    tag=false;
                    config.formData[key]="待配置";
                }else{
                    switch (this.configitems[key].control) {
                        case "input":
                            {
                                let conf={
                                    colStyle:"",
                                    key: key,
                                    name: this.checkItems[attr].label,
                                    span: this.configitems[key].spanVal,
                                    controlWidth: this.configitems[key].controlWidth + 'px',
                                    type: "input",
                                    disabled:false,
                                    clearable:true,
                                }
                                config.items.push(conf);
                                config.formData[key]="";
                                if(this.configEvents[key]){
                                    this.buildEventCbByConfigEvents(this.configEvents[key],config,conf,this.configitems[key].control)
                                }
                            }
                            break;
                        case "textarea":{
                            let conf={
                                    colStyle:"",
                                    key: key,
                                    name: this.checkItems[attr].label,
                                    span: this.configitems[key].spanVal,
                                    controlWidth: this.configitems[key].controlWidth + 'px',
                                    type: "textarea",
                                    disabled:false,
                                    clearable:true,
                            }
                            config.items.push(conf);
                            config.formData[key]="";
                            if(this.configEvents[key]){
                                this.buildEventCbByConfigEvents(this.configEvents[key],config,conf,this.configitems[key].control)
                            }
                        }
                        break; 
                        case "inputnumber":{
                            let conf = {
                                    key: key,
                                    name: this.checkItems[attr].label,
                                    span: this.configitems[key].spanVal,
                                    controlWidth: this.configitems[key].controlWidth + 'px',
                                    type: "inputNumber",
                                    disabled:false,
                                    // min:0,
                                    // max:100,
                                    // step:0.01,
                                    // precision:2,//精度
                                    controls:false,//是否使用控制按钮
                                    size:"medium",//small,mini
                                    label:"",
                                    controlsPosition:"right",//right or ''
                            }
                            config.items.push(conf);
                            config.formData[key]="";
                            if(this.configEvents[key]){
                                this.buildEventCbByConfigEvents(this.configEvents[key],config,conf,this.configitems[key].control)
                            }
                        }break;
                        case "date":{
                            let conf ={
                                    key: key,
                                    name: this.checkItems[attr].label,
                                    span: this.configitems[key].spanVal,
                                    controlWidth: this.configitems[key].controlWidth + 'px',
                                    colStyle:"",
                                    valueFormat:"timestamp",
                                    type:"dateTimePicker",
                                    dateType:"date"
                            }
                            config.items.push(conf);
                            config.formData[key]="";
                            if(this.configEvents[key]){
                                config=this.buildEventCbByConfigEvents(this.configEvents[key],config,conf,this.configitems[key].control)
                            }
                        }break;
                        case "datetime":{
                            let conf ={
                                    key: key,
                                    name: this.checkItems[attr].label,
                                    span: this.configitems[key].spanVal,
                                    controlWidth: this.configitems[key].controlWidth + 'px',
                                    colStyle:"",
                                    valueFormat:"timestamp",
                                    type:"dateTimePicker",
                                    dateType:"datetime"
                            }
                            config.items.push(conf);
                            config.formData[key]="";
                            if(this.configEvents[key]){
                                config=this.buildEventCbByConfigEvents(this.configEvents[key],config,conf,this.configitems[key].control)
                            }
                        }break;
                        case "select":
                            {
                                let conf={
                                    colStyle:"",
                                    key: key,
                                    name: this.checkItems[attr].label,
                                    span: this.configitems[key].spanVal,
                                    controlWidth: this.configitems[key].controlWidth +'px',
                                    type: "select",
                                    clearable: true,
                                    dropDown:{
                                        data:[],
                                    }
                                }
                                if(this.configitems[key].dataSourceConfig==""){
                                    this.isConfigOK = false;
                                    if(tags)this.$message.error("选项 “" + this.checkItems[attr].label + "” 需配置数据源")
                                }else{
                                    let sourceConfig = JSON.parse(this.configitems[key].dataSourceConfig);
                                    if(!sourceConfig){
                                        this.$message.error("配置解析错误！请刷新后重试！")
                                    }else{
                                        if(sourceConfig.type=="1"){
                                            conf.dropDown.data = sourceConfig.config;
                                        }else if(sourceConfig.type=="2"){
                                            /*
                                            {
                                                "type": "2",
                                                "config": {
                                                    "romotePath": "http://192.168.0.80:8084/dcnew/datamodel/list",
                                                    "method": "fetchPost",
                                                    "dataSource": "",
                                                    "key": "alias",
                                                    "value": "id",
                                                    "params": "{\n \"warehouseId\": 60\n}"
                                                }
                                            }
                                            */
                                            let source = sourceConfig.config;
                                            source.params =JSON.parse(source.params);
                                            conf.filterable = true;
                                            conf.remote = true;
                                            conf.dropDown={ data:[], ...source};
                                            conf.remoteMethod = null;
                                        }
                                    }
                                }
                                config.items.push(conf);
                                config.formData[key]="";
                                if(this.configEvents[key]){
                                    config=this.buildEventCbByConfigEvents(this.configEvents[key],config,conf,this.configitems[key].control)
                                }
                            }
                        break;
                        case "radio":
                        {
                            let conf ={
                                colStyle:"",
                                key: key,
                                name: this.checkItems[attr].label,
                                span: this.configitems[key].spanVal,
                                controlWidth: this.configitems[key].controlWidth +'px',
                                type:"radio",
                                items:[{
                                    label:'备选项1',
                                    value:'1',
                                    disabled:false,
                                },{
                                    label:'备选项2',
                                    value:'2',
                                    disabled:true,
                                }],
                            }

                            if(this.configitems[key].dataSourceConfig==""){
                                this.isConfigOK = false;
                                if(tags)this.$message.error("选项 “" + this.checkItems[attr].label + "” 需配置数据源")
                            }else{
                                let sourceConfig = JSON.parse(this.configitems[key].dataSourceConfig);
                                if(!sourceConfig){
                                    this.$message.error("配置解析错误！请刷新后重试！")
                                }else{
                                        if(sourceConfig.type=="1"){
                                        conf.items = sourceConfig.config;
                                    }else if(sourceConfig.type=="2"){
                                        console.log("组件单选框不支持远程数据")
                                    }
                                }
                            }

                            config.items.push(conf);
                            config.formData[key]="";
                            if(this.configEvents[key]){
                                config=this.buildEventCbByConfigEvents(this.configEvents[key],config,conf,this.configitems[key].control)
                            }
                        }
                        break;
                        case "checkbox":
                        {
                            let conf = {
                                colStyle:"",
                                key: key,
                                name: this.checkItems[attr].label,
                                span: this.configitems[key].spanVal,
                                controlWidth: this.configitems[key].controlWidth +'px',
                                type:"checkboxgroup",
                                items:[{
                                    disabled:false,
                                    label:'备选项1',
                                    value:111
                                },{
                                    label:'备选项2',
                                    disabled:false,
                                    value:22222
                                }],
                            }
                             if(this.configitems[key].dataSourceConfig==""){
                                this.isConfigOK = false;
                                if(tags)this.$message.error("选项 “" + this.checkItems[attr].label + "” 需配置数据源")
                            }else{
                                let sourceConfig = JSON.parse(this.configitems[key].dataSourceConfig);
                                if(!sourceConfig){
                                    this.$message.error("配置解析错误！请刷新后重试！")
                                }else{
                                        if(sourceConfig.type=="1"){
                                        conf.items = sourceConfig.config;
                                    }else if(sourceConfig.type=="2"){
                                        console.log("组件单选框不支持远程数据")
                                    }
                                }
                            }
                                                   
                            config.items.push(conf);
                            config.formData[key]=[];
                            if(this.configEvents[key]){
                                config = this.buildEventCbByConfigEvents(this.configEvents[key],config,conf,this.configitems[key].control)
                            }
                        }break;
                        default:
                            break;
                    }
                }
            }
            config.labelWidth = lblMax*14 +12 +'px'; 
            this.configView=config;
            // this.isConfigOK = tag;
        
        },
        /*根据事件配置项生成回调函数*/
        buildEventCbByConfigEvents(events,config,conf,evtName){
            // console.log("buildEventCbByConfigEvents")
            if(events.length<1)return config;
            else{ 
                if(!config.itemEventCB)config.itemEventCB={};
                if(!config.itemEventCB.focus)config.itemEventCB.focus ={};
                if(!config.itemEventCB.blur)config.itemEventCB.blur ={};
                if(!config.itemEventCB.input)config.itemEventCB.input ={};
                if(!config.itemEventCB.change)config.itemEventCB.change ={};
                for(let attr in events){
                    if(evtName==events[attr].control){
                        if(config.itemEventCB[events[attr].eventName]){
                            config.itemEventCB[events[attr].eventName][conf.key]=events[attr].eventCb;
                        }
                    }                    
                }
            }
            return config;
        },
        formItemChanged(data){
            // console.log("formItemChanged==>",data);
            let val=data.config.formData[data.item.key];
            switch (data.item.key) {
                case "field":
                    {
                        if(!this.configitems["item_"+val]){
                            this.$set(this.formDesignConfig.formData,"control","");
                            this.$set(this.formDesignConfig.formData,"spanVal",12);
                            this.$set(this.formDesignConfig.formData,"defaultValue","");
                        }else{
                            for(let attr in this.formDesignConfig.formData){
                                this.$set(this.formDesignConfig.formData,attr,this.configitems["item_"+val][attr]);
                            }
                        }
                        setTimeout(() => {
                            if(this.configEvents["item_" + val]){
                                this.formDesignConfig.formBtns[1].badge =this.configEvents["item_" + val].length;
                            }else{
                                this.formDesignConfig.formBtns[1].badge = 0;
                            }
                            this.$refs.qwformDesign.clearValidate();
                        }, 0);
                    }
                    break;
                case "control":    
                    {
                        if(needSourceContrls.indexOf(val)>=0){
                            setTimeout(() => {
                                if(this.formDesignConfig.formData.dataSource=="0"){
                                    this.$set(this.formDesignConfig.formData,"dataSource","1");
                                    this.$set(this.formDesignConfig.formData,"dataSourceConfig","");
                                }
                                this.$set(this.formDesignConfig.items[4].items[0],"disabled",true);
                                this.$set(this.formDesignConfig.items[4].items[1],"disabled",false);
                                if(val=="select"){                                   
                                      this.$set(this.formDesignConfig.items[4].items[2],"disabled",false);
                                }else{
                                    if(this.formDesignConfig.formData.dataSource=="2"){
                                        this.$set(this.formDesignConfig.formData,"dataSource","1");  
                                    }
                                    this.$set(this.formDesignConfig.items[4].items[2],"disabled",true);
                                }
                              
                            }, 0);
                        }else{
                            setTimeout(() => {
                                  this.$set(this.formDesignConfig.formData,"dataSource","0");
                                  this.$set(this.formDesignConfig.formData,"dataSourceConfig","");
                                  this.$set(this.formDesignConfig.items[4].items[1],"disabled",true);
                                  this.$set(this.formDesignConfig.items[4].items[2],"disabled",true);

                            }, 0);
                        }
                    }break;
                default:
                    break;
            }
        },
        treeCheckedItemsChange(data){
            this.checkItems= JSON.parse(JSON.stringify(data));            
            this.$set(this.formDesignConfig.items[0].dropDown,'data',JSON.parse(JSON.stringify(data)))
            this.buildQueryFormConfig(false);
        },
        reset(){
            this.checkItems=[];
            this.configView=null;
            this.configitems=[];
            this.configEvents={};
            this.$set(this.formDesignConfig.items[0].dropDown,'data',[])
            let formSheme = this.$refs.formSheme;            
            if(formSheme){
                formSheme.resetFields();
            }
            let qwformDesign = this.$refs.qwformDesign;
            if(qwformDesign){
                qwformDesign.resetForm();
            }            
            this.changeMod("add");
        },
        changeMod(mod){
            this.mod = mod;
            if(mod=="edit"){
                this.getSchemeList();
            }
        },
        getSchemeList(){
            let params ={
                modelId: this.model.id,
                varsionId: this.version.id
            }
            querySchemeList({Vue:this,params:params}).then(res=>{
                let temp=[];
                if(res.model){
                    for(let item of res.model){
                        temp.push({...item, label: item.alias, value: item.id})
                    }
                }
                this.$set(this.formScheme.dropDown, "scheme", temp);
                if(this.scheme){
                    this.$set(this.formScheme.formData,"schemeName",this.scheme.id);
                    this.chemeChanged(this.scheme.id);
                }
            })
        },
        clearFormDesign(){
            this.$refs.qwformDesign.resetForm();
        },
        checkDesign(cb =()=>{}){
            let tag=false;
            this.buildQueryFormConfig(true);
            if(!this.isConfigOK){
                return false;
            }
            for(let attr in this.configView.items){
                if(this.configView.items[attr].type=="labelInfo"){
                    tag=true;
                    this.$message.error("请配置表单项 ‘" + this.configView.items[attr].name + "’")
                    return;
                    break;
                }
            }
            if(!tag){
                cb();
            }
        },
        fixConfig(){
            let arrCheck = [];
            for(let item of this.checkItems){
                arrCheck.push(item.id);
            }
            let configitems_ ={};
            for(let attr in this.configitems){
                if(arrCheck.indexOf(this.configitems[attr].field)>=0){
                    configitems_[attr] = this.configitems[attr];
                }
            }
            this.configitems = configitems_;
        },
        saveScheme(){
            let that=this;
            this.fixConfig();
            this.checkDesign(()=>{
                this.$refs.formSheme.validate((valid) => {
                    if (valid) {
                        if(that.mod=="add"){
                            let params = { modelId:that.model.id,versionId:that.version.id,alias:that.formScheme.formData.schemeName};
                            querySchemeAdd({Vue:that,params:params}).then(res=>{
                                // console.log("querySchemeAdd===>",res);
                                if(res.model){
                                    params.schemeId = res.model.id;
                                    params.structureIds ="";
                                    let ids=[];
                                    for(let item of that.checkItems){
                                        ids.push(item.id);
                                    }
                                    params.structureIds= ids.join();
                                    params.config= formatJson({configView:that.configView,configitems:that.configitems,configEvents:this.configEvents});
                                    queryDesignAdd({Vue:that,params:params}).then(res=>{
                                        that.$message.success("操作成功！");
                                        that.close();
                                    })
                                }
                            })
                        }else if(that.mod=="edit"){
                            if(that.curDesignId){
                                let params={
                                    id: that.curDesignId,
                                    config: formatJson({configView:that.configView,configitems:that.configitems,configEvents:this.configEvents})
                                }
                                queryDesignEdit({Vue:that,params:params}).then(res=>{
                                    that.$message.success("操作成功！");
                                    that.close();
                                })
                            }else{
                                let params = { modelId:that.model.id,versionId:that.version.id,alias:that.formScheme.formData.schemeName};
                                params.schemeId = this.scheme.id;
                                params.structureIds ="";
                                let ids=[];
                                for(let item of that.checkItems){
                                    ids.push(item.id);
                                }
                                params.structureIds= ids.join();
                                params.config= formatJson({configView:that.configView,configitems:that.configitems,configEvents:this.configEvents});
                                queryDesignAdd({Vue:that,params:params}).then(res=>{
                                    that.$message.success("操作成功！");
                                    that.close();
                                })
                            }
                           
                        }
                    } else {
                        return false;
                    }
                });
            })
           
        },
        close(){
            this.reset();
            this.$emit("close");
        },
        showDataSource(){
            setTimeout(() => {
                let modal = this.$refs.modalFormDataSource;
                if(modal){
                     modal.showModal();
                     if(this.formDesignConfig.formData.dataSourceConfig!="" && isJSON_test(this.formDesignConfig.formData.dataSourceConfig)){
                         let data = JsonParse(this.formDesignConfig.formData.dataSourceConfig);
                         if(data && (data.type==this.formDesignConfig.formData.dataSource)){
                            switch (data.type) {
                                case "1":
                                     {
                                        this.$set( this.configModalFormDataSource.qwForm.formData,"dataSource",JSON.stringify(data.config))
                                     }
                                     break;
                                case "2":
                                     {
                                         for(let attr in this.configModalFormDataSource2.qwForm.formData){
                                                 this.$set( this.configModalFormDataSource2.qwForm.formData,attr, data.config[attr] );
                                         }
                                         console.log("test========>11211==>",this.configModalFormDataSource2.qwForm,data.config)
                                     }
                                     break;
                             
                                default:
                                     break;
                            }
                         }else{
                             console.log("不匹配的类型,需要删除！")
                         }
                     }
                  
                }else{
                    this.$message.error("请选择有效的数据源类型！")
                    return //this.$message.error("系统错误！请刷新重试！");
                }
            }, 0);
            // alert(111)
            // this.configModalFormDataSource2.qwDialog.dialogVisible = true;
        },
        saveDesignForm(){
            this.$refs.qwformDesign.validate(()=>{
                this.$set(this.configitems,"item_"+this.formDesignConfig.formData.field, JSON.parse(JSON.stringify(this.formDesignConfig.formData)));
                this.buildQueryFormConfig(true);
                if(this.isConfigOK){
                    setTimeout(() => {
                        this.$refs.qwformDesign.resetForm();
                    }, 0);
                }
                
            })
        },
        DialogEventSaveEvents(events){
            let key= 'item_' + this.formDesignConfig.formData.field;
            this.configEvents[key]=events;
            this.formDesignConfig.formBtns[1].badge =events.length;
            this.buildQueryFormConfig(false);
            this.$message.success("操作成功！")
            let body = this.$refs.formEventBody;
            if(body){
                body.reset();
            }            
            this.DialogEvent.dialogVisible = false;
        },
        DialogEventCanceled(body){
            body.reset();
            this.DialogEvent.dialogVisible = false;
        }
    }
}
</script>
<style lang="less">
  @import url("../../assets/style/dialogInfoBodyStyle.less");
</style>
