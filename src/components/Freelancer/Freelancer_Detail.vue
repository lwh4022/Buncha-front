<template>
  <div class="ma-0 pa-0">
    <header-bar/>
    <v-card class="mx-auto mt-8" style="width:800px;">
      <!-- 내부 프레임-->
      <div class="pa-4">
        <!-- 인적 사항-->
        <v-card-title class="display-1 font-weight-bold mb-4">인적사항</v-card-title>
        <v-row class="pb-3 px-3 mb-12" style="height:160px;">
          <v-col cols="10" class="my-auto">
            <v-card-text class="d-flex flex-row pa-0 mb-3">
              <v-text-field
                v-model="dataList.personal.koName"
                label="한국이름"
                class="my-0 mx-1"
                disabled
                outlined
                hide-details
              ></v-text-field>
              <v-text-field
                v-model="dataList.personal.vnName"
                label="베트남이름"
                class="my-0 mx-1"
                disabled
                outlined
                hide-details
              ></v-text-field>
            </v-card-text>
            <v-card-text class="d-flex flex-row pa-0 mb-3">
              <v-text-field
                v-model="dataList.birthday"
                label="생년월일"
                class="my-0 mx-1"
                disabled
                outlined
                hide-details
              ></v-text-field>
              <v-text-field
                v-model="dataList.personal.gender"
                label="성별"
                class="my-0 mx-1"
                disabled
                outlined
                hide-details
              ></v-text-field>
            </v-card-text>
          </v-col>
          <v-col cols="2" class="d-flex justify-center flex-column pt-0">
            <div class="imgBox">
              <v-avatar v-if="hasThumb" height="100%" width="100%" tile>
                <img id="preview" :src="dataList.thumb">
              </v-avatar>
              <v-avatar v-if="!hasThumb" height="100%" width="100%" tile>
                <v-icon style="font-size:4.5em">fas fa-user-circle</v-icon>
              </v-avatar>
            </div>
          </v-col>
        </v-row>

        <!-- 학력 -->
          <!-- 학력제목 -->
          <v-card-title class="mb-0 display-1 font-weight-bold">학력</v-card-title>
          <!-- 반복사항 시작-->
            <v-row class="pb-3 px-3 mb-12">
              <v-col cols="12">
                <v-card-text class="d-flex flex-column pa-0">
                  <div class="d-flex flex-row my-3">
                    <div class="title font-weight-bold text-center eduTitle" style="width:10%;">구분</div>
                    <div class="title font-weight-bold text-center eduTitle" style="width:20%;">학교</div>
                    <div class="title font-weight-bold text-center eduTitle" style="width:15%;">기간</div>
                    <div class="title font-weight-bold text-center eduTitle" style="width:20%;">전공</div>
                    <div class="title font-weight-bold text-center eduTitle" style="width:35%;">학점(논문명)</div>
                  </div>
                  <div class="d-flex flex-row" v-for="item in dataList.eduList" :key="item.eduSeq" >
                    <div
                      class="subtitle-1 font-weight-bold text-center my-auto"
                      style="width:10%;"
                    >
                      {{ item.poOrUnder}}
                    </div>
                    <div
                      class="subtitle-1 font-weight-bold text-center my-auto"
                      style="width:20%;"
                    >
                      {{ item.schoolName}}
                    </div>
                    <div
                      class="subtitle-1 font-weight-bold text-center my-auto"
                      style="width:15%;"
                      v-if="item.enrollYear !== '' || item.gradYear !== ''"
                    >
                      {{ item.enrollYear}}&nbsp;~&nbsp;<br><span>{{item.gradYear}}</span>
                    </div>
                    <div
                      class="subtitle-1 font-weight-bold text-center my-auto"
                      style="width:20%;"
                      v-if="item.subMajorType !== '' || item.subMajor !== '' || item.major !== ''"
                    >
                      <span class="mb-0">{{ item.major }}</span><br>
                      <span
                        class="mb-0"
                        style="font-size:0.9em"
                        v-if="item.subMajorType !== '' && item.subMajorType !== '없음' && item.subMajor !== ''"
                      >
                        ({{item.subMajorType}}:&nbsp;{{item.subMajor}})
                      </span>
                    </div>
                    <div
                      class="subtitle-1 font-weight-bold text-center my-auto"
                      style="width:35%;"
                      v-if="item.score !== '' || item.totalScore !== '' || item.thesis !== ''"
                    >
                      <span v-if="item.score !== '' || item.totalScore !== ''">{{ item.score }}&nbsp;/&nbsp;{{ item.totalScore}}</span><span>{{ item.thesis}}</span>
                    </div>
                  </div>
                </v-card-text>
            </v-col>
          </v-row>

        <!-- 경력 -->
        <v-card-title class="display-1 font-weight-bold mb-0">경력</v-card-title>
          <v-row class="pb-3 px-3 mb-12">
            <v-col cols="12">
              <v-card-text class="d-flex flex-column pa-0">
                <div class="d-flex flex-row my-3">
                  <div class="title font-weight-bold text-center eduTitle" style="width:20%;">회사명</div>
                  <div class="title font-weight-bold text-center eduTitle" style="width:50%;">담당업무</div>
                  <div class="title font-weight-bold text-center eduTitle" style="width:30%;">기간</div>
                </div>
                <div class="d-flex flex-row" v-for="item in dataList.careerList" :key="item.careerSeq" >
                  <div class="subtitle-1 font-weight-bold text-center my-auto" style="width:20%;">{{ item.company}}</div>
                  <div class="subtitle-1 font-weight-bold text-center my-auto" style="width:50%;">{{ item.job}}</div>
                  <div
                    class="subtitle-1 font-weight-bold text-center my-auto"
                    style="width:30%;"
                    v-if="item.startDate !== '' || item.endDate !==''"
                  >
                    {{ item.startDate}}&nbsp;~&nbsp;<span>{{item.endDate}}</span>
                  </div>
                </div>
              </v-card-text>
            </v-col>
          </v-row>

        <!-- 어학 -->
        <v-card-title class="display-1 font-weight-bold mb-0">어학</v-card-title>
        <v-row class="pb-3 px-3 mb-12">
          <v-col cols="12">
            <v-card-text class="d-flex flex-column pa-0">
              <div class="d-flex flex-row my-3">
                <div class="title font-weight-bold text-center eduTitle" style="width:20%;">외국어명</div>
                <div class="title font-weight-bold text-center eduTitle" style="width:80%;">자격증 및 회화능력</div>
              </div>
              <div class="d-flex flex-row" v-for="item in dataList.foreignLangList" :key="item.foreignLangSeq" >
                <div class="subtitle-1 font-weight-bold text-center my-auto" style="width:20%;">{{ item.language}}</div>
                <div class="subtitle-1 font-weight-bold text-center my-auto" style="width:80%;">
                  <div v-if="item.levelCon !== '' && item.levelCon !== null"><span>회화능력&nbsp;:&nbsp;</span><span>{{item.levelCon}}</span></div>
                  <div v-if="item.testName !== ''"><span>{{ item.testName }}</span><br><span>({{ item.score }}{{ item.unit }}&nbsp;/&nbsp;{{ item.totalScore}}{{ item.unit }},&nbsp;취득일&nbsp;:&nbsp;{{item.gotDate}})</span></div>
                </div>
              </div>
            </v-card-text>
          </v-col>
          </v-row>

        <!-- 희망업무 -->
        <v-card-title class="display-1 font-weight-bold mb-0">희망업무</v-card-title>
        <v-row class="pb-3 px-3 mb-12">
          <v-col cols="12">
            <v-chip
              :color="getColor(job)"
              v-for="(job, index) in dataList.jobs"
              :key="index"
              class="mr-3"
            >
              {{ job }}
            </v-chip>
          </v-col>
        </v-row>

        <!-- 자기소개 -->
        <v-card-title class="display-1 font-weight-bold mb-0">자기소개</v-card-title>
        <v-row class="pb-3 px-3">
          <v-col cols="12">
            <v-textarea
              v-model="dataList.personal.description"
              class="px-0 pa-0"
              wrap="hard"
              auto-grow
              disabled
              outlined
              hide-details
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- 버튼 모음 -->
        <div class="d-flex">
          <div class="flex-grow-1"></div>
          <v-btn
            class="text--black font-weight-bold mx-auto"
            style="font-size:1em"
            dark
            @click= "goBack"
          >
            뒤로가기
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-dialog
            v-model="dialog"
            width="700">
            <template v-slot:activator="{ on }">
              <v-btn
                class="text--black font-weight-bold mx-auto"
                style="font-size:1em"
                dark
                v-on="on"
              >
                지원요청
              </v-btn>
            </template>
            <div style="background-color:white;">
              <div class="d-flex flex-column" v-if="jobCardInfo === null || jobCardInfo.length <1 " style="height:200px;">
                <div class="mx-auto my-10 display-1 font-weight-bold">
                  등록한 업무가 없습니다
                </div>
                <div style="height:20px"></div>
                <v-btn class="mx-auto" color="error" width="100" @click="dialog = false">확인</v-btn>
              </div>
              <div class="d-flex flex-column" v-if="jobCardInfo.length >= 1">
                <div class="d-flex py-8"><div class="mx-auto display-1 font-weight-bold">어떤 업무에 지원요청 하시나요?</div></div>
                <hr class="mb-8">
                <div
                  v-for="item in jobCardInfo"
                  :key="item.num"
                  class="d-flex flex-row"
                >
                  <div class="d-flex mx-auto">
                    <div class="my-auto" style="width:50px;">
                      <v-checkbox
                        class="mx-auto my-auto"
                        v-model="jobsToSuggest"
                        :value="item.num"
                      >
                      </v-checkbox>
                    </div>
                    <job-card
                      :jobInfo="item"
                      class="mb-2"
                      style="width:500px;"
                      @click.native="jobSelecting(item)"
                    ></job-card>
                  </div>
                </div>
                <div class="mx-auto my-4 d-flex flex-row">
                  <v-btn color="primary" @click.native="suggest">확&nbsp;&nbsp;인</v-btn>
                  <div style="width:100px"></div>
                  <v-btn color="info" @click.native="dialog=false">취&nbsp;&nbsp;소</v-btn>
                </div>
              </div>

            </div>
          </v-dialog>
          <div class="flex-grow-1"></div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import Header from '../Header_Footer/Header'
