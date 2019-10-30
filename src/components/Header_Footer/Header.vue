<template>
  <div>
    <!-- 로그인 이전 메뉴 -->
    <v-toolbar v-if="!isLogin" class="d-none d-md-block" max-height="70">
        <div style="width:10px;"></div>
        <router-link :to="{name:'home'}" style="text-decoration:none;" exact><v-toolbar-title class="black--text display-1 font-weight-bold">Buncha</v-toolbar-title></router-link>
        <v-layout align-content-end>
        <v-toolbar-items style="margin-left:auto;">
          <v-btn class="pl-0 pr-3" text style="letter-spacing:0px;"><router-link :to="{name:'jobEnroll'}" class="desktopMenu" exact>업무 등록</router-link></v-btn>
          <v-btn class="pl-0 pr-3" text style="letter-spacing:0px;"><router-link :to="{name:'jobShow'}" class="desktopMenu" exact>업무 찾기</router-link></v-btn>
          <v-btn class="pl-0 pr-3" text style="letter-spacing:0px;"><router-link :to="{name:'freelancerShow'}" class="desktopMenu" exact>프리랜서 찾기</router-link></v-btn>
          <v-btn class="pl-0 pr-3" text style="letter-spacing:0px;"><router-link :to="{name:'about'}" class="desktopMenu" exact>문의 하기</router-link></v-btn>
        </v-toolbar-items>
        <div style="width:1%"></div>
        <v-toolbar-items>
          <v-btn color="blue accent-2 white--text" class="pt-3 pb-3 mr-2"><router-link :to="{name:'login'}" style="color:white;text-decoration:none;" exact>로그인</router-link></v-btn>
          <v-btn color="success" class="pa-3 mr-2"><router-link :to="{name:'signup'}" style="color:white;text-decoration:none;" exact>회원가입</router-link></v-btn>
          <v-btn color="info" class="pa-3"><router-link :to="{name:'freelancerEnroll'}" style="color:white;text-decoration:none;" exact>프리랜서 등록하기</router-link></v-btn>
        </v-toolbar-items>
        </v-layout>
        <div style="width:10px;"></div>
    </v-toolbar>

    <!-- 로그인 후 메뉴 -->
    <v-toolbar v-if="isLogin" class="d-none d-md-block" max-height="70">

        <div style="width:10px;"></div>
        <router-link :to="{name:'home'}" style="text-decoration:none;" exact><v-toolbar-title class="black--text display-1 font-weight-bold">Buncha</v-toolbar-title></router-link>
        <v-layout align-content-end>
        <v-toolbar-items style="margin-left:auto;">
          <v-btn class="pl-0 pr-3" text style="letter-spacing:0px;"><router-link :to="{name:'jobEnroll'}" class="desktopMenu" exact>업무 등록</router-link></v-btn>
          <v-btn class="pl-0 pr-3" text style="letter-spacing:0px;"><router-link :to="{name:'jobShow'}" class="desktopMenu" exact>업무 찾기</router-link></v-btn>
          <v-btn class="pl-0 pr-3" text style="letter-spacing:0px;"><router-link :to="{name:'freelancerShow'}" class="desktopMenu" exact>프리랜서 찾기</router-link></v-btn>
          <v-btn class="pl-0 pr-3" text style="letter-spacing:0px;"><router-link :to="{name:'about'}" class="desktopMenu" exact>문의 하기</router-link></v-btn>
        </v-toolbar-items>
        <div style="width:1%"></div>
        <v-toolbar-items>
          <v-menu offset-y>
            <template v-slot:activator = "{ on }">
              <v-avatar
                v-on="on"
                style="cursor:pointer"
              >
              <img v-if="hasThumb" :src="thumb">
              <v-icon v-if="!hasThumb" x-large>fas fa-user-circle</v-icon>
            </v-avatar>
            </template>
            <v-list-item class="list" @click="$router.push({name:'mypage'})">
              <v-list-item-title
              >
              마이페이지
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="role !== 'FREELANCER' && role !== 'ADMIN'" class="list" @click="$router.push({name:'freelancerEnroll'})">
              <v-list-item-title
              >
              프리랜서 등록하기
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="list" @click="logout">
              <v-list-item-title
              >
              로그아웃
              </v-list-item-title>
            </v-list-item>
          </v-menu>
        </v-toolbar-items>
        </v-layout>
        <div style="width:10px;"></div>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      thumb: '',
      token: '',
      memberId: '',
      isLogin: false,
      role: 'MEMBER',
      hasThumb: false
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.isLogin = this.$store.state.authState
      this.$router.push({ name: 'login' })
    },
    getInfo () {
      const token = window.localStorage.getItem('TOKEN')
      if (token !== undefined && token !== '' && token !== null) {
        axios({
          url: '/private/authCheck/',
          method: 'GET',
          headers: {
            'Authorization': token
          }
        })
          .then(response => {
            this.isLogin = true
            this.memberId = response.data.data.memberId
            this.role = response.data.data.role
            this.getThumbNail(this.memberId)
          })
          .catch(error => {
            this.isLogin = false
            alert('로그인 해주세요')
            this.$router.push({ name: 'login' })
          })
      }
    },
    getThumbNail (memberId) {
      axios({
        url: '/private/getThumbNailByMemberId/' + memberId,
        method: 'get',
        headers: {
          'Authorization': window.localStorage.getItem('TOKEN')
        },
        responseType: 'blob'
      })
        .then(response => {
          let reader = new FileReader()
          reader.onload = e => {
            if (e.target.result === 'data:application/json;base64,eyJzdGF0dXNDb2RlIjo1MDAsIm1lc3NhZ2UiOiLtlITrpqzrnpzshJzroZwg65Ox66Gd7ZWY7KeAIOyViuyVmOyKteuLiOuLpCIsImRhdGEiOm51bGx9') {
              this.hasThumb = false
            } else {
              this.hasThumb = true
              this.thumb = e.target.result
            }
          }
          reader.readAsDataURL(response.data)
        })
    }
  }
}
</script>

<style scoped>
  .desktopMenu{
    color:black;
    text-decoration:none;
  }

  .list{
    background-color:white;
    cursor:pointer;
  }
  .list:hover{
    background-color:#42A5F5;
  }
</style>
