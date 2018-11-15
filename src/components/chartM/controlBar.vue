<template>
    <section>
        <el-collapse v-model="actItem" accordion>
            <el-collapse-item title="模板配置" name="1">
                <div class="item">
                    <h5>模板尺寸</h5>
                    <el-radio-group class="radioGroup" size="mini" v-model="tplConfig.tplSize">
                        <el-radio :border="true" :label="3">A3尺寸</el-radio>
                        <el-radio :border="true" :label="4">A4尺寸</el-radio>
                        <el-radio :border="true" :label="5">A5尺寸</el-radio>
                        <el-radio :border="true" :label="6">自定义</el-radio>
                    </el-radio-group>
                </div>
                <div class="item">
                    <h5>背景设置</h5>
                    <aside class="setBg">
                        <div class="selBgColor" @click.stop="selColor($event,'tplBgColor')">
                            <span class="colorQuote" :style="{ 'background-color': colorPicker.color }"></span>
                            <span>选择颜色</span>
                        </div>
                        <el-upload
                        id="upload"
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-change="uploadChange">
                        <el-button size="small" type="primary">上传背景图</el-button>
                        </el-upload>
                    </aside>
                </div>
                <div class="item">
                    <value-quote :config="quoteOpacity"></value-quote>
                </div>                
            </el-collapse-item>
            <el-collapse-item title="文字配置" name="2">
                <section>
                    <span>字体</span>
                    <el-select v-model="sel.font.fontFamily" placeholder="请选择字体">
                        <el-option v-for="item in font" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </section>
                <section>
                    <span>文字内容</span>
                    <el-radio-group class="radioGroup" size="mini" v-model="sel.font.fontType">
                        <el-radio :label="1">固定值</el-radio>
                        <el-radio :label="2">参数</el-radio>
                    </el-radio-group>
                    <el-input size="mini" v-model="sel.font.value" :placeholder="sel.font.placeholder"></el-input>                    
                </section>
                <aside class="setBg">
                    <div class="selBgColor" @click.stop="selColor($event,'fontColor')">
                        <span class="colorQuote" :style="{ 'background-color': colorPicker.color }"></span>
                        <span>字体颜色</span>
                    </div>
                </aside>                
                <div class="quoteItem">
                    <value-quote :config="quoteFont"></value-quote>
                </div>
            </el-collapse-item>
            <el-collapse-item title="矩形配置" name="3">
                <aside class="setBg">
                    <div class="selBgColor" @click.stop="selColor($event,'blockQuote')">
                        <span class="colorQuote" :style="{ 'background-color': colorPicker.color }"></span>
                        <span>背景填充</span>
                    </div>
                    <div class="selBgColor" @click.stop="selColor($event,'blockQuote')">
                        <span class="colorQuote" :style="{ 'background-color': colorPicker.color }"></span>
                        <span>边框</span>
                    </div>
                </aside>
                <div class="quoteItem">
                    <value-quote :config="quoteRectFillet"></value-quote>
                </div>
                <div class="quoteItem">
                    <value-quote :config="quoteRectBorder"></value-quote>
                </div>                
            </el-collapse-item>
            <el-collapse-item title="图片配置" name="4">
                <section>
                    <span>图片来源</span>
                    <el-radio-group class="radioGroup" size="mini" v-model="sel.font.fontType">
                        <el-radio :label="1">固定值</el-radio>
                        <el-radio :label="2">参数</el-radio>
                    </el-radio-group>
                    <el-input size="mini" v-model="sel.font.value" :placeholder="sel.font.placeholder"></el-input>                    
                </section>
                <div class="quoteItem">
                    <value-quote :config="quoteImgWidth"></value-quote>
                </div>
                <div class="quoteItem">
                    <value-quote :config="quoteImgHeight"></value-quote>
                </div>
                <div class="quoteItem">
                    <value-quote :config="quoteImgFillet"></value-quote>
                </div>         
                <div class="quoteItem">
                    <value-quote :config="quoteImgOpacity"></value-quote>
                </div>
            </el-collapse-item>
            <el-collapse-item title="表格配置" name="5">
                
            </el-collapse-item>
            <el-collapse-item title="控件" name="6">
                <section class="control">
                    <aside draggable="true" @dragstart="dragStart($event,'rect')">
                        <svg class="icon controlItem" aria-hidden="true">
                            <use xlink:href="#icon-juxing"></use>
                        </svg>
                    </aside>
                    <aside draggable="true" @dragstart="dragStart($event,'font')">
                        <svg class="icon controlItem" aria-hidden="true">
                            <use xlink:href="#icon-tubiaozhizuomoban"></use>
                        </svg>
                    </aside>
                    <aside draggable="true" @dragstart="dragStart($event,'img')">
                        <svg class="icon controlItem" aria-hidden="true">
                            <use xlink:href="#icon-tupian"></use>
                        </svg>
                    </aside>
                    <aside draggable="true" @dragstart="dragStart($event,'table')">
                        <svg class="icon controlItem" aria-hidden="true">
                            <use xlink:href="#icon-charts-biaoge"></use>
                        </svg>
                    </aside>
                </section>
            </el-collapse-item>            
        </el-collapse>
    </section>
