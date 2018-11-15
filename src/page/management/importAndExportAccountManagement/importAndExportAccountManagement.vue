<template>
<div class="qwCommonPage">
    进出账管理
</div>
</template>
<script>
import qwForm from "components/qwform/qwform.vue"
import authDialogBody from "./authDialogBody.vue"
import {mapState} from "vuex"
import {
    warehouseList,
} from './api.js';
export default {
    components:{
        qwForm,
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        })
    },
    data(){
        return {           
            treeConfig:{}
        }
    },
    mounted(){
        // this.init();
    },
    methods:{
        /*关闭前调用*/ 
        ruleDialogClose(){
           
        }
    }
}
</script>
<style lang="less">
@import url("~style/pageCommon.less");
.qwCommonPage{

}
</style>


