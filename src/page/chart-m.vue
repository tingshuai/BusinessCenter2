<template>
<div class="chartPage">
    <aside class="controlBar">
        <control-bar ref="controlBar" @showColorPicker="showColorPicker" :colorPicker="colorPicker" :controlConfig="controlConfig"></control-bar>
    </aside>
    <aside class="container">
        <tpl-config @moveItem="moveItem" @pSwitchLayer="pSwitchLayer" @addPitem="addItem" ref="chartCont" :config="chartData"></tpl-config>
    </aside>
    <chrome-picker v-show="colorPicker.show" :style="colorPicker.style" id="colorPicker" ref="colorPicker" :value="colorPicker.color" @input="updateValue"></chrome-picker>
</div>
</template>
<script>
import {mapState} from "vuex"
import tplConfig from 'components/chartM/tplConfig.vue';
import controlBar from 'components/chartM/controlBar.vue';
import * as _chartData from 'components/chartM/chartData.js';
//颜色拾取器
import { Chrome } from 'vue-color'
// draggabilly移动插件...
var $ = require('jquery');
var jQueryBridget = require('jquery-bridget');
var Draggabilly = require('draggabilly');
jQueryBridget( 'draggabilly', Draggabilly, $ );
export default {
    components:{
        tplConfig,controlBar,
        'chrome-picker': Chrome
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        })
    },
    data(){
        return {
            colorPicker:{
                color:"#ffffff",
                show:false,
                style:{
                    top:0,
                    left:0
                }
            },
            controlConfig:{},
            chartData:_chartData.de
        }
    },
    mounted(){
        this.$nextTick(()=>{
            let that = this;
            document.body.addEventListener( "click", (e)=>{
                let len = $('#colorPicker').has(e.target).length;
                if ( len == 0 ) {
                    that.colorPicker.show = false;
                }
            });
        })
    },
    methods:{
        updateValue(val){
            // 选择颜色时为相应元素赋值.....
            this.colorPicker.color = val.hex8;
            this.chartData.container.style['background-color'] = val.hex8;
        },
        showColorPicker(e, _color, _type){//定位显示颜色选择器....
            this.colorPicker.show = true;
            this.colorPicker.style.left = e.clientX + 'px';
            this.colorPicker.style.top = e.clientY + 'px';
        },
        addItem(e,type,containerPosi){//拖动以添加项目.....
            let _data = JSON.parse( JSON.stringify(_chartData[type]) ) ;
            _data.style.left = e.clientX - containerPosi.left + 'px';
            _data.style.top = e.clientY - containerPosi.top + 'px';
            _data.attrs.id = new Date().getTime();
            this.chartData.listBar.splice(this.chartData.listBar.length,0,_data);
        },
        pSwitchLayer(e,index){
            // let temp = this.chartData.listBar[index];//选中的呢一个....
            // this.chartData.listBar.splice(index, 1);
            // this.chartData.listBar.push( temp );
        },
        moveItem(e,containerPosi,_index,targetPosi){//mousemove的event对象, #conttainer的getBoundingClientRect对象, 点击的元素下标， 目标元素的event
            let _target = this.chartData.listBar[ _index ];
            let _rect = document.getElementById(_target.attrs.id).getBoundingClientRect();
            // 移动元素.....
            let _left = e.clientX - containerPosi.left - targetPosi.offsetX;
            let _top = e.clientY - containerPosi.top - targetPosi.offsetY;
            _left < 0 ? _left = 0 : null;
            _top < 0 ? _top = 0 : null;
            _left > containerPosi.width - _rect.width ? _left = containerPosi.width - _rect.width : null;
            _top > containerPosi.height - _rect.height ? _top = containerPosi.height - _rect.height : null;
            _target.style.left = _left + 'px';
            _target.style.top = _top + 'px';
        }
    }
}
</script>
<style lang="less">
@import url("~style/pageCommon.less");
.qwCommonPage{

}
.chartPage{
    display:flex;
    justify-content:flex-start;
    align-items:flex-start;
    .controlBar{
        width:300px;
    }
}
.controlBar{
    width:"";
}
#colorPicker{
    position:absolute;
}
._item{
    position: absolute;
}
</style>


