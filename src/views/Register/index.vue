<template>
  <v-app id="login">
    <v-container class="d-flex align-center fill-height justify-center">
      <v-card
        elevation="12"
        width="400px"
        class="d-flex justify-start flex-column"
        style="display: flex; justify-start;"
      >
        <v-img
          max-height="150px"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>
        <router-link to="/" class="text-center mx-auto" tag="button">
          <v-card-title class="text-center mx-auto">BuyerHelper</v-card-title>
        </router-link>
        <v-form class="d-flex justify-start flex-column">
          <v-text-field
            class="mx-4"
            prepend-icon="mdi-email-outline"
            label="Email"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            class="mx-4"
            prepend-icon="mdi-lock-outline"
            label="Password"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            class="mx-4"
            prepend-icon="mdi-lock-check-outline"
            label="Repeat password"
            outlined
            dense
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-btn block color="green" dark class="mb-0">Sign up</v-btn>
        </v-card-actions>
        <v-btn text plain small width="100px" class="pt-0  my-2 mx-auto" to="/login"
          >Sign in</v-btn
        >
      </v-card>
    </v-container>
  </v-app>
</template>
