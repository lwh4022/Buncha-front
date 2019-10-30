<template>
  <div>
    <div v-if="!isFreelancer" class="d-flex" style="background-color:white;height:calc(100vh - 64px)">
      <div class="mx-auto my-auto">
        <div class="display-1 font-weight-bold">프리랜서로 가입 후 가능합니다</div>
        <div style="height:100px"></div>
        <div class="d-flex">
          <v-btn class="mx-auto headline" color="info" style="height:50px" @click="goEnrollFreelancer">프리랜서 등록하기</v-btn>
        </div>

      </div>
    </div>
    <div v-if="isFreelancer">
      <v-img src="@/assets/freelancerEditBg.jpg" class="bgImgFreelancer"></v-img>
      <v-card max-width="1024px" class="mx-auto mt-1" ref="form" style="background-color:#fafafa;" flat>
        <!-- 내부 프레임-->
        <div class="pa-4">
          <!-- 인적 사항-->
          <div class="pa-3 mb-3" style="border:1px solid black;">
          <v-card-title class="pa-1">인적사항</v-card-title>
          <v-row class="pa-0">
            <v-col cols="10">
              <v-card-text class="d-flex flex-row pa-0">
                <v-text-field v-model="personal.koName" ref="koName" label="한국이름" class="my-0 mx-1" style="width:15%;" :rules="[rules.required]" required disabled outlined></v-text-field>
                <v-text-field v-model="personal.vnName" ref="vnName" label="베트남이름" class="my-0 mx-1" style="width:25%;" :rules="[rules.required]" required outlined></v-text-field>
                <v-menu
                  ref="birthDayMenu"
                  v-model="birthDayMenu"
                  :close-on-content-click="true"
                  :return-value="personal.birthday"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="personal.birthday"
                      label="생년월일"
                      ref="birthday"
                      :rules="[rules.required]"
                      readonly
                      outlined
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="personal.birthday" no-title scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="birthDayMenu = false">Cancel</v-btn>
                    <div class="flex-grow-1"></div>
                  </v-date-picker>
                </v-menu>
                <v-select v-model="personal.gender" :items="genderSelect" ref="gender" label="성별" class="my-0 mx-1" style="width:15%;" :rules="[rules.required]" required outlined></v-select>
              </v-card-text>
              <v-card-text class="d-flex flex-row pa-0">
                <v-text-field v-model="personal.email" ref="email" label="이메일" class="my-0 mx-1" :rules="[rules.required, rules.emailCheck]" required disabled outlined></v-text-field>
                <v-text-field v-model="personal.cphone" ref="cphone" label="휴대폰번호" class="my-0 mx-1" :rules="[rules.required, rules.cPhoneCheck]" @keyup="formatter" required outlined></v-text-field>
                <v-text-field v-model="personal.address" ref="address" label="주소" class="my-0 mx-1" :rules="[rules.required]" required outlined></v-text-field>
              </v-card-text>
            </v-col>
            <v-col cols="2" class="d-flex justify-center flex-column pt-0">
              <div class="imgBox" @click="$refs.img.click()" style="cursor:pointer">
                <p v-if="personal.thumb === ''" class="text-center mt-10"><v-icon>fas fa-plus</v-icon></p>
                <p v-if="personal.thumb === ''" class="text-center">사진추가</p>
                <input class="d-none" ref="img" type="file" @change="uploadImg">
                <v-avatar v-if="personal.thumb !== ''" height="100%" width="100%" tile>
                  <img id="preview" :src="personal.thumb">
                </v-avatar>
              </div>
              <v-btn v-if="personal.thumb !== ''" text @click="deleteImg">삭제</v-btn>
            </v-col>
          </v-row>
          </div>

          <!-- 학력 -->
          <div class="pa-3 mb-3" style="border:1px solid black;">
            <!-- 학력제목 -->
            <v-card-title class="pa-1 mb-3">학력</v-card-title>
            <!-- 반복사항 시작-->
            <div v-for="item in eduList" :key="item.num" class="mb-4" style="border:1px solid #cccccc;position:relative">
              <v-icon color="black" class="pa-0" @click="deleteEdu(item.num)" style="position:absolute;left:98.5%;top:-5%">fas fa-times-circle</v-icon>
              <v-row class="pa-0">
                <v-col cols="12">
                  <v-card-text class="d-flex flex-row pa-0">
                    <v-row>
                      <v-col cols="7" class="d-flex flex-row pr-0">
                        <v-select v-model="item.poOrUnder" :items="education" label="학교구분" class="my-0 mx-1" hide-details style="width:5%;" outlined></v-select>
                        <v-text-field v-model="item.schoolName" label="학교명" class="my-0 mx-1" hide-details style="width:25%;"  outlined></v-text-field>
                      </v-col>
                      <v-col cols="5" class="pb-0">
                        <v-select class="d-inline-block my-0 mx-1" v-model="item.enrollYear" :items="years" label="입학연도" style="width:40%" hide-details outlined></v-select>
                        <v-select class="d-inline-block my-0 mx-1" v-if="!item.isStudent" v-model="item.gradYear" :items="years" label="졸업연도" style="width:40%" hide-details outlined></v-select>
                        <v-checkbox class="d-inline-block my-0 mx-1" v-model="item.isStudent" style="width:30%" label="재학중" outlined></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-text class="d-flex flex-row pa-0">
                    <v-row>
                      <v-col cols="7" class="d-flex flex-row pr-0 py-0">
                        <v-text-field v-model="item.major" label="전공명" class="my-0 mx-1" hide-details style="width:15%;" outlined></v-text-field>
                      </v-col>
                      <v-col cols="5" class="py-0">
                        <v-text-field v-if="item.poOrUnder !== '대학원' || item.poOrUnder === ''" v-model="item.score" label="학점" class="d-inline-block my-0 mx-1" style="width:30%" hide-details outlined></v-text-field>
                        <v-text-field v-if="item.poOrUnder !== '대학원' || item.poOrUnder === ''" v-model="item.totalScore" label="총점" class="d-inline-block my-0 mx-1" style="width:30%" hide-details outlined></v-text-field>
                        <v-text-field v-if="item.poOrUnder === '대학원'" v-model="item.thesis" label="논문제목" class="my-0 mx-1" hide-details outlined></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-text class="d-flex flex-row pa-0">
                    <v-row>
                      <v-col cols="7" class="d-flex flex-row pr-0">
                        <v-select v-model="item.subMajorType" :items="subMajorList" label="기타 전공" class="my-0 mx-1" hide-details style="width:5%;" outlined></v-select>
                        <v-text-field v-model="item.subMajor" v-if="item.subMajorType !== '없음'" label="전공명" class="my-0 mx-1" hide-details style="width:25%;" outlined></v-text-field>
                      </v-col>
                      <v-col cols="5" class="d-flex flex-row">
                      </v-col>
                    </v-row>
                  </v-card-text>
              </v-col>
            </v-row>
            </div>
            <v-row>
              <v-col class="pa-0">
              <!-- 추가하기 버튼-->
              <v-row class="d-flex justify-center">
                <v-btn @click="addEdu" text><v-icon style="font-size:1em">fas fa-plus</v-icon>&nbsp;<span>추가하기</span></v-btn>
              </v-row>
            </v-col>
          </v-row>
          </div>

          <!-- 경력 -->
          <div class="pa-3 mb-3" style="border:1px solid black;">
              <v-card-title class="pa-1 mb-3">경력</v-card-title>
              <div v-for="item in careerList" :key="item.cNum" style="border:1px solid #cccccc;position:relative" class="mb-2">
              <v-icon color="black" class="pa-0" @click="deleteCareer(item.cNum)" style="position:absolute;left:98.5%;top:-8%">fas fa-times-circle</v-icon>
              <v-row class="pa-0">
                <v-col cols="12" class="pb-0">
                    <v-card-text class="d-flex flex-row pa-0">
                      <v-row>
                        <v-col cols="8" class="d-flex flex-row pr-0">
                          <v-select
                            v-model="item.careerType"
                            label="업무종류"
                            :items="jobTypeList"
                            class="my-0 mx-1"
                            hide-details
                            style="width:0%;"
                            outlined
                          ></v-select>
                          <v-text-field v-model="item.company" label="회사명" class="my-0 mx-1" hide-details style="width:40%;" outlined></v-text-field>
                        </v-col>
                        <v-col cols="4" class="d-flex flex-row">
                          <v-menu
                            ref="startDateMenu"
                            v-model="startDateMenu"
                            :close-on-content-click="true"
                            :return-value="item.startDate"
                            transition="scale-transition"
                            offset-y
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="item.startDate"
                                label="시작일자"
                                ref="startDate"
                                readonly
                                outlined
                                hide-details
                                v-on="on"
                                class="mr-2"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="item.startDate" no-title scrollable>
                              <div class="flex-grow-1"></div>
                              <v-btn text color="primary" @click="startDateMenu = false">Cancel</v-btn>
                              <div class="flex-grow-1"></div>
                            </v-date-picker>
                          </v-menu>
                          <v-menu
                            ref="endDateMenu"
                            v-model="endDateMenu"
                            :close-on-content-click="true"
                            :return-value="item.endDate"
                            transition="scale-transition"
                            offset-y
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="item.endDate"
                                label="종료일자"
                                ref="endtDate"
                                readonly
                                outlined
                                hide-details
                                v-on="on"
                                class="mr-1"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="item.endDate" no-title scrollable>
                              <div class="flex-grow-1"></div>
                              <v-btn text color="primary" @click="endDateMenu = false">Cancel</v-btn>
                              <div class="flex-grow-1"></div>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-card-text>
                </v-col>
                </v-row>
                <v-text-field v-model="item.job" label="담당업무" class="my-0 mx-1 mb-5" hide-details outlined></v-text-field>
                </div>
                  <v-row class="d-flex justify-center">
                    <v-btn @click="addCareer" text><v-icon style="font-size:1em">fas fa-plus</v-icon>&nbsp;<span>추가하기</span></v-btn>
                  </v-row>

              </div>

          <!-- 어학 -->
          <div class="pa-3 mb-3" style="border:1px solid black;">
          <v-card-title class="pa-1 mb-3">어학</v-card-title>
          <div v-for="item in foreignLangList" :key="item.fNum" style="border:1px solid #cccccc;position:relative">
            <v-icon color="black" class="pa-0" @click="deleteForeignLang(item.fNum)" style="position:absolute;left:98.5%;top:-16%">fas fa-times-circle</v-icon>
        <v-row class="pa-0">
                <v-col cols="12">
                  <v-card-text class="d-flex flex-row pa-0">
                    <v-text-field
                      v-model="item.language"
                      label="외국어명"
                      class="my-0 mx-1"
                      hide-details
                      outlined
                    ></v-text-field>
                    <v-select
                      v-model="item.cerOrCon"
                      label="자격증/회화능력"
                      :items="certificates"
                      class="my-0 mx-1"
                      hide-details
                      outlined
                    ></v-select>
                    <v-select
                      v-model="item.levelCon"
                      label="회화능력"
                      v-if="item.cerOrCon ==='회화능력'"
                      :items="conversation"
                      class="my-0 mx-1"
                      hide-details
                      outlined
                    ></v-select>
                  </v-card-text>
                  <div class="d-flex flex-row mt-2">
                    <v-text-field
                      v-model="item.testName"
                      label="자격증명"
                      v-if="item.cerOrCon ==='자격증' || item.cerOrCon === ''"
                      class="my-0 mx-1"
                      style="width:30%"
                      hide-details
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="item.score"
                      label="급수/점수"
                      v-if="item.cerOrCon ==='자격증' || item.cerOrCon === ''"
                      class="my-0 mx-1"
                      style="width:20%"
                      hide-details
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="item.totalScore"
                      label="최고급수/총점수"
                      v-if="item.cerOrCon ==='자격증' || item.cerOrCon === ''"
                      class="my-0 mx-1"
                      style="width:20%"
                      hide-details
                      outlined
                    ></v-text-field>
                    <v-select
                      v-model="item.unit"
                      label="단위"
                      :items="testUnit"
                      v-if="item.cerOrCon ==='자격증' || item.cerOrCon === ''"
                      class="my-0 mx-1"
                      style="width:10%"
                      hide-details
                      outlined
                    ></v-select>
                    <v-menu
                      ref="gotDateMenu"
                      v-model="gotDateMenu"
                      :close-on-content-click="true"
                      :return-value="item.gotDate"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="item.gotDate"
                          label="취득일자"
                          ref="gotDate"
                          v-if="item.cerOrCon ==='자격증' || item.cerOrCon === ''"
                          readonly
                          outlined
                          hide-details
                          v-on="on"
                          class="my-0 mx-1"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="item.gotDate" no-title scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="gotDateMenu = false">Cancel</v-btn>
                        <div class="flex-grow-1"></div>
                      </v-date-picker>
                    </v-menu>
                  </div>
                </v-col>
                </v-row>
            </div>
            <v-row class="d-flex justify-center">
              <v-btn @click="addForeignLang" text><v-icon style="font-size:1em">fas fa-plus</v-icon>&nbsp;<span>추가하기</span></v-btn>
            </v-row>
          </div>

          <!-- 희망업무 -->
          <div class="pa-3 mb-3" style="border:1px solid black;">
          <v-card-title class="pa-1">희망업무</v-card-title>
          <v-row class="pa-0">
            <v-col cols="6" class="d-flex justify-space-between pt-0">
              <v-checkbox
                v-model="jobs"
                value="통역"
                label="통역"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="jobs"
                value="번역"
                label="번역"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="jobs"
                value="단체강의"
                label="단체강의"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="jobs"
                value="개인과외"
                label="개인과외"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
          </div>
          <!-- 자기소개 -->
          <div class="pa-3 mb-3" style="border:1px solid black;">
          <v-card-title class="pa-1">자기소개</v-card-title>
          <v-row class="pa-0" >
            <v-col cols="12">
              <v-textarea v-model="personal.description" label="당신의 소개글을 적어주세요" class="px-0 pa-0" wrap="hard" hide-details outlined></v-textarea>
            </v-col>
          </v-row>
          </div>

          <!-- 버튼 모음 -->
          <v-card-actions>
            <v-dialog
                  v-model="dialog"
                  width="850px"
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
                  <detail :freelancer="this.preivewContent" @close="close"></detail>
                </v-dialog>
            <div class="flex-grow-1"></div>
            <v-btn class="text--black font-weight-bold" text @click="submit">제출</v-btn>
          </v-card-actions>
        </div>
    </v-card>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header_Footer/Header'
