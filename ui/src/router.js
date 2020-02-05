import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from 'state/store';

import 'components/Root';
import 'components/structure/Loading';

import IndexPage from 'views/IndexPage';
import NotFoundPage from 'views/NotFoundPage';

Vue.use(VueRouter);

// function ensureAuthenticated (to, from, next) {
//   if (!store.state.user) {
//     return next('/login');
//   }

//   next();
// }

// function ensureAnonymous (to, from, next) {
//   if (store.state.user) {
//     return next('/user');
//   }

//   next();
// }

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
});
