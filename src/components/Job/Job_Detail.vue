<template>
  <div class="pa-0 ma-0">
    <header-bar></header-bar>
    <img src="@/assets/jobDetail.jpg" style="width:100%;height:calc(100vh - 64px);position:absolute;">
    <v-card
      max-width="800px"
      class="mx-auto mt-5 mb-5"
      outlined
      style="background:none; border:0px"
    >
      <h1 v-if="!isSchedule">업무에 지원하고 연락을 받아보세요</h1>
    </v-card>
    <v-card max-width="800px" class="mx-auto my-auto">
      <!-- 내부 프레임-->
      <div class="pa-4">
        <!-- 업무 한줄 소개-->
        <div class="pa-3 mb-3" style="border:1px solid black;background-color:white;">
          <v-card-title class="pa-1">업무 한줄 소개</v-card-title>
          <v-row class="pa-0">
            <v-col cols="12">
              <v-card-text class="d-flex flex-row pa-0">
                <v-text-field disabled v-model="dataSet.singleLineIntro" outlined hide-details></v-text-field>
              </v-card-text>
            </v-col>
          </v-row>
        </div>

        <!-- 구인자정보 -->
        <div class="pa-3 mb-3" style="border:1px solid black;background-color:white">
          <v-card-title class="pa-1">구인자 정보</v-card-title>
          <v-row class="pa-0">
            <v-col cols="12" class="pb-0">
              <v-card-text class="d-flex flex-row pa-0">
                <v-text-field
                  v-model="dataSet.comOrIndi"
                  label="회사/개인"
                  outlined
                  style="width:10%"
                  class="mr-1"
                  disabled
                  hide-details
                ></v-text-field>
                <v-text-field
                  v-show="dataSet.comOrIndi === '회사'"
                  v-model="dataSet.companyName"
                  label="회사명"
                  outlined
                  style="width:10%;"
                  class="mr-1"
                  disabled
                  hide-details
                ></v-text-field>
                <v-text-field
                  v-model="dataSet.pic"
                  label="담당자"
                  style="width:10%"
                  class="mr-1"
                  outlined
                  disabled
                  hide-details
                ></v-text-field>
                <v-text-field
                  v-model="dataSet.phone"
                  label="전화번호"
                  outlined
                  class="mr-1"
                  disabled
                  hide-details
                ></v-text-field>
                <v-text-field
                  v-model="dataSet.email"
                  label="이메일"
                  outlined
                  disabled
                  hide-details
                ></v-text-field>
              </v-card-text>
            </v-col>
          </v-row>
        </div>

        <!-- 업무 정보-->
        <!-- 첫번째 줄 -->
        <div class="pa-3 mb-3" style="border:1px solid black;background-color:white">
          <v-card-title class="pa-1">업무 정보</v-card-title>
          <v-row>
            <v-col cols="12">
              <v-card-text class="d-flex flex-row pa-0">
                <v-text-field
                  v-model="dataSet.jobType"
                  label="업무종류"
                  class="mr-1"
                  outlined
                  disabled
                  hide-details
                ></v-text-field>
                <!-- 시작 일자 -->
                <v-text-field
                  v-model="dataSet.startDate"
                  label="시작일자"
                  class="mr-1"
                  outlined
                  disabled
                  hide-details
                ></v-text-field>
                <!-- 종료 일자 -->
                <v-text-field
                  v-model="dataSet.endDate"
                  label="종료일자"
                  class="mr-1"
                  disabled
                  outlined
                  hide-details
                ></v-text-field>
                <!-- 마감 일자 -->
                <v-text-field
                  v-model="dataSet.recruitDate"
                  label="모집마감"
                  disabled
                  outlined
                  hide-details
                ></v-text-field>
              </v-card-text>
            </v-col>
          </v-row>

          <!-- 업무 정보 -->
          <!-- 두번째 줄 -->
          <v-row>
            <v-col cols="2" class="py-0 pr-0">
              <v-card-text class="d-flex flex-row pa-0">
                <v-text-field
                  v-model="dataSet.numRecruit"
                  label="모집인원"
                  suffix="명"
                  class="mr-1"
                  outlined
                  hide-details
                  disabled
                ></v-text-field>
              </v-card-text>
            </v-col>
            <v-col cols="10" class="py-0 pl-0">
              <v-card-text class="d-flex flex-row pa-0">
                <v-text-field
                  v-model="locationSet"
                  label="근무장소"
                  disabled
                  outlined
                ></v-text-field>
              </v-card-text>
            </v-col>
          </v-row>

          <!-- 업무 정보 -->
          <!-- 세번째 줄 -->
          <v-row>
            <v-col cols="2" class="py-0 pr-1">
              <v-card-text class="d-flex flex-row pa-0">
                <v-text-field
                  ref="salary"
                  v-model="dataSet.salary"
                  label="급여"
                  disabled
                  outlined
                  hide-details
                ></v-text-field>
              </v-card-text>
            </v-col>
            <v-col cols="4" class="py-0 pl-0">
              <v-card-text class="d-flex flex-row pa-0">
                <v-text-field
                  v-show="!dataSet.isNego"
                  v-model="dataSet.amount"
                  label="금액"
                  suffix="만원"
                  class="centered-input pr-4"
                  wrap="hard"
                  disabled
                  outlined
                  hide-details
                ></v-text-field>
                <v-checkbox
                  v-show="dataSet.isNego"
                  v-model="dataSet.isNego"
                  label="협의"
                ></v-checkbox>
              </v-card-text>
            </v-col>
            <v-col cols="6"></v-col>
          </v-row>
        </div>

        <!-- 업무 상세 소개 -->
        <div class="pa-3 mb-3" style="border:1px solid black;background-color:white">
          <v-card-title class="pa-1">업무 상세 소개</v-card-title>
          <v-textarea
            v-model="description"
            outlined
            hide-details
            disabled
            auto-grow
          ></v-textarea>
        </div>
        <!-- 버튼 모음 -->
        <v-card-actions>
          <v-btn v-if="!isSchedule" class="text--black font-weight-bold mx-auto" text @click="goHome">홈으로</v-btn>
          <v-btn v-if="isSchedule" class="text--black font-weight-bold mx-auto" text @click="goBack">뒤로 가기</v-btn>
          <div v-if="!isSchedule" class="flex-grow-1"></div>
          <v-btn v-if="!isSchedule" class="text--black font-weight-bold mx-auto" text @click="apply">지원하기</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import Header from '@/components/Header_Footer/Header'

