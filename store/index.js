import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import audio from '@/store/modules/audio.js';
import common from '@/store/modules/common.js';


export default new Vuex.Store({
	state: {
		video_arr: []
	},
	mutations: {
		set_video_arr(state, x) {
			state.video_arr = x;
		},
	},
	modules: {
		audio,
		common,

	}
})