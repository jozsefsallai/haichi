<template lang="pug">
  .container
    header
      .mid
        .logo
          router-link(to='/') Haichi
        nav.main-nav
          router-link(
            v-for='item, idx in navigationItems'
            :key='idx'
            :to='item.route'
          ) {{ item.name }}
          a(v-if='user', href='javascript:;', @click='handleLogoutClick') Log Out
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
    }
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
