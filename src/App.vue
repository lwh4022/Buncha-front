<template>
  <v-app style="font-family: 'Nanum Gothic', sans-serif">
    <router-view></router-view>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    const token = window.localStorage.getItem('TOKEN')
    if (token !== undefined && token !== '' && token !== null) {
      axios({
        url: '/private/authCheck',
        method: 'get',
        headers: {
          'Authorization': window.localStorage.getItem('TOKEN')
        }
      })
        .then(response => {
          let loginInfo = {
            memberId: response.data.data.memberId,
            role: response.data.data.role,
            token: response.data.data.token
          }
          this.$store.dispatch('signin', loginInfo)
        })
        .catch(error => {
          alert('로그인 해주세요')
          this.$router.push({ name: 'login' })
        })
      const payload = window.localStorage.getItem('AUTHTIME') - new Date().getTime() / 1000 / 60 / 60 > 2
      this.$store.commit('authTime', payload)
    }
  }
}
</script>
