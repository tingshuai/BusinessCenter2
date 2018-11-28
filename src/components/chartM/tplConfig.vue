<template>
    <aside class="tpl">
        <anchored @drop="drop" ref="container" :level="2" :config="config" @itemFocusEvent="itemFocusEvent"></anchored>
    </aside>
</template>
<script>
// var $ = require('jquery');
// var jQueryBridget = require('jquery-bridget');
// var Draggabilly = require('draggabilly');
// jQueryBridget( 'draggabilly', Draggabilly, $ );
import {mapState} from "vuex"
export default {
    props:{
        config:{
            type:Object
        }
    },
    components:{
        anchored:{
            render: function (createElement) {
                let _c = this.config.container;
                let that = this;
                return createElement('div',{
                   style: _c.style,
                   class: _c.class,
                   attrs:_c.attrs,
                   on:{
                       dragover(e){
                           e.preventDefault();
                       },
                       drop(e){
                           that.$emit("drop",e)
                       },
                       mousemove(e){
                           that.$emit( "itemFocusEvent", e );
                       },
                       mouseleave(e){
                           that.$emit( "itemFocusEvent", e );
                       }
                   },
                },this.config.listBar.map(function (item,index,array) {
                    if( item.tag == 'font' ){
                        return createElement('div',{
                            style: {
                                ...item.style,
                                cursor:'move'
                            },
                            class: [ ...item.class, item.act == true ? '_act_' : '' ],
                            attrs: item.attrs,
                            on:{
                                mousedown(e){
                                    that.$emit( "itemFocusEvent", e, index );
                                },
                                mouseup(e){
                                    that.$emit( "itemFocusEvent", e, index );
                                }
                            }
                        },[createElement('input',{
                                style: item.content.style,
                                class: [],
                                attrs: item.content.attrs,
                                domProps:{
                                    value:item.value
                                },
                                on:{
                                    mousedown(e){
                                        e.stopPropagation();
                                    },
                                    input:function(e){
                                        item.value = e.target.value;
                                    },
                                    keyup(e){
                                        if( e.keyCode == 13 ){
                                            debugger;
                                        }
                                    }
                                }
                        }),item.controlBar.map((it,i,arr)=>{
                            return createElement('span',{
                                style: it.style,
                                class: it.class,
                                attrs: it.attrs,
                                on:{
                                    
                                }
                            })
                        })])
                    }else if( item.tag == "img" ){
                        return createElement('div',{
                            style: item.style,
                            class: [ ...item.class, item.act == true ? '_act_' : '' ],
                            attrs:item.attrs,
                            domProps: {},
                            on:{
                                mousedown(e){
                                    that.$emit( "itemFocusEvent", e, index );
                                },
                                mouseup(e){
                                    that.$emit( "itemFocusEvent", e, index );
                                }
                            }
                        },[createElement('img',{
                                style: item.content.style,
                                class: [],
                                attrs: item.content.attrs,
                                domProps:{},
                                on:{
                                    input:function(e){
                                        self.$emit('input',e.target.value)
                                    }
                                }
                        }),item.controlBar.map((it,i,arr)=>{
                            return createElement('span',{
                                style: it.style,
                                class: it.class,
                                attrs: it.attrs,
                                on:{
                                    
                                }
                            })
                        })])
                    }else if( item.tag == "rect" ){
                        return createElement('div',{
                            style: item.style,
                            class: [ ...item.class, item.act == true ? '_act_' : '' ],
                            attrs:item.attrs,
                            domProps: {
                            },
                            on:{
                                mousedown(e){
                                    that.$emit( "itemFocusEvent", e, index );
                                },
                                mouseup(e){
                                    that.$emit( "itemFocusEvent", e, index );
                                }
                            }
                        }, [createElement('div', {
                                style: item.content.style,
                                class: [],
                                attrs: item.content.attrs
                        })] )
                    }else if( item.tag == "table" ){
                        return createElement('div',{
                            style: item.style,
                            class: [ ...item.class, item.act == true ? '_act_' : '' ],
                            attrs:item.attrs,
                            domProps: {},
                            on:{
                                mousedown(e){
                                    that.$emit( "itemFocusEvent", e, index );
                                },
                                mouseup(e){
                                    that.$emit( "itemFocusEvent", e, index );
                                }
                            }
                        },item.controlBar.map((it,i,arr)=>{
                            return createElement('span',{
                                style: it.style,
                                class: it.class,
                                attrs: it.attrs,
                                on:{
                                    
                                }
                            })
                        }))                        
                    }else if( item.tag == "line" ){//参考线.....
                        return createElement('div',{
                            style: item.style,
                            class: item.class,
                            attrs:item.attrs
                        })
                    }
                }))
            },
            props: {
                level: {
                    type: Number,
                    required: true
                },
                config:{
                    type:Object,
                    required:true
                }
            }
        }
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight
        })
    },
    data(){
        return {
            containerPosi:"",
            target: {
                offsetX:"",
                offsetY:""
            },
            draggabilly:"",//draggabilly对象....
        }
    },
    mounted(){
        this.$nextTick(()=>{
            // 获取container 的left和top值
            let box = document.getElementById('container');
            this.containerPosi = box.getBoundingClientRect();
            document.addEventListener('mouseup',(e)=>{
                this.$emit('changeIndex',e)
            })
        })
    },
    methods:{
        /*关闭前调用*/ 
        itemFocusEvent( e, index , item ){
            if( e.type == 'mousemove' ){
                // 设置目标元素的位置信息
                if( this.config.container.curIndex != null ){
                    this.$emit( "moveItem",e,this.containerPosi,this.config.container.curIndex,this.target );
                }
            }else if( e.type == 'mousedown' ){
                // 记录鼠标距离目标元素的边界距离......
                this.target.offsetX = e.offsetX;
                this.target.offsetY = e.offsetY;
                this.$emit( "pSwitchLayer", e,index )
            }else if( e.type == 'mouseup' ){
                // 指示目标元素为空.......
            }else if( e.type == "mouseleave" ){
                // 指示目标元素为空.......
            }else if( e.type == 'drag' ){

            }else if( e.type == 'dragstart' ){

            }else if( e.type == 'dragend' ){
                
            }
        },
        drop(e){
            let type = e.dataTransfer.getData("type");
            this.$emit("addPitem",e,type,this.containerPosi);
        }
    },
    watch:{
        config:{
            handler(n,o){
                
            },
            deep:true
        }
    }    
}
</script>
<style lang="less">
@import url("~style/pageCommon.less");
    .qwCommonPage{

    }
</style>

