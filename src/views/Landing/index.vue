<template>
  <v-app id="landing">
    <v-app-bar
      app
      color="#FFFFFF"
      flat
      class="mx-auto"
      style="border-bottom: 1px solid #e0e0e0 !important"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <h1>BuyerHelper</h1>
      <v-spacer></v-spacer>

      <v-container
        v-if="!$vuetify.breakpoint.mobile"
        fluid
        class="d-flex justify-end pa-0"
      >
        <v-btn text>
          <span>FAQ</span>
        </v-btn>
        <v-btn text to="/login">
          <span>登录</span>
        </v-btn>
        <v-btn text to="/register">
          <span>注册</span>
        </v-btn>
      </v-container>

      <v-menu v-else offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" icon>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn text>
              <span>FAQ</span>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text to="/login">
              <span>登录</span>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text to="/register">
              <span>注册</span>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid style="max-width: 1200px; margin: auto; height: 100%">
        <div class="d-flex flex-column justify-center align-center fill-height">
          <h1>上新提醒</h1>
          <v-btn
            href="https://www.bilibili.com/video/BV1GJ411x7h7?from=search&seid=6574130229131061351&spm_id_from=333.337.0.0"
            target="_blank"
            elevation="6"
            large
            width="40px"
            color="success"
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
.v-app-bar >>> .v-toolbar__content {
  max-width: 1200px;
  margin: auto;
}
</style>
