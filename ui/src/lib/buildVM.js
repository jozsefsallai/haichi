import Vue from 'vue';
import VTooltip from 'v-tooltip';

import buildRaven from './buildRaven';

export default function (opts) {
  const { user, router, store } = opts;

  buildRaven({
    ...opts.context.sentry,
    user
  });

  Vue.use(VTooltip);

  return new Vue({
    store,
    router
  });
};
