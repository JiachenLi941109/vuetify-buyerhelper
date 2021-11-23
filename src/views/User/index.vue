<template>
  <v-container fluid>
    <v-form :model="userInfo" class="pt-4">
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
            v-model="userInfo.email"
          ></v-text-field>
          <v-btn color="primary" small outlined class="ma-2">修改密码</v-btn>
          <v-btn color="primary" small outlined class="ma-2">重置密码</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    userInfo: {
      email: 'wersd_qazse@163.com',
      invitationCode: '7245245'
    }
  })
}
</script>
