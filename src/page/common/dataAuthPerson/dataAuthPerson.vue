<template>
<div class="qwCommonPage">
    <!-- tree -->
    <departTree :leftTreeNum="leftTreeNum"></departTree>
<div class="rbox" style="{minHeight:sidebarHeight-136+'px'}">
    <!-- 过滤条件 -->
    <!-- <modelFilter ref="modelFilter" @changFilterActiveIndex="changFilterActiveIndex" :config="configFilter"></modelFilter> -->
    <div class="infoBlock">
      <!-- 工具条 -->
       <!-- 授权表格 -->
    </div>
</div>
</div>
</template>
<script>
import qwForm from "../../components/qwform/qwform.vue"
import qwDialog from "../../components/qwform/qwDialog.vue"
import qwModalForm from "../../components/qwform/qwMoalForm.vue"
import {timestampToTime} from "../dataModel/filter.js"
import departTree from "../common/departTree.vue"
import modelFilter from "../common/modelFilter.vue"
import blockToolbar from "../common/blockToolbar.vue"

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

    permissionSchemeList,
    permissionSchemeGrid,
    permissionSchemeAdd,
    permissionSchemeEdit,
    permissionSchemeAble,
    permissionSchemeDel,

    permissionActionList,
    permissionActionGrid,
    permissionActionAdd,
    permissionActionEdit,
    permissionActionGet,
    permissionActionDel,

    permissionLineList,
    permissionLineGrid,
    permissionLineAdd,
    permissionLineEdit,
    permissionLineGet,
    permissionLineDel,

    permissionColumList,
    permissionColumGrid,
    permissionColumAdd,
    permissionColumEdit,
    permissionColumGet,
    permissionColumDel,
    structureList,

} from '../dataAuthMehod/api.js';
export default {
    components:{
        qwForm,
        qwModalForm,
        departTree,
        modelFilter,
        blockToolbar,
        qwDialog,
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        })
    },
    data(){
        return {
            leftTreeNum:1
        }
    },
    mounted(){
        // this.init();
    },
    methods:{

    }
}
</script>
<style lang="less">
@import url("../../assets/style/pageCommon.less");
.qwCommonPage{
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


