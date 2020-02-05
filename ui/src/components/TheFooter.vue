<template lang="pug">
  footer
    .copy Made with ❤️ in Marosvásárhely.
    .github
      a(href='https://github.com/jozsefsallai/haichi', target='_blank', rel='noopener')
        i.fa.fa-github
        span GitHub
</template>

<script>
export default {
  name: 'the-footer'
};
</script>

<style lang="scss">
  footer {
    text-align: center;
    padding: 35px 10px;
    color: #aaa;
    font-size: 13px;

    .github {
      i {
        margin-right: 5px;
      }
    }
  }
</style>
