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
          <li :class="{'is-active' : isTabNavActive(TABS.ABILITIES)}">
            <a href="#" @click.stop.prevent="handleClickTabNav(TABS.ABILITIES)">
              Abilities
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

          </div>

          <!-- Stats -->
          <div v-if="isTabNavActive(TABS.STATS)">

          </div>

          <!-- Abilities -->
          <div v-if="isTabNavActive(TABS.ABILITIES)">

          </div>

          <!-- Evolution -->
          <div v-if="isTabNavActive(TABS.EVOLUTION)">

          </div>

          <!-- Moves -->
          <div v-if="isTabNavActive(TABS.MOVES)">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const TABS = {
  ABOUT: 1,
  STATS: 2,
  ABILITIES: 3,
  EVOLUTION: 4,
  MOVES: 5
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
      TABS
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Component > methods
  |--------------------------------------------------------------------------
  */
  methods: {

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
    }
  }
}
</script>

<style lang="scss">
.pokemon-details {
  &__wrapper {
    border-radius: $border-radius;
    background-color: #fff;
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

        a {
          display: inline-block;
          font-size: 12px;
          font-weight: bold;
          padding: 20px;
          width: 100%;
          height: 100%;
          color: $gray3;
        }

        &.is-active {
          a {
            color: $text-color;
          }
        }
      }
    }
  }

}
</style>
