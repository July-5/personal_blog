import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import $ from 'jquery'
import moment from 'moment'
Vue.use(moment)



import 'highlight.js/styles/tomorrow-night-eighties.css'
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
});




Vue.use(mavonEditor);

import Axios from 'axios';
Vue.prototype.$Axios = Axios;

Vue.use(ElementUI);
Vue.config.productionTip = false

import animated from 'animate.css'
Vue.use(animated)

import typo from 'typo.css'
Vue.use(typo)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
