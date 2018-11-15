<template>
<div class="formEventBody">
    <div class="eventBox">
        <el-button size="mini" type="text">所有事件:</el-button>
        <el-button size="mini" @click="evtItemClicked(i)" :type="evtActiveIndex==i?'primary':''" v-if="savedEvents&& (savedEvents.length>0)" v-for="(item,i) in savedEvents" :key="i">{{item.label}} <i @click.stop="delEvt(i)" class="iconClose el-icon-close"></i></el-button>
        <span v-if="savedEvents.length==0">暂无数据</span>
        <!-- <el-button size="mini" type="" v-if="savedEvents.length<4"><span class="el-icon-plus"></span>新增</el-button> -->
    </div>
    <qwForm  ref="formEvent" style="border:1px solid #E5E5E5;padding:100px 0 172px 0;" :config="formConfig" @formItemChanged="formItemChanged"></qwForm>
    <p style="text-align:right;margin-top:35px;">
        <el-button size="mini" type="primary" @click="addEvent">添加事件</el-button>
        <el-button size="mini" type="primary" @click="saveAll">全部保存</el-button>
        <el-button size="mini" @click="cancel">取消</el-button>
    </p>
</div>    
</template>
<script>
import qwForm from "../../components/qwform/qwform.vue"
import {
    formEvents,
    JsonParse,
    formatJson
} from "../../api/common.js"
export default {
    components:{
        qwForm
    },
    data(){
        return {
            evtActiveIndex:-1,
            savedEvents:[],
            formConfig:{
                labelWidth:276,
                itemWidth:800,
                items:[
                    {
                        key:"eventName",
                        name:"事件类型",
                        type:"select",
                        span:24,
                        width:1180,
                        controlWidth:"680px",
                        dropDown:{
                            data:[...formEvents]
                        },
                        rules:[{
                            required:true,
                            message:"该项为必填项",
                            trigger:["blur","change","input"]
                        }]
                    }, {
                        key:"eventCb",
                        name:"脚本信息",
                        type:"textarea",
                        span:24,
                        width:1180,
                        rows: 15,
                        controlWidth:"680px",
                        rules:[{
                            required:true,
                            trigger:["blur","change","input"],
                            validator:(rule, value, callback)=>{
                                if("" == value){
                                    return callback(new Error("脚本信息不能为空！"))
                                }else if(!(/^function\(data\)\{/.test(value))){
                                    return callback(new Error("事件回调必须以‘function(data){’开头！"))
                                }else {
                                    let err = false;
                                    try {
                                        eval((value+'').replace('function',"function eventCB"))
                                    } catch (e) {
                                        
                                        if(e)err=true;
                                        return callback(new Error("代码解析失败："+e));
                                    }
                                    if(err) return;
                                    callback();
                                }
                            }
                        }]
                    },
                ],
                formData:{
                    eventName:"",
                    eventCb:"",
                    label:"",
                    control:"",
                    field:"",
                },
                control:null,
                field: null,
            }
        }
    },
    methods:{
        init(data){
            if(!data.control||(!data.field)){
                this.$message.error("初始化参数错误！");
                this.cancel();
            }else{
                this.control = data.control;
                this.field = data.field;
                if(data.events){
                    this.savedEvents = data.events;
                }else {
                    this.savedEvents = [];
                }
            }
        },
        cancel(){
            this.$emit("cancel",this);
        },
        saveAll(){
            this.$emit("saveEvents",this.savedEvents)
        },
        addEvent(){
           let form = this.$refs.formEvent
           if(form){
               form.validate(()=>{
                    let evt= JsonParse(formatJson(this.formConfig.formData));
                    
                    for(let item of formEvents){
                        if(item.value==evt.eventName){
                            evt.label=item.label;
                            break;
                        }
                    }
                    let tag = true;
                    for(let attr in this.savedEvents){
                        if(this.savedEvents[attr].eventName==evt.eventName){
                            this.savedEvents[attr]=evt;
                            this.evtActiveIndex =-1;
                            this.$refs.formEvent.resetForm();                           
                            tag=false;
                            break;
                        }
                    }
                    if(tag){
                        evt.field = this.field.id;
                        evt.control = this.control.value; 
                        this.savedEvents.push(evt);
                        this.evtActiveIndex =-1;
                        this.$refs.formEvent.resetForm();
                    }
               })
           }
        },
        delEvt(i){
            if(this.evtActiveIndex==i){
                this.$refs.formEvent.resetForm();
            }
            this.savedEvents.splice(i,1);
            this.evtActiveIndex=-1;
        },
        evtItemClicked(index){
            this.evtActiveIndex=index;
            for(let attr in this.formConfig.formData){
                this.formConfig.formData[attr]=this.savedEvents[index][attr]+"";
            }
        },
        findSavedEvt(value){
            for(let item of this.savedEvents){
                if(item.eventName==value){
                    this.$set(this.formConfig.formData,"eventCb",''+ item.eventCb);
                    return true;
                    break;
                }
            }
            return false;
        },
        formItemChanged(data){
            switch (data.item.key) {
                case "eventName":
                    {
                        if(!this.findSavedEvt(data.config.formData[data.item.key])){
                            let cb=`function(data){
/*
data = {item: {…}|事件触发者的配置, self: VueComponent|qwForm表单组件引用, config: {…}|表单组建的config引用}
*/
/*这里写你的代码，第一行不可更改！*/
console.log(data)
}`
                            this.$set(this.formConfig.formData,"eventCb",'' + cb);
                        }
                    }
                    break;
            
                default:
                    break;
            }
        },
        reset(){
            this.$refs.formEvent.resetForm();
            this.evtActiveIndex = -1;
            this.savedEvents =[];
            this.control=null;
            this.field= null;
            console.log("reset")
        }
    }
}
</script>
<style lang="less">
.formEventBody {
    .eventBox{
        padding-bottom: 10px;
        .el-button{
            padding-right: 26px;
            position: relative;
        }
        .iconClose{
            position: absolute;
            line-height: 24px;
            padding: 0 8px 0 4px;
            top:1px;
            right:0;
            cursor: pointer;
        }
    }
    .el-button{
        border-radius: 0;
        min-width: 88px;
    }
}
</style>
