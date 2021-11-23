<template>
  <v-navigation-drawer v-model="sidebar.opened" app clipped width="200px">
    <v-list nav dense>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes () {
      return this.$router.options.routes
    }
  }
}
</script>
