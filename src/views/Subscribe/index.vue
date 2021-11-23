<template>
  <v-container fluid>
    <v-card class="mb-4">
      <v-card-title>我的订阅</v-card-title>
    </v-card>
    <v-card>
      <v-card-title>订阅</v-card-title>
      <v-tabs v-model="tab" fixed-tabs>
        <v-tab key="1">Louis Vuitton</v-tab>
        <v-tab>GUCCI</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-tabs-items v-model="tab">
        <v-tab-item key="1">
          <v-subheader>欧洲</v-subheader>
        </v-tab-item>
        <v-tab-item key="2">
          <v-subheader>欧洲</v-subheader>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      items: ['Appetizers', 'Entrees', 'Deserts', 'Cocktails'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>
