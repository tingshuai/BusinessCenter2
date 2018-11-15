<template>
<div class="filterBlock">
    <div class="filterGroup" v-for="(item,i) in config" :key="i">
        <div class="l">
            <h3 class="fTitle">{{item.title}}</h3>
        </div>
        <div class="r">
            <div class="qwBtns" style="min-height:56px;" :style="(item.show?'height:auto':'height:56px;overflow: hidden;')">
                    <template v-if="item.items.length>0">
                        <span v-for="(item2,j) in item.items" :key="j" v-show="(item.filterMod=='all')||(item.filterMod=='on'&&(item2.isAble==true))||(item.filterMod=='off'&&(item2.isAble==false))">
                            <el-button :class="item2.disabled?'is-disabled':''"
                                v-if="item.activeIndex==j"
                                type="primary"
                                @click="changFilterActiveIndex(i,j)">{{item2.label}}</el-button>
                                 <el-button :class="item2.disabled?'is-disabled':''"
                                v-else
                                :plain="true"
                                @click="changFilterActiveIndex(i,j)">{{item2.label}}</el-button>
                        </span>
                    </template>   
                <template v-else>
                    <span class="nodata">暂无数据</span>
                </template>
            </div>
            <el-button  class="showOrHide" type="text" @click="item.show=!item.show" >{{item.show?'收起':'展开'}} <i :class="item.show? 'el-icon-arrow-up' :'el-icon-arrow-down'"></i></el-button>
        </div>
    </div>
</div> 
</template>
<script>
export default {
    props:{
        config:{
            type:[Object,Array],
            default:()=>{
                return [
                        {
                            title:"数据模型",
                            activeIndex:0,
                            filterMod:"all",
                            show:false,
                            items:[
                                {
                                    label:"年度运营数据",
                                    disabled:true,
                                },                        
                                {
                                    label:"年度运营数据",
                                    disabled:false,
                                },      
                                {
                                    label:"年度运营数据",
                                    disabled:false,
                                },      
                                {
                                    label:"年度运营数据",
                                    disabled:false,
                                },      
                                {
                                    label:"年度运营数据",
                                    disabled:false,
                                },      
                                {
                                    label:"年度运营数据",
                                    disabled:false,
                                },      
                                {
                                    label:"年度运营数据",
                                    disabled:false,
                                },      
                                {
                                    label:"年度运营数据",
                                    disabled:false,
                                },
                            ]
                        },
                        {
                            title:"版本号",
                            activeIndex:0,
                            filterMod:"all",
                            show:false,
                            items:[
                                {
                                    label:"V1.0",
                                    disabled:true,
                                },                        
                                {
                                    label:"V2.0",
                                    disabled:false,
                                },      
                                {
                                    label:"V3.0",
                                    disabled:false,
                                },      
                                {
                                    label:"V4.0",
                                    disabled:false,
                                }
                            ]
                        },
                        {
                            title:"授权策略",
                            activeIndex:0,
                            filterMod:"all",
                            show:false,
                            items:[
                                {
                                    label:"策略1.0",
                                    disabled:true,
                                },                        
                                {
                                    label:"策略2.0",
                                    disabled:false,
                                }
                            ]
                        }
                    ]
            }
        }
    },
    methods:{
        changFilterActiveIndex(i,j){
            if(this.config[i].items[j]){
                this.config[i].activeIndex=j;
            }
            this.$emit("changFilterActiveIndex",{i:i,j:j});
        },
        setFilterMod(mod){
            for(let attr in this.config){
                this.config[attr].filterMod=mod;
            }
        }
    }
}
</script>
<style>

</style>


