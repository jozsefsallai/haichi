<template lang="pug">
  .container
    header
      .mid
        .logo
          router-link(to='/') Haichi
        nav.main-nav
          router-link(to='/') Home
          router-link(to='/login') Log In
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

<style lang="scss">
  @import 'src/styles/colors';

  header {
    background: $accent;
    color: #fff;

    .mid {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 26px;

      a {
        color: #fff;
        border: 0;
        text-decoration: none;
      }
    }

    .main-nav {
      a {
        display: inline-block;
        padding: 20px 25px;
        color: #fff;
        text-decoration: none;
        position: relative;
        margin-right: 5px;

        &::before {
          content: '';
          background: #fff;
          height: 0;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          transition: height 150ms linear;
        }

        &:hover, &.router-link-exact-active {
          &::before {
            height: 5px;
          }
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
