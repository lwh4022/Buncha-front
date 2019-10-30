<template>
  <v-container fluid class="pa-0">
    <v-img src="@/assets/profileBg.jpg" class="bgImg"></v-img>
    <div class="d-flex flex-column mx-auto customSheet mt-6">
      <div class="mt-12">
        <v-text-field
          ref="id"
          v-model="id"
          class="custom"
          outlined
          disabled
        >
          <template v-slot:prepend>
            <div class="labelSlot">
              아이디
            </div>
          </template>
        </v-text-field>
        <v-text-field
          ref="currentPassword"
          v-model="currentPassword"
          :type="'password'"
          :rules="[rules.password,]"
          background-color="#f7f5f5"
          outlined
          required
        >
          <template v-slot:prepend>
            <div class="labelSlot">
              현재 비밀번호
            </div>
          </template>
        </v-text-field>
        <v-text-field
          ref="newPassword"
          v-model="newPassword"
          :type="'password'"
          :rules="[rules.password]"
          background-color="#f7f5f5"
          outlined
          required
        >
          <template v-slot:prepend>
            <div class="labelSlot">
              새 비밀번호
            </div>
          </template>
        </v-text-field>
        <v-text-field
          ref="newPasswordCheck"
          v-model="newPasswordCheck"
          :type="'password'"
          :rules="[
            rules.checkPassword,
            () => newPassword === newPasswordCheck || '신규 비밀번호가 일치하지 않습니다'
          ]"
          background-color="#f7f5f5"
          outlined
          required
        >
          <template v-slot:prepend>
            <div class="labelSlot">
              새 비밀번호 확인
            </div>
          </template>
        </v-text-field>
        <v-text-field
          ref="name"
          v-model="name"
          background-color="#f7f5f5"
          :rules="[rules.name]"
          outlined
        >
          <template v-slot:prepend>
            <div class="labelSlot">
              이름
            </div>
          </template>
        </v-text-field>
        <v-text-field
          ref="email"
          v-model="email"
          background-color="#f7f5f5"
          :rules="[rules.email, rules.emailCheck]"
          outlined
          required
        >
          <template v-slot:prepend>
            <div class="labelSlot">
              이메일
            </div>
          </template>
        </v-text-field>
        <v-card-actions>
          <v-btn color="info">취소</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="info" @click="submit">수정</v-btn>
        </v-card-actions>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      currentPassword: '',
      newPassword: '',
      newPasswordCheck: '',
      name: '',
      email: '',
      formHasErrors: false,
      rules: {
        emailCheck: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '이메일 형식이 아닙니다'
        },
        email: value => !!value || '이메일은 반드시 입력해야 합니다',
        password: value => !!value || '비밀번호는 반드시 입력해야 합니다',
        checkPassword: value => !!value || '비밀번호 확인은 반드시 입력해야 합니다',
        name: value => !!value || '이름은 반드시 입력해야 합니다'
      }
    }
  },
  computed: {
    form () {
      return {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        newPasswordCheck: this.newPasswordCheck,
        name: this.name,
        email: this.email
      }
    },
    submitForm () {
      return {
        memberId: this.id,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        name: this.name,
        email: this.email
      }
    }
  },
  created () {
    axios({
      url: '/private/getMe/' + this.$store.state.loginInfo.memberId,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem('TOKEN')
      }
    })
      .then(response => {
        this.id = response.data.data.memberId
        this.name = response.data.data.name
        this.email = response.data.data.email
      })
  },
  methods: {
    submit () {
      this.formHasErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })

      let jwtToken = window.localStorage.getItem('TOKEN')
      let sendingData = this.submitForm
      if (jwtToken === null) {
        alert('로그인 해주세요')
        this.$router.push({ name: 'login' })
      } else {
        axios({
          url: '/user',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': jwtToken
          },
          data: sendingData
        })
          .then(response => {
            console.log(response)
          })
      }
    }
  }
}
</script>

<style>
  .labelSlot {
    width:150px;
    text-align:center;
    font-weight: bold;
  }
  .customSheet{
    background-color:#fafafa;
    width:700px;
    height:calc(100vh - 64px);
  }
  .custom.v-text-field > .v-input__control > .v-input__slot:before {
    border-style: none;
  }
  .custom.v-text-field > .v-input__control > .v-text-field__slot::after{
    border-style: none;
  }
  .custom .theme--light.v-input--is-disabled .v-label, .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea{
    color:black !important;
  }
  .bgImg{
    width:100%;
    height:calc(100vh - 64px);
    position:absolute;
    overflow: hidden;
  }
</style>
