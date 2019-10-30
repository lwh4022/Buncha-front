<template>
  <v-container fluid class="pa-0" style="height:100%">
    <header-bar :windowXSize="windowXSize"></header-bar>
    <v-row>
      <side-bar class="d-inline-block sidebar"></side-bar>
      <router-view class="d-inline-block contents"></router-view>
    </v-row>
  </v-container>
</template>

<script>
import Header from '@/components/Header_Footer/Header'
import Sidebar from '@/components/Mypage/Mypage_menu'

export default {
  props: ['windowXSize'],
  components: {
    'header-bar': Header,
    'side-bar': Sidebar
  },
  beforeCreate () {
    if (this.$store.state.authState === false) {
      alert('로그인 해주세요')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
  .sidebar {
    width: 200px;
  }
  .contents {
    width: calc(100% - 200px);
    height: 100%;
  }
</style>
