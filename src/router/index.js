import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Plugin from '@/components/Plugin.vue';
import Password from '@/components/Password.vue';
import Identity from '@/components/Identity.vue';
import Contract from '@/components/Contract.vue';
import Sms from '@/components/Sms.vue';

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
			{
				path: '/identity',
				name: 'Identity',
				component: Identity,
			},
			{
				path: '/contract',
				name: 'Contract',
				component: Contract,
			},
			{
				path: '/sms',
				name: 'Sms',
				component: Sms,
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
