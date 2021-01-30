<template>
  <div :class="getBem(blockClass)" :style="imgStyle">
    <img
      :src="`/images/${imgSrc}`"
      :alt="imgSrc"
    >
  </div>
</template>

<script>
export default {

  /*
  |--------------------------------------------------------------------------
  | Component > props
  |--------------------------------------------------------------------------
  */
  props: {
    color: {
      type: String,
      default: 'black'
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > data
  |--------------------------------------------------------------------------
  */
  data () {
    return {
      blockClass: 'pokeball-float'
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > computed
  |--------------------------------------------------------------------------
  */
  computed: {

    /**
     * @return {string}
     */
    imgSrc () {
      return this.color === 'black'
             ? 'pokeball-silhoutte-black.png'
             : 'pokeball-silhoutte-white.png';
    },

    /**
     * @return {object}
     */
    imgStyle () {
      return this.color === 'black'
             ? {opacity: .07}
             : {opacity: .2};
    }
  }
}
</script>

<style lang="scss">
.pokeball-float {
  position: absolute;
  top: -70px;
  right: -70px;
  width: 300px;
  height: 300px;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
