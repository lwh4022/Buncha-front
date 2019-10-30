<template>
  <v-container fluid class="pa-0">
    <header-bar></header-bar>
    <v-img src="@/assets/enrollFreelancer.jpg" style="width:100%;height:calc(100% - 70px);position:absolute;"></v-img>
    <v-row justify="center" align-content="center" class="pa-0 mb-0 mx-0 mt-9">
      <v-col cols="12" lg="9">
      <v-card max-width="1024px" class="mx-auto">
          <!-- 내부 프레임-->
          <div class="pa-4">
            <div class="text-center mb-10"><h1>프리랜서 등록하기</h1></div>
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
                    :close-on-content-click="false"
                    :return-value="personal.birthDay"
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
                    <v-date-picker v-model="personal.birthday" @click:date="birthDayMenu = false" no-title scrollable>
                      <div class="flex-grow-1"></div>
                      <v-btn text color="primary" @click="birthDayMenu = false">Cancel</v-btn>
                      <div class="flex-grow-1"></div>
                    </v-date-picker>
                  </v-menu>
                  <v-select v-model="personal.gender" :items="genderSelect" ref="gender" label="성별" class="my-0 mx-1" style="width:15%;" :rules="[rules.required]" required outlined></v-select>
                </v-card-text>
                <v-card-text class="d-flex flex-row pa-0">
                  <v-text-field v-model="personal.email" ref="email" label="이메일" class="my-0 mx-1" :rules="[rules.required, rules.emailCheck]" required disabled outlined></v-text-field>
                  <v-text-field v-model="personal.cphone" ref="cphone" label="휴대폰번호" class="my-0 mx-1" :rules="[rules.required, rules.cPhoneCheck]" @keyup="formatter" outlined></v-text-field>
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
                          <v-select class="d-inline-block my-0 mx-1" v-model="item.enrollYear" :items="years" label="입학연도" style="width:35%" hide-details outlined></v-select>
                          <v-select class="d-inline-block my-0 mx-1" v-if="!item.isStudent" v-model="item.gradYear" :items="years" label="졸업연도" style="width:35%" hide-details outlined></v-select>
                          <v-checkbox class="d-inline-block my-0 mx-1" v-model="item.isStudent" label="재학중" outlined></v-checkbox>
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

            <!-- 경 력 -->
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
                          v-model="jobStartDateMenu"
                          :close-on-content-click="false"
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
                          <v-date-picker v-model="item.startDate" @click:date="jobStartDateMenu = false" no-title scrollable>
                            <div class="flex-grow-1"></div>
                            <v-btn text color="primary" @click="jobStartDateMenu = false">Cancel</v-btn>
                            <div class="flex-grow-1"></div>
                          </v-date-picker>
                        </v-menu>
                        <v-menu
                          ref="endDateMenu"
                          v-model="jobEndDateMenu"
                          :close-on-content-click="false"
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
                          <v-date-picker v-model="item.endDate" @click:date="jobEndDateMenu = false" no-title scrollable>
                            <div class="flex-grow-1"></div>
                            <v-btn text color="primary" @click="jobEndDateMenu = false">Cancel</v-btn>
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
                    :close-on-content-click="false"
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
                    <v-date-picker v-model="item.gotDate" @click:date="gotDateMenu = false" no-title scrollable>
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
              <v-btn text><router-link :to="{name:'home'}" style="color:black;text-decoration:none;">홈으로</router-link></v-btn>
              <div class="flex-grow-1"></div>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Header from '@/components/Header_Footer/Header'
import Detail from '../../src/components/Freelancer/Freelancer_Preview'
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
      imageContent: '',
      dialog: false,
      jobTypeList: [
        '통역',
        '번역',
        '단체강의',
        '개인과외'
      ],
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
      testUnit: [
        '급',
        '점'
      ],
      conversation: [
        '원어민',
        '비즈니스회화 가능',
        '일상대화 가능'
      ],
      genderSelect: [
        '남자',
        '여자'
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
          careerType: '',
          company: '',
          job: '',
          startDate: '',
          endDate: ''

        }
      ],
      foreignLangList: [
        {
          fNum: 1,
          cerOrCon: '',
          language: '',
          levelCon: '',
          testName: '',
          score: '',
          totalScore: '',
          unit: '',
          gotDate: ''
        }
      ],
      jobs: [],
      eduCounter: 1,
      careerCounter: 1,
      foreignLangCounter: 1,
      formHasErrors: false,
      birthDayMenu: false,
      startDateMenu: false,
      jobStartDateMenu: false,
      jobEndDateMenu: false,
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
  created () {
    axios({
      url: '/private/getMe/' + this.$store.state.loginInfo.memberId,
      method: 'get',
      headers: {
        'Authorization': window.localStorage.getItem('TOKEN')
      }
    })
      .then(response => {
        this.personal.koName = response.data.data.name
        this.personal.email = response.data.data.email
      })

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
        careerList: this.careerList.careerType === "" ? null : this.careerList,
        eduList: this.eduList.poOrUnder === "" ? null : this.eduList,
        foreignLangList: this.foreignLangList.cerOrCon === "" ? null : this.foreignLangList,
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
    close () {
      this.dialog = false
    },
    submit () {
      this.formHasErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      let jwtToken = window.localStorage.getItem('TOKEN')
      if (jwtToken === undefined) {
        alert('로그인 해주세요')
        this.$router.push({ name: 'login' })
      } else {
        axios({
          url: '/private/enrollFreelancer',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': jwtToken
          },
          data: this.submitForm
        })
          .then(response => {
            if (this.imageContent !== undefined && this.imageContent !== null) {
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
                  if (response.data.data === '성공') {
                    alert('정상적으로 등록되었습니다.')
                    const payload = window.localStorage.getItem('AUTHTIME') - new Date().getTime() / 1000 / 60 / 60 > 2
                    this.$store.commit('authTime', payload)
                    this.$router.push({ name: 'home' })
                    window.location.reload()
                  } else {
                    console.log(response)
                  }
                })
                .catch(error => {
                  console.log(error)
                })
            } else {
              alert('정상적으로 등록되었습니다.')
              const payload = window.localStorage.getItem('AUTHTIME') - new Date().getTime() / 1000 / 60 / 60 > 2
              this.$store.commit('authTime', payload)
              this.$router.push({ name: 'home' })
              window.location.reload()
              this.$router.push({ name: 'home' })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    textareaFormatter (item) {
      let formatted = item.replace(/(?:\r\n|\r|\n)/g, '<br/>')
      return formatted
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

<style scoped>
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
</style>
