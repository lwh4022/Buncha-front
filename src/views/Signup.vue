<template>
  <v-container fluid class="pa-0">
    <img src="@/assets/vietnam.jpg" style="width:100%;height:100vh;position:absolute;">
    <v-row justify="center" align-content="center" style="height:100vh;">
      <v-col cols="11" sm="6" lg="5">
        <v-card style="opacity:0.8">
          <v-card-title class="justify-center">회원가입</v-card-title>
          <v-card-text>
            <v-alert v-if="idCheck" color="error" :class="alertText">"{{id}}"는 존재하는 아이디 입니다.</v-alert>
            <v-text-field
              ref= "id"
              v-model= "id"
              label= "아이디(20자 이내)"
              maxlength="20"
              :rules= "[rules.id]"
              :error= "idCheck"
              @change="idCheckMethod"
              @focus="idCheck = false"
              required
            ></v-text-field>
            <v-text-field
              ref= "password"
              v-model= "password"
              :rules= "[rules.password]"
              :type= "'password'"
              label= "비밀번호"
              required
            ></v-text-field>
            <v-text-field
              ref="checkPassword"
              v-model= "checkPassword"
              :type="'password'"
              :rules="[
                rules.checkPassword,
                () => password === checkPassword || '비밀번호가 맞지 않습니다',
                ]"
              label="비밀번호 확인"
              required
            ></v-text-field>
            <v-text-field
              ref="name"
              v-model="name"
              :rules="[rules.name]"
              label="이름(20자 이내)"
              maxlength="20"
              required
            ></v-text-field>
            <v-text-field
              ref="email"
              v-model="email"
              :rules="[rules.email, rules.emailCheck]"
              label="이메일"
              required
            ></v-text-field>
          </v-card-text>
          <v-divider class="mt-2"></v-divider>
          <v-card-actions>
            <v-btn text><router-link :to="{name:'home'}" style="color:black;text-decoration:none;">홈으로</router-link></v-btn>
            <div class="flex-grow-1"></div>
            <v-btn class="text--black font-weight-bold" text @click="submit">제출</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  props: ['windowXSize'],
  data: () => ({
    name: '',
    id: '',
    password: '',
    email: '',
    checkPassword: '',
    formHasErrors: false,
    idCheck: false,
    checkedId: '',
    rules: {
      id: value => !!value || '아이디는 반드시 입력해야 합니다',
      emailCheck: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || '이메일 형식이 아닙니다'
      },
      email: value => !!value || '이메일은 반드시 입력해야 합니다',
      password: value => !!value || '비밀번호는 반드시 입력해야 합니다',
      checkPassword: value => !!value || '비밀번호 확인은 반드시 입력해야 합니다',
      name: value => !!value || '이름은 반드시 입력해야 합니다'
    }
  }),

  computed: {
    form () {
      return {
        name: this.name,
        id: this.id,
        password: this.password,
        email: this.email,
        checkPassword: this.checkPassword
      }
    },
    submitForm () {
      return {
        name: this.name,
        memberId: this.id,
        password: this.password,
        email: this.email
      }
    },
    btnSize () {
      if (this.windowXSize < 600) {
        return '30px'
      } else {
        return '40px'
      }
    },
    btnMarginTop () {
      if (this.windowXSize < 600) {
        return '30px'
      } else {
        return '40px'
      }
    },
    btnText () {
      if (this.windowXSize < 600) {
        return 'body-2 ml-0'
      } else {
        return 'body-1 ml-2'
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
  methods: {
    idCheckMethod () {
      let sendData = { memberId: this.id }
      if (this.id == '') {
        this.isIdExist = false
      } else {
        axios({
          method: 'post',
          url: '/idCheck',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          data: sendData
        })
          .then(response => {
            if (response.data.data === '존재하는 아이디') {
              this.idCheck = true
            }
          }).catch(error => {
            console.log(error)
          })
      }
    },
    submit () {
      this.formHasErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      axios({
        method: 'post',
        url: '/signup',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: this.submitForm
      })
        .then(response => {
          if (response.data.data === '성공') {
            alert(this.id + '님의 가입을 축하합니다.')
            this.$router.push({ name: 'login' })
          }
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
