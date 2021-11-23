<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="white"
      flat
      style="border-bottom: 1px solid #e0e0e0 !important"
    >
      <v-app-bar-nav-icon @click="toggleSideBar"></v-app-bar-nav-icon>
      <h1 class="black--text">BuyerHelper</h1>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
        </template>
        <v-list dense flat outlined>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>FAQ</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.native.prevent="logout">
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <nav-drawer />
    <v-main>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { NavDrawer } from './components'
export default {
  components: {
    NavDrawer
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    routes () {
      return this.$router.options.routes
    },
    key () {
      return this.$route.path
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/?redirect=${this.$route.fullPath}`)
    },
    handleMenu () {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = false
      }
    },
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    }
  },
  created () {
    if (this.$vuetify.breakpoint.mobile) {
      this.$store.dispatch('app/closeSideBar')
    }
  }
}
</script>
<style scoped></style>
