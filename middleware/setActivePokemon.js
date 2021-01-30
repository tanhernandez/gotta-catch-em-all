export default function ({route, store}) {
  if (route.name === 'pokemon-id') {
    store.commit('pokemon/setActivePokemon', parseInt(route.params.id));
  }
}
