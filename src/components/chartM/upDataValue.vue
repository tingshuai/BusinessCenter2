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
                type:"",
                clientX:"",
                clientY:""
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
                if ( that.selItem.type != "" ) {
                    if( this.selItem.value + that.selItem.clientY - e.clientY < this.config.min ){
                        that.config.value = this.config.min;
                    }else if( this.selItem.value + that.selItem.clientY - e.clientY > this.config.max ){
                        that.config.value = this.config.max;
                    }else{
                        that.config.value = this.selItem.value + that.selItem.clientY - e.clientY;
                    }
                }
            })
            document.addEventListener("mouseup",(e)=>{
                that.selItem.type = "";
            })
        },
        mousedown(e){
            this.selItem.clientX = e.clientX;
            this.selItem.clientY = e.clientY;
            this.selItem.type = this.config.type;
            this.selItem.value = this.config.value;
        },
        onScroll(e){
            if( this.config.value > this.config.min && this.config.value < this.config.max ){
                e.deltaY > 0 ? this.config.value-- : this.config.value++;
            }else if( this.config.value == this.config.min ){
                e.deltaY > 0 ? this.config.value = this.config.min : this.config.value++;
            }else if( this.config.value == this.config.max ){
                e.deltaY > 0 ? this.config.value-- : this.config.value = this.config.max;
            }
        },
        updata(e){

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


