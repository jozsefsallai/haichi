<template lang="pug">
  app-template
    .page
      h1 Welcome to Haichi!
      p
        | Haichi (配置) is an open-source, API-driven anagram generator
        | written in Node.js. You can use it in the browser or you
        | can take full advantage of its API by
        |
        router-link(to='/signup') signing up
        |
        | and getting an API key.
      p Try it out yourself:
      form.haichi-form(@submit='handleFormSubmit')
        input(
          name='phrase'
          placeholder='Type something here...'
          autocomplete='off'
        )
        button(type='submit')
          i.fa.fa-search
          span Find Anagrams
      anagram-container(v-if='phrase && phrase.length', :phrase='phrase', :key='phrase')
</template>

<script>
import AppTemplate from 'components/AppTemplate';
import AnagramContainer from 'components/anagrams/AnagramContainer';

export default {
  name: 'index-page',
  components: {
    'app-template': AppTemplate,
    'anagram-container': AnagramContainer
  },
  data () {
    return {
      phrase: null
    };
  },
  methods: {
    handleFormSubmit (e) {
      e.preventDefault();
      this.phrase = e.target.phrase.value || null;
    }
  }
};
</script>

<style lang="scss">
  @import 'src/styles/colors';

  .haichi-form {
    margin-top: 60px;
    display: flex;

    input, button {
      font-family: 'sinkinsans', sans-serif;
      padding: 15px;
      box-sizing: border-box;
      outline: none;
    }

    input {
      font-size: 20px;
      border: 1px solid $accent;
      width: calc(100% - 200px);

      &:focus {
        background: #f3f3f3;
      }
    }

    button {
      font-size: 15px;
      background: $accent;
      color: #fff;
      width: 200px;
      cursor: pointer;
      border: 0;

      i {
        margin-right: 10px;
      }

      &:hover {
        background: lighten($accent, 10%);
      }
    }
  }
</style>
