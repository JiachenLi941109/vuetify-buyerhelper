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
        <v-form
          class="d-flex justify-start flex-column"
          ref="registerForm"
          :model="registerForm"
        >
          <v-text-field
            class="mx-4"
            prepend-icon="mdi-email-outline"
            label="Email"
            outlined
            dense
            clearable
            validate-on-blur
            v-model="registerForm.userEmail"
            :rules="[registerRules.required]"
          ></v-text-field>
          <v-text-field
            class="mx-4"
            prepend-icon="mdi-lock-outline"
            label="Password"
            outlined
            dense
            clearable
            @click:append="showPwd1 = !showPwd1"
            :type="showPwd1 ? 'text' : 'password'"
            validate-on-blur
            :append-icon="showPwd1 ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="registerForm.password"
            :rules="[registerRules.required]"
          ></v-text-field>
          <v-text-field
            class="mx-4"
            prepend-icon="mdi-lock-check-outline"
            label="Repeat password"
            outlined
            dense
            clearable
            @click:append="showPwd2 = !showPwd2"
            :type="showPwd2 ? 'text' : 'password'"
            validate-on-blur
            :append-icon="showPwd2 ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="repeatPassword"
            :rules="[registerRules.required, registerRules.passwordDoubleCheck]"
          ></v-text-field>
          <v-text-field
            class="mx-4"
            prepend-icon="mdi-account-check-outline"
            label="Verification Code"
            outlined
            dense
            validate-on-blur
            v-model="authcode"
          >
            <template v-slot:append-outer>
              <v-btn
                v-show="BtnShow"
                text
                plain
                @click.stop="handleSendAuthCode"
                style="height: 24px; width: 120px"
                >Send Code</v-btn
              >
              <v-card
                v-show="!BtnShow"
                elevation="0"
                style="height: 24px; width: 120px; text-align: center"
              >
                <div class="pt-1">{{ count }}秒后重新获取</div>
              </v-card>
            </template>
          </v-text-field>
        </v-form>
        <v-card-actions>
          <v-btn block color="green" dark class="mb-0" @click="handleRegister"
            >Sign up</v-btn
          >
        </v-card-actions>
        <v-btn
          text
          plain
          small
          width="100px"
          class="pt-0 my-2 mx-auto"
          to="/login"
          >Sign in</v-btn
        >
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
import { MessageBox } from 'element-ui'
export default {
  data: () => ({
    repeatPassword: '',
    showPwd1: false,
    showPwd2: false,
    authcode: '',
    BtnShow: true,
    timer: null,
    count: '',
    registerForm: {
      userEmail: '',
      password: ''
    }
  }),
  computed: {
    registerRules () {
      return {
        min3: (value) => (value && value.length >= 3) || 'Min 3 characters',
        required: (value) => !!value || 'Required.',
        passwordDoubleCheck: (value) =>
          value === this.registerForm.password || 'Please input same password.'
      }
    }
  },
  methods: {
    handleRegister () {
      if (this.$refs.registerForm.validate()) {
        this.loading = true
        this.$store
          .dispatch('user/register', this.registerForm)
          .then(() => {
            MessageBox.confirm('Register Success.', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'success'
            }).then(() => {
              this.$router.push({ path: this.redirect || '/login' })
              this.loading = false
            })
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        console.log('error submit!!')
        return false
      }
    },
    handleSendAuthCode () {
      console.log('send code')
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.BtnShow = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.BtnShow = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>
<style scoped>
.v-input__append-outer {
  margin-top: 0px !important;
}
</style>
