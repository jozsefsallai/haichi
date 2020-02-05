<template lang="pug">
  app-template
    .page
      h1.title Uh-oh!
      p
        | What you tried to open... could not be found.
        br
        | Perhaps, you could try
        |
        router-link(to='/') going back to the home page
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
