<template>
<div class="qwAuthDialogBody">

</div>    
</template>
<script>
import http from 'api/base.js'
import {
    logicControls,
    JsonParse,
    formatJson
} from "api/common.js"
import {
    permissionLineList,
    permissionLineRuleList,
    structureGet,
    permissionLineAdd,
    permissionLineEdit,
} from "./api.js"
import qwModalForm  from "components/qwform/qwMoalForm.vue"
export default {
    components:{
        qwModalForm
    },
    props:{
        config:{
            type: Object,
            default(){
                return {
                    treeData:""
                }
            }
        }
    },
    data(){
        return {
            valueDesc:"",
        }
    },
    methods:{
        isEdit(){
            return this.permissionLineData!=null;
        }
    }
}
</script>
<style lang="less">

</style>

