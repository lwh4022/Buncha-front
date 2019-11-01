<template>
  <v-container fluid class="pa-0">
    <!-- Header.vue -->
    <header-bar></header-bar>
    <div class="mx-auto" style="background-color:white;margin-top:5vh;height:15vh;">
      <div class="mx-auto" style="width:1024px;">
        <div class="display-1 font-weight-bold ml-12 mb-4">필터</div>
        <v-card flat class="mx-auto" style="background-color:#cccccc;width:930px;">
          <v-card-text class="d-flex flex-row align-center" style="height:150px">
            <v-row class="d-flex justify-center">
              <v-col cols="9">
                <!--업무 내용-->
                <v-text-field
                  v-model="searchText"
                  placeholder="검색"
                  outlined
                  hide-details
                  background-color="white"
                  class="flex-grow-0"
                  height="50px"
                  @keyup="search"
                >
                  <template v-slot:prepend-inner>
                    <v-icon class="mr-4">fas fa-search</v-icon>
                  </template>
                </v-text-field>
                <div class="d-flex flex-row">
                  <v-select
                    v-model="selectedFirst"
                    :items="selectFirst"
                    placeholder="정렬"
                    background-color="white"
                    outlined
                    hide-details
                    clearable
                    @change="ordering"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="mr-4">fas fa-hockey-puck</v-icon>
                    </template>
                  </v-select>
                  <v-select
                    v-model="selectedJob"
                    v-if="selectedFirst === '업무선택'"
                    :items="selectJob"
                    background-color="white"
                    outlined
                    hide-details
                    clearable
                    @change="ordering"
                  >
                  </v-select>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>

      <!-- 카드 부분-->
      <v-row no-gutters class="d-flex mx-auto mt-4" style="width:1024px;">
        <div
          v-for="item in jobList"
          :key="item.num"
          class="ml-12 my-4 "
          style="width:440px"
        >
          <job-card :jobInfo="item" @click.native="jobDetail(item)"></job-card>
        </div>
      </v-row>

      <div class="d-flex mt-3" v-if="isMore">
        <p class="mx-auto font-weight-bold title" @click="getListMore" style="cursor:pointer"><v-icon style="font-size:2em">fas fa-angle-double-down</v-icon></p>
      </div>
    </div>
  </v-container>
</template>

<script>
import Header from '@/components/Header_Footer/Header'
import JobCard from '../components/Job/Job_Card'
import axios from 'axios'

