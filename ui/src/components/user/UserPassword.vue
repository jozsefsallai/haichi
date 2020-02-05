<template lang="pug">
  .form-container
    form(@submit='handleFormSubmit')
      .input-wrapper
        label(for='currentPassword') Current password:
        input(
          type='password'
          name='currentPassword'
          id='currentPassword'
          autocomplete='off'
          :disabled='loading'
        )
      .input-wrapper
        label(for='password') New password:
        input(
          type='password'
          name='password'
          id='password'
          autocomplete='off'
          :disabled='loading'
        )
      .input-wrapper
        label(for='password2') Confirm new password:
        input(
          type='password'
          name='password2'
          id='password2'
          autocomplete='off'
          :disabled='loading'
        )
      .input-wrapper
        button(type='submit', :disabled='loading') Save
</template>

<script>
export default {
  name: 'user-password',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleFormSubmit (e) {
      e.preventDefault();

      this.$emit('startloading');
      const payload = {
        currentPassword: e.target.currentPassword.value,
        password: e.target.password.value,
        password2: e.target.password2.value
      };
      this.$store.dispatch('updateUser', payload)
        .then(function () {
          this.$emit('stoploading');
        }.bind(this));
    }
  }
};
</script>
