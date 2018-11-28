<template>
    <section class="quoteContainer" @wheel="onScroll">
        <span class="title">{{ config.title }}</span>
        <input class="quoteInput" type="text" :step="config.step" :max="config.max" :min="config.min" readonly autocomplete="off" @mousedown="mousedown" v-model="config.value"></input>
    </section>
</template>
<script>
import { mapState } from "vuex"
export default {
    props:{
      config:{
          type:Object
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
            selItem:{
                value:"",//临时存储this.config.value
                clientX:"",
                clientY:"",
                mousedown:false
            }
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.init();
        })
    },
    methods:{
        init(){
            // 初始化绑定事件.....
            let that = this;
            document.addEventListener("mousemove",(e)=>{
                if ( that.selItem.mousedown ) {
                    let _tepValue = that.config.value;
                    if( Number(that.selItem.value) + that.selItem.clientY - e.clientY < that.config.min ){
                        _tepValue = that.config.min;
                    }else if( Number(that.selItem.value) + that.selItem.clientY - e.clientY > that.config.max ){
                        _tepValue = that.config.max;
                    }else{
                        _tepValue = Number(that.selItem.value) + that.selItem.clientY - e.clientY;
                    }
                    that.updata(e,_tepValue);
                }
            })
            document.addEventListener("mouseup",(e)=>{
                that.selItem.mousedown = false;
            })
        },
        mousedown(e){
            this.selItem.clientX = e.clientX;
            this.selItem.clientY = e.clientY;
            this.selItem.value = this.config.value;
            this.selItem.mousedown = true;
        },
        onScroll(e){
            let _tepValue = this.config.value;
            if( _tepValue > this.config.min && _tepValue < this.config.max ){
                e.deltaY > 0 ? _tepValue-- : _tepValue++;
            }else if( _tepValue == this.config.min ){
                e.deltaY > 0 ? _tepValue = this.config.min : _tepValue++;
            }else if( _tepValue == this.config.max ){
                e.deltaY > 0 ? _tepValue-- : _tepValue = this.config.max;
            }
            this.updata(e,_tepValue);
        },
        updata(e,_tepValue){
            this.$emit( "updataStyle", e, this.config.type, _tepValue );
        }
    },
    watch:{
        
    }    
}
</script>
<style lang="less">
@import url("~style/pageCommon.less");
.quoteContainer{
    display:inline-block;
    height:100px;
    width:100px;
    background-color:#ddd;
    text-align:center;
    cursor:grab;
    user-select: none;
    appearance: none;
    .quoteInput{
        height: 70px;
        width: 100%;
        display: inline-block;
        border: none;
        text-align: center;
        font-size:35px;
        background-color:#ddd;
        cursor:grab;
        user-select: none;
        &::selection{background:rgba(0,0,0,0);}        
    }
    .title{
        font-size: 14px;
        color: black;
        height: 30px;
        line-height: 30px;
        display: inline-block;
    }
}
</style>


