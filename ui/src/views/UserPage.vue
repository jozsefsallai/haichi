<template lang="pug">
  app-template(:key='user.updatedAt')
    .page
      h1 Welcome, {{ user.name }}!
      .userpage-container
        h2 Basic Settings
        user-details(
          :user='user'
          :loading='loading'
          @startloading='handleStartLoading'
          @stoploading='handleStopLoading'
        )
      .userpage-container
        h2 Change Your Password
        user-password(
          :loading='loading'
          @startloading='handleStartLoading'
          @stoploading='handleStopLoading'
        )
      .userpage-container
        h2 Your API Key
        api-key-container
</template>

<script>
import AppTemplate from 'components/AppTemplate';
import APIKeyContainer from 'components/user/APIKeyContainer';
import UserDetails from 'components/user/UserDetails';
import UserPassword from 'components/user/UserPassword';

import { mapState } from 'vuex';

export default {
  name: 'user-page',
  components: {
    'app-template': AppTemplate,
    'api-key-container': APIKeyContainer,
    'user-details': UserDetails,
    'user-password': UserPassword
  },
  data () {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState([ 'user' ])
  },
  methods: {
    handleStartLoading () {
      this.loading = true;
    },
    handleStopLoading () {
      this.loading = false;
    }
  }
};
</script>
