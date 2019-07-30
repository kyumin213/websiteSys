import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		component: resolve => require(['../components/common/home.vue'], resolve),
		children:[
			{
				path: '/proManage',
				name: 'proManage',
				component: resolve => require(['../components/proManage.vue'], resolve),
				meta: {
					title: '产品管理'
				}
			},{
				path: '/countryManage',
				name: 'countryManage',
				component: resolve => require(['../components/countryManage.vue'], resolve),
				meta:{
					title: '国家管理'
				}
			},{
				path: '/classification',
				name: 'classification',
				component: resolve => require(['../components/classification.vue'], resolve),
				meta:{
					title: '分类管理'
				}
			}]
	},{
		path: '/login',
		name: 'login',
		component: resolve => require(['../components/login.vue'], resolve),
	}]
})