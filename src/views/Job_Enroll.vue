<template>
  <v-container fluid class="pa-0">
    <!-- Header.vue -->
    <header-bar></header-bar>
    <v-img src="@/assets/jobEnroll.jpg" style="width:100%;height:calc(100% - 70px);position:absolute;"></v-img>
    <v-row justify="center" align-content="center" class="pa-0 mb-0 mx-0 mt-9">
      <v-col cols="12">
        <v-card max-width="1024px" class="mx-auto" ref="form" >
          <!-- 내부 프레임-->
          <div class="pa-4">

            <!-- 제목 -->
            <div class="text-center mb-10"><h1>업무 등록하기</h1></div>

            <!-- 업무 한줄 소개-->
            <div class="pa-3 mb-3" style="border:1px solid black;background-color:white;">
              <v-card-title class="pa-1">업무 한줄 소개</v-card-title>
              <v-row class="pa-0">
                <v-col cols="12">
                  <v-card-text class="d-flex flex-row pa-0">
                    <v-text-field ref="singleLineIntro" v-model="singleLineIntro" :rules="[rules.required]" required outlined></v-text-field>
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
                    <v-select
                      ref="comOrIndi"
                      v-model="comOrIndi"
                      :items="recruiterType"
                      :rules="[rules.required]"
                      label="회사/개인"
                      @change="defaultCompanyName"
                      outlined
                      style="width:10%"
                      class="mr-1"
                    ></v-select>
                    <v-text-field
                      v-show="comOrIndi === '회사'"
                      ref="companyName"
                      v-model="companyName"
                      label="회사명"
                      :rules="[rules.required]"
                      required outlined
                      style="width:10%;"
                      class="mr-1"
                    ></v-text-field>
                    <v-text-field
                      ref="pic"
                      v-model="pic"
                      label="담당자"
                      :rules="[rules.required]"
                      style="width:10%"
                      class="mr-1"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      ref="phone"
                      v-model="phone"
                      label="전화번호"
                      :rules="[rules.required, rules.cPhoneCheck]"
                      @keyup="formatter"
                      required
                      outlined
                      class="mr-1"
                    ></v-text-field>
                    <v-text-field
                      ref="email"
                      v-model="email"
                      label="이메일"
                      :rules="[rules.required, rules.emailCheck]"
                      required
                      outlined
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
                <v-col cols="12" class="pb-0">
                  <v-card-text class="d-flex flex-row pa-0">
                    <v-select
                      ref="jobType"
                      v-model="jobType"
                      :items="typeJob"
                      label="업무종류"
                      :rules="[rules.required]"
                      class="mr-1"
                      outlined
                    ></v-select>
                    <!-- 시작 일자 -->
                    <v-menu
                      ref="menu"
                      v-model="menuStartDate"
                      :close-on-content-click="true"
                      :return-value="startDate"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="startDate"
                          label="시작일자"
                          ref="startDate"
                          :rules="[rules.required]"
                          class="mr-1"
                          readonly
                          outlined
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="startDate" no-title scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="menuStartDate = false">Cancel</v-btn>
                        <div class="flex-grow-1"></div>
                      </v-date-picker>
                    </v-menu>

                    <!-- 종료 일자 -->
                    <v-menu
                      ref="menu"
                      v-model="menuEndDate"
                      :close-on-content-click="true"
                      :return-value="endDate"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="endDate"
                          label="종료일자"
                          ref="endDate"
                          :rules="[rules.required]"
                          class="mr-1"
                          readonly
                          outlined
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="endDate" no-title scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="menuEndDate = false">Cancel</v-btn>
                        <div class="flex-grow-1"></div>
                      </v-date-picker>
                    </v-menu>

                    <!-- 마감 일자 -->
                    <v-menu
                      ref="menu"
                      v-model="menuRecruitDate"
                      :close-on-content-click="true"
                      :return-value="recruitDate"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="recruitDate"
                          label="모집마감"
                          ref="recruitDate"
                          :rules="[rules.required]"
                          readonly
                          outlined
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="recruitDate" no-title scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn
                          color="primary"
                          @click="menuRecruitDate = false"
                          text
                          >Cancel</v-btn>
                        <div class="flex-grow-1"></div>
                      </v-date-picker>
                    </v-menu>
                  </v-card-text>
                </v-col>
              </v-row>

              <!-- 업무 정보 -->
              <!-- 두번째 줄 -->
              <v-row>
                <v-col cols="2" class="py-0 pr-0">
                  <v-card-text class="d-flex flex-row pa-0">
                    <v-text-field
                      ref="numRecruit"
                      v-model="numRecruit"
                      label="모집인원"
                      suffix="명"
                      :rules="[rules.required]"
                      class="mr-1"
                      required
                      outlined
                    ></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col cols="10" class="py-0 pl-0">
                  <v-card-text class="d-flex flex-row pa-0">
                    <v-select
                      ref="jobLocation"
                      v-model="jobLocation"
                      :items="location"
                      label="근무장소"
                      :rules="[rules.location]"
                      required
                      outlined
                      multiple
                    ></v-select>
                  </v-card-text>
                </v-col>
              </v-row>

              <!-- 업무 정보 -->
              <!-- 세번째 줄 -->
              <v-row>
                <v-col cols="2" class="py-0 pr-1">
                  <v-card-text class="d-flex flex-row pa-0">
                    <v-select
                      ref="salary"
                      v-model="salary"
                      :items="salaryType"
                      label="급여"
                      :rules="[rules.required]"
                      required
                      outlined
                    ></v-select>
                  </v-card-text>
                </v-col>
                <v-col cols="4" class="py-0 pl-0">
                  <v-card-text class="d-flex flex-row pa-0">
                    <v-text-field
                      v-show="!isNego"
                      ref="amount"
                      v-model="amount"
                      label="금액"
                      suffix="만원"
                      :rules="[rules.required]"
                      class="centered-input pr-4"
                      required
                      outlined
                    ></v-text-field>
                    <v-checkbox
                      ref="isNego"
                      v-model="isNego"
                      @change="defaultAmount"
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
                ref="jobDescription"
                v-model="jobDescription"
                :rules="[rules.required]"
                outlined
                rows="20"
                ></v-textarea>
            </div>

            <!-- 버튼 모음 -->
            <v-card-actions>
              <v-btn text><router-link :to="{name:'home'}" style="color:black;text-decoration:none;">홈으로</router-link></v-btn>
              <div class="flex-grow-1"></div>
              <v-dialog
                v-model="dialog"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="text--black font-weight-bold"
                    text
                    v-on="on"
                  >
                    미리보기
                  </v-btn>
                </template>
                  <v-card max-width="800px" class="mx-auto my-auto">
                    <!-- 내부 프레임-->
                    <div class="pa-4">
                      <!-- 업무 한줄 소개-->
                      <div class="pa-3 mb-3" style="border:1px solid black;background-color:white;">
                        <v-card-title class="pa-1">업무 한줄 소개</v-card-title>
                        <v-row class="pa-0">
                          <v-col cols="12">
                            <v-card-text class="d-flex flex-row pa-0">
                              <v-text-field disabled v-model="singleLineIntro" outlined hide-details></v-text-field>
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
                                v-model="comOrIndi"
                                label="회사/개인"
                                outlined
                                style="width:10%"
                                class="mr-1"
                                disabled
                                hide-details
                              ></v-text-field>
                              <v-text-field
                                v-show="comOrIndi === '회사'"
                                v-model="companyName"
                                label="회사명"
                                outlined
                                style="width:10%;"
                                class="mr-1"
                                disabled
                                hide-details
                              ></v-text-field>
                              <v-text-field
                                v-model="pic"
                                label="담당자"
                                style="width:10%"
                                class="mr-1"
                                outlined
                                disabled
                                hide-details
                              ></v-text-field>
                              <v-text-field
                                v-model="phone"
                                label="전화번호"
                                outlined
                                class="mr-1"
                                disabled
                                hide-details
                              ></v-text-field>
                              <v-text-field
                                v-model="email"
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
                                v-model="jobType"
                                label="업무종류"
                                class="mr-1"
                                outlined
                                disabled
                                hide-details
                              ></v-text-field>
                              <!-- 시작 일자 -->
                              <v-text-field
                                v-model="startDate"
                                label="시작일자"
                                class="mr-1"
                                outlined
                                disabled
                                hide-details
                              ></v-text-field>
                              <!-- 종료 일자 -->
                              <v-text-field
                                v-model="endDate"
                                label="종료일자"
                                class="mr-1"
                                disabled
                                outlined
                                hide-details
                              ></v-text-field>
                              <!-- 마감 일자 -->
                              <v-text-field
                                v-model="recruitDate"
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
                                v-model="numRecruit"
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
                                v-model="jobLocation"
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
                                v-model="salary"
                                label="급여"
                                disabled
                                outlined
                                hide-details
                              ></v-text-field>
                            </v-card-text>
                          </v-col>
                          <v-col cols="5" class="py-0 pl-0">
                            <v-card-text class="d-flex flex-row pa-0">
                              <v-text-field
                                v-show="!isNego"
                                v-model="amount"
                                label="금액"
                                suffix="만원"
                                class="centered-input pr-2"
                                disabled
                                outlined
                                hide-details
                              ></v-text-field>
                              <v-checkbox
                                v-show="isNego"
                                v-model="isNego"
                                label="협의"
                              ></v-checkbox>
                            </v-card-text>
                          </v-col>
                          <v-col cols="5"></v-col>
                        </v-row>
                      </div>

                      <!-- 업무 상세 소개 -->
                      <div class="pa-3 mb-3" style="border:1px solid black;background-color:white">
                        <v-card-title class="pa-1">업무 상세 소개</v-card-title>
                        <v-textarea
                          v-model="jobDescription"
                          wrap="hard"
                          outlined
                          hide-details
                          disabled
                          auto-grow
                        ></v-textarea>
                      </div>
                      <!-- 버튼 모음 -->
                      <v-card-actions>
                        <v-btn class="text--black font-weight-bold mx-auto" @click="close" text>닫&nbsp;&nbsp;기</v-btn>
                      </v-card-actions>
                    </div>
                  </v-card>
              </v-dialog>
              <div class="flex-grow-1"></div>
              <v-btn class="text--black font-weight-bold" text @click="submit">제출</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Header from '@/components/Header_Footer/Header'
