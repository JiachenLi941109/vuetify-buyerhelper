<template>
  <v-container fluid>
    <v-card class="mb-4">
      <v-card-title>我的订阅</v-card-title>
    </v-card>
    <v-card>
      <v-card-title>订阅</v-card-title>
      <v-form>
        <v-card rounded="0" class="px-1" flat>
          <v-card-title>选择订阅时长</v-card-title>
          <v-btn-toggle class="pa-4 mb-1" color="primary" mandatory>
            <v-btn width="80px" @click="subscribeFrom.duration = 1">包月</v-btn>
            <v-btn width="80px" @click="subscribeFrom.duration = 3"
              >包季度</v-btn
            >
            <v-btn width="80px" @click="subscribeFrom.duration = 12"
              >包年</v-btn
            >
          </v-btn-toggle>
          <v-spacer></v-spacer>
        </v-card>
        <v-card rounded="0" class="px-1" flat>
          <v-card-title>选择同时关注上限</v-card-title>
          <v-text-field
            v-model="subscribeFrom.itemLimit"
            type="number"
            outlined
            dense
            hide-details
            class="pa-4"
            style="width: 100px; text-align: center"
          />
          <v-spacer></v-spacer>
        </v-card>
        <v-card rounded="0" class="px-1" flat>
          <v-card-title>价格</v-card-title>
          <v-row class="d-flex align-center px-4">
            <span class="pl-4">共支付</span>
            <div class="pa-4 text-h4">{{ price }}</div>
            <span>元</span>
            <div class="pa-4 text-h6 ml-4">{{ pricePerMonth }}</div>
            <span>元/月</span>
          </v-row>
          <!-- <v-row class="d-flex align-center px-4">
            <v-text-field readonly :value="price" solo flat style="font-size:30px"></v-text-field>
          </v-row> -->
        </v-card>
      </v-form>
      <v-card-actions class="px-4 mt-4">
        <v-btn
          outlined
          color="primary"
          large
          width="100"
          @click="handleSubscribe"
          >订阅</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-snackbar elevation="4" light top v-model="subBar.show" timeout="5000">
      {{ subBar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="subBar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      subscribeFrom: {
        itemLimit: 1,
        duration: 1
      },
      subBar: {
        show: false,
        message: '',
        loading: false
      }
    }
  },
  computed: {
    unitPrice () {
      let unitPrice
      switch (this.subscribeFrom.duration) {
        case 1:
          unitPrice = 10
          break
        case 3:
          unitPrice = 9
          break
        case 12:
          unitPrice = 8
          break
        default:
          break
      }
      return unitPrice
    },
    price () {
      let discount = 1
      if (this.subscribeFrom.itemLimit > 5) {
        discount = 0.9
      }
      return Math.round(
        this.unitPrice *
          this.subscribeFrom.duration *
          this.subscribeFrom.itemLimit *
          discount
      )
    },
    pricePerMonth () {
      return Math.round(this.price / this.subscribeFrom.duration)
    }
  },
  methods: {
    handleSubscribe () {
      this.$store
        .dispatch('user/subscribe', this.subscribeFrom)
        .then(() => {
          this.subBar.loading = false
          this.subBar.show = true
          this.subBar.message = '订阅成功'
        })
        .catch(() => {
          this.subBar.loading = false
          this.subBar.show = true
          this.subBar.message = '订阅失败'
        })
    }
  }
}
</script>
