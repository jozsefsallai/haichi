<template lang="pug">
  .loading-container
    .dots
      .dot(:class="{ active: current === 0 }")
      .dot(:class="{ active: current === 1 }")
      .dot(:class="{ active: current === 2 }")
    .loading-text Loading... This may take a while.
</template>

<script>
import Vue from 'vue';

export default Vue.component('loading', {
  data () {
    return {
      current: 0,
      interval: null
    };
  },
  mounted () {
    this.interval = setInterval(function () {
      this.current = this.current === 2
        ? 0
        : this.current + 1;
    }.bind(this), 300);
  },
  beforeDestroy () {
    clearInterval(this.interval);
  }
});
</script>

<style lang="scss" scoped>
  @import 'src/styles/colors';

  .loading-container {
    padding: 15px;
    text-align: center;

    .dots {
      margin-bottom: 20px;

      .dot {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid $accent;
        transition: background 100ms linear;
        margin-right: 15px;
        border-radius: 100%;

        &.active {
          background: $accent;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .loading-text {
      font-size: 14px;
      color: #777;
    }
  }
</style>
