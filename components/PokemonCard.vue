<template>
  <div :class="getBem(blockClass)">
    <div
      :class="[
        getBem(blockClass, 'wrapper'), typeBgColor
      ]"
    >
      <div :class="getBem(blockClass, 'pokeball-float')">
        <img
          src="/images/pokeball-silhoutte-white.png"
          alt="pokeball-silhoutte-white.png"
        >
      </div>
      <div :class="getBem(blockClass, 'details')">
        <div :class="getBem(blockClass, 'thumbnail')">
          <img :src="`${POKEMON_ART}/${pokemon.id}.png`" :alt="pokemon.name">
        </div>
        <div :class="getBem(blockClass, 'pokemon-props')">
          <ul>
            <li :class="getBem(blockClass, 'id')">
              # {{ pokemon.id }}
            </li>
            <li :class="getBem(blockClass, 'name')">
              {{ startCase(pokemon.name) }}
            </li>
            <li :class="getBem(blockClass, 'types')">
            <span v-for="type in pokemon.types" :class="typeTextColor">
              {{ type }}
            </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { POKEMON_ART } from 'assets/js/constants/url';
import isNil from 'lodash/isNil';
import startCase from 'lodash/startCase';

export default {

  /*
  |--------------------------------------------------------------------------
  | Component > props
  |--------------------------------------------------------------------------
  */
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > data
  |--------------------------------------------------------------------------
  */
  data () {
    return {
      blockClass: 'pokemon-card',
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
     * @returns {string}
     */
    typeBgColor () {
      const firstType = this.pokemon.types[0];
      return !isNil(firstType) ? `type-${firstType}-bg-color` : '';
    },

    typeTextColor () {
      const firstType = this.pokemon.types[0];
      return !isNil(firstType) ? `type-${firstType}-color` : '';
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > methods
  |--------------------------------------------------------------------------
  */
  methods: {
    startCase
  }
}
</script>

<style lang="scss">
.pokemon-card {
  position: relative;
  height: 300px;
  padding: 10px;
  box-sizing: border-box;
  transition: all .5s;
  cursor: pointer;
  top: 0;

  &:hover {
    top: -10px;
  }

  &__wrapper {
    border-radius: $border-radius;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  &__thumbnail {
    position: relative;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    padding: 15px;

    img {
      position: relative;
      width: 100%;
      height: auto;
      z-index: 2;
    }
  }

  &__pokeball-float {
    position: absolute;
    top: 50px;
    left: 20px;
    opacity: .1;
    border-radius: 50%;
    margin: 0 auto;

    img {
      width: 350px;
      height: 350px;
    }
  }

  &__details {
    padding-top: 7px;
  }

  &__pokemon-props {
    color: #fff;
    text-align: center;

    ul {
      margin: 0;
      padding: 0;
    }

    ul, ul > li {
      list-style: none;
    }
  }

  &__id {
    font-size: 25px;
    font-weight: bold;
  }

  &__name {
    font-size: 20px;
  }

  &__types {
    padding-top: 15px;

    span {
      display: inline-block;
      vertical-align: middle;
      margin: 2px;
      padding: 5px 7px;
      background-color: #fff;
      border-radius: 20px;
      font-weight: bold;
      font-size: 12px;
      text-transform: uppercase;
    }
  }
}
</style>