export default {
  data () {
    return {
      selectFirst: [
        '업무선택',
        '마감임박순',
        '업무일자순'
      ],
      selectJob: [
        '통역',
        '번역',
        '단체강의',
        '개인과외'
      ],
      selectedFirst: '',
      selectedJob: '',
      cardCounter: 0,
      jobList: [],
      isMore: false,
      searchText: ''
    }
  },
  components: {
    'header-bar': Header,
    'job-card': JobCard
  },

  created () {
    this.defaultDataFetching()
  },
  methods: {
    getListMore () {
      this.cardCounter = this.cardCounter + 1
      if (this.selectedFirst === '') {
        this.search()
      } else {
        this.ordering()
      }
    },
    jobDetail (item) {
      this.$router.push({ name: 'job', params: { num: item.num } })
    },
    defaultDataFetching () {
      axios({
        method: 'GET',
        url: '/public/getJobs/' + this.cardCounter,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': window.localStorage.getItem('TOKEN')
        }
      })
        .then(response => {
          if (response.data.data === null) {
            this.jobList = []
            this.isMore = false
            this.cardCounter = 0
          } else {
            if(this.cardCounter > 0){
              this.jobList.concat(response.data.data.info.info)
            } else{
              this.jobList = response.data.data.info.info
            }
            if (response.data.data.isFinal === true) {
              this.isMore = false
            } else if (response.data.data.isFinal === null) {
              this.cardCounter = 0
              this.isMore = false
            } else {
              this.cardCounter = 0
              this.isMore = true
            }
          }
        })
    },
    search () {
      if (this.searchText === '') {
        this.defaultDataFetching()
      } else {
        if (this.selectedFirst === '') {
          this.cardCounter = 0
          this.jobList = []
          axios({
            method: 'GET',
            url: '/public/getJobs/' + encodeURI(encodeURIComponent(this.searchText)) + '/' + this.cardCounter,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': window.localStorage.getItem('TOKEN')
            }
          })
            .then(response => {
              if (response.data.data === null) {
                this.jobList = []
                this.isMore = false
                this.cardCounter = 0
              } else {
                if(this.cardCounter > 0){
                  this.jobList.concat(response.data.data.info.info)
                } else{
                  this.jobList = response.data.data.info.info
                }
                if (response.data.data.isFinal !== null && response.data.data.isFinal === true) {
                  this.isMore = false
                } else if (response.data.data.isFinal === null) {
                  this.isMore = false
                } else {
                  this.isMore = true
                }
              }
            })
        } else {
          this.ordering()
        }
      }
    },
    ordering () {
      this.cardCounter = 0
      this.jobList = []
      if (this.selectedFirst === '마감임박순') {
        if (this.searchText === '') {
          axios({
            method: 'GET',
            url: '/public/getJobs/' + '0' + '/' + 'recruiting' + '/' + 'null' + '/' + this.cardCounter,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': window.localStorage.getItem('TOKEN')
            }
          })
            .then(response => {
              if (response.data.data === null) {
                this.jobList = []
                this.isMore = false
                this.cardCounter = 0
              } else {
                this.jobList = this.jobList.concat(response.data.data.info.info)
                if (response.data.data.isFinal !== null && response.data.data.isFinal === true) {
                  this.isMore = false
                } else if (response.data.data.isFinal === null) {
                  this.isMore = false
                } else {
                  this.isMore = true
                }
              }
            })
        } else {
          axios({
            method: 'GET',
            url: '/public/getJobs/' + '1' + '/' + 'recruiting' + '/' + encodeURI(encodeURIComponent(this.searchText)) + '/' + this.cardCounter,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': window.localStorage.getItem('TOKEN')
            }
          })
            .then(response => {
              if (response.data.data === null) {
                this.jobList = []
                this.isMore = false
                this.cardCounter = 0
              } else {
                this.jobList = this.jobList.concat(response.data.data.info.info)
                if (response.data.data.isFinal !== null && response.data.data.isFinal === true) {
                  this.isMore = false
                } else if (response.data.data.isFinal === null) {
                  this.isMore = false
                } else {
                  this.isMore = true
                }
              }
            })
        }
      } else if (this.selectedFirst === '업무일자순') {
        if (this.searchText === '') {
          axios({
            method: 'GET',
            url: '/public/getJobs/' + '0' + '/' + 'startDate' + '/' + 'null' + '/' + this.cardCounter,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': window.localStorage.getItem('TOKEN')
            }
          })
            .then(response => {
              if (response.data.data === null) {
                this.jobList = []
                this.isMore = false
                this.cardCounter = 0
              } else {
                this.jobList = this.jobList.concat(response.data.data.info.info)
                if (response.data.data.isFinal !== null && response.data.data.isFinal === true) {
                  this.isMore = false
                } else if (response.data.data.isFinal === null) {
                  this.isMore = false
                } else {
                  this.isMore = true
                }
              }
            })
        } else {
          axios({
            method: 'GET',
            url: '/public/getJobs/' + '1' + '/' + 'endDate' + '/' + encodeURI(encodeURIComponent(this.searchText)) + '/' + this.cardCounter,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': window.localStorage.getItem('TOKEN')
            }
          })
            .then(response => {
              if (response.data.data === null) {
                this.jobList = []
                this.isMore = false
                this.cardCounter = 0
              } else {
                this.jobList = this.jobList.concat(response.data.data.info.info)
                if (response.data.data.isFinal !== null && response.data.data.isFinal === true) {
                  this.isMore = false
                } else if (response.data.data.isFinal === null) {
                  this.isMore = false
                } else {
                  this.isMore = true
                }
              }
            })
        }
      } else if (this.selectedFirst === '업무선택') {
        if (this.selectedJob !== '') {
          if (this.searchText === '') {
            axios({
              method: 'GET',
              url: '/public/getJobs/' + '0' + '/' + encodeURI(encodeURIComponent('jobType')) + '/' + encodeURI(encodeURIComponent(this.selectedJob)) + '/' + encodeURI(encodeURIComponent('null')) + '/' + this.cardCounter,
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': window.localStorage.getItem('TOKEN')
              }
            })
              .then(response => {
                if (response.data.data === null) {
                  this.jobList = []
                  this.isMore = false
                  this.cardCounter = 0
                } else {
                  this.jobList = this.jobList.concat(response.data.data.info.info)
                  if (response.data.data.isFinal !== null && response.data.data.isFinal === true) {
                    this.isMore = false
                  } else if (response.data.data.isFinal === null) {
                    this.isMore = false
                  } else {
                    this.isMore = true
                  }
                }
              })
          } else if (this.searchText !== '') {
            axios({
              method: 'GET',
              url: '/public/getJobs/' + '1' + '/' + encodeURI(encodeURIComponent('jobType')) + '/' + encodeURI(encodeURIComponent(this.selectedJob)) + '/' + encodeURI(encodeURIComponent(this.searchText)) + '/' + this.cardCounter,
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': window.localStorage.getItem('TOKEN')
              }
            })
              .then(response => {
                if (response.data.data === null) {
                  this.jobList = []
                  this.isMore = false
                  this.cardCounter = 0
                } else {
                  this.jobList = this.jobList.concat(response.data.data.info.info)
                  if (response.data.data.isFinal !== null && response.data.data.isFinal === true) {
                    this.isMore = false
                  } else if (response.data.data.isFinal === null) {
                    this.isMore = false
                  } else {
                    this.isMore = true
                  }
                }
              })
          }
        }
      } else {
        this.defaultDataFetching()
      }
    }
  }
}
</script>

<style scoped>
  .filterTitle{
    background-color:white;
    border-right: 2px solid #cccccc;
    width:70px;
    text-align: center;
    color:black;
  }
  .filterBox{
    width:300px;
    background-color:white;
    height:40px;
    color:black;
    margin-top:auto;
  }
  .filterBtn{
    width:50px;
  }

</style>
