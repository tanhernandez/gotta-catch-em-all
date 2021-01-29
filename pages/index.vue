<template>
  <div :class="getBem(blockClass)">
    <search-box v-model="search"/>
  </div>
</template>

<script>
import SearchBox from '~/components/SearchBox';
import PokemonCard from '~/components/PokemonCard';

export default {

  /*
  |--------------------------------------------------------------------------
  | Component > imported components
  |--------------------------------------------------------------------------
  */
  components: {
    SearchBox,
    PokemonCard
  },

  data () {
    return {
      blockClass: 'home-page',
      search: ''
    }
  }
}
</script>

<style lang="scss">

</style>
