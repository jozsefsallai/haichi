<template lang="pug">
  .api-key
    div(v-if='!isErrored')
      loading(v-if='isMutating')
      div(v-else)
        .create(v-if='!apiKey')
          | You don't currently have an API key. Would you like to
          |
          a(href='javascript:;', @click='handleCreateClick') create one
          | ?
        .key(v-else)
          p
            | Your API key is a string that allows you to use the Haichi API
            | programmatically. This is unique to you and you should treat it
            | like a password. The API key does not give you access to modify
            | your account details, but it does let you fetch anagrams on your
            | behalf.
          .table
            .row
              .name API key:
              .value {{ apiKey.apikey }}
            .row
              .name Requests today:
              .value {{ apiKey.requests }}
            .row
              .name Last modified:
              .value {{ apiKey.updatedAt }}
          .generate-new
            a(href='javascript:;', @click='handleGenerateClick')
              i.fa.fa-refresh
              span Regenerate key
</template>

<script>
export default {
  name: 'api-key-container',
  computed: {
    apiKey () {
      return this.$store.state.key;
    },
    isMutating () {
      return this.$store.state.meta.key.mutating;
    },
    isErrored () {
      return this.$store.state.meta.key.errored;
    }
  },
  mounted () {
    if (!this.apiKey) {
      this.$store.dispatch('fetchKey');
    }
  },
  methods: {
    handleCreateClick () {
      return this.$store.dispatch('createKey');
    },
    handleGenerateClick () {
      return this.$store.dispatch('updateKey', this.apiKey.id);
    }
  }
};
</script>

<style lang="scss">
  @import 'src/styles/colors';

  .generate-new {
    padding: 20px;
    text-align: center;

    a {
      display: inline-block;
      padding: 10px 25px;
      background: $accent;
      color: #fff;
      transform: background 150ms linear;

      &:hover {
        background: lighten($accent, 10%);
      }

      i {
        margin-right: 10px;
      }
    }
  }
</style>
