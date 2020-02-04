import Vue from 'vue';
import Vuex from 'vuex';

import * as mutations from './mutations';

Vue.use(Vuex);

const initialState = {
  user: null
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: initialState,

  mutations
});
