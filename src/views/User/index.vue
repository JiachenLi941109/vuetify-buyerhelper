<template>
  <v-container fluid>
    <v-form class="pt-4">
      <v-row>
        <v-col cols="2">
          <div class="text-h6 text-right pt-2 px-2 text-no-wrap">邮箱</div>
        </v-col>
        <v-col cols="10">
          <v-text-field
            readonly
            solo
            flat
            hide-details="auto"
            v-model="email"
          ></v-text-field>
          <v-btn color="primary" small outlined class="ma-2">修改密码</v-btn>
          <v-btn color="primary" small outlined class="ma-2" to="/resetPw">重置密码</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="text-h6 text-right pt-2 px-2 text-no-wrap">我的订阅</div>
        </v-col>
        <v-col cols="10">
          <v-text-field
            readonly
            solo
            flat
            hide-details="auto"
            v-model="subscribe"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data: () => ({}),
  created () {
    this.$store.dispatch('user/getInfo')
  },
  computed: {
    email () {
      return this.$store.state.user.name
    },
    subscribe () {
      return '剩余1天'
    }
  }
}
</script>
