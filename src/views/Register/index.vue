<template>
  <v-app id="register">
    <v-container fluid class="d-flex align-center fill-height justify-center pa-0">
      <v-card
        elevation="12"
        width="400px"
        class="d-flex justify-center flex-column"
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
            :error-messages="emailErrors"
            clearable
            validate-on-blur
            v-model="registerForm.userEmail"
            ref="registerForm.userEmail"
            @blur="$v.registerForm.userEmail.$touch()"
          ></v-text-field>
          <v-text-field
            class="mx-4"
            prepend-icon="mdi-lock-outline"
            label="Password"
            outlined
            dense
            :error-messages="passwordErrors"
            clearable
            @click:append="showPwd1 = !showPwd1"
            :type="showPwd1 ? 'text' : 'password'"
            validate-on-blur
            :append-icon="showPwd1 ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="registerForm.password"
            @blur="$v.registerForm.password.$touch()"
          ></v-text-field>
          <v-text-field
            class="mx-4"
            prepend-icon="mdi-lock-check-outline"
            label="Repeat password"
            outlined
            dense
            :error-messages="repeatPasswordErrors"
            clearable
            @click:append="showPwd2 = !showPwd2"
            :type="showPwd2 ? 'text' : 'password'"
            validate-on-blur
            :append-icon="showPwd2 ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="registerForm.repeatPassword"
            @blur="$v.registerForm.repeatPassword.$touch()"
          ></v-text-field>
          <v-text-field
            class="mx-4"
            prepend-icon="mdi-account-check-outline"
            label="Verification Code"
            outlined
            dense
            :error-messages="authCodeErrors"
            validate-on-blur
            v-model="registerForm.authCode"
            @blur="$v.registerForm.authCode.$touch()"
          >
            <template v-slot:append-outer>
              <v-btn
                v-if="BtnShow"
                text
                plain
                :loading="sendCodeBar.loading"
                @click.stop="handleSendAuthCode"
                style="height: 24px; width: 120px"
                >Send Code</v-btn
              >
              <v-card
                v-else
                elevation="0"
                style="height: 24px; width: 120px; text-align: center"
              >
                <div class="pt-1" style="color: grey">
                  {{ count }}秒后重新获取
                </div>
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
      <v-snackbar
        elevation="4"
        light
        top
        v-model="sendCodeBar.show"
        timeout="5000"
      >
        {{ sendCodeBar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="sendCodeBar.show = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-app>
</template>
<script>
import { MessageBox } from 'element-ui'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    registerForm: {
      userEmail: { required, email },
      password: { required, minLength: minLength(6), maxLength: maxLength(15) },
      repeatPassword: { required },
      authCode: { required }
    }
  },
  data: () => ({
    showPwd1: false,
    showPwd2: false,
    sendCodeBar: {
      show: false,
      message: 'asdasd',
      loading: false
    },
    BtnShow: true,
    timer: null,
    count: '',
    registerForm: {
      userEmail: '',
      password: '',
      authCode: ''
    }
  }),
  computed: {
    emailErrors: {
      get: function () {
        const errors = []
        if (!this.$v.registerForm.userEmail.$dirty) return errors
        !this.$v.registerForm.userEmail.email &&
          errors.push('Must be valid e-mail')
        !this.$v.registerForm.userEmail.required &&
          errors.push('E-mail is required')
        return errors
      }
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.registerForm.password.$dirty) return errors
      !this.$v.registerForm.password.required &&
        errors.push('Password is required')
      if (
        !(
          this.$v.registerForm.password.minLength &&
          this.$v.registerForm.password.maxLength
        )
      ) {
        errors.push(
          'Password length must be between ' +
            this.$v.registerForm.password.$params.minLength.min +
            ' and ' +
            this.$v.registerForm.password.$params.maxLength.max
        )
      }
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.registerForm.repeatPassword.$dirty) return errors
      !this.$v.registerForm.repeatPassword.required && errors.push('Required.')
      if (
        this.$v.registerForm.repeatPassword.$model !==
        this.$v.registerForm.password.$model
      ) {
        errors.push('Please input same password.')
      }
      return errors
    },
    authCodeErrors () {
      const errors = []
      if (!this.$v.registerForm.authCode.$dirty) return errors
      !this.$v.registerForm.authCode.required && errors.push('Required.')
      return errors
    }
  },
  methods: {
    handleRegister () {
      this.$v.registerForm.$touch()
      if (!this.$v.registerForm.$invalid) {
        this.loading = true
        console.log(this.$v.registerForm.$invalid)
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
      if (!this.$v.registerForm.userEmail.$invalid) {
        this.sendCodeBar.loading = true
        const TIME_COUNT = 60
        this.$store
          .dispatch('user/getAuthCode', this.registerForm.userEmail)
          .then((response) => {
            this.sendCodeBar.loading = false
            this.sendCodeBar.show = true
            this.sendCodeBar.message = response + ', 请登录邮箱查收。'
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
          })
          .catch(() => {
            this.sendCodeBar.loading = false
          })
      } else {
        this.$v.registerForm.userEmail.$touch()
      }
    }
  }
}
</script>
<style scoped></style>
