<template>
  <label :class="getBem(blockClass)">
    <div :class="getBem(blockClass, 'icon')">
      <img src="/images/search-icon.svg" alt="search-icon.svg"/>
    </div>
    <input
      type="text"
      v-model="iValue"
      class="round"
      :style="inputStyle"
    >
  </label>
</template>

<script>
export default {

  /*
  |--------------------------------------------------------------------------
  | Component > props
  |--------------------------------------------------------------------------
  */
  props: {
    value: {
      type: String
    },

    width: {
      type: String,
      default: '400px'
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > data
  |--------------------------------------------------------------------------
  */
  data () {
    return {
      blockClass: 'search-box'
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > computed
  |--------------------------------------------------------------------------
  */
  computed: {

    /**
     * Interface for this.value.
     */
    iValue: {
      get () { return this.value; },
      set (v) { this.$emit('input', v); }
    },

    /**
     * @return {Object}
     */
    inputStyle () {
      return {
        width: this.width
      }
    }
  }
}
</script>

<style lang="scss">
.search-box {
  position: relative;

  &__icon {
    position: absolute;
    width: 35px;
    height: 35px;
    z-index: 2;
    padding: 5px;
    opacity: .5;
  }

  input {
    box-sizing: border-box;
    position: relative;
    min-height: 45px;
    border: 0;
    background-color: $gray2;
    padding-left: 45px;
    padding-right: 25px;
  }
}
</style>
