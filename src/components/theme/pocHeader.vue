<template>
    <div class="poc-home">
        <div class="poc-header clearfix">
            <div class="poc-home-logo left">
                <img :src="getCompanyLogo" class="left  bg-logo" style="height:40px;width:40px"/>
                <div class="poc-home-logo-r left">
                <h1 class="poc-home-title" :title="getCompanyName">{{getCompanyName}}</h1>
                <p class="poc-home-mtitle" :title="getCompanyEnglish">{{getCompanyEnglish}}</p>
                </div>
            </div>
            <div v-for="(item,index) in pocHeaderData" 
                 class="poc-home-navL left"
                 :class="{'active':isActive===item.title}"
                 @click="headerBack(item,index)">
                  {{item.title}}
            </div>
            <div class="poc-home-navR right">
                    <img :src="getUserImg" height="30">
                    <span>{{getUserName}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isActive: ""
    };
  },
  props: {
    pocHeaderData: Array
  },
  computed: {
    ...mapGetters([
      "getUserName",
      "getUserImg",
      "getCompanyName",
      "getCompanyEnglish",
      "getCompanyLogo"
    ])
  },
  mounted() {
    this.isActive = this.pocHeaderData[0].title;
  },
  methods: {
    headerBack(item, index) {
      this.isActive = item.title;
      this.$emit("headerBack", index, item.title);
    }
  }
};
</script>

<style lang="less">
.poc-home {
  height: 80px;
  width: 100%;
  min-width: 1280px;
  font-family: PingFang-SC-Bold;
  box-shadow: 0px 3px 5px rgba(117, 182, 225, 0.2);
  .bg-logo {
    margin: 20px 10px 0;
  }
  .poc-header {
    margin-bottom: 5px;
    background-color: white;
    height: 80px;
  }
  .poc-home-logo {
    height: 80px;
    background-color: #dee3e8;
    user-select: none;
    padding: 0 22.5px;
    margin-right: 60px;
    box-sizing: border-box;
    width: 260px;
  }
  .poc-home-logo-img {
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 5px;
  }
  .poc-home-logo-r {
    text-align: center;
  }
  .poc-home-title {
    font-size: 16px;
    line-height: 14px;
    margin-top: 25px;
    letter-spacing: 1.5px;
    white-space: nowrap;
    width: 155px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .poc-home-mtitle {
    font-size: 9px;
    line-height: 14px;
    margin-top: 5px;
    letter-spacing: -1px;
    white-space: nowrap;
    width: 155px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .poc-home-navL {
    position: relative;
    font-size: 20px;
    padding: 0 30px;
    line-height: 80px;
    cursor: pointer;
    color: #666666;
  }
  .poc-home-navL.active::after {
    content: "";
    position: absolute;
    width: 80%;
    height: 5px;
    background-color: #66b1ff;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .poc-home-navL.active {
    font-weight: bold;
    color: #333333;
  }
  .poc-home-navR {
    margin-right: 100px;
    line-height: 80px;
    .back-home {
      text-decoration: none;
      font-size: 25px;
      margin-right: 5px;
      font-weight: 600;
      color: #409eff;
      vertical-align: middle;
    }
    .back-home:hover {
      color: #6aadf1;
    }

    span {
      font-weight: 100;
      font-size: 14px;
    }
  }
}
</style>

