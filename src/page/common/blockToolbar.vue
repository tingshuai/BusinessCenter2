<template>
<div class="qwToolbar">
            <span class="l">
                <el-button-group class="qwToolGroup">
                    <el-button v-for="(item,i) in config.group.items" @click="leftGroupItemClick(item,i)" :key="i" :class="config.group.activeIndex==i?'active':''"> {{item.title}}  </el-button>
                </el-button-group>
                <slot name="left"></slot>
            </span>
            <span class="r">  
                <el-button
                    :class="config.rgroup.activeIndex==i?'active':''"
                    v-for="(item,i) in config.rgroup.items"
                    :key="i"
                    :type="item.type" 
                    :disabled="item.disabled"
                    :plain="true"
                    @click="rightGroupItemClick(item,i)"
                >{{item.title}}</el-button>
                <slot name="right"></slot> 
            </span>
</div>    
</template>
<script>
export default {
props:{
    config:{
        type:[Array,Object],
        default(){
            return {
                group:{
                    activeIndex:0,
                    items:[
                        {
                            title:'全部',
                        },
                        {
                            title:'只显示启用',
                        },
                        {
                            title:'只显示停用',
                        },
                    ]
                },
                rgroup:{
                    activeIndex:0,
                    items:[
                        {
                            title:'新增策略',
                            type:'primary'
                        },
                        {
                            title:'编辑',
                            type:''
                        },
                        {
                            title:'删除',
                            type:''
                        },
                        {
                            title:'启停',
                            type:''
                        },
                        {
                            title:'默认策略',
                            type:''
                        }
                    ]
                },
            }
        }
    }
},
methods:{
    leftGroupItemClick(item,i){
        this.config.group.activeIndex=i;
        this.$emit("itemClicked",{group:"left",index:i,item:item})
    },
    rightGroupItemClick(item,i){
        // this.config.rgroup.activeIndex=i;
        this.$emit("itemClicked",{group:"right",index:i,item:item})
    }
}
}
</script>
<style lang="less">
@import url("../../assets/style/pageCommon.less");
</style>