import axios from 'axios'
import JobCard from '../Job/Job_Card_Suggest'

export default {
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (window.localStorage.getItem("TOKEN") === null || window.localStorage.getItem("TOKEN") === undefined) {
        alert('로그인 후 가능합니다')
        vm.$router.push({ name: 'login' })
      }
    })
  },
  data () {
    return {
      hasThumb: false,
      dialog: false,
      receivedData: null,
      freelancerSeq: '',
      freelancer: {
        personal: {
          koName: '',
          vnName: '',
          gender: '',
          thumb: '',
          description: ''
        },
        birthday: '',
        eduList: [],
        careerList: [],
        foreignLangList: [],
        jobs: []
      },
      jobCardInfo: [{
        num: '',
        recruiting: '',
        title: '',
        startDate: '',
        endDate: '',
        recruitNum: '',
        createdAt: '',
        contents: '',
        jobType: '',
        salary: '',
        amount: '',
        isNego: false
      }],
      jobsToSuggest: []
    }
  },
  computed: {
    dataList () {
      return {
        personal: this.freelancer.personal,
        thumb: this.freelancer.personal.thumb,
        birthday: new Date(this.freelancer.birthday).getFullYear() + '년',
        eduList: this.freelancer.eduList,
        careerList: this.freelancer.careerList,
        foreignLangList: this.freelancer.foreignLangList,
        jobs: this.freelancer.jobs,
        jobsToSuggest: []
      }
    },
    suggestForm () {
      return {
        jobs: this.jobsToSuggest,
        freelancerSeq: this.freelancerSeq
      }
    }
  },
  components: {
    'job-card': JobCard,
    'header-bar': Header
  },
  created () {
    axios({
      url: '/private/getFreelancerByMemberId/' + this.$route.params.freelancerId,
      headers: {
        'Authorization': window.localStorage.getItem('TOKEN')
      },
      method: 'GET'
    })
      .then(res => {
        this.freelancer.personal.koName = res.data.data.koName
        this.freelancer.personal.vnName = res.data.data.vnName
        this.freelancer.birthday = res.data.data.birthday
        this.freelancer.personal.gender = res.data.data.gender
        this.freelancer.personal.description = this.textareaBack(res.data.data.description)
        this.freelancer.careerList = res.data.data.career
        this.freelancer.eduList = res.data.data.edu
        this.freelancer.foreignLangList = res.data.data.foreignLang
        this.freelancer.jobs = res.data.data.jobs
        this.freelancerSeq = res.data.data.freelancerSeq
        axios({
          url: '/private/getThumbNailByMemberId/' + this.$route.params.freelancerId,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': window.localStorage.getItem('TOKEN')
          },
          responseType: 'blob'
        })
          .then(response => {
            if(response.data.type !== "application/json"){
              let reader = new FileReader()
              reader.onload = e => {
                this.freelancer.personal.thumb = e.target.result
                this.hasThumb = true
              }
              reader.readAsDataURL(response.data)
            } else {
              this.hasThumb = false
            }
          })
          .catch(error => {
            console.log(error)
            this.hasThumb = false
          })
      })
  },
  watch: {
    dialog: function (newVal) {
      if (newVal === true) {
        axios({
          url: '/private/getAvailableJob/' + this.$store.state.loginInfo.memberId + '/' + this.freelancerSeq,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': window.localStorage.getItem('TOKEN')
          }
        })
          .then(response => {
            this.jobCardInfo = []
            this.jobCardInfo = response.data.data.info
          })
      }
    }
  },
  methods: {
    getColor (job) {
      if (job === '통역') return 'primary'
      else if (job === '번역') return 'info'
      else if (job === '단체강의') return 'success'
      else if (job === '개인과외') return 'secondary'
    },
    goBack () {
      this.$router.go(-1)
    },
    textareaBack (text) {
      let formatted = text.replace(/\<br\/\>/g, '\r\n')
      return formatted
    },
    jobSelecting (item) {
      const itemNum = item.num
      const index = this.jobsToSuggest.findIndex(el => {
        return el === item.num
      })
      let tempArr = []
      tempArr = this.jobsToSuggest.splice(index, 1)
      if (tempArr.length < 1) {
        this.jobsToSuggest.push(item.num)
      } else {
        this.jobsToSuggest = this.jobsToSuggest.splice(index, 1)
      }
    },
    suggest () {
      axios({
        url: '/private/suggestJob',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': window.localStorage.getItem('TOKEN')
        },
        data: this.suggestForm
      })
        .then(response => {
          alert('정상적으로 요청되었습니다.')
          this.dialog = false
          window.location.reload()
        })
        .catch(error => {
          this.dialog = false
          console.log(error)
        })
    }
  }
}
</script>

<style>
  .eduTitle{
    border-bottom:1px solid #cccccc;
    height:45px;
  }
  .thumb{
    border: 1px solid #cccccc;
    height:90%;
    width:90%;
  }
  .imgBox{
    width:100%;
    height:100%;
  }
  .centered-input input{
    text-align: right;
  }
  .theme--light.v-input--is-disabled .v-label, .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea{
    color:black !important;
  }
  .theme--light.v-text-field.v-input--is-disabled .v-text-field__prefix, .theme--light.v-text-field.v-input--is-disabled .v-text-field__suffix{
    color:black;
  }
</style>
