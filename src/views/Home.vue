<template>
  <div class="ma-0 pa-0">
    <!-- Header.vue -->
    <header-bar></header-bar>
    <!-- Home_Img.vue -->
    <home-img></home-img>
    <!-- Home_Freelancer.vue -->
    <home-freelancer></home-freelancer>
    <!-- 프리랜서 등록 알림 글 -->
    <v-row style="background: rgb(255,255,255);background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(125,125,125,1) 100%);">
      <v-col
        cols="12"
        class="d-flex flex-column align-center justify-md-center enrollFreelancer mt-5 mb-5">
        <p class="d-inline mb-0 font-weight-bold display-1" style="text-align:center">업무를 찾고 계신가요?</p>
        <v-btn class="d-inline mt-3 pt-1 pb-2 title" min-height="45px" color="info"><router-link :to="{name:'freelancerEnroll'}" class="blackMenu">프리랜서 등록</router-link></v-btn>
      </v-col>
    </v-row>
    <!-- 등록된 프리랜서 -->
    <home-job></home-job>
    <!-- Footer.vue -->
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Header from '@/components/Header_Footer/Header'
import Home_Img from '@/components/Home/Home_Img'
import Home_Freelancer from '@/components/Home/Home_Freelancer'
import Home_Job from '@/components/Home/Home_Job'
import Footer from '@/components/Header_Footer/Footer'

export default {
  components: {
    'home-img': Home_Img,
    'home-freelancer': Home_Freelancer,
    'home-job': Home_Job,
    'header-bar': Header,
    'footer-bar': Footer
  }
}
</script>

<style scoped>
  .blackMenu{
    text-decoration: none;
    color: inherit;
  }
</style>
