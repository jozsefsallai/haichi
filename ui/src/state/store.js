import Vue from 'vue';
import Vuex from 'vuex';

import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

const initialState = {
  meta: {
    key: {
      mutating: false,
      errored: false
    }
  },
  user: null,
  key: null
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: initialState,

  mutations,

  actions
});
