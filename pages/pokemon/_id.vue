<template>
  <div :class="[getBem(blockClass), typeBgColor]">
    <canvas :class="getBem(blockClass, 'particle-background')"></canvas>
    <div :class="getBem(blockClass, 'pokeball-overlay')">
      <img
        src="/images/pokeball-silhoutte-white.png"
        alt="pokeball-silhoutte-white.png"
      >
    </div>
    <div :class="getBem(blockClass, 'navigation')">
      <ul>
        <li v-if="isShowPrevButton">
          <a href="#" @click.stop.prevent="handleClickPrev">
            <span># {{ prevPokemon.id }}</span>
            <span>{{ startCase(prevPokemon.name) }}</span>
          </a>
        </li>
        <li>
          <a href="#" @click.stop.prevent="handleClickBackToList">
            Back to list
          </a>
        </li>
        <li v-if="isShowNextButton">
          <a href="#" @click.stop.prevent="handleClickNext">
            <span># {{ nextPokemon.id }}</span>
            <span>{{ startCase(nextPokemon.name) }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div :class="getBem(blockClass, 'wrapper')">
      <div :class="getBem(blockClass, 'image-col')">
        <div :class="getBem(blockClass, 'image')">
          <img :src="`${POKEMON_ART}/${pokemonId}.png`" :alt="activePokemon.name">
        </div>
      </div>
      <div :class="getBem(blockClass, 'verbiage-col')">
        <div :class="getBem(blockClass, 'verbiage-wrapper')">
          <h3>
            # {{ activePokemon.id }}
          </h3>
          <h1>
            {{ startCase(activePokemon.name) }}
          </h1>
          <div :class="getBem(blockClass, 'verbiage-details')">
            <pokemon-details
              :pokemon="pokemonData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { POKEMON_ART } from 'assets/js/constants/url';
import Particles from 'particlesjs';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import forEach from 'lodash/forEach';
import PokemonDetails from '@/components/PokemonDetails';

export default {

  /*
  |--------------------------------------------------------------------------
  | Component > components
  |--------------------------------------------------------------------------
  */
  components: {
    PokemonDetails
  },

  /*
  |--------------------------------------------------------------------------
  | Component > data
  |--------------------------------------------------------------------------
  */
  data () {
    return {
      blockClass: 'pokemon-id',
      activePokemon: {},
      pokemonData: {},
      POKEMON_ART
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > computed
  |--------------------------------------------------------------------------
  */
  computed: {

    /**
     * @return {int}
     */
    pokemonId () {
      return parseInt(this.$route.params.id);
    },

    typeBgColor () {
      if (
        !isEmpty(this.activePokemon)
        && !isNil(this.activePokemon.types)
        && !isEmpty(this.activePokemon.types)
      ) {
        const firstType = this.activePokemon.types[0];
        return !isNil(firstType) ? `type-${firstType}-bg-color` : '';
      } else {
        return '';
      }
    },

    /**
     * @return {boolean}
     */
    isShowPrevButton () {
      return !isNil(this.$store.getters['pokemon/prevPokemon']);
    },

    isShowNextButton () {
      return !isNil(this.$store.getters['pokemon/nextPokemon']);
    },

    /**
     * @returns {object|null}
     */
    prevPokemon () {
      return this.$store.getters['pokemon/prevPokemon'];
    },

    /**
     * @returns {object|null}
     */
    nextPokemon () {
      return this.$store.getters['pokemon/nextPokemon'];
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > methods
  |--------------------------------------------------------------------------
  */
  methods: {
    startCase,

    /**
     * @return {void}
     */
    handleClickPrev () {
      this.$router.push({name: 'pokemon-id', params: {id: this.prevPokemon.id}});
    },

    /**
     * @return {void}
     */
    handleClickNext () {
      this.$router.push({name: 'pokemon-id', params: {id: this.nextPokemon.id}});
    },

    /**
     * @return {void}
     */
    handleClickBackToList () {
      this.$router.push({name: 'index'});
    },

    /**
     * @return {void}
     */
    loadPokemonData () {
      let promises = [];
      promises.push(this.$store.dispatch('pokemon/getPokemon', {id: this.pokemonId}));
      promises.push(this.$store.dispatch('pokemon/getPokemonSpecies', {id: this.pokemonId}));

      Promise.all(promises).then((responses) => {
        forEach(responses, (r) => {
          this.pokemonData = {
            ...this.pokemonData,
            ...r.data
          }
        })
      });
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > mounted
  |--------------------------------------------------------------------------
  */
  mounted () {
    this.activePokemon = this.$store.getters['pokemon/activePokemon'];
    const particleEl = this.getBem(this.blockClass, 'particle-background');
    this.loadPokemonData();

    Particles.init({
      selector: `.${particleEl}`,
      color: '#ffff',
      maxParticles: 300,
      minDistance: 70,
      // connectParticles: true,
      sizeVariations: 5,
      speed: .2
    });
  }
}
</script>

<style lang="scss">
.pokemon-id {
  position: relative;
  width: 100%;
  height: 100vh;

  &__wrapper {
    position: relative;
    max-width: 1200px;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    z-index: 2;
    @extend .flex;
    justify-content: center;
    align-items: stretch;
  }

  &__image-col, &__verbiage-col {
    width: 50%;
    @extend .flex, .flex-center;
  }

  &__pokeball-overlay {
    @extend .flex, .flex-center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: .15;
  }

  &__navigation {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 50;

    ul {
      margin: 0;
      padding: 20px 20px;
      @extend .flex;
      justify-content: space-between;
      align-items: center;
    }

    ul, ul > li {
      list-style: none;
    }

    a {
      color: #fff;
      font-weight: bold;

      span {
        display: block;
        text-align: center;
      }
    }
  }

  &__image {
    position: relative;

    img {
      position: relative;
      z-index: 1;
      max-width: 300px;
      height: auto;
    }

    &:after {
      content: '';
      position: relative;
      z-index: 0;
      display: block;
      width: 300px;
      height: 30px;
      border-radius: 50%;
      background-color: #000;
      opacity: .20;
      margin-top: -45px;
    }
  }

  &__particle-background {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    opacity: .3;
  }

  &__verbiage {
    &-wrapper {
      width: 100%;
      padding: 20px 0;

      h1, h3 {
        color: #fff;
        text-align: right;
        margin-top: 0;
        margin-bottom: 0;
      }

      h1 {
        font-size: 50px;
      }

      h3 {
        font-size: 32px;
      }
    }

    &-details {
      padding-top: 20px;
    }
  }
}
</style>
