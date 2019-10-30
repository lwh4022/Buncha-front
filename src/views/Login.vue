<template>
  <v-container fluid class="pa-0" @keyup.enter="submit">
    <v-img src="@/assets/login.jpg" style="width:100%;height:100vh;position:absolute;"></v-img>
    <v-row justify="center" align-content="center" style="height:100vh;">
      <v-col cols="11" sm="6" md="4" lg="3">
        <v-card ref="form" style="opacity:0.9;">
          <v-row>
            <div style="height:50px"></div>
          </v-row>
          <v-row justify="center">
            <v-card-title class="font-weight-bold display-1">Buncha</v-card-title>
          </v-row>
          <v-row>
            <div class="hidden-sm-and-down" style="height:20px"></div>
          </v-row>
          <v-alert v-if="!auth" color="error" :class="alertText" class="white--text">아이디와 비밀번호를 확인해주세요</v-alert>
          <v-card-text>
            <v-text-field  ref="memberId" v-model="memberId" label="아이디" :rules="[rules.id]" required>
              <template v-slot:prepend>
                <v-icon style="font-size:1.5em">fas fa-user</v-icon>
              </template>
            </v-text-field>
            <v-text-field ref="password" v-model="password" :type="'password'" label="비밀번호" :rules="[rules.password]" required>
              <template v-slot:prepend>
                <v-icon style="font-size:1.5em">fas fa-lock</v-icon>
              </template>
            </v-text-field>
          </v-card-text>
          <v-row>
            <div style="height:10px"></div>
          </v-row>
          <v-row justify="center" class="mt-3">
            <router-link :to="{name: 'signup'}" class="noLink black--text">회원가입 하러 가기</router-link>
          </v-row>
          <v-row>
            <div style="height:50px"></div>
          </v-row>
          <v-divider class="mt-2"></v-divider>
          <v-card-actions>
            <v-btn text><router-link :to="{name:'home'}" class="noLink black--text">홈으로</router-link></v-btn>
            <div class="flex-grow-1"></div>
            <v-btn class="text--black font-weight-bold" style="letter-spacing:0" text @click="submit">로그인</v-btn>
          </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    memberId: '',
    password: null,
    formHasErrors: false,
    auth: true,
    rules: {
      id: value => !!value || '아이디를 입력해주세요',
      password: value => !!value || '비밀번호를 입력해주세요'
    }
  }),
  computed: {
    form () {
      return {
        memberId: this.memberId,
        password: this.password
      }
    },
    alertText () {
      if (this.windowXSize < 600) {
        return 'body-2'
      } else {
        return 'body-1'
      }
    }
  },
  watch: {
    memberId: function (newVal) {
      this.auth = true
    },
    password: function (newVal) {
      this.auth = true
    }
  },
  methods: {
    submit () {
      this.formHasErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      axios({
        method: 'post',
        url: '/signin',
        data: this.form
      })
        .then(response => {
          let loginInfo = {
            memberId: response.data.data.memberId,
            role: response.data.data.role,
            token: response.data.data.token
          }
          this.$store.dispatch('signin', loginInfo)
          this.$router.push({ name: 'home' })
        }).catch(error => {
          this.auth = false
        })
    }
  }
}
</script>

<style>
  .kakaoBtn{
    background-color:#FAE100;
    line-height:40px;
    width:200px;
    height:40px;
    text-align:center;
    color:#381E26;
    cursor:pointer;
    font-size:1.1em;

  }
  .naverBtn{
    background-color:#1EC800;
    line-height:40px;
    width:200px;
    height:40px;
    text-align:center;
    cursor:pointer;
    font-size:1.1em;

  }
  .noLink{
    text-decoration:none;
    letter-spacing:0;
  }
</style>