import axios from 'axios'

export default {
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.$store.state.authState === false) {
        alert('로그인 해주세요')
        vm.$router.push({ name: 'login' })
      }
    })
  },
  data () {
    return {
      dialog: false,
      recruiterType: [
        '회사',
        '개인'
      ],
      typeJob: [
        '통역',
        '번역',
        '단체강의',
        '개인과외'
      ],
      location: [
        '서울',
        '부산',
        '인천',
        '대구',
        '울산',
        '광주',
        '경기',
        '강원',
        '경남',
        '경북',
        '충남',
        '충북',
        '전남',
        '전북',
        '제주',
        '세종'
      ],
      salaryType: [
        '일급',
        '월급',
        '총액'
      ],
      singleLineIntro: '',
      comOrIndi: '',
      companyName: '',
      pic: '',
      phone: '',
      email: '',
      jobType: '',
      startDate: '',
      endDate: '',
      recruitDate: '',
      numRecruit: '',
      jobLocation: [],
      salary: '',
      amount: '',
      isNego: false,
      jobDescription: '',
      menuStartDate: false,
      menuEndDate: false,
      menuRecruitDate: false,
      rules: {
        required: value => !!value || '필수 입력사항입니다.',
        location: value => value.length !== 0 || '필수 입력사항입니다.',
        emailCheck: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '이메일 형식이 아닙니다'
        },
        cPhoneCheck: value => {
          const pattern = /^\d{2,3}-\d{3,4}-\d{4}$/
          return pattern.test(value) || '올바른 전화번호 형식이 아닙니다'
        }
      },
      formHasErrors: false
    }
  },
  components: {
    'header-bar': Header
  },
  computed: {
    form () {
      return {
        singleLineIntro: this.singleLineIntro,
        comOrIndi: this.comOrIndi,
        companyName: this.companyName,
        pic: this.pic,
        phone: this.phone,
        email: this.email,
        jobType: this.jobType,
        startDate: this.startDate,
        endDate: this.endDate,
        recruitDate: this.recruitDate,
        numRecruit: this.numRecruit,
        jobLocation: this.jobLocation,
        salary: this.salary,
        amount: this.amount,
        isNego: this.isNego,
        jobDescription: this.jobDescription
      }
    },
    submitForm () {
      return {
        memberId: this.$store.state.loginInfo.memberId,
        singleLineIntro: this.singleLineIntro,
        comOrIndi: this.comOrIndi,
        companyName: this.companyName,
        pic: this.pic,
        phone: this.phone,
        email: this.email,
        jobType: this.jobType,
        startDate: this.startDate,
        endDate: this.endDate,
        recruitDate: this.recruitDate,
        numRecruit: this.numRecruit,
        jobLocation: this.jobLocation,
        salary: this.salary,
        amount: this.amount,
        isNego: this.isNego,
        jobDescription: this.textareaFormatter(this.jobDescription)
      }
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
        url: '/private/enrollJob',
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': window.localStorage.getItem('TOKEN')
        },
        data: this.submitForm
      })
        .then(response => {
          if (response.data.data === '성공') {
            alert('성공적으로 등록되었습니다.')
            this.$router.push({ name: 'home' })
          } else {
            console.log(response)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    textareaFormatter (item) {
      let formatted = item.replace(/(?:\r\n|\r|\n)/g, '<br/>')
      return formatted
    },
    defaultCompanyName () {
      if (this.comOrIndi === '개인') {
        this.companyName = '개인이 등록한 글'
      }
      if (this.comOrIndi === '회사') {
        this.companyName = ''
      }
    },
    defaultAmount () {
      if (this.isNego === true) {
        this.amount = -1
      } else {
        this.amount = ''
      }
    },
    close () {
      this.dialog = false
    },
    formatter () {
      let number = this.phone.replace(/[^0-9]/g, '')
      let tel = ''
      // 서울 지역번호(02)가 들어오는 경우
      if (number.substring(0, 2).indexOf('02') == 0) {
        if (number.length < 3) {
          return number
        } else if (number.length < 6) {
          tel += number.substr(0, 2)
          tel += '-'
          tel += number.substr(2)
        } else if (number.length < 10) {
          tel += number.substr(0, 2)
          tel += '-'
          tel += number.substr(2, 3)
          tel += '-'
          tel += number.substr(5)
        } else {
          tel += number.substr(0, 2)
          tel += '-'
          tel += number.substr(2, 4)
          tel += '-'
          tel += number.substr(6)
        }

      // 서울 지역번호(02)가 아닌경우
      } else {
        if (number.length < 4) {
          return number
        } else if (number.length < 7) {
          tel += number.substr(0, 3)
          tel += '-'
          tel += number.substr(3)
        } else if (number.length < 11) {
          tel += number.substr(0, 3)
          tel += '-'
          tel += number.substr(3, 3)
          tel += '-'
          tel += number.substr(6)
        } else {
          tel += number.substr(0, 3)
          tel += '-'
          tel += number.substr(3, 4)
          tel += '-'
          tel += number.substr(7)
        }
      }
      this.phone = tel
    }
  }
}
</script>

<style>
  .centered-input input{
    text-align: right;
  }
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
