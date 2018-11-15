<template>
<div class="qw_app_root">
   <qwMenu></qwMenu>
   <!-- <qwEditer></qwEditer> -->
   <index :appUrl="appUrl" :appName="appName" :userName="userName" :userImg="userImg" :companyName="companyName" :companyEnglish="companyEnglish" :companyLogo="companyLogo"></index>
</div>  
</template>
<script>
import {mapMutations,mapGetters,mapState} from 'vuex';
import index from "./page/index.vue"
import qwMenu from "./components/qwform/qwMenu.vue"
// import qwEditer from "./components/setting/editer.vue"
var vueObj={
    props:["appUrl", "userName", "userImg","companyName","companyEnglish","companyLogo","appName"],
    components:{
      index,
      qwMenu,
      // qwEditer
    },
    created(){
        window.localStorage.setItem('ports',this.appUrl);
    }
}
export default vueObj;
</script>
<style lang="less">
.qw_app_root{
  box-sizing: border-box;
  width: 100%;
  height: auto;
}
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
</style>
