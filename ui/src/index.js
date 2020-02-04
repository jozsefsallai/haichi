import buildVM from 'lib/buildVM';
import store from 'state/store';
import router from './router';

const root = document.getElementById('root');

const user = JSON.parse(root.getAttribute('data-user')) || null;
const context = JSON.parse(root.getAttribute('data-context')) || null;

const vm = buildVM({
  store,
  router,
  user,
  context
});

vm.$mount('#root');
