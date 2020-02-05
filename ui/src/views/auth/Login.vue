<template lang="pug">
  app-template(:authPage='true')
    .page
      h1 Login
      .form-container
        form(@submit='handleFormSubmit')
          .input-wrapper
            label(for='username') Username:
            input(name='username', id='username', autocomplete='off')
          .input-wrapper
            label(for='password') Password:
            input(type='password', name='password', id='password', autocomplete='off')
          .input-wrapper
            button(type='submit') Log In
</template>

<script>
import AppTemplate from 'components/AppTemplate';
import Toaster from 'lib/toaster';
import errors from 'lib/errors';

export default {
  name: 'login-page',
  components: {
    'app-template': AppTemplate
  },
  methods: {
    handleFormSubmit (e) {
      e.preventDefault();
      const payload = {
        username: e.target.username.value,
        password: e.target.password.value
      };

      return fetch('/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(json => {
          if (json.ok) {
            this.$store.commit('setUser', json.user);
            Toaster.create('success', `Welcome back, ${json.user.name}!`, 'Woohoo!');
            this.$router.push('/user');
          } else {
            if (json.errors && json.errors.length) {
              json.errors.forEach(error => {
                Toaster.create('danger', errors.auth[error.code], 'Error');
              });
            } else {
              Toaster.create('danger', 'Something bad happened.', 'Uh-oh!');
            }
          }
        });
    }
  }
};
</script>
