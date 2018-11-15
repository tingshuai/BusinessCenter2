<template>
<div class="qwModalForm" ><!-- @contextmenu="contextMenu" 调试专用 -->
    <qwDialog :config=config.qwDialog>
        <slot name="title" 
            :style="config.titleStyle">
        </slot>
        <qwForm ref="qwform" :config="config.qwForm" @formBtnClicked="formBtnClicked"></qwForm>
        <slot name="footer">
        </slot>
    </qwDialog>
</div>    
</template>
<script>
import qwForm from "./qwform.vue"
import qwDialog from "./qwDialog.vue"
import { mapMutations } from 'vuex'
let qwModalForm = {
    name:"qwModalForm",
    props:{
        config:{
            type:Object,
            default:()=>{
                return {
                        qwForm:{
                            labelWidth: 80,
                            itemWidth:300,
                            itemSpan:12,
                            items:[
                                {   
                                    colStyle:"",
                                    key:"item1",
                                    type:"input",
                                    name:"项目1",
                                    disabled:false,
                                    clearable:true,
                                    suffixIcon:"",
                                    prefixIcon:"",
                                    maxLength:40,
                                    minLength:0,
                                    rows:1,//textarea适用
                                    autoComplete:"off",
                                    name:"item1",
                                    readonly:false,
                                    rules:[{required:true,message:"请输入项目1",trigger:["input","change","blur"]}],
                                },
                                {
                                    key:"item4",
                                    type:"input",
                                    name:"项目4",
                                    disabled:false,
                                    clearable:true,
                                    suffixIcon:"",
                                    prefixIcon:"",
                                    maxLength:40,
                                    minLength:0,
                                    rows:1,//textarea适用
                                    autoComplete:"off",
                                    name:"item4",
                                    readonly:false,
                                    rules:[{required:true,message:"请输入项目1",trigger:["input","change","blur"]}],
                                },
                            
                                {
                                    key: "item3",
                                    type:"select",
                                    filterable:true,
                                    remote:true,
                                    remoteMethod:(query)=>{
                                        if(query) this.config.items[3].dropDown.data=[{label:'下拉1',value:'数据1'},{label:'下拉2',value:'数据2'}]//res.model;
                                        else this.config.items[3].dropDown.data=[];
                                        http.fetchPost('/itemList/getItem3',{params:{query:query}}).then(res=>{
                                            this.config.formData['item3'].dropDown.data=[{label:'下拉1',value:'数据1'},{label:'下拉2',value:'数据2'}]//res.model;
                                        })
                                    },
                                    dropDown:{
                                        data:[],
                                        api:{
                                            method:"post",
                                            action:"/itemlist/get"
                                        }
                                    },
                                    name:"项目3",
                                    disabled:false,
                                    rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                                },
                                {
                                    key: "item5",
                                    type:"select",
                                    filterable:true,
                                    remote:false,
                                    dropDown:{
                                        data:[{label:"item5 label",value:"item5 value"},{label:"item5 label2",value:"item5 value2"}]
                                    },
                                    name:"项目5",
                                    disabled:false,
                                    rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                                },{
                                    key:"item6",
                                    type:"radio",
                                    name:"项目7",
                                    items:[{
                                        label:'备选项1',
                                        value:'1',
                                        disabled:false,
                                    },{
                                        label:'备选项2',
                                        value:'2',
                                        disabled:true,
                                    }],
                                },{
                                    type:"checkbox",                        
                                    name:"项目8",
                                    items:[{                            
                                        key:"item7",
                                        disabled:false,
                                        label:'备选项1',
                                    },{                    
                                        key:"item8",
                                        label:'备选项2',
                                        disabled:true
                                    }],
                                },{
                                    type:"checkboxgroup",
                                    key:"item9",
                                    name:"项目9",
                                    rules:[{required:false}],
                                    items:[{
                                        disabled:false,
                                        label:'备选项1',
                                        value:111
                                    },{
                                        label:'备选项2',
                                        disabled:false,
                                        value:22222
                                    }],
                                },{
                                    type:"inputNumber",
                                    key:"item10",
                                    name:"项目10",
                                    rules:[{required:false}],
                                    disabled:false,
                                    min:0,
                                    max:100,
                                    step:0.01,
                                    precision:2,//精度
                                    controls:true,//是否使用控制按钮
                                    size:"medium",//small,mini
                                    label:"",
                                    controlsPosition:"right",//right or ''
                                },{
                                    type:"timePicker",
                                    key:"item11",
                                    name:"项目11",
                                    start:"8:30",
                                    step:"0:15",
                                    end:"20:30",
                                    readonly:false,
                                    disabled:false,
                                    editable:true,
                                    clearable:true,
                                    size:"",                        
                                    placeholder:"",
                                    startPlaceholder:"",
                                    endPlaceholder:"",
                                    isRange:false,//是否
                                },{
                                    key:"item2",
                                    type:"textarea",
                                    name:"项目2",
                                    span:24,
                                    width:400,
                                    disabled:false,
                                    clearable:true,
                                    suffixIcon:"",
                                    prefixIcon:"",
                                    maxLength:40,
                                    minLength:0,
                                    rows:3,//textarea适用
                                    autoComplete:"off",
                                    name:"item2",
                                    readonly:false,
                                    rule:[{required:true,message:"请输入项目1",trigger:["input","change","blur"]}],
                                },
                            ],
                            formData:{
                                item1:"",
                                item2:"",
                                item3:"",
                                item4:"",
                                item5:"",
                                item6:"",
                                item7:"",
                                item8:"",
                                item9:[],
                                item10:"",
                                item11:"",
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
                                    label:"提交表单1",
                                    class:"",
                                    style:"width:100px;text-align:center;",
                                    clicked: (data)=>{
                                        console.log("done clicked  frombtn 0")
                                    }
                                }
                            ],
                            eventCB:{//回调事件
                                formBtnClicked:(data)=>{
                                    return false;//return false或者该函数不存在则直接触发emit "formBtnClicked" return true则不向下执行
                                }
                            }
                        },
                        qwDialog:{
                            title:"弹出框标题",
                            titleStyle:"background:#FFF;",
                            dialogVisible:false,
                            width:"50%",
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
                }
            }
        }
    },
    components:{
        qwForm,
        qwDialog
    },
    methods:{
        ...mapMutations(['SET_CONTEXTMENU_EVENT','SET_CONTEXTMENU_TARGET','SET_SHOW_CONTEXTMENU']),
        showModal(){
            this.config.qwDialog.dialogVisible=true;
        },
        resetForm(){
            this.$refs["qwform"].resetForm();
        },
        closeModal(){
            this.config.qwDialog.dialogVisible=false;
        },
        clearValidate(){
            this.$refs["qwform"].clearValidate();
        },
        setFormData(data){
            console.log('setformData');
            this.config.qwForm.formData=data;
        },
        formBtnClicked(data){
            if('function'==typeof(data.config.formBtns[data.index].clicked)){
                data.config.formBtns[data.index].clicked() && this.$emit("formBtnClicked",data);
            }else{
                this.$emit("formBtnClicked",data);
            }
        },  
        open(){
            this.config.qwDialog.dialogVisible=true;
            console.log(this);
            // this.$emit("open",{});
        },
        close(){
            console.log(this);
            // this.config.dialogVisible=false;
            // console.log("close",...arguments);
            // this.$emit("close",...arguments);
        },
        closed(){
            console.log(this)
            // this.$emit("closed",...arguments);
        },
        contextMenu(e){
            e.preventDefault();
            this.SET_CONTEXTMENU_EVENT(e);
            this.SET_CONTEXTMENU_TARGET(this);
            this.SET_SHOW_CONTEXTMENU(true);
        }
    }
}
export default qwModalForm;
</script>
