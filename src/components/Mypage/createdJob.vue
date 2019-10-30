<template>
  <v-container fluid class="pa-0" style="max-width:900px;height:calc(100vh - 64px)">
    <v-row class="mx-auto px-4">
      <v-col cols="6" class="pl-0">
        <job-list :jobInfo="enrolledJobs" @getApplicants="(item) => getApplicants(item)" @getDetail="(item) => getDetail(item)"></job-list>
      </v-col>
      <v-col cols="6" class="pr-0">
        <applied-list :applicantsList="applicants" @getDetailApplicant="(info) => getDetailApplicant(info)"></applied-list>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      width="850px"
    >
      <detail :freelancer="this.preivewContent" @close="close"></detail>
    </v-dialog>
  </v-container>
</template>

<script>
import JobList from '@/components/Mypage/Job/JobList'
import AppliedList from '@/components/Mypage/Job/AppliedList'
import Detail from '../Freelancer/Freelancer_Preview'
import axios from 'axios'

export default {
  data () {
    return {
      dialog: false,
      enrolledJobsList: [],
      applicantsList: [],
      isApplicantsNull: true,
      isEnrolledJobsNull: true,
      applicantInfo: {
        koName: '',
        vnName: '',
        birthday: '',
        gender: '',
        email: '',
        cphone: '',
        address: '',
        thumb: '',
        description: '',
        eduList: [],
        careerList: [],
        foreignLangList: [],
        jobs: []
      }
    }
  },
  components: {
    'job-list': JobList,
    'applied-list': AppliedList,
    'detail': Detail
  },
  created () {
    if (this.$store.state.authState === false) {
      alert('다시 로그인해주세요')
      this.$router.push({ name: 'login' })
    } else {
      axios({
        url: '/private/getEnrolledJob/' + this.$store.state.loginInfo.memberId,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': window.localStorage.getItem('TOKEN')
        }
      })
        .then(response => {
          if (response.data.data === null) {
            this.isEnrolledJobsNull = true
          } else {
            this.isEnrolledJobsNull = false
            this.enrolledJobsList = response.data.data.info
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    applicants () {
      return {
        isNull: this.isApplicantsNull,
        applicantsList: this.applicantsList
      }
    },
    enrolledJobs () {
      return {
        isNull: this.isEnrolledJobsNull,
        enrolledJobsList: this.enrolledJobsList
      }
    },
    preivewContent () {
      return {
        koName: this.applicantInfo.koName,
        vnName: this.applicantInfo.vnName,
        birthday: this.applicantInfo.birthday,
        gender: this.applicantInfo.gender,
        email: this.applicantInfo.email,
        cphone: this.applicantInfo.cphone,
        address: this.applicantInfo.address,
        thumb: this.applicantInfo.thumb,
        description: this.applicantInfo.description,
        eduList: this.applicantInfo.eduList,
        careerList: this.applicantInfo.careerList,
        foreignLangList: this.applicantInfo.foreignLangList,
        jobs: this.applicantInfo.jobs
      }
    }
  },
  methods: {
    getApplicants (item) {
      axios({
        url: '/private/getApplicants/' + item.num,
        method: 'get',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': window.localStorage.getItem('TOKEN')
        }
      })
        .then(response => {
          if (response.data.data !== null) {
            this.isApplicantsNull = false
            this.applicantsList = response.data.data.info
          } else {
            this.isApplicantsNull = true
          }
        })
    },

    getDetail (item) {
      this.$router.push({ name: 'jobEdit', params: { num: item.num } })
    },

    getDetailApplicant (item) {
      axios({
        url: '/private/getApplicantInfo/' + item.freelancerSeq,
        method: 'get',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': window.localStorage.getItem('TOKEN')
        }
      })
        .then(response => {
          if (response.data.data != null) {
            this.applicantInfo.koName = response.data.data.koName,
            this.applicantInfo.vnName = response.data.data.vnName,
            this.applicantInfo.birthday = response.data.data.birthday,
            this.applicantInfo.gender = response.data.data.gender,
            this.applicantInfo.email = response.data.data.email,
            this.applicantInfo.cphone = response.data.data.cphone,
            this.applicantInfo.address = response.data.data.address,
            this.applicantInfo.description = response.data.data.description,
            this.applicantInfo.eduList = response.data.data.edu,
            this.applicantInfo.careerList = response.data.data.career,
            this.applicantInfo.foreignLangList = response.data.data.foreignLang,
            this.applicantInfo.jobs = response.data.data.jobs,
            axios({
              url: '/private/getThumbNailByFreelancer/' + response.data.data.freelancerSeq,
              method: 'GET',
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': window.localStorage.getItem('TOKEN')
              },
              responseType: 'blob'
            })
              .then(res => {
                let reader = new FileReader()
                reader.onload = e => {
                  this.applicantInfo.thumb = e.target.result
                }
                reader.readAsDataURL(res.data)
              })
              .catch(error => {
                console.log(error)
              })

            this.dialog = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    close () {
      this.dialog = false
    }
  }
}
</script>
