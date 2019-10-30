<template>
  <v-container fluid class="pa-0" style="background-color:white;height:calc(100vh - 64px)">
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
      <div class="px-4 mx-auto mt-12 flex-column" style="max-width:800px;">
      <!--요청 받은 업무 -->
      <div class="mt-2" style="backround-color:#fafafa;">
        <div class="headline font-weight-bold"><v-icon style="color:black;">fas fa-tag</v-icon>&nbsp;&nbsp;&nbsp;요청 받은 업무</div>
          <v-data-table
            ref="interest"
            :headers="suggested.headers"
            :items="suggested.contents"
            :page.sync="suggested.page"
            :items-per-page="suggested.itemsPerPage"
            :calculate-widths="false"
            item-key="num"
            class="elevation-4 Interested mt-3"
            hide-default-footer
            @page-count="pageCount = $event"
            @click:row="showSuggestedJob($event)"
          >

            <template v-slot:item.classification="{ item }">
              <v-chip :color="getColor(item.classification)" dark>{{ item.classification }}</v-chip>
            </template>

          </v-data-table>
          <div class="text-center pt-2 mt-2" style="background-color:white;">
            <v-pagination color="info" class="enrolledJob" v-model="suggested.page" :length="suggested.pageCount" :total-visible="7"></v-pagination>
          </div>
        </div>

        <v-dialog
          v-model="suggestedDialog"
          width= "800"
        >
          <job-delete :jobInfo="deleteForm" @goBack="close" @abortSuggestedSuccess="abortSuccess"></job-delete>
        </v-dialog>

        <!-- 지원한 업무 -->
        <div class="mt-8">
          <div class="headline font-weight-bold"><v-icon style="color:black;">fas fa-briefcase</v-icon>&nbsp;&nbsp;&nbsp;지원한 업무</div>
          <v-data-table
            :headers="applied.headers"
            :items="applied.contents"
            :page.sync="applied.page"
            :items-per-page="applied.itemsPerPage"
            hide-default-footer
            class="elevation-4 Interested mt-3"
            :calculate-widths="false"
            @page-count="pageCount = $event"
            @click:row="showAppliedJob($event)"
          >
            <template v-slot:item.classification="{ item }">
              <v-chip :color="getColor(item.classification)" dark>{{ item.classification }}</v-chip>
            </template>
          </v-data-table>
          <div class="text-center pt-2 mt-2" style="background-color:white;">
            <v-pagination color="info" class="enrolledJob" v-model="applied.page" :length="applied.pageCount" :total-visible="7"></v-pagination>
          </div>
        </div>

        <v-dialog
          v-model="appliedDialog"
          width= "800"
        >
          <job-delete :jobInfo="deleteForm" @goBack="close" @abortAppliedSuccess="abortSuccess"></job-delete>
        </v-dialog>
      </div>
    </div>
  </v-container>
</template>

<script>
import JobDelete from '../Job/Job_Delete'

