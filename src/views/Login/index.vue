<template>
  <v-app id="login">
    <v-container class="d-flex align-center fill-height justify-center">
      <v-card
        elevation="12"
        width="400px"
        class="d-flex justify-end flex-column"
      >
        <v-img
          height="150"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>

        <router-link to="/" class="text-center mx-auto" tag="button">
          <v-card-title>BuyerHelper</v-card-title>
        </router-link>
        <v-form ref="loginForm" :model="loginForm">
          <v-text-field
            ref="userEmail"
            class="mx-4"
            v-model="loginForm.userEmail"
            :rules="[loginRules.required]"
            prepend-icon="mdi-email-outline"
            label="Email"
            outlined
            dense
            clearable
            required
          ></v-text-field>
          <v-text-field
            class="mx-4"
            v-model="loginForm.password"
            :rules="[loginRules.required]"
            prepend-icon="mdi-lock-outline"
            :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPwd ? 'text' : 'password'"
            label="Password"
            outlined
            dense
            clearable
            :error-messages="errorMessages"
            @click:append="showPwd = !showPwd"
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-btn
            @click.native.prevent="handleLogin"
            block
            color="green"
            dark
            :loading="loading"
            >Sign in</v-btn
          >
        </v-card-actions>
        <v-container class="d-flex justify-space-between mt-8">
          <v-btn text plain small class="pa-0">Forgot password?</v-btn>
          <v-btn text plain small class="pa-0" to="/register"
            >Create new account</v-btn
          >
        </v-container>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    loginForm: {
      userEmail: '',
      password: ''
    },
    loginRules: {
      min3: (value) => (value && value.length >= 3) || 'Min 3 characters',
      required: (value) => !!value || 'Required.'
    },
    showPwd: false,
    loading: false,
    errorMessages: []
  }),

  methods: {
    handleLogin () {
      if (this.$refs.loginForm.validate()) {
        this.loading = true
        this.$store
          .dispatch('user/login', this.loginForm)
          .then(() => {
            this.$router.push({ path: this.redirect || '/dashboard' })
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        console.log('error submit!!')
        return false
      }
    }
  }
}
</script>
