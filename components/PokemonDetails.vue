<template>
  <div :class="getBem(blockClass)">
    <div :class="getBem(blockClass, 'wrapper')">
      <div :class="getBem(blockClass, 'tab-navs')">
        <ul>
          <li :class="{'is-active' : isTabNavActive(TABS.ABOUT)}">
            <a href="#" @click.stop.prevent="handleClickTabNav(TABS.ABOUT)">
              About
            </a>
          </li>
          <li :class="{'is-active' : isTabNavActive(TABS.STATS)}">
            <a href="#" @click.stop.prevent="handleClickTabNav(TABS.STATS)">
              Stats
            </a>
          </li>
          <li :class="{'is-active' : isTabNavActive(TABS.EVOLUTION)}">
            <a href="#" @click.stop.prevent="handleClickTabNav(TABS.EVOLUTION)">
              Evolution
            </a>
          </li>
          <li :class="{'is-active' : isTabNavActive(TABS.MOVES)}">
            <a href="#" @click.stop.prevent="handleClickTabNav(TABS.MOVES)">
              Moves
            </a>
          </li>
        </ul>
      </div>
      <div :class="getBem(blockClass, 'tab-content')">
        <div :class="getBem(blockClass, 'tab-content-wrapper')">

          <!-- About -->
          <div v-if="isTabNavActive(TABS.ABOUT)">
            <p :class="getBem(blockClass, 'description')">
              <strong>Description</strong><br>
              <span>{{ description }}</span>
            </p>
            <p :class="getBem(blockClass, 'strength')">
              <strong>Strength:</strong><br>
              <span>{{ strength }}</span>
            </p>
            <p :class="getBem(blockClass, 'weakness')">
              <strong>Weakness:</strong><br>
              <span>{{ weakness }}</span>
            </p>
            <p :class="getBem(blockClass, 'strength')">
              <strong>Abilities:</strong><br>
              <span>{{ abilities }}</span>
            </p>
          </div>

          <!-- Stats -->
          <div v-if="isTabNavActive(TABS.STATS)">
            <ul :class="getBem(blockClass, 'stats')">
              <li
                v-for="stat in stats"
                :class="getBem(blockClass, `stats-${stat.name}`)"
              >
                <div :class="getBem(blockClass, 'stats-score')">
                  {{ stat.score }}
                </div>
                <div :class="getBem(blockClass, 'stats-icon')">
                  <img
                    :src="`/images/${stat.name}-icon.svg`"
                    :alt="`${stat.name}-icon.svg`"
                  >
                </div>
              </li>
            </ul>
          </div>

          <!-- Evolution -->
          <div v-if="isTabNavActive(TABS.EVOLUTION)">
            <div :class="getBem(blockClass, 'evolutions')">
              <template v-for="(evo, i) in pokemon.evolutions">
                <div :class="getBem(blockClass, 'evolutions-item')" @click="handleClickEvo(evo.id)">
                  <img :src="`${POKEMON_ART}/${evo.id}.png`" :alt="evo.name">
                  <span>{{ startCase(evo.name) }}</span>
                </div>
                <div
                  v-if="i + 1 < pokemon.evolutions.length"
                  :class="getBem(blockClass, 'evolutions-arrow')"
                >
                  <img
                    src="/images/evo-arrow.svg"
                    alt="evo-arrow.svg"
                  >
                </div>
              </template>
            </div>
          </div>

          <!-- Moves -->
          <div v-if="isTabNavActive(TABS.MOVES)">
            <div :class="getBem(blockClass, 'moves')">
              {{ moves.join(', ') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import startCase from 'lodash/startCase';
import forEach from 'lodash/forEach';
import { POKEMON_ART } from 'assets/js/constants/url';

const TABS = {
  ABOUT: 1,
  STATS: 2,
  EVOLUTION: 3,
  MOVES: 4
}

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
      blockClass: 'pokemon-details',
      activeTab: TABS.ABOUT,
      TABS,
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
    description () {
      const verbiages = this.pokemon.flavor_text_entries;
      if (!isEmpty(verbiages)) {
        let text = '';

        forEach(verbiages, (v) => {
          if (v.language.name === 'en') {
            text = v.flavor_text;
            text = text.split('\n').join(' ');
            text = text.split('\f').join(' ');

            return false; // Break the forEach loop
          }
        });

        return text;
      } else {
        return '';
      }
    },

    /**
     * @return {string}
     */
    strength () {
      return this.pokemon.strength.length > 0
             ? this.pokemon.strength.join(', ')
             : ''
    },

    /**
     * @return {string}
     */
    weakness () {
      return this.pokemon.weakness.length > 0
             ? this.pokemon.weakness.join(', ')
             : ''
    },

    /**
     * @return {string}
     */
    abilities () {
      const abilities = this.pokemon.abilities;

      if (!isNil(abilities) && !isEmpty(abilities)) {
        return map(this.pokemon.abilities, (x) => x.ability.name).join(', ');
      } else {
        return '';
      }
    },

    /**
     * @return {array}
     */
    stats () {
      return map(this.pokemon.stats, (x) => {
        return {
          name: x.stat.name,
          score: x.base_stat
        }
      });
    },

    /**
     * @return {array}
     */
    moves () {
      return map(this.pokemon.moves, (x) => startCase(x.move.name));
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
     * @param {string} key
     * @return {void}
     */
    handleClickTabNav (key) {
      this.activeTab = key;
    },

    /**
     * @param {string} key
     * @return {boolean}
     */
    isTabNavActive (key) {
      return this.activeTab === key;
    },

    /**
     * @param {int} id
     * @return {void}
     */
    handleClickEvo (id) {
      this.$router.push({name: 'pokemon-id', params: {id}});
    }
  }
}
</script>

<style lang="scss">
.pokemon-details {
  &__wrapper {
    position: relative;
    border-radius: $border-radius;
    background-color: #fff;
    min-height: 400px;
  }

  &__tab-navs {
    ul, ul > li {
      list-style: none;
    }

    ul {
      margin: 0;
      padding: 0;
      @extend .flex;
      justify-content: space-between;
      align-items: center;

      & > li {
        width: calc(100% / 4);

        a {
          display: inline-block;
          box-sizing: border-box;
          font-size: 16px;
          font-weight: bold;
          padding: 20px;
          width: 100%;
          height: 100%;
          color: $gray3;
          text-align: center;
        }

        &.is-active {
          a {
            transition-duration: .5s;
            color: $text-color;
          }
        }

        border-bottom: 1px solid $gray2;
      }
    }
  }

  &__tab-content {
    width: 100%;
    height: 100%;

    &-wrapper {
      padding: 20px;
      font-size: 14px;
      line-height: 1.5em;
      width: inherit;
      height: inherit;
    }
  }

  &__strength, &__weakness, &__abilities {
    span {
      text-transform: capitalize;
    }
  }

  &__stats {
    padding: 30px 0 0 0;
    margin: 0;
    list-style: none;
    @extend .flex, .flex-center;

    & > li {
      list-style: none;
      width: 30%;
      text-align: center;
    }

    &-score {
      color: $gray3;
      font-weight: bold;
      font-size: 40px;
    }

    &-icon img {
      width: 48px;
      height: 48px;
      padding-top: 10px;
      padding-bottom: 40px;
    }
  }

  &__evolutions {
    @extend .flex, .flex-center;

    &-item {
      text-align: center;
      padding: 20px;
      cursor: pointer;

      img {
        width: 100px;
        height: auto;
      }

      span {
        display: block;
      }
    }

    &-arrow {
      img {
        width: 24px;
        height: auto;
      }
    }
  }

}
</style>