export default {
  data () {
    return {
      isFreelancer: this.$store.state.loginInfo.role === 'FREELANCER',
      suggestedDialog: false,
      appliedDialog: false,
      category: '',
      jobLocation: [],
      fetchedData: [
        {
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
          jobLocation: '',
          salary: '',
          amount: '',
          isNego: '',
          jobDescription: ''
        }
      ],
      suggested: {
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
        expanded: [],
        headers: [
          {
            text: '마감',
            align: 'center',
            value: 'classification'
          },
          {
            text: '업무',
            align: 'center',
            sortable: false,
            value: 'jobType'
          },
          { text: '제목', value: 'title', align: 'center' },
          { text: '업무 일정', value: 'jobDate', align: 'center' },
          { text: '장소', value: 'location', align: 'center', sortable: false },
          { text: '급여', value: 'salary', align: 'center' }
        ],
        contents: [
          {
            classification: '',
            jobType: '',
            title: '',
            jobDate: '',
            location: '',
            salary: ''
          }
        ]
      },
      applied: {
        page: 1,
        pageCount: 0,
        itemsPerPage: 7,
        headers: [
          {
            text: '마감',
            align: 'center',
            value: 'classification'
          },
          {
            text: '업무',
            align: 'center',
            sortable: false,
            value: 'jobType'
          },
          { text: '제목', value: 'title', align: 'center' },
          { text: '업무 일정', value: 'jobDate', align: 'center' },
          { text: '장소', value: 'location', align: 'center', sortable: false },
          { text: '급여', value: 'salary', align: 'center' }
        ],
        contents: [
          {
            classification: '',
            jobType: '',
            title: '',
            jobDate: '',
            location: '',
            salary: ''
          }
        ]
      }
    }
  },
  computed: {
    deleteForm () {
      return {
        singleLineIntro: this.fetchedData.singleLineIntro,
        comOrIndi: this.fetchedData.comOrIndi,
        companyName: this.fetchedData.companyName,
        pic: this.fetchedData.pic,
        phone: this.fetchedData.phone,
        email: this.fetchedData.email,
        jobType: this.fetchedData.jobType,
        startDate: this.fetchedData.startDate,
        endDate: this.fetchedData.endDate,
        recruitDate: this.fetchedData.recruitDate,
        numRecruit: this.fetchedData.numRecruit,
        jobLocation: this.jobLocation,
        salary: this.fetchedData.salary,
        amount: this.fetchedData.amount,
        isNego: this.fetchedData.isNego,
        jobDescription: this.fetchedData.jobDescription,
        jobSeq: this.fetchedData.jobSeq,
        category: this.category
      }
    }
  },
  created () {
    if (this.isFreelancer === true) {
      let memberId = this.$store.state.loginInfo.memberId
      if (memberId !== null && memberId !== undefined && memberId !== '') {
        axios({
          url: '/private/scheduleInfo/' + memberId,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': window.localStorage.getItem('TOKEN')
          }
        })
          .then(response => {
            this.suggested.contents = []
            this.applied.contents = []
            if (response.data.data.suggestedJobs !== null) {
              response.data.data.suggestedJobs.map(item => {
                let tmpItem = {
                  classification: this.isDue(item.recruiting),
                  jobType: item.jobType,
                  title: item.title,
                  jobDate: this.dateFormat(item.startDate) + this.spacing() + this.dateFormat(item.endDate),
                  location: this.location(item.jobLocation),
                  salary: item.salary + ' ' + item.amount + ' 만원',
                  num: item.num
                }
                this.suggested.contents.push(tmpItem)
              })
            }
            if (response.data.data.appliedJobs !== null) {
              response.data.data.appliedJobs.map(item => {
                let tmpItem = {
                  classification: this.isDue(item.recruiting),
                  jobType: item.jobType,
                  title: item.title,
                  jobDate: this.dateFormat(item.startDate) + this.spacing() + this.dateFormat(item.endDate),
                  location: this.location(item.jobLocation),
                  salary: item.salary + ' ' + item.amount + ' 만원',
                  num: item.num
                }
                this.applied.contents.push(tmpItem)
              })
            }
            if (this.suggested.contents.length > 0) {
              this.suggested.pageCount = Math.ceil(this.suggested.contents.length / 5)
            } else {
              this.suggested.pageCount = 1
            }
            if (this.applied.contents.length > 0) {
              this.applied.pageCount = Math.ceil(this.applied.contents.length / 7)
            } else {
              this.applied.pageCount = 1
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        alert('로그인 해주세요')
        this.$router.push({ name: 'login' })
      }
    }
  },
  components: {
    'job-delete': JobDelete
  },
  methods: {
    getColor (classification) {
      if (classification === '마감') {
        return 'black'
      } else {
        let restTime = classification.substring(2)
        if (restTime < 5) return 'red'
        else if (restTime < 10) return 'blue'
        else return 'green'
      }
    },
    showSuggestedJob: function (e) {
      axios({
        url: '/private/getJobInfo/' + e.num,
        method: 'get',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': window.localStorage.getItem('TOKEN')
        }
      })
        .then(response => {
          this.fetchedData = []
          this.fetchedData = response.data.data.job
          this.jobLocation = response.data.data.jobLocation
          this.category = 'suggested'
          this.suggestedDialog = true
        })
    },
    showAppliedJob: function (e) {
      axios({
        url: '/private/getJobInfo/' + e.num,
        method: 'get',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': window.localStorage.getItem('TOKEN')
        }
      })
        .then(response => {
          this.fetchedData = []
          this.fetchedData = response.data.data.job
          this.jobLocation = response.data.data.jobLocation
          this.category = 'applied'
          this.appliedDialog = true
        })
    },
    isDue (item) {
      let restTime = new Date(item).getTime() - new Date().getTime()
      if (Math.ceil(restTime) <= 0) {
        return '마감'
      } else {
        return 'D-' + Math.ceil(new Date(restTime).getTime() / 1000 / 60 / 60 / 24)
      }
    },
    location (item) {
      let result = ''
      if (item.length > 1) {
        result += item[0] + ' 등'
        return result
      } else {
        return result += item[0]
      }
    },
    dateFormat (item) {
      let year = item.substring(2, 4)
      let month = item.substring(5, 7)
      let date = item.substring(8, 10)
      return year + '.' + month + '.' + date
    },
    spacing () {
      return ' ~ '
    },
    close () {
      this.suggestedDialog = false
      this.category = ''
      this.appliedDialog = false
    },
    goEnrollFreelancer () {
      this.$router.push({ name: 'freelancerEnroll' })
    },
    abortSuccess(){
      this.defaultDataFetching()
    },
    defaultDataFetching(){
      if (this.isFreelancer === true) {
        let memberId = this.$store.state.loginInfo.memberId
        if (memberId !== null && memberId !== undefined && memberId !== '') {
          axios({
            url: '/private/scheduleInfo/' + memberId,
            method: 'get',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': window.localStorage.getItem('TOKEN')
            }
          })
            .then(response => {
              this.suggested.contents = []
              this.applied.contents = []
              if (response.data.data.suggestedJobs !== null) {
                response.data.data.suggestedJobs.map(item => {
                  let tmpItem = {
                    classification: this.isDue(item.recruiting),
                    jobType: item.jobType,
                    title: item.title,
                    jobDate: this.dateFormat(item.startDate) + this.spacing() + this.dateFormat(item.endDate),
                    location: this.location(item.jobLocation),
                    salary: item.salary + ' ' + item.amount + ' 만원',
                    num: item.num
                  }
                  this.suggested.contents.push(tmpItem)
                })
              }
              if (response.data.data.appliedJobs !== null) {
                response.data.data.appliedJobs.map(item => {
                  let tmpItem = {
                    classification: this.isDue(item.recruiting),
                    jobType: item.jobType,
                    title: item.title,
                    jobDate: this.dateFormat(item.startDate) + this.spacing() + this.dateFormat(item.endDate),
                    location: this.location(item.jobLocation),
                    salary: item.salary + ' ' + item.amount + ' 만원',
                    num: item.num
                  }
                  this.applied.contents.push(tmpItem)
                })
              }
              if (this.suggested.contents.length > 0) {
                this.suggested.pageCount = Math.ceil(this.suggested.contents.length / 5)
              } else {
                this.suggested.pageCount = 1
              }
              if (this.applied.contents.length > 0) {
                this.applied.pageCount = Math.ceil(this.applied.contents.length / 7)
              } else {
                this.applied.pageCount = 1
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          alert('로그인 해주세요')
          this.$router.push({ name: 'login' })
        }
      }
    }
  }
}
</script>

<style>
  .Interested.theme--light.v-data-table thead tr th{
    color:black;
    font-size:1em;
    background-color:white;
  }
  .Interested.theme--light.v-data-table thead tr th:nth-child(1){
    width:110px;
  }
  .Interested.theme--light.v-data-table thead tr th:nth-child(2){
    width:110px;
  }
  .Interested.theme--light.v-data-table thead tr th:nth-child(4){
    width:150px;
  }
  .Interested.theme--light.v-data-table thead tr th:nth-child(5){
    width:90px;
  }
  .Interested.theme--light.v-data-table thead tr th:nth-child(6){
    width:150px;
  }
  .Interested.theme--light.v-data-table tr td:nth-child(3){
    display:inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space:nowrap;
    width:200px;
    line-height: 40px;
  }
  .enrolledJob.theme--light.v-pagination .v-pagination__navigation{
    background-color:#fafafa;
    box-shadow: 0px 0px 0px 0px;
  }

  .v-pagination__navigation .v-icon{
    font-size: 1em;
  }
  .enrolledJob.theme--light.v-pagination .v-pagination__item{
    min-width:25px;
    height:25px;
    border-radius: 50%;
  }
  .enrolledJob.theme--light.v-data-table tbody tr:not(:last-child) td:last-child, .theme--light.v-data-table tbody tr td{
    border-bottom: 1px solid rgba(0,0,0,.12);
    cursor:pointer;
  }
</style>
