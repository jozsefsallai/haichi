<template lang="pug">
  .container
    header
      .mid
        .logo
          router-link(to='/') Haichi
        nav.main-nav(:class='{ active: navOpened }')
          router-link(
            v-for='item, idx in navigationItems'
            :key='idx'
            :to='item.route'
          ) {{ item.name }}
          a(v-if='user', href='javascript:;', @click='handleLogoutClick') Log Out
      .hamburger-container
        a(href='javascript:;', @click='handleHamburgerClick')
          i.fa.fa-bars
    section.content.mid(:class='{ auth: authPage }')
      transition(name='slide-fade', mode='out-in', appear=true)
        slot
    the-footer
</template>

<script>
import TheFooter from 'components/TheFooter';
import { mapState } from 'vuex';
import Toaster from 'lib/toaster';

export default {
  name: 'app-template',
  components: {
    'the-footer': TheFooter
  },
  data () {
    return {
      navOpened: false
    };
  },
  props: {
    authPage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState([ 'user' ]),
    navigationItems () {
      const items = [
        { route: '/', name: 'Home' }
      ];

      if (this.user) {
        items.push({ route: '/user', name: this.user.name });
      } else {
        items.push(
          { route: '/login', name: 'Log In' },
          { route: '/signup', name: 'Sign Up' }
        );
      }

      return items;
    }
  },
  methods: {
    handleLogoutClick () {
      return fetch('/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      })
        .then(res => res.json())
        .then(json => {
          if (json.ok) {
            this.$store.commit('setUser', null);
            Toaster.create('success', 'You have been logged out successfully!', 'Bye!');
            this.$router.push('/');
          }
        })
        .catch(err => {
          Toaster.create('danger', 'Something bad happened. You have not been logged out.', 'Uh-oh!');
          throw new Error(err);
        });
    },
    handleHamburgerClick () {
      this.navOpened = !this.navOpened;
    }
  }
};
</script>

<style lang="scss">
  @import 'src/styles/colors';
  @import 'src/styles/mixins';

  header {
    background: $accent;
    color: #fff;
    position: relative;

    .mid {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @include ms-break {
        display: block;
      }
    }

    .logo {
      font-size: 26px;

      a {
        color: #fff;
        border: 0;
        text-decoration: none;
        display: inline-block;

        @include ms-break {
          padding: 12px 0;
        }
      }
    }

    .main-nav {
      @include ms-break {
        display: none;

        &.active {
          display: block;
        }
      }

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

        @include ms-break {
          display: block;
          padding: 10px 15px;

          &::before {
            display: none;
          }

          &.router-link-exact-active {
            background: rgba(255, 255, 255, .2)
          }
        }
      }
    }

    .hamburger-container {
      position: absolute;
      top: 20px;
      right: 20px;
      display: none;

      a {
        display: inline-block;
        font-size: 24px;
        color: #fff;
      }

      @include ms-break {
        display: block;
      }
    }
  }
</style>