</template>
<script>
import { mapState } from "vuex";
import valueQuote from 'components/chartM/upDataValue.vue';
export default {
    props:{
        controlConfig:{
            type:Object
        },
        colorPicker:{
            type:Object
        }
    },
    components:{
        valueQuote
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        })
    },
    data(){
        return {
            sel:{//更改的字段值..
                font:{
                    fontFamily:"",
                    fontType:1,
                    value:"",
                    placeholder:""
                }
            },
            font:[//字体列表.....
                {
                    label:"宋体",
                    value:"\u5b8b\u4f53"
                },
                {
                    label:"仿宋",
                    value:"\u4eff\u5b8b"
                },
                {
                    label:"微软雅黑",
                    value:"\u5fae\u8f6f\u96c5\u9ed1"
                },
                {
                    label:"黑体",
                    value:"\u9ed1\u4f53"
                },
                {
                    label:"楷体",
                    value:"\u6977\u4f53"
                }
            ],
            tplConfig:{//模板配置.....
                tplSize:3,//模板尺寸
            },
            actItem:"6",
            quoteOpacity:{//透明度块....
                title:"透明度",
                value:50,
                type:"opacity",
                step:1,
                max:100,
                min:0
            },
            quoteFont:{
                title:"字体大小(px)",
                value:12,
                type:"fontSize",
                step:1,
                max:50,
                min:0
            },
            quoteRectFillet:{
                title:"圆角(%)",
                value:0,
                type:"quoteRectFillet",
                step:1,
                max:100,
                min:0
            },
            quoteRectBorder:{
                title:"粗细(px)",
                value:0,
                type:"thickness",
                step:1,
                max:1000,
                min:0                
            },
            quoteImgWidth:{
                title:"图片宽度(px)",
                value:0,
                type:"imgWidth",
                step:1,
                max:1000,
                min:0                    
            },
            quoteImgHeight:{
                title:"图片高度(px)",
                value:0,
                type:"imgHeight",
                step:1,
                max:1000,
                min:0                    
            },
            quoteImgFillet:{
                title:"圆角(%)",
                value:0,
                type:"imgFillet",
                step:1,
                max:100,
                min:0
            },    
            quoteImgOpacity:{
                title:"透明度(%)",
                value:0,
                type:"quoteImgOpacity",
                step:1,
                max:100,
                min:0
            },                     
        }
    },
    mounted(){
        this.$nextTick(()=>{
         
        })
    },
    methods:{
        /*关闭前调用*/ 
        itemFocusEvent( index, e, item ){

        },
        uploadChange(e){
            debugger;
        },
        selColor(e,target){//显示颜色选择器.....
            this.$emit( "showColorPicker", e , this.colorPicker.color, target );
        },
        dragStart(e,type){//开始拖动
            e.dataTransfer.setData( "type",type );
        }
    },
    watch:{
        
    }    
}
</script>
<style lang="less">
@import url("~style/pageCommon.less");
.el-collapse-item__header{
    font-size:18px;
}
.colorQuote{
    display:inline-block;
    width:20px;
    height:20px;
    border:1px solid #ddd;
}
.setBg{
    height:30px;
    line-height:30px;
    vertical-align:middle;
    display:flex;
    align-items:center;
    cursor:pointer;
    .selBgColor{
        >span{
            vertical-align:middle;
        }
    }
}
#upload{
    margin-left:10px;
}
.radioGroup{
    display:inline-block;
}
.quoteItem{
    display: inline-block;
}
.control{
    display: flex;
    justify-content: space-around;
    font-size: 35px;    
}
.controlItem{
     
}
</style>


