import Vue from 'vue'
import app from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import Element from 'element-ui'
import ajax from './api/base.js'
import router from './router/index.js' 
import store from './store/index.js'
import 'babel-polyfill'
import './fonts/iconfont.js'

import pagetool from './components/pagetool.vue' //分页栏
import myToast from './components/Toast.vue' //弹窗

import toolbars from 'components/qfCommon/toolbar.vue' //工具栏
import ClassifiedSearch from 'components/qfCommon/ClassifiedSearch.vue' //分页栏
import formPage from 'components/qfCommon/form.vue' //分页栏
import ClassifiedSearchs from 'components/zyxCommon/ClassifiedSearch.vue' //分页栏
import Loading from 'components/zyxCommon/Loading.vue' //loading
import toolbar from 'components/zyxCommon/toolbar.vue' //按纽组
import page from './components/theme/page.vue'

Vue.component('toolbar', toolbar) //按纽组
Vue.component('toolbars', toolbars)  //工具栏
Vue.component('PageTool', pagetool)  //分页栏
Vue.component('ClassifiedSearch', ClassifiedSearch)  //分页栏
Vue.component('ClassifiedSearchs', ClassifiedSearchs)  //分页栏
Vue.component('Loading', Loading) //loading
Vue.component('myToast', myToast)  //弹窗
Vue.config.productionTip = false
import 'babel-polyfill';
// Vue.prototype.rightMenu = function (e,self) {
//   this.$store.commit('SET_CONTEXTMENU_EVENT', e);
//   this.$store.commit('SET_CONTEXTMENU_TARGET',self);
//   this.$store.commit('SET_SHOW_CONTEXTMENU',true);
// }
import VueDraggableResizable from 'vue-draggable-resizable'
 
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.use(Element);
Vue.component('Page',page)
Vue.component('ClassifiedSearch', ClassifiedSearch)
Vue.component('toolbar', toolbar)
Vue.component('formPage', formPage)

new Vue({
  el: '#qwApp',
  router,
  store,
  components: { app }
})