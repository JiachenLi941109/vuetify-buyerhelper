<template>
  <v-container fluid>
    <v-card class="mb-10">
      <div class="d-flex align-center">
        <v-card-title class="primary--text">添加物品</v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="show = !show" class="mx-2">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
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
            <v-col v-for="i in 6" :key="i" cols="auto">
              <v-card width="360px" class="ma-4" v-model="item" elevation="6">
                <a :href="item.url" target="_blank">
                  <v-img
                    width="360px"
                    height="360px"
                    :src="item.imgSrc"
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
                    <v-card-text>Not Available</v-card-text>
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
    show: true,
    item: {
      id: 'M45847',
      name: 'Sac Plat BB Bag',
      price: '£1,530.00',
      state: 'Not Available',
      url: 'https://uk.louisvuitton.com/eng-gb/products/sac-plat-bb-bag-monogram-nvprod3100071v',
      imgSrc:
        'https://uk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-sac-plat-bb-bag-monogram-canvas-handbags--M45847_PM2_Front%20view.png?wid=656&hei=656'
    },
    itemWebpage: '',
    loading: false
  }),
  methods: {
    handleDeleteItem () {
      MessageBox.confirm('确认删除')
    },
    handleSubmit () {
      console.log(this.itemWebpage)
    }
  }
}
</script>
<style scoped>
.delete-button:hover {
  color: red;
}
</style>
