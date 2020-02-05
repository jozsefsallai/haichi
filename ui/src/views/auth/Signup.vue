<template lang="pug">
  app-template(:authPage='true')
    .page
      h1 Sign Up
      .form-container
        form(@submit='handleFormSubmit')
          .input-wrapper
            label(for='username') Username:
            input(name='username', id='username', autocomplete='off')
          .input-wrapper
            label(for='name') Full name:
            input(name='name', id='name', autocomplete='off')
          .input-wrapper
            label(for='password') Password:
            input(type='password', name='password', id='password', autocomplete='off')
          .input-wrapper
            label(for='password2') Confirm password:
            input(type='password', name='password2', id='password2', autocomplete='off')
          .input-wrapper
            button(type='submit') Sign Up
</template>

<script>
import AppTemplate from 'components/AppTemplate';
import Toaster from 'lib/toaster';
import errors from 'lib/errors';

export default {
  name: 'signup-page',
  components: {
    'app-template': AppTemplate
  },
  methods: {
    handleFormSubmit (e) {
      e.preventDefault();
      const payload = {
        username: e.target.username.value,
        name: e.target.name.value,
        password: e.target.password.value,
        password2: e.target.password2.value
      };

      return fetch('/api/users', {
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
            this.$store.commit('setUser', json);
            Toaster.create('success', `Welcome, ${json.name}!`, 'Woohoo!');
            this.$router.push('/user');
          } else {
            if (json.errors && json.errors.length) {
              json.errors.forEach(error => {
                Toaster.create('danger', errors.signup[error.code], 'Error');
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
