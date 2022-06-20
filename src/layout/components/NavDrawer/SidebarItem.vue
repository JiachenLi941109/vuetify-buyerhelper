<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <router-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>{{ onlyOneChild.meta.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ onlyOneChild.meta.title }}</v-list-item-title>
        </v-list-item>
      </router-link>
    </template>

    <v-list-group v-else :prepend-icon="item.meta.icon">
      <template v-slot:activator>
        <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </v-list-group>
  </div>
</template>
<script>
import path from 'path'
export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang="sass">
</style>
