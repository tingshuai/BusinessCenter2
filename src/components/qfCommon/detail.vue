<template>
<div class="details">
    <section>
		<el-row type="flex" class="part_right"> 
			<el-col :span="12" class="_left">
                <aside class="title0">产品概况</aside>
                <aside class="part_left">
                    <el-row type="flex" class="leftPart">
                        <el-col :span="6" class="_l">应用名：</el-col>
                        <el-col :span="18" class="_r">{{ dataLeft.app || '' }}</el-col>
                    </el-row>
                    <el-row type="flex" class="leftPart">
                        <el-col :span="6" class="_l">启用日期：</el-col>
                        <el-col :span="18" class="_r">{{ dataLeft.ableDate || '' }}</el-col>
                    </el-row>	
                    <el-row type="flex" class="leftPart">
                        <el-col :span="6" class="_l">编号：</el-col>
                        <el-col :span="18" class="_r">{{ dataLeft.code || '' }}</el-col>
                    </el-row>
                    <el-row type="flex" class="leftPart">
                        <el-col :span="6" class="_l">是否启用：</el-col>
                        <el-col :span="18" class="_r">{{ dataLeft.isAble == 'true' ? "是" : "否" }}</el-col>
                    </el-row>	
                    <el-row type="flex" class="leftPart">
                        <el-col :span="6" class="_l">产品：</el-col>
                        <el-col :span="18" class="_r">{{ dataLeft.product }}</el-col>
                    </el-row>
                    <el-row type="flex" class="leftPart">
                        <el-col :span="6" class="_l">备注：</el-col>
                        <el-col :span="18" class="_r">{{ dataLeft.remark }}</el-col>
                    </el-row>
                </aside>
            </el-col>
			<el-col :span="12" class="_center">
                <aside class="title0">产品结构</aside>
                <aside class="part_center">
                    <el-row type="flex" class="centerPart">
                        <el-col :span="6" class="_l">公共属性：</el-col>
                        <el-col :span="18" class="_r"><span class="text" v-for="item in dataCenter.publicAttr">{{ item.alise || '' }}</span></el-col>
                    </el-row>
                    <el-row type="flex" class="centerPart">
                        <el-col :span="6" class="_l">公共配置：</el-col>
                        <el-col :span="18" class="_r"><span class="text" v-for="item in dataCenter.productCfg">{{ item.alise || '' }}</span></el-col>
                    </el-row>
                    <el-row type="flex" class="centerPart">
                        <el-col :span="6" class="_l">产品属性：</el-col>
                        <el-col :span="18" class="_r"><span class="text" v-for="item in dataCenter.productAttr">{{ item.alise || '' }}</span></el-col>
                    </el-row>                    
                </aside>    
            </el-col>
			<el-col :span="12">
                
            </el-col>
		</el-row>	
	</section>
</div>
</template>
<script>
import {mapState} from "vuex"
export default {
    props:{
        dataLeft:{
            type:Object
        },
        dataCenter:{
            type:Object,
            default:{
                publicAttr:[{attrType:''}],
                productCfg:[{attrType:''}],
                productAttr:[{attrType:''}]
            }
        }
    },
    components:{
        
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
.details{
    margin-top: 20px;
}
.leftPart{
    margin: 10px 0;
}
._l{
    text-align: right;
    color: gray;
}
._r{
    // font-size: 13px;
}
.centerPart{
    margin: 10px 0;
}
aside.title0{
    font-size: 20px;
    color: #409eff;
    &::before{
        content: '';
        display: inline-block;
        height: 20px;
        width: 5px;
        margin-right: 10px;
        background-color: #409eff;
        position: relative;
        top: 3px;
    }
}
._left{
    border-right: 1px solid #ddd;
}
._center{
    padding-left: 20px;
    .text{
        margin: 0 10px;
    }
}
.part_center{
}

</style>


