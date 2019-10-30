<template>
  <v-list style="background-color:rgb(47, 53, 58);height:auto;">
    <v-list-item>
      <v-list-item-title class="white--text text-center font-weight-bold title">마이페이지</v-list-item-title>
    </v-list-item>
    <v-divider style="background-color:white;" class="my-3"></v-divider>
    <!-- 회원정보 -->
    <router-link :to="{name:'profileEdit'}" class="linkDeco">
      <v-list-item>
        <v-list-item-icon>
          <v-icon class="ml-2 white--text">fas fa-user</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">
          회원정보
        </v-list-item-title>
      </v-list-item>
    </router-link>

    <!-- 프리랜서정보 -->
    <router-link :to="{name:'freelancerProfileEdit'}" class="linkDeco">
      <v-list-item>
        <v-list-item-icon>
          <v-icon class="ml-2 white--text">fas fa-user-tie</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">
          프리랜서정보
        </v-list-item-title>
      </v-list-item>
    </router-link>

    <!-- 나의 일정 확인-->
    <router-link :to="{name:'schedule'}" class="linkDeco">
      <v-list-item>
        <v-list-item-icon class="white--text">
          <v-icon class="ml-2 white--text">fas fa-calendar-alt</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">
          일정 확인
        </v-list-item-title>
      </v-list-item>
    </router-link>

    <!-- 지원한 업무 -->
    <router-link :to="{name:'enrolledJob'}" class="linkDeco">
      <v-list-item>
        <v-list-item-icon>
          <v-icon class="ml-2 white--text">fas fa-envelope-open</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">
          지원한 업무
        </v-list-item-title>
      </v-list-item>
    </router-link>

    <!-- 등록한 업무 -->
    <router-link :to="{name:'createdJob'}" class="linkDeco">
      <v-list-item>
        <v-list-item-icon>
          <v-icon class="ml-2 white--text linkDeco">fas fa-address-card</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">
          등록한 업무
        </v-list-item-title>
      </v-list-item>
    </router-link>
  </v-list>
</template>

<style scoped>
  .linkDeco{
    text-decoration: none;
  }
</style>
