<template lang="pug">
  .anagram-container
    loading(v-if='loading')
    div(v-else)
      .error(v-if='errored') {{ errorMessage }}
      div(v-else)
        .anagrams-container(v-if='anagrams && anagrams.length')
          h2 Found {{ anagrams.length }} {{ anagrams.length === 1 ? 'anagram' : 'anagrams' }}.
          .list {{ anagrams.join(', ') }}
          .limited-results-notice(v-if='isResponseLimited')
            | Note: in order to avoid abuse, the number of returned anagrams is limited, so it's
            | likely that there are more anagrams than the ones listed above. If you want to
            | view the full list, you have to
            |
            router-link(to='/signup') create an account
            | .
</template>

<script>
export default {
  name: 'anagram-container',
  props: {
    phrase: {
      type: String,
      required: true
    },
    isResponseLimited: {
      type: Boolean,
      defualt: true
    }
  },
  data () {
    return {
      loading: true,
      errored: false,
      errorMessage: 'Could not fetch anagrams. Please try again later.',
      anagrams: []
    };
  },
  mounted () {
    if (this.phrase.length > 25) {
      this.loading = false;
      this.errored = true;
      this.errorMessage = 'Please provide a phrase shorter than 25 characters.';
      return;
    }

    return fetch(`/api/anagrams/${this.phrase}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          this.loading = false;
          this.errored = false;
          this.anagrams = json.anagrams;
        } else {
          this.loading = false;
          this.errored = true;
        }
      })
      .catch(err => {
        this.loading = false;
        this.errored = true;
        throw new Error(err);
      });
  }
};
</script>

<style lang="scss">
  @import 'src/styles/colors';

  .anagram-container {
    .error {
      background: $danger;
      color: #fff;
      padding: 15px 25px;
    }

    .limited-results-notice {
      background: #e9e9e9;
      padding: 15px 25px;
      margin-top: 20px;
    }
  }
</style>
