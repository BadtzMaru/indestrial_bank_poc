import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 倒计时秒数
		countDown: -1,
		// 倒计时暂停
		countPause: false,
		// 当前步骤
		nowStep: 1,
		// 银行卡帐号
		cardID: '8888666688886666326',
		// 银行卡密码
		password: '',
		// 身份证
		identity: '',
		// 手机号码
		phone: '15980260339',
		// 客户姓名
		name: '张三',
		// 推广人
		promoter: '',
		// 影像采集
		cameraImg: '',
		
	},
	mutations: {
		changeCountDown(state,val) {
			state.countDown = val;
		},
		changeNowStep(state,val) {
			state.nowStep = val;
		},
		changeCardID(state,val) {
			state.cardID = val;
		},
		changePassword(state,val) {
			state.password = val;
		},
		changeIdentity(state,val) {
			state.identity = val;
		},
		changePromoter(state,val) {
			state.promoter = val;
		},
		changeCameraImg(state,val) {
			state.cameraImg = val;
		},
		changeCountPause(state,val) {
			state.countPause = val;
		},
		doCountDown(state) {
			state.countDown--;
		},
		clearUp(state) {
			state.nowStep = 1;
			state.countDown = -1;
			state.cardID = '';
			state.password = '';
			state.identity = '';
			state.phone = '';
			state.promoter = '';
			state.cameraImg = '';
		},
	},
});
