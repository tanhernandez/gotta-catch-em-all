<template>
  <div :class="getBem(blockClass)">
    <div :class="getBem(blockClass, 'wrapper')">
      <pokeball-float/>

      <div :class="getBem(blockClass, 'header')">
        <h1>Sophisticated Pokedex</h1>
        <p>
          Type the name of the pokemon that <br>you're looking for:
        </p>
        <search-box v-model="search" placeholder="Search for Name or ID"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '~/components/SearchBox';
import PokemonCard from '~/components/PokemonCard';
import PokeballFloat from '~/components/PokeballFloat';

export default {

  /*
  |--------------------------------------------------------------------------
  | Component > imported components
  |--------------------------------------------------------------------------
  */
  components: {
    SearchBox,
    PokemonCard,
    PokeballFloat
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
.home-page {
  position: relative;

  &__wrapper {
    max-width: 1200px;
    width: 80%;
    margin: 0 auto;
  }

  &__header {
    position: relative;
    padding-top: 59px;

    h1 {
      margin-top: 0;
    }

    p {
      line-height: 1.5em;
    }
  }
}
</style>
