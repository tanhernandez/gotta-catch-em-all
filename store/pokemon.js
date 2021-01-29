import { POKEMON as URL_POKEMON } from 'assets/js/constants/url';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

/*
|--------------------------------------------------------------------------
| Store > state
|--------------------------------------------------------------------------
*/
export const state = () => ({
  fullList: [],
  listPerPage: 12,
  listCurrentPage: 1
});

/*
|--------------------------------------------------------------------------
| Store > getters
|--------------------------------------------------------------------------
*/
export const getters = {

  /**
   * @param {object} state
   * @return {boolean}
   */
  isValidList (state) {
    return !isNil(state.fullList) && !isEmpty(state.fullList);
  },

  /**
   * @param {object} state
   * @return {array}
   */
  fullList: (state) => state.fullList,

  /**
   * @param {object} state
   * @return {int}
   */
  listCurrentPage: (state) => state.listCurrentPage,

  /**
   * @param {object} state
   * @return {array}
   */
  paginatedList (state) {
    const to = state.listCurrentPage * state.listPerPage;

    return to < state.fullList.length
           ? state.fullList.slice(0, to)
           : state.fullList;
  }
};

/*
|--------------------------------------------------------------------------
| Store > mutations
|--------------------------------------------------------------------------
*/
export const mutations = {

  /**
   * @param {object} state
   * @param {array} pokemons
   */
  setFullList (state, pokemons) {
    state.fullList = pokemons;
  },

  /**
   * @param {object} state
   * @param {int} page
   */
  setListPage (state, page) {
    state.listCurrentPage = page;
  }
};

/*
|--------------------------------------------------------------------------
| Store > actions
|--------------------------------------------------------------------------
*/
export const actions = {

  /**
   * @param {object} context
   * @return {Promise|*}
   */
  listAll (context) {
    return this.$axios({
      url: '/json/pokemons.json',
      method: 'GET'
    }).then((r) => {
      context.commit('setFullList', r.data);

    }).catch((e) => console.error(e));
  },

  /**
   * @param {Object} context
   * @param {int} id
   * @return {Promise|*}
   */
  getItem (context, {id}) {
    return this.$axios({url: `${URL_POKEMON}/${id}`, method: 'GET'});
  }
};
