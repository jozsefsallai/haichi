import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'state/store';

import 'components/Root';
import 'components/structure/Loading';
import 'components/structure/toaster/ToastContainer';

import IndexPage from 'views/IndexPage';
import NotFoundPage from 'views/NotFoundPage';

import SignupPage from 'views/auth/Signup';
import LoginPage from 'views/auth/Login';

Vue.use(VueRouter);

// function ensureAuthenticated (to, from, next) {
//   if (!store.state.user) {
//     return next('/login');
//   }

//   next();
// }

function ensureAnonymous (to, from, next) {
  if (store.state.user) {
    return next('/user');
  }

  next();
}

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/signup',
      beforeEnter: ensureAnonymous,
      component: SignupPage
    },
    {
      path: '/login',
      beforeEnter: ensureAnonymous,
      component: LoginPage
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
});
