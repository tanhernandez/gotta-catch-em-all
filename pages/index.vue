<template>
  <div :class="getBem(blockClass)">
    <div :class="getBem(blockClass, 'wrapper')">
      <pokeball-float/>

      <div :class="getBem(blockClass, 'header')">
        <h1>Pokédex</h1>
        <span :class="getBem(blockClass, 'header-subtitle')">
          Modern Nintendo theme.
        </span>
        <p>
          Type the name of the Pokémon that <br>you're looking for:
        </p>
        <search-box
          v-model="search"
          placeholder="Search for ID, Name, or Type"
          @change="setFormattedList"
          @reset="setFormattedList"
        />
      </div>

      <div :class="getBem(blockClass, 'body')">
        <template v-if="formattedList.length > 0">
          <div class="pokemon-card-container">
            <pokemon-card
              v-for="pokemon in formattedList"
              :key="pokemon.id"
              :pokemon="pokemon"
              @click="handleClickPokemonCard(pokemon.id)"
            />
          </div>
        </template>
        <template v-else>
          <p>
            There are no Pokémons found.
          </p>
        </template>
      </div>

      <a
        v-if="search === ''"
        href="#"
        :class="getBem(blockClass, 'load-more-button')"
        @click.prevent="handleClickLoadMore"
      >
        Load more Pokémon!
      </a>
    </div>
  </div>
</template>

<script>
import SearchBox from '~/components/SearchBox';
import PokemonCard from '~/components/PokemonCard';
import PokeballFloat from '~/components/PokeballFloat';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

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

  /*
  |--------------------------------------------------------------------------
  | Component > data
  |--------------------------------------------------------------------------
  */
  data () {
    return {
      blockClass: 'home-page',
      search: '',
      formattedList: []
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > methods
  |--------------------------------------------------------------------------
  */
  methods: {

    /**
     * @return {array}
     */
    setFormattedList () {
      if (this.search !== '') {
        this.formattedList = filter(this.$store.getters['pokemon/fullList'], (x) => {
          const q = this.search.toLowerCase();

          // noinspection EqualityComparisonWithCoercionJS
          return includes(x.name, q)
            || x.id == q
            || includes(x.types, q);
        });
      } else {
        this.formattedList = this.$store.getters['pokemon/paginatedList'];
      }
    },

    /**
     * @return {void}
     */
    handleClickLoadMore () {
      this.search = '';
      this.$store.commit(
        'pokemon/setListPage',
        this.$store.getters['pokemon/listCurrentPage'] + 1
      );
      this.setFormattedList();
      setTimeout(() => {
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
      }, 300);
    },

    /**
     * @param {int} id
     * @return {void}
     */
    handleClickPokemonCard (id) {
      this.$router.push({path: `/pokemon/${id}`});
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > mounted
  |--------------------------------------------------------------------------
  */
  mounted () {
    this.$store.dispatch('pokemon/listAll').then(() => {
      this.setFormattedList();
    });
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
      margin-bottom: 0;
    }

    &-subtitle {
      font-size: 12px;
    }

    p {
      line-height: 1.5em;
    }
  }

  &__body {
    padding-top: 50px;
  }

  &__load-more-button {
    box-sizing: border-box;
    @extend .flex, .flex-center;
    margin: 20px auto;
    background-color: $primary-color;
    color: #fff;
    width: 200px;
    height: 47px;
    text-align: center;
    font-weight: bold;
    border-radius: 50px;
    transition-duration: .5s;
    position: relative;
    top: 0;

    &:hover {
      background-color: lighten($primary-color, 10%);
      top: -5px;
    }
  }
}

.pokemon-card {
  &-container {
    @extend .flex;
  }

  width: calc(100% / 4);
}
</style>
