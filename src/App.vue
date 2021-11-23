<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/* html {
  overflow: hidden !important;
  scrollbar-width: none;
} */

/* html::-webkit-scrollbar {
  width: 0;
  height: 0;
} */
</style>
