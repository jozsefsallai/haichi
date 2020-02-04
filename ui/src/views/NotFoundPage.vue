<template lang="pug">
  app-template
    .page
      h1.title Uh-oh!
      p
        | What you tried to open... could not be found.
        | Perhaps, you could
        |
        router-link(to='/') go back to the home page
        | ?
</template>

<script>
import AppTemplate from 'components/AppTemplate';

export default {
  name: 'not-found-page',
  components: {
    'app-template': AppTemplate
  }
};
</script>
