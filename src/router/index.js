import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Plugin from '@/components/Plugin.vue';
import Password from '@/components/Password.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		redirect: '/plugin',
		component: Home,
		children: [
			{
				path: '/plugin',
				name: 'Plugin',
				component: Plugin,
			},
			{
				path: '/password',
				name: 'Password',
				component: Password,
			},
		]
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
