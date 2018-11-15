
<template>
    <div class="poc-page">
    <!-- 导航 -->
    <poc-header :pocHeaderData="pageData.pocHeaderData" ref="headMenu" @headerBack="headerBack"></poc-header>
    <!-- 主体 -->
    <div class="poc-page-main clearfix">
        <sidebar v-if="isSidebar" :config="sidebarData"  @slideBack="slideBack" ref="sidebar"></sidebar>
        <div class="poc-page-body" :class="sidebarData.visible?'left-go':'left-back'">
            <div class="bread-crumbs">
                 <p>{{setTitle}}</p>
                 <h1>{{h1}}</h1>
             </div>
             <div class="page-content">
                 <router-view></router-view>
             </div>

        </div>
    </div>
    </div>
</template>
<script>
import sidebar from './Sidebar.vue'
import pocHeader from './pocHeader.vue'
export default {
  data: function() {
    return {
      sidebarData: {},
      setTitle: "",
      h1: "",
      subtitle: "",
      isSidebar: true
    };
  },
  components:{
    sidebar,
    pocHeader
  },
  props: ["pageData"],
  mounted() {
    this.sidebarData = this.pageData.sidebarData[0];
    this.setInfoShow();
  },
  watch: {
    $route(to, from) {
      if (to.name) {
        for (let i in this.pageData.sidebarData) {
          this.pageData.sidebarData[i].data.forEach((value, index) => {
            if (to.name === value.name) {
              this.$refs.headMenu.isActive = this.pageData.sidebarData[i].title;
              let path = to.path.replace("/", "./");
              this.pageData.sidebarData[i].path = path;
              this.$set(this, "sidebarData", this.pageData.sidebarData[i]);
              this.headerBack(i, this.$refs.headMenu.isActive);
            }
          });
        }
      }
    }
  },
  methods: {
    slideBack(data, subtitle) {
      this.setTitle = this.h1 + data;
      // this.subtitle = subtitle;
    },
    headerBack(index, title) {
      this.sidebarData = this.pageData.sidebarData[index];
      this.setInfoShow();
      // 默认切换第一个router
      let result = this.sidebarData.path
      this.$router.push({ path: result });
      // 重新渲染
      this.isSidebar = false;
      setTimeout(() => {
        this.isSidebar = true;
      }, 0);
    },
    setSubtitle(chlid) {
      if (chlid) {
        // 副标题
        this.subtitle = chlid[0].name;
      } else {
        this.subtitle = this.sidebarData.data[0].name;
      }
    },
    setInfoShow() {
      this.h1 = this.sidebarData.title;
      let chlid = this.sidebarData.data[0].chlid;
      this.setSubtitle(chlid);
      this.setTitle =
        this.h1 +
        " / " +
        this.sidebarData.data[0].name +
        (chlid ? " / " + chlid[0].name : "");
    }
  }
};
</script>

<style lang="less">
.poc-page{
    .bread-crumbs{
        height: 82px;
        background-color: white;
        padding-left: 24px;
        padding-top: 17px;
        box-sizing: border-box;
        border-bottom: #E5E5E5 1px solid;
        p{
            color: #666;
            font-size: 14px;
            line-height: 1;
        }
        h1{
            color: #333;
            font-size: 20px;
            margin-top: 16px;
            line-height: 1;
        }
    }
    .poc-page-main{
        position: absolute;
        top: 80px;
        bottom: 0;
        width: 100%;
        min-height: 600px;
        min-width: 1280px;
        max-height: 100vh;
        .poc-page-body{
            position: absolute;
            right: 0;
            // background: #fff;
            top: 0;
            bottom: 0;
            transition: left 0.5s;
            overflow: auto;
            box-sizing: border-box;
            padding:20px;
        }
    }
    .left-go{
        left: 260px;
    }
    .left-back{
        left: 0;
    }
   }
</style>

