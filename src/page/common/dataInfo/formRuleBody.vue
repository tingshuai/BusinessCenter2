<template>
<div class="formEventBody">
    <div class="RulesLabeBox">
        <span class="ruleTitle">常用规则：</span>
            <span class="ruleItem" @click="addRule('required')">必填|必选</span>
            <span class="ruleItem" @click="addRule('email')">邮箱</span>
            <span class="ruleItem" @click="addRule('date')">日期</span>
            <span class="ruleItem" @click="addRule('len')">指定长度（demo为3-5）</span>
            <span class="ruleItem" @click="addRule('func')">自定义规则</span>
            <span class="ruleItem red" @click="clearAll()">清空</span>
   </div>
    <el-input
        type="textarea"
        rows="14"
        @input="checkRules"
        @change="checkRules"
        @blur="checkRules"
        v-model="strRules">
    </el-input>
    <p class="errMsg" v-if="errMsg"><i class="el-icon-warning"></i>{{errMsg}}</p>
    <p class="btnLine">
        <el-button size="small" type="primary" @click="saveRules">保存</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
    </p>
</div>    
</template>
<script>
import { 
    formatJson,
    JsonParse
 } from "../../api/common.js";
export default {
    data(){
        return {
            arrRules:[],
            strRules:"",
            errMsg:"",
            abledRule:["required","email","date","len","func"],
            rules:{
               required : { ruelType:'required', required: true, message: '该项为必填|必选项', trigger: ['blur','change','input'] },
               email: { ruelType:'email',type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur','change','input'] },
               date: { ruelType:'date', type: 'date', required: true, message: '请选择日期', trigger: ['blur','change','input'] },
               len: { ruelType:'len', min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur','change','input'] },
               func: { ruelType:'func', required: true, trigger: ['blur','change','input'] ,validator: (rule, value, callback) =>{
                   /*成功返回 callback()  失败返回 callback(new Error("错误信息"))*/
               }},

            }
        }
    },
    methods:{
        init(rules){
            this.arrRules=rules;
            this.transRulesToStr()
        },
        addRule(key){
            this.addRuleByKey(key);
        },
        reset(){
            this.arrRules =   [];
            this.strRules =   "";
            this.errMsg   =   "";
        },
        addRuleByKey(key){
            if(this.rules[key]){
                let keys= {};
                if(this.arrRules.length>0)for(let item of this.arrRules){
                    keys[item.ruelType]=1;
                }
                switch (key) {
                    case 'required':
                    case 'len':
                    case 'func':
                        {
                            if(keys[key]){
                                this.$message.error("该规则不允许同时出现多条！")
                                return;
                            }
                        }
                        break;
                    case 'email':
                    case 'date':
                        {
                            if(keys.email||keys.date){
                                this.$message.error("规则邮箱或日期只允许同时出现1条！")
                                return;
                            }
                        }
                        break;
                    default:
                        break;
                }
                this.arrRules.push(this.rules[key])
                this.transRulesToStr()
            }
        },
        transRulesToStr(){
             this.strRules= formatJson(this.arrRules).replace(/[\r\n]/g,'').replace(/[ ]/g,'').replace(/\}\,\{/g,'},\r{').replace(/\\n/g,'\r\n').replace(/function/g,'function ').replace(/newError/g,'new Error').replace(/\,\"validator\"/g,"\,\n\"validator\"");
        },
        checkRules(cb = ()=>{}){
            if(this.strRules == ""){
                if('function'==typeof(cb)){
                    this.strRules="[]";
                    this.arrRules=[];
                    cb();
                }
                return true;
            }
            let rules=null;
            try {
                rules = JsonParse(this.strRules.replace(/\r\n|\n|\r/g,''))
            } catch (e) {
                this.errMsg="解析失败：" + e
            }
          
            if(!rules){
                return false;
            }else{
                if(!(rules.constructor===Array)){
                    this.errMsg="规则最终类型必须为数组！";
                    return false;
                }
                for(let attr in rules){
                    if(this.abledRule.indexOf(rules[attr].ruelType)<0){
                        this.errMsg="无法识别第"+ (parseInt(attr)+1) +"条规则的类型,可用类型:required|email|date|len|func";
                        return false;
                        break;
                    }
                }
                this.arrRules = rules;
                this.errMsg="";
                if('function'==typeof(cb)){
                    cb();
                }
                return true;
            }
        },
        clearAll(){
            this.reset();
        },
        saveRules(){
            this.checkRules(()=>{
                this.$emit("saveRule",this.arrRules);
            })
        },
        cancel(){            
            this.$emit("close",{self:this})
        },
    }
}
</script>
<style lang="less">
.formEventBody{
    min-height: 500px;
    .RulesLabeBox{
        margin-top: -48px;
        padding:24px 0; 
    }
    .ruleTitle{
        font-size: 14px;
        color: #666;
    }
    .ruleItem{
        cursor: pointer;
        display: inline-block;
        line-height: 28px;
        text-align: center;
        height: 28px;
        color:#409EFF;
        min-width: 88px;
        padding: 0 10px;
        border:1px solid #409EFF;
    }
     .ruleItem.red{
         color:#f56c6c;
         border-color: #f56c6c;
     }
    .errMsg{
        line-height: 22px;
        font-size: 12px;
        color: #f56c6c;
    }
    .btnLine{
        text-align: right;
        margin-top: 24px;
        .el-button{
            border-radius: 0;
            min-width: 88px;
            text-align: center;
        }
    }
}
</style>