export default {
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.$store.state.loginInfo.role !== 'FREELANCER') {
        alert('프리랜서 가입 후 가능합니다')
        vm.$router.push({ name: 'freelancerEnroll' })
      }
    })
  },
  data () {
    return {
      dataSet: {},
      locationSet: [],
      isSchedule: false
    }
  },
  components: {
    'header-bar': Header
  },
  created () {
    this.isSchedule = this.$route.params.isSchedule
    axios({
      method: 'GET',
      url: '/private/getJobInfo/' + this.$route.params.num,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': window.localStorage.getItem('TOKEN')
      }
    })
      .then(response => {
        if (response.data.data == null) {
          alert('삭제된 정보 입니다.')
          this.$router.push({ name: 'jobShow' })
        } else if (response.data.data.jobLocation == null) {
          alert('시스템 오류입니다.')
        } else {
          this.dataSet = response.data.data.job
          this.locationSet = response.data.data.jobLocation
        }
      })
  },
  computed: {
    applyForm () {
      return {
        memberId: this.$store.state.loginInfo.memberId,
        jobSeq: this.$route.params.num
      }
    },
    description () {
      if (this.dataSet.jobDescription === undefined || this.dataSet.jobDescription === null) {
        return ''
      } else {
        let result = this.textareaBack(this.dataSet.jobDescription)
        return result
      }
    }
  },
  methods: {
    apply () {
      const role = this.$store.state.loginInfo.role
      if (role === 'MEMBER') {
        alert('프리랜서 등록 후 가능합니다.')
        this.$router.push({ name: 'freelancerEnroll' })
      } else if (role === 'ADMIN') {
        console.log('어드민으로 입장하셨네요')
      } else if (role === 'FREELANCER') {
        axios({
          method: 'post',
          url: '/private/applyJob',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': window.localStorage.getItem('TOKEN')
          },
          data: this.applyForm
        })
          .then(response => {
            if (response.data.data === '기등록') {
              alert('이미 등록하신 업무입니다.')
            } else if (response.data.data === '성공') {
              alert('성공적으로 지원하셨습니다.')
            } else {
              alert('시스템 오류')
            }
          })
      } else if (role === undefined) {
        alert('로그인 후 가능합니다.')
        this.$router.push({ name: 'login' })
      } else {
        console.log('시스템 에러')
      }
    },
    textareaBack (text) {
      let formatted = text.replace(/\<br\/\>/g, '\r\n')
      return formatted
    },
    goBack () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>
  .centered-input input{
    text-align: right;
  }
  .theme--light.v-input--is-disabled .v-label, .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea{
    color:black;
  }
  .theme--light.v-text-field.v-input--is-disabled .v-text-field__prefix, .theme--light.v-text-field.v-input--is-disabled .v-text-field__suffix{
    color:black;
  }
</style>
