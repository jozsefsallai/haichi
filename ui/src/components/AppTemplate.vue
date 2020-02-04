<template lang="pug">
  .container
    header
      .mid
        .logo Haichi
    section.content.mid
      slot
    the-footer
</template>

<script>
import TheFooter from 'components/TheFooter';

export default {
  name: 'app-template',
  components: {
    'the-footer': TheFooter
  }
};
</script>
