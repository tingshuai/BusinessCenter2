import Vue from 'vue'
import Vuex from 'Vuex'
import app from './modules/app'
import skin from './modules/skin'
import skinConfig from "./modules/skinConfig";

Vue.use(Vuex);
const store={
    isLoading:false,//控制全局loading显示
    userName:'',
    userImg:'',
    companyName:'',
    companyEnglish:'',
    companyLogo:'',
    isShowSidebar:true,
}

export default new Vuex.Store({
    modules: {
        app,
        skin,
        skinConfig
    }
})