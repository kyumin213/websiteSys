// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import App from './App'
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['token'] = sessionStorage.getItem('token')
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem('token')
  if (!role && to.path !== '/login') {
    next('/login')
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      })
    } else {
      next()
    }
  }
})
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
