<template>
  <main>
    <Nuxt/>
  </main>
</template>

<script>
import eventBus from 'assets/js/helpers/eventBus';

export default {

  /*
  |--------------------------------------------------------------------------
  | Component > mounted
  |--------------------------------------------------------------------------
  */
  mounted () {
    this.$store.dispatch('pokemon/listAll').then(() => {
      eventBus.$emit('FULL_LIST_LOADED'); // Shows the possibility of emitting event globally.
    });
  }
}
</script>