import Detail from '../Freelancer/Freelancer_Preview'
import axios from 'axios'

export default {
  data () {
    return {
      isFreelancer: this.$store.state.loginInfo.role === 'FREELANCER',
      imageContent: '',
      dialog: false,
      education: [
        '대학교',
        '대학원'
      ],
      subMajorList: [
        '없음',
        '부전공',
        '이중전공',
        '복수전공'
      ],
      certificates: [
        '자격증',
        '회화능력'
      ],
      conversation: [
        '원어민',
        '비즈니스회화',
        '일상대화'
      ],
      genderSelect: [
        '남자',
        '여자'
      ],
      testUnit: [
        '급',
        '점'
      ],
      jobTypeList: [
        '통역',
        '번역',
        '단체강의',
        '개인과외'
      ],
      personal: {
        koName: '',
        vnName: '',
        birthday: '',
        gender: '',
        email: '',
        cphone: '',
        address: '',
        thumb: '',
        description: ''
      },
      eduList: [
        {
          num: 1,
          poOrUnder: '',
          schoolName: '',
          enrollYear: '',
          gradYear: '',
          isStudent: false,
          major: '',
          score: '',
          totalScore: '',
          subMajorType: '',
          subMajor: '',
          thesis: ''
        }
      ],
      careerList: [
        {
          cNum: 1,
          company: '',
          cerOrCon: '',
          job: '',
          startDate: '',
          endDate: ''
        }
      ],
      foreignLangList: [
        {
          fNum: 1,
          language: '',
          levelCon: '',
          testName: '',
          score: '',
          totalScore: '',
          gotDate: '',
          unit: ''
        }
      ],
      jobs: [],
      eduCounter: 1,
      careerCounter: 1,
      foreignLangCounter: 1,
      formHasErrors: false,
      birthDayMenu: false,
      startDateMenu: false,
      endDateMenu: false,
      gotDateMenu: false,
      rules: {
        required: value => !!value || '필수 입력사항입니다.',
        emailCheck: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '이메일 형식이 아닙니다'
        },
        cPhoneCheck: value => {
          const pattern = /^\d{3}-\d{3,4}-\d{4}$/
          return pattern.test(value) || '올바른 전화번호 형식이 아닙니다'
        }
      }
    }
  },
  components: {
    'header-bar': Header,
    'detail': Detail
  },
  computed: {
    years () {
      let years = []
      for (let i = 1980; i < new Date().getFullYear() + 1; i++) {
        years.push(i + '년')
      }
      return years
    },
    form () {
      return {
        vnName: this.personal.vnName,
        birthday: this.personal.birthday,
        gender: this.personal.gender,
        cphone: this.personal.cphone,
        address: this.personal.address
      }
    },
    submitForm () {
      return {
        memberId: this.$store.state.loginInfo.memberId,
        vnName: this.personal.vnName,
        birthday: this.personal.birthday,
        gender: this.personal.gender,
        cphone: this.personal.cphone,
        address: this.personal.address,
        description: this.textareaFormatter(this.personal.description),
        careerList: this.careerList,
        eduList: this.eduList,
        foreignLangList: this.foreignLangList,
        jobs: this.jobs
      }
    },
    preivewContent () {
      return {
        koName: this.personal.koName,
        vnName: this.personal.vnName,
        birthday: this.personal.birthday,
        gender: this.personal.gender,
        email: this.personal.email,
        cphone: this.personal.cphone,
        address: this.personal.address,
        thumb: this.personal.thumb,
        description: this.personal.description,
        eduList: this.eduList,
        careerList: this.careerList,
        foreignLangList: this.foreignLangList,
        jobs: this.jobs
      }
    }
  },
  created () {
    if (this.isFreelancer === true) {
      axios({
        url: '/private/getFreelancerByMemberId/' + this.$store.state.loginInfo.memberId,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': window.localStorage.getItem('TOKEN')
        }
      })
        .then(res => {
          this.dataFetching(res)
          axios({
            url: '/private/getThumbNailByMemberId/' + this.$store.state.loginInfo.memberId,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': window.localStorage.getItem('TOKEN')
            },
            responseType: 'blob'
          })
            .then(response => {
              let reader = new FileReader()
              reader.onload = e => {
                this.personal.thumb = e.target.result
              }
              reader.readAsDataURL(response.data)
            })
        })
    }
  },
  methods: {
    uploadImg: function (event) {
      const input = event.target
      this.imageContent = input.files[0]
      if (this.imageContent.type.startsWith('image')) {
        if (input.files && input.files[0]) {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.personal.thumb = e.target.result
          }
          reader.readAsDataURL(input.files[0])
        }
      } else {
        alert('이미지 파일을 업로드 해주세요')
      }
    },
    deleteImg () {
      this.personal.thumb = ''
    },
    close () {
      this.dialog = false
    },
    addEdu () {
      ++this.eduCounter
      let tempEduList = {
        num: this.eduCounter,
        poOrUnder: '',
        schoolName: '',
        enrollYear: '',
        gradYear: '',
        isStudent: false,
        major: '',
        score: '',
        totalScore: '',
        subMajorType: '',
        subMajor: ''
      }
      this.eduList.push(tempEduList)
    },
    deleteEdu: function (num) {
      const itemToFind = this.eduList.find(function (item) { return item.num === num })
      const idx = this.eduList.indexOf(itemToFind)
      if (idx > -1) this.eduList.splice(idx, 1)
    },
    addCareer () {
      ++this.careerCounter
      let tempCareerList = {
        num: this.careerCounter,
        company: '',
        startDate: '',
        endDate: ''
      }
      this.careerList.push(tempCareerList)
    },
    deleteCareer: function (num) {
      const itemToFind = this.careerList.find(function (item) { return item.cNum === num })
      const idx = this.careerList.indexOf(itemToFind)
      if (idx > -1) this.careerList.splice(idx, 1)
    },
    addForeignLang () {
      ++this.foreignLangCounter
      let tempForeignLangList = {
        fNum: this.foreignLangCounter,
        language: '',
        levelCon: '',
        testName: '',
        score: '',
        totalScore: '',
        gotDate: ''
      }
      this.foreignLangList.push(tempForeignLangList)
    },
    deleteForeignLang: function (num) {
      const itemToFind = this.foreignLangList.find(function (item) { return item.fNum === num })
      const idx = this.foreignLangList.indexOf(itemToFind)
      if (idx > -1) this.foreignLangList.splice(idx, 1)
    },
    submit () {
      this.formHasErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      let jwtToken = window.localStorage.getItem('TOKEN')
      if (jwtToken === null) {
        alert('로그인 해주세요')
        this.$router.push({ name: 'login' })
      } else {
        axios({
          url: '/private/editFreelancer',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': jwtToken
          },
          data: this.submitForm
        })
          .then(response => {
            if (this.imageContent !== undefined && this.imageContent !== null && this.imageContent !== '') {
              let formData = new FormData()
              formData.append('file', this.imageContent)
              formData.append('memberId', this.$store.state.loginInfo.memberId)
              axios({
                url: '/private/upload',
                method: 'POST',
                headers: {
                  'enctype': 'multipart/form-data',
                  'Authorization': jwtToken
                },
                data: formData
              })
                .then(response => {
                  console.log(response)
                  if (response.data.data === '성공') {
                    alert('정상적으로 수정되었습니다.')
                  } else {
                  }
                })
                .catch(error => {
                  console.log(error)
                })
            } else {
              alert('정상적으로 수정되었습니다.')
            }
          })
      }
    },
    dataFetching (res) {
      this.personal.koName = res.data.data.koName
      this.personal.vnName = res.data.data.vnName
      this.personal.gender = res.data.data.gender
      this.personal.email = res.data.data.email
      this.personal.cphone = res.data.data.cphone
      this.personal.address = res.data.data.address
      this.personal.birthday = res.data.data.birthday
      this.personal.description = this.textareaBack(res.data.data.description)

      if (res.data.data.edu !== null && res.data.data.edu !== undefined) {
        const eduList = res.data.data.edu
        this.eduList.splice(0, 1)
        for (let i = 0; i < eduList.length; i++) {
          let edu = {
            num: eduList[i].eduSeq,
            poOrUnder: eduList[i].poOrUnder,
            schoolName: eduList[i].schoolName,
            enrollYear: eduList[i].enrollYear,
            gradYear: eduList[i].gradYear,
            isStudent: eduList[i].isStudent,
            major: eduList[i].major,
            score: eduList[i].score,
            totalScore: eduList[i].totalScore,
            subMajorType: eduList[i].subMajorType,
            subMajor: eduList[i].subMajor,
            thesis: eduList[i].thesis
          }
          this.eduList.push(edu)
        }
      }

      if (res.data.data.career !== null && res.data.data.career !== undefined) {
        const careerList = res.data.data.career
        this.careerList.splice(0, 1)
        for (let i = 0; i < careerList.length; i++) {
          let career = {
            cNum: careerList[i].careerSeq,
            company: careerList[i].company,
            job: careerList[i].job,
            startDate: careerList[i].startDate,
            endDate: careerList[i].endDate
          }
          this.careerList.push(career)
        }
      }

      if (res.data.data.foreignLang !== null && res.data.data.foreignLang !== undefined) {
        const foreignLangList = res.data.data.foreignLang
        this.foreignLangList.splice(0, 1)
        for (let i = 0; i < foreignLangList.length; i++) {
          let levelConType = ''
          if (foreignLangList[i].levelCon === '비즈니스회화') {
            levelConType = '비즈니스회화 가능'
          } else if (foreignLangList[i].levelCon === '일상대화') {
            levelConType = '일상대화 가능'
          } else {
            levelConType = foreignLangList[i].levelCon
          }

          let foreignLang = {
            fNum: foreignLangList[i].foreignLangSeq,
            language: foreignLangList[i].language,
            levelCon: levelConType,
            testName: foreignLangList[i].testName,
            score: foreignLangList[i].score,
            unit: foreignLangList[i].unitType,
            totalScore: foreignLangList[i].totalScore,
            gotDate: foreignLangList[i].gotDate
          }
          this.foreignLangList.push(foreignLang)
        }
      }
      if (res.data.data.jobs === null) {
        this.jobs = []
      } else {
        this.jobs = res.data.data.jobs
      }
    },
    textareaFormatter (item) {
      let formatted = item.replace(/(?:\r\n|\r|\n)/g, '<br/>')
      return formatted
    },
    textareaBack (text) {
      let formatted = text.replace(/\<br\/\>/g, '\r\n')
      return formatted
    },
    goEnrollFreelancer () {
      this.$router.push({ name: 'freelancerEnroll' })
    },
    formatter () {
      let number = this.personal.cphone.replace(/[^0-9]/g, '')
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
      this.personal.cphone = tel
    }
  }
}
</script>

<style>
  .thumb{
    border: 1px solid #cccccc;
    height:90%;
    width:90%;
  }
  .imgBox{
    width:100%;
    height:85%;
    border:1px solid #cccccc;
  }
  .theme--light.v-input--is-disabled .v-label, .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea {
    color:black;
  }
  .theme--light.v-label {
    color:black;
  }
  .bgImgFreelancer{
    width:100%;
    height:calc(100% - 64px);
    position:absolute;
    overflow: hidden;

  }
</style>
