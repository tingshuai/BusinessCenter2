<template>
    <div class="infoSearchBox">
      <qwForm ref="formSearch" @formItemChange="formItemChange" :config="config"></qwForm>
    </div>
</template>
<script>
import { mapState } from "vuex";
import qwForm from "../../components/qwform/qwForm.vue"
import {
    dataLogGrid,
    dataLogOptionOperateType,
    dataLogOptionAppSrc,
    warehouseList,
    dataModelList,
    versionList,
} from "../dataAuthMehod/api.js"
export default {
    components:{
        qwForm
    },
    data(){
        return {
            items:{
                expended:[
                    {
                     key: "operateType",
                        type:"select",
                        filterable:true,
                        remote:false,
                        controlWidth:"150px",
                        dropDown:{
                            data:[],
                        },
                        name:"操作类型",
                        disabled:false,
                        // rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                    },
                    
                    {
                     key: "optionAppSrc",
                        type:"select",
                        filterable:true,
                        remote:false,
                        controlWidth:"150px",
                        dropDown:{
                            data:[]
                        },
                        name:"接入方式",
                        disabled:false,
                        // rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                    },
                    {
                     key: "user",
                        type:"input",
                        filterable:true,
                        remote:false,
                        controlWidth:"150px",
                        clearable:true,
                        dropDown:{
                            data:[]
                        },
                        name:"操作账户",
                        disabled:false,
                        // rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                    },
                    {
                     key: "warehouseId",
                        type:"select",
                        filterable:true,
                        remote:false,
                        controlWidth:"150px",
                        clearable:true,
                        dropDown:{
                            data:[]
                        },
                        name:"数据仓库",
                        disabled:false,
                        // rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                    },   
                    
                    {
                     key: "modelId",
                        type:"select",
                        filterable:true,
                        remote:false,
                        controlWidth:"150px",
                        clearable:true,
                        dropDown:{
                            data:[]
                        },
                        name:"数据模型",
                        disabled:false,
                        // rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                    },                     
                    {
                        key: "versionId",
                        type:"select",
                        filterable:true,
                        remote:false,
                        controlWidth:"150px",
                        clearable:true,
                        dropDown:{
                            data:[]
                        },
                        name:"版本号",
                        disabled:false,
                        controlWidth:"150px",
                        // rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                    },  {
                        type:"dateTimePicker",
                        key:"time",
                        name:"操作时间",
                        width:320,
                        controlWidth:"240px",
                        // start:"8:30",
                        // step:"0:15",
                        // end:"20:30",
                        readonly:false,
                        disabled:false,
                        editable:true,
                        clearable:true,
                        size:"",
                        dateType:'datetimerange',                        
                        placeholder:"",
                        startPlaceholder:"开始时间",
                        endPlaceholder:"结束时间",
                        rangeSeparator:'-',
                        valueFormat:"yyyy-MM-dd HH:mm:ss",
                        isRange:true,//是否
                    }
                ],
                expended2:[
                     {
                     key: "operateType",
                        type:"select",
                        filterable:true,
                        remote:false,
                        controlWidth:"150px",
                        dropDown:{
                            data:[]
                        },
                        name:"操作类型",
                        disabled:false,
                        // rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                    },
                    
                    {
                     key: "optionAppSrc",
                        type:"select",
                        filterable:true,
                        remote:false,
                        controlWidth:"150px",
                        dropDown:{
                            data:[]
                        },
                        name:"接入方式",
                        disabled:false,
                        // rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                    },
                    {
                     key: "user",
                        type:"input",
                        filterable:true,
                        remote:false,
                        controlWidth:"150px",
                        name:"操作账户",
                        disabled:false,
                        // rule:[{required:true,message:"",trigger:["input","change","blur"]}],
                    },
                    {
                     key: "warehouseId",
                        type:"select",
                        filterable:true,
                        remote:false,
                        controlWidth:"150px",
                        dropDown:{
                            data:[]
                        },
                        name:"数据仓库",
                        disabled:false,
                    }
                ]
            },
             config:{
                labelWidth: 80,
                itemWidth: 240,
                itemSpan:6,                        
                mod:'add',
                items:[],
                formData:{
                    operateType:"",
                    optionAppSrc:"",
                    user:"",
                    warehouseId:"",
                    modelId:"",
                    versionId: "",
                    time:""
                },
                formBtnsStyle:"text-align:right",
                formBtns:[],
                eventCB:{}
            },
            dropDown:{
                operateType: [],
                optionAppSrc: [],
                warehouse:[],
            }
        }
    },
    created(){
        this.$set(this.config,"items",JSON.parse(JSON.stringify(this.items.expended)));
    },
    mounted(){
        this.init();
    },
    computed:{
        ...mapState(["sidebarHeight"])
    },
    methods:{
        formItemChange(data){
            switch (data.item.key) {
                case 'warehouseId':
                    {
                        let val = data.config.formData.warehouseId;
                        this.$set(this.config.formData,"modelId","");
                        this.$set(this.config.formData,"versionId","");
                        this.getModelList(val)
                    }
                    break;
                case 'modelId':{
                    let val = data.config.formData.modelId;
                    this.$set(this.config.formData,"versionId","");
                    this.getVersionList(val)
                }break;
                default:
                    break;
            }
            this.$emit("formItemChange",data);
            // console.log("formItemChange",data);
        },
        getModelList(warehouseId){
            let params ={
                warehouseId: warehouseId
            }
            dataModelList({Vue:this,params:params}).then(res=>{
                let temp = [];
                for(let item of res.model){
                    temp.push({label:item.alias,value: item.id});
                }
                this.$set(this.config.items[4].dropDown,'data',temp);
            })
        },
        getVersionList(modelId){
            let params = {
                modelId: modelId
            }
            versionList({Vue:this,params:params}).then(res=>{
                let temp = [];
                for(let item of res.model){
                    temp.push({label:'V'+item.versionNo +'.0',value: item.id});
                }
                this.$set(this.config.items[5].dropDown,'data',temp);
            })

        },
        reset(){
            this.$refs.formSearch.resetForm();
        },
        init(){
            dataLogOptionOperateType({Vue:this,prams:{}}).then(res=>{
                this.$set(this.dropDown,'operateType',res.model)
                this.$set(this.config.items[0].dropDown,'data',res.model)
            })
            dataLogOptionAppSrc({Vue:this,prams:{}}).then(res=>{
                this.$set(this.dropDown,'optionAppSrc',res.model)
                this.$set(this.config.items[1].dropDown,'data',res.model)
            })
            warehouseList({Vue:this,prams:{}}).then(res=>{
                let temp=[];
                for(let item of res.model){
                    temp.push({label: item.alias,value: item.id});
                   
                }
                 this.$set(this.dropDown,'warehouse',temp);
                    this.$set(this.config.items[3].dropDown,'data',temp);
            })
        },
        getData(){
            return JSON.parse(JSON.stringify(this.config.formData))
        },
        setData(data){
            if(!data)return;
            for(let item of data){
                if(undefined != this.config.formData[item.key]){
                    this.$set(this.config.formData, item.key, item.val);
                }
            }
        },
        toggle(expended){
            if(expended){
                this.$set(this.config,"items",JSON.parse(JSON.stringify(this.items.expended)));
            }else{
                this.$set(this.config,"items",JSON.parse(JSON.stringify(this.items.expended2)));
            }
            setTimeout(() => {
                this.$set(this.config.items[0].dropDown,'data',this.dropDown.operateType)
                this.$set(this.config.items[1].dropDown,'data',this.dropDown.optionAppSrc)
            }, 10);
        }
    }
}
</script>

<style lang="less">
.infoSearchBox{
    background: #FFF;
    .l{
        min-width: 1080px;
        padding: 20px 0 0 20px
    }
}
</style>

