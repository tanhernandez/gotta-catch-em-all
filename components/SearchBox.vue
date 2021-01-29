<template>
  <label :class="getBem(blockClass)">
    <div :class="getBem(blockClass, 'icon')">
      <img src="/images/search-icon.svg" alt="search-icon.svg"/>
    </div>
    <input
      :class="getBem(blockClass, 'input')"
      type="text"
      v-model="iValue"
      class="round"
      :style="inputStyle"
      :placeholder="placeholder"
      @input="handeInputChange"
    >
    <transition name="fade-up">
      <div
        v-if="iValue !== ''"
        :class="getBem(blockClass, 'reset-button')"
        :ref="getBem(blockClass, 'reset-button')"
        @click="handleClickReset"
      >
        <img src="/images/reset-icon.svg" alt="reset-icon.svg"/>
      </div>
    </transition>
  </label>
</template>

<script>
import debounce from 'lodash/debounce';

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
    },

    placeholder: {
      type: String,
      default: ''
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
  },

  /*
  |--------------------------------------------------------------------------
  | Component > method
  |--------------------------------------------------------------------------
  */
  methods: {

    /**
     * @return {void}
     */
    handeInputChange: debounce(function () {
      this.$emit('change', this.iValue);
    }, 250),

    /**
     * @return {void}
     */
    handleClickReset () {
      const button = this.$refs[this.getBem(this.blockClass, 'reset-button')];
      const cls = 'rotate-animation';

      button.classList.add(cls);
      this.iValue = '';
      this.$emit('reset');

      setTimeout(() => {
        button.classList.remove(cls);
      }, 800)
    }
  }
}
</script>

<style lang="scss">
.search-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;

  &__icon {
    position: absolute;
    width: 45px;
    height: 45px;
    z-index: 2;
    padding: 4px;
    opacity: .5;
    margin-left: 2px;
  }

  &__input {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    min-height: 47px;
    border: 0;
    background-color: $gray2;
    padding-left: 47px;
    padding-right: 25px;
  }

  &__reset-button {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 47px;
    height: 47px;
    padding: 5px;
    cursor: pointer;
    transition-duration: .8s;
    transition-property: transform;

    img {
      opacity: .5;
    }

    &.rotate-animation {
      transform: rotate(360deg);
    }
  }
}
</style>
