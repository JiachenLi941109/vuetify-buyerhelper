<template>
  <v-container fluid>
    <v-card class="mb-10">
      <div class="d-flex align-center" @click.stop="show = !show">
        <v-card-title class="primary--text">添加物品</v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="show = !show" class="mx-2">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </div>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text class="text-body-1">
            请在LV官网选择好您想要的颜色和大小后复制物品的网址
          </v-card-text>
          <v-card-text class="text-body-1">
            例如：https://www.louisvuitton.cn/zhs-cn/products/nano-speedy-monogram-010575
          </v-card-text>
          <v-text-field
            ref="itemWebpage"
            class="mx-4 mt-4"
            v-model="itemWebpage"
            label="Item's Address"
            solo
            clearable
            required
          ></v-text-field>
          <v-card-actions>
            <v-btn
              @click.native.prevent="handleSubmit"
              class="mx-2 mb-4"
              color="primary"
              dark
              :loading="loading"
              >Add Item</v-btn
            >
          </v-card-actions>
        </div>
      </v-expand-transition>
    </v-card>
    <v-sheet elevation="2" rounded>
      <v-card-title class="primary--text">已关注的物品</v-card-title>
      <v-divider></v-divider>
      <v-container fluid>
        <v-lazy>
          <v-row dense justify="start" align-content="start">
            <v-col
              v-for="item in itemList"
              :key="item.url"
              :item="item"
              cols="auto"
            >
              <v-card width="360px" class="ma-4" elevation="6">
                <a :href="item.url" target="_blank">
                  <v-img
                    width="360px"
                    height="360px"
                    :src="item.imgUrl"
                    style="color: grey"
                  />
                </a>
                <v-divider></v-divider>
                <div class="d-flex">
                  <div>
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-subtitle> {{ item.id }}</v-card-subtitle>
                    <v-card-text>{{ item.price }}</v-card-text>
                  </div>
                  <v-spacer></v-spacer>
                  <div class="d-flex flex-column align-end">
                    <v-card-actions>
                      <v-btn
                        icon
                        large
                        class="delete-button"
                        @click="handleDeleteItem"
                      >
                        <v-icon>mdi-trash-can-outline</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-card-text>{{ item.status }}</v-card-text>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-lazy>
      </v-container>
    </v-sheet>
  </v-container>
</template>
<script>
import { MessageBox } from 'element-ui'
export default {
  data: () => ({
    show: false,
    itemWebpage: '',
    loading: false,
    list: [1, 2, 3, 4],
    itemList: ''
  }),
  // computed: {
  //   itemList () {
  //     return this.$store.state.followedItem.followedItemList
  //   }
  // },
  created () {
    this.$store.dispatch('followedItem/getFollowedItemList')
    this.itemList = this.$store.state.followedItem.followedItemList
  },
  methods: {
    getItemList () {
      return this.$store.state.followedItem.followedItemList
    },
    handleDeleteItem () {
      MessageBox.confirm('确认删除')
    },
    handleSubmit () {
      console.log(this.$store.state.followedItem.followedItemList)
    }
  }
}
</script>
<style scoped>
.delete-button:hover {
  color: red;
}
</style>
