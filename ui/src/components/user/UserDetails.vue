<template lang="pug">
  .form-container
    form(@submit='handleFormSubmit')
      .input-wrapper
        label(for='username') Username:
        input(
          name='username'
          id='username'
          autocomplete='off'
          :value='user.username'
          :disabled='loading'
        )
      .input-wrapper
        label(for='name') Full name:
        input(
          name='name'
          id='name'
          autocomplete='off'
          :value='user.name'
          :disabled='loading'
        )
      .input-wrapper
        button(type='submit', :disabled='loading') Save
</template>

<script>
export default {
  name: 'user-details',
  props: {
    user: {
      type: Object,
      required: true
    },
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
        username: e.target.username.value,
        name: e.target.name.value
      };
      this.$store.dispatch('updateUser', payload)
        .then(function () {
          this.$emit('stoploading');
        }.bind(this));
    }
  }
};
</script>
