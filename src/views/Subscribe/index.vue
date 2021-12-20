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
            <v-btn width="80px" @click="duration = 1">包月</v-btn>
            <v-btn width="80px" @click="duration = 3">包季度</v-btn>
            <v-btn width="80px" @click="duration = 12">包年</v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
        </v-card>
        <v-card rounded="0" class="px-1" flat>
          <v-card-title>选择同时关注上限</v-card-title>
          <v-text-field
            v-model="numberValue"
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
            <div class="pa-4 text-h4">{{ price }}</div>
            <span>元</span>
          </v-row>
          <v-row class="d-flex align-center px-4">
            <div class="pa-4 text-h4">{{ pricePerMonth }}</div>
            <span> 元/月</span>
          </v-row>
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
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      numberValue: 1,
      duration: 1
    }
  },
  computed: {
    unitPrice () {
      let unitPrice
      switch (this.duration) {
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
      if (this.numberValue > 5) {
        discount = 0.9
      }
      return Math.round(
        this.unitPrice * this.duration * this.numberValue * discount
      )
    },
    pricePerMonth () {
      return Math.round(this.price / this.duration)
    }
  },
  methods: {
    handleSubscribe () {
      console.log('Submit')
    }
  }
}
</script>
