import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import pick from 'lodash.pick';

let raven = null;

export default function (opts) {
  if (raven) {
    return raven;
  }

  const publicToken = opts.public;

  if (publicToken) {
    const dsn = 'https://c40996814e7b41ff975a59e1764f1625@sentry.io/2236469';

    raven = Raven.config(dsn);
    raven.addPlugin(RavenVue, Vue);
    raven.install();

    if (opts.user) {
      Raven.setUserContext(pick(opts.user, 'id', 'username', 'name'));
    }
  }
  return raven;
};
